let myName: string | undefined;

function doSomething(): string | null {
    return myName ? myName : null
};

myName = "Richard"
let result = doSomething()

result!.toLowerCase()
console.log(result)
// myName = "Matt";
// const doneSomething = doSomething();
// doneSomething.toUpperCase();

