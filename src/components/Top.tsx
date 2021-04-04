import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import UseHttp from '@hooks/useHttp'
import { TopUserInfoT } from '@type/top'
import Loader from '@components/Loader'
import { TopLine } from './TopLine'

export interface ITopProps {
  isAuth: boolean
}

const Top: React.FC<ITopProps> = ({ isAuth }) => {
  const [top, setTop] = useState<TopUserInfoT[]>([])
  const [floaded, setFloaded] = useState<boolean>(false)
  const { request, loading, error } = UseHttp()

  useEffect(() => {
    if (isAuth) {
      request<TopUserInfoT[]>('/get_top', 'GET')
        .then((tdata) => {
          setTop(tdata)
          setFloaded(true)
        })
        .catch((e) => {
          console.log(e)
        })

      const getTop = setInterval(async () => {
        const data = await request<TopUserInfoT[]>('/get_top', 'GET')
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

export default Top
