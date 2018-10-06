"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var comicSeries_1 = require("./comicSeries");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Publisher {\n    _id: String!\n    name: String!\n    iconUrl: String\n    url: String\n    basePath: String,\n    seriesPath: String,\n    searchPath: String,\n    searchPathSeries: String,\n    series: [ComicSeries]\n  }\n"], ["\n  type Publisher {\n    _id: String!\n    name: String!\n    iconUrl: String\n    url: String\n    basePath: String,\n    seriesPath: String,\n    searchPath: String,\n    searchPathSeries: String,\n    series: [ComicSeries]\n  }\n"])));
var input = apollo_server_express_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  input PublisherInput {\n    _id: String!\n    name: String!\n    url: String\n    baseUrl: String\n    searchPath: String\n    searchSeriesPath: String\n    seriesPath: String\n  }\n"], ["\n  input PublisherInput {\n    _id: String!\n    name: String!\n    url: String\n    baseUrl: String\n    searchPath: String\n    searchSeriesPath: String\n    seriesPath: String\n  }\n"])));
exports.Publisher = function () { return [type, input, comicSeries_1.ComicSeries]; };
var templateObject_1, templateObject_2;
//# sourceMappingURL=publisher.js.map