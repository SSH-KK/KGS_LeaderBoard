import { TOP_URL } from '@config/webConfig'
import { putDBT } from '@type/db'

export const getTop = async (addToDB: putDBT) => {
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

  rows.forEach((row) => {
    if (row.children.item(1) && row.children.item(2)) {
      const user = {
        place: row.children.item(0)!.textContent,
        name: row.children.item(1)!.children.item(0)!.textContent!,
        rank: row.children.item(2)!.textContent,
        last: [],
      }

      addToDB('top', user.name, user)
    }
  })
}
