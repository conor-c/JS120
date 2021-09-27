class Cat {
  constructor(name) {
    this.name = name;
  }

  speaks() {
    return `${this.name} says meowww.`;
  }
}



// let fakeCat = {};
// fakeCat.__proto__ = Cat.prototype;

// or

let fakeCat = Object.create(Cat.prototype);

console.log(fakeCat instanceof Cat);
console.log(fakeCat.name);
console.log(fakeCat.speaks());
console.log(Cat.prototype);
console.log(fakeCat.prototype);
console.log(Cat.constructor);
console.log(fakeCat.constructor);