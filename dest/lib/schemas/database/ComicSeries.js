"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    title: String,
    url: String,
    collectionsUrl: String,
    singleIssuesUrl: String,
    publisher: { type: String, ref: 'Publisher' },
    collections: [mongoose_1.Schema.Types.ObjectId],
    comicBooks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ComicBook' }]
}, { collection: 'comciSeries' });
schema.post('save', function (err, comicSeries) { return null; });
exports.ComicSeries = mongoose_1.model('ComicSeries', schema);
//# sourceMappingURL=ComicSeries.js.map