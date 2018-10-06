"use strict";
exports.__esModule = true;
var app_1 = require("./app");
function start() {
    var app = app_1.initializeApp();
    var port = parseInt(process.env.PORT) || 3000;
    var path = process.env.APIPATH || '/api/graphql/v1/';
    return app.listen({ port: port }, function () { return console.log("Started Comic APP on http://localhost:" + port + path); });
}
exports.start = start;
start();
//# sourceMappingURL=index.js.map