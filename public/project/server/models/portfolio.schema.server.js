var mongoose = require("mongoose");

module.exports = function () {
    var PortfolioSchema = mongoose.Schema({
        Symbol: String,
        Name: String,
        PricePurchased: Number,
        Quantity: Number,
        userId: String
    }, {collection: 'project.portfolio'});
    return PortfolioSchema;
};