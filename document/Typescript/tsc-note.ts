// type alias

type strNum = number|string; // reusable type alias just like custom type


let value: strNum = 20;
console.log(value);
value = 'hello';
console.log(value);

const add = (n1: number, n2: number): strNum=> {
    return n1+n2;
}
console.log(add(2, 3));

// void return type
const consoleVal = (num: number): void => {
    console.log(num + ' is the number');
}
consoleVal(1);

// interface
interface User {
    name: string;
    age: strNum
}

const person: User={
    name: "Nikhil",
    age: 20,
} 

console.log(person);
// classes
class Person{
    name: string;
    age: number;
    constructor (name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

const firstPerson: User = new Person('nikhil', 20);
console.log(firstPerson);
 