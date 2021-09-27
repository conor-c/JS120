let fakeObject = {
  getOwnPropertyNames(obj) {
    return Object.keys(obj);
    // if you wanted all properties, including inherited
  //   let results = [];
  //   for (let key in obj) {
  //     results.push(key);
  //   }
  //   return results;
  }
}

let foo = {
  b: true,
}

let test = Object.create(foo);
test.a = true;

console.log(fakeObject.getOwnPropertyNames(test))
console.log(test.b)