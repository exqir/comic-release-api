"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
describe('Basic server functionalities', function () {
    test('should set `Access-Control-Allow-Origin` header', function () {
        return utils_1.checkHeader('/.status', 'Access-Control-Allow-Origin', '*');
    });
    test('should set `Access-Control-Allow-Headers` header', function () {
        return utils_1.checkHeader('/.status', 'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    });
    test('should answer `options` requests with 200', function () {
        return utils_1.options('/.status');
    });
    test('should provide a status route', function () {
        return utils_1.get('/.status', { status: "OK" });
    });
    test('should provide error message for unknown path', function () {
        return utils_1.get('/foo', { error: 404, message: "Sorry, we don\'t know that path." }, 404);
    });
});
//# sourceMappingURL=server.test.js.map