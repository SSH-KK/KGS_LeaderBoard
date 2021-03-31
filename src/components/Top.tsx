import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import UseHttp from '@hooks/useHttp'
import { UserTopT } from '@type/top'
import Loader from '@components/Loader'
import styles from '@styles/Top.module.css'

const Top: React.FC = () => {
  const [top, setTop] = useState<UserTopT[]>([])
  const [floaded, setFloaded] = useState<boolean>(false)
  const { request, error } = UseHttp()

  useEffect(() => {
    request<UserTopT[]>('/get_top', 'GET').then((tdata) => {
      setTop(tdata)
      setFloaded(true)
    })
    const getTop = setInterval(async () => {
      const data = await request<UserTopT[]>('/get_top', 'GET')
      if (data != top) {
        setTop(data)
      }
    }, 1000 * 20)
    return () => {
      clearInterval(getTop)
    }
  }, [])
  return (
    <Loader loading={!floaded || error != null}>
      <div className="container mt-3">
        <div className="row h-100 bg-dark p-3 rounded">
          <div className="col-md-12 border-2 border-start py-2 border-white border-end justify-content-between align-items-center d-flex text-white">
            <div className="row justify-content-center align-items-center m-0 w-100">
              <div className="col-3 px-0 fs-5 justify-content-start align-items-center d-flex">
                <p className="fw-bold mb-0">№ Name</p>
              </div>
              <div className="col-7 px-0 fs-5 justify-content-start align-items-center d-flex">
                <p className=" mb-0 fw-bold">Last 2 games</p>
              </div>
              <div className="col-1 px-0 fs-5 justify-content-center align-items-center d-flex">
                <p className=" mb-0 fw-bold">Rank</p>
              </div>
            </div>
          </div>
          {top.map((user) => (
            <TopLine key={user.place} user={user} />
          ))}
        </div>
      </div>
    </Loader>
  )
}

type TopLineProps = {
  user: UserTopT
}

const TopLine: React.FC<TopLineProps> = ({ user }) => {
  return (
    <div
      className={`${
        (user.place - 1) % 2 == 0 ? styles.odLine : ''
      } col-md-12 border-2 border-start py-2 border-white border-end justify-content-between align-items-center d-flex text-white`}
    >
      <div className="row justify-content-center align-items-center m-0 w-100">
        <div className="col-3 px-0 fs-5 justify-content-start align-items-center d-flex fw-bold">
          <p className="mb-0">
            {user.place}: {user.name}
          </p>
        </div>
        <div className="col-7 px-0 fs-6 align-items-center flex-column d-flex">
          {user.last.map((game) => (
            <Link
              to={`/game/${game.timestamp}`}
              key={game.timestamp.toISOString()}
              className="d-flex align-items-center w-100 py-2 fw-bold"
            >
              <p className="mb-0">
                {game.players.white.name} ({game.players.white.rank})
              </p>
              <div
                className={`mx-1 ${styles.circleDot} ${styles.circleWhite}`}
              ></div>
              <p className="mb-0">&nbsp;/&nbsp;</p>
              <p className="mb-0">
                {game.players.black.name} ({game.players.white.rank})
              </p>
              <div
                className={`mx-1 ${styles.circleDot} ${styles.circleBlack}`}
              ></div>
              <p className="mb-0 ms-2">score: {game.score}</p>
              <p className="mb-0 ms-2">
                {game.size}x{game.size}
              </p>
            </Link>
          ))}
        </div>
        <div className="col-1 px-0 fs-5 justify-content-center align-items-center d-flex fw-bold">
          <p className=" mb-0">{user.rank}</p>
        </div>
      </div>
    </div>
  )
}

export default Top
