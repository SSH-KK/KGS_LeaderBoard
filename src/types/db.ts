export type putDBT = (store_name: string, key:string|number, obj: object) => Promise<any>

export type getDBT = (store_name: string, key: string|number) => Promise<object>

export type listDBT = (store_name: string) => Promise<Array<object>>

export type deleteDBT = (store_name: string, key:string|number) => Promise<any>

export type createDBStoreT = (store_name:string) => IDBObjectStore

export type createDBT = () => Promise<IDBDatabase>

