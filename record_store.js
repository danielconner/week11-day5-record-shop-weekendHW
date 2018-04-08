const _ = require("lodash");


var Record_Store = function(name, city, balance){
  this.name = name;
  this.city = city;
  this.balance = balance;
  this.inventory = [];
};

Record_Store.prototype.addRecord = function (record) {
  this.inventory.unshift(record)
};

Record_Store.prototype.removeRecord = function () {
  this.inventory.pop()
};

Record_Store.prototype.sellRecord = function (input) {
  let result = _.find(this.inventory, input)
  return this.balance += input.price;
};

Record_Store.prototype.totalAssets = function () {
  let result = _.sumBy(this.inventory, 'price');
  return this.balance += result;
};

Record_Store.prototype.filteredResults = function (genre) {
  let result =  _.filter(this.inventory,{genre: genre});
  return result
};




module.exports = Record_Store;
