"use strict";
let myName;
function doSomething() {
    return myName ? myName : null;
}
;
myName = "Richard";
let result = doSomething();
result.toLowerCase();
console.log(result);
// myName = "Matt";
// const doneSomething = doSomething();
// doneSomething.toUpperCase();
