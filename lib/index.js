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

const reduce = (array, fn, initalValue) => {
  let accumulator;
  if(initalValue !== undefined) {
    accumulator = initalValue;
  } else {
    accumulator = array[0];
  }

  if(initalValue === undefined) {
    for(let i = 1; i < array.length; i++) {
      accumulator = fn(accumulator, array[i]);
    }
  } else {
    for(const value of array) {
      accumulator = fn(accumulator, value);
    }
  }

  return [accumulator];
};

const zip = (leftArr, rightArr, fn) => {
  let index, results = [];
  for(index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
    results.push(fn(leftArr[index], rightArr[index]));
  }

  return results;
};

const curry = (fn) => {
  if(typeof fn !== 'function') {
    throw Error('No function provided');
  }

  return function curriedFn(...args) {
    if(args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat( [].slice.call(arguments) ));
      };
    }
    return fn.apply(null, args);
  }
};

const partial = (fn, ...partialArgs) => {
  let args = partialArgs;

  return function(...fullArguments) {
    let arg = 0;
    for(let i = 0; i < args.length && arg < fullArguments.length; i++) {
      if(args[i] === undefined) {
        args[i] = fullArguments[arg++];
      }
    }

    return fn.apply(null, args);
  }
};

const compose = (a,b) => {
  return (c) => a(b(c));
};

const nCompose = (...fns) => {
  return (value) => {
    return reduce(fns.reverse(), (acc, fn) => fn(acc), value);
  }
};

const pipe = (...fns) => (value) =>
    reduce(fns, (acc, fn) => fn(acc), value);

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
  concatAll,
  reduce,
  zip,
  curry,
  partial,
  compose,
  nCompose,
  pipe
};
