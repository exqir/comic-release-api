"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.Publisher = mongoose_1.model('Publisher', new mongoose_1.Schema({
    _id: String,
    name: String,
    iconUrl: String,
    url: String,
    basePath: String,
    seriesPath: String,
    searchPath: String,
    searchPathSeries: String,
    series: [mongoose_1.Schema.Types.ObjectId]
}, { collection: 'publishers' }));
//# sourceMappingURL=Publisher.js.map