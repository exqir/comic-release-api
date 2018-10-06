"use strict";
exports.__esModule = true;
var publisher_1 = require("./publisher");
var comicBook_1 = require("./comicBook");
var type = "\n  type ComicSeries {\n    _id: ID!\n    title: String!\n    url: String!\n    collectionsUrl: String\n    issuesUrl: String\n    publisher: Publisher\n    collections: [Comic]\n    issues: [Comic]\n  }\n";
exports.ComicSeries = function () { return [type, publisher_1.Publisher, comicBook_1.ComicBook]; };
//# sourceMappingURL=comicSeries.js.map