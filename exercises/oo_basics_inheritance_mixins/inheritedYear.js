class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }
}

class Car extends Vehicle {
}

let truck = new Truck(2003, "Short");
console.log(truck.year);
console.log(truck.bedType)
let car = new Car(2015);
console.log(car.year)