"use strict"

// let Honda = {
//   type: "Honda",
//   engineOn: true,
//   turnKey() {
//     this.engineOn = !this.engineOn;
//   }
// }

// console.log(Honda);


// Honda.turnKey();
// console.log(Honda);

// let carFactory = function(type) {
//   return {
//     type: type,
//     engineOn: true,
//     turnKey() {
//       this.engineOn = !this.engineOn;
//     },
//   }
// }

// let Honda = carFactory('Honda');
// console.log(Honda);
// Honda.turnKey();
// console.log(Honda);

// let carObject = {
//   init(name) {
//     this.name = name;
//     this.engineOn = true;
//     return this;
//   },

//   turnKey() {
//     this.engineOn = !this.engineOn;
//   }
// }

// let Honda = Object.create(carObject).init('Honda');
// console.log(Honda);
// Honda.turnKey();
// console.log(Honda);

// function CarConstructor(type) {
//   this.type = type;
//   this.engineOn = true;
// }

// CarConstructor.prototype.turnKey = function() {
//   this.engineOn = !this.engineOn;
// }

// function ElectricCar(type) {
//   CarConstructor.call(this, type);
//   this.electric = true;
// }

// ElectricCar.prototype = Object.create(CarConstructor.prototype);
// ElectricCar.prototype.constructor = ElectricCar;

// let ElectricHonda = new ElectricCar('Honda');
// console.log(ElectricHonda);
// ElectricHonda.turnKey();
// console.log(ElectricHonda);

// let Honda = new CarConstructor('Honda');
// console.log(Honda);
// Honda.turnKey();
// console.log(Honda);

// class CarClass {
//   constructor(type) {
//     this.type = type;
//     this.engineOn = true;
//   }

//   turnKey() {
//     this.engineOn = !this.engineOn;
//   }
// }

// let Honda = new CarClass('Honda');
// console.log(Honda);
// Honda.turnKey();
// console.log(Honda);
// let john = {
//   firstName: 'John',
//   lastName: 'Doe',
//   greetings: function() {
//     let self = this;
//     console.log('hello, ' + self.firstName + ' ' + self.lastName);
//   },
// };

// john.greetings();

// let john = {
//   firstName: 'John',
//   lastName: 'Doe',
//   greetings() {
//     console.log('hello, ' + this.firstName + ' ' + this.lastName);
//   },
// };

// let obj = {
//   firstName: 'blue'
// }

// let john = {
//   firstName: 'John',
//   lastName: 'Doe',
//   greetings: function() {
//     console.log('hello, ' + this.firstName + ' ' + this.lastName);
//   }.bind(obj),
//   this: this,
// };
// let gunShootingMixin = {
//   loadGun() {
//     console.log("Gun is loaded");
//   },
// }

// class Human {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   sayName() {
//     console.log(`My name is ${this.firstName} ${this.lastName}`);
//   }

//   loadGun() {
//     console.log("What gun?");
//   }
// }

// class Citizen extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName);
//   }
// }

// class Spy extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName);
//   }

//   sayName() {
//     console.log(`My name is John Doe`);
//   }
// }

// class Military extends Human {
//   constructor(firstName, lastName) {
//     super(firstName, lastName)
//   }
// }

// function mil(objClass) {
//   return objClass;
// }

// let test = mil(new Military('John', 'Smith'));
// console.log(test);


// Object.assign(Spy.prototype, gunShootingMixin);
// Object.assign(Military.prototype, gunShootingMixin);

// let group = [new Citizen('Conor', 'Chung'), 
//              new Spy('Jacob', 'Smith'), 
//              new Military("Blue", "Dude")];

// group.forEach(member => {
//   member.sayName();
//   member.loadGun();
// });

// let obj = {
//   a: 'hello',
//   b: 'world',
//   c: this,
//   d: function() {
//     return this;
//   },

//   foo: () => {
//       console.log(this.a + ' ' + this.b);
//       console.log(this)
//     }
//   }

// let test = {a: 'test'}

// obj.foo();
// console.log(obj.c === this)
// console.log(obj.d())
// // => hello world
// // => hello world

// let obj = {
//   a: 'hello',
//   b: 'world',
//   foo: function() {
//     console.log(this)
//     let callback = function(number, index) {
//       console.log(String(number) + ' ' + this.a + ' ' + this.b);
//       console.log(index)
//     };

//     [1, 2, 3].forEach(callback.bind(this))
//   },
// };

// obj.foo();

// let obj = {
//   a: 'hello',
//   b: 'world',
//   foo: function() {
//     [1, 2, 3].forEach(function(number) {
//       console.log(String(number) + ' ' + this.a + ' ' + this.b);
//     });
//   },
// };

// obj.foo();

// let foo = {
//   a: 0,
//   incrementA: function() {
//      let increment = () => {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// console.log(foo.a)

//Polymorphism, doesn't care about the type of object, just that the method
//invocation is the same

//Polymorphism Through Inheritance

// class Animal {
//   move() {
//     console.log("Both moves and does not move")
//   }
// }

// class Snake extends Animal {
//   move() {
//     console.log("Slithering");
//   }
// }

// class Human extends Animal {
//   move() {
//     console.log("Wiggles, Waggles, Walks, and Dances");
//   }
// }

// let earth = [new Snake(), new Human(), new Animal()];
// earth.forEach(creature => creature.move());


// Explain polymorphism
// Polymorphism is the concept of being able to interact with different objects
// through the same method invocation interface, and provide different results
// This can be achieved through inheritance using the prototypal chain.
// It can also be performed through duck-typing


// Inheritance -- Utilizes method overriding and prototypal inheritance 
// of methods to insure polymorphic relationships
class Alive {
  move() { // comment out to demonstrate why tree needs a move function

  }
}

class Tree extends Alive {}

class Human extends Alive {
  move() {
    console.log("humans can wiggle, waggle and jump");
  }
}

class Fish extends Alive {
  move() {
    console.log("Swims");
  }
}

let livingThings = [new Tree(), new Human(), new Fish()];
livingThings.forEach(thing => thing.move())



// DUCK TYPING - Objects of different types use the same method name
// to perform related but different functions.
class Runner {
  move() {
    this.run();
  }

  run() {
    console.log("One leg at a time, the run begins");
  }
}

class Biker {
  move() {
    this.pedal();
  }

  pedal() {
    console.log("Round and round we go! Feel the breeze!");
  }
}

// write this first.
let formsOfTransport = [new Runner(), new Biker()];
formsOfTransport.forEach(method => method.move());

