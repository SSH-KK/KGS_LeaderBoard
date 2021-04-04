import { useCallback, useState, useEffect } from 'react'
import { createDB } from '@utils/createDB'
import { requestToDBT } from '@type/db'

const useDB = () => {
  const [db, setDB] = useState<IDBDatabase>()
  const [connected, SetConnected] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setDB(await createDB())
      SetConnected(true)
    })()
  }, [])

  const requestToDB: requestToDBT = useCallback(
    (request_type, store_name, payload = '') => {
      return new Promise((resolve, reject) => {
        if (db) {
          const transaction = db.transaction(store_name, 'readwrite')
          const store = transaction.objectStore(store_name)
          let store_request: IDBRequest
          if (request_type == 'add') {
            store_request = store.put(payload)
          } else if (request_type == 'single') {
            store_request = store.get(payload as IDBValidKey)
          } else if (request_type == 'all') {
            store_request = store.getAll()
          } else if (request_type == 'delete') {
            store_request = store.delete(payload as IDBValidKey)
          } else {
            store_request = store.put(1)
          }

          store_request.onsuccess = () => {
            resolve(store_request.result)
          }

          store_request.onerror = () => {
            reject(store_request.error)
          }
        }
      })
    },
    [db]
  )

  return { connected, requestToDB }
}

export default useDB
