import React, { useEffect, useState } from 'react'
import UseHttp from '@hooks/UseHttp'
import { UserTopT } from '@type/top'
import Loader from '@components/Loader'
import styles from '@styles/Top.module.css'

const Top: React.FC = () => {
  const [top, setTop] = useState<UserTopT[]>([])
  const [floaded, setFloaded] = useState<Boolean>(false)
  const { request, loading, error } = UseHttp()

  useEffect(() => {
    request('http://stuvars.com:8081/get_top', 'GET').then((tdata) => {
      console.log(tdata)
      setTop(tdata)
      setFloaded(true)
    })
    const getTop = setInterval(async () => {
      const data = await request('http://stuvars.com:8081/get_top', 'GET')
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
          {top.map((_, userIndex) => (
            <div
              key={top[userIndex].place}
              className={`${
                userIndex % 2 == 0 ? styles.odLine : ''
              } col-md-12 border-2 border-start py-2 border-white border-end justify-content-between align-items-center d-flex text-white`}
            >
              <div className="row justify-content-center align-items-center m-0 w-100">
                <div className="col-3 px-0 fs-5 justify-content-start align-items-center d-flex fw-bold">
                  <p className="mb-0">{top[userIndex].place}: {top[userIndex].name}</p>
                </div>
                <div className="col-7 px-0 fs-6 align-items-center flex-column d-flex">
                  {top[userIndex].last.map((game, gameIndex) => (
                    <div className="d-flex align-items-center w-100 py-2 fw-bold">
                      <p className="mb-0">{game.players.white.name} ({game.players.white.rank})</p>
                      <div
                        className={`mx-1 ${styles.circleDot} ${styles.circleWhite}`}
                      ></div>
                      <p className="mb-0">&nbsp;/&nbsp;</p>
                      <p className="mb-0">{game.players.black.name} ({game.players.white.rank})</p>
                      <div
                        className={`mx-1 ${styles.circleDot} ${styles.circleBlack}`}
                      ></div>
                      <p className="mb-0 ms-2">score: {game.score}</p>
                      <p className="mb-0 ms-2">{game.size}x{game.size}</p>
                    </div>
                  ))}
                </div>
                <div className="col-1 px-0 fs-5 justify-content-center align-items-center d-flex fw-bold">
                  <p className=" mb-0">{top[userIndex].rank}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Loader>
  )
}

export default Top
