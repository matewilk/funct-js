const forEach = (array, fn) => {
  for(let i = 0; i < array.length; i++)
      fn(array[i]);
};

const forEachObject = (obj, fn) => {
  for(let property in obj) {
    if(obj.hasOwnProperty(property)) {
      fn(property, obj[property]);
    }
  }
};

const unless = (predicate, fn) => {
  if(!predicate)
    fn();
};

const times = (times, fn) => {
  for(let i = 0; i < times; i++)
    fn(i);
};

const every = (arr, fn) => {
  let result = true;
  for(const val of arr)
    result = result && fn(val);

  return result;
};

const some = (arr, fn) => {
  let result = false;
  for(const val of arr)
    result = result || fn(val);

  return result;
};

const tap = (value) =>
  (fn) => (
    typeof(fn) === 'function' && fn(value),
    console.log(value)
  );

const unary = (fn) =>
  fn.length === 1
    ? fn
    : (arg) => fn(arg);

const once = (fn) => {
  let done;
  return () =>
    done ? undefined : ((done = true), fn.apply(this, arguments))
};

const memoized = (fn) => {
  const lookup = {};
  return (arg) => lookup[arg] || (lookup[arg] = fn(arg));
};

const map = (array, fn) => {
  let results = [];
  for(const value of array) {
    results.push(fn(value));
  }

  return results;
};

const filter = (array,  fn) => {
  let results = [];
  for(const value of array) {
    (fn(value)) ? results.push(value) : undefined;
  }
  return results;
};

const concatAll = (array) => {
  let results = [];
  for(const value of array)
    results.push.apply(results, value);
  return results;
};

module.exports = {
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
  concatAll
};
