"use strict";
exports.__esModule = true;
var comicSeries_1 = require("./comicSeries");
var type = "\n  type Publisher {\n    _id: String!\n    name: String!\n    iconUrl: String\n    url: String\n    basePath: String,\n    seriesPath: String,\n    searchPath: String,\n    searchPathSeries: String,\n    series: [ComicSeries]\n  }\n";
var input = "\n  input PublisherInput {\n    _id: String!\n    name: String!\n    url: String\n    baseUrl: String\n    searchPath: String\n    searchSeriesPath: String\n    seriesPath: String\n  }\n";
exports.Publisher = function () { return [type, input, comicSeries_1.ComicSeries]; };
//# sourceMappingURL=publisher.js.map