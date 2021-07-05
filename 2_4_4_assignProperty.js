let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

// fooC has a prototype of fooB,
// which has a prototype of fooA,
// which has a property of "bar",
// and has a prototype of Object.prototype

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2


// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

// // Search the prototype chain of an object for a property
// // and and reassign it to a new given value, if no property
// // exists (in the prototypical chain), do nothing.

// function assignProperty(object, property, value) {
//   while (true) {
//     if (object.hasOwnProperty(property)) {
//       object[property] = value;
//       break;
//     } else if (Object.getPrototypeOf(object)) {
//       object = Object.getPrototypeOf(object);
//     } else {
//       break;
//     }
//   }
// }
let bar = { a: 1, b: 2 };
let foo = Object.create(bar);
foo.a = 3;
foo.c = 4;
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
console.log(foo);
console.log(bar);

console.log(Object.keys(foo));