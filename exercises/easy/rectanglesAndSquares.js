// // Factory Function
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
//       return this.width * this.length;
//     },
//   }
// }

// function squareFactory(sideLength) {
//   return rectangleFactory(sideLength, sideLength);
// }

// let square = squareFactory(5);



// // OLOO
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
//     return this.width * this.length;
//   },
// }

// let squarePrototype = Object.create(rectangleProtoType);
// squarePrototype.init = function(sideLength) {
//   rectangleProtoType.init.call(this, sideLength, sideLength);
//   return this;
// }

// let square = Object.create(squarePrototype).init(5);



// // Constructors/Prototypes
// function Rectangle(width, length) {
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

// function Square(sideLength) {
//   Rectangle.call(this, sideLength, sideLength);
// }

// Square.prototype = Object.create(Rectangle.prototype);
// Square.prototype.constructor = Square;

// let square = new Square(5);



// // Pseudo Classical
// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() {
//     return this.width;
//   }

//   getLength() {
//     return this.length;
//   }

//   getArea() {
//     return this.width * this.length;
//   }
// }

// class Square extends Rectangle {
//   constructor(sideLength) {
//     super(sideLength, sideLength);
//   }
// }

// let square = new Square(5);


console.log(`area of square = ${square.getArea()}`);