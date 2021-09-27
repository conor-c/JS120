// name property added to make objects easier to identify
Object.prototype.ancestors = function() {
  let prototype = Object.getPrototypeOf(this);
  let prototypeChain = [];

  while (prototype.hasOwnProperty('name')) {
    prototypeChain.push(prototype.name);
    prototype = Object.getPrototypeOf(prototype);
  }

  prototypeChain.push('Object.prototype');
  return prototypeChain;
}

// // Recursive Solution
// Object.prototype.ancestors = function() {
//   let ancestor = Object.getPrototypeOf(this);

//   if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
//     return [ancestor.name].concat(ancestor.ancestors());
//   }

//   return [Object.prototype];
// }



let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';


console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']