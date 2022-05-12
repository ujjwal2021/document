export {}
let isBeginner: boolean = true;

let total : number = 0;

let name: string = 'Nikhil';

let isNew: boolean = null;
let newName: string = undefined;

let list1: number[] = [1,2,3];
let list2: Array<Number> = [1, 2, 3];

let person1: [string, number] = ['nikhil', 16]; //first one has to be string and next has to be number

// enum type: friendly name for the set of numeric value

enum Color {red=5, green=10, blue=22};
let c : Color = Color.blue;
console.log(c);


let randomVal: object = {
    name: 'nikhil',
};
// randomVal = true;
// console.log(randomVal.name);
// randomVal();
// (randomVal as string).toUpperCase();


const hasName = (obj: any): obj is {name: string} => {
    return !!obj &&
    typeof obj === "object" && 
    "name" in obj
}

if(hasName(randomVal)){
    console.log(randomVal.name);
}

// function 
// const add = (num1: number, num2?: number): number => {
//     return num1 + num2;
// }
// console.log(add(5, 10));


// interface

interface Person {
    firstname?: string;
    lastname: string;
}

const fullname = (person: Person)=> {
    console.log(`${person.firstname} ${person.lastname}`);
    
}
let p = {
    // firstname: 'nikhil',
    lastname: 'thakur',
}
fullname(p);

// class
class Employee{
    employeeName: string;

    constructor(name: string){
        this.employeeName = name;
    }
    greet(){
        console.log(`good morning ${this.employeeName}`);
        
    }
}
let emp1 = new Employee('nikhil');
console.log(emp1.employeeName);
emp1.greet();


class Manager extends Employee{
    constructor(managerName: string){
        super(managerName);
    }
    delegateWork(){
        console.log(`manager delegating tasks`);
        
    }
}
let m1 = new Manager('Manish');
m1.delegateWork();
console.log(m1.employeeName);

