// Factory Functions
// function rectangleFactory(width, length) {
//   return {
//     width,
//     length,

//     getWidth() {
//       return this.width;
//     },

//     getLength() {
//       return this.length;
//     },

//     getArea() {
//       return this.length * this.width;
//     }
//   }
// }

// let rect = rectangleFactory(4, 5);



// OLOO
// let rectangleProtoType = {
//   init(width, length) {
//     this.width = width;
//     this.length = length;
//     return this;
//   },

//   getWidth() {
//     return this.width;
//   },

//   getLength() {
//     return this.length;
//   },

//   getArea() {
//     return this.length * this.width;
//   }
// }

// let rect = Object.create(rectangleProtoType).init(4, 5);


// Constructors / Prototypes
// let Rectangle = function(width, length) {
//   this.width = width;
//   this.length = length;
// }

// Rectangle.prototype.getWidth = function() {
//   return this.width;
// }

// Rectangle.prototype.getLength = function() {
//   return this.length;
// }

// Rectangle.prototype.getArea = function() {
//   return this.width * this.length;
// }

// let rect = new Rectangle(4, 5);



// Pseudo-Classical
// class Rectangle {
//   constructor(width, length) {
//     this.length = length;
//     this.width = width;
//   }

//   getWidth() {
//     return this.width;
//   }

//   getLength() {
//     return this.length;
//   }

//   getArea() {
//     return this.length * this.width;
//   }
// }

// let rect = new Rectangle(4, 5);

console.log(rect.getWidth());
console.log(rect.getLength());
console.log(rect.getArea());