"use strict";
exports.__esModule = true;
var passport = require("passport");
var session = require("express-session");
exports.setupAuthentication = function (app) {
    app.use(session({
        secret: process.env.SESSION_SECRET || 'devMode',
        resave: false,
        saveUninitialized: false,
        name: '_sid'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    return app;
};
//# sourceMappingURL=authentication.js.map