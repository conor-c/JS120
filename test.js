let test = {
  init() {
    this.blue = 'green'
    // return this;
  }
}

let log = Object.create(test);

console.log(log)
console.log(log.init())
console.log(log)