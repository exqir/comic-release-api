"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
exports.ComicBook = mongoose_1.model('ComicBook', new mongoose_1.Schema({
    title: String,
    issue: String,
    releaseDate: Date,
    creators: [mongoose_1.Schema.Types.ObjectId],
    series: mongoose_1.Schema.Types.ObjectId,
    publisher: mongoose_1.Schema.Types.ObjectId,
    coverUrl: String,
    url: String
}, { collection: 'comicBooks' }));
//# sourceMappingURL=ComicBook.js.map