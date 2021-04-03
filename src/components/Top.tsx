import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import UseHttp from '@hooks/useHttp'
import { UserTopT } from '@type/top'
import Loader from '@components/Loader'
import styles from '@styles/Top.module.css'

type TopProps = {
  isAuth: boolean
}

const Top: React.FC<TopProps> = ({ isAuth }) => {
  const [top, setTop] = useState<UserTopT[]>([])
  const [floaded, setFloaded] = useState<boolean>(false)
  const { request, loading, error } = UseHttp()

  useEffect(() => {
    if (isAuth) {
      request<UserTopT[]>('/get_top', 'GET')
        .then((tdata) => {
          setTop(tdata)
          setFloaded(true)
        })
        .catch((e) => {
          console.log(e)
        })
      const getTop = setInterval(async () => {
        const data = await request<UserTopT[]>('/get_top', 'GET')
        if (data != top) {
          setTop(data)
        }
      }, 1000 * 40)
      return () => {
        clearInterval(getTop)
      }
    }
  }, [])
  return !isAuth ? (
    <Redirect to="/" />
  ) : (
    <Loader loading={!floaded && !error}>
      <div className="container-md px-0 mt-md-3">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col" className="fs-5">
                № Name
              </th>
              <th scope="col" className="text-center fs-5">
                2 Last Games
              </th>
              <th scope="col" className="fs-5">
                Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {top && top.map((user) => <TopLine key={user.place} user={user} />)}
          </tbody>
        </table>
      </div>
    </Loader>
  )
}

type TopLineProps = {
  user: UserTopT
}

const TopLine: React.FC<TopLineProps> = ({ user }) => {
  return (
    <tr className="align-middle">
      <th className="fs-5">
        {user.place}: {user.name}
      </th>
      <td>
        <div className="row">
          {user.last.map((game) => (
            <Link
              key={new Date(game.timestamp).toISOString()}
              to={`/game/${game.timestamp}`}
              className={`${styles.hoveredLink} link-light text-decoration-none`}
            >
              <div className="col-12 text-center">
                <span className="m-0 fs-5">
                  {game.players.white.name} ({game.players.white.rank})&nbsp;
                  <div
                    className={`${styles.circleDot} ${styles.circleWhite}`}
                  ></div>
                  &nbsp;/&nbsp;
                  {game.players.black.name} ({game.players.black.rank})&nbsp;
                  <div
                    className={`${styles.circleDot} ${styles.circleBlack}`}
                  ></div>
                  &nbsp; score: {game.score}&nbsp;
                  {game.size}x{game.size}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </td>
      <td className="fs-5">{user.rank}</td>
    </tr>
  )
}

export default Top
