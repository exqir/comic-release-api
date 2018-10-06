"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var publisher_1 = require("./publisher");
var comicBook_1 = require("./comicBook");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type ComicSeries {\n    _id: ID!\n    title: String!\n    url: String!\n    collectionsUrl: String\n    issuesUrl: String\n    publisher: Publisher\n    collections: [Comic]\n    issues: [Comic]\n  }\n"], ["\n  type ComicSeries {\n    _id: ID!\n    title: String!\n    url: String!\n    collectionsUrl: String\n    issuesUrl: String\n    publisher: Publisher\n    collections: [Comic]\n    issues: [Comic]\n  }\n"])));
exports.ComicSeries = function () { return [type, publisher_1.Publisher, comicBook_1.ComicBook]; };
var templateObject_1;
//# sourceMappingURL=comicSeries.js.map