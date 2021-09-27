//returns a boolean based on whether the calling object has the specified property
//as its own property (as opposed to inheriting it)

let fakeObject = {
  hasOwnProperty(prop) {
    if (this) {
      console.log("polymorphism!")
      return Object.keys(this).includes(prop);
    }
  }
}

let test = Object.create(fakeObject);
test.exists = true;

console.log(test.hasOwnProperty("hasOwnProperty")); //false
console.log(test.__proto__.hasOwnProperty("hasOwnProperty")); //true

console.log(test.hasOwnProperty("exists")); //true

