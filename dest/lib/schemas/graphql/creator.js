"use strict";
exports.__esModule = true;
var comicSeries_1 = require("./comicSeries");
var type = "\n  type Creator {\n    _id: ID!\n    firstname: String\n    lastname: String!\n    series: [Series]\n  }\n";
exports.Creator = function () { return [type, comicSeries_1.ComicSeries]; };
//# sourceMappingURL=creator.js.map