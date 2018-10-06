"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var publisher_1 = require("./publisher");
var type = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Search {\n    title: String!\n    url: String!\n    publisher: Publisher!\n  }\n"], ["\n  type Search {\n    title: String!\n    url: String!\n    publisher: Publisher!\n  }\n"])));
exports.Search = function () { return [type, publisher_1.Publisher]; };
var templateObject_1;
//# sourceMappingURL=search.js.map