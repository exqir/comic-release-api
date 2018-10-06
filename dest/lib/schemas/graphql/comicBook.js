"use strict";
exports.__esModule = true;
var creator_1 = require("./creator");
var publisher_1 = require("./publisher");
var comicSeries_1 = require("./comicSeries");
var type = "\n  type ComicBook {\n    _id: ID!\n    title: String!\n    issue: String\n    releaseDate: String\n    creators: [Creator]\n    series: Series\n    publisher: Publisher\n    coverUrl: String\n    url: String!\n  }\n";
exports.ComicBook = function () { return [type, creator_1.Creator, publisher_1.Publisher, comicSeries_1.ComicSeries]; };
//# sourceMappingURL=comicBook.js.map