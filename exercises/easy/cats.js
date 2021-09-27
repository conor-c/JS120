// Factory Function
// let petFactory = function(name, age) {
//   return {
//     name, 
//     age,
//   }
// }

// let catFactory = function(name, age, color) {
//   let cats = petFactory(name, age);
//   cats.color = color;
//   cats.info = function() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
//   }

//   return cats;
// }

// let pudding = catFactory('Pudding', 7, 'black and white');
// let butterscotch = catFactory('Butterscotch', 10, 'tan and white');



// OLOO
// const petPrototype = {
//   init(name, age) {
//     this.name = name;
//     this.age = age;
//     return this;
//   },
// }

// const catPrototype = Object.create(petPrototype);

// catPrototype.init = function (name, age, color) {
//   petPrototype.init.call(this, name, age);
//   this.color = color;
//   return this;
// }

// catPrototype.info = function() {
//   return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
// }

// let pudding = Object.create(catPrototype).init('Pudding', 7, 'black and white');
// let butterscotch = Object.create(catPrototype).init('Butterscotch', 10, 'tan and white');



// Constructors / Prototypes
// function Pet(name, age) {
//   this.name = name;
//   this.age = age;
// }

// function Cat(name, age, color) {
//   Pet.call(this, name, age); // Be sure to call Pet with context, or you will add properties to the global object!
//   this.color = color;
// }

// Cat.prototype = Object.create(Pet.prototype);
// Cat.prototype.constructor = Cat;

// Cat.prototype.info = function() {
//   return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');


// Pseudo-Class
// Further Exploration: If a constructor is not explicitly set, it will be created implicitly. If the class is a base class, it will be an empty method.
// If it is a sub-class the constructor will call the parent constructor and pass along all arguments provided.
// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age);
//     this.color = color;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());