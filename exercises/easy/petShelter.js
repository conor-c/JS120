class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  getInfo() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  toString() {
    return this.name;
  }
}

class Shelter {
  constructor() {
    this.owners = [];
    this.unadoptedPets = [];
  }

  printUnadoptedPets() {
    if (this.unadoptedPets.length !== 0) {
      console.log(`The Animal Shelter has the following unadopted pets:`)
      this.unadoptedPets.forEach(unadoptedPet => {
        console.log(unadoptedPet.getInfo())
      });
      console.log('');
    } else {
      console.log('The animal shelter has no pets up for adoption.');
    }
  }

  adopt(owner, pet) {
    owner.addPet(pet);
    if (!this.owners.includes(owner)) {
      this.owners.push(owner);
    }
  }

  addRescue(type, name) {
    this.unadoptedPets.push(new Pet(type, name));
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner} has adopted the following pets:`);
      owner.pets.forEach(pet => {
        console.log(pet.getInfo())
      });
      console.log('');
    })
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.addRescue('dog', 'Asta');
shelter.addRescue('dog', 'Laddie');

shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log('');
shelter.printUnadoptedPets();