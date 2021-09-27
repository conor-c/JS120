// // Factory Function Pattern
// const personFactory = function() {
//   return {
//     greeting(text) {
//       console.log(text);
//     },
//   }
// }

// const shouterFactory = function() {
//   let shouterType = personFactory();
//   let defaultGreet = shouterType.greeting;

//   shouterType.greeting = function(text) {
//     defaultGreet(text.toUpperCase());
//   };

//   return shouterType;
// }

// let person = personFactory();
// let shouter = shouterFactory();



// // OLOO Pattern
// const personPrototype = {
//   greeting(text) {
//     console.log(text);
//   },
// }

// const shouterFactory = Object.create(personPrototype);
// shouterFactory.greeting = function(text) {
//   personPrototype.greeting(text.toUpperCase()); // Don't need to invoke .call or pass context in this situation
// }

// let person = Object.create(personPrototype);
// let shouter = Object.create(shouterFactory);



// // Pseudo-Classical Pattern
// class Person {
//   greeting(text) {
//     console.log(text);
//   }
// }

// class Shouter extends Person {
//   greeting(text) {
//     super.greeting(text.toUpperCase());
//   }
// }

// let person = new Person();
// let shouter = new Shouter();

person.greeting('hiya, hows it going?');
shouter.greeting('hey man, why we shouting?');