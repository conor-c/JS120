// ***Start by explaining what the problem is, before you start talking about the solution.***
// 
// Objects in JavaScript need to be able to perform actions. But sometimes these
// actions are common actions that will be used multiple times. We call these actions
// methods, and we don't want to have to always be rewriting the same method over and over.


// The Problem: Methods need to be accessible, without having to rewrite them.

// This is an object
let helloImAnObject = {};

// This is an example of creating and storing a method "helloImAMethod" on the object "helloImAnObject"
helloImAnObject.helloImAMethod = function() {
  return "And I do Stuff!";
}

// You can execute the method like this
helloImAnObject.helloImAMethod(); // and it will return "And I do Stuff!"

// Great! Now lets create a new object and try and execute the same method
let newObject = {};
newObject.helloImAMethod(); // but now we get: TypeError: newObject.helloImAMethod is not a function
// Hmm, we don't get "And I do Stuff!" like the first time we called the method.

// If we want our "newObject" to be able to run "helloImAMethod", we have two options.

// Option 1: Copy/Rewrite the method again, and attach it to the "newObject", which is
// fine if you only have 1 new object that you want to be able return "And I do Stuff!",
// but what if you have 100 objects you want to be able to return "And I do Stuff!". That's a lot of copying.
// Which leads us to Option 2!

// Option 2: Inheritance!
// In JavaScript, objects can inherit from one other object. And that object can in turn, inherit from one other object.
// Theres no limit to how long that chain of inheritance can go!
// Inheriting from an object, means being able to access all the methods in that object.

// ***DO: Attempt to relate it normal life situations/ideas.***
// A sweet break into childhood:
// "John" has a Rubix Cube, but doesn't know how to solve it. (They don't have their own .solveRubiksCube() method!)
// So "John" does what they always do when they have a question they can't answer, 
// he asks his smartest friend "Jane", if they know how to .solveRubiksCube(). 
// Unfortunately "Jane" also doesn't know how to .solveRubiksCube(), so they ask their smartest friend "Sally".
// Luckily, "Sally" does know how to .solveRubiksCube().
// So "Sally" takes the Rubik's Cube and solves it for "John".

// TAKEAWAY: Even though John didn't know how to solve the Rubik's Cube, they were able to get the correct method through inheritance!
// In code, this inheritance chain would look like this:
let Sally = {
  solveRubiksCube() {
    return "Rubiks Cube Is Solved!";
  }
};
let Jane = Object.create(Sally);
let John = Object.create(Jane);
John.solveRubiksCube(); // Returns "Rubiks Cube Is Solved!"

// This inheritance chain, is actually called, "The Prototypal" chain.
// In the above example, Sally is the Prototype of Jane, who is the Prototype of John.

// And this is the underlying premise to how Inheritance in JavaScript works. 
// But solvingRubiksCube() isn't the only method that takes advantage of inheritance. So do most of the built in methods!