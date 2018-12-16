import { Document, Model } from "mongoose";

export interface Search {
  title: string,
  url: string,
  publisher: string,
}

/**
 * Definition of a ComicBook
 */
export interface ComicBook extends Document {
  _id: string;
  title: string;
  issue: string;
  releaseDate: Date;
  creators: string[];
  series: string;
  publisher: string;
  coverUrl: string;
  url: string;
}

export interface ComicBookModel extends Model<ComicBook> { }

/**
 * Definition of a Creator
 */
export interface Creator extends Document {
  _id: string;
  firstname: string;
  lastname: string;
  comicBooks: Array<string>;
}

export interface CreatorModel extends Model<Creator> { }

/**
 * Definition of a Publisher
 */
export interface Publisher extends Document {
  _id: string;
  name: string;
  iconUrl: string;
  url: string;
  basePath: string;
  seriesPath: string;
  searchPath: string;
  searchPathSeries: string;
  series: Array<string>;
}

export interface PublisherModel extends Model<Publisher> { }

/**
 * Definitin of a User
 */
export interface User extends Document {
  _id: string;
  username: string;
  password: string;
  pullList: Array<string>;
  pulled: Array<string>;
  read: Array<string>;
  isValidPassword: (password: string) => Promise<boolean>
}

export interface UserModel extends Model<User> { }

/**
 * Definition of a PullList
 */
export interface PullList extends Document {
  owner: string;
  list: Array<string>;
}

export interface PullListModel extends Model<PullList> { }

/**
 * Definition of a ComicSeries
 */
export interface ComicSeries extends Document {
  title: string;
  url: string;
  collectionUrl: string;
  singleIssuesUrl: string;
  publisher: string;
  collections: Array<string>;
  comicBooks: Array<string>;
}

export interface ComicSeriesModel extends Model<ComicSeries> { }