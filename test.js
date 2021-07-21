// Use a factory function to create pet objects. The factory function should let us use pets like this:

// function createPet(animal, name) {
//   return {
//     animal: animal,
//     name: name,

//     sleep: function() {
//       console.log('I am sleeping');
//     },

//     wake: function() {
//       console.log('I am awake');
//     },
//   }
// }

let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep: function() {
    console.log('I am sleeping');
  },

  wake: function() {
    console.log('I am awake');
  },

}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake
console.log(pudding.constructor.name)

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake