"use strict";
exports.__esModule = true;
var express = require("express");
var ramda_1 = require("ramda");
var cors_1 = require("./cors");
var authentication_1 = require("./authentication");
var graphQLService_1 = require("./graphQLService");
var routes_1 = require("./routes");
exports.initializeApp = ramda_1.compose(routes_1.setupRoutes, graphQLService_1.setupGraphQL, authentication_1.setupAuthentication, cors_1.setupCors, express);
//# sourceMappingURL=index.js.map