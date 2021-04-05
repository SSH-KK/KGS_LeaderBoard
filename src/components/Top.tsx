import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { TopUserInfoT } from '@type/top'
import Loader from '@components/Loader'
import { TopLine } from './TopLine'
import { DoRequest } from '@hooks/useAPI'
import { getTop } from '@utils/getTop'
import { SetStateFT } from '@type/utils'

export interface ITopProps {
  isAuth: boolean
  doRequest: DoRequest
  usersTop: TopUserInfoT[]
  setTop: SetStateFT<TopUserInfoT[]>
}

const Top: React.FC<ITopProps> = ({ isAuth, doRequest, usersTop, setTop }) => {
  const [floaded, setFloaded] = useState<boolean>(false)

  useEffect(() => {
    if (isAuth) {
      getTop(doRequest, setTop)
    }
  }, [])

  useEffect(() => {
    if (usersTop.length == 100) setFloaded(true)
    if (usersTop.length > 0) console.log('Loaded new top:', usersTop.slice(-1))
  }, [usersTop.length])

  return !isAuth ? (
    <Redirect to="/" />
  ) : (
    <Loader loading={!floaded}>
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
            {top &&
              usersTop.map((user) => (
                <TopLine key={user.username} user={user} />
              ))}
          </tbody>
        </table>
      </div>
    </Loader>
  )
}

export default Top
