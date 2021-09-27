**Topics**
* Objects, object factories, constructors and prototypes, OLOO, ES6 Classes
  * Objects
    * Pretty much every thing in JavaScript is an Object besides primitive values
    * An object is a collection of data in key/value pairs that define state and behavior
  * Object Factories / Factory Functions / Factory Object Creation Pattern
    * Object Factories create and return objects based on a template
    * They are functions that have return values of objects when the function is invoked
    * Pros:
      * Simple and Straightforward to both read, and write
    * Cons:
      * Every object created using the object factory has a full copy of everything
        * Doesn't utilize the prototypal chain to delegate behavior
      * There is no way to see if any given object was created using an object factory
      * Impossible to determine the type, only examine based off characteristics
  * Constructors and Prototypes Pattern
    * Utilizes constructor functions and the `new` keyword. Directly uses .prototype property to share behavior. You can call a constructor function using `.call` and pass in required `context` in order to get the state of one constructor function into another.
    * This lets us create *sub-type* objects which can inherit methods from a super-type object. 
      * *helps facilitate code re-use*
      * NOTE: objects can only directly inherit from one super-type object. An object can only have one prototype object.
      * (Mix-ins provide a way of added additional behavior when has-a relationships are needed) `Object.assign()` 
  * OLOO (Objects Linking to Other Objects pattern)
    * Uses a prototype object, and initializer method, and the Object.create() method to create objects with shared behavior. The initializer customizes the *state* for each object, and is usually named init()
* Methods and properties; instance and static methods and properties
  * A method is a function stored as a value, considered 'behavior' of an object
  * A property is a value, considered 'state' or 'characteristic' of an object
  * Instance and Static
    * Instance methods and Properties 
      * Called directly from instances of the constructor
    * Static Methods and Properties
      * Typically belong to the Data "Type" and are directly accessed on the constructor
* Prototypal and pseudo-classical inheritance
  * Pseudo-classical inheritance is "syntactic sugar" that provides a higher level of abstraction
  * JavaScript is a single-inheritance language that relies on the prototypal chain through the use of `[[Prototype]]`
* Encapsulation
  * Encapsulation is the process of grouping "state" data, and "behavior" data (methods) that will work with the "state" data, into the same place (an Object)
* Polymorphism
  * The ability of objects of different 'types' to respond (often in different ways) to the same interface (method invocation).
  * ((Note: though often involved, inheritance is NOT needed to achieve polymorphism))
  * Two main ways to achieve Polymorphism
    * Inheritance
      * Involves getting a version of the method through inheritance, or method overriding to avoid the prototypal chain
      * *.toString() is a good example of method overriding being useful*
    * Duck-Typing
      * An informal way to ascribe a type to objects. As long as the objects involved respond to the same method name and take the same number of arguments, we can treat the object as *belonging* to a specific category of objects.
      * Occurs when objects of unrelated types both respond to the same method name. (aka theres no inheritance/prototypal chain)
      * *A form of polymorphism*
      * "Duck typing means an object is defined by what it can do, not by what it is"
      * Doesn't check ahead of time that the operand (object) has access or supports the method, it just tries it.
      * Without Duck-Typing:

            ```javascript
                  class Chef {
              prepareFood(guests) {
                // implementation
              }
            }

            class Decorator {
              decoratePlace(flowers) {
                // implementation
              }
            }

            class Musician {
              preparePerformance(songs) {
                // implementation
              }
            }

            class Wedding {
              constructor(guests, flowers, songs) {
                this.guests = guests;
                this.flowers = flowers;
                this.songs = songs;
              }

              prepare(preparers) {
                preparers.forEach(preparer => {
                  if (preparer instanceof Chef) {
                    preparer.prepareFood(this.guests);
                  } else if (preparer instanceof Decorator) {
                    preparer.decoratePlace(this.flowers);
                  } else if (preparer instanceof Musician) {
                    preparer.preparePerformance(this.songs);
                  }
                });
              }
            }
            ```
      * With Duck-Typing:
  
              ```javascript
                    class Chef {
                    prepare(wedding) {
                      this.prepareFood(wedding.guests);
                    }

                    prepareFood(guests) {
                      // implementation
                    }
                  }

                  class Decorator {
                    prepare(wedding) {
                      this.decoratePlace(wedding.flowers);
                    }

                    decoratePlace(flowers) {
                      // implementation
                    }
                  }

                  class Musician {
                    prepare(wedding) {
                      this.preparePerformance(wedding.songs);
                    }

                    preparePerformance(songs) {
                      // implementation
                    }
                  }

                  class Wedding {
                    constructor(guests, flowers, songs) {
                      this.guests = guests;
                      this.flowers = flowers;
                      this.songs = songs;
                    }

                    prepare(preparers) {
                      preparers.forEach(preparer => {
                        preparer.prepare(this);
                      });
                    }
                  }
              ```
      * Just because two different objects have the same name and compatible arguments, doesn't mean its polymorphic
