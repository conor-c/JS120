// // Factory Function Pattern
// const walkFactory = function() {
//   return {
//     walk() {
//       return `${this.name} ${this.gait()} forward`;
//     },
//   }
// }

// const personFactory = function(name) {
//   let personType = walkFactory();
//   personType.name = name;
//   personType.gait = function() {
//     return "strolls";
//   };

//   return personType;
// }

// const catFactory = function(name) {
//   let catType = walkFactory();
//   catType.name = name;
//   catType.gait = function() {
//     return "saunters";
//   };

//   return catType;
// }

// const cheetahFactory = function(name) {
//   let cheetahType = walkFactory();
//   cheetahType.name = name;
//   cheetahType.gait = function() {
//     return "runs";
//   };

//   return cheetahType;
// }

// let mike = personFactory('Mike');
// console.log(mike.walk());

// let kitty = catFactory('Kitty');
// console.log(kitty.walk());

// let flash = cheetahFactory("Flash");
// console.log(flash.walk());



// // OLOO Pattern
// const walkPrototype = {
//   walk() {
//     return `${this.name} ${this.gait()} forward`;
//   },
// };


// const personPrototype = Object.create(walkPrototype);

// personPrototype.init = function(name) {
//   this.name = name;
//   return this;
// };

// personPrototype.gait = function() {
//   return "strolls";
// };

// const catPrototype = Object.create(walkPrototype);

// catPrototype.init = function(name) {
//   this.name = name;
//   return this;
// };

// catPrototype.gait = function() {
//   return "saunters";
// };

// const cheetahPrototype = Object.create(walkPrototype);

// cheetahPrototype.init = function(name) {
//   this.name = name;
//   return this;
// };

// cheetahPrototype.gait = function() {
//   return "runs";
// };

// let mike = Object.create(personPrototype).init("Mike");
// console.log(mike.walk());

// let kitty = Object.create(catPrototype).init("Kitty");
// console.log(kitty.walk());

// let flash = Object.create(cheetahPrototype).init("Flash");
// console.log(flash.walk());



// // Constructors/Prototypes Pattern
// function Walk() {};

// Walk.prototype.walk = function() {
//   return `${this.name} ${this.gait()} forward`;
// };

// function Person(name) {
//   this.name = name;
// };

// Person.prototype = Object.create(Walk.prototype);
// Person.prototype.constructor = Person;

// Person.prototype.gait = function() {
//   return "strolls";
// };

// function Cat(name) {
//   this.name = name;
// };

// Cat.prototype = Object.create(Walk.prototype);
// Cat.prototype.constructor = Cat;

// Cat.prototype.gait = function() {
//   return "saunters";
// };

// function Cheetah(name) {
//   this.name = name;
// }

// Cheetah.prototype = Object.create(Walk.prototype);
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.gait = function() {
//   return "runs";
// };

// let mike = new Person("Mike");
// console.log(mike.walk());

// let kitty = new Cat("Kitty");
// console.log(kitty.walk());

// let flash = new Cheetah("Flash");
// console.log(flash.walk());



// // Pseudo-Classical Pattern
// const walkMixin = {
//   walk() {
//     return `${this.name} ${this.gait()} forward`;
//   },
// }

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "strolls";
//   }
// }

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "saunters";
//   }
// }

// class Cheetah {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "runs";
//   }
// }

// Object.assign(Person.prototype, walkMixin);
// Object.assign(Cat.prototype, walkMixin);
// Object.assign(Cheetah.prototype, walkMixin);

// let mike = new Person("Mike");
// console.log(mike.walk());
// // "Mike strolls forward"

// let kitty = new Cat("Kitty");
// console.log(kitty.walk());
// // "Kitty saunters forward"

// let flash = new Cheetah("Flash");
// console.log(flash.walk());
// // "Flash runs forward"