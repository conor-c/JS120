let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

console.log(franchise.allMovies());

// returns undefined instead of httyd because when we pass our callback function into map, we are losing the context of this
// use an arrow function, pass in this manually, or pass in this using the built in parameter