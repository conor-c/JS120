function Aconstructor() {
  this.b = true;
}

let obj = new Aconstructor();

// using instanceof
console.log(obj instanceof Aconstructor);

// using getPrototypeOf
console.log(Object.getPrototypeOf(obj) === Aconstructor.prototype);

// using the depreciated dunder proto
console.log(obj.__proto__ === Aconstructor.prototype);

// using the .constructor property
console.log(obj.constructor === Aconstructor.prototype.constructor);

// using .isPrototypeOf
console.log(Aconstructor.prototype.isPrototypeOf(obj))