//Creating a person object
const person = {
    name : 'John doe',
    age : 30
};


//Creating a constructor called person
class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My name is ${this.name} and my age is ${this.age}`)
    };
}

//Exporting person object
// module.exports = person;
module.exports = Person;
