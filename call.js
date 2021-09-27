// 'use strict' 

function AddNewCall() {
  this.Function.prototype.callRemake = function(context, ...arguments) {
    const fn = Symbol();
    context[fn] = this;
    context[fn](...arguments);
  }
}

AddNewCall();


function Product(name, price) {
  this.name = name;
  this.price = price;
}


function Food(name, price) {
  Product.callRemake(this, name, price);
  this.category = 'food';
}

let cheese = new Food('cheese', 5);
console.log(cheese);
// console.log(global)
