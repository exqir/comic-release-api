"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var pullList_1 = require("./pullList");
var publisher_1 = require("./publisher");
exports.RootMutation = function () { return [
    apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type RootMutation {\n      createPullList(owner: String!): PullList!\n      pullSeries(owner: String!, publisher: String!, seriesUrl: String!): PullList!\n      removeSeries(owner: String!, series: ID!): PullList!\n      login(username: String!, password: String!): String!\n      logout: Boolean!\n    }\n  "], ["\n    type RootMutation {\n      createPullList(owner: String!): PullList!\n      pullSeries(owner: String!, publisher: String!, seriesUrl: String!): PullList!\n      removeSeries(owner: String!, series: ID!): PullList!\n      login(username: String!, password: String!): String!\n      logout: Boolean!\n    }\n  "]))),
    pullList_1.PullList,
    publisher_1.Publisher
]; };
var templateObject_1;
//# sourceMappingURL=rootMutation.js.map