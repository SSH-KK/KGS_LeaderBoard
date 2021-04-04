export type putDBT = <T>(
  store_name: string,
  key: string | number,
  obj: T
) => Promise<true | Error>

export type getDBT = <T>(store_name: string, key: string | number) => Promise<T>

export type listDBT = <T>(store_name: string) => Promise<Array<T>>

export type deleteDBT = (
  store_name: string,
  key: string | number
) => Promise<unknown | Error>

export type createDBStoreT = (store_name: string) => IDBObjectStore

export type createDBT = () => Promise<IDBDatabase>
