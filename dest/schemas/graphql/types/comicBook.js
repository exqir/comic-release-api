"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var creator_1 = require("./creator");
var publisher_1 = require("./publisher");
var comicSeries_1 = require("./comicSeries");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type ComicBook {\n    _id: ID!\n    title: String!\n    issue: String\n    releaseDate: String\n    creators: [Creator]\n    series: ComicSeries\n    publisher: Publisher\n    coverUrl: String\n    url: String!\n  }\n"], ["\n  type ComicBook {\n    _id: ID!\n    title: String!\n    issue: String\n    releaseDate: String\n    creators: [Creator]\n    series: ComicSeries\n    publisher: Publisher\n    coverUrl: String\n    url: String!\n  }\n"])));
exports.ComicBook = function () { return [type, creator_1.Creator, publisher_1.Publisher, comicSeries_1.ComicSeries]; };
var templateObject_1;
//# sourceMappingURL=comicBook.js.map