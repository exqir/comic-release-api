"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.Creator = mongoose_1.model('Creator', new mongoose_1.Schema({
    fistname: String,
    lastname: String,
    comicBooks: [mongoose_1.Schema.Types.ObjectId]
}, { collection: 'creators' }));
//# sourceMappingURL=Creator.js.map