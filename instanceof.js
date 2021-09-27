//remade instanceof
function instanceOf (obj, constructor) {
  while (obj) {
    obj = Object.getPrototypeOf(obj);
    if (obj === constructor.prototype) {
      return true;
    }
  }
  return false;
}

function Aconstructor() {
  this.b = true;
}

function Bconstructor() {}
Bconstructor.prototype = Object.create(Aconstructor.prototype);
Bconstructor.prototype.constructor = Bconstructor;

let obj = new Bconstructor();

// using instanceof
console.log(obj instanceof Aconstructor);

console.log(instanceOf(obj, Aconstructor))

// // using getPrototypeOf
// console.log(Object.getPrototypeOf(obj) === Aconstructor.prototype);

// // using the depreciated dunder proto
// console.log(obj.__proto__ === Aconstructor.prototype);

// // using the .constructor property
// console.log(obj.constructor === Aconstructor.prototype.constructor);