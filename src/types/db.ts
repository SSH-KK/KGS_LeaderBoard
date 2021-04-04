export type putDBT = <T>(store_name: string, obj: T) => Promise<true | Error>

export type getDBT = <T>(store_name: string, key: string | number) => Promise<T>

export type listDBT = (store_name: string) => Promise<Array<any>>

export type deleteDBT = (
  store_name: string,
  key: string | number
) => Promise<unknown | Error>

export type createDBStoreT = (store_name: string) => IDBObjectStore

export type createDBT = () => Promise<IDBDatabase>
