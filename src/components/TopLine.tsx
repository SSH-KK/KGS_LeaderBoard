import { TopUserInfoT } from '@type/top'
import React from 'react'
import styles from '@styles/Top.module.css'
import { Link } from 'react-router-dom'

export interface ITopLineProps {
  user: TopUserInfoT
}

export const TopLine: React.FC<ITopLineProps> = ({ user }) => {
  return (
    <tr className="align-middle">
      <th className="fs-5">
        {user.place}: {user.username}
      </th>
      <td>
        <div className="row">
          {user.games.map((game) => (
            <Link
              key={game.timestamp}
              to={`/game/${btoa(game.timestamp)}`}
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
