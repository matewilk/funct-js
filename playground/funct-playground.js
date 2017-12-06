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
  zip
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