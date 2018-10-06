"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var rootQuery_1 = require("./types/rootQuery");
var rootMutation_1 = require("./types/rootMutation");
exports.Schema = function () { return [
    apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    schema {\n      query: RootQuery\n      mutation: RootMutation\n    }\n  "], ["\n    schema {\n      query: RootQuery\n      mutation: RootMutation\n    }\n  "]))),
    rootQuery_1.RootQuery,
    rootMutation_1.RootMutation
]; };
var templateObject_1;
//# sourceMappingURL=schema.js.map