"use strict";
exports.__esModule = true;
var authenticationController = require("../controller/authentication");
var healthController = require("../controller/health");
var errorController = require("../controller/error");
exports.setupRoutes = function (app) {
    app.get('/', authenticationController.getHome);
    app.get('/login', authenticationController.getLogin);
    app.post('/login', authenticationController.postLogin);
    app.post('/register', authenticationController.postRegister);
    app.get('/.status', healthController.getStatus);
    app.use(errorController.internalError);
    app.use(errorController.notFound);
    return app;
};
//# sourceMappingURL=routes.js.map