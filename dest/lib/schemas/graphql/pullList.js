"use strict";
exports.__esModule = true;
var comicSeries_1 = require("./comicSeries");
var type = "\n  type PullList {\n    _id: ID!\n    owner: String!\n    list: [Series]\n  }\n";
exports.PullList = function () { return [type, comicSeries_1.ComicSeries]; };
//# sourceMappingURL=pullList.js.map