"use strict";
exports.__esModule = true;
var express = require("express");
function setPath(p) {
    exports.path = p;
    return exports.path;
}
exports.setPath = setPath;
function setPort(p) {
    exports.port = p;
    return p;
}
exports.setPort = setPort;
exports.app = express();
//# sourceMappingURL=app.js.map