"use strict";
exports.__esModule = true;
var supertest = require("supertest");
var app_1 = require("../app");
var app = app_1.initializeApp();
function checkHeader(path, header, headerValue, expectedStatus) {
    if (expectedStatus === void 0) { expectedStatus = 200; }
    return supertest(app)
        .get(path)
        .expect(expectedStatus)
        .expect(header, headerValue);
}
exports.checkHeader = checkHeader;
function options(path, expectedStatus) {
    if (expectedStatus === void 0) { expectedStatus = 200; }
    return supertest(app)
        .options(path)
        .expect(expectedStatus);
}
exports.options = options;
function get(path, expectedPayload, expectedStatus, expectedType) {
    if (expectedStatus === void 0) { expectedStatus = 200; }
    if (expectedType === void 0) { expectedType = /json/; }
    return supertest(app)
        .get(path)
        .expect(expectedStatus)
        .expect('Content-Type', expectedType)
        .then(function (res) {
        expect(res.body).toEqual(expectedPayload);
    });
}
exports.get = get;
//# sourceMappingURL=utils.js.map