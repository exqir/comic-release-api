"use strict";
exports.__esModule = true;
exports.notFound = function (_, res, next) {
    res.status(404).json({ error: 404, message: "Sorry, we don\'t know that path." });
};
exports.internalError = function (err, _, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 500, message: "Sorry, we had some problems with your request. Please try again." });
    next();
};
//# sourceMappingURL=error.js.map