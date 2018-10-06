"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var rootQuery_1 = require("./rootQuery");
var rootMutation_1 = require("./rootMutation");
var search_1 = require("./search");
var publisher_1 = require("./publisher");
var pulllist_1 = require("./pulllist");
var series_1 = require("./series");
var comic_1 = require("./comic");
exports.resolvers = __assign({}, rootQuery_1["default"], rootMutation_1["default"], search_1.SearchResolver, publisher_1.PublisherResolver, pulllist_1.PullListResolver, series_1.SeriesResolver, comic_1.ComicResolver);
//# sourceMappingURL=resolvers.js.map