import { TOP_URL } from '@config/webConfig'
import { DoRequest } from '@hooks/useAPI'
import { getDBT, putDBT } from '@type/db'
import { JoinArchiveRequest } from '@type/requests'
import { TopUserInfoT } from '@type/top'
import { RequestTypes } from '@type/fetch'

export const getTop = async (
  addToDB: putDBT,
  getFromDB: getDBT,
  doRequest: DoRequest
) => {
  const page = await fetch(TOP_URL, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'text/html',
    },
  })

  const pageHTML = await page.text()

  const dom = new DOMParser().parseFromString(pageHTML, 'text/html')

  const rows = new Array(...dom.getElementsByTagName('tr')).filter((row) => {
    const cells = new Array(...row.getElementsByTagName('td'))
    return (
      cells &&
      cells[0] &&
      cells[0].textContent &&
      /^\d/.test(cells[0].textContent)
    )
  })

  const q = []

  for (const row of rows) {
    if (row.children.item(1) && row.children.item(2)) {
      const user: TopUserInfoT = {
        place: parseInt(row.children.item(0)!.textContent!),
        username: row.children.item(1)!.children.item(0)!.textContent!,
        rank: row.children.item(2)!.textContent!,
        games: [],
      }

      // const userInDB = await getFromDB<TopUserInfoT>('top', user.username)

      // console.log('DB user response for fetch', userInDB)

      // if (!userInDB) addToDB('top', user)

      // if (!userInDB || userInDB.games.length == 0) {
      console.info('Started fetching', user.username)
      await doRequest<JoinArchiveRequest>({
        type: RequestTypes.joinArchive,
        name: user.username,
      })
      // }
    }
  }

  return 'Requested all data'
}
