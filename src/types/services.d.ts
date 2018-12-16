interface QueryProperty {
  [index: string]: any
}

export interface DataService<T> {
  create: (instance: T) => Promise<T>
  getById(id: string): Promise<T>
  getAll?(): Promise<T[]>
  getByList?: (list: string[]) => Promise<T[]>
  getByQuery?: (query: QueryProperty) => Promise<T>
}

export interface DataListService<T> extends DataService<T> {
  insert: (listId: string, childId: string) => Promise<T>
  remove?: (listId: string, childId: string) => Promise<T>
}