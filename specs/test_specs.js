var assert = require('assert');
var Record = require('../record.js');
var Record_Store = require('../record_store.js');
var Record_Collector = require('../record_collector.js');

var record1
var record2
var record3
var record4
var record5
var record6
var record7
var record_store
var record_collector1
var record_collector2

describe("record", function(){
  beforeEach(function(){
    record1 = new Record("Queen", "Killer Queen", "Rock", 25.98);
    record2 = new Record("Taylor Swift", "Reputaytion", "Pop", 9.99);
    record3 = new Record("Green Day", "Dookie", "Rock", 18.00);
  })

  it("should have a artist", function(){
    assert.deepStrictEqual(record1.artist, "Queen")
  })

  it("should have a title", function(){
    assert.deepStrictEqual(record2.title, "Reputaytion")
  })

  it("should have a genre", function(){
    assert.deepStrictEqual(record3.genre, "Rock")
  })

  it("should have a price", function(){
    assert.deepStrictEqual(record1.price, 25.98);
  })

  it("should be able to list properties", function(){
    assert.deepStrictEqual(record3.properties(), "artist: Green Day title: Dookie genre: Rock price: 18");
  })

});

describe("record_store", function(){
  beforeEach(function(){
    record1 = new Record("Queen", "Killer Queen", "Rock", 25.98);
    record2 = new Record("Taylor Swift", "Reputaytion", "Pop", 9.99);
    record3 = new Record("Green Day", "Dookie", "Rock", 18.00);
    record_store = new Record_Store("A record store", "London", 0);
    record_store.addRecord(record1)
    record_store.addRecord(record2)
    record_store.addRecord(record3)
  })

  it("should have a name", function(){
    assert.deepStrictEqual(record_store.name, "A record store")
  })

  it("should have a city", function(){
    assert.deepStrictEqual(record_store.city, "London")
  })

  it("should have a balance", function(){
    assert.deepStrictEqual(record_store.balance, 0)
  })


  it("should be able to rmeove records from inventory", function(){
    record_store.removeRecord()
    assert.deepStrictEqual(record_store.inventory.length, 2);
  })

  it("should be able to sell a record", function(){
    record_store.sellRecord(record3)
    assert.deepStrictEqual(record_store.balance, 18);
  })

  it("should be able to produce assest report", function(){
    assert.deepStrictEqual(record_store.totalAssets(), 53.97);
  })

  it("should be able to view all items filtered by genre", function(){
    assert.deepStrictEqual(record_store.filteredResults("Rock"), [record3, record1]);
  })

});

describe("record_collector", function(){
  beforeEach(function(){
    record1 = new Record("Queen", "Killer Queen", "Rock", 25.98);
    record2 = new Record("Taylor Swift", "Reputaytion", "Pop", 9.99);
    record3 = new Record("Green Day", "Dookie", "Rock", 18.00);
    record4 = new Record("Alan Russell", "Rememeber Me", "Jazz", 51.00);
    record5 = new Record("Generic", "Test Album", "Pop", 31.00);
    record6 = new Record("Another Artist", "Some Many Albums", "Jazz", 151.00);
    record7 = new Record("Lack Of Creativity", "Huh", "Rock", 521.00);
    record_store = new Record_Store("A record store", "London", 0);
    record_store.addRecord(record1)
    record_collector1 = new Record_Collector("Sophia", 100);
    record_collector2 = new Record_Collector("Colin", 50);
    record_collector1.addRecordToCollection(record2);
    record_collector2.addRecordToCollection(record3);
    record_collector2.addRecordToCollection(record7);
    record_collector2.addRecordToCollection(record5);
    record_collector2.addRecordToCollection(record6);
  })

  it("check that collector has name", function(){
    assert.deepStrictEqual(record_collector1.name, "Sophia");
  })

  it("check that collector has cash", function(){
    assert.deepStrictEqual(record_collector2.cash, 50);
  })

  it("check that collector has album in collection", function(){
    assert.deepStrictEqual(record_collector1.collection.length, 1);
  })

  it("check that collector can buy record", function(){
    record_collector1.buyRecord(record1);
    record_store.sellRecord(record1);
    assert.deepStrictEqual(record_collector1.cash, 74.02);
    assert.deepStrictEqual(record_collector1.collection.length, 2);
    assert.deepStrictEqual(record_store.balance, 25.98);
  })

  it("check collector cant buy record if they cant afford it", function(){

    assert.deepStrictEqual(record_collector2.buyRecord(record4), "Sorry you can't afford this record");
    assert.deepStrictEqual(record_collector2.collection.length, 4);
  })

  it("should be able to view total value of collection", function(){
    assert.deepStrictEqual(record_collector1.totalValueOfCollection(), 9.99);
  })

  it("should be able to view filter results of collection based on genre", function(){
    assert.deepStrictEqual(record_collector2.totalValueFilteredByGenre("Rock"), 539);
  })

  it('Should be able to view most valuable record', function(){
    assert.deepStrictEqual(record_collector2.mostValuebleRecord(), record7);
  })

  it("Should be able to return sorted list of collection in descending order", function(){
    assert.deepStrictEqual(record_collector2.sortByDescOrder(), [record7, record6, record5, record3]);
  })

  it("should be able to return sorted list of collection in ascending order", function(){
    assert.deepStrictEqual(record_collector2.sortByAscdOrder(), [record3, record5, record6, record7]);
  })

  it('should be able to comapre the total value with other collectors', function(){
    assert.deepStrictEqual(record_collector2.compareCollection(record_collector1), "Yours is more expensive");
  })

});
