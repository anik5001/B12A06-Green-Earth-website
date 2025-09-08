#### 1) What is the difference between var, let, and const?

     Answer:
     var is a function scope,redeclare in same scope and value updated.
     let is the block scope, not redeclare in same block but value updated.
     const is the block scope ,not redeclare and no value updated.

#### 2) What is the difference between map(), forEach(), and filter()?

Answer:
map() is the execute a function for each element in the array And return a new array .
ForEach() is the execute a function for each element in the array and no return new array .
filter() is the execute a function for each element in condition and return a filtered array.

#### 3) What are arrow functions in ES6?

Answer:Arrow functions were introduced in ES6 (ECMAScript 2015) as a shorter and cleaner way to write functions in JavaScript.
``
Normal Function
function add(a, b) {
return a + b;
}

arrow function

const add = (a, b) => a + b;
``
Arrow function uses
Callbacks functions ( map(), forEach(), filter(),etc)

#### 4) How does destructuring assignment work in ES6?

Answer:
Destructuring assignment means easily taking values ​​from an Array or Object into separate variables.
For Example :`const [a,b,c]=[12,2,4]`

#### 5) Explain template literals in ES6. How are they different from string concatenation?

## Answer:

To write normal strings we use ' ' or " ".
But in Template Literals we use backtick (`).

#### 1.Multiple line string concatenation is hard "\n" but template literals easily apply just inter.

#### 2.String concatenation when value assign then write + value + but template string just ${value} is easy then concatenation.
