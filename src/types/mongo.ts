import { Document } from "mongoose";

/**
 * Definition of a ComicBook.
 */
export interface ComicBook extends Document {
  id: string;
  title: string;
  issue: string;
  releaseDate: Date;
  creators: object;
  series: Array<string>;
  publisher: Array<string>;
  coverUrl: string;
  url: string;
}

/**
 * Definition of a Creator
 */
export interface Creator extends Document {
  id: string;
  firstname: string;
  lastname: string;
  comicBooks: Array<string>;
}

/**
 * Definition of a Publisher
 */
export interface Publisher extends Document {
  id: string;
  name: string;
  iconUrl: string;
  url: string;
  basePath: string;
  seriesPath: string;
  searchPath: string;
  searchPathSeries: string;
  series: Array<string>;
}

/**
 * Definitin of a User
 */
export interface UserType extends Document {
  id: string;
  username: string;
  password: string;
  pullList: Array<string>;
  pulled: Array<string>;
  read: Array<string>;
}