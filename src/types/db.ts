export type createDBT = () => Promise<IDBDatabase>

export type requestToDBT = (
  request_type: 'add' | 'single' | 'all' | 'delete',
  store_name: string,
  payload?: object | string | number
) => Promise<Array<object> | object | string>
