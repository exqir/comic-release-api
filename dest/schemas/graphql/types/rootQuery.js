"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var search_1 = require("./search");
var pullList_1 = require("./pullList");
var publisher_1 = require("./publisher");
var comicSeries_1 = require("./comicSeries");
var comicBook_1 = require("./comicBook");
exports.RootQuery = function () { return [
    apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type RootQuery {\n      getSearchResults(q: String!, publishers: [String]): [Search]\n      getPullLists: [PullList!]!\n      getPullList(owner: String!): PullList\n      getPublishers(names: [String!]!): [Publisher!]\n      getPublisher(name: String!): Publisher\n      getComicSeries(id: ID!): ComicSeries\n      getComicBook(id: ID!): ComicBook\n    }\n  "], ["\n    type RootQuery {\n      getSearchResults(q: String!, publishers: [String]): [Search]\n      getPullLists: [PullList!]!\n      getPullList(owner: String!): PullList\n      getPublishers(names: [String!]!): [Publisher!]\n      getPublisher(name: String!): Publisher\n      getComicSeries(id: ID!): ComicSeries\n      getComicBook(id: ID!): ComicBook\n    }\n  "]))),
    search_1.Search,
    pullList_1.PullList,
    publisher_1.Publisher,
    comicSeries_1.ComicSeries,
    comicBook_1.ComicBook
]; };
var templateObject_1;
//# sourceMappingURL=rootQuery.js.map