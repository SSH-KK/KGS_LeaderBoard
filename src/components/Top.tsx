import React, { useEffect, useState } from 'react'
import UseHttp from '@hooks/UseHttp'
import { UserTopT } from '@type/top'
import Loader from '@components/Loader'

const Top: React.FC = () => {
  const [top, setTop] = useState<UserTopT[]>([])
  const [floaded, setFloaded] = useState<Boolean>(false)
  const { request, loading, error } = UseHttp()

  useEffect(() => {
    request('http://stuvars.com:8081/top', 'GET').then((tdata) => {
      setTop(tdata)
      setFloaded(true)
    })
    const getTop = setInterval(async () => {
      const data = await request('http://stuvars.com:8081/top', 'GET')
      if (data != top) {
        setTop(data)
      }
    }, 1000 * 20)
    return () => {
      clearInterval(getTop)
    }
  }, [])

  return (
    <Loader loading={!floaded}>
      <div className="container mt-3">
        <div className="row h-100 bg-dark p-3 rounded">
          {Array(4)
            .fill(0)
            .map((_, tempIndex) => (
              <div
                key={`${tempIndex}head`}
                className={`${
                  tempIndex == 0 ? 'border-start' : ''
                } col-md-3 border-2 border-white border-end justify-content-between d-flex text-white`}
              >
                <p>№ Name</p>
                <p>Rank</p>
              </div>
            ))}
          {top.slice(0, 25).map((_, userIndex) =>
            Array(4)
              .fill(0)
              .map((_, tempIndex) => (
                <div
                  key={top[25 * tempIndex + userIndex].place}
                  className={`${
                    tempIndex == 0 ? 'border-start' : ''
                  } col-md-3 border-2 border-white border-end justify-content-between d-flex text-white`}
                >
                  <div className="mb-1 fs-6 d-flex">
                    <p className="fw-bold">
                      {top[25 * tempIndex + userIndex].place}:
                    </p>
                    &nbsp;{top[25 * tempIndex + userIndex].name}
                  </div>
                  <p className="mb-1 fs-6">
                    {top[25 * tempIndex + userIndex].rank}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </Loader>
  )
}

export default Top
