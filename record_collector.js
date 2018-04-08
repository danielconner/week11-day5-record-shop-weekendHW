const _ = require("lodash");


var Record_Collector = function(name, cash){
  this.name = name;
  this.cash = cash;
  this.collection =[];
}

Record_Collector.prototype.addRecordToCollection = function (record) {
  this.collection.push(record);
};

Record_Collector.prototype.buyRecord = function (record) {
  if(this.cash < record.price){
    return "Sorry you can't afford this record"
  } else {
    this.cash -= record.price;
    this.collection.push(record);
  }
};

Record_Collector.prototype.totalValueOfCollection = function () {
  let result = _.sumBy(this.collection, 'price');
  return result;
};

Record_Collector.prototype.totalValueFilteredByGenre = function (genre) {
  let results = _.filter(this.collection, {genre: genre});
  let total = _.sumBy(results, 'price');
  return total;
};

Record_Collector.prototype.mostValuebleRecord = function () {
  let result = _.maxBy(this.collection, 'price');
  return result;
};

Record_Collector.prototype.sortByDescOrder = function () {
  let results = _.orderBy(this.collection, 'price', 'desc')
  return results;
};

Record_Collector.prototype.sortByAscdOrder = function () {
  let results = _.sortBy(this.collection, 'price')
  return results;
};

Record_Collector.prototype.compareCollection = function (collector) {
  if(this.totalValueOfCollection() > collector.totalValueOfCollection()){
    return "Yours is more expensive"
  } else if (this.totalValueOfCollection() == collector.totalValueOfCollection()){
    return "Both collections are equal"
  } else {
    return collector.name + " has the more expensive collection"
  }
};

module.exports = Record_Collector;
