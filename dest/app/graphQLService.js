"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports.setupGraphQL = function (app) {
    var server = new apollo_server_express_1.ApolloServer({
        typeDefs: apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      type Query {\n        hello: String\n      }\n    "], ["\n      type Query {\n        hello: String\n      }\n    "]))),
        resolvers: {
            Query: {
                hello: function () { return 'Hello World'; }
            }
        }
    });
    server.applyMiddleware({ app: app });
    return app;
};
var templateObject_1;
//# sourceMappingURL=graphQLService.js.map