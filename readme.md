1.What is the difference between var, let, and const?
ans: var variable can reassign value and redeclare where let can reassign value but cannot redeclare and const cannot reassign value and cannot redeclare. var is local scop or function scope and let, const are block scope
2.What is the difference between map(), forEach(), and filter()?
 ans: map()does every elements of an array modified with your desire purpose and return a new array, forEach()does looping once every element of an array and it's not return, filter()apply condition of all element in array and return new values if condition fulfiled
3.What are arrow functions in ES6? 
ans:arrow function is more shorter than normal function.normal function we use function keyword but arrow function we only assign a function name with const varieable ex:const assume = () => {} into cury braces if it single line we dont need to write return
4.How does destructuring assignment work in ES6? 
ans:destructuring is shorter to grab values from any object and arrays without destructuring to grab values from obj we use dot notation or bracket notation where with destructuring we use exp:const destructuring = {name: "Imran", age:27}; const {name, age} = destructuring
5.Explain template literals in ES6. How are they different from string concatenation? 
ans:In string we can cocate with + operator and in double quation its more time consuming every time we have to assign +,",' than templete literals. where templet literals is best practice `` we can use function variable value here if we want to right something after 2line we can do this with template literal