/*
1. Object Oriented Programming is practice/paradigm that bundles together states and the behaviors that will operate on those states, together.

2. Some advantages of OOP:
  OOP breaks down the problem space into smaller pieces (objects) that are easier to maintain and work with.
  It reduces dependencies, as objects are typically responsible for their respective operations, and are initialized with the needed data.

  Some disadvantages of OOP:
    It can often create a larger program than a procedural version.
    It can even be less efficient, and more memory intensive

3. Encapsulation in JavaScript refers to the process of bundling state and the behaviors that will operate on that state data into one object.
    (grouping of related properties and methods into one object)

4. JS encapsulation is above, in other OO languages encapsulation typically refers to hiding access to object state, and being able to manipulate that state, only through
a public interface. An object should only expose the properties and related methods that other objects need to use the encapsulated object. Encapsulation is about access restriction.

Creating Objects
*/

// let person = {
//   name: 'Conor',
//   age: 27,
// };

// // The above is just data, no behaviors (methods) associated with the person object
// // If we want to make the object more useful...

// person.predictAge = function(years) {
//   console.log(`In ${years} years ${this.name} will be ${this.age + years} years old.`);
// }

// person.predictAge(10);

// We added a .predictAge method, that takes a years argument, and adds it to the persons current age, logging the results in a string
// We utilized the `this` keyword in our method definition, in our case, `this` refers to the object `person` because we implicitly set the execution context
// to person when we call it as a method using person as the calling object.

// We now have a person object that has a somewhat useful behavior, that utilizes the objects state.
// But what if we wanted to make multiple persons? In order to save time, we should come up with a way to create objects programmatically

// Object Creation Patterns
// There are a few main ways to create objects programmatically
// 1. Factory Functions (Object factories)
// This method uses a function that returns an object

// let personFactory = function(name, age) {
//   return {
//     name,
//     age,
//     predictAge(years) {
//       console.log(`In ${years} years ${this.name} will be ${this.age + years} years old.`);
//     }
//   }
// }

// let conor = personFactory('Conor', 27);
// // conor.predictAge(10);

// // You can also use a factory function as a super-type for another factory function

// let humanoidFactory = function(name, age, model) {
//   let humanoid = personFactory(name, age);
//   humanoid.model = model;
//   humanoid.speak = function() {
//     console.log(`I am a ${this.model} model humanoid unit.`);
//   };
//   let humanAge = humanoid.predictAge;
//   humanoid.predictAge = function() {
//     humanAge;
//     console.log("Did I forget to mention I am a robot?");
//   }
//   return humanoid;
// }

// let robotConor = humanoidFactory('Conor', 27, 'Tesla Zen');
// // robotConor.speak();
// robotConor.predictAge(10);

// factory functions provide a straightforward way to reuse code. It's easier to read and understand what's going on.
// The problem with factory functions is that every property and method is contained in all instances of the factory function,
// and you also cannot directly tell if any given object is an instance of the factory function.

// 2. OLOO, (Objects linking to other objects)
// instead of creating a function that returns and object, we create an object that contains a init method to establish state,
// and we create instances of it using the Object.create() method to establish a prototypal chain

// let personFactory = {
//   init(name, age) {
//     this.name = name;
//     this.age = age;
//     return this;
//   },

//   predictAge(years) {
//     console.log(`In ${years} years ${this.name} will be ${this.age + years} years old.`);
//   },
// }

// // let conor = Object.create(personFactory).init('Conor', 27);
// // console.log(Object.getPrototypeOf(conor) === personFactory);
// // console.log(personFactory.isPrototypeOf(conor))
// // conor.predictAge(10)

// // we can easily use this pattern to establish super-sub type relationships

// let humanoidFactory = Object.create(personFactory);
// humanoidFactory.init = function(name, age, model) {
//   personFactory.init.call(this, name, age);
//   this.model = model;
//   return this;
// }

// let robotConor = Object.create(humanoidFactory).init('Conor', 27, 'Tesla Zen')
// robotConor.predictAge(10);

// Some advantages of OLOO pattern is that the [[Prototype]] is not hidden behind syntax,
// you just have to know how Object.create() sets up the prototypal chain
// Some disadvantages is that it relies on a custom init method that you must be aware of in order to establish state

// 3. Constructors / Prototypes pattern
// this pattern makes use of constructor functions, and the new keyword

// function PersonConstructor(name, age) {
//   this.name = name;
//   this.age = age;
// }

// PersonConstructor.prototype.predictAge = function(years) {
//   return `In ${years} years, ${this.name} will be ${this.age + years} years old.`;
// }

// function HumanoidConstructor(name, age, model) {
//   PersonConstructor.call(this, name, age);
//   this.model = model;
// }

