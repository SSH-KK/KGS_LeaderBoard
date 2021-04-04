import { useCallback, useState, useEffect } from 'react'
import { createDB } from '@utils/createDB'
import { putDBT, getDBT, listDBT, deleteDBT, createDBStoreT } from '@type/db'

const useDB = () => {
  const [db, setDB] = useState<IDBDatabase>()
  const [connected, SetConnected] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setDB(await createDB())
      SetConnected(true)
    })()
  }, [])

  const createDBStore: createDBStoreT = (store_name) => {
    if (db) {
      return db.transaction(store_name, 'readwrite').objectStore(store_name)
    }
    throw new Error('DB was not found')
  }

  const putDB: putDBT = useCallback(
    (store_name, key, obj) => {
      return new Promise((resolve, reject) => {
        if (db) {
          const store = createDBStore(store_name)
          const store_request = store.put(obj, key)

          store_request.onsuccess = () => {
            resolve(true)
          }

          store_request.onerror = () => {
            reject(store_request.error)
          }
        }
      })
    },
    [db]
  )

  const getDB: getDBT = useCallback(
    (store_name, key) => {
      return new Promise((resolve, reject) => {
        if (db) {
          const store = createDBStore(store_name)
          const store_request = store.get(key)

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

  const listDB: listDBT = useCallback(
    (store_name) => {
      return new Promise((resolve, reject) => {
        if (db) {
          const store = createDBStore(store_name)
          const store_request = store.getAll()

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

  const deleteDB: deleteDBT = useCallback(
    (store_name, key) => {
      return new Promise((resolve, reject) => {
        if (db) {
          const store = createDBStore(store_name)
          const store_request = store.delete(key)

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

  return { connected, putDB, getDB, listDB, deleteDB }
}

export default useDB
