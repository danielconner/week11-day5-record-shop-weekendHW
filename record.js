var Record = function(artist, title, genre, price){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.properties= function(){
    return "artist: "+ this.artist + " title: " + this.title + " genre: " + this.genre + " price: " + this.price
  }
};

module.exports = Record;
