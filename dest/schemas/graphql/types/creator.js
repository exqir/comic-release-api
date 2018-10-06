"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var comicSeries_1 = require("./comicSeries");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Creator {\n    _id: ID!\n    firstname: String\n    lastname: String!\n    series: [Series]\n  }\n"], ["\n  type Creator {\n    _id: ID!\n    firstname: String\n    lastname: String!\n    series: [Series]\n  }\n"])));
exports.Creator = function () { return [type, comicSeries_1.ComicSeries]; };
var templateObject_1;
//# sourceMappingURL=creator.js.map