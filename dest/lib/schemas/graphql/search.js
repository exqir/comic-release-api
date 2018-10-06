"use strict";
exports.__esModule = true;
var publisher_1 = require("./publisher");
var type = "\n  type Search {\n    title: String!\n    url: String!\n    publisher: Publisher!\n  }\n";
exports.Search = function () { return [type, publisher_1.Publisher]; };
//# sourceMappingURL=search.js.map