import { createDBT } from '@type/db'

export const createDB: createDBT = () => {
  return new Promise((resolve, reject) => {
    const dbOpenRequest = indexedDB.open('my_db', 7)

    dbOpenRequest.onblocked = () => {
      reject(
        'Требуется обновление структуры базы данных, хранимой в вашем браузере, ' +
          'но браузер уведомил о блокировке базы данных.'
      )
    }

    dbOpenRequest.onerror = (err) => {
      console.log('Unable to open indexedDB')
      console.log(err)
      reject(
        'Невозможно открыть базу данных, либо при её открытии произошла неисправимая ошибка.'
      )
    }

    dbOpenRequest.onupgradeneeded = () => {
      console.log('UPGRADE DB')
      const db = dbOpenRequest.result
      if (!db.objectStoreNames.contains('user')) {
        db.createObjectStore('user', { keyPath: 'id', autoIncrement: true})
      }
      if (!db.objectStoreNames.contains('top')) {
        db.createObjectStore('top', { keyPath: 'username' })
      }
      if (!db.objectStoreNames.contains('game')) {
        db.createObjectStore('game', { keyPath: 'timestamp' })
      }
      if (!db.objectStoreNames.contains('game_query')) {
        db.createObjectStore('game_query', { keyPath: 'id',autoIncrement: true})
      }
    }

    dbOpenRequest.onsuccess = () => {
      console.log('Successfully open indexedDB connection')
      resolve(dbOpenRequest.result)
    }

    dbOpenRequest.onerror = reject
  })
}
