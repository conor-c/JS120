// isPrototypeOf checks to see if the calling object exists anywhere in the
// arguments prototypal chain
let FakeObject = {
  isPrototypeOf(instance) {
    while (instance) {
      instance = Object.getPrototypeOf(instance);
      if (this === instance) {
        return true;
      }
    }
    return false;
  },

  fakeObject: true,
}

function wrongTest() {}
wrongTest.prototype = Object.create(FakeObject);
wrongTest.prototype.constructor = wrongTest;

function test() {}
test.prototype = Object.create(FakeObject);
test.prototype.constructor = test;

let b = new test();

// console.log(wrongTest.prototype.isPrototypeOf(b));
console.log(test.prototype.isPrototypeOf(b) === test.prototype);
// console.log(wrongTest.prototype.isPrototypeOf(b))
console.log(FakeObject.isPrototypeOf(test.prototype));
console.log(FakeObject.isPrototypeOf(b));