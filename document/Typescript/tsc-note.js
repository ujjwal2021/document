// type alias
var value = 20;
console.log(value);
value = 'hello';
console.log(value);
var add = function (n1, n2) {
    return n1 + n2;
};
console.log(add(2, 3));
// void return type
var consoleVal = function (num) {
    console.log(num + ' is the number');
};
consoleVal(1);
var person = {
    name: "Nikhil",
    age: 20
};
console.log(person);
// classes
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var firstPerson = new Person('nikhil', 20);
console.log(firstPerson);
