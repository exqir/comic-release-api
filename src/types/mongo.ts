import { ObjectID } from 'mongodb'

export interface Search {
  title: string;
  url: string;
  publisher: string;
}

/**
 * Definition of a ComicBook
 */
export interface ComicBook {
  _id: ObjectID;
  title: string;
  issue: string;
  releaseDate: Date;
  creators: string[];
  series: string;
  publisher: string;
  coverUrl: string;
  url: string;
}

/**
 * Definition of a Creator
 */
export interface Creator {
  _id: ObjectID;
  firstname: string;
  lastname: string;
  comicBooks: string[];
}

/**
 * Definition of a Publisher
 */
export interface Publisher {
  _id: ObjectID;
  name: string;
  iconUrl: string;
  url: string;
  basePath: string;
  seriesPath: string;
  searchPath: string;
  searchPathSeries: string;
  series: string[];
}

/**
 * Definitin of a User
 */
export interface User {
  _id: ObjectID;
  username: string;
  password: string;
  pullList: string[];
  pulled: string[];
  read: string[];
  isValidPassword: (password: string) => Promise<boolean>;
}

/**
 * Definition of a PullList
 */
export interface PullList {
  _id: ObjectID;
  owner: string;
  list: string[];
}

/**
 * Definition of a ComicSeries
 */
export interface ComicSeries {
  title: string;
  url: string;
  collectionUrl: string;
  singleIssuesUrl: string;
  publisher: string;
  collections: string[];
  comicBooks: string[];
}
