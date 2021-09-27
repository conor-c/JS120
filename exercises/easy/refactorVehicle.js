// // Factory Function Pattern
// const vehicleFactory = function(make, model) {
//   return {
//     make,
//     model,

//     info() {
//       return `${this.make} ${this.model}`;
//     },
//   }
// }

// const motorcycleFactory = function(make, model) {
//   let motorcycleType = vehicleFactory(make, model);

//   motorcycleType.getWheels = function() {
//     return 2;
//   }

//   return motorcycleType;
// }

// const carFactory = function(make, model) {
//   let carType = vehicleFactory(make, model);

//   carType.getWheels = function() {
//     return 4;
//   }

//   return carType;
// }

// const truckFactory = function(make, model, payload) {
//   let truckType = vehicleFactory(make, model);
  
//   truckType.payload = payload;

//   truckType.getWheels = function() {
//     return 6;
//   }

//   return truckType;
// }

// let car = carFactory('Honda', 'Accord');
// let motorcycle = motorcycleFactory('BMW', '1100GS');
// let truck = truckFactory('Tesla', 'Cyber Truck', '1000lbs');



// OLOO Pattern
// const vehiclePrototype = {
//   init(make, model) {
//     this.make = make;
//     this.model = model;
//     return this;
//   },

//   info() {
//     return `${this.make} ${this.model}`;
//   },
// }

// const motorCyclePrototype = Object.create(vehiclePrototype);

// motorCyclePrototype.getWheels = function() {
//   return 2;
// };

// const carPrototype = Object.create(vehiclePrototype);

// carPrototype.getWheels = function() {
//   return 4;
// };

// const truckPrototype = Object.create(vehiclePrototype);

// truckPrototype.init = function(make, model, payload) {
//   vehiclePrototype.init.call(this, make, model);
//   this.payload = payload;
//   return this;
// };

// truckPrototype.getWheels = function() {
//   return 6;
// };

// let motorcycle = Object.create(motorCyclePrototype).init('BMW', '1100GS');
// let car = Object.create(carPrototype).init('Honda', 'Accord');
// let truck = Object.create(truckPrototype).init('Tesla', 'Cyber Truck', '1000lbs');



// // Constructors/Prototypes Pattern
// function Vehicle(make, model) {
//   this.make = make;
//   this.model = model;
// };

// Vehicle.prototype.info = function() {
//   return `${this.make} ${this.model}`;
// };

// function Motorcycle(make, model) {
//   Vehicle.call(this, make, model);
// }

// Motorcycle.prototype = Object.create(Vehicle.prototype);
// Motorcycle.prototype.constructor = Motorcycle;

// Motorcycle.prototype.getWheels = function() {
//   return 2;
// };

// function Car(make, model) {
//   Vehicle.call(this, make, model);
// }

// Car.prototype = Object.create(Vehicle.prototype);
// Car.prototype.constructor = Car;

// Car.prototype.getWheels = function() {
//   return 4;
// };

// function Truck(make, model, payload) {
//   Vehicle.call(this, make, model);
//   this.payload = payload;
// }

// Truck.prototype = Object.create(Vehicle.prototype);
// Truck.prototype.constructor = Truck;

// Truck.prototype.getWheels = function() {
//   return 6;
// };

// let car = new Car('Honda', 'Accord');
// let motorcycle = new Motorcycle('BMW', '1100GS');
// let truck = new Truck('Tesla', 'Cyber Truck', '1000lbs');



// Pseudo-Classical Pattern
// class Vehicle {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   info() {
//     return `${this.make} ${this.model}`
//   }
// }

// class Motorcycle extends Vehicle {
//   getWheels() {
//     return 2;
//   }
// }

// class Car extends Vehicle {
//   getWheels() {
//     return 4;
//   }
// }

// class Truck extends Vehicle {
//   constructor(make, model, payload) {
//     super(make, model)
//     this.payload = payload;
//   }

//   getWheels() {
//     return 6;
//   }
// }

// let car = new Car('Honda', 'Accord');
// let motorcycle = new Motorcycle('BMW', '1100GS');
// let truck = new Truck('Tesla', 'Cyber Truck', '1000lbs');

console.log(car.info());
console.log(car.getWheels());
console.log(motorcycle.info());
console.log(motorcycle.getWheels());
console.log(truck.info());
console.log(truck.getWheels())



