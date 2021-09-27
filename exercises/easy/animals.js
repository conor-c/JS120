// // OBJECT FACTORIES aka FACTORY FUNCTIONS (Data and State get copied)
// function animalFactory(name, age, legs, species, status) {
//   return {
//     name,
//     age,
//     legs,
//     species,
//     status,

//     introduce: function() {
//       return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//     },
//   }
// }

// function catFactory(name, age, status) {
//   let cat = animalFactory(name, age, 4, 'Cat', status);
//   let defaultIntroduce = cat.introduce; // Alternative is to create a new method and call introduce within it
//   // we can save the old method as the return value (template literals) (string)
//   // but we choose to save it as a function, which means we have to pass it context!
//   cat.introduce = function() {
//     return defaultIntroduce.call(this) + ' Meow, meow!'; // Can also pass 'cat' as context
//   }

//   return cat;
// }

// function dogFactory(name, age, status, master) {
//   let dog = animalFactory(name, age, 4, 'Dog', status);
//   dog.master = master;
//   dog.greetMaster = function() {
//     return `Hello, ${this.master}! Woof, woof!`;
//   }
//   return dog;
// }

// let aCat = catFactory('caty', 4, 'happy');
// console.log(aCat.introduce());


// let aDog = dogFactory('doggy', 3, 'sad', 'John');
// console.log(aDog.greetMaster());
// console.log(aDog.introduce());



// WITH OBJECTS LINKING OTHER OBJECTS (OLOO)
const animalPrototype = {
  init(name, age, legs, species, status) { // self made init method in order to define state
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
    // return this isn't needed in this object, because it will be the prototype of our prototypes
  },

  introduce: function() { //the long way to write a method in an object
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  },
}

const catPrototype = Object.create(animalPrototype);

catPrototype.init = function(name, age, status) {
  animalPrototype.init.call(this, name, age, 4, 'Cat', status);
  return this;
}

catPrototype.introduce = function() {
  return animalPrototype.introduce.call(this) + ' Meow meow!'; // All of these CAN work, but which seems better? (PS. don't forget context!)
  // return Object.getPrototypeOf(catPrototype).introduce.call(this) + ' Meow meow!';
  // return Object.getPrototypeOf(Object.getPrototypeOf(this)).introduce.call(this) + ' Meow meow!';
}

// const dogPrototype = Object.create(animalPrototype);

// dogPrototype.init = function(name, age, status, master) {
//   animalPrototype.init.call(this, name, age, 4, 'Dog', status);
//   this.master = master;
//   return this;
// }

// dogPrototype.greetMaster = function() {
//   return `Hello ${this.master}! Woof, woof!`;
// }

let cat = Object.create(catPrototype).init('caty', 4, 'happy');
console.log(cat.introduce());

// let dog = Object.create(dogPrototype).init('doggy', 3, 'sad', 'John');
// console.log(dog.introduce());
// console.log(dog.greetMaster());



// WITH CONSTRUCTORS & PROTOTYPES
const Animal = function(name, age, legs, species, status) {
  this.name = name;
  this.age = age;
  this.legs = legs;
  this.species = species;
  this.status = status;
  // Don't need to return this because the 'new' keyword will return the created object
}

Animal.prototype.introduce = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
}

const Cat = function(name, age, status) {
  Animal.call(this, name, age, 4, 'Cat', status);
}

Cat.prototype = Object.create(Animal.prototype); // There is an option to use Object.setPrototypeOf(), which means you don't have to reset constructor
Cat.prototype.constructor = Cat; // Object.setPrototypeOf() is a slow operation and not recommended if performance is needed
Cat.prototype.introduce = function() { // Method Over-Riding in order to append 'meow meow'
  return Animal.prototype.introduce.call(this) + ' Meow, meow!';
}

const Dog = function(name, age, status, master) {
  Animal.call(this, name, age, 4, 'Dog', status);
  this.master = master;
}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog;
Dog.prototype.greetMaster = function() {
  return `Hello ${this.master}! Woof, woof!`;
}


let cat = new Cat('caty', 4, 'happy');
console.log(cat.introduce());

let dog = new Dog('doggy', 3, 'sad', 'Jacob');
console.log(dog.introduce()); // finds introduce on the prototypal chain (in the Animal.prototype object)
console.log(dog.greetMaster());



// Pseudo-Classical
class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return super.introduce() + ' Meow meow!';
  }
}

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }

//   greetMaster() {
//     return `Hello ${this.master}! Woof, woof!`
//   }
// }

let cat = new Cat('caty', '4', 'happy');
// let dog = new Dog('dogy', 3, 'sad');

// console.log(cat.introduce());
// console.log(dog.introduce());
// console.log(dog.greetMaster());