"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var isBeginner = true;
var total = 0;
var name = 'Nikhil';
var isNew = null;
var newName = undefined;
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var person1 = ['nikhil', 16]; //first one has to be string and next has to be number
// enum type: friendly name for the set of numeric value
var Color;
(function (Color) {
    Color[Color["red"] = 5] = "red";
    Color[Color["green"] = 10] = "green";
    Color[Color["blue"] = 22] = "blue";
})(Color || (Color = {}));
;
var c = Color.blue;
console.log(c);
var randomVal = {
    name: 'nikhil'
};
// randomVal = true;
// console.log(randomVal.name);
// randomVal();
// (randomVal as string).toUpperCase();
var hasName = function (obj) {
    return !!obj &&
        typeof obj === "object" &&
        "name" in obj;
};
if (hasName(randomVal)) {
    console.log(randomVal.name);
}
var fullname = function (person) {
    console.log("".concat(person.firstname, " ").concat(person.lastname));
};
var p = {
    // firstname: 'nikhil',
    lastname: 'thakur'
};
fullname(p);
// class
var Employee = /** @class */ (function () {
    function Employee(name) {
        this.employeeName = name;
    }
    Employee.prototype.greet = function () {
        console.log("good morning ".concat(this.employeeName));
    };
    return Employee;
}());
var emp1 = new Employee('nikhil');
console.log(emp1.employeeName);
emp1.greet();
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(managerName) {
        return _super.call(this, managerName) || this;
    }
    Manager.prototype.delegateWork = function () {
        console.log("manager delegating tasks");
    };
    return Manager;
}(Employee));
var m1 = new Manager('Manish');
m1.delegateWork();
console.log(m1.employeeName);
