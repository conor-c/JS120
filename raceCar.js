function createCar(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },

    drive() {
      this.fuelLevel -= .1;
    },
  }
  // To be implemented by you.
}

let raceCar1 = createCar('BMW', 0.5, false);
console.log(raceCar1.fuelLevel)
raceCar1.drive();
console.log(raceCar1.fuelLevel)

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();

let jag = createCar('Jaguar', 0.4, false);
console.log(jag);