// HumanoidConstructor.prototype = Object.create(PersonConstructor.prototype);
// HumanoidConstructor.prototype.constructor = HumanoidConstructor;

// HumanoidConstructor.prototype.predictAge = function(years) {
//   return PersonConstructor.prototype.predictAge.call(this, years) + ` Also, I am a robot, model ${this.model}!`;
// }

// HumanoidConstructor.prototype.method = 'true';

// let robotConor = new HumanoidConstructor('Conor', 27, 'Tesla')
// console.log(robotConor.predictAge(10));

// console.log(Object.getPrototypeOf(robotConor) === HumanoidConstructor.prototype);
// console.log(robotConor instanceof HumanoidConstructor)
// console.log(robotConor instanceof PersonConstructor)
// console.log(robotConor.constructor.prototype.constructor)
// console.log(robotConor)

// Great! the constructor/prototype pattern allows us to fix our common complaint from factory functions, it allows the methods to be inherited through the prototypal
// chain. But we it requires a lot of syntax. ES6 introduces:

//Pseudo-Classical pattern

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   predictAge(years) {
//     return `In ${years} years, ${this.name} will be ${this.age + years} years old.`;
//   }
// }

// class Humanoid extends Person {
//   constructor(name, age, model) {
//     super(name, age);
//     this.model = model;
//   }

//   predictAge(years) {
//     return super.predictAge.call(this, years) + ` Also, I am a robot, model ${this.model}!`;
//   }
// }

// let robot = new Humanoid('Conor', 27, 'Tesla')
// console.log(robot.predictAge(10));
// console.log(robot.constructor)

// let test = {
//   [Symbol('toString')](str) {
//     return str;
//   }
// }
// console.log(test[Symbol.for('toString')()])
// // console.log(test[Symbol.for('toString')]('hi'));

// 'use strict'
// global.a = null;
// console.log(global.a);
// console.log(this);

// 1. In your own words, what is Object Oriented Programming?
/* Object Oriented Programming is the concept of organizing code in such a way,
that state and the behaviors that will act of that state, are together in the
same object. It uses objects to organize the program

2. Describe some advantages and disadvantages of OOP.
It makes a program easier to read and maintain, and allows the programmer to
think in a higher level of abstraction through the use of being able to 
break down problems into easier to understand components.

However this can come at the cost of performance and disk space. But the pros
heavily outweigh the cons

3. In your own words, what does encapsulation refer to in JS?
Encapsulation in JS is the idea of bundling state and the behavior that will work
with the state, into the same place (objects).

4. In JS, how does encapsulation differ from encapsulation in most other Oo lang?
In other OO languages, encapsulation refers to restricting access to an objects
data, except through a public interface. Meaning that objects only reveal information
to other parts of the program as necessary. 
*/

// An example of duck-Typing.
// class Band {
//   constructor(genre) {
//     this.genre = genre;
//   }

//   prepare() {
//     this.tuneInstruments();
//   }

//   tuneInstruments() {
//     console.log(`The ${this.genre} band is tuning their instruments`);
//   }
// }

// class Chef {
//   constructor(foodType) {
//     this.foodType = foodType;
//   }

//   prepare() {
//     this.reheatFood();
//   }

//   reheatFood() {
//     console.log(`The ${this.foodType} chef is reheating the food`);
//   }
// }

// class Wedding {
//   constructor(band, chef) {
//     this.hiredTalent = [band, chef];
//   }

//   prepareWedding() {
//     this.hiredTalent.forEach(talent => {
//       talent.prepare();
//     })
//   }
// }

// let myWedding = new Wedding(new Band('Punk'), new Chef('Indian'));
// myWedding.prepareWedding();

// console.log(myWedding)

// Explain polymorphism
// Polymorphism is the concept of being able to interact with different objects
// through the same method invocation interface, and provide different results
// This can be achieved through inheritance using the prototypal chain.
// It can also be performed through duck-typing

// class superBiz {
//   biz() {
//     console.log("superBiz")
//   }
// }

// class Foo extends superBiz {
//   // biz() {
//   //   this.fooBaz();z
//   // }

//   fooBaz() {
//     console.log("foo Biz");
//   }
// }

// class Bar extends superBiz {
//   biz() {
//     this.barBaz();
//   }

//   barBaz() {
//     console.log("bar Biz");
//   }
// }

// class WadaWada {
//   constructor(foo, bar) {
//     this.group = [foo, bar];
//   }

//   bizify() {
//     this.group.forEach(thing => {
//       thing.biz();
//     })
//   }
// }

// let test = new WadaWada(new Foo(), new Bar());
// test.bizify();