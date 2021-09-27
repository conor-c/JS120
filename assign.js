"use strict"
const fakeObject = {
  assign() {
    if (arguments.length < 2) {
      throw 'Error, need a target and a source object.'
    }

    for (let sourceObject of [].slice.call(arguments, 1)) {
      let targetObject = arguments[0];
      Object.keys(sourceObject).forEach(propertyKey => {
        targetObject[propertyKey] = sourceObject[propertyKey]; 
      })
    }
  }
}

let foo = {
  bar: true,
}

let bro = {
  braz: true,
}

let baz = {};

fakeObject.assign(baz, foo, bro);
console.log(baz); // { bar: true, braz: true }
