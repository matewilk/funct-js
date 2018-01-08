const {
  forEach,
  forEachObject,
  unless,
  times,
  every,
  some,
  tap,
  unary,
  once,
  memoized,
  map,
  filter,
  concatAll,
  reduce,
  zip,
  curry,
  partial,
  compose,
  nCompose
} = require('../lib');

let arr = [1,2,3,4,5,6];
let obj = {a: 1, b: 2, c: 3};

// forEach
forEach(arr, (v) => { console.log(v * 2); });

// forEachObject
forEachObject(obj, (key, value) => { console.log(`${key}: ${value}`); });

// unless
let isEven = (val) => val % 2;
forEach(arr, (v) => {
  unless(isEven(v), () => {
    console.log(`${v} is even`);
  })
});

// times
times(10, (n) => { unless(isEven(n), () => { console.log(`${n} is even`)}) });

// every
let comparator = (v) => { return v < 6; };
console.log(every(arr, comparator));

// some
console.log(some(arr, comparator));

// tap
tap("fun")((it) => console.log("value is", it));

// unary
console.log(['1','2','3'].map(unary(parseInt)));

// once
let doPayment = once(() => {
  console.log("Payment is done");
});
doPayment();
doPayment();

// memoized
let fastFactorial = memoized((n) => {
  if(n ===0){
    return 1;
  }

  return n * fastFactorial(n -1);
});

console.log(fastFactorial(5));
console.log(fastFactorial(3));
console.log(fastFactorial(7));

// test array
let testArray = [
  {a: 1, b: 2}, {a: 2, b: 4}, {a: 4, b: 8}
];

// map
let mapResult = map([1,2,3], (x) => x * x);
console.log(mapResult);

// filter
let filterResult = filter(testArray, (obj) => obj.a > 2);
console.log(filterResult);

// map filter chaining
let chainingResult = map(filter(testArray, (obj) => obj.a > 1), (item) => {
  return { a: item.a };
});
console.log(chainingResult);

// concatAll
let arrOfArr = [[{a: 1}], [{b: 2}], [{c: 3}]];
let concatAllResult = concatAll(arrOfArr);
console.log(concatAllResult);

// reduce
let reduceArr = [2,8,2,7,3,4,1];
let multiplicationResult = reduce(reduceArr, (acc, val) => acc * val);
console.log(multiplicationResult);
let additionResult = reduce(reduceArr, (acc, val) => acc + val);
console.log(additionResult);

// zip
let leftArr = [{id: 1, a: 1}, {id: 2, a: 2}, {id: 3, a: 3}];
let rightArr = [{id: 1, b: 1}, {id: 2, b: 2}, {id: 3, b: 3}];
let zipResult = zip(leftArr, rightArr, (larr, rarr) => {
  if(larr.id === rarr.id) {
    return {id: larr.id, a: larr.a, b: rarr.b}
  }
});
console.log(zipResult);

// curry
const multiply = (x,y,z) => x*y*z;
let curryResult = curry(multiply)(7)(5)(9);
console.log(curryResult);

// curry - finding numbers in an array
let match = curry((expr, str) => {
  return str.match(expr);
});
let hasNumber = match(/[0-9]+/);
let arrFilter = curry((fn, array) => {
  return array.filter(fn);
});

let findNumbersInArray = arrFilter(hasNumber);
let fNinArrResult = findNumbersInArray(['test', '1', 'test2', 'nonumber', '4']);
console.log(fNinArrResult);

// curry - square an array
let mapArr = curry((fn, array) => {
  return array.map(fn);
});
let squareAll = mapArr((x) => x * x);
let sqrAllResult = squareAll([1,2,3,4,5]);
console.log(sqrAllResult);

// curry - find even of an array
let findEven = arrFilter((x) => !(x % 2));
let findEvenResult = findEven([1,3,5,10,23,11,66,44,32,874]);
console.log(findEvenResult);

// partial
let delayTenMs = partial(setTimeout, undefined, 1);
delayTenMs(() => console.log("Do Y task"));

// compose
let number = compose(Math.round, parseFloat); // = (c) => Math.round(parseFloat(c))
let roundedNo = number("4.24");
console.log(roundedNo);

// compose example #2
let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
let countWords = compose(count, splitIntoSpaces);
let countWordsResult = countWords('try counting words of this sentence');
console.log(countWordsResult);

// ---- compose with map & filter ----
let booksData = require('./data.json');

let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectAuthor = (book) => ({author: book.author});
let projectTitle = (book) => ({title: book.title});


// using partial
let partialFilter = partial(filter, undefined, filterGoodBooks);
let partialMap = partial(map, undefined, projectAuthor);

let composePartialResult = compose(partialMap, partialFilter)(booksData);
console.log(composePartialResult);

// using curry
let reversedMap = (callback, array) => map(array, callback);
let reverseFilter = (callback, array) => filter(array, callback);

let curriedMap = curry(reversedMap)(projectTitle);
let curriedFilter = curry(reverseFilter)(filterBadBooks);

let composeCurryResult = compose(curriedMap, curriedFilter)(booksData);
console.log(composeCurryResult);
// ---- end compose ----

// nCompose
let oddOrEvenWords = (ip) => ip % 2 === 0 ? 'even' : 'odd';
let oddOrEven = nCompose(oddOrEvenWords, count, splitIntoSpaces);
let nComposeResult = oddOrEven('am I odd or even word count sentence');
console.log(nComposeResult);
