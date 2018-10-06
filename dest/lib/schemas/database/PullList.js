"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.PullList = mongoose_1.model('PullList', new mongoose_1.Schema({
    owner: mongoose_1.Schema.Types.ObjectId,
    list: [mongoose_1.Schema.Types.ObjectId]
}, { collection: 'pullLists' }));
//# sourceMappingURL=PullList.js.map