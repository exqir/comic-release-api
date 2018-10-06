"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var comicSeries_1 = require("./comicSeries");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type PullList {\n    _id: ID!\n    owner: String!\n    list: [ComicSeries]\n  }\n"], ["\n  type PullList {\n    _id: ID!\n    owner: String!\n    list: [ComicSeries]\n  }\n"])));
exports.PullList = function () { return [type, comicSeries_1.ComicSeries]; };
var templateObject_1;
//# sourceMappingURL=pullList.js.map