* Collaborator Objects / Collaborators
  * *collaborators help provide state to a containing object*
  * A collaborative relationship is a relationship of association, not of inheritance. It's a "has-a" relationship rather than a "is-a" relationship.
  * *let you chop up and "modularize" the problem into distinct pieces*
  * They don't need to be custom objects, things like arrays / dates are collaborators.
* Single vs multiple inheritance
  * JavaScript is a single inheritance language: *Objects can only inherit from 1 other object*
  * Some languages can inherit from multiple objects (multiple inheritance)
  * The prototypal chain can be any length
  * A way to mimic some multiple inheritance functionality for "has-a" relationships, is through the use of Mix-ins
* Mix-ins; mix-ins vs. Inheritance
  * Mix-in:
    * A pattern that adds methods and properties from one object (the mix-in object) into another (often the `.prototype` property object)
      * `Object.assign(target, source)` is a good built-in method to assign the properties to the chosen object. *note: properties in the target object that share the same key are overwritten by the properties in the source object*
  * Mix-ins vs. Inheritance
    * Inheritance works well when one object is a sub-type of another *"is-a"*
    * Mix-ins works well when the relationship is a *"has-a"*
* Methods and functions; method invocation vs. function invocation
  * Methods are functions stored as a property on an object
  * A function (or Function Object) is a "sub-program" to manipulate data in some way
  * A method invocation requires a calling object, and provide an *implicit execution context* that resolves to the calling object
  * A function invocation relies on the implicit execution context of the global scope
* Higher-order functions
  * Functions that take as an argument, or return, other functions
  * *functions that are passed to other functions are called callbacks or callback functions*
* The global object
  * The global object is the Top level execution context for JS programs
    * It's what function invocation execution context resolves to implicitly.
* Method and property lookup sequence
  * When calling a method or property on an object:
    * First JS looks for that method/property name directly in the calling Object
    * Then it looks into the calling objects `[[Prototype]]`
    * JS continues up the prototypal chain until the method/or property is found (and then executes), or until the prototypal chain runs out
* Function execution context and `this`
  * *All JS code executes within a context*
  * The top level context (window in browser, global in Node)
    * (contains global methods and objects like .parseInt() and Math)
  * The value of `this` is based on the execution/invocation context of the function/method, NOT based on how the function/method is defined.
* Implicit and explicit execution context
  * Implicit execution context for method invocations often resolve to the calling Object
  * Implicit execution context for function invocations often resolve to the Global Object
* Dealing with context loss
* `call`, `apply`, and `bind`
  * *Ways to set execution context explicitly*
* `Object.assign` and `Object.create`
* Built-in constructors like Array, Object, String, and Number
* Reading OO code
* Planning an Object-Oriented application
  * Write a textual description of the problem or exercise
  * Extract the significant nouns and verbs from the description
  * organize and associate the verbs with the nouns
  * *utilize STUB (methods) and SPIKE (orchestration engine)*