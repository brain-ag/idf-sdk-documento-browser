(self["webpackChunkBrScanSDKDocumento"] = self["webpackChunkBrScanSDKDocumento"] || []).push([[96],{

/***/ 9653:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(6813);

__webpack_require__(5780);

if (__webpack_require__.g._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}

__webpack_require__.g._babelPolyfill = true;

/***/ }),

/***/ 5780:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = "object" === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ 3387:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 5122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cof = __webpack_require__(5089);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),

/***/ 8184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(7574)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(3341)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 8828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var at = __webpack_require__(1212)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ 6440:
/***/ ((module) => {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ 4228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3305);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 4438:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(8270);
var toAbsoluteIndex = __webpack_require__(157);
var toLength = __webpack_require__(1485);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ 5564:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(8270);
var toAbsoluteIndex = __webpack_require__(157);
var toLength = __webpack_require__(1485);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var forOf = __webpack_require__(8790);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ 1464:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7221);
var toLength = __webpack_require__(1485);
var toAbsoluteIndex = __webpack_require__(157);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 6179:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(5052);
var IObject = __webpack_require__(1249);
var toObject = __webpack_require__(8270);
var toLength = __webpack_require__(1485);
var asc = __webpack_require__(3191);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ 6543:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3387);
var toObject = __webpack_require__(8270);
var IObject = __webpack_require__(1249);
var toLength = __webpack_require__(1485);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ 3606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3305);
var isArray = __webpack_require__(7981);
var SPECIES = __webpack_require__(7574)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 3191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(3606);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ 5538:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(3387);
var isObject = __webpack_require__(3305);
var invoke = __webpack_require__(4877);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ 4848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(5089);
var TAG = __webpack_require__(7574)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 5089:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 6197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var dP = (__webpack_require__(7967).f);
var create = __webpack_require__(4719);
var redefineAll = __webpack_require__(6065);
var ctx = __webpack_require__(5052);
var anInstance = __webpack_require__(6440);
var forOf = __webpack_require__(8790);
var $iterDefine = __webpack_require__(8175);
var step = __webpack_require__(4970);
var setSpecies = __webpack_require__(5762);
var DESCRIPTORS = __webpack_require__(1763);
var fastKey = (__webpack_require__(2988).fastKey);
var validate = __webpack_require__(2888);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ 4490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(4848);
var from = __webpack_require__(956);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ 9882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var redefineAll = __webpack_require__(6065);
var getWeak = (__webpack_require__(2988).getWeak);
var anObject = __webpack_require__(4228);
var isObject = __webpack_require__(3305);
var anInstance = __webpack_require__(6440);
var forOf = __webpack_require__(8790);
var createArrayMethod = __webpack_require__(6179);
var $has = __webpack_require__(7917);
var validate = __webpack_require__(2888);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ 8933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7526);
var $export = __webpack_require__(2127);
var redefine = __webpack_require__(8859);
var redefineAll = __webpack_require__(6065);
var meta = __webpack_require__(2988);
var forOf = __webpack_require__(8790);
var anInstance = __webpack_require__(6440);
var isObject = __webpack_require__(3305);
var fails = __webpack_require__(9448);
var $iterDetect = __webpack_require__(8931);
var setToStringTag = __webpack_require__(3844);
var inheritIfRequired = __webpack_require__(8880);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ 6094:
/***/ ((module) => {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 7227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $defineProperty = __webpack_require__(7967);
var createDesc = __webpack_require__(1996);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 5052:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// optional / simple context binding
var aFunction = __webpack_require__(3387);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 5385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(9448);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),

/***/ 107:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(4228);
var toPrimitive = __webpack_require__(3048);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),

/***/ 3344:
/***/ ((module) => {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 1763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9448)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 6034:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3305);
var document = (__webpack_require__(7526).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 6140:
/***/ ((module) => {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 5969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(1311);
var gOPS = __webpack_require__(1060);
var pIE = __webpack_require__(8449);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ 2127:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var core = __webpack_require__(6094);
var hide = __webpack_require__(3341);
var redefine = __webpack_require__(8859);
var ctx = __webpack_require__(5052);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 5203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MATCH = __webpack_require__(7574)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ 9448:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 9228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(4116);
var redefine = __webpack_require__(8859);
var hide = __webpack_require__(3341);
var fails = __webpack_require__(9448);
var defined = __webpack_require__(3344);
var wks = __webpack_require__(7574);
var regexpExec = __webpack_require__(9600);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ 1158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(4228);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(7981);
var isObject = __webpack_require__(3305);
var toLength = __webpack_require__(1485);
var ctx = __webpack_require__(5052);
var IS_CONCAT_SPREADABLE = __webpack_require__(7574)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),

/***/ 8790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(5052);
var call = __webpack_require__(7368);
var isArrayIter = __webpack_require__(1508);
var anObject = __webpack_require__(4228);
var toLength = __webpack_require__(1485);
var getIterFn = __webpack_require__(762);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ 9461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(4556)('native-function-to-string', Function.toString);


/***/ }),

/***/ 7526:
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 7917:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 3341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(7967);
var createDesc = __webpack_require__(1996);
module.exports = __webpack_require__(1763) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 1308:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = (__webpack_require__(7526).document);
module.exports = document && document.documentElement;


/***/ }),

/***/ 2956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(1763) && !__webpack_require__(9448)(function () {
  return Object.defineProperty(__webpack_require__(6034)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3305);
var setPrototypeOf = (__webpack_require__(5170).set);
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ 4877:
/***/ ((module) => {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ 1249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(5089);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 1508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(906);
var ITERATOR = __webpack_require__(7574)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(5089);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 3842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(3305);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 3305:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 5411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(3305);
var cof = __webpack_require__(5089);
var MATCH = __webpack_require__(7574)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ 7368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4228);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 6032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var create = __webpack_require__(4719);
var descriptor = __webpack_require__(1996);
var setToStringTag = __webpack_require__(3844);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(3341)(IteratorPrototype, __webpack_require__(7574)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 8175:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(2750);
var $export = __webpack_require__(2127);
var redefine = __webpack_require__(8859);
var hide = __webpack_require__(3341);
var Iterators = __webpack_require__(906);
var $iterCreate = __webpack_require__(6032);
var setToStringTag = __webpack_require__(3844);
var getPrototypeOf = __webpack_require__(627);
var ITERATOR = __webpack_require__(7574)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 8931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(7574)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 4970:
/***/ ((module) => {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ 906:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 2750:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 5551:
/***/ ((module) => {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ 2122:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(3733);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ 1473:
/***/ ((module) => {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ 7836:
/***/ ((module) => {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),

/***/ 3733:
/***/ ((module) => {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ 2988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var META = __webpack_require__(4415)('meta');
var isObject = __webpack_require__(3305);
var has = __webpack_require__(7917);
var setDesc = (__webpack_require__(7967).f);
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(9448)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ 7380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Map = __webpack_require__(3386);
var $export = __webpack_require__(2127);
var shared = __webpack_require__(4556)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(9397))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ 1384:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var macrotask = (__webpack_require__(2780).set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(5089)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ 4258:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(3387);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 8206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(1763);
var getKeys = __webpack_require__(1311);
var gOPS = __webpack_require__(1060);
var pIE = __webpack_require__(8449);
var toObject = __webpack_require__(8270);
var IObject = __webpack_require__(1249);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9448)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 4719:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4228);
var dPs = __webpack_require__(1626);
var enumBugKeys = __webpack_require__(6140);
var IE_PROTO = __webpack_require__(766)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(6034)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(1308).appendChild)(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 7967:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var anObject = __webpack_require__(4228);
var IE8_DOM_DEFINE = __webpack_require__(2956);
var toPrimitive = __webpack_require__(3048);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1763) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1626:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(7967);
var anObject = __webpack_require__(4228);
var getKeys = __webpack_require__(1311);

module.exports = __webpack_require__(1763) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 1913:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(2750) || !__webpack_require__(9448)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(7526)[K];
});


/***/ }),

/***/ 8641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var pIE = __webpack_require__(8449);
var createDesc = __webpack_require__(1996);
var toIObject = __webpack_require__(7221);
var toPrimitive = __webpack_require__(3048);
var has = __webpack_require__(7917);
var IE8_DOM_DEFINE = __webpack_require__(2956);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1763) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ 4765:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7221);
var gOPN = (__webpack_require__(9415).f);
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 9415:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(4561);
var hiddenKeys = (__webpack_require__(6140).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ 1060:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7917);
var toObject = __webpack_require__(8270);
var IE_PROTO = __webpack_require__(766)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 4561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(7917);
var toIObject = __webpack_require__(7221);
var arrayIndexOf = __webpack_require__(1464)(false);
var IE_PROTO = __webpack_require__(766)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1311:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(4561);
var enumBugKeys = __webpack_require__(6140);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 8449:
/***/ ((__unused_webpack_module, exports) => {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(2127);
var core = __webpack_require__(6094);
var fails = __webpack_require__(9448);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 3854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1763);
var getKeys = __webpack_require__(1311);
var toIObject = __webpack_require__(7221);
var isEnum = (__webpack_require__(8449).f);
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ 6222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(9415);
var gOPS = __webpack_require__(1060);
var anObject = __webpack_require__(4228);
var Reflect = (__webpack_require__(7526).Reflect);
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ 3589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $parseFloat = (__webpack_require__(7526).parseFloat);
var $trim = (__webpack_require__(629).trim);

module.exports = 1 / $parseFloat(__webpack_require__(832) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ 2738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $parseInt = (__webpack_require__(7526).parseInt);
var $trim = (__webpack_require__(629).trim);
var ws = __webpack_require__(832);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ 128:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ 5957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(4228);
var isObject = __webpack_require__(3305);
var newPromiseCapability = __webpack_require__(4258);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 1996:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(8859);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ 8859:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var hide = __webpack_require__(3341);
var has = __webpack_require__(7917);
var SRC = __webpack_require__(4415)('src');
var $toString = __webpack_require__(9461);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

(__webpack_require__(6094).inspectSource) = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ 2535:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var classof = __webpack_require__(4848);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ 9600:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var regexpFlags = __webpack_require__(1158);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7359:
/***/ ((module) => {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 9307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(2127);
var aFunction = __webpack_require__(3387);
var ctx = __webpack_require__(5052);
var forOf = __webpack_require__(8790);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ 8966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(2127);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ 5170:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(3305);
var anObject = __webpack_require__(4228);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(5052)(Function.call, (__webpack_require__(8641).f)(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 5762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7526);
var dP = __webpack_require__(7967);
var DESCRIPTORS = __webpack_require__(1763);
var SPECIES = __webpack_require__(7574)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ 3844:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var def = (__webpack_require__(7967).f);
var has = __webpack_require__(7917);
var TAG = __webpack_require__(7574)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(4556)('keys');
var uid = __webpack_require__(4415);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 4556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(6094);
var global = __webpack_require__(7526);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(2750) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 9190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4228);
var aFunction = __webpack_require__(3387);
var SPECIES = __webpack_require__(7574)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ 6884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(9448);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ 1212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(7087);
var defined = __webpack_require__(3344);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 8942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(5411);
var defined = __webpack_require__(3344);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ 2468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var fails = __webpack_require__(9448);
var defined = __webpack_require__(3344);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ 4472:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(1485);
var repeat = __webpack_require__(7926);
var defined = __webpack_require__(3344);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),

/***/ 7926:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toInteger = __webpack_require__(7087);
var defined = __webpack_require__(3344);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ 629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var defined = __webpack_require__(3344);
var fails = __webpack_require__(9448);
var spaces = __webpack_require__(832);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ 832:
/***/ ((module) => {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 2780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(5052);
var invoke = __webpack_require__(4877);
var html = __webpack_require__(1308);
var cel = __webpack_require__(6034);
var global = __webpack_require__(7526);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(5089)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ 157:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(7087);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 3133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(7087);
var toLength = __webpack_require__(1485);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),

/***/ 7087:
/***/ ((module) => {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 7221:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(1249);
var defined = __webpack_require__(3344);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 1485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.15 ToLength
var toInteger = __webpack_require__(7087);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 8270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(3344);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 3048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3305);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 7209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (__webpack_require__(1763)) {
  var LIBRARY = __webpack_require__(2750);
  var global = __webpack_require__(7526);
  var fails = __webpack_require__(9448);
  var $export = __webpack_require__(2127);
  var $typed = __webpack_require__(237);
  var $buffer = __webpack_require__(8032);
  var ctx = __webpack_require__(5052);
  var anInstance = __webpack_require__(6440);
  var propertyDesc = __webpack_require__(1996);
  var hide = __webpack_require__(3341);
  var redefineAll = __webpack_require__(6065);
  var toInteger = __webpack_require__(7087);
  var toLength = __webpack_require__(1485);
  var toIndex = __webpack_require__(3133);
  var toAbsoluteIndex = __webpack_require__(157);
  var toPrimitive = __webpack_require__(3048);
  var has = __webpack_require__(7917);
  var classof = __webpack_require__(4848);
  var isObject = __webpack_require__(3305);
  var toObject = __webpack_require__(8270);
  var isArrayIter = __webpack_require__(1508);
  var create = __webpack_require__(4719);
  var getPrototypeOf = __webpack_require__(627);
  var gOPN = (__webpack_require__(9415).f);
  var getIterFn = __webpack_require__(762);
  var uid = __webpack_require__(4415);
  var wks = __webpack_require__(7574);
  var createArrayMethod = __webpack_require__(6179);
  var createArrayIncludes = __webpack_require__(1464);
  var speciesConstructor = __webpack_require__(9190);
  var ArrayIterators = __webpack_require__(5165);
  var Iterators = __webpack_require__(906);
  var $iterDetect = __webpack_require__(8931);
  var setSpecies = __webpack_require__(5762);
  var arrayFill = __webpack_require__(5564);
  var arrayCopyWithin = __webpack_require__(4438);
  var $DP = __webpack_require__(7967);
  var $GOPD = __webpack_require__(8641);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ 8032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7526);
var DESCRIPTORS = __webpack_require__(1763);
var LIBRARY = __webpack_require__(2750);
var $typed = __webpack_require__(237);
var hide = __webpack_require__(3341);
var redefineAll = __webpack_require__(6065);
var fails = __webpack_require__(9448);
var anInstance = __webpack_require__(6440);
var toInteger = __webpack_require__(7087);
var toLength = __webpack_require__(1485);
var toIndex = __webpack_require__(3133);
var gOPN = (__webpack_require__(9415).f);
var dP = (__webpack_require__(7967).f);
var arrayFill = __webpack_require__(5564);
var setToStringTag = __webpack_require__(3844);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ 237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var hide = __webpack_require__(3341);
var uid = __webpack_require__(4415);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),

/***/ 4415:
/***/ ((module) => {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 4514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ 2888:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(3305);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ 5392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var core = __webpack_require__(6094);
var LIBRARY = __webpack_require__(2750);
var wksExt = __webpack_require__(7960);
var defineProperty = (__webpack_require__(7967).f);
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ 7960:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.f = __webpack_require__(7574);


/***/ }),

/***/ 7574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(4556)('wks');
var uid = __webpack_require__(4415);
var Symbol = (__webpack_require__(7526).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4848);
var ITERATOR = __webpack_require__(7574)('iterator');
var Iterators = __webpack_require__(906);
module.exports = (__webpack_require__(6094).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 9620:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(2127);

$export($export.P, 'Array', { copyWithin: __webpack_require__(4438) });

__webpack_require__(8184)('copyWithin');


/***/ }),

/***/ 8888:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $every = __webpack_require__(6179)(4);

$export($export.P + $export.F * !__webpack_require__(6884)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 7762:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(2127);

$export($export.P, 'Array', { fill: __webpack_require__(5564) });

__webpack_require__(8184)('fill');


/***/ }),

/***/ 9813:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $filter = __webpack_require__(6179)(2);

$export($export.P + $export.F * !__webpack_require__(6884)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 5369:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(2127);
var $find = __webpack_require__(6179)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(8184)(KEY);


/***/ }),

/***/ 5144:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(2127);
var $find = __webpack_require__(6179)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(8184)(KEY);


/***/ }),

/***/ 3504:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $forEach = __webpack_require__(6179)(0);
var STRICT = __webpack_require__(6884)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 3863:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ctx = __webpack_require__(5052);
var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var call = __webpack_require__(7368);
var isArrayIter = __webpack_require__(1508);
var toLength = __webpack_require__(1485);
var createProperty = __webpack_require__(7227);
var getIterFn = __webpack_require__(762);

$export($export.S + $export.F * !__webpack_require__(8931)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 4609:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $indexOf = __webpack_require__(1464)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(6884)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ 7899:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(2127);

$export($export.S, 'Array', { isArray: __webpack_require__(7981) });


/***/ }),

/***/ 5165:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var addToUnscopables = __webpack_require__(8184);
var step = __webpack_require__(4970);
var Iterators = __webpack_require__(906);
var toIObject = __webpack_require__(7221);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(8175)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 6511:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(2127);
var toIObject = __webpack_require__(7221);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(1249) != Object || !__webpack_require__(6884)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 3706:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toIObject = __webpack_require__(7221);
var toInteger = __webpack_require__(7087);
var toLength = __webpack_require__(1485);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(6884)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),

/***/ 4913:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $map = __webpack_require__(6179)(1);

$export($export.P + $export.F * !__webpack_require__(6884)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 4570:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var createProperty = __webpack_require__(7227);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(9448)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ 7874:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $reduce = __webpack_require__(6543);

$export($export.P + $export.F * !__webpack_require__(6884)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ 1449:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $reduce = __webpack_require__(6543);

$export($export.P + $export.F * !__webpack_require__(6884)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ 5853:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var html = __webpack_require__(1308);
var cof = __webpack_require__(5089);
var toAbsoluteIndex = __webpack_require__(157);
var toLength = __webpack_require__(1485);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(9448)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),

/***/ 8892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $some = __webpack_require__(6179)(3);

$export($export.P + $export.F * !__webpack_require__(6884)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 7075:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var aFunction = __webpack_require__(3387);
var toObject = __webpack_require__(8270);
var fails = __webpack_require__(9448);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(6884)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ 6209:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5762)('Array');


/***/ }),

/***/ 3292:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(2127);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ 9429:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(2127);
var toISOString = __webpack_require__(5385);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),

/***/ 2346:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var toPrimitive = __webpack_require__(3048);

$export($export.P + $export.F * __webpack_require__(9448)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ 8951:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_PRIMITIVE = __webpack_require__(7574)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(3341)(proto, TO_PRIMITIVE, __webpack_require__(107));


/***/ }),

/***/ 7849:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(8859)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ 5049:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(2127);

$export($export.P, 'Function', { bind: __webpack_require__(5538) });


/***/ }),

/***/ 5502:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(3305);
var getPrototypeOf = __webpack_require__(627);
var HAS_INSTANCE = __webpack_require__(7574)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) (__webpack_require__(7967).f)(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),

/***/ 489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var dP = (__webpack_require__(7967).f);
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(1763) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ 3386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var strong = __webpack_require__(6197);
var validate = __webpack_require__(2888);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(8933)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ 6648:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(2127);
var log1p = __webpack_require__(1473);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ 5771:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(2127);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ 2392:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(2127);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ 2335:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(2127);
var sign = __webpack_require__(3733);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ 4896:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ 4521:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(2127);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ 9147:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(2127);
var $expm1 = __webpack_require__(5551);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ 1318:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { fround: __webpack_require__(2122) });


/***/ }),

/***/ 4352:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(2127);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ 5327:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(2127);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(9448)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ 7509:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ 5909:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { log1p: __webpack_require__(1473) });


/***/ }),

/***/ 9584:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ 345:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { sign: __webpack_require__(3733) });


/***/ }),

/***/ 9134:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(2127);
var expm1 = __webpack_require__(5551);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(9448)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ 7901:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(2127);
var expm1 = __webpack_require__(5551);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ 6592:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ 4509:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7526);
var has = __webpack_require__(7917);
var cof = __webpack_require__(5089);
var inheritIfRequired = __webpack_require__(8880);
var toPrimitive = __webpack_require__(3048);
var fails = __webpack_require__(9448);
var gOPN = (__webpack_require__(9415).f);
var gOPD = (__webpack_require__(8641).f);
var dP = (__webpack_require__(7967).f);
var $trim = (__webpack_require__(629).trim);
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(4719)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(1763) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(8859)(global, NUMBER, $Number);
}


/***/ }),

/***/ 4419:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(2127);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ 1933:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(2127);
var _isFinite = (__webpack_require__(7526).isFinite);

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ 3157:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(2127);

$export($export.S, 'Number', { isInteger: __webpack_require__(3842) });


/***/ }),

/***/ 9497:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(2127);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ 4104:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(2127);
var isInteger = __webpack_require__(3842);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ 210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(2127);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ 6576:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(2127);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ 4437:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var $parseFloat = __webpack_require__(3589);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),

/***/ 8050:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var $parseInt = __webpack_require__(2738);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ 7727:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toInteger = __webpack_require__(7087);
var aNumberValue = __webpack_require__(5122);
var repeat = __webpack_require__(7926);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(9448)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ 6701:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $fails = __webpack_require__(9448);
var aNumberValue = __webpack_require__(5122);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),

/***/ 1430:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2127);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(8206) });


/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(4719) });


/***/ }),

/***/ 7067:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(1763), 'Object', { defineProperties: __webpack_require__(1626) });


/***/ }),

/***/ 6064:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1763), 'Object', { defineProperty: (__webpack_require__(7967).f) });


/***/ }),

/***/ 8236:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(3305);
var meta = (__webpack_require__(2988).onFreeze);

__webpack_require__(923)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ 2642:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(7221);
var $getOwnPropertyDescriptor = (__webpack_require__(8641).f);

__webpack_require__(923)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ 1895:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(923)('getOwnPropertyNames', function () {
  return (__webpack_require__(4765).f);
});


/***/ }),

/***/ 3000:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(8270);
var $getPrototypeOf = __webpack_require__(627);

__webpack_require__(923)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 9073:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(3305);

__webpack_require__(923)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ 9318:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(3305);

__webpack_require__(923)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ 5032:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(3305);

__webpack_require__(923)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ 8451:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(2127);
$export($export.S, 'Object', { is: __webpack_require__(7359) });


/***/ }),

/***/ 8647:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(8270);
var $keys = __webpack_require__(1311);

__webpack_require__(923)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 5572:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(3305);
var meta = (__webpack_require__(2988).onFreeze);

__webpack_require__(923)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ 3822:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(3305);
var meta = (__webpack_require__(2988).onFreeze);

__webpack_require__(923)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ 8132:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(2127);
$export($export.S, 'Object', { setPrototypeOf: (__webpack_require__(5170).set) });


/***/ }),

/***/ 7482:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(4848);
var test = {};
test[__webpack_require__(7574)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(8859)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ 6108:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var $parseFloat = __webpack_require__(3589);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var $parseInt = __webpack_require__(2738);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ 6517:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(2750);
var global = __webpack_require__(7526);
var ctx = __webpack_require__(5052);
var classof = __webpack_require__(4848);
var $export = __webpack_require__(2127);
var isObject = __webpack_require__(3305);
var aFunction = __webpack_require__(3387);
var anInstance = __webpack_require__(6440);
var forOf = __webpack_require__(8790);
var speciesConstructor = __webpack_require__(9190);
var task = (__webpack_require__(2780).set);
var microtask = __webpack_require__(1384)();
var newPromiseCapabilityModule = __webpack_require__(4258);
var perform = __webpack_require__(128);
var userAgent = __webpack_require__(4514);
var promiseResolve = __webpack_require__(5957);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(7574)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(6065)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(3844)($Promise, PROMISE);
__webpack_require__(5762)(PROMISE);
Wrapper = __webpack_require__(6094)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(8931)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ 7103:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(2127);
var aFunction = __webpack_require__(3387);
var anObject = __webpack_require__(4228);
var rApply = ((__webpack_require__(7526).Reflect) || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(9448)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ 2586:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(2127);
var create = __webpack_require__(4719);
var aFunction = __webpack_require__(3387);
var anObject = __webpack_require__(4228);
var isObject = __webpack_require__(3305);
var fails = __webpack_require__(9448);
var bind = __webpack_require__(5538);
var rConstruct = ((__webpack_require__(7526).Reflect) || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 2552:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7967);
var $export = __webpack_require__(2127);
var anObject = __webpack_require__(4228);
var toPrimitive = __webpack_require__(3048);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(9448)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 4376:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(2127);
var gOPD = (__webpack_require__(8641).f);
var anObject = __webpack_require__(4228);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ 5153:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(2127);
var anObject = __webpack_require__(4228);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(6032)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ 2650:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(8641);
var $export = __webpack_require__(2127);
var anObject = __webpack_require__(4228);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ 1104:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(2127);
var getProto = __webpack_require__(627);
var anObject = __webpack_require__(4228);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ 1879:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(8641);
var getPrototypeOf = __webpack_require__(627);
var has = __webpack_require__(7917);
var $export = __webpack_require__(2127);
var isObject = __webpack_require__(3305);
var anObject = __webpack_require__(4228);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ 1883:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(2127);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ 5433:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(2127);
var anObject = __webpack_require__(4228);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ 5000:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(2127);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(6222) });


/***/ }),

/***/ 5932:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(2127);
var anObject = __webpack_require__(4228);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 6316:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(2127);
var setProto = __webpack_require__(5170);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 5443:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7967);
var gOPD = __webpack_require__(8641);
var getPrototypeOf = __webpack_require__(627);
var has = __webpack_require__(7917);
var $export = __webpack_require__(2127);
var createDesc = __webpack_require__(1996);
var anObject = __webpack_require__(4228);
var isObject = __webpack_require__(3305);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ 8301:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7526);
var inheritIfRequired = __webpack_require__(8880);
var dP = (__webpack_require__(7967).f);
var gOPN = (__webpack_require__(9415).f);
var isRegExp = __webpack_require__(5411);
var $flags = __webpack_require__(1158);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(1763) && (!CORRECT_NEW || __webpack_require__(9448)(function () {
  re2[__webpack_require__(7574)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(8859)(global, 'RegExp', $RegExp);
}

__webpack_require__(5762)('RegExp');


/***/ }),

/***/ 4116:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var regexpExec = __webpack_require__(9600);
__webpack_require__(2127)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ 9638:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(1763) && /./g.flags != 'g') (__webpack_require__(7967).f)(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(1158)
});


/***/ }),

/***/ 4040:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(4228);
var toLength = __webpack_require__(1485);
var advanceStringIndex = __webpack_require__(8828);
var regExpExec = __webpack_require__(2535);

// @@match logic
__webpack_require__(9228)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 8305:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(4228);
var toObject = __webpack_require__(8270);
var toLength = __webpack_require__(1485);
var toInteger = __webpack_require__(7087);
var advanceStringIndex = __webpack_require__(8828);
var regExpExec = __webpack_require__(2535);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(9228)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ 4701:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(4228);
var sameValue = __webpack_require__(7359);
var regExpExec = __webpack_require__(2535);

// @@search logic
__webpack_require__(9228)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ 341:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isRegExp = __webpack_require__(5411);
var anObject = __webpack_require__(4228);
var speciesConstructor = __webpack_require__(9190);
var advanceStringIndex = __webpack_require__(8828);
var toLength = __webpack_require__(1485);
var callRegExpExec = __webpack_require__(2535);
var regexpExec = __webpack_require__(9600);
var fails = __webpack_require__(9448);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(9228)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ 8604:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

__webpack_require__(9638);
var anObject = __webpack_require__(4228);
var $flags = __webpack_require__(1158);
var DESCRIPTORS = __webpack_require__(1763);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(8859)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(9448)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ 1632:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var strong = __webpack_require__(6197);
var validate = __webpack_require__(2888);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(8933)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ 7360:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(2468)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),

/***/ 9011:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(2468)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),

/***/ 4591:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(2468)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),

/***/ 7334:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(2468)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),

/***/ 2405:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $at = __webpack_require__(1212)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ 7224:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(2127);
var toLength = __webpack_require__(1485);
var context = __webpack_require__(8942);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(5203)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ 7083:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(2468)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ 9213:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(2468)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),

/***/ 8437:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(2468)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),

/***/ 2220:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var toAbsoluteIndex = __webpack_require__(157);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ 8872:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(2127);
var context = __webpack_require__(8942);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(5203)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 9839:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(2468)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),

/***/ 2975:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $at = __webpack_require__(1212)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(8175)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 6549:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(2468)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ 3483:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var toIObject = __webpack_require__(7221);
var toLength = __webpack_require__(1485);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ 4894:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(7926)
});


/***/ }),

/***/ 2818:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(2468)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ 177:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(2127);
var toLength = __webpack_require__(1485);
var context = __webpack_require__(8942);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(5203)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ 8543:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(2468)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),

/***/ 3559:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(2468)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),

/***/ 4153:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(2468)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),

/***/ 957:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(629)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),

/***/ 9650:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(7526);
var has = __webpack_require__(7917);
var DESCRIPTORS = __webpack_require__(1763);
var $export = __webpack_require__(2127);
var redefine = __webpack_require__(8859);
var META = (__webpack_require__(2988).KEY);
var $fails = __webpack_require__(9448);
var shared = __webpack_require__(4556);
var setToStringTag = __webpack_require__(3844);
var uid = __webpack_require__(4415);
var wks = __webpack_require__(7574);
var wksExt = __webpack_require__(7960);
var wksDefine = __webpack_require__(5392);
var enumKeys = __webpack_require__(5969);
var isArray = __webpack_require__(7981);
var anObject = __webpack_require__(4228);
var isObject = __webpack_require__(3305);
var toObject = __webpack_require__(8270);
var toIObject = __webpack_require__(7221);
var toPrimitive = __webpack_require__(3048);
var createDesc = __webpack_require__(1996);
var _create = __webpack_require__(4719);
var gOPNExt = __webpack_require__(4765);
var $GOPD = __webpack_require__(8641);
var $GOPS = __webpack_require__(1060);
var $DP = __webpack_require__(7967);
var $keys = __webpack_require__(1311);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  (__webpack_require__(9415).f) = gOPNExt.f = $getOwnPropertyNames;
  (__webpack_require__(8449).f) = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(2750)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(3341)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 5706:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var $typed = __webpack_require__(237);
var buffer = __webpack_require__(8032);
var anObject = __webpack_require__(4228);
var toAbsoluteIndex = __webpack_require__(157);
var toLength = __webpack_require__(1485);
var isObject = __webpack_require__(3305);
var ArrayBuffer = (__webpack_require__(7526).ArrayBuffer);
var speciesConstructor = __webpack_require__(9190);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(9448)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(5762)(ARRAY_BUFFER);


/***/ }),

/***/ 660:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
$export($export.G + $export.W + $export.F * !(__webpack_require__(237).ABV), {
  DataView: (__webpack_require__(8032).DataView)
});


/***/ }),

/***/ 7925:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 2490:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 1220:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 8066:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 8699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 2087:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 8537:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 4702:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 333:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7209)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ 9397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7526);
var each = __webpack_require__(6179)(0);
var redefine = __webpack_require__(8859);
var meta = __webpack_require__(2988);
var assign = __webpack_require__(8206);
var weak = __webpack_require__(9882);
var isObject = __webpack_require__(3305);
var validate = __webpack_require__(2888);
var NATIVE_WEAK_MAP = __webpack_require__(2888);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(8933)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ 8163:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var weak = __webpack_require__(9882);
var validate = __webpack_require__(2888);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(8933)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),

/***/ 9766:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(2127);
var flattenIntoArray = __webpack_require__(2322);
var toObject = __webpack_require__(8270);
var toLength = __webpack_require__(1485);
var aFunction = __webpack_require__(3387);
var arraySpeciesCreate = __webpack_require__(3191);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(8184)('flatMap');


/***/ }),

/***/ 1390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(2127);
var flattenIntoArray = __webpack_require__(2322);
var toObject = __webpack_require__(8270);
var toLength = __webpack_require__(1485);
var toInteger = __webpack_require__(7087);
var arraySpeciesCreate = __webpack_require__(3191);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(8184)('flatten');


/***/ }),

/***/ 9087:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(2127);
var $includes = __webpack_require__(1464)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(8184)('includes');


/***/ }),

/***/ 3642:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(2127);
var microtask = __webpack_require__(1384)();
var process = (__webpack_require__(7526).process);
var isNode = __webpack_require__(5089)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),

/***/ 9676:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(2127);
var cof = __webpack_require__(5089);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),

/***/ 1692:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(2127);

$export($export.G, { global: __webpack_require__(7526) });


/***/ }),

/***/ 7367:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(9307)('Map');


/***/ }),

/***/ 5738:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(8966)('Map');


/***/ }),

/***/ 1657:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(2127);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(4490)('Map') });


/***/ }),

/***/ 6764:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),

/***/ 447:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),

/***/ 8330:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),

/***/ 8423:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);
var scale = __webpack_require__(7836);
var fround = __webpack_require__(2122);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),

/***/ 4117:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),

/***/ 269:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),

/***/ 3758:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),

/***/ 391:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),

/***/ 4633:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),

/***/ 9557:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { scale: __webpack_require__(7836) });


/***/ }),

/***/ 6043:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(2127);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(2127);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),

/***/ 7531:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var aFunction = __webpack_require__(3387);
var $defineProperty = __webpack_require__(7967);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(1763) && $export($export.P + __webpack_require__(1913), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ 5039:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var aFunction = __webpack_require__(3387);
var $defineProperty = __webpack_require__(7967);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(1763) && $export($export.P + __webpack_require__(1913), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ 7146:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(2127);
var $entries = __webpack_require__(3854)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ 4614:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(2127);
var ownKeys = __webpack_require__(6222);
var toIObject = __webpack_require__(7221);
var gOPD = __webpack_require__(8641);
var createProperty = __webpack_require__(7227);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ 4300:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var toPrimitive = __webpack_require__(3048);
var getPrototypeOf = __webpack_require__(627);
var getOwnPropertyDescriptor = (__webpack_require__(8641).f);

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(1763) && $export($export.P + __webpack_require__(1913), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ 6328:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2127);
var toObject = __webpack_require__(8270);
var toPrimitive = __webpack_require__(3048);
var getPrototypeOf = __webpack_require__(627);
var getOwnPropertyDescriptor = (__webpack_require__(8641).f);

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(1763) && $export($export.P + __webpack_require__(1913), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ 7594:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(2127);
var $values = __webpack_require__(3854)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ 9530:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(2127);
var global = __webpack_require__(7526);
var core = __webpack_require__(6094);
var microtask = __webpack_require__(1384)();
var OBSERVABLE = __webpack_require__(7574)('observable');
var aFunction = __webpack_require__(3387);
var anObject = __webpack_require__(4228);
var anInstance = __webpack_require__(6440);
var redefineAll = __webpack_require__(6065);
var hide = __webpack_require__(3341);
var forOf = __webpack_require__(8790);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(5762)('Observable');


/***/ }),

/***/ 8583:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(2127);
var core = __webpack_require__(6094);
var global = __webpack_require__(7526);
var speciesConstructor = __webpack_require__(9190);
var promiseResolve = __webpack_require__(5957);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ 1041:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(2127);
var newPromiseCapability = __webpack_require__(4258);
var perform = __webpack_require__(128);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ 7491:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ 4907:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ 9269:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var Set = __webpack_require__(1632);
var from = __webpack_require__(956);
var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var getPrototypeOf = __webpack_require__(627);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ 9100:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var getPrototypeOf = __webpack_require__(627);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 9732:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ 1319:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 1176:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var getPrototypeOf = __webpack_require__(627);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 3107:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 1691:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $metadata = __webpack_require__(7380);
var anObject = __webpack_require__(4228);
var aFunction = __webpack_require__(3387);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ 2577:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(9307)('Set');


/***/ }),

/***/ 9616:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(8966)('Set');


/***/ }),

/***/ 8223:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(2127);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(4490)('Set') });


/***/ }),

/***/ 2687:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(2127);
var $at = __webpack_require__(1212)(true);
var $fails = __webpack_require__(9448);

var FORCED = $fails(function () {
  return '𠮷'.at(0) !== '𠮷';
});

$export($export.P + $export.F * FORCED, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ 6311:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(2127);
var defined = __webpack_require__(3344);
var toLength = __webpack_require__(1485);
var isRegExp = __webpack_require__(5411);
var getFlags = __webpack_require__(1158);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(6032)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),

/***/ 5693:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(2127);
var $pad = __webpack_require__(4472);
var userAgent = __webpack_require__(4514);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),

/***/ 5380:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(2127);
var $pad = __webpack_require__(4472);
var userAgent = __webpack_require__(4514);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),

/***/ 62:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(629)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(629)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),

/***/ 2820:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5392)('asyncIterator');


/***/ }),

/***/ 4180:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5392)('observable');


/***/ }),

/***/ 3537:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(2127);

$export($export.S, 'System', { global: __webpack_require__(7526) });


/***/ }),

/***/ 4748:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(9307)('WeakMap');


/***/ }),

/***/ 6841:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(8966)('WeakMap');


/***/ }),

/***/ 2538:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(9307)('WeakSet');


/***/ }),

/***/ 5339:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(8966)('WeakSet');


/***/ }),

/***/ 5890:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $iterators = __webpack_require__(5165);
var getKeys = __webpack_require__(1311);
var redefine = __webpack_require__(8859);
var global = __webpack_require__(7526);
var hide = __webpack_require__(3341);
var Iterators = __webpack_require__(906);
var wks = __webpack_require__(7574);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ 5417:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(2127);
var $task = __webpack_require__(2780);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),

/***/ 8772:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(7526);
var $export = __webpack_require__(2127);
var userAgent = __webpack_require__(4514);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ 6813:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9650);
__webpack_require__(935);
__webpack_require__(6064);
__webpack_require__(7067);
__webpack_require__(2642);
__webpack_require__(3000);
__webpack_require__(8647);
__webpack_require__(1895);
__webpack_require__(8236);
__webpack_require__(3822);
__webpack_require__(5572);
__webpack_require__(9318);
__webpack_require__(5032);
__webpack_require__(9073);
__webpack_require__(1430);
__webpack_require__(8451);
__webpack_require__(8132);
__webpack_require__(7482);
__webpack_require__(5049);
__webpack_require__(489);
__webpack_require__(5502);
__webpack_require__(571);
__webpack_require__(6108);
__webpack_require__(4509);
__webpack_require__(7727);
__webpack_require__(6701);
__webpack_require__(4419);
__webpack_require__(1933);
__webpack_require__(3157);
__webpack_require__(9497);
__webpack_require__(4104);
__webpack_require__(210);
__webpack_require__(6576);
__webpack_require__(4437);
__webpack_require__(8050);
__webpack_require__(6648);
__webpack_require__(5771);
__webpack_require__(2392);
__webpack_require__(2335);
__webpack_require__(4896);
__webpack_require__(4521);
__webpack_require__(9147);
__webpack_require__(1318);
__webpack_require__(4352);
__webpack_require__(5327);
__webpack_require__(7509);
__webpack_require__(5909);
__webpack_require__(9584);
__webpack_require__(345);
__webpack_require__(9134);
__webpack_require__(7901);
__webpack_require__(6592);
__webpack_require__(2220);
__webpack_require__(3483);
__webpack_require__(957);
__webpack_require__(2975);
__webpack_require__(2405);
__webpack_require__(7224);
__webpack_require__(8872);
__webpack_require__(4894);
__webpack_require__(177);
__webpack_require__(7360);
__webpack_require__(9011);
__webpack_require__(4591);
__webpack_require__(7334);
__webpack_require__(7083);
__webpack_require__(9213);
__webpack_require__(8437);
__webpack_require__(9839);
__webpack_require__(6549);
__webpack_require__(2818);
__webpack_require__(8543);
__webpack_require__(3559);
__webpack_require__(4153);
__webpack_require__(3292);
__webpack_require__(2346);
__webpack_require__(9429);
__webpack_require__(7849);
__webpack_require__(8951);
__webpack_require__(7899);
__webpack_require__(3863);
__webpack_require__(4570);
__webpack_require__(6511);
__webpack_require__(5853);
__webpack_require__(7075);
__webpack_require__(3504);
__webpack_require__(4913);
__webpack_require__(9813);
__webpack_require__(8892);
__webpack_require__(8888);
__webpack_require__(1449);
__webpack_require__(7874);
__webpack_require__(4609);
__webpack_require__(3706);
__webpack_require__(9620);
__webpack_require__(7762);
__webpack_require__(5144);
__webpack_require__(5369);
__webpack_require__(6209);
__webpack_require__(5165);
__webpack_require__(8301);
__webpack_require__(4116);
__webpack_require__(8604);
__webpack_require__(9638);
__webpack_require__(4040);
__webpack_require__(8305);
__webpack_require__(4701);
__webpack_require__(341);
__webpack_require__(6517);
__webpack_require__(3386);
__webpack_require__(1632);
__webpack_require__(9397);
__webpack_require__(8163);
__webpack_require__(5706);
__webpack_require__(660);
__webpack_require__(8699);
__webpack_require__(4702);
__webpack_require__(333);
__webpack_require__(1220);
__webpack_require__(2087);
__webpack_require__(8066);
__webpack_require__(8537);
__webpack_require__(7925);
__webpack_require__(2490);
__webpack_require__(7103);
__webpack_require__(2586);
__webpack_require__(2552);
__webpack_require__(4376);
__webpack_require__(5153);
__webpack_require__(1879);
__webpack_require__(2650);
__webpack_require__(1104);
__webpack_require__(1883);
__webpack_require__(5433);
__webpack_require__(5000);
__webpack_require__(5932);
__webpack_require__(5443);
__webpack_require__(6316);
__webpack_require__(9087);
__webpack_require__(9766);
__webpack_require__(1390);
__webpack_require__(2687);
__webpack_require__(5380);
__webpack_require__(5693);
__webpack_require__(62);
__webpack_require__(521);
__webpack_require__(6311);
__webpack_require__(2820);
__webpack_require__(4180);
__webpack_require__(4614);
__webpack_require__(7594);
__webpack_require__(7146);
__webpack_require__(7531);
__webpack_require__(5039);
__webpack_require__(4300);
__webpack_require__(6328);
__webpack_require__(1657);
__webpack_require__(8223);
__webpack_require__(5738);
__webpack_require__(9616);
__webpack_require__(6841);
__webpack_require__(5339);
__webpack_require__(7367);
__webpack_require__(2577);
__webpack_require__(4748);
__webpack_require__(2538);
__webpack_require__(1692);
__webpack_require__(3537);
__webpack_require__(9676);
__webpack_require__(6764);
__webpack_require__(447);
__webpack_require__(8330);
__webpack_require__(8423);
__webpack_require__(4117);
__webpack_require__(3758);
__webpack_require__(269);
__webpack_require__(391);
__webpack_require__(4633);
__webpack_require__(9557);
__webpack_require__(3702);
__webpack_require__(6043);
__webpack_require__(8583);
__webpack_require__(1041);
__webpack_require__(7491);
__webpack_require__(4907);
__webpack_require__(9100);
__webpack_require__(9269);
__webpack_require__(1319);
__webpack_require__(9732);
__webpack_require__(1176);
__webpack_require__(3107);
__webpack_require__(1691);
__webpack_require__(3642);
__webpack_require__(9530);
__webpack_require__(8772);
__webpack_require__(5417);
__webpack_require__(5890);
module.exports = __webpack_require__(6094);


/***/ }),

/***/ 1491:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1601);
/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";/*!\n * animate.css - https://animate.style/\n * Version - 4.1.1\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2020 Animate.css\n */\n:root {\n  --animate-duration: 1s;\n  --animate-delay: 1s;\n  --animate-repeat: 1;\n}\n.animate__animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-duration: var(--animate-duration);\n  animation-duration: var(--animate-duration);\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n.animate__animated.animate__infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n.animate__animated.animate__repeat-1 {\n  -webkit-animation-iteration-count: 1;\n  animation-iteration-count: 1;\n  -webkit-animation-iteration-count: var(--animate-repeat);\n  animation-iteration-count: var(--animate-repeat);\n}\n.animate__animated.animate__repeat-2 {\n  -webkit-animation-iteration-count: calc(1 * 2);\n  animation-iteration-count: calc(1 * 2);\n  -webkit-animation-iteration-count: calc(var(--animate-repeat) * 2);\n  animation-iteration-count: calc(var(--animate-repeat) * 2);\n}\n.animate__animated.animate__repeat-3 {\n  -webkit-animation-iteration-count: calc(1 * 3);\n  animation-iteration-count: calc(1 * 3);\n  -webkit-animation-iteration-count: calc(var(--animate-repeat) * 3);\n  animation-iteration-count: calc(var(--animate-repeat) * 3);\n}\n.animate__animated.animate__delay-1s {\n  -webkit-animation-delay: 1s;\n  animation-delay: 1s;\n  -webkit-animation-delay: var(--animate-delay);\n  animation-delay: var(--animate-delay);\n}\n.animate__animated.animate__delay-2s {\n  -webkit-animation-delay: calc(1s * 2);\n  animation-delay: calc(1s * 2);\n  -webkit-animation-delay: calc(var(--animate-delay) * 2);\n  animation-delay: calc(var(--animate-delay) * 2);\n}\n.animate__animated.animate__delay-3s {\n  -webkit-animation-delay: calc(1s * 3);\n  animation-delay: calc(1s * 3);\n  -webkit-animation-delay: calc(var(--animate-delay) * 3);\n  animation-delay: calc(var(--animate-delay) * 3);\n}\n.animate__animated.animate__delay-4s {\n  -webkit-animation-delay: calc(1s * 4);\n  animation-delay: calc(1s * 4);\n  -webkit-animation-delay: calc(var(--animate-delay) * 4);\n  animation-delay: calc(var(--animate-delay) * 4);\n}\n.animate__animated.animate__delay-5s {\n  -webkit-animation-delay: calc(1s * 5);\n  animation-delay: calc(1s * 5);\n  -webkit-animation-delay: calc(var(--animate-delay) * 5);\n  animation-delay: calc(var(--animate-delay) * 5);\n}\n.animate__animated.animate__faster {\n  -webkit-animation-duration: calc(1s / 2);\n  animation-duration: calc(1s / 2);\n  -webkit-animation-duration: calc(var(--animate-duration) / 2);\n  animation-duration: calc(var(--animate-duration) / 2);\n}\n.animate__animated.animate__fast {\n  -webkit-animation-duration: calc(1s * 0.8);\n  animation-duration: calc(1s * 0.8);\n  -webkit-animation-duration: calc(var(--animate-duration) * 0.8);\n  animation-duration: calc(var(--animate-duration) * 0.8);\n}\n.animate__animated.animate__slow {\n  -webkit-animation-duration: calc(1s * 2);\n  animation-duration: calc(1s * 2);\n  -webkit-animation-duration: calc(var(--animate-duration) * 2);\n  animation-duration: calc(var(--animate-duration) * 2);\n}\n.animate__animated.animate__slower {\n  -webkit-animation-duration: calc(1s * 3);\n  animation-duration: calc(1s * 3);\n  -webkit-animation-duration: calc(var(--animate-duration) * 3);\n  animation-duration: calc(var(--animate-duration) * 3);\n}\n@media print, (prefers-reduced-motion: reduce) {\n  .animate__animated {\n    -webkit-animation-duration: 1ms !important;\n    animation-duration: 1ms !important;\n    -webkit-transition-duration: 1ms !important;\n    transition-duration: 1ms !important;\n    -webkit-animation-iteration-count: 1 !important;\n    animation-iteration-count: 1 !important;\n  }\n\n  .animate__animated[class*='Out'] {\n    opacity: 0;\n  }\n}\n/* Attention seekers  */\n@-webkit-keyframes bounce {\n  from,\n  20%,\n  53%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  40%,\n  43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0) scaleY(1.1);\n    transform: translate3d(0, -30px, 0) scaleY(1.1);\n  }\n\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0) scaleY(1.05);\n    transform: translate3d(0, -15px, 0) scaleY(1.05);\n  }\n\n  80% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);\n    transform: translate3d(0, 0, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);\n    transform: translate3d(0, -4px, 0) scaleY(1.02);\n  }\n}\n@keyframes bounce {\n  from,\n  20%,\n  53%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  40%,\n  43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0) scaleY(1.1);\n    transform: translate3d(0, -30px, 0) scaleY(1.1);\n  }\n\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0) scaleY(1.05);\n    transform: translate3d(0, -15px, 0) scaleY(1.05);\n  }\n\n  80% {\n    -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);\n    transform: translate3d(0, 0, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);\n    transform: translate3d(0, -4px, 0) scaleY(1.02);\n  }\n}\n.animate__bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom;\n}\n@-webkit-keyframes flash {\n  from,\n  50%,\n  to {\n    opacity: 1;\n  }\n\n  25%,\n  75% {\n    opacity: 0;\n  }\n}\n@keyframes flash {\n  from,\n  50%,\n  to {\n    opacity: 1;\n  }\n\n  25%,\n  75% {\n    opacity: 0;\n  }\n}\n.animate__flash {\n  -webkit-animation-name: flash;\n  animation-name: flash;\n}\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n.animate__pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse;\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n}\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n@keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1);\n  }\n\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n.animate__rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand;\n}\n@-webkit-keyframes shakeX {\n  from,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n@keyframes shakeX {\n  from,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0);\n  }\n}\n.animate__shakeX {\n  -webkit-animation-name: shakeX;\n  animation-name: shakeX;\n}\n@-webkit-keyframes shakeY {\n  from,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n}\n@keyframes shakeY {\n  from,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0);\n  }\n}\n.animate__shakeY {\n  -webkit-animation-name: shakeY;\n  animation-name: shakeY;\n}\n@-webkit-keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n@keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n.animate__headShake {\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-name: headShake;\n  animation-name: headShake;\n}\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n.animate__swing {\n  -webkit-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing;\n}\n@-webkit-keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%,\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%,\n  60%,\n  80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n@keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%,\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%,\n  50%,\n  70%,\n  90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%,\n  60%,\n  80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n.animate__tada {\n  -webkit-animation-name: tada;\n  animation-name: tada;\n}\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes wobble {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes wobble {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble;\n}\n@-webkit-keyframes jello {\n  from,\n  11.1%,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n}\n@keyframes jello {\n  from,\n  11.1%,\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n}\n.animate__jello {\n  -webkit-animation-name: jello;\n  animation-name: jello;\n  -webkit-transform-origin: center;\n  transform-origin: center;\n}\n@-webkit-keyframes heartBeat {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  14% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n  }\n\n  28% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  42% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n  }\n\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n@keyframes heartBeat {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  14% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n  }\n\n  28% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  42% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3);\n  }\n\n  70% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n.animate__heartBeat {\n  -webkit-animation-name: heartBeat;\n  animation-name: heartBeat;\n  -webkit-animation-duration: calc(1s * 1.3);\n  animation-duration: calc(1s * 1.3);\n  -webkit-animation-duration: calc(var(--animate-duration) * 1.3);\n  animation-duration: calc(var(--animate-duration) * 1.3);\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n}\n/* Back entrances */\n@-webkit-keyframes backInDown {\n  0% {\n    -webkit-transform: translateY(-1200px) scale(0.7);\n    transform: translateY(-1200px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes backInDown {\n  0% {\n    -webkit-transform: translateY(-1200px) scale(0.7);\n    transform: translateY(-1200px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate__backInDown {\n  -webkit-animation-name: backInDown;\n  animation-name: backInDown;\n}\n@-webkit-keyframes backInLeft {\n  0% {\n    -webkit-transform: translateX(-2000px) scale(0.7);\n    transform: translateX(-2000px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes backInLeft {\n  0% {\n    -webkit-transform: translateX(-2000px) scale(0.7);\n    transform: translateX(-2000px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate__backInLeft {\n  -webkit-animation-name: backInLeft;\n  animation-name: backInLeft;\n}\n@-webkit-keyframes backInRight {\n  0% {\n    -webkit-transform: translateX(2000px) scale(0.7);\n    transform: translateX(2000px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes backInRight {\n  0% {\n    -webkit-transform: translateX(2000px) scale(0.7);\n    transform: translateX(2000px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate__backInRight {\n  -webkit-animation-name: backInRight;\n  animation-name: backInRight;\n}\n@-webkit-keyframes backInUp {\n  0% {\n    -webkit-transform: translateY(1200px) scale(0.7);\n    transform: translateY(1200px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes backInUp {\n  0% {\n    -webkit-transform: translateY(1200px) scale(0.7);\n    transform: translateY(1200px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  80% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.animate__backInUp {\n  -webkit-animation-name: backInUp;\n  animation-name: backInUp;\n}\n/* Back exits */\n@-webkit-keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n    transform: translateY(700px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n@keyframes backOutDown {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateY(700px) scale(0.7);\n    transform: translateY(700px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n.animate__backOutDown {\n  -webkit-animation-name: backOutDown;\n  animation-name: backOutDown;\n}\n@-webkit-keyframes backOutLeft {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateX(-2000px) scale(0.7);\n    transform: translateX(-2000px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n@keyframes backOutLeft {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateX(-2000px) scale(0.7);\n    transform: translateX(-2000px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n.animate__backOutLeft {\n  -webkit-animation-name: backOutLeft;\n  animation-name: backOutLeft;\n}\n@-webkit-keyframes backOutRight {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateX(2000px) scale(0.7);\n    transform: translateX(2000px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n@keyframes backOutRight {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateX(0px) scale(0.7);\n    transform: translateX(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateX(2000px) scale(0.7);\n    transform: translateX(2000px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n.animate__backOutRight {\n  -webkit-animation-name: backOutRight;\n  animation-name: backOutRight;\n}\n@-webkit-keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n    transform: translateY(-700px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n@keyframes backOutUp {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1;\n  }\n\n  20% {\n    -webkit-transform: translateY(0px) scale(0.7);\n    transform: translateY(0px) scale(0.7);\n    opacity: 0.7;\n  }\n\n  100% {\n    -webkit-transform: translateY(-700px) scale(0.7);\n    transform: translateY(-700px) scale(0.7);\n    opacity: 0.7;\n  }\n}\n.animate__backOutUp {\n  -webkit-animation-name: backOutUp;\n  animation-name: backOutUp;\n}\n/* Bouncing entrances  */\n@-webkit-keyframes bounceIn {\n  from,\n  20%,\n  40%,\n  60%,\n  80%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n@keyframes bounceIn {\n  from,\n  20%,\n  40%,\n  60%,\n  80%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1);\n  }\n}\n.animate__bounceIn {\n  -webkit-animation-duration: calc(1s * 0.75);\n  animation-duration: calc(1s * 0.75);\n  -webkit-animation-duration: calc(var(--animate-duration) * 0.75);\n  animation-duration: calc(var(--animate-duration) * 0.75);\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn;\n}\n@-webkit-keyframes bounceInDown {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);\n    transform: translate3d(0, -3000px, 0) scaleY(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0) scaleY(0.9);\n    transform: translate3d(0, 25px, 0) scaleY(0.9);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.95);\n    transform: translate3d(0, -10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0) scaleY(0.985);\n    transform: translate3d(0, 5px, 0) scaleY(0.985);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes bounceInDown {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);\n    transform: translate3d(0, -3000px, 0) scaleY(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0) scaleY(0.9);\n    transform: translate3d(0, 25px, 0) scaleY(0.9);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.95);\n    transform: translate3d(0, -10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0) scaleY(0.985);\n    transform: translate3d(0, 5px, 0) scaleY(0.985);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown;\n}\n@-webkit-keyframes bounceInLeft {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0) scaleX(3);\n    transform: translate3d(-3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0) scaleX(1);\n    transform: translate3d(25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0) scaleX(0.98);\n    transform: translate3d(-10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0) scaleX(0.995);\n    transform: translate3d(5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes bounceInLeft {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0) scaleX(3);\n    transform: translate3d(-3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0) scaleX(1);\n    transform: translate3d(25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0) scaleX(0.98);\n    transform: translate3d(-10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0) scaleX(0.995);\n    transform: translate3d(5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft;\n}\n@-webkit-keyframes bounceInRight {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0) scaleX(3);\n    transform: translate3d(3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0) scaleX(1);\n    transform: translate3d(-25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0) scaleX(0.98);\n    transform: translate3d(10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0) scaleX(0.995);\n    transform: translate3d(-5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes bounceInRight {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0) scaleX(3);\n    transform: translate3d(3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0) scaleX(1);\n    transform: translate3d(-25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0) scaleX(0.98);\n    transform: translate3d(10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0) scaleX(0.995);\n    transform: translate3d(-5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight;\n}\n@-webkit-keyframes bounceInUp {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0) scaleY(5);\n    transform: translate3d(0, 3000px, 0) scaleY(5);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);\n    transform: translate3d(0, 10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.985);\n    transform: translate3d(0, -5px, 0) scaleY(0.985);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes bounceInUp {\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0) scaleY(5);\n    transform: translate3d(0, 3000px, 0) scaleY(5);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.95);\n    transform: translate3d(0, 10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0) scaleY(0.985);\n    transform: translate3d(0, -5px, 0) scaleY(0.985);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp;\n}\n/* Bouncing exits  */\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  50%,\n  55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n}\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  50%,\n  55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n}\n.animate__bounceOut {\n  -webkit-animation-duration: calc(1s * 0.75);\n  animation-duration: calc(1s * 0.75);\n  -webkit-animation-duration: calc(var(--animate-duration) * 0.75);\n  animation-duration: calc(var(--animate-duration) * 0.75);\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut;\n}\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.985);\n    transform: translate3d(0, 10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0) scaleY(3);\n    transform: translate3d(0, 2000px, 0) scaleY(3);\n  }\n}\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0) scaleY(0.985);\n    transform: translate3d(0, 10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0) scaleY(0.9);\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0) scaleY(3);\n    transform: translate3d(0, 2000px, 0) scaleY(3);\n  }\n}\n.animate__bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown;\n}\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0) scaleX(0.9);\n    transform: translate3d(20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0) scaleX(2);\n    transform: translate3d(-2000px, 0, 0) scaleX(2);\n  }\n}\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0) scaleX(0.9);\n    transform: translate3d(20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0) scaleX(2);\n    transform: translate3d(-2000px, 0, 0) scaleX(2);\n  }\n}\n.animate__bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft;\n}\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0) scaleX(0.9);\n    transform: translate3d(-20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0) scaleX(2);\n    transform: translate3d(2000px, 0, 0) scaleX(2);\n  }\n}\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0) scaleX(0.9);\n    transform: translate3d(-20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0) scaleX(2);\n    transform: translate3d(2000px, 0, 0) scaleX(2);\n  }\n}\n.animate__bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight;\n}\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.985);\n    transform: translate3d(0, -10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0) scaleY(0.9);\n    transform: translate3d(0, 20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0) scaleY(3);\n    transform: translate3d(0, -2000px, 0) scaleY(3);\n  }\n}\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0) scaleY(0.985);\n    transform: translate3d(0, -10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0) scaleY(0.9);\n    transform: translate3d(0, 20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0) scaleY(3);\n    transform: translate3d(0, -2000px, 0) scaleY(3);\n  }\n}\n.animate__bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp;\n}\n/* Fading entrances  */\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}\n.animate__fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown;\n}\n@-webkit-keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig;\n}\n@-webkit-keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft;\n}\n@-webkit-keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig;\n}\n@-webkit-keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight;\n}\n@-webkit-keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig;\n}\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp;\n}\n@-webkit-keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig;\n}\n@-webkit-keyframes fadeInTopLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, -100%, 0);\n    transform: translate3d(-100%, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInTopLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, -100%, 0);\n    transform: translate3d(-100%, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInTopLeft {\n  -webkit-animation-name: fadeInTopLeft;\n  animation-name: fadeInTopLeft;\n}\n@-webkit-keyframes fadeInTopRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, -100%, 0);\n    transform: translate3d(100%, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInTopRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, -100%, 0);\n    transform: translate3d(100%, -100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInTopRight {\n  -webkit-animation-name: fadeInTopRight;\n  animation-name: fadeInTopRight;\n}\n@-webkit-keyframes fadeInBottomLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 100%, 0);\n    transform: translate3d(-100%, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInBottomLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 100%, 0);\n    transform: translate3d(-100%, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInBottomLeft {\n  -webkit-animation-name: fadeInBottomLeft;\n  animation-name: fadeInBottomLeft;\n}\n@-webkit-keyframes fadeInBottomRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 100%, 0);\n    transform: translate3d(100%, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fadeInBottomRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 100%, 0);\n    transform: translate3d(100%, 100%, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__fadeInBottomRight {\n  -webkit-animation-name: fadeInBottomRight;\n  animation-name: fadeInBottomRight;\n}\n/* Fading exits */\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n.animate__fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut;\n}\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@keyframes fadeOutDown {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n.animate__fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown;\n}\n@-webkit-keyframes fadeOutDownBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n.animate__fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig;\n}\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n.animate__fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft;\n}\n@-webkit-keyframes fadeOutLeftBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n.animate__fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig;\n}\n@-webkit-keyframes fadeOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@keyframes fadeOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n.animate__fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight;\n}\n@-webkit-keyframes fadeOutRightBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n.animate__fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig;\n}\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@keyframes fadeOutUp {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n.animate__fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp;\n}\n@-webkit-keyframes fadeOutUpBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n.animate__fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig;\n}\n@-webkit-keyframes fadeOutTopLeft {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, -100%, 0);\n    transform: translate3d(-100%, -100%, 0);\n  }\n}\n@keyframes fadeOutTopLeft {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, -100%, 0);\n    transform: translate3d(-100%, -100%, 0);\n  }\n}\n.animate__fadeOutTopLeft {\n  -webkit-animation-name: fadeOutTopLeft;\n  animation-name: fadeOutTopLeft;\n}\n@-webkit-keyframes fadeOutTopRight {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, -100%, 0);\n    transform: translate3d(100%, -100%, 0);\n  }\n}\n@keyframes fadeOutTopRight {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, -100%, 0);\n    transform: translate3d(100%, -100%, 0);\n  }\n}\n.animate__fadeOutTopRight {\n  -webkit-animation-name: fadeOutTopRight;\n  animation-name: fadeOutTopRight;\n}\n@-webkit-keyframes fadeOutBottomRight {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 100%, 0);\n    transform: translate3d(100%, 100%, 0);\n  }\n}\n@keyframes fadeOutBottomRight {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 100%, 0);\n    transform: translate3d(100%, 100%, 0);\n  }\n}\n.animate__fadeOutBottomRight {\n  -webkit-animation-name: fadeOutBottomRight;\n  animation-name: fadeOutBottomRight;\n}\n@-webkit-keyframes fadeOutBottomLeft {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 100%, 0);\n    transform: translate3d(-100%, 100%, 0);\n  }\n}\n@keyframes fadeOutBottomLeft {\n  from {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 100%, 0);\n    transform: translate3d(-100%, 100%, 0);\n  }\n}\n.animate__fadeOutBottomLeft {\n  -webkit-animation-name: fadeOutBottomLeft;\n  animation-name: fadeOutBottomLeft;\n}\n/* Flippers */\n@-webkit-keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n@keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n.animate__animated.animate__flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip;\n}\n@-webkit-keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n@keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n.animate__flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX;\n}\n@-webkit-keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n@keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n}\n.animate__flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY;\n}\n@-webkit-keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n@keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n.animate__flipOutX {\n  -webkit-animation-duration: calc(1s * 0.75);\n  animation-duration: calc(1s * 0.75);\n  -webkit-animation-duration: calc(var(--animate-duration) * 0.75);\n  animation-duration: calc(var(--animate-duration) * 0.75);\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n}\n@-webkit-keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n@keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n  }\n\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n}\n.animate__flipOutY {\n  -webkit-animation-duration: calc(1s * 0.75);\n  animation-duration: calc(1s * 0.75);\n  -webkit-animation-duration: calc(var(--animate-duration) * 0.75);\n  animation-duration: calc(var(--animate-duration) * 0.75);\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY;\n}\n/* Lightspeed */\n@-webkit-keyframes lightSpeedInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes lightSpeedInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__lightSpeedInRight {\n  -webkit-animation-name: lightSpeedInRight;\n  animation-name: lightSpeedInRight;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n@-webkit-keyframes lightSpeedInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0) skewX(30deg);\n    transform: translate3d(-100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(-20deg);\n    transform: skewX(-20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(5deg);\n    transform: skewX(5deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes lightSpeedInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0) skewX(30deg);\n    transform: translate3d(-100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: skewX(-20deg);\n    transform: skewX(-20deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: skewX(5deg);\n    transform: skewX(5deg);\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__lightSpeedInLeft {\n  -webkit-animation-name: lightSpeedInLeft;\n  animation-name: lightSpeedInLeft;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n@-webkit-keyframes lightSpeedOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n@keyframes lightSpeedOutRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0;\n  }\n}\n.animate__lightSpeedOutRight {\n  -webkit-animation-name: lightSpeedOutRight;\n  animation-name: lightSpeedOutRight;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in;\n}\n@-webkit-keyframes lightSpeedOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(-100%, 0, 0) skewX(-30deg);\n    transform: translate3d(-100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n}\n@keyframes lightSpeedOutLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(-100%, 0, 0) skewX(-30deg);\n    transform: translate3d(-100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }\n}\n.animate__lightSpeedOutLeft {\n  -webkit-animation-name: lightSpeedOutLeft;\n  animation-name: lightSpeedOutLeft;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in;\n}\n/* Rotating entrances */\n@-webkit-keyframes rotateIn {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes rotateIn {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n.animate__rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn;\n  -webkit-transform-origin: center;\n  transform-origin: center;\n}\n@-webkit-keyframes rotateInDownLeft {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes rotateInDownLeft {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n.animate__rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft;\n  -webkit-transform-origin: left bottom;\n  transform-origin: left bottom;\n}\n@-webkit-keyframes rotateInDownRight {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes rotateInDownRight {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n.animate__rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight;\n  -webkit-transform-origin: right bottom;\n  transform-origin: right bottom;\n}\n@-webkit-keyframes rotateInUpLeft {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes rotateInUpLeft {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n.animate__rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft;\n  -webkit-transform-origin: left bottom;\n  transform-origin: left bottom;\n}\n@-webkit-keyframes rotateInUpRight {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n@keyframes rotateInUpRight {\n  from {\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n}\n.animate__rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight;\n  -webkit-transform-origin: right bottom;\n  transform-origin: right bottom;\n}\n/* Rotating exits */\n@-webkit-keyframes rotateOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n}\n.animate__rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut;\n  -webkit-transform-origin: center;\n  transform-origin: center;\n}\n@-webkit-keyframes rotateOutDownLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateOutDownLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n}\n.animate__rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft;\n  -webkit-transform-origin: left bottom;\n  transform-origin: left bottom;\n}\n@-webkit-keyframes rotateOutDownRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateOutDownRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n.animate__rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight;\n  -webkit-transform-origin: right bottom;\n  transform-origin: right bottom;\n}\n@-webkit-keyframes rotateOutUpLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateOutUpLeft {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n}\n.animate__rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft;\n  -webkit-transform-origin: left bottom;\n  transform-origin: left bottom;\n}\n@-webkit-keyframes rotateOutUpRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n@keyframes rotateOutUpRight {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n}\n.animate__rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight;\n  -webkit-transform-origin: right bottom;\n  transform-origin: right bottom;\n}\n/* Specials */\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%,\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%,\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n@keyframes hinge {\n  0% {\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%,\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40%,\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n}\n.animate__hinge {\n  -webkit-animation-duration: calc(1s * 2);\n  animation-duration: calc(1s * 2);\n  -webkit-animation-duration: calc(var(--animate-duration) * 2);\n  animation-duration: calc(var(--animate-duration) * 2);\n  -webkit-animation-name: hinge;\n  animation-name: hinge;\n  -webkit-transform-origin: top left;\n  transform-origin: top left;\n}\n@-webkit-keyframes jackInTheBox {\n  from {\n    opacity: 0;\n    -webkit-transform: scale(0.1) rotate(30deg);\n    transform: scale(0.1) rotate(30deg);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n  }\n\n  50% {\n    -webkit-transform: rotate(-10deg);\n    transform: rotate(-10deg);\n  }\n\n  70% {\n    -webkit-transform: rotate(3deg);\n    transform: rotate(3deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n@keyframes jackInTheBox {\n  from {\n    opacity: 0;\n    -webkit-transform: scale(0.1) rotate(30deg);\n    transform: scale(0.1) rotate(30deg);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n  }\n\n  50% {\n    -webkit-transform: rotate(-10deg);\n    transform: rotate(-10deg);\n  }\n\n  70% {\n    -webkit-transform: rotate(3deg);\n    transform: rotate(3deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n.animate__jackInTheBox {\n  -webkit-animation-name: jackInTheBox;\n  animation-name: jackInTheBox;\n}\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn;\n}\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n@keyframes rollOut {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n}\n.animate__rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut;\n}\n/* Zooming entrances */\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n.animate__zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn;\n}\n@-webkit-keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown;\n}\n@-webkit-keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft;\n}\n@-webkit-keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight;\n}\n@-webkit-keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp;\n}\n/* Zooming exits */\n@-webkit-keyframes zoomOut {\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n@keyframes zoomOut {\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  to {\n    opacity: 0;\n  }\n}\n.animate__zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut;\n}\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom;\n}\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n  }\n}\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n  }\n}\n.animate__zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft;\n  -webkit-transform-origin: left center;\n  transform-origin: left center;\n}\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n  }\n}\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n  }\n}\n.animate__zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight;\n  -webkit-transform-origin: right center;\n  transform-origin: right center;\n}\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n}\n.animate__zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom;\n}\n/* Sliding entrances */\n@-webkit-keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown;\n}\n@-webkit-keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft;\n}\n@-webkit-keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight;\n}\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n.animate__slideInUp {\n  -webkit-animation-name: slideInUp;\n  animation-name: slideInUp;\n}\n/* Sliding exits */\n@-webkit-keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n@keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n  }\n}\n.animate__slideOutDown {\n  -webkit-animation-name: slideOutDown;\n  animation-name: slideOutDown;\n}\n@-webkit-keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n.animate__slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft;\n}\n@-webkit-keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n@keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n.animate__slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight;\n}\n@-webkit-keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n@keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n  }\n}\n.animate__slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 4417:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ 1601:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 6898:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5072);
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_animate_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1491);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_animate_css__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, options);



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_animate_css__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.locals || {});

/***/ }),

/***/ 5072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 7734:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   qY: () => (/* binding */ Me),
/* harmony export */   wV: () => (/* binding */ Pd)
/* harmony export */ });
/* unused harmony exports TRACE, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TrainingSession, default, env, registerBackend */
/*!
 * ONNX Runtime Web v1.18.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var vd=Object.create;var Pn=Object.defineProperty;var _d=Object.getOwnPropertyDescriptor;var Od=Object.getOwnPropertyNames;var Id=Object.getPrototypeOf,Sd=Object.prototype.hasOwnProperty;var L=(a,t)=>()=>(a&&(t=a(a=0)),t);var me=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports),Sr=(a,t)=>{for(var o in t)Pn(a,o,{get:t[o],enumerable:!0})},Va=(a,t,o,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Od(t))!Sd.call(a,r)&&r!==o&&Pn(a,r,{get:()=>t[r],enumerable:!(e=_d(t,r))||e.enumerable});return a};var Ar=(a,t,o)=>(o=a!=null?vd(Id(a)):{},Va(t||!a||!a.__esModule?Pn(o,"default",{value:a,enumerable:!0}):o,a)),ar=a=>Va(Pn({},"__esModule",{value:!0}),a);var En,sr,Pr,Ad,Dn,Ln=L(()=>{"use strict";En=new Map,sr=[],Pr=(a,t,o)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let e=En.get(a);if(e===void 0)En.set(a,{backend:t,priority:o});else{if(e.priority>o)return;if(e.priority===o&&e.backend!==t)throw new Error(`cannot register backend "${a}" using priority ${o}`)}if(o>=0){let r=sr.indexOf(a);r!==-1&&sr.splice(r,1);for(let n=0;n<sr.length;n++)if(En.get(sr[n]).priority<=o){sr.splice(n,0,a);return}sr.push(a)}return}throw new TypeError("not a valid backend")},Ad=async a=>{let t=En.get(a);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let o=!!t.initPromise;try{return o||(t.initPromise=t.backend.init(a)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return o||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Dn=async a=>{let t=a.executionProviders||[],o=t.map(u=>typeof u=="string"?u:u.name),e=o.length===0?sr:o,r,n=[],s=new Set;for(let u of e){let l=await Ad(u);typeof l=="string"?n.push({name:u,err:l}):(r||(r=l),r===l&&s.add(u))}if(!r)throw new Error(`no available backend found. ERR: ${n.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of n)o.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let i=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[r,new Proxy(a,{get:(u,l)=>l==="executionProviders"?i:Reflect.get(u,l)})]}});var Wa=L(()=>{"use strict";Ln()});var Ha,qa=L(()=>{"use strict";Ha="1.18.0"});var ja,ut,Vo=L(()=>{"use strict";qa();ja="warning",ut={wasm:{},webgl:{},webgpu:{},versions:{common:Ha},set logLevel(a){if(a!==void 0){if(typeof a!="string"||["verbose","info","warning","error","fatal"].indexOf(a)===-1)throw new Error(`Unsupported logging level: ${a}`);ja=a}},get logLevel(){return ja}};Object.defineProperty(ut,"logLevel",{enumerable:!0})});var Z,Ya=L(()=>{"use strict";Vo();Z=ut});var Xa,Ka,Ja=L(()=>{"use strict";Xa=(a,t)=>{let o=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);o.width=a.dims[3],o.height=a.dims[2];let e=o.getContext("2d");if(e!=null){let r,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=a.dims[2],n=a.dims[3]):(r=a.dims[3],n=a.dims[2]);let s=t?.format!==void 0?t.format:"RGB",i=t?.norm,u,l;i===void 0||i.mean===void 0?u=[255,255,255,255]:typeof i.mean=="number"?u=[i.mean,i.mean,i.mean,i.mean]:(u=[i.mean[0],i.mean[1],i.mean[2],0],i.mean[3]!==void 0&&(u[3]=i.mean[3])),i===void 0||i.bias===void 0?l=[0,0,0,0]:typeof i.bias=="number"?l=[i.bias,i.bias,i.bias,i.bias]:(l=[i.bias[0],i.bias[1],i.bias[2],0],i.bias[3]!==void 0&&(l[3]=i.bias[3]));let c=n*r,p=0,d=c,T=c*2,w=-1;s==="RGBA"?(p=0,d=c,T=c*2,w=c*3):s==="RGB"?(p=0,d=c,T=c*2):s==="RBG"&&(p=0,T=c,d=c*2);for(let v=0;v<n;v++)for(let S=0;S<r;S++){let A=(a.data[p++]-l[0])*u[0],C=(a.data[d++]-l[1])*u[1],F=(a.data[T++]-l[2])*u[2],J=w===-1?255:(a.data[w++]-l[3])*u[3];e.fillStyle="rgba("+A+","+C+","+F+","+J+")",e.fillRect(S,v,1,1)}if("toDataURL"in o)return o.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Ka=(a,t)=>{let o=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),e;if(o!=null){let r,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(r=a.dims[2],n=a.dims[1],s=a.dims[3]):(r=a.dims[3],n=a.dims[2],s=a.dims[1]);let i=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let p=n*r;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let d=4,T=0,w=1,v=2,S=3,A=0,C=p,F=p*2,J=-1;i==="RGBA"?(A=0,C=p,F=p*2,J=p*3):i==="RGB"?(A=0,C=p,F=p*2):i==="RBG"&&(A=0,F=p,C=p*2),e=o.createImageData(r,n);for(let j=0;j<n*r;T+=d,w+=d,v+=d,S+=d,j++)e.data[T]=(a.data[A++]-c[0])*l[0],e.data[w]=(a.data[C++]-c[1])*l[1],e.data[v]=(a.data[F++]-c[2])*l[2],e.data[S]=J===-1?255:(a.data[J++]-c[3])*l[3]}else throw new Error("Can not access image data");return e}});var Wo,Za,Qa,es,ts,rs=L(()=>{"use strict";Cn();Wo=(a,t)=>{if(a===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:o,width:e}=t,r=t.norm??{mean:255,bias:0},n,s;typeof r.mean=="number"?n=[r.mean,r.mean,r.mean,r.mean]:n=[r.mean[0],r.mean[1],r.mean[2],r.mean[3]??255],typeof r.bias=="number"?s=[r.bias,r.bias,r.bias,r.bias]:s=[r.bias[0],r.bias[1],r.bias[2],r.bias[3]??0];let i=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=o*e,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,d=0,T=1,w=2,v=3,S=0,A=l,C=l*2,F=-1;i==="RGB"&&(p=3,d=0,T=1,w=2,v=-1),u==="RGBA"?F=l*3:u==="RBG"?(S=0,C=l,A=l*2):u==="BGR"&&(C=0,A=l,S=l*2);for(let j=0;j<l;j++,d+=p,w+=p,T+=p,v+=p)c[S++]=(a[d]+s[0])/n[0],c[A++]=(a[T]+s[1])/n[1],c[C++]=(a[w]+s[2])/n[2],F!==-1&&v!==-1&&(c[F++]=(a[v]+s[3])/n[3]);return u==="RGBA"?new Je("float32",c,[1,4,o,e]):new Je("float32",c,[1,3,o,e])},Za=async(a,t)=>{let o=typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement,e=typeof ImageData<"u"&&a instanceof ImageData,r=typeof ImageBitmap<"u"&&a instanceof ImageBitmap,n=typeof a=="string",s,i=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(o){let c=u();c.width=a.width,c.height=a.height;let p=l(c);if(p!=null){let d=a.height,T=a.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(d=t.resizedHeight,T=t.resizedWidth),t!==void 0){if(i=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");i.tensorFormat="RGBA",i.height=d,i.width=T}else i.tensorFormat="RGBA",i.height=d,i.width=T;p.drawImage(a,0,0),s=p.getImageData(0,0,T,d).data}else throw new Error("Can not access image data")}else if(e){let c,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,p=t.resizedWidth):(c=a.height,p=a.width),t!==void 0&&(i=t),i.format="RGBA",i.height=c,i.width=p,t!==void 0){let d=u();d.width=p,d.height=c;let T=l(d);if(T!=null)T.putImageData(a,0,0),s=T.getImageData(0,0,p,c).data;else throw new Error("Can not access image data")}else s=a.data}else if(r){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=a.width,c.height=a.height;let p=l(c);if(p!=null){let d=a.height,T=a.width;return p.drawImage(a,0,0,T,d),s=p.getImageData(0,0,T,d).data,i.height=d,i.width=T,Wo(s,i)}else throw new Error("Can not access image data")}else{if(n)return new Promise((c,p)=>{let d=u(),T=l(d);if(!a||!T)return p();let w=new Image;w.crossOrigin="Anonymous",w.src=a,w.onload=()=>{d.width=w.width,d.height=w.height,T.drawImage(w,0,0,d.width,d.height);let v=T.getImageData(0,0,d.width,d.height);i.height=d.height,i.width=d.width,c(Wo(v.data,i))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Wo(s,i);throw new Error("Input data provided is not supported - aborted tensor creation")},Qa=(a,t)=>{let{width:o,height:e,download:r,dispose:n}=t,s=[1,e,o,4];return new Je({location:"texture",type:"float32",texture:a,dims:s,download:r,dispose:n})},es=(a,t)=>{let{dataType:o,dims:e,download:r,dispose:n}=t;return new Je({location:"gpu-buffer",type:o??"float32",gpuBuffer:a,dims:e,download:r,dispose:n})},ts=(a,t,o)=>new Je({location:"cpu-pinned",type:a,data:t,dims:o??[t.length]})});var ur,Qr,ns,os,is=L(()=>{"use strict";ur=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),Qr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ns=!1,os=()=>{if(!ns){ns=!0;let a=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,o=typeof Float16Array<"u"&&Float16Array.from;a&&(ur.set("int64",BigInt64Array),Qr.set(BigInt64Array,"int64")),t&&(ur.set("uint64",BigUint64Array),Qr.set(BigUint64Array,"uint64")),o?(ur.set("float16",Float16Array),Qr.set(Float16Array,"float16")):ur.set("float16",Uint16Array)}}});var as,ss,us=L(()=>{"use strict";Cn();as=a=>{let t=1;for(let o=0;o<a.length;o++){let e=a[o];if(typeof e!="number"||!Number.isSafeInteger(e))throw new TypeError(`dims[${o}] must be an integer, got: ${e}`);if(e<0)throw new RangeError(`dims[${o}] must be a non-negative integer, got: ${e}`);t*=e}return t},ss=(a,t)=>{switch(a.location){case"cpu":return new Je(a.type,a.data,t);case"cpu-pinned":return new Je({location:"cpu-pinned",data:a.data,type:a.type,dims:t});case"texture":return new Je({location:"texture",texture:a.texture,type:a.type,dims:t});case"gpu-buffer":return new Je({location:"gpu-buffer",gpuBuffer:a.gpuBuffer,type:a.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${a.location} is not supported`)}}});var Je,Cn=L(()=>{"use strict";Ja();rs();is();us();Je=class{constructor(t,o,e){os();let r,n;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,r=t.type,n=t.dims,t.location){case"cpu-pinned":{let i=ur.get(r);if(!i)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(t.data instanceof i))throw new TypeError(`buffer should be of type ${i.name}`);this.cpuData=t.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let i,u;if(typeof t=="string")if(r=t,u=e,t==="string"){if(!Array.isArray(o))throw new TypeError("A string tensor's data must be a string array.");i=o}else{let l=ur.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(o)){if(t==="float16"&&l===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");t==="uint64"||t==="int64"?i=l.from(o,BigInt):i=l.from(o)}else if(o instanceof l)i=o;else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(u=o,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")r="string",i=t;else if(l==="boolean")r="bool",i=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=Qr.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);r=l,i=t}if(u===void 0)u=[i.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=i,this.dataLocation="cpu"}let s=as(n);if(this.cpuData&&s!==this.cpuData.length)throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=n,this.size=s}static async fromImage(t,o){return Za(t,o)}static fromTexture(t,o){return Qa(t,o)}static fromGpuBuffer(t,o){return es(t,o)}static fromPinnedBuffer(t,o,e){return ts(t,o,e)}toDataURL(t){return Xa(this,t)}toImageData(t){return Ka(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let o=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=o,t&&this.disposer&&(this.disposer(),this.disposer=void 0),o}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ss(this,t)}}});var Me,Fn=L(()=>{"use strict";Cn();Me=Je});var ls,fs,lr,fr,Ho=L(()=>{"use strict";Vo();ls=(a,t)=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||console.timeStamp(`${a}::ORT::${t}`)},fs=(a,t)=>{let o=new Error().stack?.split(/\r\n|\r|\n/g)||[],e=!1;for(let r=0;r<o.length;r++){if(e&&!o[r].includes("TRACE_FUNC")){let n=`FUNC_${a}::${o[r].trim().split(" ")[1]}`;t&&(n+=`::${t}`),ls("CPU",n);return}o[r].includes("TRACE_FUNC")&&(e=!0)}},lr=a=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||fs("BEGIN",a)},fr=a=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||fs("END",a)}});var $n,cs=L(()=>{"use strict";Ln();Fn();Ho();$n=class a{constructor(t){this.handler=t}async run(t,o,e){lr();let r={},n={};if(typeof t!="object"||t===null||t instanceof Me||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Me)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);r[l]=null}if(typeof e=="object"&&e!==null)n=e;else if(typeof e<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(o);for(let p of this.outputNames)if(c.indexOf(p)!==-1){let d=o[p];(d===null||d instanceof Me)&&(l=!0,s=!1,r[p]=d)}if(l){if(typeof e=="object"&&e!==null)n=e;else if(typeof e<"u")throw new TypeError("'options' must be an object.")}else n=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)r[l]=null;let i=await this.handler.run(t,r,n),u={};for(let l in i)if(Object.hasOwnProperty.call(i,l)){let c=i[l];c instanceof Me?u[l]=c:u[l]=new Me(c.type,c.data,c.dims)}return fr(),u}async release(){return this.handler.dispose()}static async create(t,o,e,r){lr();let n,s={};if(typeof t=="string"){if(n=t,typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,p=0,d=t.byteLength;if(typeof o=="object"&&o!==null)s=o;else if(typeof o=="number"){if(p=o,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(d=t.byteLength-p,typeof e=="number"){if(d=e,!Number.isSafeInteger(d))throw new RangeError("'byteLength' must be an integer.");if(d<=0||p+d>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-p}].`);if(typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(typeof e<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof o<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(c,p,d)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[i,u]=await Dn(s),l=await i.createInferenceSessionHandler(n,u);return fr(),new a(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Pd,ps=L(()=>{"use strict";cs();Pd=$n});var ds=L(()=>{"use strict"});var hs=L(()=>{"use strict"});var ms=L(()=>{"use strict"});var bs=L(()=>{"use strict"});var Ed,kn,gs=L(()=>{"use strict";Ln();Fn();Ed="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",kn=class a{constructor(t,o,e){this.handler=t,this.hasOptimizerModel=o,this.hasEvalModel=e}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,o){let e=t.evalModel||"",r=t.optimizerModel||"",n=o||{},[s,i]=await Dn(n);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,e,r,i);return new a(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Ed)}typeNarrowingForRunStep(t,o,e,r,n){let s={},i={};if(typeof e!="object"||e===null||e instanceof Me||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Me)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(o.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let p of o)if(c.indexOf(p)!==-1){let d=r[p];(d===null||d instanceof Me)&&(l=!0,u=!1,s[p]=d)}if(l){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of t)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of o)s[l]=null;return[s,i]}convertHandlerReturnTypeToMapOfTensors(t){let o={};for(let e in t)if(Object.hasOwnProperty.call(t,e)){let r=t[e];r instanceof Me?o[e]=r:o[e]=new Me(r.type,r.data,r.dims)}return o}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,o,e){let[r,n]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,o,e),s=await this.handler.runTrainStep(t,r,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,o,e){if(this.hasEvalModel){let[r,n]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,o,e),s=await this.handler.runEvalStep(t,r,n);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,o=!0){let e=await this.getParametersSize(o);if(t.length!==4*e)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,o)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Dd,ys=L(()=>{"use strict";gs();Dd=kn});var qo={};Sr(qo,{InferenceSession:()=>Pd,TRACE:()=>ls,TRACE_FUNC_BEGIN:()=>lr,TRACE_FUNC_END:()=>fr,Tensor:()=>Me,TrainingSession:()=>Dd,env:()=>Z,registerBackend:()=>Pr});var Ot=L(()=>{"use strict";Wa();Ya();ps();Fn();ds();hs();Ho();ms();bs();ys()});function Xt(a,t,o,e){if(t===void 0)return Cd(a);if(o===void 0)Bn(a,t,1);else if(typeof o=="number"&&e===void 0)Bn(a,t,o);else if(typeof o=="string"&&e===void 0)Bn(a,o,1,t);else if(typeof o=="string"&&typeof e=="number")Bn(a,o,e,t);else throw new TypeError("input is valid")}function Cd(a){return{verbose:Xt.verbose.bind(null,a),info:Xt.info.bind(null,a),warning:Xt.warning.bind(null,a),error:Xt.error.bind(null,a),fatal:Xt.fatal.bind(null,a)}}function Bn(a,t,o,e){let r=en[e||""]||en[""];xs[a]<xs[r.minimalSeverity]||(r.logDateTime&&(t=`${new Date().toISOString()}|${t}`),r.logSourceLocation,Ld[r.provider].log(a,t,e))}var jo,Yo,xs,Ld,ws,en,ce,Rn,Mn,Gn,Nn,lt=L(()=>{"use strict";jo=class{log(t,o,e){}},Yo=class{log(t,o,e){console.log(`${this.color(t)} ${e?"\x1B[35m"+e+"\x1B[0m ":""}${o}`)}color(t){switch(t){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${t}`)}}},xs={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},Ld={none:new jo,console:new Yo},ws={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},en={"":ws};(u=>{function a(l,c){u("verbose",l,c)}u.verbose=a;function t(l,c){u("info",l,c)}u.info=t;function o(l,c){u("warning",l,c)}u.warning=o;function e(l,c){u("error",l,c)}u.error=e;function r(l,c){u("fatal",l,c)}u.fatal=r;function n(l){en={},s("",l||{})}u.reset=n;function s(l,c){if(l==="*")n(c);else{let p=en[l]||ws;en[l]={provider:c.provider||p.provider,minimalSeverity:c.minimalSeverity||p.minimalSeverity,logDateTime:c.logDateTime===void 0?p.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?p.logSourceLocation:c.logSourceLocation}}}u.set=s;function i(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),s("",c)}u.setWithEnv=i})(Xt||={});ce=Xt,Rn=class{constructor(t,o,e,r,n,s){this.category=t;this.name=o;this.startTime=e;this.endCallback=r;this.timer=n;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},Mn=class{constructor(t,o,e,r){this.category=t;this.name=o;this.startTime=e;this.endTime=r}},Gn=class{constructor(t,o,e){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=t===void 0?1e4:t,this._flushBatchSize=o===void 0?10:o,this._flushIntervalInMilliseconds=e===void 0?5e3:e}static create(t){return t===void 0?new this:new this(t.maxNumberEvents,t.flushBatchSize,t.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=Nn(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(t,o,e,r){let n=this._started?this.begin(t,o,r):void 0,s=!1,i=e();if(i&&typeof i.then=="function")return s=!0,new Promise((u,l)=>{i.then(async c=>{n&&await n.end(),u(c)},async c=>{n&&await n.end(),l(c)})});if(!s&&n){let u=n.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(i)},p=>{c(p)})})}return i}begin(t,o,e){if(!this._started)throw new Error("profiler is not started yet");if(e===void 0){let r=Nn();return this.flush(r),new Rn(t,o,r,n=>this.endSync(n))}else{let r=e.beginTimer();return new Rn(t,o,0,async n=>this.end(n),r,e)}}async end(t){let o=await t.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Mn(t.category,t.name,t.startTime,o)),this.flush(o))}endSync(t){let o=Nn();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new Mn(t.category,t.name,t.startTime,o)),this.flush(o))}logOneEvent(t){ce.verbose(`Profiler.${t.category}`,`${(t.endTime-t.startTime).toFixed(2)}ms on event '${t.name}' at ${t.endTime.toFixed(2)}`)}flush(t){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||t-this._flushTime>=this._flushIntervalInMilliseconds){for(let o=this._flushPointer;this._flushPointer<o+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=Nn()}}get started(){return this._started}},Nn=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function vs(a,t,o){for(let e of o){let r=e[0],n=e[1],s=e[2],i=e[3],u=e[4];if(a.opType===r){for(let l of t)if((l.domain===n||l.domain==="ai.onnx"&&n==="")&&Fd(l.version,s))return{opImpl:i,opInit:u}}}throw new TypeError(`cannot resolve operator '${a.opType}' with opsets: ${t.map(e=>`${e.domain||"ai.onnx"} v${e.version}`).join(", ")}`)}function Fd(a,t){if(t.endsWith("+")){let o=Number.parseInt(t.substring(0,t.length-1),10);return!isNaN(o)&&o<=a}else if(t.split("-").length===2){let o=t.split("-"),e=Number.parseInt(o[0],10),r=Number.parseInt(o[1],10);return!isNaN(e)&&!isNaN(r)&&e<=a&&a<=r}else return Number.parseInt(t,10)===a}var _s=L(()=>{"use strict"});var Os=me(Xo=>{"use strict";Xo.__esModule=!0;var $d=function(){function a(t){if(!t)throw new TypeError("Invalid argument; `value` has no value.");this.value=a.EMPTY,t&&a.isGuid(t)&&(this.value=t)}return a.isGuid=function(t){var o=t.toString();return t&&(t instanceof a||a.validator.test(o))},a.create=function(){return new a([a.gen(2),a.gen(1),a.gen(1),a.gen(1),a.gen(3)].join("-"))},a.createEmpty=function(){return new a("emptyguid")},a.parse=function(t){return new a(t)},a.raw=function(){return[a.gen(2),a.gen(1),a.gen(1),a.gen(1),a.gen(3)].join("-")},a.gen=function(t){for(var o="",e=0;e<t;e++)o+=((1+Math.random())*65536|0).toString(16).substring(1);return o},a.prototype.equals=function(t){return a.isGuid(t)&&this.value===t.toString()},a.prototype.isEmpty=function(){return this.value===a.EMPTY},a.prototype.toString=function(){return this.value},a.prototype.toJSON=function(){return{value:this.value}},a.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),a.EMPTY="00000000-0000-0000-0000-000000000000",a}();Xo.Guid=$d});function be(a,t,o){this.low=a|0,this.high=t|0,this.unsigned=!!o}function Xe(a){return(a&&a.__isLong__)===!0}function Is(a){var t=Math.clz32(a&-a);return a?31-t:t}function cr(a,t){var o,e,r;return t?(a>>>=0,(r=0<=a&&a<256)&&(e=As[a],e)?e:(o=le(a,0,!0),r&&(As[a]=o),o)):(a|=0,(r=-128<=a&&a<128)&&(e=Ss[a],e)?e:(o=le(a,a<0?-1:0,!1),r&&(Ss[a]=o),o))}function ct(a,t){if(isNaN(a))return t?zt:It;if(t){if(a<0)return zt;if(a>=Ls)return $s}else{if(a<=-Es)return nt;if(a+1>=Es)return Fs}return a<0?ct(-a,t).neg():le(a%Dr|0,a/Dr|0,t)}function le(a,t,o){return new be(a,t,o)}function Jo(a,t,o){if(a.length===0)throw Error("empty string");if(typeof t=="number"?(o=t,t=!1):t=!!t,a==="NaN"||a==="Infinity"||a==="+Infinity"||a==="-Infinity")return t?zt:It;if(o=o||10,o<2||36<o)throw RangeError("radix");var e;if((e=a.indexOf("-"))>0)throw Error("interior hyphen");if(e===0)return Jo(a.substring(1),t,o).neg();for(var r=ct(Un(o,8)),n=It,s=0;s<a.length;s+=8){var i=Math.min(8,a.length-s),u=parseInt(a.substring(s,s+i),o);if(i<8){var l=ct(Un(o,i));n=n.mul(l).add(ct(u))}else n=n.mul(r),n=n.add(ct(u))}return n.unsigned=t,n}function St(a,t){return typeof a=="number"?ct(a,t):typeof a=="string"?Jo(a,t):le(a.low,a.high,typeof t=="boolean"?t:a.unsigned)}var ft,Ss,As,Un,Ps,kd,Dr,Ls,Es,Ds,It,zt,Er,Cs,Ko,Fs,$s,nt,B,Vt,Zo=L(()=>{ft=null;try{ft=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}be.prototype.__isLong__;Object.defineProperty(be.prototype,"__isLong__",{value:!0});be.isLong=Xe;Ss={},As={};be.fromInt=cr;be.fromNumber=ct;be.fromBits=le;Un=Math.pow;be.fromString=Jo;be.fromValue=St;Ps=65536,kd=1<<24,Dr=Ps*Ps,Ls=Dr*Dr,Es=Ls/2,Ds=cr(kd),It=cr(0);be.ZERO=It;zt=cr(0,!0);be.UZERO=zt;Er=cr(1);be.ONE=Er;Cs=cr(1,!0);be.UONE=Cs;Ko=cr(-1);be.NEG_ONE=Ko;Fs=le(-1,2147483647,!1);be.MAX_VALUE=Fs;$s=le(-1,-1,!0);be.MAX_UNSIGNED_VALUE=$s;nt=le(0,-2147483648,!1);be.MIN_VALUE=nt;B=be.prototype;B.toInt=function(){return this.unsigned?this.low>>>0:this.low};B.toNumber=function(){return this.unsigned?(this.high>>>0)*Dr+(this.low>>>0):this.high*Dr+(this.low>>>0)};B.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(nt)){var o=ct(t),e=this.div(o),r=e.mul(o).sub(this);return e.toString(t)+r.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var n=ct(Un(t,6),this.unsigned),s=this,i="";;){var u=s.div(n),l=s.sub(u.mul(n)).toInt()>>>0,c=l.toString(t);if(s=u,s.isZero())return c+i;for(;c.length<6;)c="0"+c;i=""+c+i}};B.getHighBits=function(){return this.high};B.getHighBitsUnsigned=function(){return this.high>>>0};B.getLowBits=function(){return this.low};B.getLowBitsUnsigned=function(){return this.low>>>0};B.getNumBitsAbs=function(){if(this.isNegative())return this.eq(nt)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,o=31;o>0&&!(t&1<<o);o--);return this.high!=0?o+33:o+1};B.isZero=function(){return this.high===0&&this.low===0};B.eqz=B.isZero;B.isNegative=function(){return!this.unsigned&&this.high<0};B.isPositive=function(){return this.unsigned||this.high>=0};B.isOdd=function(){return(this.low&1)===1};B.isEven=function(){return(this.low&1)===0};B.equals=function(t){return Xe(t)||(t=St(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};B.eq=B.equals;B.notEquals=function(t){return!this.eq(t)};B.neq=B.notEquals;B.ne=B.notEquals;B.lessThan=function(t){return this.comp(t)<0};B.lt=B.lessThan;B.lessThanOrEqual=function(t){return this.comp(t)<=0};B.lte=B.lessThanOrEqual;B.le=B.lessThanOrEqual;B.greaterThan=function(t){return this.comp(t)>0};B.gt=B.greaterThan;B.greaterThanOrEqual=function(t){return this.comp(t)>=0};B.gte=B.greaterThanOrEqual;B.ge=B.greaterThanOrEqual;B.compare=function(t){if(Xe(t)||(t=St(t)),this.eq(t))return 0;var o=this.isNegative(),e=t.isNegative();return o&&!e?-1:!o&&e?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};B.comp=B.compare;B.negate=function(){return!this.unsigned&&this.eq(nt)?nt:this.not().add(Er)};B.neg=B.negate;B.add=function(t){Xe(t)||(t=St(t));var o=this.high>>>16,e=this.high&65535,r=this.low>>>16,n=this.low&65535,s=t.high>>>16,i=t.high&65535,u=t.low>>>16,l=t.low&65535,c=0,p=0,d=0,T=0;return T+=n+l,d+=T>>>16,T&=65535,d+=r+u,p+=d>>>16,d&=65535,p+=e+i,c+=p>>>16,p&=65535,c+=o+s,c&=65535,le(d<<16|T,c<<16|p,this.unsigned)};B.subtract=function(t){return Xe(t)||(t=St(t)),this.add(t.neg())};B.sub=B.subtract;B.multiply=function(t){if(this.isZero())return this;if(Xe(t)||(t=St(t)),ft){var o=ft.mul(this.low,this.high,t.low,t.high);return le(o,ft.get_high(),this.unsigned)}if(t.isZero())return this.unsigned?zt:It;if(this.eq(nt))return t.isOdd()?nt:It;if(t.eq(nt))return this.isOdd()?nt:It;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(Ds)&&t.lt(Ds))return ct(this.toNumber()*t.toNumber(),this.unsigned);var e=this.high>>>16,r=this.high&65535,n=this.low>>>16,s=this.low&65535,i=t.high>>>16,u=t.high&65535,l=t.low>>>16,c=t.low&65535,p=0,d=0,T=0,w=0;return w+=s*c,T+=w>>>16,w&=65535,T+=n*c,d+=T>>>16,T&=65535,T+=s*l,d+=T>>>16,T&=65535,d+=r*c,p+=d>>>16,d&=65535,d+=n*l,p+=d>>>16,d&=65535,d+=s*u,p+=d>>>16,d&=65535,p+=e*c+r*l+n*u+s*i,p&=65535,le(T<<16|w,p<<16|d,this.unsigned)};B.mul=B.multiply;B.divide=function(t){if(Xe(t)||(t=St(t)),t.isZero())throw Error("division by zero");if(ft){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var o=(this.unsigned?ft.div_u:ft.div_s)(this.low,this.high,t.low,t.high);return le(o,ft.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?zt:It;var e,r,n;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return zt;if(t.gt(this.shru(1)))return Cs;n=zt}else{if(this.eq(nt)){if(t.eq(Er)||t.eq(Ko))return nt;if(t.eq(nt))return Er;var s=this.shr(1);return e=s.div(t).shl(1),e.eq(It)?t.isNegative()?Er:Ko:(r=this.sub(t.mul(e)),n=e.add(r.div(t)),n)}else if(t.eq(nt))return this.unsigned?zt:It;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();n=It}for(r=this;r.gte(t);){e=Math.max(1,Math.floor(r.toNumber()/t.toNumber()));for(var i=Math.ceil(Math.log(e)/Math.LN2),u=i<=48?1:Un(2,i-48),l=ct(e),c=l.mul(t);c.isNegative()||c.gt(r);)e-=u,l=ct(e,this.unsigned),c=l.mul(t);l.isZero()&&(l=Er),n=n.add(l),r=r.sub(c)}return n};B.div=B.divide;B.modulo=function(t){if(Xe(t)||(t=St(t)),ft){var o=(this.unsigned?ft.rem_u:ft.rem_s)(this.low,this.high,t.low,t.high);return le(o,ft.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};B.mod=B.modulo;B.rem=B.modulo;B.not=function(){return le(~this.low,~this.high,this.unsigned)};B.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};B.clz=B.countLeadingZeros;B.countTrailingZeros=function(){return this.low?Is(this.low):Is(this.high)+32};B.ctz=B.countTrailingZeros;B.and=function(t){return Xe(t)||(t=St(t)),le(this.low&t.low,this.high&t.high,this.unsigned)};B.or=function(t){return Xe(t)||(t=St(t)),le(this.low|t.low,this.high|t.high,this.unsigned)};B.xor=function(t){return Xe(t)||(t=St(t)),le(this.low^t.low,this.high^t.high,this.unsigned)};B.shiftLeft=function(t){return Xe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):le(0,this.low<<t-32,this.unsigned)};B.shl=B.shiftLeft;B.shiftRight=function(t){return Xe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):le(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};B.shr=B.shiftRight;B.shiftRightUnsigned=function(t){return Xe(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?le(this.low>>>t|this.high<<32-t,this.high>>>t,this.unsigned):t===32?le(this.high,0,this.unsigned):le(this.high>>>t-32,0,this.unsigned)};B.shru=B.shiftRightUnsigned;B.shr_u=B.shiftRightUnsigned;B.rotateLeft=function(t){var o;return Xe(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?le(this.high,this.low,this.unsigned):t<32?(o=32-t,le(this.low<<t|this.high>>>o,this.high<<t|this.low>>>o,this.unsigned)):(t-=32,o=32-t,le(this.high<<t|this.low>>>o,this.low<<t|this.high>>>o,this.unsigned))};B.rotl=B.rotateLeft;B.rotateRight=function(t){var o;return Xe(t)&&(t=t.toInt()),(t&=63)===0?this:t===32?le(this.high,this.low,this.unsigned):t<32?(o=32-t,le(this.high<<o|this.low>>>t,this.low<<o|this.high>>>t,this.unsigned)):(t-=32,o=32-t,le(this.low<<o|this.high>>>t,this.high<<o|this.low>>>t,this.unsigned))};B.rotr=B.rotateRight;B.toSigned=function(){return this.unsigned?le(this.low,this.high,!1):this};B.toUnsigned=function(){return this.unsigned?this:le(this.low,this.high,!0)};B.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};B.toBytesLE=function(){var t=this.high,o=this.low;return[o&255,o>>>8&255,o>>>16&255,o>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};B.toBytesBE=function(){var t=this.high,o=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,o>>>24,o>>>16&255,o>>>8&255,o&255]};be.fromBytes=function(t,o,e){return e?be.fromBytesLE(t,o):be.fromBytesBE(t,o)};be.fromBytesLE=function(t,o){return new be(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,o)};be.fromBytesBE=function(t,o){return new be(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],o)};Vt=be});var _,zn=L(()=>{_={};_.Offset;_.Table;_.SIZEOF_SHORT=2;_.SIZEOF_INT=4;_.FILE_IDENTIFIER_LENGTH=4;_.SIZE_PREFIX_LENGTH=4;_.Encoding={UTF8_BYTES:1,UTF16_STRING:2};_.int32=new Int32Array(2);_.float32=new Float32Array(_.int32.buffer);_.float64=new Float64Array(_.int32.buffer);_.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;_.Long=function(a,t){this.low=a|0,this.high=t|0};_.Long.create=function(a,t){return a==0&&t==0?_.Long.ZERO:new _.Long(a,t)};_.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};_.Long.prototype.equals=function(a){return this.low==a.low&&this.high==a.high};_.Long.ZERO=new _.Long(0,0);_.Builder=function(a){if(a)var t=a;else var t=1024;this.bb=_.ByteBuffer.allocate(t),this.space=t,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};_.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};_.Builder.prototype.forceDefaults=function(a){this.force_defaults=a};_.Builder.prototype.dataBuffer=function(){return this.bb};_.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};_.Builder.prototype.prep=function(a,t){a>this.minalign&&(this.minalign=a);for(var o=~(this.bb.capacity()-this.space+t)+1&a-1;this.space<o+a+t;){var e=this.bb.capacity();this.bb=_.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-e}this.pad(o)};_.Builder.prototype.pad=function(a){for(var t=0;t<a;t++)this.bb.writeInt8(--this.space,0)};_.Builder.prototype.writeInt8=function(a){this.bb.writeInt8(this.space-=1,a)};_.Builder.prototype.writeInt16=function(a){this.bb.writeInt16(this.space-=2,a)};_.Builder.prototype.writeInt32=function(a){this.bb.writeInt32(this.space-=4,a)};_.Builder.prototype.writeInt64=function(a){this.bb.writeInt64(this.space-=8,a)};_.Builder.prototype.writeFloat32=function(a){this.bb.writeFloat32(this.space-=4,a)};_.Builder.prototype.writeFloat64=function(a){this.bb.writeFloat64(this.space-=8,a)};_.Builder.prototype.addInt8=function(a){this.prep(1,0),this.writeInt8(a)};_.Builder.prototype.addInt16=function(a){this.prep(2,0),this.writeInt16(a)};_.Builder.prototype.addInt32=function(a){this.prep(4,0),this.writeInt32(a)};_.Builder.prototype.addInt64=function(a){this.prep(8,0),this.writeInt64(a)};_.Builder.prototype.addFloat32=function(a){this.prep(4,0),this.writeFloat32(a)};_.Builder.prototype.addFloat64=function(a){this.prep(8,0),this.writeFloat64(a)};_.Builder.prototype.addFieldInt8=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt8(t),this.slot(a))};_.Builder.prototype.addFieldInt16=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt16(t),this.slot(a))};_.Builder.prototype.addFieldInt32=function(a,t,o){(this.force_defaults||t!=o)&&(this.addInt32(t),this.slot(a))};_.Builder.prototype.addFieldInt64=function(a,t,o){(this.force_defaults||!t.equals(o))&&(this.addInt64(t),this.slot(a))};_.Builder.prototype.addFieldFloat32=function(a,t,o){(this.force_defaults||t!=o)&&(this.addFloat32(t),this.slot(a))};_.Builder.prototype.addFieldFloat64=function(a,t,o){(this.force_defaults||t!=o)&&(this.addFloat64(t),this.slot(a))};_.Builder.prototype.addFieldOffset=function(a,t,o){(this.force_defaults||t!=o)&&(this.addOffset(t),this.slot(a))};_.Builder.prototype.addFieldStruct=function(a,t,o){t!=o&&(this.nested(t),this.slot(a))};_.Builder.prototype.nested=function(a){if(a!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};_.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};_.Builder.prototype.slot=function(a){this.vtable[a]=this.offset()};_.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};_.Builder.growByteBuffer=function(a){var t=a.capacity();if(t&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var o=t<<1,e=_.ByteBuffer.allocate(o);return e.setPosition(o-t),e.bytes().set(a.bytes(),o-t),e};_.Builder.prototype.addOffset=function(a){this.prep(_.SIZEOF_INT,0),this.writeInt32(this.offset()-a+_.SIZEOF_INT)};_.Builder.prototype.startObject=function(a){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=a;for(var t=0;t<a;t++)this.vtable[t]=0;this.isNested=!0,this.object_start=this.offset()};_.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var a=this.offset(),t=this.vtable_in_use-1;t>=0&&this.vtable[t]==0;t--);for(var o=t+1;t>=0;t--)this.addInt16(this.vtable[t]!=0?a-this.vtable[t]:0);var e=2;this.addInt16(a-this.object_start);var r=(o+e)*_.SIZEOF_SHORT;this.addInt16(r);var n=0,s=this.space;e:for(t=0;t<this.vtables.length;t++){var i=this.bb.capacity()-this.vtables[t];if(r==this.bb.readInt16(i)){for(var u=_.SIZEOF_SHORT;u<r;u+=_.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(i+u))continue e;n=this.vtables[t];break}}return n?(this.space=this.bb.capacity()-a,this.bb.writeInt32(this.space,n-a)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-a,this.offset()-a)),this.isNested=!1,a};_.Builder.prototype.finish=function(a,t,o){var e=o?_.SIZE_PREFIX_LENGTH:0;if(t){var r=t;if(this.prep(this.minalign,_.SIZEOF_INT+_.FILE_IDENTIFIER_LENGTH+e),r.length!=_.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+_.FILE_IDENTIFIER_LENGTH);for(var n=_.FILE_IDENTIFIER_LENGTH-1;n>=0;n--)this.writeInt8(r.charCodeAt(n))}this.prep(this.minalign,_.SIZEOF_INT+e),this.addOffset(a),e&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};_.Builder.prototype.finishSizePrefixed=function(a,t){this.finish(a,t,!0)};_.Builder.prototype.requiredField=function(a,t){var o=this.bb.capacity()-a,e=o-this.bb.readInt32(o),r=this.bb.readInt16(e+t)!=0;if(!r)throw new Error("FlatBuffers: field "+t+" must be set")};_.Builder.prototype.startVector=function(a,t,o){this.notNested(),this.vector_num_elems=t,this.prep(_.SIZEOF_INT,a*t),this.prep(o,a*t)};_.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};_.Builder.prototype.createString=function(a){if(a instanceof Uint8Array)var t=a;else for(var t=[],o=0;o<a.length;){var e,r=a.charCodeAt(o++);if(r<55296||r>=56320)e=r;else{var n=a.charCodeAt(o++);e=(r<<10)+n+(65536-56623104-56320)}e<128?t.push(e):(e<2048?t.push(e>>6&31|192):(e<65536?t.push(e>>12&15|224):t.push(e>>18&7|240,e>>12&63|128),t.push(e>>6&63|128)),t.push(e&63|128))}this.addInt8(0),this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length);for(var o=0,s=this.space,i=this.bb.bytes();o<t.length;o++)i[s++]=t[o];return this.endVector()};_.Builder.prototype.createLong=function(a,t){return _.Long.create(a,t)};_.ByteBuffer=function(a){this.bytes_=a,this.position_=0};_.ByteBuffer.allocate=function(a){return new _.ByteBuffer(new Uint8Array(a))};_.ByteBuffer.prototype.clear=function(){this.position_=0};_.ByteBuffer.prototype.bytes=function(){return this.bytes_};_.ByteBuffer.prototype.position=function(){return this.position_};_.ByteBuffer.prototype.setPosition=function(a){this.position_=a};_.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};_.ByteBuffer.prototype.readInt8=function(a){return this.readUint8(a)<<24>>24};_.ByteBuffer.prototype.readUint8=function(a){return this.bytes_[a]};_.ByteBuffer.prototype.readInt16=function(a){return this.readUint16(a)<<16>>16};_.ByteBuffer.prototype.readUint16=function(a){return this.bytes_[a]|this.bytes_[a+1]<<8};_.ByteBuffer.prototype.readInt32=function(a){return this.bytes_[a]|this.bytes_[a+1]<<8|this.bytes_[a+2]<<16|this.bytes_[a+3]<<24};_.ByteBuffer.prototype.readUint32=function(a){return this.readInt32(a)>>>0};_.ByteBuffer.prototype.readInt64=function(a){return new _.Long(this.readInt32(a),this.readInt32(a+4))};_.ByteBuffer.prototype.readUint64=function(a){return new _.Long(this.readUint32(a),this.readUint32(a+4))};_.ByteBuffer.prototype.readFloat32=function(a){return _.int32[0]=this.readInt32(a),_.float32[0]};_.ByteBuffer.prototype.readFloat64=function(a){return _.int32[_.isLittleEndian?0:1]=this.readInt32(a),_.int32[_.isLittleEndian?1:0]=this.readInt32(a+4),_.float64[0]};_.ByteBuffer.prototype.writeInt8=function(a,t){this.bytes_[a]=t};_.ByteBuffer.prototype.writeUint8=function(a,t){this.bytes_[a]=t};_.ByteBuffer.prototype.writeInt16=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8};_.ByteBuffer.prototype.writeUint16=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8};_.ByteBuffer.prototype.writeInt32=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8,this.bytes_[a+2]=t>>16,this.bytes_[a+3]=t>>24};_.ByteBuffer.prototype.writeUint32=function(a,t){this.bytes_[a]=t,this.bytes_[a+1]=t>>8,this.bytes_[a+2]=t>>16,this.bytes_[a+3]=t>>24};_.ByteBuffer.prototype.writeInt64=function(a,t){this.writeInt32(a,t.low),this.writeInt32(a+4,t.high)};_.ByteBuffer.prototype.writeUint64=function(a,t){this.writeUint32(a,t.low),this.writeUint32(a+4,t.high)};_.ByteBuffer.prototype.writeFloat32=function(a,t){_.float32[0]=t,this.writeInt32(a,_.int32[0])};_.ByteBuffer.prototype.writeFloat64=function(a,t){_.float64[0]=t,this.writeInt32(a,_.int32[_.isLittleEndian?0:1]),this.writeInt32(a+4,_.int32[_.isLittleEndian?1:0])};_.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+_.SIZEOF_INT+_.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var a="",t=0;t<_.FILE_IDENTIFIER_LENGTH;t++)a+=String.fromCharCode(this.readInt8(this.position_+_.SIZEOF_INT+t));return a};_.ByteBuffer.prototype.__offset=function(a,t){var o=a-this.readInt32(a);return t<this.readInt16(o)?this.readInt16(o+t):0};_.ByteBuffer.prototype.__union=function(a,t){return a.bb_pos=t+this.readInt32(t),a.bb=this,a};_.ByteBuffer.prototype.__string=function(a,t){a+=this.readInt32(a);var o=this.readInt32(a),e="",r=0;if(a+=_.SIZEOF_INT,t===_.Encoding.UTF8_BYTES)return this.bytes_.subarray(a,a+o);for(;r<o;){var n,s=this.readUint8(a+r++);if(s<192)n=s;else{var i=this.readUint8(a+r++);if(s<224)n=(s&31)<<6|i&63;else{var u=this.readUint8(a+r++);if(s<240)n=(s&15)<<12|(i&63)<<6|u&63;else{var l=this.readUint8(a+r++);n=(s&7)<<18|(i&63)<<12|(u&63)<<6|l&63}}}n<65536?e+=String.fromCharCode(n):(n-=65536,e+=String.fromCharCode((n>>10)+55296,(n&1024-1)+56320))}return e};_.ByteBuffer.prototype.__indirect=function(a){return a+this.readInt32(a)};_.ByteBuffer.prototype.__vector=function(a){return a+this.readInt32(a)+_.SIZEOF_INT};_.ByteBuffer.prototype.__vector_len=function(a){return this.readInt32(a+this.readInt32(a))};_.ByteBuffer.prototype.__has_identifier=function(a){if(a.length!=_.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+_.FILE_IDENTIFIER_LENGTH);for(var t=0;t<_.FILE_IDENTIFIER_LENGTH;t++)if(a.charCodeAt(t)!=this.readInt8(this.position_+_.SIZEOF_INT+t))return!1;return!0};_.ByteBuffer.prototype.createLong=function(a,t){return _.Long.create(a,t)}});var V,tn=L(()=>{"use strict";zn();(t=>{let a;(e=>{let o;(n=>{let r;(F=>(F[F.UNDEFINED=0]="UNDEFINED",F[F.FLOAT=1]="FLOAT",F[F.INT=2]="INT",F[F.STRING=3]="STRING",F[F.TENSOR=4]="TENSOR",F[F.GRAPH=5]="GRAPH",F[F.FLOATS=6]="FLOATS",F[F.INTS=7]="INTS",F[F.STRINGS=8]="STRINGS",F[F.TENSORS=9]="TENSORS",F[F.GRAPHS=10]="GRAPHS",F[F.SPARSE_TENSOR=11]="SPARSE_TENSOR",F[F.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(r=n.AttributeType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{let r;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(r=n.DimensionValueType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{let r;(Y=>(Y[Y.UNDEFINED=0]="UNDEFINED",Y[Y.FLOAT=1]="FLOAT",Y[Y.UINT8=2]="UINT8",Y[Y.INT8=3]="INT8",Y[Y.UINT16=4]="UINT16",Y[Y.INT16=5]="INT16",Y[Y.INT32=6]="INT32",Y[Y.INT64=7]="INT64",Y[Y.STRING=8]="STRING",Y[Y.BOOL=9]="BOOL",Y[Y.FLOAT16=10]="FLOAT16",Y[Y.DOUBLE=11]="DOUBLE",Y[Y.UINT32=12]="UINT32",Y[Y.UINT64=13]="UINT64",Y[Y.COMPLEX64=14]="COMPLEX64",Y[Y.COMPLEX128=15]="COMPLEX128",Y[Y.BFLOAT16=16]="BFLOAT16",Y[Y.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",Y[Y.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",Y[Y.FLOAT8E5M2=19]="FLOAT8E5M2",Y[Y.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(r=n.TensorDataType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{let r;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(r=n.NodeType||={})})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{let r;(c=>(c[c.NONE=0]="NONE",c[c.tensor_type=1]="tensor_type",c[c.sequence_type=2]="sequence_type",c[c.map_type=3]="map_type"))(r=n.TypeInfoValue||={})})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsShape(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsShape(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}dim(i,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new t.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}dimLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}static startShape(i){i.startObject(1)}static addDim(i,u){i.addFieldOffset(0,u,0)}static createDimVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startDimVector(i,u){i.startVector(4,u,4)}static endShape(i){return i.endObject()}static createShape(i,u){return r.startShape(i),r.addDim(i,u),r.endShape(i)}}n.Shape=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsDimension(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimension(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}value(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}static startDimension(i){i.startObject(2)}static addValue(i,u){i.addFieldOffset(0,u,0)}static addDenotation(i,u){i.addFieldOffset(1,u,0)}static endDimension(i){return i.endObject()}static createDimension(i,u,l){return r.startDimension(i),r.addValue(i,u),r.addDenotation(i,l),r.endDimension(i)}}n.Dimension=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsDimensionValue(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsDimensionValue(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}dimType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt8(this.bb_pos+i):0}dimValue(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}dimParam(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}static startDimensionValue(i){i.startObject(3)}static addDimType(i,u){i.addFieldInt8(0,u,0)}static addDimValue(i,u){i.addFieldInt64(1,u,i.createLong(0,0))}static addDimParam(i,u){i.addFieldOffset(2,u,0)}static endDimensionValue(i){return i.endObject()}static createDimensionValue(i,u,l,c){return r.startDimensionValue(i),r.addDimType(i,u),r.addDimValue(i,l),r.addDimParam(i,c),r.endDimensionValue(i)}}n.DimensionValue=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTensorTypeAndShape(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTensorTypeAndShape(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}elemType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt32(this.bb_pos+i):0}shape(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(i){i.startObject(2)}static addElemType(i,u){i.addFieldInt32(0,u,0)}static addShape(i,u){i.addFieldOffset(1,u,0)}static endTensorTypeAndShape(i){return i.endObject()}static createTensorTypeAndShape(i,u,l){return r.startTensorTypeAndShape(i),r.addElemType(i,u),r.addShape(i,l),r.endTensorTypeAndShape(i)}}n.TensorTypeAndShape=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsMapType(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsMapType(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}keyType(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt32(this.bb_pos+i):0}valueType(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(i){i.startObject(2)}static addKeyType(i,u){i.addFieldInt32(0,u,0)}static addValueType(i,u){i.addFieldOffset(1,u,0)}static endMapType(i){return i.endObject()}static createMapType(i,u,l){return r.startMapType(i),r.addKeyType(i,u),r.addValueType(i,l),r.endMapType(i)}}n.MapType=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSequenceType(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSequenceType(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}elemType(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(i){i.startObject(1)}static addElemType(i,u){i.addFieldOffset(0,u,0)}static endSequenceType(i){return i.endObject()}static createSequenceType(i,u){return r.startSequenceType(i),r.addElemType(i,u),r.endSequenceType(i)}}n.SequenceType=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(i,u,l,c){return i.prep(4,12),i.writeInt32(c),i.writeInt32(l),i.writeInt32(u),i.offset()}}n.EdgeEnd=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsNodeEdge(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsNodeEdge(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}nodeIndex(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readUint32(this.bb_pos+i):0}inputEdges(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+i*12,this.bb):null}inputEdgesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}outputEdges(i,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new t.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+i*12,this.bb):null}outputEdgesLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startNodeEdge(i){i.startObject(3)}static addNodeIndex(i,u){i.addFieldInt32(0,u,0)}static addInputEdges(i,u){i.addFieldOffset(1,u,0)}static startInputEdgesVector(i,u){i.startVector(12,u,4)}static addOutputEdges(i,u){i.addFieldOffset(2,u,0)}static startOutputEdgesVector(i,u){i.startVector(12,u,4)}static endNodeEdge(i){return i.endObject()}static createNodeEdge(i,u,l,c){return r.startNodeEdge(i),r.addNodeIndex(i,u),r.addInputEdges(i,l),r.addOutputEdges(i,c),r.endNodeEdge(i)}}n.NodeEdge=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsNode(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsNode(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}domain(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}sinceVersion(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readInt32(this.bb_pos+i):0}index(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readUint32(this.bb_pos+i):0}opType(i){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,i):null}type(){let i=this.bb.__offset(this.bb_pos,16);return i?this.bb.readInt32(this.bb_pos+i):0}executionProviderType(i){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,i):null}inputs(i,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}inputsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}outputs(i,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}outputsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}attributes(i,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new t.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}attributesLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}inputArgCounts(i){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+i*4):0}inputArgCountsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}inputArgCountsArray(){let i=this.bb.__offset(this.bb_pos,26);return i?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}implicitInputs(i,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}implicitInputsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startNode(i){i.startObject(13)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addDomain(i,u){i.addFieldOffset(2,u,0)}static addSinceVersion(i,u){i.addFieldInt32(3,u,0)}static addIndex(i,u){i.addFieldInt32(4,u,0)}static addOpType(i,u){i.addFieldOffset(5,u,0)}static addType(i,u){i.addFieldInt32(6,u,0)}static addExecutionProviderType(i,u){i.addFieldOffset(7,u,0)}static addInputs(i,u){i.addFieldOffset(8,u,0)}static createInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInputsVector(i,u){i.startVector(4,u,4)}static addOutputs(i,u){i.addFieldOffset(9,u,0)}static createOutputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOutputsVector(i,u){i.startVector(4,u,4)}static addAttributes(i,u){i.addFieldOffset(10,u,0)}static createAttributesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startAttributesVector(i,u){i.startVector(4,u,4)}static addInputArgCounts(i,u){i.addFieldOffset(11,u,0)}static createInputArgCountsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addInt32(u[l]);return i.endVector()}static startInputArgCountsVector(i,u){i.startVector(4,u,4)}static addImplicitInputs(i,u){i.addFieldOffset(12,u,0)}static createImplicitInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startImplicitInputsVector(i,u){i.startVector(4,u,4)}static endNode(i){return i.endObject()}static createNode(i,u,l,c,p,d,T,w,v,S,A,C,F,J){return r.startNode(i),r.addName(i,u),r.addDocString(i,l),r.addDomain(i,c),r.addSinceVersion(i,p),r.addIndex(i,d),r.addOpType(i,T),r.addType(i,w),r.addExecutionProviderType(i,v),r.addInputs(i,S),r.addOutputs(i,A),r.addAttributes(i,C),r.addInputArgCounts(i,F),r.addImplicitInputs(i,J),r.endNode(i)}}n.Node=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsValueInfo(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsValueInfo(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}type(i){let u=this.bb.__offset(this.bb_pos,8);return u?(i||new t.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(i){i.startObject(3)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addType(i,u){i.addFieldOffset(2,u,0)}static endValueInfo(i){return i.endObject()}static createValueInfo(i,u,l,c){return r.startValueInfo(i),r.addName(i,u),r.addDocString(i,l),r.addType(i,c),r.endValueInfo(i)}}n.ValueInfo=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTypeInfo(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTypeInfo(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}denotation(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}valueType(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readUint8(this.bb_pos+i):0}value(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(i,this.bb_pos+u):null}static startTypeInfo(i){i.startObject(3)}static addDenotation(i,u){i.addFieldOffset(0,u,0)}static addValueType(i,u){i.addFieldInt8(1,u,0)}static addValue(i,u){i.addFieldOffset(2,u,0)}static endTypeInfo(i){return i.endObject()}static createTypeInfo(i,u,l,c){return r.startTypeInfo(i),r.addDenotation(i,u),r.addValueType(i,l),r.addValue(i,c),r.endTypeInfo(i)}}n.TypeInfo=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsOperatorSetId(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsOperatorSetId(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}domain(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}version(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}static startOperatorSetId(i){i.startObject(2)}static addDomain(i,u){i.addFieldOffset(0,u,0)}static addVersion(i,u){i.addFieldInt64(1,u,i.createLong(0,0))}static endOperatorSetId(i){return i.endObject()}static createOperatorSetId(i,u,l){return r.startOperatorSetId(i),r.addDomain(i,u),r.addVersion(i,l),r.endOperatorSetId(i)}}n.OperatorSetId=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsTensor(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsTensor(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}dims(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}dimsLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}dataType(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readInt32(this.bb_pos+i):0}rawData(i){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+i):0}rawDataLength(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.__vector_len(this.bb_pos+i):0}rawDataArray(){let i=this.bb.__offset(this.bb_pos,12);return i?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}stringData(i,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}stringDataLength(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__vector_len(this.bb_pos+i):0}static startTensor(i){i.startObject(6)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addDims(i,u){i.addFieldOffset(2,u,0)}static createDimsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startDimsVector(i,u){i.startVector(8,u,8)}static addDataType(i,u){i.addFieldInt32(3,u,0)}static addRawData(i,u){i.addFieldOffset(4,u,0)}static createRawDataVector(i,u){i.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)i.addInt8(u[l]);return i.endVector()}static startRawDataVector(i,u){i.startVector(1,u,1)}static addStringData(i,u){i.addFieldOffset(5,u,0)}static createStringDataVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startStringDataVector(i,u){i.startVector(4,u,4)}static endTensor(i){return i.endObject()}static createTensor(i,u,l,c,p,d,T){return r.startTensor(i),r.addName(i,u),r.addDocString(i,l),r.addDims(i,c),r.addDataType(i,p),r.addRawData(i,d),r.addStringData(i,T),r.endTensor(i)}}n.Tensor=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSparseTensor(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSparseTensor(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}values(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}dimsLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}static startSparseTensor(i){i.startObject(3)}static addValues(i,u){i.addFieldOffset(0,u,0)}static addIndices(i,u){i.addFieldOffset(1,u,0)}static addDims(i,u){i.addFieldOffset(2,u,0)}static createDimsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startDimsVector(i,u){i.startVector(8,u,8)}static endSparseTensor(i){return i.endObject()}static createSparseTensor(i,u,l,c){return r.startSparseTensor(i),r.addValues(i,u),r.addIndices(i,l),r.addDims(i,c),r.endSparseTensor(i)}}n.SparseTensor=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsAttribute(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsAttribute(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}name(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}docString(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,i):null}type(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.readInt32(this.bb_pos+i):0}f(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readFloat32(this.bb_pos+i):0}i(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}s(i){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,i):null}t(i){let u=this.bb.__offset(this.bb_pos,16);return u?(i||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(i){let u=this.bb.__offset(this.bb_pos,18);return u?(i||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(i){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+i*4):0}floatsLength(){let i=this.bb.__offset(this.bb_pos,20);return i?this.bb.__vector_len(this.bb_pos+i):0}floatsArray(){let i=this.bb.__offset(this.bb_pos,20);return i?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}ints(i){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}intsLength(){let i=this.bb.__offset(this.bb_pos,22);return i?this.bb.__vector_len(this.bb_pos+i):0}strings(i,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}stringsLength(){let i=this.bb.__offset(this.bb_pos,24);return i?this.bb.__vector_len(this.bb_pos+i):0}tensors(i,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}tensorsLength(){let i=this.bb.__offset(this.bb_pos,26);return i?this.bb.__vector_len(this.bb_pos+i):0}graphs(i,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}graphsLength(){let i=this.bb.__offset(this.bb_pos,28);return i?this.bb.__vector_len(this.bb_pos+i):0}static startAttribute(i){i.startObject(13)}static addName(i,u){i.addFieldOffset(0,u,0)}static addDocString(i,u){i.addFieldOffset(1,u,0)}static addType(i,u){i.addFieldInt32(2,u,0)}static addF(i,u){i.addFieldFloat32(3,u,0)}static addI(i,u){i.addFieldInt64(4,u,i.createLong(0,0))}static addS(i,u){i.addFieldOffset(5,u,0)}static addT(i,u){i.addFieldOffset(6,u,0)}static addG(i,u){i.addFieldOffset(7,u,0)}static addFloats(i,u){i.addFieldOffset(8,u,0)}static createFloatsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addFloat32(u[l]);return i.endVector()}static startFloatsVector(i,u){i.startVector(4,u,4)}static addInts(i,u){i.addFieldOffset(9,u,0)}static createIntsVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startIntsVector(i,u){i.startVector(8,u,8)}static addStrings(i,u){i.addFieldOffset(10,u,0)}static createStringsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startStringsVector(i,u){i.startVector(4,u,4)}static addTensors(i,u){i.addFieldOffset(11,u,0)}static createTensorsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startTensorsVector(i,u){i.startVector(4,u,4)}static addGraphs(i,u){i.addFieldOffset(12,u,0)}static createGraphsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startGraphsVector(i,u){i.startVector(4,u,4)}static endAttribute(i){return i.endObject()}static createAttribute(i,u,l,c,p,d,T,w,v,S,A,C,F,J){return r.startAttribute(i),r.addName(i,u),r.addDocString(i,l),r.addType(i,c),r.addF(i,p),r.addI(i,d),r.addS(i,T),r.addT(i,w),r.addG(i,v),r.addFloats(i,S),r.addInts(i,A),r.addStrings(i,C),r.addTensors(i,F),r.addGraphs(i,J),r.endAttribute(i)}}n.Attribute=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsGraph(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsGraph(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}initializers(i,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new t.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}initializersLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}nodeArgs(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodeArgsLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}nodes(i,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new t.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodesLength(){let i=this.bb.__offset(this.bb_pos,8);return i?this.bb.__vector_len(this.bb_pos+i):0}maxNodeIndex(){let i=this.bb.__offset(this.bb_pos,10);return i?this.bb.readUint32(this.bb_pos+i):0}nodeEdges(i,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new t.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}nodeEdgesLength(){let i=this.bb.__offset(this.bb_pos,12);return i?this.bb.__vector_len(this.bb_pos+i):0}inputs(i,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}inputsLength(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.__vector_len(this.bb_pos+i):0}outputs(i,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+i*4,u):null}outputsLength(){let i=this.bb.__offset(this.bb_pos,16);return i?this.bb.__vector_len(this.bb_pos+i):0}sparseInitializers(i,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new t.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}sparseInitializersLength(){let i=this.bb.__offset(this.bb_pos,18);return i?this.bb.__vector_len(this.bb_pos+i):0}static startGraph(i){i.startObject(8)}static addInitializers(i,u){i.addFieldOffset(0,u,0)}static createInitializersVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInitializersVector(i,u){i.startVector(4,u,4)}static addNodeArgs(i,u){i.addFieldOffset(1,u,0)}static createNodeArgsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodeArgsVector(i,u){i.startVector(4,u,4)}static addNodes(i,u){i.addFieldOffset(2,u,0)}static createNodesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodesVector(i,u){i.startVector(4,u,4)}static addMaxNodeIndex(i,u){i.addFieldInt32(3,u,0)}static addNodeEdges(i,u){i.addFieldOffset(4,u,0)}static createNodeEdgesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startNodeEdgesVector(i,u){i.startVector(4,u,4)}static addInputs(i,u){i.addFieldOffset(5,u,0)}static createInputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startInputsVector(i,u){i.startVector(4,u,4)}static addOutputs(i,u){i.addFieldOffset(6,u,0)}static createOutputsVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOutputsVector(i,u){i.startVector(4,u,4)}static addSparseInitializers(i,u){i.addFieldOffset(7,u,0)}static createSparseInitializersVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startSparseInitializersVector(i,u){i.startVector(4,u,4)}static endGraph(i){return i.endObject()}static createGraph(i,u,l,c,p,d,T,w,v){return r.startGraph(i),r.addInitializers(i,u),r.addNodeArgs(i,l),r.addNodes(i,c),r.addMaxNodeIndex(i,p),r.addNodeEdges(i,d),r.addInputs(i,T),r.addOutputs(i,w),r.addSparseInitializers(i,v),r.endGraph(i)}}n.Graph=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsModel(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsModel(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}irVersion(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}opsetImport(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}opsetImportLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}producerName(i){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,i):null}producerVersion(i){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,i):null}domain(i){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,i):null}modelVersion(){let i=this.bb.__offset(this.bb_pos,14);return i?this.bb.readInt64(this.bb_pos+i):this.bb.createLong(0,0)}docString(i){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,i):null}graph(i){let u=this.bb.__offset(this.bb_pos,18);return u?(i||new t.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(i){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,i):null}static startModel(i){i.startObject(9)}static addIrVersion(i,u){i.addFieldInt64(0,u,i.createLong(0,0))}static addOpsetImport(i,u){i.addFieldOffset(1,u,0)}static createOpsetImportVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startOpsetImportVector(i,u){i.startVector(4,u,4)}static addProducerName(i,u){i.addFieldOffset(2,u,0)}static addProducerVersion(i,u){i.addFieldOffset(3,u,0)}static addDomain(i,u){i.addFieldOffset(4,u,0)}static addModelVersion(i,u){i.addFieldInt64(5,u,i.createLong(0,0))}static addDocString(i,u){i.addFieldOffset(6,u,0)}static addGraph(i,u){i.addFieldOffset(7,u,0)}static addGraphDocString(i,u){i.addFieldOffset(8,u,0)}static endModel(i){return i.endObject()}static createModel(i,u,l,c,p,d,T,w,v,S){return r.startModel(i),r.addIrVersion(i,u),r.addOpsetImport(i,l),r.addProducerName(i,c),r.addProducerVersion(i,p),r.addDomain(i,d),r.addModelVersion(i,T),r.addDocString(i,w),r.addGraph(i,v),r.addGraphDocString(i,S),r.endModel(i)}}n.Model=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsKernelCreateInfos(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsKernelCreateInfos(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}nodeIndices(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+i*4):0}nodeIndicesLength(){let i=this.bb.__offset(this.bb_pos,4);return i?this.bb.__vector_len(this.bb_pos+i):0}nodeIndicesArray(){let i=this.bb.__offset(this.bb_pos,4);return i?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+i),this.bb.__vector_len(this.bb_pos+i)):null}kernelDefHashes(i){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+i*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startKernelCreateInfos(i){i.startObject(2)}static addNodeIndices(i,u){i.addFieldOffset(0,u,0)}static createNodeIndicesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addInt32(u[l]);return i.endVector()}static startNodeIndicesVector(i,u){i.startVector(4,u,4)}static addKernelDefHashes(i,u){i.addFieldOffset(1,u,0)}static createKernelDefHashesVector(i,u){i.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)i.addInt64(u[l]);return i.endVector()}static startKernelDefHashesVector(i,u){i.startVector(8,u,8)}static endKernelCreateInfos(i){return i.endObject()}static createKernelCreateInfos(i,u,l){return r.startKernelCreateInfos(i),r.addNodeIndices(i,u),r.addKernelDefHashes(i,l),r.endKernelCreateInfos(i)}}n.KernelCreateInfos=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSubGraphSessionState(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSubGraphSessionState(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}graphId(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}sessionState(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(i){i.startObject(2)}static addGraphId(i,u){i.addFieldOffset(0,u,0)}static addSessionState(i,u){i.addFieldOffset(1,u,0)}static endSubGraphSessionState(i){let u=i.endObject();return i.requiredField(u,4),u}static createSubGraphSessionState(i,u,l){return r.startSubGraphSessionState(i),r.addGraphId(i,u),r.addSessionState(i,l),r.endSubGraphSessionState(i)}}n.SubGraphSessionState=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsSessionState(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsSessionState(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}kernels(i){let u=this.bb.__offset(this.bb_pos,4);return u?(i||new t.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(i,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new t.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+i*4),this.bb):null}subGraphSessionStatesLength(){let i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__vector_len(this.bb_pos+i):0}static startSessionState(i){i.startObject(2)}static addKernels(i,u){i.addFieldOffset(0,u,0)}static addSubGraphSessionStates(i,u){i.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(i,u){i.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)i.addOffset(u[l]);return i.endVector()}static startSubGraphSessionStatesVector(i,u){i.startVector(4,u,4)}static endSessionState(i){return i.endObject()}static createSessionState(i,u,l){return r.startSessionState(i),r.addKernels(i,u),r.addSubGraphSessionStates(i,l),r.endSessionState(i)}}n.SessionState=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={});(t=>{let a;(e=>{let o;(n=>{class r{constructor(){this.bb=null;this.bb_pos=0}__init(i,u){return this.bb_pos=i,this.bb=u,this}static getRootAsInferenceSession(i,u){return(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static getSizePrefixedRootAsInferenceSession(i,u){return i.setPosition(i.position()+_.SIZE_PREFIX_LENGTH),(u||new r).__init(i.readInt32(i.position())+i.position(),i)}static bufferHasIdentifier(i){return i.__has_identifier("ORTM")}ortVersion(i){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,i):null}model(i){let u=this.bb.__offset(this.bb_pos,6);return u?(i||new t.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(i){let u=this.bb.__offset(this.bb_pos,8);return u?(i||new t.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(i){i.startObject(3)}static addOrtVersion(i,u){i.addFieldOffset(0,u,0)}static addModel(i,u){i.addFieldOffset(1,u,0)}static addSessionState(i,u){i.addFieldOffset(2,u,0)}static endInferenceSession(i){return i.endObject()}static finishInferenceSessionBuffer(i,u){i.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(i,u){i.finish(u,"ORTM",!0)}static createInferenceSession(i,u,l,c){return r.startInferenceSession(i),r.addOrtVersion(i,u),r.addModel(i,l),r.addSessionState(i,c),r.endInferenceSession(i)}}n.InferenceSession=r})(o=e.fbs||={})})(a=t.experimental||={})})(V||={})});var Bs=me((vy,ks)=>{"use strict";ks.exports=Bd;function Bd(a,t){for(var o=new Array(arguments.length-1),e=0,r=2,n=!0;r<arguments.length;)o[e++]=arguments[r++];return new Promise(function(i,u){o[e]=function(c){if(n)if(n=!1,c)u(c);else{for(var p=new Array(arguments.length-1),d=0;d<p.length;)p[d++]=arguments[d];i.apply(null,p)}};try{a.apply(t||null,o)}catch(l){n&&(n=!1,u(l))}})}});var Gs=me(Ms=>{"use strict";var Vn=Ms;Vn.length=function(t){var o=t.length;if(!o)return 0;for(var e=0;--o%4>1&&t.charAt(o)==="=";)++e;return Math.ceil(t.length*3)/4-e};var Lr=new Array(64),Rs=new Array(123);for(At=0;At<64;)Rs[Lr[At]=At<26?At+65:At<52?At+71:At<62?At-4:At-59|43]=At++;var At;Vn.encode=function(t,o,e){for(var r=null,n=[],s=0,i=0,u;o<e;){var l=t[o++];switch(i){case 0:n[s++]=Lr[l>>2],u=(l&3)<<4,i=1;break;case 1:n[s++]=Lr[u|l>>4],u=(l&15)<<2,i=2;break;case 2:n[s++]=Lr[u|l>>6],n[s++]=Lr[l&63],i=0;break}s>8191&&((r||(r=[])).push(String.fromCharCode.apply(String,n)),s=0)}return i&&(n[s++]=Lr[u],n[s++]=61,i===1&&(n[s++]=61)),r?(s&&r.push(String.fromCharCode.apply(String,n.slice(0,s))),r.join("")):String.fromCharCode.apply(String,n.slice(0,s))};var Ns="invalid encoding";Vn.decode=function(t,o,e){for(var r=e,n=0,s,i=0;i<t.length;){var u=t.charCodeAt(i++);if(u===61&&n>1)break;if((u=Rs[u])===void 0)throw Error(Ns);switch(n){case 0:s=u,n=1;break;case 1:o[e++]=s<<2|(u&48)>>4,s=u,n=2;break;case 2:o[e++]=(s&15)<<4|(u&60)>>2,s=u,n=3;break;case 3:o[e++]=(s&3)<<6|u,n=0;break}}if(n===1)throw Error(Ns);return e-r};Vn.test=function(t){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)}});var zs=me((Oy,Us)=>{"use strict";Us.exports=Wn;function Wn(){this._listeners={}}Wn.prototype.on=function(t,o,e){return(this._listeners[t]||(this._listeners[t]=[])).push({fn:o,ctx:e||this}),this};Wn.prototype.off=function(t,o){if(t===void 0)this._listeners={};else if(o===void 0)this._listeners[t]=[];else for(var e=this._listeners[t],r=0;r<e.length;)e[r].fn===o?e.splice(r,1):++r;return this};Wn.prototype.emit=function(t){var o=this._listeners[t];if(o){for(var e=[],r=1;r<arguments.length;)e.push(arguments[r++]);for(r=0;r<o.length;)o[r].fn.apply(o[r++].ctx,e)}return this}});var Xs=me((Iy,Ys)=>{"use strict";Ys.exports=Vs(Vs);function Vs(a){return typeof Float32Array<"u"?function(){var t=new Float32Array([-0]),o=new Uint8Array(t.buffer),e=o[3]===128;function r(u,l,c){t[0]=u,l[c]=o[0],l[c+1]=o[1],l[c+2]=o[2],l[c+3]=o[3]}function n(u,l,c){t[0]=u,l[c]=o[3],l[c+1]=o[2],l[c+2]=o[1],l[c+3]=o[0]}a.writeFloatLE=e?r:n,a.writeFloatBE=e?n:r;function s(u,l){return o[0]=u[l],o[1]=u[l+1],o[2]=u[l+2],o[3]=u[l+3],t[0]}function i(u,l){return o[3]=u[l],o[2]=u[l+1],o[1]=u[l+2],o[0]=u[l+3],t[0]}a.readFloatLE=e?s:i,a.readFloatBE=e?i:s}():function(){function t(e,r,n,s){var i=r<0?1:0;if(i&&(r=-r),r===0)e(1/r>0?0:2147483648,n,s);else if(isNaN(r))e(2143289344,n,s);else if(r>34028234663852886e22)e((i<<31|2139095040)>>>0,n,s);else if(r<11754943508222875e-54)e((i<<31|Math.round(r/1401298464324817e-60))>>>0,n,s);else{var u=Math.floor(Math.log(r)/Math.LN2),l=Math.round(r*Math.pow(2,-u)*8388608)&8388607;e((i<<31|u+127<<23|l)>>>0,n,s)}}a.writeFloatLE=t.bind(null,Ws),a.writeFloatBE=t.bind(null,Hs);function o(e,r,n){var s=e(r,n),i=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:i*(1/0):u===0?i*1401298464324817e-60*l:i*Math.pow(2,u-150)*(l+8388608)}a.readFloatLE=o.bind(null,qs),a.readFloatBE=o.bind(null,js)}(),typeof Float64Array<"u"?function(){var t=new Float64Array([-0]),o=new Uint8Array(t.buffer),e=o[7]===128;function r(u,l,c){t[0]=u,l[c]=o[0],l[c+1]=o[1],l[c+2]=o[2],l[c+3]=o[3],l[c+4]=o[4],l[c+5]=o[5],l[c+6]=o[6],l[c+7]=o[7]}function n(u,l,c){t[0]=u,l[c]=o[7],l[c+1]=o[6],l[c+2]=o[5],l[c+3]=o[4],l[c+4]=o[3],l[c+5]=o[2],l[c+6]=o[1],l[c+7]=o[0]}a.writeDoubleLE=e?r:n,a.writeDoubleBE=e?n:r;function s(u,l){return o[0]=u[l],o[1]=u[l+1],o[2]=u[l+2],o[3]=u[l+3],o[4]=u[l+4],o[5]=u[l+5],o[6]=u[l+6],o[7]=u[l+7],t[0]}function i(u,l){return o[7]=u[l],o[6]=u[l+1],o[5]=u[l+2],o[4]=u[l+3],o[3]=u[l+4],o[2]=u[l+5],o[1]=u[l+6],o[0]=u[l+7],t[0]}a.readDoubleLE=e?s:i,a.readDoubleBE=e?i:s}():function(){function t(e,r,n,s,i,u){var l=s<0?1:0;if(l&&(s=-s),s===0)e(0,i,u+r),e(1/s>0?0:2147483648,i,u+n);else if(isNaN(s))e(0,i,u+r),e(2146959360,i,u+n);else if(s>17976931348623157e292)e(0,i,u+r),e((l<<31|2146435072)>>>0,i,u+n);else{var c;if(s<22250738585072014e-324)c=s/5e-324,e(c>>>0,i,u+r),e((l<<31|c/4294967296)>>>0,i,u+n);else{var p=Math.floor(Math.log(s)/Math.LN2);p===1024&&(p=1023),c=s*Math.pow(2,-p),e(c*4503599627370496>>>0,i,u+r),e((l<<31|p+1023<<20|c*1048576&1048575)>>>0,i,u+n)}}}a.writeDoubleLE=t.bind(null,Ws,0,4),a.writeDoubleBE=t.bind(null,Hs,4,0);function o(e,r,n,s,i){var u=e(s,i+r),l=e(s,i+n),c=(l>>31)*2+1,p=l>>>20&2047,d=4294967296*(l&1048575)+u;return p===2047?d?NaN:c*(1/0):p===0?c*5e-324*d:c*Math.pow(2,p-1075)*(d+4503599627370496)}a.readDoubleLE=o.bind(null,qs,0,4),a.readDoubleBE=o.bind(null,js,4,0)}(),a}function Ws(a,t,o){t[o]=a&255,t[o+1]=a>>>8&255,t[o+2]=a>>>16&255,t[o+3]=a>>>24}function Hs(a,t,o){t[o]=a>>>24,t[o+1]=a>>>16&255,t[o+2]=a>>>8&255,t[o+3]=a&255}function qs(a,t){return(a[t]|a[t+1]<<8|a[t+2]<<16|a[t+3]<<24)>>>0}function js(a,t){return(a[t]<<24|a[t+1]<<16|a[t+2]<<8|a[t+3])>>>0}});var Ks=me((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(a){}return null}});var Zs=me(Js=>{"use strict";var Qo=Js;Qo.length=function(t){for(var o=0,e=0,r=0;r<t.length;++r)e=t.charCodeAt(r),e<128?o+=1:e<2048?o+=2:(e&64512)===55296&&(t.charCodeAt(r+1)&64512)===56320?(++r,o+=4):o+=3;return o};Qo.read=function(t,o,e){var r=e-o;if(r<1)return"";for(var n=null,s=[],i=0,u;o<e;)u=t[o++],u<128?s[i++]=u:u>191&&u<224?s[i++]=(u&31)<<6|t[o++]&63:u>239&&u<365?(u=((u&7)<<18|(t[o++]&63)<<12|(t[o++]&63)<<6|t[o++]&63)-65536,s[i++]=55296+(u>>10),s[i++]=56320+(u&1023)):s[i++]=(u&15)<<12|(t[o++]&63)<<6|t[o++]&63,i>8191&&((n||(n=[])).push(String.fromCharCode.apply(String,s)),i=0);return n?(i&&n.push(String.fromCharCode.apply(String,s.slice(0,i))),n.join("")):String.fromCharCode.apply(String,s.slice(0,i))};Qo.write=function(t,o,e){for(var r=e,n,s,i=0;i<t.length;++i)n=t.charCodeAt(i),n<128?o[e++]=n:n<2048?(o[e++]=n>>6|192,o[e++]=n&63|128):(n&64512)===55296&&((s=t.charCodeAt(i+1))&64512)===56320?(n=65536+((n&1023)<<10)+(s&1023),++i,o[e++]=n>>18|240,o[e++]=n>>12&63|128,o[e++]=n>>6&63|128,o[e++]=n&63|128):(o[e++]=n>>12|224,o[e++]=n>>6&63|128,o[e++]=n&63|128);return e-r}});var eu=me((Ay,Qs)=>{"use strict";Qs.exports=Nd;function Nd(a,t,o){var e=o||8192,r=e>>>1,n=null,s=e;return function(u){if(u<1||u>r)return a(u);s+u>e&&(n=a(e),s=0);var l=t.call(n,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var ru=me((Py,tu)=>{"use strict";tu.exports=Ge;var rn=Jt();function Ge(a,t){this.lo=a>>>0,this.hi=t>>>0}var pr=Ge.zero=new Ge(0,0);pr.toNumber=function(){return 0};pr.zzEncode=pr.zzDecode=function(){return this};pr.length=function(){return 1};var Rd=Ge.zeroHash="\0\0\0\0\0\0\0\0";Ge.fromNumber=function(t){if(t===0)return pr;var o=t<0;o&&(t=-t);var e=t>>>0,r=(t-e)/4294967296>>>0;return o&&(r=~r>>>0,e=~e>>>0,++e>4294967295&&(e=0,++r>4294967295&&(r=0))),new Ge(e,r)};Ge.from=function(t){if(typeof t=="number")return Ge.fromNumber(t);if(rn.isString(t))if(rn.Long)t=rn.Long.fromString(t);else return Ge.fromNumber(parseInt(t,10));return t.low||t.high?new Ge(t.low>>>0,t.high>>>0):pr};Ge.prototype.toNumber=function(t){if(!t&&this.hi>>>31){var o=~this.lo+1>>>0,e=~this.hi>>>0;return o||(e=e+1>>>0),-(o+e*4294967296)}return this.lo+this.hi*4294967296};Ge.prototype.toLong=function(t){return rn.Long?new rn.Long(this.lo|0,this.hi|0,!!t):{low:this.lo|0,high:this.hi|0,unsigned:!!t}};var Kt=String.prototype.charCodeAt;Ge.fromHash=function(t){return t===Rd?pr:new Ge((Kt.call(t,0)|Kt.call(t,1)<<8|Kt.call(t,2)<<16|Kt.call(t,3)<<24)>>>0,(Kt.call(t,4)|Kt.call(t,5)<<8|Kt.call(t,6)<<16|Kt.call(t,7)<<24)>>>0)};Ge.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Ge.prototype.zzEncode=function(){var t=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^t)>>>0,this.lo=(this.lo<<1^t)>>>0,this};Ge.prototype.zzDecode=function(){var t=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^t)>>>0,this.hi=(this.hi>>>1^t)>>>0,this};Ge.prototype.length=function(){var t=this.lo,o=(this.lo>>>28|this.hi<<4)>>>0,e=this.hi>>>24;return e===0?o===0?t<16384?t<128?1:2:t<2097152?3:4:o<16384?o<128?5:6:o<2097152?7:8:e<128?9:10}});var Jt=me(ei=>{"use strict";var W=ei;W.asPromise=Bs();W.base64=Gs();W.EventEmitter=zs();W.float=Xs();W.inquire=Ks();W.utf8=Zs();W.pool=eu();W.LongBits=ru();W.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);W.global=W.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||ei;W.emptyArray=Object.freeze?Object.freeze([]):[];W.emptyObject=Object.freeze?Object.freeze({}):{};W.isInteger=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};W.isString=function(t){return typeof t=="string"||t instanceof String};W.isObject=function(t){return t&&typeof t=="object"};W.isset=W.isSet=function(t,o){var e=t[o];return e!=null&&t.hasOwnProperty(o)?typeof e!="object"||(Array.isArray(e)?e.length:Object.keys(e).length)>0:!1};W.Buffer=function(){try{var a=W.inquire("buffer").Buffer;return a.prototype.utf8Write?a:null}catch{return null}}();W._Buffer_from=null;W._Buffer_allocUnsafe=null;W.newBuffer=function(t){return typeof t=="number"?W.Buffer?W._Buffer_allocUnsafe(t):new W.Array(t):W.Buffer?W._Buffer_from(t):typeof Uint8Array>"u"?t:new Uint8Array(t)};W.Array=typeof Uint8Array<"u"?Uint8Array:Array;W.Long=W.global.dcodeIO&&W.global.dcodeIO.Long||W.global.Long||W.inquire("long");W.key2Re=/^true|false|0|1$/;W.key32Re=/^-?(?:0|[1-9][0-9]*)$/;W.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;W.longToHash=function(t){return t?W.LongBits.from(t).toHash():W.LongBits.zeroHash};W.longFromHash=function(t,o){var e=W.LongBits.fromHash(t);return W.Long?W.Long.fromBits(e.lo,e.hi,o):e.toNumber(!!o)};function nu(a,t,o){for(var e=Object.keys(t),r=0;r<e.length;++r)(a[e[r]]===void 0||!o)&&(a[e[r]]=t[e[r]]);return a}W.merge=nu;W.lcFirst=function(t){return t.charAt(0).toLowerCase()+t.substring(1)};function ou(a){function t(o,e){if(!(this instanceof t))return new t(o,e);Object.defineProperty(this,"message",{get:function(){return o}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:new Error().stack||""}),e&&nu(this,e)}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return a},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}W.newError=ou;W.ProtocolError=ou("ProtocolError");W.oneOfGetter=function(t){for(var o={},e=0;e<t.length;++e)o[t[e]]=1;return function(){for(var r=Object.keys(this),n=r.length-1;n>-1;--n)if(o[r[n]]===1&&this[r[n]]!==void 0&&this[r[n]]!==null)return r[n]}};W.oneOfSetter=function(t){return function(o){for(var e=0;e<t.length;++e)t[e]!==o&&delete this[t[e]]}};W.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};W._configure=function(){var a=W.Buffer;if(!a){W._Buffer_from=W._Buffer_allocUnsafe=null;return}W._Buffer_from=a.from!==Uint8Array.from&&a.from||function(o,e){return new a(o,e)},W._Buffer_allocUnsafe=a.allocUnsafe||function(o){return new a(o)}}});var si=me((Dy,uu)=>{"use strict";uu.exports=se;var pt=Jt(),ti,Hn=pt.LongBits,iu=pt.base64,au=pt.utf8;function nn(a,t,o){this.fn=a,this.len=t,this.next=void 0,this.val=o}function ni(){}function Md(a){this.head=a.head,this.tail=a.tail,this.len=a.len,this.next=a.states}function se(){this.len=0,this.head=new nn(ni,0,0),this.tail=this.head,this.states=null}var su=function(){return pt.Buffer?function(){return(se.create=function(){return new ti})()}:function(){return new se}};se.create=su();se.alloc=function(t){return new pt.Array(t)};pt.Array!==Array&&(se.alloc=pt.pool(se.alloc,pt.Array.prototype.subarray));se.prototype._push=function(t,o,e){return this.tail=this.tail.next=new nn(t,o,e),this.len+=o,this};function oi(a,t,o){t[o]=a&255}function Gd(a,t,o){for(;a>127;)t[o++]=a&127|128,a>>>=7;t[o]=a}function ii(a,t){this.len=a,this.next=void 0,this.val=t}ii.prototype=Object.create(nn.prototype);ii.prototype.fn=Gd;se.prototype.uint32=function(t){return this.len+=(this.tail=this.tail.next=new ii((t=t>>>0)<128?1:t<16384?2:t<2097152?3:t<268435456?4:5,t)).len,this};se.prototype.int32=function(t){return t<0?this._push(ai,10,Hn.fromNumber(t)):this.uint32(t)};se.prototype.sint32=function(t){return this.uint32((t<<1^t>>31)>>>0)};function ai(a,t,o){for(;a.hi;)t[o++]=a.lo&127|128,a.lo=(a.lo>>>7|a.hi<<25)>>>0,a.hi>>>=7;for(;a.lo>127;)t[o++]=a.lo&127|128,a.lo=a.lo>>>7;t[o++]=a.lo}se.prototype.uint64=function(t){var o=Hn.from(t);return this._push(ai,o.length(),o)};se.prototype.int64=se.prototype.uint64;se.prototype.sint64=function(t){var o=Hn.from(t).zzEncode();return this._push(ai,o.length(),o)};se.prototype.bool=function(t){return this._push(oi,1,t?1:0)};function ri(a,t,o){t[o]=a&255,t[o+1]=a>>>8&255,t[o+2]=a>>>16&255,t[o+3]=a>>>24}se.prototype.fixed32=function(t){return this._push(ri,4,t>>>0)};se.prototype.sfixed32=se.prototype.fixed32;se.prototype.fixed64=function(t){var o=Hn.from(t);return this._push(ri,4,o.lo)._push(ri,4,o.hi)};se.prototype.sfixed64=se.prototype.fixed64;se.prototype.float=function(t){return this._push(pt.float.writeFloatLE,4,t)};se.prototype.double=function(t){return this._push(pt.float.writeDoubleLE,8,t)};var Ud=pt.Array.prototype.set?function(t,o,e){o.set(t,e)}:function(t,o,e){for(var r=0;r<t.length;++r)o[e+r]=t[r]};se.prototype.bytes=function(t){var o=t.length>>>0;if(!o)return this._push(oi,1,0);if(pt.isString(t)){var e=se.alloc(o=iu.length(t));iu.decode(t,e,0),t=e}return this.uint32(o)._push(Ud,o,t)};se.prototype.string=function(t){var o=au.length(t);return o?this.uint32(o)._push(au.write,o,t):this._push(oi,1,0)};se.prototype.fork=function(){return this.states=new Md(this),this.head=this.tail=new nn(ni,0,0),this.len=0,this};se.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new nn(ni,0,0),this.len=0),this};se.prototype.ldelim=function(){var t=this.head,o=this.tail,e=this.len;return this.reset().uint32(e),e&&(this.tail.next=t.next,this.tail=o,this.len+=e),this};se.prototype.finish=function(){for(var t=this.head.next,o=this.constructor.alloc(this.len),e=0;t;)t.fn(t.val,o,e),e+=t.len,t=t.next;return o};se._configure=function(a){ti=a,se.create=su(),ti._configure()}});var cu=me((Ly,fu)=>{"use strict";fu.exports=kt;var lu=si();(kt.prototype=Object.create(lu.prototype)).constructor=kt;var Zt=Jt();function kt(){lu.call(this)}kt._configure=function(){kt.alloc=Zt._Buffer_allocUnsafe,kt.writeBytesBuffer=Zt.Buffer&&Zt.Buffer.prototype instanceof Uint8Array&&Zt.Buffer.prototype.set.name==="set"?function(t,o,e){o.set(t,e)}:function(t,o,e){if(t.copy)t.copy(o,e,0,t.length);else for(var r=0;r<t.length;)o[e++]=t[r++]}};kt.prototype.bytes=function(t){Zt.isString(t)&&(t=Zt._Buffer_from(t,"base64"));var o=t.length>>>0;return this.uint32(o),o&&this._push(kt.writeBytesBuffer,o,t),this};function zd(a,t,o){a.length<40?Zt.utf8.write(a,t,o):t.utf8Write?t.utf8Write(a,o):t.write(a,o)}kt.prototype.string=function(t){var o=Zt.Buffer.byteLength(t);return this.uint32(o),o&&this._push(zd,o,t),this};kt._configure()});var fi=me((Cy,bu)=>{"use strict";bu.exports=Ae;var Pt=Jt(),li,hu=Pt.LongBits,Vd=Pt.utf8;function Et(a,t){return RangeError("index out of range: "+a.pos+" + "+(t||1)+" > "+a.len)}function Ae(a){this.buf=a,this.pos=0,this.len=a.length}var pu=typeof Uint8Array<"u"?function(t){if(t instanceof Uint8Array||Array.isArray(t))return new Ae(t);throw Error("illegal buffer")}:function(t){if(Array.isArray(t))return new Ae(t);throw Error("illegal buffer")},mu=function(){return Pt.Buffer?function(o){return(Ae.create=function(r){return Pt.Buffer.isBuffer(r)?new li(r):pu(r)})(o)}:pu};Ae.create=mu();Ae.prototype._slice=Pt.Array.prototype.subarray||Pt.Array.prototype.slice;Ae.prototype.uint32=function(){var t=4294967295;return function(){if(t=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(t=(t|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return t;if((this.pos+=5)>this.len)throw this.pos=this.len,Et(this,10);return t}}();Ae.prototype.int32=function(){return this.uint32()|0};Ae.prototype.sint32=function(){var t=this.uint32();return t>>>1^-(t&1)|0};function ui(){var a=new hu(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(a.lo=(a.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return a;if(a.lo=(a.lo|(this.buf[this.pos]&127)<<28)>>>0,a.hi=(a.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return a;t=0}else{for(;t<3;++t){if(this.pos>=this.len)throw Et(this);if(a.lo=(a.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return a}return a.lo=(a.lo|(this.buf[this.pos++]&127)<<t*7)>>>0,a}if(this.len-this.pos>4){for(;t<5;++t)if(a.hi=(a.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return a}else for(;t<5;++t){if(this.pos>=this.len)throw Et(this);if(a.hi=(a.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return a}throw Error("invalid varint encoding")}Ae.prototype.bool=function(){return this.uint32()!==0};function qn(a,t){return(a[t-4]|a[t-3]<<8|a[t-2]<<16|a[t-1]<<24)>>>0}Ae.prototype.fixed32=function(){if(this.pos+4>this.len)throw Et(this,4);return qn(this.buf,this.pos+=4)};Ae.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Et(this,4);return qn(this.buf,this.pos+=4)|0};function du(){if(this.pos+8>this.len)throw Et(this,8);return new hu(qn(this.buf,this.pos+=4),qn(this.buf,this.pos+=4))}Ae.prototype.float=function(){if(this.pos+4>this.len)throw Et(this,4);var t=Pt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,t};Ae.prototype.double=function(){if(this.pos+8>this.len)throw Et(this,4);var t=Pt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,t};Ae.prototype.bytes=function(){var t=this.uint32(),o=this.pos,e=this.pos+t;if(e>this.len)throw Et(this,t);if(this.pos+=t,Array.isArray(this.buf))return this.buf.slice(o,e);if(o===e){var r=Pt.Buffer;return r?r.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,o,e)};Ae.prototype.string=function(){var t=this.bytes();return Vd.read(t,0,t.length)};Ae.prototype.skip=function(t){if(typeof t=="number"){if(this.pos+t>this.len)throw Et(this,t);this.pos+=t}else do if(this.pos>=this.len)throw Et(this);while(this.buf[this.pos++]&128);return this};Ae.prototype.skipType=function(a){switch(a){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(a=this.uint32()&7)!==4;)this.skipType(a);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+a+" at offset "+this.pos)}return this};Ae._configure=function(a){li=a,Ae.create=mu(),li._configure();var t=Pt.Long?"toLong":"toNumber";Pt.merge(Ae.prototype,{int64:function(){return ui.call(this)[t](!1)},uint64:function(){return ui.call(this)[t](!0)},sint64:function(){return ui.call(this).zzDecode()[t](!1)},fixed64:function(){return du.call(this)[t](!0)},sfixed64:function(){return du.call(this)[t](!1)}})}});var xu=me((Fy,Tu)=>{"use strict";Tu.exports=dr;var yu=fi();(dr.prototype=Object.create(yu.prototype)).constructor=dr;var gu=Jt();function dr(a){yu.call(this,a)}dr._configure=function(){gu.Buffer&&(dr.prototype._slice=gu.Buffer.prototype.slice)};dr.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};dr._configure()});var vu=me(($y,wu)=>{"use strict";wu.exports=on;var ci=Jt();(on.prototype=Object.create(ci.EventEmitter.prototype)).constructor=on;function on(a,t,o){if(typeof a!="function")throw TypeError("rpcImpl must be a function");ci.EventEmitter.call(this),this.rpcImpl=a,this.requestDelimited=!!t,this.responseDelimited=!!o}on.prototype.rpcCall=function a(t,o,e,r,n){if(!r)throw TypeError("request must be specified");var s=this;if(!n)return ci.asPromise(a,s,t,o,e,r);if(!s.rpcImpl){setTimeout(function(){n(Error("already ended"))},0);return}try{return s.rpcImpl(t,o[s.requestDelimited?"encodeDelimited":"encode"](r).finish(),function(u,l){if(u)return s.emit("error",u,t),n(u);if(l===null){s.end(!0);return}if(!(l instanceof e))try{l=e[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return s.emit("error",c,t),n(c)}return s.emit("data",l,t),n(null,l)})}catch(i){s.emit("error",i,t),setTimeout(function(){n(i)},0);return}};on.prototype.end=function(t){return this.rpcImpl&&(t||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Ou=me(_u=>{"use strict";var Wd=_u;Wd.Service=vu()});var Su=me((By,Iu)=>{"use strict";Iu.exports={}});var Eu=me(Pu=>{"use strict";var ot=Pu;ot.build="minimal";ot.Writer=si();ot.BufferWriter=cu();ot.Reader=fi();ot.BufferReader=xu();ot.util=Jt();ot.rpc=Ou();ot.roots=Su();ot.configure=Au;function Au(){ot.util._configure(),ot.Writer._configure(ot.BufferWriter),ot.Reader._configure(ot.BufferReader)}Au()});var Lu=me((Ry,Du)=>{"use strict";Du.exports=Eu()});var Cr=me((My,Cu)=>{"use strict";var ge=Lu(),N=ge.Reader,Pe=ge.Writer,g=ge.util,h=ge.roots.default||(ge.roots.default={});h.onnx=function(){var a={};return a.Version=function(){var t={},o=Object.create(t);return o[t[0]="_START_VERSION"]=0,o[t[1]="IR_VERSION_2017_10_10"]=1,o[t[2]="IR_VERSION_2017_10_30"]=2,o[t[3]="IR_VERSION_2017_11_3"]=3,o[t[4]="IR_VERSION_2019_1_22"]=4,o[t[5]="IR_VERSION_2019_3_18"]=5,o[t[6]="IR_VERSION_2019_9_19"]=6,o[t[7]="IR_VERSION_2020_5_8"]=7,o[t[8]="IR_VERSION_2021_7_30"]=8,o[t[9]="IR_VERSION"]=9,o}(),a.AttributeProto=function(){function t(o){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.refAttrName="",t.prototype.docString="",t.prototype.type=0,t.prototype.f=0,t.prototype.i=g.Long?g.Long.fromBits(0,0,!1):0,t.prototype.s=g.newBuffer([]),t.prototype.t=null,t.prototype.g=null,t.prototype.sparseTensor=null,t.prototype.tp=null,t.prototype.floats=g.emptyArray,t.prototype.ints=g.emptyArray,t.prototype.strings=g.emptyArray,t.prototype.tensors=g.emptyArray,t.prototype.graphs=g.emptyArray,t.prototype.sparseTensors=g.emptyArray,t.prototype.typeProtos=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.f!=null&&Object.hasOwnProperty.call(e,"f")&&r.uint32(21).float(e.f),e.i!=null&&Object.hasOwnProperty.call(e,"i")&&r.uint32(24).int64(e.i),e.s!=null&&Object.hasOwnProperty.call(e,"s")&&r.uint32(34).bytes(e.s),e.t!=null&&Object.hasOwnProperty.call(e,"t")&&h.onnx.TensorProto.encode(e.t,r.uint32(42).fork()).ldelim(),e.g!=null&&Object.hasOwnProperty.call(e,"g")&&h.onnx.GraphProto.encode(e.g,r.uint32(50).fork()).ldelim(),e.floats!=null&&e.floats.length){r.uint32(58).fork();for(var n=0;n<e.floats.length;++n)r.float(e.floats[n]);r.ldelim()}if(e.ints!=null&&e.ints.length){r.uint32(66).fork();for(var n=0;n<e.ints.length;++n)r.int64(e.ints[n]);r.ldelim()}if(e.strings!=null&&e.strings.length)for(var n=0;n<e.strings.length;++n)r.uint32(74).bytes(e.strings[n]);if(e.tensors!=null&&e.tensors.length)for(var n=0;n<e.tensors.length;++n)h.onnx.TensorProto.encode(e.tensors[n],r.uint32(82).fork()).ldelim();if(e.graphs!=null&&e.graphs.length)for(var n=0;n<e.graphs.length;++n)h.onnx.GraphProto.encode(e.graphs[n],r.uint32(90).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(106).string(e.docString),e.tp!=null&&Object.hasOwnProperty.call(e,"tp")&&h.onnx.TypeProto.encode(e.tp,r.uint32(114).fork()).ldelim(),e.typeProtos!=null&&e.typeProtos.length)for(var n=0;n<e.typeProtos.length;++n)h.onnx.TypeProto.encode(e.typeProtos[n],r.uint32(122).fork()).ldelim();if(e.type!=null&&Object.hasOwnProperty.call(e,"type")&&r.uint32(160).int32(e.type),e.refAttrName!=null&&Object.hasOwnProperty.call(e,"refAttrName")&&r.uint32(170).string(e.refAttrName),e.sparseTensor!=null&&Object.hasOwnProperty.call(e,"sparseTensor")&&h.onnx.SparseTensorProto.encode(e.sparseTensor,r.uint32(178).fork()).ldelim(),e.sparseTensors!=null&&e.sparseTensors.length)for(var n=0;n<e.sparseTensors.length;++n)h.onnx.SparseTensorProto.encode(e.sparseTensors[n],r.uint32(186).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.AttributeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 21:{s.refAttrName=e.string();break}case 13:{s.docString=e.string();break}case 20:{s.type=e.int32();break}case 2:{s.f=e.float();break}case 3:{s.i=e.int64();break}case 4:{s.s=e.bytes();break}case 5:{s.t=h.onnx.TensorProto.decode(e,e.uint32());break}case 6:{s.g=h.onnx.GraphProto.decode(e,e.uint32());break}case 22:{s.sparseTensor=h.onnx.SparseTensorProto.decode(e,e.uint32());break}case 14:{s.tp=h.onnx.TypeProto.decode(e,e.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.floats.push(e.float());else s.floats.push(e.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.ints.push(e.int64());else s.ints.push(e.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(e.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(h.onnx.TensorProto.decode(e,e.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(h.onnx.GraphProto.decode(e,e.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(h.onnx.SparseTensorProto.decode(e,e.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(h.onnx.TypeProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.refAttrName!=null&&e.hasOwnProperty("refAttrName")&&!g.isString(e.refAttrName))return"refAttrName: string expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString))return"docString: string expected";if(e.type!=null&&e.hasOwnProperty("type"))switch(e.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(e.f!=null&&e.hasOwnProperty("f")&&typeof e.f!="number")return"f: number expected";if(e.i!=null&&e.hasOwnProperty("i")&&!g.isInteger(e.i)&&!(e.i&&g.isInteger(e.i.low)&&g.isInteger(e.i.high)))return"i: integer|Long expected";if(e.s!=null&&e.hasOwnProperty("s")&&!(e.s&&typeof e.s.length=="number"||g.isString(e.s)))return"s: buffer expected";if(e.t!=null&&e.hasOwnProperty("t")){var r=h.onnx.TensorProto.verify(e.t);if(r)return"t."+r}if(e.g!=null&&e.hasOwnProperty("g")){var r=h.onnx.GraphProto.verify(e.g);if(r)return"g."+r}if(e.sparseTensor!=null&&e.hasOwnProperty("sparseTensor")){var r=h.onnx.SparseTensorProto.verify(e.sparseTensor);if(r)return"sparseTensor."+r}if(e.tp!=null&&e.hasOwnProperty("tp")){var r=h.onnx.TypeProto.verify(e.tp);if(r)return"tp."+r}if(e.floats!=null&&e.hasOwnProperty("floats")){if(!Array.isArray(e.floats))return"floats: array expected";for(var n=0;n<e.floats.length;++n)if(typeof e.floats[n]!="number")return"floats: number[] expected"}if(e.ints!=null&&e.hasOwnProperty("ints")){if(!Array.isArray(e.ints))return"ints: array expected";for(var n=0;n<e.ints.length;++n)if(!g.isInteger(e.ints[n])&&!(e.ints[n]&&g.isInteger(e.ints[n].low)&&g.isInteger(e.ints[n].high)))return"ints: integer|Long[] expected"}if(e.strings!=null&&e.hasOwnProperty("strings")){if(!Array.isArray(e.strings))return"strings: array expected";for(var n=0;n<e.strings.length;++n)if(!(e.strings[n]&&typeof e.strings[n].length=="number"||g.isString(e.strings[n])))return"strings: buffer[] expected"}if(e.tensors!=null&&e.hasOwnProperty("tensors")){if(!Array.isArray(e.tensors))return"tensors: array expected";for(var n=0;n<e.tensors.length;++n){var r=h.onnx.TensorProto.verify(e.tensors[n]);if(r)return"tensors."+r}}if(e.graphs!=null&&e.hasOwnProperty("graphs")){if(!Array.isArray(e.graphs))return"graphs: array expected";for(var n=0;n<e.graphs.length;++n){var r=h.onnx.GraphProto.verify(e.graphs[n]);if(r)return"graphs."+r}}if(e.sparseTensors!=null&&e.hasOwnProperty("sparseTensors")){if(!Array.isArray(e.sparseTensors))return"sparseTensors: array expected";for(var n=0;n<e.sparseTensors.length;++n){var r=h.onnx.SparseTensorProto.verify(e.sparseTensors[n]);if(r)return"sparseTensors."+r}}if(e.typeProtos!=null&&e.hasOwnProperty("typeProtos")){if(!Array.isArray(e.typeProtos))return"typeProtos: array expected";for(var n=0;n<e.typeProtos.length;++n){var r=h.onnx.TypeProto.verify(e.typeProtos[n]);if(r)return"typeProtos."+r}}return null},t.fromObject=function(e){if(e instanceof h.onnx.AttributeProto)return e;var r=new h.onnx.AttributeProto;switch(e.name!=null&&(r.name=String(e.name)),e.refAttrName!=null&&(r.refAttrName=String(e.refAttrName)),e.docString!=null&&(r.docString=String(e.docString)),e.type){default:if(typeof e.type=="number"){r.type=e.type;break}break;case"UNDEFINED":case 0:r.type=0;break;case"FLOAT":case 1:r.type=1;break;case"INT":case 2:r.type=2;break;case"STRING":case 3:r.type=3;break;case"TENSOR":case 4:r.type=4;break;case"GRAPH":case 5:r.type=5;break;case"SPARSE_TENSOR":case 11:r.type=11;break;case"TYPE_PROTO":case 13:r.type=13;break;case"FLOATS":case 6:r.type=6;break;case"INTS":case 7:r.type=7;break;case"STRINGS":case 8:r.type=8;break;case"TENSORS":case 9:r.type=9;break;case"GRAPHS":case 10:r.type=10;break;case"SPARSE_TENSORS":case 12:r.type=12;break;case"TYPE_PROTOS":case 14:r.type=14;break}if(e.f!=null&&(r.f=Number(e.f)),e.i!=null&&(g.Long?(r.i=g.Long.fromValue(e.i)).unsigned=!1:typeof e.i=="string"?r.i=parseInt(e.i,10):typeof e.i=="number"?r.i=e.i:typeof e.i=="object"&&(r.i=new g.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber())),e.s!=null&&(typeof e.s=="string"?g.base64.decode(e.s,r.s=g.newBuffer(g.base64.length(e.s)),0):e.s.length>=0&&(r.s=e.s)),e.t!=null){if(typeof e.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");r.t=h.onnx.TensorProto.fromObject(e.t)}if(e.g!=null){if(typeof e.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");r.g=h.onnx.GraphProto.fromObject(e.g)}if(e.sparseTensor!=null){if(typeof e.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");r.sparseTensor=h.onnx.SparseTensorProto.fromObject(e.sparseTensor)}if(e.tp!=null){if(typeof e.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");r.tp=h.onnx.TypeProto.fromObject(e.tp)}if(e.floats){if(!Array.isArray(e.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");r.floats=[];for(var n=0;n<e.floats.length;++n)r.floats[n]=Number(e.floats[n])}if(e.ints){if(!Array.isArray(e.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");r.ints=[];for(var n=0;n<e.ints.length;++n)g.Long?(r.ints[n]=g.Long.fromValue(e.ints[n])).unsigned=!1:typeof e.ints[n]=="string"?r.ints[n]=parseInt(e.ints[n],10):typeof e.ints[n]=="number"?r.ints[n]=e.ints[n]:typeof e.ints[n]=="object"&&(r.ints[n]=new g.LongBits(e.ints[n].low>>>0,e.ints[n].high>>>0).toNumber())}if(e.strings){if(!Array.isArray(e.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");r.strings=[];for(var n=0;n<e.strings.length;++n)typeof e.strings[n]=="string"?g.base64.decode(e.strings[n],r.strings[n]=g.newBuffer(g.base64.length(e.strings[n])),0):e.strings[n].length>=0&&(r.strings[n]=e.strings[n])}if(e.tensors){if(!Array.isArray(e.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");r.tensors=[];for(var n=0;n<e.tensors.length;++n){if(typeof e.tensors[n]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");r.tensors[n]=h.onnx.TensorProto.fromObject(e.tensors[n])}}if(e.graphs){if(!Array.isArray(e.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");r.graphs=[];for(var n=0;n<e.graphs.length;++n){if(typeof e.graphs[n]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");r.graphs[n]=h.onnx.GraphProto.fromObject(e.graphs[n])}}if(e.sparseTensors){if(!Array.isArray(e.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");r.sparseTensors=[];for(var n=0;n<e.sparseTensors.length;++n){if(typeof e.sparseTensors[n]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");r.sparseTensors[n]=h.onnx.SparseTensorProto.fromObject(e.sparseTensors[n])}}if(e.typeProtos){if(!Array.isArray(e.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");r.typeProtos=[];for(var n=0;n<e.typeProtos.length;++n){if(typeof e.typeProtos[n]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");r.typeProtos[n]=h.onnx.TypeProto.fromObject(e.typeProtos[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.floats=[],n.ints=[],n.strings=[],n.tensors=[],n.graphs=[],n.typeProtos=[],n.sparseTensors=[]),r.defaults){if(n.name="",n.f=0,g.Long){var s=new g.Long(0,0,!1);n.i=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.i=r.longs===String?"0":0;r.bytes===String?n.s="":(n.s=[],r.bytes!==Array&&(n.s=g.newBuffer(n.s))),n.t=null,n.g=null,n.docString="",n.tp=null,n.type=r.enums===String?"UNDEFINED":0,n.refAttrName="",n.sparseTensor=null}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.f!=null&&e.hasOwnProperty("f")&&(n.f=r.json&&!isFinite(e.f)?String(e.f):e.f),e.i!=null&&e.hasOwnProperty("i")&&(typeof e.i=="number"?n.i=r.longs===String?String(e.i):e.i:n.i=r.longs===String?g.Long.prototype.toString.call(e.i):r.longs===Number?new g.LongBits(e.i.low>>>0,e.i.high>>>0).toNumber():e.i),e.s!=null&&e.hasOwnProperty("s")&&(n.s=r.bytes===String?g.base64.encode(e.s,0,e.s.length):r.bytes===Array?Array.prototype.slice.call(e.s):e.s),e.t!=null&&e.hasOwnProperty("t")&&(n.t=h.onnx.TensorProto.toObject(e.t,r)),e.g!=null&&e.hasOwnProperty("g")&&(n.g=h.onnx.GraphProto.toObject(e.g,r)),e.floats&&e.floats.length){n.floats=[];for(var i=0;i<e.floats.length;++i)n.floats[i]=r.json&&!isFinite(e.floats[i])?String(e.floats[i]):e.floats[i]}if(e.ints&&e.ints.length){n.ints=[];for(var i=0;i<e.ints.length;++i)typeof e.ints[i]=="number"?n.ints[i]=r.longs===String?String(e.ints[i]):e.ints[i]:n.ints[i]=r.longs===String?g.Long.prototype.toString.call(e.ints[i]):r.longs===Number?new g.LongBits(e.ints[i].low>>>0,e.ints[i].high>>>0).toNumber():e.ints[i]}if(e.strings&&e.strings.length){n.strings=[];for(var i=0;i<e.strings.length;++i)n.strings[i]=r.bytes===String?g.base64.encode(e.strings[i],0,e.strings[i].length):r.bytes===Array?Array.prototype.slice.call(e.strings[i]):e.strings[i]}if(e.tensors&&e.tensors.length){n.tensors=[];for(var i=0;i<e.tensors.length;++i)n.tensors[i]=h.onnx.TensorProto.toObject(e.tensors[i],r)}if(e.graphs&&e.graphs.length){n.graphs=[];for(var i=0;i<e.graphs.length;++i)n.graphs[i]=h.onnx.GraphProto.toObject(e.graphs[i],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.tp!=null&&e.hasOwnProperty("tp")&&(n.tp=h.onnx.TypeProto.toObject(e.tp,r)),e.typeProtos&&e.typeProtos.length){n.typeProtos=[];for(var i=0;i<e.typeProtos.length;++i)n.typeProtos[i]=h.onnx.TypeProto.toObject(e.typeProtos[i],r)}if(e.type!=null&&e.hasOwnProperty("type")&&(n.type=r.enums===String?h.onnx.AttributeProto.AttributeType[e.type]===void 0?e.type:h.onnx.AttributeProto.AttributeType[e.type]:e.type),e.refAttrName!=null&&e.hasOwnProperty("refAttrName")&&(n.refAttrName=e.refAttrName),e.sparseTensor!=null&&e.hasOwnProperty("sparseTensor")&&(n.sparseTensor=h.onnx.SparseTensorProto.toObject(e.sparseTensor,r)),e.sparseTensors&&e.sparseTensors.length){n.sparseTensors=[];for(var i=0;i<e.sparseTensors.length;++i)n.sparseTensors[i]=h.onnx.SparseTensorProto.toObject(e.sparseTensors[i],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.AttributeProto"},t.AttributeType=function(){var o={},e=Object.create(o);return e[o[0]="UNDEFINED"]=0,e[o[1]="FLOAT"]=1,e[o[2]="INT"]=2,e[o[3]="STRING"]=3,e[o[4]="TENSOR"]=4,e[o[5]="GRAPH"]=5,e[o[11]="SPARSE_TENSOR"]=11,e[o[13]="TYPE_PROTO"]=13,e[o[6]="FLOATS"]=6,e[o[7]="INTS"]=7,e[o[8]="STRINGS"]=8,e[o[9]="TENSORS"]=9,e[o[10]="GRAPHS"]=10,e[o[12]="SPARSE_TENSORS"]=12,e[o[14]="TYPE_PROTOS"]=14,e}(),t}(),a.ValueInfoProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.type=null,t.prototype.docString="",t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Pe.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.type!=null&&Object.hasOwnProperty.call(e,"type")&&h.onnx.TypeProto.encode(e.type,r.uint32(18).fork()).ldelim(),e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(26).string(e.docString),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.ValueInfoProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 2:{s.type=h.onnx.TypeProto.decode(e,e.uint32());break}case 3:{s.docString=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.type!=null&&e.hasOwnProperty("type")){var r=h.onnx.TypeProto.verify(e.type);if(r)return"type."+r}return e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString)?"docString: string expected":null},t.fromObject=function(e){if(e instanceof h.onnx.ValueInfoProto)return e;var r=new h.onnx.ValueInfoProto;if(e.name!=null&&(r.name=String(e.name)),e.type!=null){if(typeof e.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");r.type=h.onnx.TypeProto.fromObject(e.type)}return e.docString!=null&&(r.docString=String(e.docString)),r},t.toObject=function(e,r){r||(r={});var n={};return r.defaults&&(n.name="",n.type=null,n.docString=""),e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.type!=null&&e.hasOwnProperty("type")&&(n.type=h.onnx.TypeProto.toObject(e.type,r)),e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.ValueInfoProto"},t}(),a.NodeProto=function(){function t(o){if(this.input=[],this.output=[],this.attribute=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.input=g.emptyArray,t.prototype.output=g.emptyArray,t.prototype.name="",t.prototype.opType="",t.prototype.domain="",t.prototype.attribute=g.emptyArray,t.prototype.docString="",t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)r.uint32(10).string(e.input[n]);if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)r.uint32(18).string(e.output[n]);if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(26).string(e.name),e.opType!=null&&Object.hasOwnProperty.call(e,"opType")&&r.uint32(34).string(e.opType),e.attribute!=null&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)h.onnx.AttributeProto.encode(e.attribute[n],r.uint32(42).fork()).ldelim();return e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(50).string(e.docString),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(58).string(e.domain),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.NodeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(e.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(e.string());break}case 3:{s.name=e.string();break}case 4:{s.opType=e.string();break}case 7:{s.domain=e.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(h.onnx.AttributeProto.decode(e,e.uint32()));break}case 6:{s.docString=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r)if(!g.isString(e.input[r]))return"input: string[] expected"}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r)if(!g.isString(e.output[r]))return"output: string[] expected"}if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.opType!=null&&e.hasOwnProperty("opType")&&!g.isString(e.opType))return"opType: string expected";if(e.domain!=null&&e.hasOwnProperty("domain")&&!g.isString(e.domain))return"domain: string expected";if(e.attribute!=null&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var r=0;r<e.attribute.length;++r){var n=h.onnx.AttributeProto.verify(e.attribute[r]);if(n)return"attribute."+n}}return e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString)?"docString: string expected":null},t.fromObject=function(e){if(e instanceof h.onnx.NodeProto)return e;var r=new h.onnx.NodeProto;if(e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.NodeProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.NodeProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=String(e.output[n])}if(e.name!=null&&(r.name=String(e.name)),e.opType!=null&&(r.opType=String(e.opType)),e.domain!=null&&(r.domain=String(e.domain)),e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");r.attribute=[];for(var n=0;n<e.attribute.length;++n){if(typeof e.attribute[n]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");r.attribute[n]=h.onnx.AttributeProto.fromObject(e.attribute[n])}}return e.docString!=null&&(r.docString=String(e.docString)),r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.input=[],n.output=[],n.attribute=[]),r.defaults&&(n.name="",n.opType="",n.docString="",n.domain=""),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=e.input[s]}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=e.output[s]}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.opType!=null&&e.hasOwnProperty("opType")&&(n.opType=e.opType),e.attribute&&e.attribute.length){n.attribute=[];for(var s=0;s<e.attribute.length;++s)n.attribute[s]=h.onnx.AttributeProto.toObject(e.attribute[s],r)}return e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.NodeProto"},t}(),a.TrainingInfoProto=function(){function t(o){if(this.initializationBinding=[],this.updateBinding=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.initialization=null,t.prototype.algorithm=null,t.prototype.initializationBinding=g.emptyArray,t.prototype.updateBinding=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.initialization!=null&&Object.hasOwnProperty.call(e,"initialization")&&h.onnx.GraphProto.encode(e.initialization,r.uint32(10).fork()).ldelim(),e.algorithm!=null&&Object.hasOwnProperty.call(e,"algorithm")&&h.onnx.GraphProto.encode(e.algorithm,r.uint32(18).fork()).ldelim(),e.initializationBinding!=null&&e.initializationBinding.length)for(var n=0;n<e.initializationBinding.length;++n)h.onnx.StringStringEntryProto.encode(e.initializationBinding[n],r.uint32(26).fork()).ldelim();if(e.updateBinding!=null&&e.updateBinding.length)for(var n=0;n<e.updateBinding.length;++n)h.onnx.StringStringEntryProto.encode(e.updateBinding[n],r.uint32(34).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.TrainingInfoProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.initialization=h.onnx.GraphProto.decode(e,e.uint32());break}case 2:{s.algorithm=h.onnx.GraphProto.decode(e,e.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(h.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(h.onnx.StringStringEntryProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.initialization!=null&&e.hasOwnProperty("initialization")){var r=h.onnx.GraphProto.verify(e.initialization);if(r)return"initialization."+r}if(e.algorithm!=null&&e.hasOwnProperty("algorithm")){var r=h.onnx.GraphProto.verify(e.algorithm);if(r)return"algorithm."+r}if(e.initializationBinding!=null&&e.hasOwnProperty("initializationBinding")){if(!Array.isArray(e.initializationBinding))return"initializationBinding: array expected";for(var n=0;n<e.initializationBinding.length;++n){var r=h.onnx.StringStringEntryProto.verify(e.initializationBinding[n]);if(r)return"initializationBinding."+r}}if(e.updateBinding!=null&&e.hasOwnProperty("updateBinding")){if(!Array.isArray(e.updateBinding))return"updateBinding: array expected";for(var n=0;n<e.updateBinding.length;++n){var r=h.onnx.StringStringEntryProto.verify(e.updateBinding[n]);if(r)return"updateBinding."+r}}return null},t.fromObject=function(e){if(e instanceof h.onnx.TrainingInfoProto)return e;var r=new h.onnx.TrainingInfoProto;if(e.initialization!=null){if(typeof e.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");r.initialization=h.onnx.GraphProto.fromObject(e.initialization)}if(e.algorithm!=null){if(typeof e.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");r.algorithm=h.onnx.GraphProto.fromObject(e.algorithm)}if(e.initializationBinding){if(!Array.isArray(e.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");r.initializationBinding=[];for(var n=0;n<e.initializationBinding.length;++n){if(typeof e.initializationBinding[n]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");r.initializationBinding[n]=h.onnx.StringStringEntryProto.fromObject(e.initializationBinding[n])}}if(e.updateBinding){if(!Array.isArray(e.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");r.updateBinding=[];for(var n=0;n<e.updateBinding.length;++n){if(typeof e.updateBinding[n]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");r.updateBinding[n]=h.onnx.StringStringEntryProto.fromObject(e.updateBinding[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.initializationBinding=[],n.updateBinding=[]),r.defaults&&(n.initialization=null,n.algorithm=null),e.initialization!=null&&e.hasOwnProperty("initialization")&&(n.initialization=h.onnx.GraphProto.toObject(e.initialization,r)),e.algorithm!=null&&e.hasOwnProperty("algorithm")&&(n.algorithm=h.onnx.GraphProto.toObject(e.algorithm,r)),e.initializationBinding&&e.initializationBinding.length){n.initializationBinding=[];for(var s=0;s<e.initializationBinding.length;++s)n.initializationBinding[s]=h.onnx.StringStringEntryProto.toObject(e.initializationBinding[s],r)}if(e.updateBinding&&e.updateBinding.length){n.updateBinding=[];for(var s=0;s<e.updateBinding.length;++s)n.updateBinding[s]=h.onnx.StringStringEntryProto.toObject(e.updateBinding[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TrainingInfoProto"},t}(),a.ModelProto=function(){function t(o){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.irVersion=g.Long?g.Long.fromBits(0,0,!1):0,t.prototype.opsetImport=g.emptyArray,t.prototype.producerName="",t.prototype.producerVersion="",t.prototype.domain="",t.prototype.modelVersion=g.Long?g.Long.fromBits(0,0,!1):0,t.prototype.docString="",t.prototype.graph=null,t.prototype.metadataProps=g.emptyArray,t.prototype.trainingInfo=g.emptyArray,t.prototype.functions=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.irVersion!=null&&Object.hasOwnProperty.call(e,"irVersion")&&r.uint32(8).int64(e.irVersion),e.producerName!=null&&Object.hasOwnProperty.call(e,"producerName")&&r.uint32(18).string(e.producerName),e.producerVersion!=null&&Object.hasOwnProperty.call(e,"producerVersion")&&r.uint32(26).string(e.producerVersion),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(34).string(e.domain),e.modelVersion!=null&&Object.hasOwnProperty.call(e,"modelVersion")&&r.uint32(40).int64(e.modelVersion),e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(50).string(e.docString),e.graph!=null&&Object.hasOwnProperty.call(e,"graph")&&h.onnx.GraphProto.encode(e.graph,r.uint32(58).fork()).ldelim(),e.opsetImport!=null&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)h.onnx.OperatorSetIdProto.encode(e.opsetImport[n],r.uint32(66).fork()).ldelim();if(e.metadataProps!=null&&e.metadataProps.length)for(var n=0;n<e.metadataProps.length;++n)h.onnx.StringStringEntryProto.encode(e.metadataProps[n],r.uint32(114).fork()).ldelim();if(e.trainingInfo!=null&&e.trainingInfo.length)for(var n=0;n<e.trainingInfo.length;++n)h.onnx.TrainingInfoProto.encode(e.trainingInfo[n],r.uint32(162).fork()).ldelim();if(e.functions!=null&&e.functions.length)for(var n=0;n<e.functions.length;++n)h.onnx.FunctionProto.encode(e.functions[n],r.uint32(202).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.ModelProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.irVersion=e.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(h.onnx.OperatorSetIdProto.decode(e,e.uint32()));break}case 2:{s.producerName=e.string();break}case 3:{s.producerVersion=e.string();break}case 4:{s.domain=e.string();break}case 5:{s.modelVersion=e.int64();break}case 6:{s.docString=e.string();break}case 7:{s.graph=h.onnx.GraphProto.decode(e,e.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(h.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(h.onnx.TrainingInfoProto.decode(e,e.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(h.onnx.FunctionProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.irVersion!=null&&e.hasOwnProperty("irVersion")&&!g.isInteger(e.irVersion)&&!(e.irVersion&&g.isInteger(e.irVersion.low)&&g.isInteger(e.irVersion.high)))return"irVersion: integer|Long expected";if(e.opsetImport!=null&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var r=0;r<e.opsetImport.length;++r){var n=h.onnx.OperatorSetIdProto.verify(e.opsetImport[r]);if(n)return"opsetImport."+n}}if(e.producerName!=null&&e.hasOwnProperty("producerName")&&!g.isString(e.producerName))return"producerName: string expected";if(e.producerVersion!=null&&e.hasOwnProperty("producerVersion")&&!g.isString(e.producerVersion))return"producerVersion: string expected";if(e.domain!=null&&e.hasOwnProperty("domain")&&!g.isString(e.domain))return"domain: string expected";if(e.modelVersion!=null&&e.hasOwnProperty("modelVersion")&&!g.isInteger(e.modelVersion)&&!(e.modelVersion&&g.isInteger(e.modelVersion.low)&&g.isInteger(e.modelVersion.high)))return"modelVersion: integer|Long expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString))return"docString: string expected";if(e.graph!=null&&e.hasOwnProperty("graph")){var n=h.onnx.GraphProto.verify(e.graph);if(n)return"graph."+n}if(e.metadataProps!=null&&e.hasOwnProperty("metadataProps")){if(!Array.isArray(e.metadataProps))return"metadataProps: array expected";for(var r=0;r<e.metadataProps.length;++r){var n=h.onnx.StringStringEntryProto.verify(e.metadataProps[r]);if(n)return"metadataProps."+n}}if(e.trainingInfo!=null&&e.hasOwnProperty("trainingInfo")){if(!Array.isArray(e.trainingInfo))return"trainingInfo: array expected";for(var r=0;r<e.trainingInfo.length;++r){var n=h.onnx.TrainingInfoProto.verify(e.trainingInfo[r]);if(n)return"trainingInfo."+n}}if(e.functions!=null&&e.hasOwnProperty("functions")){if(!Array.isArray(e.functions))return"functions: array expected";for(var r=0;r<e.functions.length;++r){var n=h.onnx.FunctionProto.verify(e.functions[r]);if(n)return"functions."+n}}return null},t.fromObject=function(e){if(e instanceof h.onnx.ModelProto)return e;var r=new h.onnx.ModelProto;if(e.irVersion!=null&&(g.Long?(r.irVersion=g.Long.fromValue(e.irVersion)).unsigned=!1:typeof e.irVersion=="string"?r.irVersion=parseInt(e.irVersion,10):typeof e.irVersion=="number"?r.irVersion=e.irVersion:typeof e.irVersion=="object"&&(r.irVersion=new g.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber())),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if(typeof e.opsetImport[n]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");r.opsetImport[n]=h.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}if(e.producerName!=null&&(r.producerName=String(e.producerName)),e.producerVersion!=null&&(r.producerVersion=String(e.producerVersion)),e.domain!=null&&(r.domain=String(e.domain)),e.modelVersion!=null&&(g.Long?(r.modelVersion=g.Long.fromValue(e.modelVersion)).unsigned=!1:typeof e.modelVersion=="string"?r.modelVersion=parseInt(e.modelVersion,10):typeof e.modelVersion=="number"?r.modelVersion=e.modelVersion:typeof e.modelVersion=="object"&&(r.modelVersion=new g.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber())),e.docString!=null&&(r.docString=String(e.docString)),e.graph!=null){if(typeof e.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");r.graph=h.onnx.GraphProto.fromObject(e.graph)}if(e.metadataProps){if(!Array.isArray(e.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");r.metadataProps=[];for(var n=0;n<e.metadataProps.length;++n){if(typeof e.metadataProps[n]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");r.metadataProps[n]=h.onnx.StringStringEntryProto.fromObject(e.metadataProps[n])}}if(e.trainingInfo){if(!Array.isArray(e.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");r.trainingInfo=[];for(var n=0;n<e.trainingInfo.length;++n){if(typeof e.trainingInfo[n]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");r.trainingInfo[n]=h.onnx.TrainingInfoProto.fromObject(e.trainingInfo[n])}}if(e.functions){if(!Array.isArray(e.functions))throw TypeError(".onnx.ModelProto.functions: array expected");r.functions=[];for(var n=0;n<e.functions.length;++n){if(typeof e.functions[n]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");r.functions[n]=h.onnx.FunctionProto.fromObject(e.functions[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.opsetImport=[],n.metadataProps=[],n.trainingInfo=[],n.functions=[]),r.defaults){if(g.Long){var s=new g.Long(0,0,!1);n.irVersion=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.irVersion=r.longs===String?"0":0;if(n.producerName="",n.producerVersion="",n.domain="",g.Long){var s=new g.Long(0,0,!1);n.modelVersion=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.modelVersion=r.longs===String?"0":0;n.docString="",n.graph=null}if(e.irVersion!=null&&e.hasOwnProperty("irVersion")&&(typeof e.irVersion=="number"?n.irVersion=r.longs===String?String(e.irVersion):e.irVersion:n.irVersion=r.longs===String?g.Long.prototype.toString.call(e.irVersion):r.longs===Number?new g.LongBits(e.irVersion.low>>>0,e.irVersion.high>>>0).toNumber():e.irVersion),e.producerName!=null&&e.hasOwnProperty("producerName")&&(n.producerName=e.producerName),e.producerVersion!=null&&e.hasOwnProperty("producerVersion")&&(n.producerVersion=e.producerVersion),e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.modelVersion!=null&&e.hasOwnProperty("modelVersion")&&(typeof e.modelVersion=="number"?n.modelVersion=r.longs===String?String(e.modelVersion):e.modelVersion:n.modelVersion=r.longs===String?g.Long.prototype.toString.call(e.modelVersion):r.longs===Number?new g.LongBits(e.modelVersion.low>>>0,e.modelVersion.high>>>0).toNumber():e.modelVersion),e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.graph!=null&&e.hasOwnProperty("graph")&&(n.graph=h.onnx.GraphProto.toObject(e.graph,r)),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var i=0;i<e.opsetImport.length;++i)n.opsetImport[i]=h.onnx.OperatorSetIdProto.toObject(e.opsetImport[i],r)}if(e.metadataProps&&e.metadataProps.length){n.metadataProps=[];for(var i=0;i<e.metadataProps.length;++i)n.metadataProps[i]=h.onnx.StringStringEntryProto.toObject(e.metadataProps[i],r)}if(e.trainingInfo&&e.trainingInfo.length){n.trainingInfo=[];for(var i=0;i<e.trainingInfo.length;++i)n.trainingInfo[i]=h.onnx.TrainingInfoProto.toObject(e.trainingInfo[i],r)}if(e.functions&&e.functions.length){n.functions=[];for(var i=0;i<e.functions.length;++i)n.functions[i]=h.onnx.FunctionProto.toObject(e.functions[i],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.ModelProto"},t}(),a.StringStringEntryProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.key="",t.prototype.value="",t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Pe.create()),e.key!=null&&Object.hasOwnProperty.call(e,"key")&&r.uint32(10).string(e.key),e.value!=null&&Object.hasOwnProperty.call(e,"value")&&r.uint32(18).string(e.value),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.StringStringEntryProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.key=e.string();break}case 2:{s.value=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){return typeof e!="object"||e===null?"object expected":e.key!=null&&e.hasOwnProperty("key")&&!g.isString(e.key)?"key: string expected":e.value!=null&&e.hasOwnProperty("value")&&!g.isString(e.value)?"value: string expected":null},t.fromObject=function(e){if(e instanceof h.onnx.StringStringEntryProto)return e;var r=new h.onnx.StringStringEntryProto;return e.key!=null&&(r.key=String(e.key)),e.value!=null&&(r.value=String(e.value)),r},t.toObject=function(e,r){r||(r={});var n={};return r.defaults&&(n.key="",n.value=""),e.key!=null&&e.hasOwnProperty("key")&&(n.key=e.key),e.value!=null&&e.hasOwnProperty("value")&&(n.value=e.value),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.StringStringEntryProto"},t}(),a.TensorAnnotation=function(){function t(o){if(this.quantParameterTensorNames=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.tensorName="",t.prototype.quantParameterTensorNames=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.tensorName!=null&&Object.hasOwnProperty.call(e,"tensorName")&&r.uint32(10).string(e.tensorName),e.quantParameterTensorNames!=null&&e.quantParameterTensorNames.length)for(var n=0;n<e.quantParameterTensorNames.length;++n)h.onnx.StringStringEntryProto.encode(e.quantParameterTensorNames[n],r.uint32(18).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.TensorAnnotation;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.tensorName=e.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(h.onnx.StringStringEntryProto.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.tensorName!=null&&e.hasOwnProperty("tensorName")&&!g.isString(e.tensorName))return"tensorName: string expected";if(e.quantParameterTensorNames!=null&&e.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(e.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var r=0;r<e.quantParameterTensorNames.length;++r){var n=h.onnx.StringStringEntryProto.verify(e.quantParameterTensorNames[r]);if(n)return"quantParameterTensorNames."+n}}return null},t.fromObject=function(e){if(e instanceof h.onnx.TensorAnnotation)return e;var r=new h.onnx.TensorAnnotation;if(e.tensorName!=null&&(r.tensorName=String(e.tensorName)),e.quantParameterTensorNames){if(!Array.isArray(e.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");r.quantParameterTensorNames=[];for(var n=0;n<e.quantParameterTensorNames.length;++n){if(typeof e.quantParameterTensorNames[n]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");r.quantParameterTensorNames[n]=h.onnx.StringStringEntryProto.fromObject(e.quantParameterTensorNames[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.quantParameterTensorNames=[]),r.defaults&&(n.tensorName=""),e.tensorName!=null&&e.hasOwnProperty("tensorName")&&(n.tensorName=e.tensorName),e.quantParameterTensorNames&&e.quantParameterTensorNames.length){n.quantParameterTensorNames=[];for(var s=0;s<e.quantParameterTensorNames.length;++s)n.quantParameterTensorNames[s]=h.onnx.StringStringEntryProto.toObject(e.quantParameterTensorNames[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorAnnotation"},t}(),a.GraphProto=function(){function t(o){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.node=g.emptyArray,t.prototype.name="",t.prototype.initializer=g.emptyArray,t.prototype.sparseInitializer=g.emptyArray,t.prototype.docString="",t.prototype.input=g.emptyArray,t.prototype.output=g.emptyArray,t.prototype.valueInfo=g.emptyArray,t.prototype.quantizationAnnotation=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.node!=null&&e.node.length)for(var n=0;n<e.node.length;++n)h.onnx.NodeProto.encode(e.node[n],r.uint32(10).fork()).ldelim();if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(18).string(e.name),e.initializer!=null&&e.initializer.length)for(var n=0;n<e.initializer.length;++n)h.onnx.TensorProto.encode(e.initializer[n],r.uint32(42).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(82).string(e.docString),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)h.onnx.ValueInfoProto.encode(e.input[n],r.uint32(90).fork()).ldelim();if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)h.onnx.ValueInfoProto.encode(e.output[n],r.uint32(98).fork()).ldelim();if(e.valueInfo!=null&&e.valueInfo.length)for(var n=0;n<e.valueInfo.length;++n)h.onnx.ValueInfoProto.encode(e.valueInfo[n],r.uint32(106).fork()).ldelim();if(e.quantizationAnnotation!=null&&e.quantizationAnnotation.length)for(var n=0;n<e.quantizationAnnotation.length;++n)h.onnx.TensorAnnotation.encode(e.quantizationAnnotation[n],r.uint32(114).fork()).ldelim();if(e.sparseInitializer!=null&&e.sparseInitializer.length)for(var n=0;n<e.sparseInitializer.length;++n)h.onnx.SparseTensorProto.encode(e.sparseInitializer[n],r.uint32(122).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.GraphProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(h.onnx.NodeProto.decode(e,e.uint32()));break}case 2:{s.name=e.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(h.onnx.TensorProto.decode(e,e.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(h.onnx.SparseTensorProto.decode(e,e.uint32()));break}case 10:{s.docString=e.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(h.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(h.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(h.onnx.ValueInfoProto.decode(e,e.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(h.onnx.TensorAnnotation.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.node!=null&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var r=0;r<e.node.length;++r){var n=h.onnx.NodeProto.verify(e.node[r]);if(n)return"node."+n}}if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.initializer!=null&&e.hasOwnProperty("initializer")){if(!Array.isArray(e.initializer))return"initializer: array expected";for(var r=0;r<e.initializer.length;++r){var n=h.onnx.TensorProto.verify(e.initializer[r]);if(n)return"initializer."+n}}if(e.sparseInitializer!=null&&e.hasOwnProperty("sparseInitializer")){if(!Array.isArray(e.sparseInitializer))return"sparseInitializer: array expected";for(var r=0;r<e.sparseInitializer.length;++r){var n=h.onnx.SparseTensorProto.verify(e.sparseInitializer[r]);if(n)return"sparseInitializer."+n}}if(e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString))return"docString: string expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r){var n=h.onnx.ValueInfoProto.verify(e.input[r]);if(n)return"input."+n}}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r){var n=h.onnx.ValueInfoProto.verify(e.output[r]);if(n)return"output."+n}}if(e.valueInfo!=null&&e.hasOwnProperty("valueInfo")){if(!Array.isArray(e.valueInfo))return"valueInfo: array expected";for(var r=0;r<e.valueInfo.length;++r){var n=h.onnx.ValueInfoProto.verify(e.valueInfo[r]);if(n)return"valueInfo."+n}}if(e.quantizationAnnotation!=null&&e.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(e.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var r=0;r<e.quantizationAnnotation.length;++r){var n=h.onnx.TensorAnnotation.verify(e.quantizationAnnotation[r]);if(n)return"quantizationAnnotation."+n}}return null},t.fromObject=function(e){if(e instanceof h.onnx.GraphProto)return e;var r=new h.onnx.GraphProto;if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.GraphProto.node: array expected");r.node=[];for(var n=0;n<e.node.length;++n){if(typeof e.node[n]!="object")throw TypeError(".onnx.GraphProto.node: object expected");r.node[n]=h.onnx.NodeProto.fromObject(e.node[n])}}if(e.name!=null&&(r.name=String(e.name)),e.initializer){if(!Array.isArray(e.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");r.initializer=[];for(var n=0;n<e.initializer.length;++n){if(typeof e.initializer[n]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");r.initializer[n]=h.onnx.TensorProto.fromObject(e.initializer[n])}}if(e.sparseInitializer){if(!Array.isArray(e.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");r.sparseInitializer=[];for(var n=0;n<e.sparseInitializer.length;++n){if(typeof e.sparseInitializer[n]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");r.sparseInitializer[n]=h.onnx.SparseTensorProto.fromObject(e.sparseInitializer[n])}}if(e.docString!=null&&(r.docString=String(e.docString)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.GraphProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n){if(typeof e.input[n]!="object")throw TypeError(".onnx.GraphProto.input: object expected");r.input[n]=h.onnx.ValueInfoProto.fromObject(e.input[n])}}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.GraphProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n){if(typeof e.output[n]!="object")throw TypeError(".onnx.GraphProto.output: object expected");r.output[n]=h.onnx.ValueInfoProto.fromObject(e.output[n])}}if(e.valueInfo){if(!Array.isArray(e.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");r.valueInfo=[];for(var n=0;n<e.valueInfo.length;++n){if(typeof e.valueInfo[n]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");r.valueInfo[n]=h.onnx.ValueInfoProto.fromObject(e.valueInfo[n])}}if(e.quantizationAnnotation){if(!Array.isArray(e.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");r.quantizationAnnotation=[];for(var n=0;n<e.quantizationAnnotation.length;++n){if(typeof e.quantizationAnnotation[n]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");r.quantizationAnnotation[n]=h.onnx.TensorAnnotation.fromObject(e.quantizationAnnotation[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.node=[],n.initializer=[],n.input=[],n.output=[],n.valueInfo=[],n.quantizationAnnotation=[],n.sparseInitializer=[]),r.defaults&&(n.name="",n.docString=""),e.node&&e.node.length){n.node=[];for(var s=0;s<e.node.length;++s)n.node[s]=h.onnx.NodeProto.toObject(e.node[s],r)}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.initializer&&e.initializer.length){n.initializer=[];for(var s=0;s<e.initializer.length;++s)n.initializer[s]=h.onnx.TensorProto.toObject(e.initializer[s],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=h.onnx.ValueInfoProto.toObject(e.input[s],r)}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=h.onnx.ValueInfoProto.toObject(e.output[s],r)}if(e.valueInfo&&e.valueInfo.length){n.valueInfo=[];for(var s=0;s<e.valueInfo.length;++s)n.valueInfo[s]=h.onnx.ValueInfoProto.toObject(e.valueInfo[s],r)}if(e.quantizationAnnotation&&e.quantizationAnnotation.length){n.quantizationAnnotation=[];for(var s=0;s<e.quantizationAnnotation.length;++s)n.quantizationAnnotation[s]=h.onnx.TensorAnnotation.toObject(e.quantizationAnnotation[s],r)}if(e.sparseInitializer&&e.sparseInitializer.length){n.sparseInitializer=[];for(var s=0;s<e.sparseInitializer.length;++s)n.sparseInitializer[s]=h.onnx.SparseTensorProto.toObject(e.sparseInitializer[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.GraphProto"},t}(),a.TensorProto=function(){function t(o){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.dims=g.emptyArray,t.prototype.dataType=0,t.prototype.segment=null,t.prototype.floatData=g.emptyArray,t.prototype.int32Data=g.emptyArray,t.prototype.stringData=g.emptyArray,t.prototype.int64Data=g.emptyArray,t.prototype.name="",t.prototype.docString="",t.prototype.rawData=g.newBuffer([]),t.prototype.externalData=g.emptyArray,t.prototype.dataLocation=0,t.prototype.doubleData=g.emptyArray,t.prototype.uint64Data=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.dims!=null&&e.dims.length){r.uint32(10).fork();for(var n=0;n<e.dims.length;++n)r.int64(e.dims[n]);r.ldelim()}if(e.dataType!=null&&Object.hasOwnProperty.call(e,"dataType")&&r.uint32(16).int32(e.dataType),e.segment!=null&&Object.hasOwnProperty.call(e,"segment")&&h.onnx.TensorProto.Segment.encode(e.segment,r.uint32(26).fork()).ldelim(),e.floatData!=null&&e.floatData.length){r.uint32(34).fork();for(var n=0;n<e.floatData.length;++n)r.float(e.floatData[n]);r.ldelim()}if(e.int32Data!=null&&e.int32Data.length){r.uint32(42).fork();for(var n=0;n<e.int32Data.length;++n)r.int32(e.int32Data[n]);r.ldelim()}if(e.stringData!=null&&e.stringData.length)for(var n=0;n<e.stringData.length;++n)r.uint32(50).bytes(e.stringData[n]);if(e.int64Data!=null&&e.int64Data.length){r.uint32(58).fork();for(var n=0;n<e.int64Data.length;++n)r.int64(e.int64Data[n]);r.ldelim()}if(e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(66).string(e.name),e.rawData!=null&&Object.hasOwnProperty.call(e,"rawData")&&r.uint32(74).bytes(e.rawData),e.doubleData!=null&&e.doubleData.length){r.uint32(82).fork();for(var n=0;n<e.doubleData.length;++n)r.double(e.doubleData[n]);r.ldelim()}if(e.uint64Data!=null&&e.uint64Data.length){r.uint32(90).fork();for(var n=0;n<e.uint64Data.length;++n)r.uint64(e.uint64Data[n]);r.ldelim()}if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(98).string(e.docString),e.externalData!=null&&e.externalData.length)for(var n=0;n<e.externalData.length;++n)h.onnx.StringStringEntryProto.encode(e.externalData[n],r.uint32(106).fork()).ldelim();return e.dataLocation!=null&&Object.hasOwnProperty.call(e,"dataLocation")&&r.uint32(112).int32(e.dataLocation),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.TensorProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.dims.push(e.int64());else s.dims.push(e.int64());break}case 2:{s.dataType=e.int32();break}case 3:{s.segment=h.onnx.TensorProto.Segment.decode(e,e.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.floatData.push(e.float());else s.floatData.push(e.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.int32Data.push(e.int32());else s.int32Data.push(e.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(e.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.int64Data.push(e.int64());else s.int64Data.push(e.int64());break}case 8:{s.name=e.string();break}case 12:{s.docString=e.string();break}case 9:{s.rawData=e.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(h.onnx.StringStringEntryProto.decode(e,e.uint32()));break}case 14:{s.dataLocation=e.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.doubleData.push(e.double());else s.doubleData.push(e.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.uint64Data.push(e.uint64());else s.uint64Data.push(e.uint64());break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.dims!=null&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var r=0;r<e.dims.length;++r)if(!g.isInteger(e.dims[r])&&!(e.dims[r]&&g.isInteger(e.dims[r].low)&&g.isInteger(e.dims[r].high)))return"dims: integer|Long[] expected"}if(e.dataType!=null&&e.hasOwnProperty("dataType")&&!g.isInteger(e.dataType))return"dataType: integer expected";if(e.segment!=null&&e.hasOwnProperty("segment")){var n=h.onnx.TensorProto.Segment.verify(e.segment);if(n)return"segment."+n}if(e.floatData!=null&&e.hasOwnProperty("floatData")){if(!Array.isArray(e.floatData))return"floatData: array expected";for(var r=0;r<e.floatData.length;++r)if(typeof e.floatData[r]!="number")return"floatData: number[] expected"}if(e.int32Data!=null&&e.hasOwnProperty("int32Data")){if(!Array.isArray(e.int32Data))return"int32Data: array expected";for(var r=0;r<e.int32Data.length;++r)if(!g.isInteger(e.int32Data[r]))return"int32Data: integer[] expected"}if(e.stringData!=null&&e.hasOwnProperty("stringData")){if(!Array.isArray(e.stringData))return"stringData: array expected";for(var r=0;r<e.stringData.length;++r)if(!(e.stringData[r]&&typeof e.stringData[r].length=="number"||g.isString(e.stringData[r])))return"stringData: buffer[] expected"}if(e.int64Data!=null&&e.hasOwnProperty("int64Data")){if(!Array.isArray(e.int64Data))return"int64Data: array expected";for(var r=0;r<e.int64Data.length;++r)if(!g.isInteger(e.int64Data[r])&&!(e.int64Data[r]&&g.isInteger(e.int64Data[r].low)&&g.isInteger(e.int64Data[r].high)))return"int64Data: integer|Long[] expected"}if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString))return"docString: string expected";if(e.rawData!=null&&e.hasOwnProperty("rawData")&&!(e.rawData&&typeof e.rawData.length=="number"||g.isString(e.rawData)))return"rawData: buffer expected";if(e.externalData!=null&&e.hasOwnProperty("externalData")){if(!Array.isArray(e.externalData))return"externalData: array expected";for(var r=0;r<e.externalData.length;++r){var n=h.onnx.StringStringEntryProto.verify(e.externalData[r]);if(n)return"externalData."+n}}if(e.dataLocation!=null&&e.hasOwnProperty("dataLocation"))switch(e.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(e.doubleData!=null&&e.hasOwnProperty("doubleData")){if(!Array.isArray(e.doubleData))return"doubleData: array expected";for(var r=0;r<e.doubleData.length;++r)if(typeof e.doubleData[r]!="number")return"doubleData: number[] expected"}if(e.uint64Data!=null&&e.hasOwnProperty("uint64Data")){if(!Array.isArray(e.uint64Data))return"uint64Data: array expected";for(var r=0;r<e.uint64Data.length;++r)if(!g.isInteger(e.uint64Data[r])&&!(e.uint64Data[r]&&g.isInteger(e.uint64Data[r].low)&&g.isInteger(e.uint64Data[r].high)))return"uint64Data: integer|Long[] expected"}return null},t.fromObject=function(e){if(e instanceof h.onnx.TensorProto)return e;var r=new h.onnx.TensorProto;if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.TensorProto.dims: array expected");r.dims=[];for(var n=0;n<e.dims.length;++n)g.Long?(r.dims[n]=g.Long.fromValue(e.dims[n])).unsigned=!1:typeof e.dims[n]=="string"?r.dims[n]=parseInt(e.dims[n],10):typeof e.dims[n]=="number"?r.dims[n]=e.dims[n]:typeof e.dims[n]=="object"&&(r.dims[n]=new g.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}if(e.dataType!=null&&(r.dataType=e.dataType|0),e.segment!=null){if(typeof e.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");r.segment=h.onnx.TensorProto.Segment.fromObject(e.segment)}if(e.floatData){if(!Array.isArray(e.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");r.floatData=[];for(var n=0;n<e.floatData.length;++n)r.floatData[n]=Number(e.floatData[n])}if(e.int32Data){if(!Array.isArray(e.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");r.int32Data=[];for(var n=0;n<e.int32Data.length;++n)r.int32Data[n]=e.int32Data[n]|0}if(e.stringData){if(!Array.isArray(e.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");r.stringData=[];for(var n=0;n<e.stringData.length;++n)typeof e.stringData[n]=="string"?g.base64.decode(e.stringData[n],r.stringData[n]=g.newBuffer(g.base64.length(e.stringData[n])),0):e.stringData[n].length>=0&&(r.stringData[n]=e.stringData[n])}if(e.int64Data){if(!Array.isArray(e.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");r.int64Data=[];for(var n=0;n<e.int64Data.length;++n)g.Long?(r.int64Data[n]=g.Long.fromValue(e.int64Data[n])).unsigned=!1:typeof e.int64Data[n]=="string"?r.int64Data[n]=parseInt(e.int64Data[n],10):typeof e.int64Data[n]=="number"?r.int64Data[n]=e.int64Data[n]:typeof e.int64Data[n]=="object"&&(r.int64Data[n]=new g.LongBits(e.int64Data[n].low>>>0,e.int64Data[n].high>>>0).toNumber())}if(e.name!=null&&(r.name=String(e.name)),e.docString!=null&&(r.docString=String(e.docString)),e.rawData!=null&&(typeof e.rawData=="string"?g.base64.decode(e.rawData,r.rawData=g.newBuffer(g.base64.length(e.rawData)),0):e.rawData.length>=0&&(r.rawData=e.rawData)),e.externalData){if(!Array.isArray(e.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");r.externalData=[];for(var n=0;n<e.externalData.length;++n){if(typeof e.externalData[n]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");r.externalData[n]=h.onnx.StringStringEntryProto.fromObject(e.externalData[n])}}switch(e.dataLocation){default:if(typeof e.dataLocation=="number"){r.dataLocation=e.dataLocation;break}break;case"DEFAULT":case 0:r.dataLocation=0;break;case"EXTERNAL":case 1:r.dataLocation=1;break}if(e.doubleData){if(!Array.isArray(e.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");r.doubleData=[];for(var n=0;n<e.doubleData.length;++n)r.doubleData[n]=Number(e.doubleData[n])}if(e.uint64Data){if(!Array.isArray(e.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");r.uint64Data=[];for(var n=0;n<e.uint64Data.length;++n)g.Long?(r.uint64Data[n]=g.Long.fromValue(e.uint64Data[n])).unsigned=!0:typeof e.uint64Data[n]=="string"?r.uint64Data[n]=parseInt(e.uint64Data[n],10):typeof e.uint64Data[n]=="number"?r.uint64Data[n]=e.uint64Data[n]:typeof e.uint64Data[n]=="object"&&(r.uint64Data[n]=new g.LongBits(e.uint64Data[n].low>>>0,e.uint64Data[n].high>>>0).toNumber(!0))}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dims=[],n.floatData=[],n.int32Data=[],n.stringData=[],n.int64Data=[],n.doubleData=[],n.uint64Data=[],n.externalData=[]),r.defaults&&(n.dataType=0,n.segment=null,n.name="",r.bytes===String?n.rawData="":(n.rawData=[],r.bytes!==Array&&(n.rawData=g.newBuffer(n.rawData))),n.docString="",n.dataLocation=r.enums===String?"DEFAULT":0),e.dims&&e.dims.length){n.dims=[];for(var s=0;s<e.dims.length;++s)typeof e.dims[s]=="number"?n.dims[s]=r.longs===String?String(e.dims[s]):e.dims[s]:n.dims[s]=r.longs===String?g.Long.prototype.toString.call(e.dims[s]):r.longs===Number?new g.LongBits(e.dims[s].low>>>0,e.dims[s].high>>>0).toNumber():e.dims[s]}if(e.dataType!=null&&e.hasOwnProperty("dataType")&&(n.dataType=e.dataType),e.segment!=null&&e.hasOwnProperty("segment")&&(n.segment=h.onnx.TensorProto.Segment.toObject(e.segment,r)),e.floatData&&e.floatData.length){n.floatData=[];for(var s=0;s<e.floatData.length;++s)n.floatData[s]=r.json&&!isFinite(e.floatData[s])?String(e.floatData[s]):e.floatData[s]}if(e.int32Data&&e.int32Data.length){n.int32Data=[];for(var s=0;s<e.int32Data.length;++s)n.int32Data[s]=e.int32Data[s]}if(e.stringData&&e.stringData.length){n.stringData=[];for(var s=0;s<e.stringData.length;++s)n.stringData[s]=r.bytes===String?g.base64.encode(e.stringData[s],0,e.stringData[s].length):r.bytes===Array?Array.prototype.slice.call(e.stringData[s]):e.stringData[s]}if(e.int64Data&&e.int64Data.length){n.int64Data=[];for(var s=0;s<e.int64Data.length;++s)typeof e.int64Data[s]=="number"?n.int64Data[s]=r.longs===String?String(e.int64Data[s]):e.int64Data[s]:n.int64Data[s]=r.longs===String?g.Long.prototype.toString.call(e.int64Data[s]):r.longs===Number?new g.LongBits(e.int64Data[s].low>>>0,e.int64Data[s].high>>>0).toNumber():e.int64Data[s]}if(e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.rawData!=null&&e.hasOwnProperty("rawData")&&(n.rawData=r.bytes===String?g.base64.encode(e.rawData,0,e.rawData.length):r.bytes===Array?Array.prototype.slice.call(e.rawData):e.rawData),e.doubleData&&e.doubleData.length){n.doubleData=[];for(var s=0;s<e.doubleData.length;++s)n.doubleData[s]=r.json&&!isFinite(e.doubleData[s])?String(e.doubleData[s]):e.doubleData[s]}if(e.uint64Data&&e.uint64Data.length){n.uint64Data=[];for(var s=0;s<e.uint64Data.length;++s)typeof e.uint64Data[s]=="number"?n.uint64Data[s]=r.longs===String?String(e.uint64Data[s]):e.uint64Data[s]:n.uint64Data[s]=r.longs===String?g.Long.prototype.toString.call(e.uint64Data[s]):r.longs===Number?new g.LongBits(e.uint64Data[s].low>>>0,e.uint64Data[s].high>>>0).toNumber(!0):e.uint64Data[s]}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.externalData&&e.externalData.length){n.externalData=[];for(var s=0;s<e.externalData.length;++s)n.externalData[s]=h.onnx.StringStringEntryProto.toObject(e.externalData[s],r)}return e.dataLocation!=null&&e.hasOwnProperty("dataLocation")&&(n.dataLocation=r.enums===String?h.onnx.TensorProto.DataLocation[e.dataLocation]===void 0?e.dataLocation:h.onnx.TensorProto.DataLocation[e.dataLocation]:e.dataLocation),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorProto"},t.DataType=function(){var o={},e=Object.create(o);return e[o[0]="UNDEFINED"]=0,e[o[1]="FLOAT"]=1,e[o[2]="UINT8"]=2,e[o[3]="INT8"]=3,e[o[4]="UINT16"]=4,e[o[5]="INT16"]=5,e[o[6]="INT32"]=6,e[o[7]="INT64"]=7,e[o[8]="STRING"]=8,e[o[9]="BOOL"]=9,e[o[10]="FLOAT16"]=10,e[o[11]="DOUBLE"]=11,e[o[12]="UINT32"]=12,e[o[13]="UINT64"]=13,e[o[14]="COMPLEX64"]=14,e[o[15]="COMPLEX128"]=15,e[o[16]="BFLOAT16"]=16,e[o[17]="FLOAT8E4M3FN"]=17,e[o[18]="FLOAT8E4M3FNUZ"]=18,e[o[19]="FLOAT8E5M2"]=19,e[o[20]="FLOAT8E5M2FNUZ"]=20,e}(),t.Segment=function(){function o(e){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)e[r[n]]!=null&&(this[r[n]]=e[r[n]])}return o.prototype.begin=g.Long?g.Long.fromBits(0,0,!1):0,o.prototype.end=g.Long?g.Long.fromBits(0,0,!1):0,o.create=function(r){return new o(r)},o.encode=function(r,n){return n||(n=Pe.create()),r.begin!=null&&Object.hasOwnProperty.call(r,"begin")&&n.uint32(8).int64(r.begin),r.end!=null&&Object.hasOwnProperty.call(r,"end")&&n.uint32(16).int64(r.end),n},o.encodeDelimited=function(r,n){return this.encode(r,n).ldelim()},o.decode=function(r,n){r instanceof N||(r=N.create(r));for(var s=n===void 0?r.len:r.pos+n,i=new h.onnx.TensorProto.Segment;r.pos<s;){var u=r.uint32();switch(u>>>3){case 1:{i.begin=r.int64();break}case 2:{i.end=r.int64();break}default:r.skipType(u&7);break}}return i},o.decodeDelimited=function(r){return r instanceof N||(r=new N(r)),this.decode(r,r.uint32())},o.verify=function(r){return typeof r!="object"||r===null?"object expected":r.begin!=null&&r.hasOwnProperty("begin")&&!g.isInteger(r.begin)&&!(r.begin&&g.isInteger(r.begin.low)&&g.isInteger(r.begin.high))?"begin: integer|Long expected":r.end!=null&&r.hasOwnProperty("end")&&!g.isInteger(r.end)&&!(r.end&&g.isInteger(r.end.low)&&g.isInteger(r.end.high))?"end: integer|Long expected":null},o.fromObject=function(r){if(r instanceof h.onnx.TensorProto.Segment)return r;var n=new h.onnx.TensorProto.Segment;return r.begin!=null&&(g.Long?(n.begin=g.Long.fromValue(r.begin)).unsigned=!1:typeof r.begin=="string"?n.begin=parseInt(r.begin,10):typeof r.begin=="number"?n.begin=r.begin:typeof r.begin=="object"&&(n.begin=new g.LongBits(r.begin.low>>>0,r.begin.high>>>0).toNumber())),r.end!=null&&(g.Long?(n.end=g.Long.fromValue(r.end)).unsigned=!1:typeof r.end=="string"?n.end=parseInt(r.end,10):typeof r.end=="number"?n.end=r.end:typeof r.end=="object"&&(n.end=new g.LongBits(r.end.low>>>0,r.end.high>>>0).toNumber())),n},o.toObject=function(r,n){n||(n={});var s={};if(n.defaults){if(g.Long){var i=new g.Long(0,0,!1);s.begin=n.longs===String?i.toString():n.longs===Number?i.toNumber():i}else s.begin=n.longs===String?"0":0;if(g.Long){var i=new g.Long(0,0,!1);s.end=n.longs===String?i.toString():n.longs===Number?i.toNumber():i}else s.end=n.longs===String?"0":0}return r.begin!=null&&r.hasOwnProperty("begin")&&(typeof r.begin=="number"?s.begin=n.longs===String?String(r.begin):r.begin:s.begin=n.longs===String?g.Long.prototype.toString.call(r.begin):n.longs===Number?new g.LongBits(r.begin.low>>>0,r.begin.high>>>0).toNumber():r.begin),r.end!=null&&r.hasOwnProperty("end")&&(typeof r.end=="number"?s.end=n.longs===String?String(r.end):r.end:s.end=n.longs===String?g.Long.prototype.toString.call(r.end):n.longs===Number?new g.LongBits(r.end.low>>>0,r.end.high>>>0).toNumber():r.end),s},o.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},o.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TensorProto.Segment"},o}(),t.DataLocation=function(){var o={},e=Object.create(o);return e[o[0]="DEFAULT"]=0,e[o[1]="EXTERNAL"]=1,e}(),t}(),a.SparseTensorProto=function(){function t(o){if(this.dims=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.values=null,t.prototype.indices=null,t.prototype.dims=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.values!=null&&Object.hasOwnProperty.call(e,"values")&&h.onnx.TensorProto.encode(e.values,r.uint32(10).fork()).ldelim(),e.indices!=null&&Object.hasOwnProperty.call(e,"indices")&&h.onnx.TensorProto.encode(e.indices,r.uint32(18).fork()).ldelim(),e.dims!=null&&e.dims.length){r.uint32(26).fork();for(var n=0;n<e.dims.length;++n)r.int64(e.dims[n]);r.ldelim()}return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.SparseTensorProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.values=h.onnx.TensorProto.decode(e,e.uint32());break}case 2:{s.indices=h.onnx.TensorProto.decode(e,e.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(i&7)===2)for(var u=e.uint32()+e.pos;e.pos<u;)s.dims.push(e.int64());else s.dims.push(e.int64());break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.values!=null&&e.hasOwnProperty("values")){var r=h.onnx.TensorProto.verify(e.values);if(r)return"values."+r}if(e.indices!=null&&e.hasOwnProperty("indices")){var r=h.onnx.TensorProto.verify(e.indices);if(r)return"indices."+r}if(e.dims!=null&&e.hasOwnProperty("dims")){if(!Array.isArray(e.dims))return"dims: array expected";for(var n=0;n<e.dims.length;++n)if(!g.isInteger(e.dims[n])&&!(e.dims[n]&&g.isInteger(e.dims[n].low)&&g.isInteger(e.dims[n].high)))return"dims: integer|Long[] expected"}return null},t.fromObject=function(e){if(e instanceof h.onnx.SparseTensorProto)return e;var r=new h.onnx.SparseTensorProto;if(e.values!=null){if(typeof e.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");r.values=h.onnx.TensorProto.fromObject(e.values)}if(e.indices!=null){if(typeof e.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");r.indices=h.onnx.TensorProto.fromObject(e.indices)}if(e.dims){if(!Array.isArray(e.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");r.dims=[];for(var n=0;n<e.dims.length;++n)g.Long?(r.dims[n]=g.Long.fromValue(e.dims[n])).unsigned=!1:typeof e.dims[n]=="string"?r.dims[n]=parseInt(e.dims[n],10):typeof e.dims[n]=="number"?r.dims[n]=e.dims[n]:typeof e.dims[n]=="object"&&(r.dims[n]=new g.LongBits(e.dims[n].low>>>0,e.dims[n].high>>>0).toNumber())}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dims=[]),r.defaults&&(n.values=null,n.indices=null),e.values!=null&&e.hasOwnProperty("values")&&(n.values=h.onnx.TensorProto.toObject(e.values,r)),e.indices!=null&&e.hasOwnProperty("indices")&&(n.indices=h.onnx.TensorProto.toObject(e.indices,r)),e.dims&&e.dims.length){n.dims=[];for(var s=0;s<e.dims.length;++s)typeof e.dims[s]=="number"?n.dims[s]=r.longs===String?String(e.dims[s]):e.dims[s]:n.dims[s]=r.longs===String?g.Long.prototype.toString.call(e.dims[s]):r.longs===Number?new g.LongBits(e.dims[s].low>>>0,e.dims[s].high>>>0).toNumber():e.dims[s]}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.SparseTensorProto"},t}(),a.TensorShapeProto=function(){function t(o){if(this.dim=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.dim=g.emptyArray,t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.dim!=null&&e.dim.length)for(var n=0;n<e.dim.length;++n)h.onnx.TensorShapeProto.Dimension.encode(e.dim[n],r.uint32(10).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.TensorShapeProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(h.onnx.TensorShapeProto.Dimension.decode(e,e.uint32()));break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.dim!=null&&e.hasOwnProperty("dim")){if(!Array.isArray(e.dim))return"dim: array expected";for(var r=0;r<e.dim.length;++r){var n=h.onnx.TensorShapeProto.Dimension.verify(e.dim[r]);if(n)return"dim."+n}}return null},t.fromObject=function(e){if(e instanceof h.onnx.TensorShapeProto)return e;var r=new h.onnx.TensorShapeProto;if(e.dim){if(!Array.isArray(e.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");r.dim=[];for(var n=0;n<e.dim.length;++n){if(typeof e.dim[n]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");r.dim[n]=h.onnx.TensorShapeProto.Dimension.fromObject(e.dim[n])}}return r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.dim=[]),e.dim&&e.dim.length){n.dim=[];for(var s=0;s<e.dim.length;++s)n.dim[s]=h.onnx.TensorShapeProto.Dimension.toObject(e.dim[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.TensorShapeProto"},t.Dimension=function(){function o(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}o.prototype.dimValue=null,o.prototype.dimParam=null,o.prototype.denotation="";var e;return Object.defineProperty(o.prototype,"value",{get:g.oneOfGetter(e=["dimValue","dimParam"]),set:g.oneOfSetter(e)}),o.create=function(n){return new o(n)},o.encode=function(n,s){return s||(s=Pe.create()),n.dimValue!=null&&Object.hasOwnProperty.call(n,"dimValue")&&s.uint32(8).int64(n.dimValue),n.dimParam!=null&&Object.hasOwnProperty.call(n,"dimParam")&&s.uint32(18).string(n.dimParam),n.denotation!=null&&Object.hasOwnProperty.call(n,"denotation")&&s.uint32(26).string(n.denotation),s},o.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},o.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TensorShapeProto.Dimension;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.dimValue=n.int64();break}case 2:{u.dimParam=n.string();break}case 3:{u.denotation=n.string();break}default:n.skipType(l&7);break}}return u},o.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},o.verify=function(n){if(typeof n!="object"||n===null)return"object expected";var s={};if(n.dimValue!=null&&n.hasOwnProperty("dimValue")&&(s.value=1,!g.isInteger(n.dimValue)&&!(n.dimValue&&g.isInteger(n.dimValue.low)&&g.isInteger(n.dimValue.high))))return"dimValue: integer|Long expected";if(n.dimParam!=null&&n.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!g.isString(n.dimParam))return"dimParam: string expected"}return n.denotation!=null&&n.hasOwnProperty("denotation")&&!g.isString(n.denotation)?"denotation: string expected":null},o.fromObject=function(n){if(n instanceof h.onnx.TensorShapeProto.Dimension)return n;var s=new h.onnx.TensorShapeProto.Dimension;return n.dimValue!=null&&(g.Long?(s.dimValue=g.Long.fromValue(n.dimValue)).unsigned=!1:typeof n.dimValue=="string"?s.dimValue=parseInt(n.dimValue,10):typeof n.dimValue=="number"?s.dimValue=n.dimValue:typeof n.dimValue=="object"&&(s.dimValue=new g.LongBits(n.dimValue.low>>>0,n.dimValue.high>>>0).toNumber())),n.dimParam!=null&&(s.dimParam=String(n.dimParam)),n.denotation!=null&&(s.denotation=String(n.denotation)),s},o.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.denotation=""),n.dimValue!=null&&n.hasOwnProperty("dimValue")&&(typeof n.dimValue=="number"?i.dimValue=s.longs===String?String(n.dimValue):n.dimValue:i.dimValue=s.longs===String?g.Long.prototype.toString.call(n.dimValue):s.longs===Number?new g.LongBits(n.dimValue.low>>>0,n.dimValue.high>>>0).toNumber():n.dimValue,s.oneofs&&(i.value="dimValue")),n.dimParam!=null&&n.hasOwnProperty("dimParam")&&(i.dimParam=n.dimParam,s.oneofs&&(i.value="dimParam")),n.denotation!=null&&n.hasOwnProperty("denotation")&&(i.denotation=n.denotation),i},o.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},o.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TensorShapeProto.Dimension"},o}(),t}(),a.TypeProto=function(){function t(e){if(e)for(var r=Object.keys(e),n=0;n<r.length;++n)e[r[n]]!=null&&(this[r[n]]=e[r[n]])}t.prototype.tensorType=null,t.prototype.sequenceType=null,t.prototype.mapType=null,t.prototype.optionalType=null,t.prototype.sparseTensorType=null,t.prototype.denotation="";var o;return Object.defineProperty(t.prototype,"value",{get:g.oneOfGetter(o=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:g.oneOfSetter(o)}),t.create=function(r){return new t(r)},t.encode=function(r,n){return n||(n=Pe.create()),r.tensorType!=null&&Object.hasOwnProperty.call(r,"tensorType")&&h.onnx.TypeProto.Tensor.encode(r.tensorType,n.uint32(10).fork()).ldelim(),r.sequenceType!=null&&Object.hasOwnProperty.call(r,"sequenceType")&&h.onnx.TypeProto.Sequence.encode(r.sequenceType,n.uint32(34).fork()).ldelim(),r.mapType!=null&&Object.hasOwnProperty.call(r,"mapType")&&h.onnx.TypeProto.Map.encode(r.mapType,n.uint32(42).fork()).ldelim(),r.denotation!=null&&Object.hasOwnProperty.call(r,"denotation")&&n.uint32(50).string(r.denotation),r.sparseTensorType!=null&&Object.hasOwnProperty.call(r,"sparseTensorType")&&h.onnx.TypeProto.SparseTensor.encode(r.sparseTensorType,n.uint32(66).fork()).ldelim(),r.optionalType!=null&&Object.hasOwnProperty.call(r,"optionalType")&&h.onnx.TypeProto.Optional.encode(r.optionalType,n.uint32(74).fork()).ldelim(),n},t.encodeDelimited=function(r,n){return this.encode(r,n).ldelim()},t.decode=function(r,n){r instanceof N||(r=N.create(r));for(var s=n===void 0?r.len:r.pos+n,i=new h.onnx.TypeProto;r.pos<s;){var u=r.uint32();switch(u>>>3){case 1:{i.tensorType=h.onnx.TypeProto.Tensor.decode(r,r.uint32());break}case 4:{i.sequenceType=h.onnx.TypeProto.Sequence.decode(r,r.uint32());break}case 5:{i.mapType=h.onnx.TypeProto.Map.decode(r,r.uint32());break}case 9:{i.optionalType=h.onnx.TypeProto.Optional.decode(r,r.uint32());break}case 8:{i.sparseTensorType=h.onnx.TypeProto.SparseTensor.decode(r,r.uint32());break}case 6:{i.denotation=r.string();break}default:r.skipType(u&7);break}}return i},t.decodeDelimited=function(r){return r instanceof N||(r=new N(r)),this.decode(r,r.uint32())},t.verify=function(r){if(typeof r!="object"||r===null)return"object expected";var n={};if(r.tensorType!=null&&r.hasOwnProperty("tensorType")){n.value=1;{var s=h.onnx.TypeProto.Tensor.verify(r.tensorType);if(s)return"tensorType."+s}}if(r.sequenceType!=null&&r.hasOwnProperty("sequenceType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=h.onnx.TypeProto.Sequence.verify(r.sequenceType);if(s)return"sequenceType."+s}}if(r.mapType!=null&&r.hasOwnProperty("mapType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=h.onnx.TypeProto.Map.verify(r.mapType);if(s)return"mapType."+s}}if(r.optionalType!=null&&r.hasOwnProperty("optionalType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=h.onnx.TypeProto.Optional.verify(r.optionalType);if(s)return"optionalType."+s}}if(r.sparseTensorType!=null&&r.hasOwnProperty("sparseTensorType")){if(n.value===1)return"value: multiple values";n.value=1;{var s=h.onnx.TypeProto.SparseTensor.verify(r.sparseTensorType);if(s)return"sparseTensorType."+s}}return r.denotation!=null&&r.hasOwnProperty("denotation")&&!g.isString(r.denotation)?"denotation: string expected":null},t.fromObject=function(r){if(r instanceof h.onnx.TypeProto)return r;var n=new h.onnx.TypeProto;if(r.tensorType!=null){if(typeof r.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");n.tensorType=h.onnx.TypeProto.Tensor.fromObject(r.tensorType)}if(r.sequenceType!=null){if(typeof r.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");n.sequenceType=h.onnx.TypeProto.Sequence.fromObject(r.sequenceType)}if(r.mapType!=null){if(typeof r.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");n.mapType=h.onnx.TypeProto.Map.fromObject(r.mapType)}if(r.optionalType!=null){if(typeof r.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");n.optionalType=h.onnx.TypeProto.Optional.fromObject(r.optionalType)}if(r.sparseTensorType!=null){if(typeof r.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");n.sparseTensorType=h.onnx.TypeProto.SparseTensor.fromObject(r.sparseTensorType)}return r.denotation!=null&&(n.denotation=String(r.denotation)),n},t.toObject=function(r,n){n||(n={});var s={};return n.defaults&&(s.denotation=""),r.tensorType!=null&&r.hasOwnProperty("tensorType")&&(s.tensorType=h.onnx.TypeProto.Tensor.toObject(r.tensorType,n),n.oneofs&&(s.value="tensorType")),r.sequenceType!=null&&r.hasOwnProperty("sequenceType")&&(s.sequenceType=h.onnx.TypeProto.Sequence.toObject(r.sequenceType,n),n.oneofs&&(s.value="sequenceType")),r.mapType!=null&&r.hasOwnProperty("mapType")&&(s.mapType=h.onnx.TypeProto.Map.toObject(r.mapType,n),n.oneofs&&(s.value="mapType")),r.denotation!=null&&r.hasOwnProperty("denotation")&&(s.denotation=r.denotation),r.sparseTensorType!=null&&r.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=h.onnx.TypeProto.SparseTensor.toObject(r.sparseTensorType,n),n.oneofs&&(s.value="sparseTensorType")),r.optionalType!=null&&r.hasOwnProperty("optionalType")&&(s.optionalType=h.onnx.TypeProto.Optional.toObject(r.optionalType,n),n.oneofs&&(s.value="optionalType")),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(r){return r===void 0&&(r="type.googleapis.com"),r+"/onnx.TypeProto"},t.Tensor=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Pe.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&s.uint32(8).int32(n.elemType),n.shape!=null&&Object.hasOwnProperty.call(n,"shape")&&h.onnx.TensorShapeProto.encode(n.shape,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TypeProto.Tensor;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=n.int32();break}case 2:{u.shape=h.onnx.TensorShapeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")&&!g.isInteger(n.elemType))return"elemType: integer expected";if(n.shape!=null&&n.hasOwnProperty("shape")){var s=h.onnx.TensorShapeProto.verify(n.shape);if(s)return"shape."+s}return null},e.fromObject=function(n){if(n instanceof h.onnx.TypeProto.Tensor)return n;var s=new h.onnx.TypeProto.Tensor;if(n.elemType!=null&&(s.elemType=n.elemType|0),n.shape!=null){if(typeof n.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=h.onnx.TensorShapeProto.fromObject(n.shape)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=0,i.shape=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=n.elemType),n.shape!=null&&n.hasOwnProperty("shape")&&(i.shape=h.onnx.TensorShapeProto.toObject(n.shape,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Tensor"},e}(),t.Sequence=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Pe.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&h.onnx.TypeProto.encode(n.elemType,s.uint32(10).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TypeProto.Sequence;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=h.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")){var s=h.onnx.TypeProto.verify(n.elemType);if(s)return"elemType."+s}return null},e.fromObject=function(n){if(n instanceof h.onnx.TypeProto.Sequence)return n;var s=new h.onnx.TypeProto.Sequence;if(n.elemType!=null){if(typeof n.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=h.onnx.TypeProto.fromObject(n.elemType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=h.onnx.TypeProto.toObject(n.elemType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Sequence"},e}(),t.Map=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.keyType=0,e.prototype.valueType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Pe.create()),n.keyType!=null&&Object.hasOwnProperty.call(n,"keyType")&&s.uint32(8).int32(n.keyType),n.valueType!=null&&Object.hasOwnProperty.call(n,"valueType")&&h.onnx.TypeProto.encode(n.valueType,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TypeProto.Map;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.keyType=n.int32();break}case 2:{u.valueType=h.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.keyType!=null&&n.hasOwnProperty("keyType")&&!g.isInteger(n.keyType))return"keyType: integer expected";if(n.valueType!=null&&n.hasOwnProperty("valueType")){var s=h.onnx.TypeProto.verify(n.valueType);if(s)return"valueType."+s}return null},e.fromObject=function(n){if(n instanceof h.onnx.TypeProto.Map)return n;var s=new h.onnx.TypeProto.Map;if(n.keyType!=null&&(s.keyType=n.keyType|0),n.valueType!=null){if(typeof n.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=h.onnx.TypeProto.fromObject(n.valueType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.keyType=0,i.valueType=null),n.keyType!=null&&n.hasOwnProperty("keyType")&&(i.keyType=n.keyType),n.valueType!=null&&n.hasOwnProperty("valueType")&&(i.valueType=h.onnx.TypeProto.toObject(n.valueType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Map"},e}(),t.Optional=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Pe.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&h.onnx.TypeProto.encode(n.elemType,s.uint32(10).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TypeProto.Optional;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=h.onnx.TypeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")){var s=h.onnx.TypeProto.verify(n.elemType);if(s)return"elemType."+s}return null},e.fromObject=function(n){if(n instanceof h.onnx.TypeProto.Optional)return n;var s=new h.onnx.TypeProto.Optional;if(n.elemType!=null){if(typeof n.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=h.onnx.TypeProto.fromObject(n.elemType)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=h.onnx.TypeProto.toObject(n.elemType,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.Optional"},e}(),t.SparseTensor=function(){function e(r){if(r)for(var n=Object.keys(r),s=0;s<n.length;++s)r[n[s]]!=null&&(this[n[s]]=r[n[s]])}return e.prototype.elemType=0,e.prototype.shape=null,e.create=function(n){return new e(n)},e.encode=function(n,s){return s||(s=Pe.create()),n.elemType!=null&&Object.hasOwnProperty.call(n,"elemType")&&s.uint32(8).int32(n.elemType),n.shape!=null&&Object.hasOwnProperty.call(n,"shape")&&h.onnx.TensorShapeProto.encode(n.shape,s.uint32(18).fork()).ldelim(),s},e.encodeDelimited=function(n,s){return this.encode(n,s).ldelim()},e.decode=function(n,s){n instanceof N||(n=N.create(n));for(var i=s===void 0?n.len:n.pos+s,u=new h.onnx.TypeProto.SparseTensor;n.pos<i;){var l=n.uint32();switch(l>>>3){case 1:{u.elemType=n.int32();break}case 2:{u.shape=h.onnx.TensorShapeProto.decode(n,n.uint32());break}default:n.skipType(l&7);break}}return u},e.decodeDelimited=function(n){return n instanceof N||(n=new N(n)),this.decode(n,n.uint32())},e.verify=function(n){if(typeof n!="object"||n===null)return"object expected";if(n.elemType!=null&&n.hasOwnProperty("elemType")&&!g.isInteger(n.elemType))return"elemType: integer expected";if(n.shape!=null&&n.hasOwnProperty("shape")){var s=h.onnx.TensorShapeProto.verify(n.shape);if(s)return"shape."+s}return null},e.fromObject=function(n){if(n instanceof h.onnx.TypeProto.SparseTensor)return n;var s=new h.onnx.TypeProto.SparseTensor;if(n.elemType!=null&&(s.elemType=n.elemType|0),n.shape!=null){if(typeof n.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=h.onnx.TensorShapeProto.fromObject(n.shape)}return s},e.toObject=function(n,s){s||(s={});var i={};return s.defaults&&(i.elemType=0,i.shape=null),n.elemType!=null&&n.hasOwnProperty("elemType")&&(i.elemType=n.elemType),n.shape!=null&&n.hasOwnProperty("shape")&&(i.shape=h.onnx.TensorShapeProto.toObject(n.shape,s)),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},e.getTypeUrl=function(n){return n===void 0&&(n="type.googleapis.com"),n+"/onnx.TypeProto.SparseTensor"},e}(),t}(),a.OperatorSetIdProto=function(){function t(o){if(o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.domain="",t.prototype.version=g.Long?g.Long.fromBits(0,0,!1):0,t.create=function(e){return new t(e)},t.encode=function(e,r){return r||(r=Pe.create()),e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(10).string(e.domain),e.version!=null&&Object.hasOwnProperty.call(e,"version")&&r.uint32(16).int64(e.version),r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.OperatorSetIdProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.domain=e.string();break}case 2:{s.version=e.int64();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){return typeof e!="object"||e===null?"object expected":e.domain!=null&&e.hasOwnProperty("domain")&&!g.isString(e.domain)?"domain: string expected":e.version!=null&&e.hasOwnProperty("version")&&!g.isInteger(e.version)&&!(e.version&&g.isInteger(e.version.low)&&g.isInteger(e.version.high))?"version: integer|Long expected":null},t.fromObject=function(e){if(e instanceof h.onnx.OperatorSetIdProto)return e;var r=new h.onnx.OperatorSetIdProto;return e.domain!=null&&(r.domain=String(e.domain)),e.version!=null&&(g.Long?(r.version=g.Long.fromValue(e.version)).unsigned=!1:typeof e.version=="string"?r.version=parseInt(e.version,10):typeof e.version=="number"?r.version=e.version:typeof e.version=="object"&&(r.version=new g.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber())),r},t.toObject=function(e,r){r||(r={});var n={};if(r.defaults)if(n.domain="",g.Long){var s=new g.Long(0,0,!1);n.version=r.longs===String?s.toString():r.longs===Number?s.toNumber():s}else n.version=r.longs===String?"0":0;return e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.version!=null&&e.hasOwnProperty("version")&&(typeof e.version=="number"?n.version=r.longs===String?String(e.version):e.version:n.version=r.longs===String?g.Long.prototype.toString.call(e.version):r.longs===Number?new g.LongBits(e.version.low>>>0,e.version.high>>>0).toNumber():e.version),n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.OperatorSetIdProto"},t}(),a.OperatorStatus=function(){var t={},o=Object.create(t);return o[t[0]="EXPERIMENTAL"]=0,o[t[1]="STABLE"]=1,o}(),a.FunctionProto=function(){function t(o){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],o)for(var e=Object.keys(o),r=0;r<e.length;++r)o[e[r]]!=null&&(this[e[r]]=o[e[r]])}return t.prototype.name="",t.prototype.input=g.emptyArray,t.prototype.output=g.emptyArray,t.prototype.attribute=g.emptyArray,t.prototype.attributeProto=g.emptyArray,t.prototype.node=g.emptyArray,t.prototype.docString="",t.prototype.opsetImport=g.emptyArray,t.prototype.domain="",t.create=function(e){return new t(e)},t.encode=function(e,r){if(r||(r=Pe.create()),e.name!=null&&Object.hasOwnProperty.call(e,"name")&&r.uint32(10).string(e.name),e.input!=null&&e.input.length)for(var n=0;n<e.input.length;++n)r.uint32(34).string(e.input[n]);if(e.output!=null&&e.output.length)for(var n=0;n<e.output.length;++n)r.uint32(42).string(e.output[n]);if(e.attribute!=null&&e.attribute.length)for(var n=0;n<e.attribute.length;++n)r.uint32(50).string(e.attribute[n]);if(e.node!=null&&e.node.length)for(var n=0;n<e.node.length;++n)h.onnx.NodeProto.encode(e.node[n],r.uint32(58).fork()).ldelim();if(e.docString!=null&&Object.hasOwnProperty.call(e,"docString")&&r.uint32(66).string(e.docString),e.opsetImport!=null&&e.opsetImport.length)for(var n=0;n<e.opsetImport.length;++n)h.onnx.OperatorSetIdProto.encode(e.opsetImport[n],r.uint32(74).fork()).ldelim();if(e.domain!=null&&Object.hasOwnProperty.call(e,"domain")&&r.uint32(82).string(e.domain),e.attributeProto!=null&&e.attributeProto.length)for(var n=0;n<e.attributeProto.length;++n)h.onnx.AttributeProto.encode(e.attributeProto[n],r.uint32(90).fork()).ldelim();return r},t.encodeDelimited=function(e,r){return this.encode(e,r).ldelim()},t.decode=function(e,r){e instanceof N||(e=N.create(e));for(var n=r===void 0?e.len:e.pos+r,s=new h.onnx.FunctionProto;e.pos<n;){var i=e.uint32();switch(i>>>3){case 1:{s.name=e.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(e.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(e.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(e.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(h.onnx.AttributeProto.decode(e,e.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(h.onnx.NodeProto.decode(e,e.uint32()));break}case 8:{s.docString=e.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(h.onnx.OperatorSetIdProto.decode(e,e.uint32()));break}case 10:{s.domain=e.string();break}default:e.skipType(i&7);break}}return s},t.decodeDelimited=function(e){return e instanceof N||(e=new N(e)),this.decode(e,e.uint32())},t.verify=function(e){if(typeof e!="object"||e===null)return"object expected";if(e.name!=null&&e.hasOwnProperty("name")&&!g.isString(e.name))return"name: string expected";if(e.input!=null&&e.hasOwnProperty("input")){if(!Array.isArray(e.input))return"input: array expected";for(var r=0;r<e.input.length;++r)if(!g.isString(e.input[r]))return"input: string[] expected"}if(e.output!=null&&e.hasOwnProperty("output")){if(!Array.isArray(e.output))return"output: array expected";for(var r=0;r<e.output.length;++r)if(!g.isString(e.output[r]))return"output: string[] expected"}if(e.attribute!=null&&e.hasOwnProperty("attribute")){if(!Array.isArray(e.attribute))return"attribute: array expected";for(var r=0;r<e.attribute.length;++r)if(!g.isString(e.attribute[r]))return"attribute: string[] expected"}if(e.attributeProto!=null&&e.hasOwnProperty("attributeProto")){if(!Array.isArray(e.attributeProto))return"attributeProto: array expected";for(var r=0;r<e.attributeProto.length;++r){var n=h.onnx.AttributeProto.verify(e.attributeProto[r]);if(n)return"attributeProto."+n}}if(e.node!=null&&e.hasOwnProperty("node")){if(!Array.isArray(e.node))return"node: array expected";for(var r=0;r<e.node.length;++r){var n=h.onnx.NodeProto.verify(e.node[r]);if(n)return"node."+n}}if(e.docString!=null&&e.hasOwnProperty("docString")&&!g.isString(e.docString))return"docString: string expected";if(e.opsetImport!=null&&e.hasOwnProperty("opsetImport")){if(!Array.isArray(e.opsetImport))return"opsetImport: array expected";for(var r=0;r<e.opsetImport.length;++r){var n=h.onnx.OperatorSetIdProto.verify(e.opsetImport[r]);if(n)return"opsetImport."+n}}return e.domain!=null&&e.hasOwnProperty("domain")&&!g.isString(e.domain)?"domain: string expected":null},t.fromObject=function(e){if(e instanceof h.onnx.FunctionProto)return e;var r=new h.onnx.FunctionProto;if(e.name!=null&&(r.name=String(e.name)),e.input){if(!Array.isArray(e.input))throw TypeError(".onnx.FunctionProto.input: array expected");r.input=[];for(var n=0;n<e.input.length;++n)r.input[n]=String(e.input[n])}if(e.output){if(!Array.isArray(e.output))throw TypeError(".onnx.FunctionProto.output: array expected");r.output=[];for(var n=0;n<e.output.length;++n)r.output[n]=String(e.output[n])}if(e.attribute){if(!Array.isArray(e.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");r.attribute=[];for(var n=0;n<e.attribute.length;++n)r.attribute[n]=String(e.attribute[n])}if(e.attributeProto){if(!Array.isArray(e.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");r.attributeProto=[];for(var n=0;n<e.attributeProto.length;++n){if(typeof e.attributeProto[n]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");r.attributeProto[n]=h.onnx.AttributeProto.fromObject(e.attributeProto[n])}}if(e.node){if(!Array.isArray(e.node))throw TypeError(".onnx.FunctionProto.node: array expected");r.node=[];for(var n=0;n<e.node.length;++n){if(typeof e.node[n]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");r.node[n]=h.onnx.NodeProto.fromObject(e.node[n])}}if(e.docString!=null&&(r.docString=String(e.docString)),e.opsetImport){if(!Array.isArray(e.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");r.opsetImport=[];for(var n=0;n<e.opsetImport.length;++n){if(typeof e.opsetImport[n]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");r.opsetImport[n]=h.onnx.OperatorSetIdProto.fromObject(e.opsetImport[n])}}return e.domain!=null&&(r.domain=String(e.domain)),r},t.toObject=function(e,r){r||(r={});var n={};if((r.arrays||r.defaults)&&(n.input=[],n.output=[],n.attribute=[],n.node=[],n.opsetImport=[],n.attributeProto=[]),r.defaults&&(n.name="",n.docString="",n.domain=""),e.name!=null&&e.hasOwnProperty("name")&&(n.name=e.name),e.input&&e.input.length){n.input=[];for(var s=0;s<e.input.length;++s)n.input[s]=e.input[s]}if(e.output&&e.output.length){n.output=[];for(var s=0;s<e.output.length;++s)n.output[s]=e.output[s]}if(e.attribute&&e.attribute.length){n.attribute=[];for(var s=0;s<e.attribute.length;++s)n.attribute[s]=e.attribute[s]}if(e.node&&e.node.length){n.node=[];for(var s=0;s<e.node.length;++s)n.node[s]=h.onnx.NodeProto.toObject(e.node[s],r)}if(e.docString!=null&&e.hasOwnProperty("docString")&&(n.docString=e.docString),e.opsetImport&&e.opsetImport.length){n.opsetImport=[];for(var s=0;s<e.opsetImport.length;++s)n.opsetImport[s]=h.onnx.OperatorSetIdProto.toObject(e.opsetImport[s],r)}if(e.domain!=null&&e.hasOwnProperty("domain")&&(n.domain=e.domain),e.attributeProto&&e.attributeProto.length){n.attributeProto=[];for(var s=0;s<e.attributeProto.length;++s)n.attributeProto[s]=h.onnx.AttributeProto.toObject(e.attributeProto[s],r)}return n},t.prototype.toJSON=function(){return this.constructor.toObject(this,ge.util.toJSONOptions)},t.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/onnx.FunctionProto"},t}(),a}();Cu.exports=h});function Fr(a,t){if(!a)throw new Error(typeof t=="string"?t:t())}function sn(a){return new TextDecoder().decode(a)}var ye,hr,pi,Ze,jn,We,it,U,an,mr,br,gr,fe=L(()=>{"use strict";zn();Zo();ye=Ar(Cr());yr();hr=class{static arraysEqual(t,o){if(t.length!==o.length)return!1;for(let e=0;e<t.length;e++)if(t[e]!==o[e])return!1;return!0}},pi=class{static preprocessInputShapes(t,o){let e=t.length===1?[1,t[0]]:t,r=o.length===1?[o[0],1]:o;return[e,r]}static postprocessOutputShape(t,o,e){o===1&&t.splice(t.length-2,1),e===1&&t.pop()}static calcMatMulShape(t,o){return t[1]!==o[0]?void 0:[t[0],o[1]]}},Ze=class a{static calcShape(t,o,e=!1){let r=t.length,n=o.length;if(r===0)return o;if(n===0)return t;let s=Math.max(t.length,o.length),i=new Array(s);if(e){if(r<2||n<2)return;let u=pi.calcMatMulShape([t[r-2],t[r-1]],[o[n-2],o[n-1]]);if(u===void 0)return;[i[s-2],i[s-1]]=u}for(let u=e?3:1;u<=s;u++){let l=r-u<0?1:t[r-u],c=n-u<0?1:o[n-u];if(l!==c&&l>1&&c>1)return;i[s-u]=Math.max(l,c)}return i}static index(t,o){let e=new Array(o.length);return a.fillIndex(t,o,e),e}static fillIndex(t,o,e){let r=t.length-o.length;for(let n=0;n<o.length;n++)e[n]=t[r+n]%o[n]}static calc(t,o,e,r,n){let s=a.calcShape(t.dims,o.dims);if(s){if(r&&!U.areEqual(s,t.dims))return;let i=U.size(s),u=r?t:new $e(s,n||t.type);if(s.length===0)u.set([],e(t.get([]),o.get([])));else{let l=new Array(s.length),c=new Array(t.dims.length),p=new Array(o.dims.length),d=0,T=0,w=!1,v=!1;t.dims.length===0&&(d=t.get([]),w=!0),o.dims.length===0&&(T=o.get([]),v=!0);let S;for(let A=0;A<i;A++){S=A;for(let C=s.length-1;C>=0;C--)l[C]=S%s[C],S=Math.floor(S/s[C]);w||(a.fillIndex(l,t.dims,c),d=t.get(c)),v||(a.fillIndex(l,o.dims,p),T=o.get(p)),u.set(l,e(d,T))}}return u}}static isValidBroadcast(t,o){let e=t.length,r=o.length;if(e>r)return!1;for(let n=1;n<=e;n++)if(t[e-n]!==1&&t[e-n]!==o[r-n])return!1;return!0}static getBroadcastDims(t,o){let e=t.length,r=[];for(let n=0;n<e;n++){let s=e-1-n,i=t[s]||1;(o[o.length-1-n]||1)>1&&i===1&&r.unshift(s)}return r}},jn=class{static getShapeOfGemmResult(t,o,e,r,n){if(t.length!==2||e.length!==2)throw new Error("shape need to be of size 2");let s,i,u;o?(s=t[1],i=t[0]):(s=t[0],i=t[1]);let l=-1;if(r?(u=e[0],l=1):(u=e[1],l=0),e[l]!==i)throw new Error("dimension mismatch");if(s<=0||u<=0||i<=0)throw new Error("invalid shape specified");if(n&&!Ze.isValidBroadcast(n,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,i]}},We=class a{static tensorDataTypeFromProto(t){switch(t){case ye.onnx.TensorProto.DataType.INT8:return"int8";case ye.onnx.TensorProto.DataType.UINT8:return"uint8";case ye.onnx.TensorProto.DataType.BOOL:return"bool";case ye.onnx.TensorProto.DataType.INT16:return"int16";case ye.onnx.TensorProto.DataType.UINT16:return"uint16";case ye.onnx.TensorProto.DataType.INT32:return"int32";case ye.onnx.TensorProto.DataType.UINT32:return"uint32";case ye.onnx.TensorProto.DataType.FLOAT:return"float32";case ye.onnx.TensorProto.DataType.DOUBLE:return"float64";case ye.onnx.TensorProto.DataType.STRING:return"string";case ye.onnx.TensorProto.DataType.INT64:return"int32";case ye.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${ye.onnx.TensorProto.DataType[t]}`)}}static tensorDataTypeStringToEnum(t){switch(t){case"int8":return ye.onnx.TensorProto.DataType.INT8;case"uint8":return ye.onnx.TensorProto.DataType.UINT8;case"bool":return ye.onnx.TensorProto.DataType.BOOL;case"int16":return ye.onnx.TensorProto.DataType.INT16;case"uint16":return ye.onnx.TensorProto.DataType.UINT16;case"int32":return ye.onnx.TensorProto.DataType.INT32;case"uint32":return ye.onnx.TensorProto.DataType.UINT32;case"float32":return ye.onnx.TensorProto.DataType.FLOAT;case"float64":return ye.onnx.TensorProto.DataType.DOUBLE;case"string":return ye.onnx.TensorProto.DataType.STRING;case"int64":return ye.onnx.TensorProto.DataType.INT64;case"uint64":return ye.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${t}`)}}static tensorDimsFromProto(t){return t.map(o=>Vt.isLong(o)?o.toNumber():o)}static tensorValueTypeFromProto(t){return{tensorType:a.tensorDataTypeFromProto(t.elemType),shape:{dims:a.tensorDimsFromProto(t.shape.dim.map(o=>o.dimValue))}}}static tensorDimsFromORTFormat(t){let o=[];for(let e=0;e<t.dimsLength();e++)o.push(it.longToNumber(t.dims(e)));return o}static tensorAttributesFromORTFormat(t){let o=[];for(let e=0;e<t.attributesLength();e++)o.push(t.attributes(e));return o}},it=class{static longToNumber(t,o){return Vt.isLong(t)?t.toNumber():t instanceof _.Long?Vt.fromValue({low:t.low,high:t.high,unsigned:o??!1}).toNumber():t}static isLong(t){return Vt.isLong(t)||t instanceof _.Long}},U=class a{static size(t){return a.getSizeFromDimensionRange(t,0,t.length)}static sizeFromDimension(t,o){if(o<0||o>t.length)throw new Error(`invalid dimension of ${o} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return a.getSizeFromDimensionRange(t,o,t.length)}static sizeToDimension(t,o){if(o<0||o>t.length)throw new Error(`invalid dimension of ${o} for sizeToDimension as Tensor has ${t.length} dimensions.`);return a.getSizeFromDimensionRange(t,0,o)}static getSizeFromDimensionRange(t,o,e){let r=1;for(let n=o;n<e;n++){if(t[n]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");r*=t[n]}return r}static computeStrides(t){let o=t.length;if(o===0)return[];if(o===1)return[1];let e=new Array(o);e[o-1]=1,e[o-2]=t[o-1];for(let r=o-3;r>=0;--r)e[r]=e[r+1]*t[r+1];return e}static transpose(t){return t.slice().reverse()}static indicesToOffset(t,o,e){e===void 0&&(e=t.length);let r=0;for(let n=0;n<e;++n)r+=o[n]*t[n];return r}static offsetToIndices(t,o){let e=o.length;if(e===0)return[];if(e===1)return[t*o[0]];let r=new Array(o.length);for(let n=0;n<r.length-1;++n)r[n]=Math.floor(t/o[n]),t-=r[n]*o[n];return r[r.length-1]=t,r}static normalizeAxis(t,o){if(t<-o&&t>=o)throw new Error("unsupported axis for this operation.");return t<0?t+o:t}static normalizeAxes(t,o){return t.map(e=>this.normalizeAxis(e,o))}static incrementIndex(t,o,e){if(o.length===0||t.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(e===void 0)e=o.length;else if(e<=0||e>o.length)throw new Error("Incorrect axis to increment on");for(let r=e-1;r>=0&&(t[r]++,!(t[r]<o[r]));--r)t[r]=0}static calculateReshapedDims(t,o){if(o.length===0){if(t.length===0||a.size(t)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let e=o.length,r=new Array(e),n=-1,s=1;for(let u=0;u<e;u++){if(o[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(o[u]===-1){if(n!==-1)throw new Error("at most one dimension in shape hints can be -1");n=u}else{if(o[u]===0){if(u>=t.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");r[u]=t[u]}else r[u]=o[u];s*=r[u]}}let i=a.size(t);if(n!==-1){if(i%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${t}] Output shape: [${o}]`);r[n]=i/s}else if(s!==i)throw new Error("reshapedDims and originalDims don't have matching sizes");return r}static sortBasedOnPerm(t,o){return o?o.map(e=>t[e]):t.slice().reverse()}static padShape(t,o){let e=t.length;return t.map((r,n)=>r+o[n]+o[n+e])}static areEqual(t,o){return t.length!==o.length?!1:t.every((e,r)=>e===o[r])}static validateDimsAndCalcSize(t){if(t.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let o=1;for(let e of t){if(!Number.isInteger(e))throw new TypeError(`Invalid shape: ${e} is not an integer`);if(e<0||e>2147483647)throw new TypeError(`Invalid shape: length ${e} is not allowed`);o*=e}return o}static flattenShape(t,o){o<0&&(o+=t.length);let e=t.reduce((s,i)=>s*i,1),r=t.slice(o).reduce((s,i)=>s*i,1);return[e/r,r]}static squeezeShape(t,o){let e=new Array;o=a.normalizeAxes(o,t.length);for(let r=0;r<t.length;r++){let n=o.indexOf(r)>=0;if(n&&t[r]!==1)throw new Error("squeeze an axis of size different than 1");(o.length===0&&t[r]>1||o.length>0&&!n)&&e.push(t[r])}return e}static unsqueezeShape(t,o){let e=new Array(t.length+o.length);e.fill(0);for(let n=0;n<o.length;n++){let s=a.normalizeAxis(o[n],e.length);if(s>=e.length)throw new Error("'axes' has an out of range axis");if(e[s]!==0)throw new Error("'axes' has a duplicate axis");e[s]=1}let r=0;for(let n=0;n<e.length;n++)e[n]===0&&(e[n]=t[r++]);if(r!==t.length)throw new Error("the unsqueezed dimension could not be established");return e}},an=class a{static splitShape(t,o,e,r){if(e.length===0){if(!r)throw new Error("need to know number of outputs when the 'split' attribute is not specified");a.determineSplit(t[o],r,e)}let n=[],s=[0];for(let i=0;i<e.length;++i){i!==0&&s.push(s[i-1]+e[i-1]);let u=t.slice();u[o]=e[i],n.push(u)}return[n,s]}static determineSplit(t,o,e){if(t%o!==0)throw new Error("cannot split tensor to equal sized parts");for(let r=0;r<o;++r)e.push(t/o)}},mr=class a{static adjustPoolAttributes(t,o,e,r,n,s){if(!t&&e.length!==o.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let i=0;i<o.length-2;i++)i>=e.length?e.push(o[i+2]):e[i]=o[i+2];for(let i=0;i<e.length;i++)if(i<r.length){if(r[i]<0)throw new Error("strides should be greater than or equal to 1")}else r.push(1);for(let i=0;i<e.length;i++)if(i<n.length){if(n[i]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let i=0;i<e.length*2;i++)if(i<s.length){if(s[i]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let i=0;i<e.length;i++){if(e[i]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[i]>=e[i]||s[i+e.length]>=e[i])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,o,e,r,n,s){if(s){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let i=0;i<t.length-2;i++)a.adjustPadAndReturnShape(t[i+2],o[i],e[i],r[i],n,i,i+t.length-2,s)}}static computePoolOutputShape(t,o,e,r,n,s,i){if(o.length<=0)throw new Error("input shape must be of size greater than 0");let u=[o[0],o[1]];return a.computeShapeHelper(t,o,u,e,r,n,s,i),u}static computeConvOutputShape(t,o,e,r,n,s,i){if(t.length<=0||o.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],o[0]];return a.computeShapeHelper(!1,t,u,e,r,n,s,i),u}static computeShapeHelper(t,o,e,r,n,s,i,u){if(t)for(let l=0;l<o.length-2;l++)e.push(1);else for(let l=0;l<o.length-2;l++)e.push(a.adjustPadAndReturnShape(o[l+2],r[l],n[l],s[l],i,l,l+o.length-2,u))}static adjustPadAndReturnShape(t,o,e,r,n,s,i,u){let l=e*(r-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return n[s]=0,n[i]=0,Math.floor((t-l)/o+1);case"SAME_LOWER":case"SAME_UPPER":if(e!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((t+o-1)/o-1)*o+r-t;return n[s]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),n[i]=p-n[s],Math.floor((t+p-r)/o+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[i]-l)/o+1)}},br=-34028234663852886e22,gr=34028234663852886e22});function Hd(a){switch(a){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${a}`)}}function Fu(a){switch(a){case ne.onnx.TensorProto.DataType.UINT8:case ne.onnx.TensorProto.DataType.INT8:case ne.onnx.TensorProto.DataType.BOOL:return 1;case ne.onnx.TensorProto.DataType.UINT16:case ne.onnx.TensorProto.DataType.INT16:return 2;case ne.onnx.TensorProto.DataType.FLOAT:case ne.onnx.TensorProto.DataType.INT32:case ne.onnx.TensorProto.DataType.UINT32:return 4;case ne.onnx.TensorProto.DataType.INT64:case ne.onnx.TensorProto.DataType.DOUBLE:case ne.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ne.onnx.TensorProto.DataType[a]}`)}}function qd(a,t){return new(Bu(t))(a)}function Bu(a){switch(a){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function hi(a,t){if(t===ne.onnx.TensorProto.DataType.INT64||t===di.TensorDataType.INT64){if(a.greaterThanOrEqual(2147483648)||a.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(t===ne.onnx.TensorProto.DataType.UINT32||t===di.TensorDataType.UINT32||t===ne.onnx.TensorProto.DataType.UINT64||t===di.TensorDataType.UINT64){if(a.greaterThanOrEqual(4294967296)||a.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ne.onnx.TensorProto.DataType[t]}`);return a.toNumber()}function $u(a,t,o){switch(t){case ne.onnx.TensorProto.DataType.BOOL:case ne.onnx.TensorProto.DataType.UINT8:return a.getUint8(o);case ne.onnx.TensorProto.DataType.INT8:return a.getInt8(o);case ne.onnx.TensorProto.DataType.UINT16:return a.getUint16(o,!0);case ne.onnx.TensorProto.DataType.INT16:return a.getInt16(o,!0);case ne.onnx.TensorProto.DataType.FLOAT:return a.getFloat32(o,!0);case ne.onnx.TensorProto.DataType.INT32:return a.getInt32(o,!0);case ne.onnx.TensorProto.DataType.UINT32:return a.getUint32(o,!0);case ne.onnx.TensorProto.DataType.INT64:return hi(Vt.fromBits(a.getUint32(o,!0),a.getUint32(o+4,!0),!1),t);case ne.onnx.TensorProto.DataType.DOUBLE:return a.getFloat64(o,!0);case ne.onnx.TensorProto.DataType.UINT64:return hi(Vt.fromBits(a.getUint32(o,!0),a.getUint32(o+4,!0),!0),t);default:throw new Error(`cannot read from DataView for type ${ne.onnx.TensorProto.DataType[t]}`)}}var ku,ne,di,$e,yr=L(()=>{"use strict";ku=Ar(Os());Zo();tn();ne=Ar(Cr());fe();di=V.experimental.fbs,$e=class a{constructor(t,o,e,r,n,s=ku.Guid.create()){this.dims=t;this.type=o;this.dataProvider=e;this.asyncDataProvider=r;this.cache=n;this.dataId=s;this.size=U.validateDimsAndCalcSize(t);let i=this.size,u=e===void 0&&r===void 0&&n===void 0;if(n!==void 0&&n.length!==i)throw new RangeError("Input dims doesn't match data length.");if(o==="string"){if(n!==void 0&&(!Array.isArray(n)||!n.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(i))}else{if(n!==void 0){let l=Bu(o);if(!(n instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(i*Hd(o));this.cache=qd(l,o)}}}get data(){if(this.cache===void 0){let t=this.dataProvider(this.dataId);if(t.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=t}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(t){return this.data[U.indicesToOffset(t,this.strides)]}set(t,o){this.data[U.indicesToOffset(t,this.strides)]=o}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=U.computeStrides(this.dims)),this._strides}static fromProto(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let o=We.tensorDataTypeFromProto(t.dataType),e=We.tensorDimsFromProto(t.dims),r=new a(e,o);if(o==="string")t.stringData.forEach((n,s)=>{r.data[s]=sn(n)});else if(t.rawData&&typeof t.rawData.byteLength=="number"&&t.rawData.byteLength>0){let n=r.data,s=new DataView(t.rawData.buffer,t.rawData.byteOffset,t.rawData.byteLength),i=Fu(t.dataType),u=t.rawData.byteLength/i;if(t.rawData.byteLength%i!==0)throw new Error("invalid buffer length");if(n.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=$u(s,t.dataType,l*i);n[l]=c}}else{let n;switch(t.dataType){case ne.onnx.TensorProto.DataType.FLOAT:n=t.floatData;break;case ne.onnx.TensorProto.DataType.INT32:case ne.onnx.TensorProto.DataType.INT16:case ne.onnx.TensorProto.DataType.UINT16:case ne.onnx.TensorProto.DataType.INT8:case ne.onnx.TensorProto.DataType.UINT8:case ne.onnx.TensorProto.DataType.BOOL:n=t.int32Data;break;case ne.onnx.TensorProto.DataType.INT64:n=t.int64Data;break;case ne.onnx.TensorProto.DataType.DOUBLE:n=t.doubleData;break;case ne.onnx.TensorProto.DataType.UINT32:case ne.onnx.TensorProto.DataType.UINT64:n=t.uint64Data;break;default:throw new Error("unspecific error")}if(n==null)throw new Error("failed to populate data from a tensorproto value");let s=r.data;if(s.length!==n.length)throw new Error("array length mismatch");for(let i=0;i<n.length;i++){let u=n[i];Vt.isLong(u)?s[i]=hi(u,t.dataType):s[i]=u}}return r}static fromData(t,o,e){return new a(o,e,void 0,void 0,t)}static fromOrtTensor(t){if(!t)throw new Error("cannot construct Value from an empty tensor");let o=We.tensorDimsFromORTFormat(t),e=We.tensorDataTypeFromProto(t.dataType()),r=new a(o,e);if(e==="string")for(let n=0;n<t.stringDataLength();n++)r.data[n]=t.stringData(n);else if(t.rawDataArray()&&typeof t.rawDataLength()=="number"&&t.rawDataLength()>0){let n=r.data,s=new DataView(t.rawDataArray().buffer,t.rawDataArray().byteOffset,t.rawDataLength()),i=Fu(t.dataType()),u=t.rawDataLength()/i;if(t.rawDataLength()%i!==0)throw new Error("invalid buffer length");if(n.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=$u(s,t.dataType(),l*i);n[l]=c}}return r}}});function H(a){return a===1?jd:Yd}function Nu(a){let t=H(a);return`${t.version}
      precision highp float;
      ${t.attribute} vec3 position;
      ${t.attribute} vec2 textureCoord;

      ${t.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Ru(a){let t=H(a);return`${t.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${t.varyingFrag} vec2 TexCoords;
    ${t.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function Mu(a,t){let o=H(a);return`
  void main() {
    int indices[${t}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${o.output} = result;
  }
  `}var jd,Yd,we=L(()=>{"use strict";jd={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},Yd={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var ae=L(()=>{"use strict"});async function mi(a,t=e=>0,o){return new Promise((e,r)=>{let n=0,s=()=>{if(a()){e();return}n++;let i=t(n);if(o!=null&&n>=o){r();return}setTimeout(s,i)};s()})}function Yn(a){return Fr(typeof a<"u"&&a.length!==0,()=>"empty string found for sampler name"),"get"+a.charAt(0).toUpperCase()+a.slice(1)}function Gu(a){return Fr(typeof a<"u"&&a.length!==0,()=>"empty string found for sampler name"),"get"+a.charAt(0).toUpperCase()+a.slice(1)+"AtOutCoords"}function $r(a,t){let o=JSON.parse(JSON.stringify(a));return o=t,o}function kr(a,t){return t.map(o=>a[o]).join(", ")}function Qe(a){if(a<=1)return"int";if(a===2)return"ivec2";if(a===3)return"ivec3";if(a===4)return"ivec4";if(a===5)return"ivec5";if(a===6)return"ivec6";throw Error(`GPU for rank ${a} is not yet supported`)}function Dt(a=6){return["x","y","z","w","u","v"].slice(0,a)}var Bt=L(()=>{"use strict";fe()});function Xd(a,t){return Dt(t).map(o=>`${a}.${o}`)}function Br(a,t){return t===1?[a]:Xd(a,t)}function Nt(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var Tr=L(()=>{"use strict";Bt()});function Jd(a,t,o){if(a===0)return"false";if(a===1)return`rc > ${t[0]}`;let e="";for(let r=a-2;r<a;r++)e+=`${o[r]} >= ${t[r-a+2]}`,r<a-1&&(e+="||");return e}function Zd(a,t){let o=a.length;if(o===0)return"getA(), 0, 0, 0";if(o===1)return`getA(rc),
            rc + 1 >= ${a[0]} ? 0. : getA(rc + 1),
            0, 0`;let e="r, c",r="r, cp1",n="rp1, c",s="rp1, cp1",i="";if(o>2)for(let u=0;u<o-2;++u)i=i+`${t[u]},`;return`getA(${i}${e}),
          rEdge ? 0. : getA(${i}${n}),
          cEdge ? 0. : getA(${i}${r}),
          rEdge || cEdge ? 0. : getA(${i}${s})`}function Qd(a,t,o,e){return a===0||a===1?"":`
    int r = ${t[a-2]};
    int c = ${t[a-1]};
    int rp1 = ${t[a-2]} + 1;
    int cp1 = ${t[a-1]} + 1;
    bool rEdge = rp1 >= ${e};
    bool cEdge = cp1 >= ${o};
    `}var Uu,Kd,zu,Vu=L(()=>{"use strict";we();ae();Bt();Tr();Uu={name:"pack",inputNames:["A"],inputTypes:[1]},Kd=(a,t)=>{let o=H(a.session.backend.glContext.version),e=t.dims,r=e.length,n=t.dims.length,s=Qe(n),i=Br("rc",n),u=Qd(n,i,e[e.length-2],e[e.length-1]),l;r===0?l=[1,1]:r===1?l=[e[0],1]:l=[e[n-1],e[n-2]];let c=Jd(n,l,i),p=Zd(e,i),d=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${c}) {
            ${o.output} = vec4(0);
          } else {
            ${u}

            ${o.output} = vec4(${p});
          }
        }
      `;return{...Uu,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:2},shaderSource:d}},zu=(a,t)=>({...Uu,get:()=>Kd(a,t)})});function bi(a){if(a.length===0)return[1,1,1];let t=1;for(let o=0;o<a.length-2;++o)t*=a[o];return[t,a.length>1?a[a.length-2]:1,a[a.length-1]]}function Hu(a,t){let o=!1;return a.length===0||t.length===0?o=!0:a.length<2||t.length<2?o=a[a.length-1]===t[t.length-1]:o=a[a.length-1]===t[t.length-1]&&a[a.length-2]===t[t.length-2],o}function rh(a){let t=U.computeStrides(a),o=["b","r","c"],e="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t.map((n,s)=>{let i=`int ${o[s]} = ${e} / ${n}`,u=s===t.length-1?`int ${o[s+1]} = ${e} - ${o[s]} * ${n}`:`index -= ${o[s]} * ${n}`;return`${i}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function nh(a){let t=U.computeStrides(a);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${t[0]} + coords.z * ${t[1]} + coords.y;
  }
`}var eh,th,Wu,qu=L(()=>{"use strict";fe();we();ae();Tr();eh=a=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${a}`}),th=(a,t,o,e)=>{let r=t.dims,n=e,s="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let i=H(a.session.backend.glContext.version),u=`
      ${rh(r)}
      ${nh(n)}
      ${Nt()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${n[2]};
        int cols = ${n[1]};

        ${s}
        ${i.output} = result;
      }
    `;return{...o,output:{dims:n,type:t.type,textureType:2},shaderSource:u,hasMain:!0}},Wu=(a,t,o)=>{let e=eh(o);return{...e,get:()=>th(a,t,e,o)}}});var gi,ju=L(()=>{"use strict";we();ae();gi=(a,t)=>{let o=t.shape,e=H(a.session.backend.glContext.version),r=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${e.texture2D}(X,TexCoords).r;
      ${e.output} = encodeAsUint8(value);
    }`,n={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:o,type:t.tensor.type,textureType:3},shaderSource:r,hasMain:!0};return a.executeProgram(n,[t.tensor])}});function ih(a,t){if(a===1)return"rc";let o="";for(let e=0;e<a;e++)o+=t[e],e<a-1&&(o+=",");return o}var Yu,oh,Xu,Ku=L(()=>{"use strict";we();ae();Bt();Tr();Yu={name:"unpack",inputNames:["A"],inputTypes:[2]},oh=(a,t)=>{let o=t.dims.length,e=Br("rc",o),r=e.slice(-2),n=Qe(o),s=Nt(),u=t.dims.length===0?"":ih(o,e),l=o<=1?"rc":`vec2(${r.join(",")})`,c=H(a.session.backend.glContext.version),p=`
    ${s}
    void main() {
      ${n} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Yu,hasMain:!0,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:p}},Xu=(a,t)=>({...Yu,get:()=>oh(a,t)})});var Xn,un,Kn,ln=L(()=>{"use strict";lt();Xn=class{constructor(t,o=1){if(o===1)this.internalFormat=t.R32F,this.format=t.RED,this.textureType=t.FLOAT,this.channelSize=o;else if(o===4)this.internalFormat=t.RGBA32F,this.format=t.RGBA,this.textureType=t.FLOAT,this.channelSize=o;else throw new Error(`Invalid number of channels: ${o}`)}encode(t,o){let e,r;return t.constructor!==Float32Array&&(ce.warning("Encoder","data was not of type Float32; creating new Float32Array"),r=new Float32Array(t)),o*this.channelSize>t.length?(ce.warning("Encoder","Source data too small. Allocating larger array"),r=t,e=this.allocate(o*this.channelSize),r.forEach((n,s)=>e[s]=n)):(r=t,e=r),e}allocate(t){return new Float32Array(t*4)}decode(t,o){return this.channelSize===1?t.filter((r,n)=>n%4===0).subarray(0,o):t.subarray(0,o)}},un=class{constructor(t,o=1,e){if(o!==1&&o!==4)throw new Error(`Invalid number of channels: ${o}`);this.internalFormat=t.RGBA,this.format=t.RGBA,this.channelSize=o,this.textureType=e||t.FLOAT}encode(t,o){let e=t;return this.channelSize===1&&(ce.verbose("Encoder","Exploding into a larger array"),e=this.allocate(o),t.forEach((r,n)=>e[n*4]=r)),e}allocate(t){return new Float32Array(t*4)}decode(t,o){return this.channelSize===1?t.filter((r,n)=>n%4===0).subarray(0,o):t.subarray(0,o)}},Kn=class{constructor(t,o=1){this.channelSize=4;if(o===1)this.internalFormat=t.ALPHA,this.format=t.ALPHA,this.textureType=t.UNSIGNED_BYTE,this.channelSize=o;else if(o===4)this.internalFormat=t.RGBA,this.format=t.RGBA,this.textureType=t.UNSIGNED_BYTE,this.channelSize=o;else throw new Error(`Invalid number of channels: ${o}`)}encode(t,o){return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}allocate(t){return new Uint8Array(t*this.channelSize)}decode(t,o){if(t instanceof Uint8Array)return t.subarray(0,o);throw new Error(`Invalid array type: ${t.constructor}`)}}});var fn,Ju,yi,Zu=L(()=>{"use strict";fe();ae();fn=(a,t,o)=>{let e=o===0||o===1?1:4,r=o===2,n=o===1||o===2,s=o===4?t.length-1:void 0,i=o===4?t.map((u,l)=>l===t.length-1?u*4:u):void 0;return yi(a,t,e,i,{isPacked:r,reverseWH:n,breakAxis:s})},Ju=(a,t,o)=>{let e=fn(a,t,o);return[e.width,e.height]},yi=(a,t,o=1,e,r)=>{let n=!!(r&&r.isPacked),[s,i]=a.computeTextureWH(n&&e||t,r),u=t.length,l=t.slice(0);if(u===0&&(l=[1]),o===1)e=t;else if(n){if(o!==4)throw new Error("a packed texture must be 4-channel");e=t,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!e)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:i,channels:o,isPacked:n,shape:l,strides:U.computeStrides(l),unpackedShape:e,reversedWH:r&&r.reverseWH}}});var sh,Jn,el=L(()=>{"use strict";lt();yr();fe();Vu();qu();ju();Ku();ln();Zu();ae();sh=(a,t)=>{let o=t.map(r=>`${r.unpackedShape.join(",")};${r.width}x${r.height}`).join("_"),e=a.name;return a.cacheHint&&(e+="["+a.cacheHint+"]"),e+=":"+o,e},Jn=class{constructor(t){this.session=t;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(t,o){return Ju(this.session.layoutStrategy,t,o)}executeProgram(t,o){if(o.length<t.inputNames.length)throw new Error(`Input size mustn't be less than ${t.inputNames.length}.`);if(t.inputNames.length!==t.inputTypes.length)throw new Error("input names size does not match input types");let e=[];for(let l=0;l<t.inputNames.length;++l)e[l]=this.getOrCreateTextureData(o[l],t.inputTypes[l]);let r=sh(t,e),n=this.session.programManager.getArtifact(r),s=n?n.programInfo:typeof t.get=="function"?t.get():t,i=fn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(i,s.output.type);return n||(n=this.session.programManager.build(s,e,u),this.session.programManager.setArtifact(r,n)),this.runProgram(n,e,u),u}run(t,o){return this.executeProgram(t,o).tensor}runProgram(t,o,e){for(let r=0;r<o.length;++r)if(!!o[r].isPacked!=(t.programInfo.inputTypes[r]===2))throw new Error(`input[${r}] property packed inconsistent`);if(!!e.isPacked!=(t.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(t,o,e)}getOrCreateTextureData(t,o){let e=this.getTextureData(t.dataId,o===2);if(!e&&(e=this.getTextureData(t.dataId,o!==2),e))return o===2?this.pack(e):this.unpack(e);if(!e){let r=fn(this.session.layoutStrategy,t.dims,o);if(o===4){let i=t.dims;if(i.length===4){let u=[i[0],Math.ceil(i[1]*i[2]*i[3]/4)],l=fn(this.session.layoutStrategy,u,o),c=t.numberData;if(i[1]*i[2]*i[3]%4!==0){let p=i[0],d=i[1]*i[2]*i[3],T=Math.ceil(d*1/4)*4,w=p*T;c=new Float32Array(w);for(let v=0;v<p;++v){let S=v*d,A=v*T+v%1*d;c.set(t.numberData.subarray(S,S+d),A)}}return this.createTextureData(l,t.type,c,t,1)}}if(o===2){let n=yi(this.session.layoutStrategy,t.dims,1,[],{reverseWH:!0}),s=this.createTextureData(n,t.type,t.numberData,t,1);e=this.pack(s)}else e=this.createTextureData(r,t.type,t.numberData,t,1)}return e}createTextureDataFromLayoutBindTensor(t,o,e,r){return this.createTextureData(t,o,e,r,1)}createTextureData(t,o,e,r,n){ce.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(t)}]`);let s=this.session.textureManager.createTextureFromLayout(o,t,e,n);return this.createTextureDataFromTexture(t,o,s,r)}reshapeUnpacked(t,o){let e=this.getOrCreateTextureData(t,0),r={channels:e.channels,height:e.height,width:e.width,shape:o.length!==0?o:[1],strides:U.computeStrides(o),unpackedShape:o};return this.createTextureDataFromTexture(r,t.type,e.texture).tensor}reshapePacked(t,o){let e=this.getOrCreateTextureData(t,2);if(Hu(t.dims,o)){let l={channels:e.channels,height:e.height,width:e.width,shape:o.length!==0?o:[1],strides:U.computeStrides(o),unpackedShape:o,isPacked:!0};return this.createTextureDataFromTexture(l,t.type,e.texture).tensor}let r=bi(t.dims),n=bi(o),s=this.reshapePacked(t,r),i=this.run(Wu(this,s,n),[s]);return this.reshapePacked(i,o)}cast(t,o){let e=this.getOrCreateTextureData(t,0);return this.createTextureDataFromTexture(e,o,e.texture).tensor}createTextureDataFromTexture(t,o,e,r,n){let s={...t,tensor:r||new $e(t.unpackedShape,o,i=>this.readTexture(s),async i=>this.readTextureAsync(s),void 0,n),texture:e};return this.setTextureData(s.tensor.dataId,s,t.isPacked),s}getTextureData(t,o=!1){return this.session.isInitializer(t)?this.session.getTextureData(t,o):o?this.packedTextureDataCache.get(t):this.unpackedTextureDataCache.get(t)}setTextureData(t,o,e=!1){this.session.isInitializer(t)?this.session.setTextureData(t,o,e):(e?this.packedTextureDataCache:this.unpackedTextureDataCache).set(t,o)}isTextureLayoutCached(t,o=!1){return!!this.getTextureData(t.dataId,o)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(t=>this.session.textureManager.releaseTexture(t)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(t=>this.session.textureManager.releaseTexture(t)),this.unpackedTextureDataCache=new Map}readTexture(t){return t.isPacked?this.readTexture(this.unpack(t)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(t,t.tensor.type,t.channels):this.session.textureManager.readUint8TextureAsFloat(gi(this,t))}async readTextureAsync(t){return t.isPacked?this.readTextureAsync(this.unpack(t)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(t,t.tensor.type,t.channels):this.session.textureManager.readUint8TextureAsFloat(gi(this,t))}pack(t){return this.executeProgram(zu(this,t.tensor),[t.tensor])}unpack(t){return this.executeProgram(Xu(this,t.tensor),[t.tensor])}}});var Ti,Q,Ue=L(()=>{"use strict";Ti=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},Q=a=>new Ti(a)});var tl,rl,nl,uh,lh,ol=L(()=>{"use strict";Ue();we();ae();tl={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},rl=(a,t,o)=>(lh(t),[a.run({...tl,cacheHint:o.cacheKey,get:()=>uh(a,t,o)},t)]),nl=a=>{let t=a.attributes.getFloat("epsilon",1e-5),o=a.attributes.getFloat("momentum",.9),e=a.attributes.getInt("spatial",1);return Q({epsilon:t,momentum:o,spatial:e})},uh=(a,t,o)=>{let e=H(a.session.backend.glContext.version),r=t[0].dims.length,[n,s]=a.calculateTextureWidthAndHeight(t[1].dims,0),i=`
  float process(int[${r}] indices) {
    vec2 position = offsetToCoords(indices[1], ${n}, ${s});
    float scale = getColorAsFloat(${e.texture2D}(Scale, position));
    float mean = getColorAsFloat(${e.texture2D}(Mean, position));
    float variance = getColorAsFloat(${e.texture2D}(Variance, position));
    float b = getColorAsFloat(${e.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${o.epsilon})) ) + b;
  }`;return{...tl,output:{dims:t[0].dims,type:t[0].type,textureType:0},shaderSource:i}},lh=a=>{if(!a||a.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let t=a[0],o=a[1],e=a[2],r=a[3],n=a[4];if(t.dims.length<3||o.dims.length!==1||e.dims.length!==1||r.dims.length!==1||n.dims.length!==1)throw new Error("invalid input shape.");if(o.dims[0]!==t.dims[1]||e.dims[0]!==t.dims[1]||r.dims[0]!==t.dims[1]||n.dims[0]!==t.dims[1])throw new Error("invalid input shape.");if(t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||n.type!=="float32"&&n.type!=="float64")throw new Error("invalid input tensor types.")}});var Zn,dt,R,cn,Qn,Wt=L(()=>{"use strict";Zn=class{constructor(t,o,e,r){this.glContext=t;this.programInfo=o;this.inputTextureLayouts=e;this.outputTextureLayout=r}},dt=class{constructor(t){this.context=t}},R=class{constructor(t,o){this.routineBody=t;this.dependencies=o}},cn=class{constructor(t,o,e){this.name=t;e?this.dependencies=e:this.dependencies=[],o&&(this.routineBody=o)}addDependency(t){t&&this.dependencies.push(t)}},Qn=class{static returnOrderedNodes(t){if(!t||t.length===0)return[];if(t.length===1)return t;let o=new Set,e=new Set,r=new Array;return this.createOrderedNodes(t,o,e,r),r}static createOrderedNodes(t,o,e,r){for(let n=0;n<t.length;++n)this.dfsTraverse(t[n],o,e,r)}static dfsTraverse(t,o,e,r){if(!t||e.has(t.name))return;if(o.has(t.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");o.add(t.name);let n=t.dependencies;if(n&&n.length>0)for(let s=0;s<n.length;++s)this.dfsTraverse(n[s],o,e,r);r.push(t),e.add(t.name),o.delete(t.name)}}});function ch(){let a="add_";return{body:`
  float ${a}(float a, float b) {
    return a + b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:a,type:0}}function ph(){let a="div_";return{body:`
  float ${a}(float a, float b) {
    return a / b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:a,type:0}}function dh(){let a="mul_";return{body:`
  float ${a}(float a, float b) {
    return a * b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:a,type:0}}function hh(){let a="sub_";return{body:`
  float ${a}(float a, float b) {
    return a - b;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:a,type:0}}function mh(){let a="equal_";return{body:`
  float ${a}(float a, float b) {
    return float(a == b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:a,type:0}}function bh(){let a="greater_";return{body:`
  float ${a}(float a, float b) {
    return float(a > b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:a,type:0}}function gh(){let a="less_";return{body:`
  float ${a}(float a, float b) {
    return float(a < b);
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:a,type:0}}function yh(){let a="and_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:a,type:0}}function Th(){let a="or_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:a,type:0}}function xh(){let a="xor_";return{body:`
  float ${a}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:a,type:0}}function wh(){return _h("pow")}function vh(){let a="prelu_";return{body:`
  float ${a}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${a}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:a,type:0}}function _h(a){let t=`${a}_`;return{body:`
  float ${t}(float a, float b) {
    return ${a}(a, b);
  }
  vec4 ${t}(vec4 v1, vec4 v2) {
    return ${a}(v1, v2);
  }
  `,name:t,type:0}}var ht,Oh,il,al,sl,ul,ll,fl,cl,pl,dl,hl,ml,bl,gl=L(()=>{"use strict";fe();Wt();we();ae();ht=(a,t,o,e=t[0].type,r)=>{let n=a.session.pack?2:0;return{name:o.name,inputNames:["A","B"],inputTypes:[n,n],cacheHint:r,get:()=>Oh(a,t,o,e)}},Oh=(a,t,o,e=t[0].type)=>{let r=a.session.pack?2:0,n=!U.areEqual(t[0].dims,t[1].dims),s=t[0].dims,i=a.session.pack;if(n){let c=Ze.calcShape(t[0].dims,t[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");s=c;let p=s.length,d=t[0].dims.length!==0?t[0].dims.length:1,T=t[1].dims.length!==0?t[1].dims.length:1,w=t[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",v=t[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",S=H(a.session.backend.glContext.version),A=i?`
      ${o.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${o.name}(a, b);
        ${S.output} = result;
      }`:`
      ${o.body}
      float process(int indices[${p}]) {
        int aindices[${d}];
        int bindices[${T}];
        ${w}
        ${v}
        return ${o.name}(_A(aindices), _B(bindices));
      }`;return{name:o.name,inputNames:["A","B"],inputTypes:[r,r],output:{dims:s,type:e,textureType:r},shaderSource:A,hasMain:i}}let u=H(a.session.backend.glContext.version),l=`
    ${o.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${o.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:o.name,inputNames:["A","B"],inputTypes:[r,r],output:{dims:t[0].dims,type:e,textureType:r},shaderSource:l,hasMain:!0}},il=(a,t)=>[a.run(ht(a,t,ch()),t)],al=(a,t)=>[a.run(ht(a,t,yh(),"bool"),t)],sl=(a,t)=>[a.run(ht(a,t,ph()),t)],ul=(a,t)=>[a.run(ht(a,t,mh(),"bool"),t)],ll=(a,t)=>[a.run(ht(a,t,bh(),"bool"),t)],fl=(a,t)=>[a.run(ht(a,t,gh(),"bool"),t)],cl=(a,t)=>[a.run(ht(a,t,dh()),t)],pl=(a,t)=>[a.run(ht(a,t,Th(),"bool"),t)],dl=(a,t)=>[a.run(ht(a,t,wh()),t)],hl=(a,t)=>[a.run(ht(a,t,vh()),t)],ml=(a,t)=>[a.run(ht(a,t,hh()),t)],bl=(a,t)=>[a.run(ht(a,t,xh(),"bool"),t)]});var yl,Tl,Sh,xl=L(()=>{"use strict";fe();yl=(a,t,o)=>(Sh(t),[a.cast(t[0],o)]),Tl=a=>We.tensorDataTypeFromProto(a.attributes.getInt("to")),Sh=a=>{if(!a||a.length!==1)throw new Error("Cast requires 1 input.");if(a[0].type==="string")throw new Error("Invalid input type.")}});var Ah,Ph,wl,eo,vl=L(()=>{"use strict";we();ae();Bt();Tr();Ah=(a,t)=>({name:"Concat (packed)",inputNames:Array.from({length:a},(o,e)=>`X${e}`),inputTypes:Array(a).fill(2),cacheHint:t}),Ph=(a,t,o,e)=>{let r=o[0].dims.slice();if(e>=r.length||e<-1*r.length)throw new Error("axis specified for concat doesn't match input dimensionality");e<0&&(e=r.length+e);let n=r.slice(0);for(let j=1;j<o.length;j++){let ie=o[j].dims.slice();for(let G=0;G<r.length;G++)if(G===e)n[e]+=ie[G];else if(r[G]!==ie[G])throw new Error("non concat dimensions must match")}let s=n.length,i=Br("coords",s),u=Qe(s),l=Nt(),c=o.map(j=>j.dims),p=Dt(s),d=new Array(c.length-1);d[0]=c[0][e];for(let j=1;j<d.length;j++)d[j]=d[j-1]+c[j][e];let T=p[e],w=p.slice(-2),v=p.join(),S=`if (${T} < ${d[0]}) {
        return getChannel(
            getX0(${v}), vec2(${w.join()}));
        }`;for(let j=1;j<d.length;j++){let ie=d[j-1];S+=`
            if (${T} < ${d[j]}  && ${T} >= ${d[j-1]}) {
              return getChannel(
                getX${j}(${eo(p,T,ie)}),
                vec2(${eo(w,T,ie)}));
            }`}let A=d.length,C=d[d.length-1];S+=`
            return getChannel(
              getX${A}(${eo(p,T,C)}),
              vec2(${eo(w,T,C)}));`;let F=H(a.session.backend.glContext.version),J=`
          ${l}
          float getValue(${p.map(j=>"int "+j)}) {
            ${S}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[s-1]};
            coords.${p[s-1]} = coords.${p[s-2]};
            coords.${p[s-2]} = lastDim;

            vec4 result = vec4(getValue(${i}), 0., 0., 0.);

            ${i[s-1]} = ${i[s-1]} + 1;
            if (${i[s-1]} < ${n[s-1]}) {
              result.g = getValue(${i});
            }

            ${i[s-2]} = ${i[s-2]} + 1;
            if (${i[s-2]} < ${n[s-2]}) {
              result.a = getValue(${i});
            }

            ${i[s-1]} = ${i[s-1]} - 1;
            if (${i[s-2]} < ${n[s-2]} &&
                ${i[s-1]} < ${n[s-1]}) {
              result.b = getValue(${i});
            }
            ${F.output} = result;
          }
        `;return{...t,output:{dims:n,type:o[0].type,textureType:2},shaderSource:J,hasMain:!0}},wl=(a,t,o)=>{let e=Ah(t.length,o.cacheKey);return{...e,get:()=>Ph(a,e,t,o.axis)}},eo=(a,t,o)=>{let e=a.indexOf(t);return a.map((n,s)=>s===e?`${n} - ${o}`:n).join()}});var _l,Eh,Dh,Lh,Ol,Ch,Fh,$h,Il,kh,Sl=L(()=>{"use strict";Ue();ae();vl();_l=(a,t,o)=>(kh(t),a.session.pack&&t[0].dims.length>1?[a.run(wl(a,t,o),t)]:[a.run(Lh(a,t,o),t)]),Eh=(a,t)=>({name:"Concat",inputNames:Array.from({length:a},(o,e)=>`X${e}`),inputTypes:Array(a).fill(0),cacheHint:t}),Dh=(a,t,o,e)=>{let r=o[0].dims.slice();if(e>=r.length||e<-1*r.length)throw new Error("axis specified for concat doesn't match input dimensionality");e<0&&(e=r.length+e);let n=r.slice(0);for(let T=1;T<o.length;T++){let w=o[T].dims.slice();for(let v=0;v<r.length;v++)if(v===e)n[e]+=w[v];else if(r[v]!==w[v])throw new Error("non concat dimensions must match")}let s=n.length,i=new Array(o.length),u=0;for(let T=0;T<i.length;++T)u+=o[T].dims[e],i[T]=u;let l="";o.length<5?l=Ol(i):l=Ch(i);let c=Fh(o.length,s),p=$h(i),d=`
        ${c}
        ${p}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${e}]);

          if(textureIndex != 0) {
            indices[${e}] = indices[${e}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...t,output:{dims:n,type:o[0].type,textureType:0},shaderSource:d}},Lh=(a,t,o)=>{let e=Eh(t.length,o.cacheKey);return{...e,get:()=>Dh(a,e,t,o.axis)}},Ol=a=>`int getTextureWhereDataResides(int index) {
      ${a.map((o,e)=>`if(index<${o}) {return ${e};}
`).join("")}
    }`,Ch=a=>Ol(a),Fh=(a,t)=>{let o=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${t}]) {`];for(let e=0;e<a;++e)e===0?o.push(`	if (textureIndex == ${e}) { return _X${e}(indices); }`):e===a-1?o.push(`	else { return _X${e}(indices); }`):o.push(`	else if (textureIndex == ${e}) { return _X${e}(indices); }`);return o.push("	}"),o.join(`
`)},$h=a=>{let t=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let o=0;o<a.length;++o)o===0?t.push(`	if (index == ${o}) { return ${a[o]}; }`):o===a.length-1?t.push(`	else { return ${a[o]}; }`):t.push(`	else if (index == ${o}) { return ${a[o]}; }`);return t.push("	}"),t.join(`
`)},Il=a=>Q({axis:a.attributes.getInt("axis")}),kh=a=>{if(!a||a.length<1)throw new Error("too few inputs");let t=a[0].type,o=a[0].dims.length;if(t==="string")throw new Error("string tensor is not supported yet");for(let e of a){if(e.type!==t)throw new Error("input tensors should be one type");if(e.dims.length!==o)throw new Error("input tensors should have the same shape")}}});function Bh(){return mt("abs")}function Nh(){return mt("acos")}function Rh(){return mt("asin")}function Mh(){return mt("atan")}function Gh(){return mt("ceil")}function Uh(){return mt("cos")}function zh(a){let t="elu";return{body:`
  const float alpha = float(${a});

  float ${t}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function Vh(){return mt("exp")}function Wh(){return mt("floor")}function xi(a,t){let o="clip";return{body:`
  const float min = float(${a});
  const float max = float(${t});

  float ${o}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${o}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:o,type:0}}function Hh(){let a="indentity";return{body:`
  float ${a}_(float a) {
    return a;
  }
  vec4 ${a}_(vec4 v) {
    return v;
  }
  `,name:a,type:0}}function qh(a){let t="leakyRelu";return{body:`
  const float alpha = float(${a});

  float ${t}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${t}_(vec4 v) {
    return vec4(${t}_(v.x), ${t}_(v.y), ${t}_(v.z), ${t}_(v.w));
  }
  `,name:t,type:0}}function jh(){return mt("log")}function Yh(){let a="neg";return{body:`
  float ${a}_(float a) {
    return -a;
  }
  vec4 ${a}_(vec4 v) {
    return -v;
  }
  `,name:a,type:0}}function Xh(){let a="not";return{body:`
  float ${a}_(float a) {
    return float( ! bool(a) );
  }
  bool ${a}_(bool a) {
    return !a;
  }
  vec4 ${a}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${a}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:a,type:0}}function Kh(){return mt("sin")}function wi(){let a="relu";return{body:`
  float ${a}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${a}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:a,type:0}}function vi(){let a="sigmoid";return{body:`
  float ${a}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${a}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:a,type:0}}function Jh(){return mt("sqrt")}function Zh(){return mt("tan")}function Qh(){let a="tanh";return{body:`
  float ${a}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${a}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:a,type:0}}function mt(a){return{body:`
  float ${a}_(float a) {
    return ${a}(a);
  }
  vec4 ${a}_(vec4 v) {
    return ${a}(v);
  }
  `,name:a,type:0}}var em,Ee,Al,Pl,El,Dl,_i,Ll,Cl,tm,Fl,$l,kl,Bl,Nl,Rl,Oi,Ml,Gl,Ul,zl,Vl,Wl,Hl,ql,jl,Yl,Xl,Ii=L(()=>{"use strict";Ue();fe();Wt();we();ae();em=(a,t,o,e)=>{let r=a.session.pack?2:0,n=H(a.session.backend.glContext.version);return{...t,output:{dims:o.dims,type:o.type,textureType:r},shaderSource:`
     ${e.body}
     void main() {
       vec4 v = ${n.texture2D}(A, TexCoords);
       v = ${e.name}_(v);
       ${n.output} = v;
     }
     `,hasMain:!0}},Ee=(a,t,o,e)=>{let r=a.session.pack?2:0,n={name:o.name,inputTypes:[r],inputNames:["A"],cacheHint:e};return{...n,get:()=>em(a,n,t,o)}},Al=(a,t)=>[a.run(Ee(a,t[0],Bh()),t)],Pl=(a,t)=>[a.run(Ee(a,t[0],Nh()),t)],El=(a,t)=>[a.run(Ee(a,t[0],Rh()),t)],Dl=(a,t)=>[a.run(Ee(a,t[0],Mh()),t)],_i=(a,t,o)=>[a.run(Ee(a,t[0],xi(o.min,o.max),o.cacheKey),t)],Ll=a=>Q({min:a.attributes.getFloat("min",br),max:a.attributes.getFloat("max",gr)}),Cl=(a,t)=>{let o=tm(a,t);return _i(a,[t[0]],o)},tm=(a,t)=>{if(t.length>=3&&(!a.session.isInitializer(t[1].dataId)||!a.session.isInitializer(t[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let o=t.length>=3?t[1].numberData[0]:br,e=t.length>=3?t[2].numberData[0]:gr;return Q({min:o,max:e})},Fl=(a,t)=>[a.run(Ee(a,t[0],Gh()),t)],$l=(a,t)=>[a.run(Ee(a,t[0],Uh()),t)],kl=(a,t,o)=>[a.run(Ee(a,t[0],zh(o.alpha),o.cacheKey),t)],Bl=a=>Q({alpha:a.attributes.getFloat("alpha",1)}),Nl=(a,t)=>[a.run(Ee(a,t[0],Vh()),t)],Rl=(a,t)=>[a.run(Ee(a,t[0],Wh()),t)],Oi=(a,t)=>[a.run(Ee(a,t[0],Hh()),t)],Ml=(a,t,o)=>[a.run(Ee(a,t[0],qh(o.alpha),o.cacheKey),t)],Gl=a=>Q({alpha:a.attributes.getFloat("alpha",.01)}),Ul=(a,t)=>[a.run(Ee(a,t[0],jh()),t)],zl=(a,t)=>[a.run(Ee(a,t[0],Yh()),t)],Vl=(a,t)=>[a.run(Ee(a,t[0],Xh()),t)],Wl=(a,t)=>[a.run(Ee(a,t[0],wi()),t)],Hl=(a,t)=>[a.run(Ee(a,t[0],vi()),t)],ql=(a,t)=>[a.run(Ee(a,t[0],Kh()),t)],jl=(a,t)=>[a.run(Ee(a,t[0],Jh()),t)],Yl=(a,t)=>[a.run(Ee(a,t[0],Zh()),t)],Xl=(a,t)=>[a.run(Ee(a,t[0],Qh()),t)]});function Rt(a){let t;switch(a.activation){case"Relu":t=wi();break;case"Sigmoid":t=vi();break;case"Clip":t=xi(a.clipMin,a.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let o=t.name,e=t.body,r=`value = ${o}_(value);`;return{activationFunction:e,applyActivation:r}}var Nr,xr=L(()=>{"use strict";fe();Ii();Nr=a=>{let t=a.getString("activation","");if(t==="Clip"){let[o,e]=a.getFloats("activation_params",[br,gr]);return{activation:t,clipMax:e,clipMin:o,activationCacheKey:`${t}:${o},${e}`}}return{activation:t,activationCacheKey:t}}});var nm,om,Kl,Jl=L(()=>{"use strict";lt();we();ae();to();xr();nm=(a,t)=>({name:"GroupedConv",inputNames:a?["X","W","Bias"]:["X","W"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t}),om=(a,t,o,e)=>{let n=t.length>2?"value += getBias(output_channel);":"",s=t[0].dims.slice(),i=t[1].dims.slice(),u=i[0]/e.group;ce.verbose("GroupedConv",`autpPad:${e.autoPad}, dilations:${e.dilations}, group:${e.group}, kernelShape:${e.kernelShape}, pads:${e.pads}, strides:${e.strides}`);let l=Rr(s,i,e.dilations,e.pads,e.strides),c=H(a.session.backend.glContext.version),{activationFunction:p,applyActivation:d}=Rt(e),T=`
  const ivec2 strides = ivec2(${e.strides[0]}, ${e.strides[1]});
  const ivec2 pads = ivec2(${e.pads[0]}, ${e.pads[1]});
  ${p}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${i[1]}; wInChannel++) {
      int input_channel = group_id * ${i[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${i[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${e.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${i[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${e.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${n}
    ${d}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...o,output:{dims:l,type:t[0].type,textureType:0},shaderSource:T,hasMain:!0}},Kl=(a,t,o)=>{let e=nm(t.length>2,o.cacheKey);return{...e,get:()=>om(a,t,e,o)}}});var im,am,Zl,Ql=L(()=>{"use strict";we();ae();Tr();im=a=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:a}),am=(a,t,o,e,r,n)=>{let s=o.dims,i=e.dims,u=2,l=3,c=r.length,p=[i[1]*i[2]*i[3],r[2]*r[3]],d=i[2]*i[3],T=Nt(),w=H(a.session.backend.glContext.version),v="";for(let A=0;A<=1;A++)for(let C=0;C<=1;C++)v+=`
            blockIndex = rc.x + ${C};
            pos = rc.y + ${A};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${r[c-1]})) * ${n.strides[0]} -
                ${n.pads[0]};
              d0 = offsetY + ${n.dilations[0]} * (imod(pos, ${d}) / ${i[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${r[c-1]}) * ${n.strides[1]} -
                  ${n.pads[1]};
                d1 = offsetX + ${n.dilations[1]} * imod(imod(pos, ${d}), ${i[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${d}.);
                    innerDims = vec2(d0, d1);
                    result[${A*2+C}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let S=`
      ${T}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${v}
          ${w.output} = result;
      }
            `;return{...t,output:{dims:p,type:o.type,textureType:2},shaderSource:S,hasMain:!0}},Zl=(a,t,o,e,r)=>{let n=im(r.cacheKey);return{...n,get:()=>am(a,n,t,o,e,r)}}});function um(a,t,o){let e=t[0].dims,r=t[1].dims,n=Ze.calcShape(e,r,!0);if(!n)throw new Error("Can't use matmul on the given tensors");let s=Qe(n.length),i=Dt(),{activationFunction:u,applyActivation:l}=Rt(o),c=t.length>2,p=c?"value += getBiasForMatmul();":"",d=c?`${Ai(s,i,t[2].dims,n,!1)}`:"",T=n.length,w=e.length,v=r.length,S=e[e.length-1],A=`
    ${u}
    ${d}
    float process(int indices[${T}]) {
        int a[${w}];
        int b[${v}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${S}; ++k) {
            a[${w-1}] = k;
            b[${v-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${l}
        return value;
    }`;return{...a,output:{dims:n,type:t[0].type,textureType:0},shaderSource:A}}function Si(a,t){let o=sm(a.length>2,t.activationCacheKey);return{...o,get:()=>um(o,a,t)}}function Ai(a,t,o,e,r){let n="",s=o.length,i=e.length,u=i-s;i<2&&s>0?n="coords":n=o.map((v,S)=>`coords.${t[S+u]}`).join(", ");let c=Ze.getBroadcastDims(o,e).map(v=>`coords.${t[v+u]} = 0;`).join(`
`),d=U.size(o)===1,T="vec4(outputValue.xx, outputValue.yy)";return d&&(T="vec4(outputValue.x)"),r?`
vec4 getBiasForMatmul() {
  ${a} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${n});
  return ${T};
}`:`
float getBiasForMatmul() {
  ${a} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var ef,tf,sm,lm,ro=L(()=>{"use strict";fe();ae();Bt();xr();Pi();ef=(a,t,o)=>(lm(t),a.session.pack?[a.run(no(a,t,o),t)]:[a.run(Si(t,o),t)]),tf=a=>Nr(a.attributes),sm=(a,t)=>({name:"MatMul",inputNames:a?["A","B","Bias"]:["A","B"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t});lm=a=>{if(!a||a.length!==2)throw new Error("MatMul requires 2 inputs.");if(a[0].dims[a[0].dims.length-1]!==a[1].dims[a[1].dims.length-2])throw new Error("shared dimension does not match.");if(a[0].type!=="float32"&&a[0].type!=="float64"||a[1].type!=="float32"&&a[1].type!=="float64")throw new Error("inputs should be float type");if(a[0].type!==a[1].type)throw new Error("inputs types should match")}});function pm(a,t,o,e){let r=[],n=[],s=o[0].dims,i=o[1].dims,u=s.length,l=i.length,c=e.length,p=c-u,d=c-l;r=s.map((F,J)=>`coords.${t[J+p]}`),r[u-1]="i*2",r.join(", "),n=i.map((F,J)=>`coords.${t[J+d]}`),n[l-2]="i*2",n.join(", ");let T=Ze.getBroadcastDims(s,e),w=Ze.getBroadcastDims(i,e),v=T.map(F=>`coords.${t[F+p]} = 0;`).join(`
`),S=w.map(F=>`coords.${t[F+d]} = 0;`).join(`
`),A=`int lastDim = coords.${t[c-1]};
  coords.${t[c-1]} = coords.${t[c-2]};
  coords.${t[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${a} coords = getOutputCoords();
  ${A}
  ${v}
  vec4 outputValue = getA(${r});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${a} coords = getOutputCoords();
  ${A}
  ${S}
  vec4 outputValue = getB(${n});
  return outputValue;
}`}function dm(a,t){let o="";for(let e=0;e<t-2;e++)o+=`rc.${a[e]}, `;return o+=`rc.${a[t-2]}, i*2`,o}function hm(a,t){let o="";for(let e=0;e<t-2;e++)o+=`rc.${a[e]}, `;return o+=`i*2, rc.${a[t-1]}`,o}var fm,cm,no,Pi=L(()=>{"use strict";fe();we();ae();Bt();xr();ro();fm=(a,t)=>({name:"MatMul (packed)",inputNames:a?["A","B","Bias"]:["A","B"],inputTypes:a?[2,2,2]:[2,2],cacheHint:t}),cm=(a,t,o,e)=>{let r=o.length>2,n=r?"value += getBiasForMatmul();":"",s=o[0].dims,i=o[1].dims,u=Ze.calcShape(s,i,!0),l=!U.areEqual(o[0].dims,o[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=s[s.length-1],p=Math.ceil(c/2),d=s.length,T=i.length,w=H(a.session.backend.glContext.version),v=Qe(u.length),S=u.length,A=Dt(),{activationFunction:C,applyActivation:F}=Rt(e),J=r?`${Ai(v,A,o[2].dims,u,!0)}`:"",j=l?`${pm(v,A,o,u)}`:"",ie=l?"getAAtOutCoordsMatmul(i)":`getA(${dm(A,d)})`,G=l?"getBAtOutCoordsMatmul(i)":`getB(${hm(A,T)})`,Te=l?"":`${v} rc =
          getOutputCoords(); int lastDim = rc.${A[S-1]}; rc.${A[S-1]} =
          rc.${A[S-2]}; rc.${A[S-2]} = lastDim;
      `,He=`
            ${j}
            ${J}
            ${C}
            void main() {
              ${Te}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${ie};
                vec4 b = ${G};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${n}
              ${F}
              ${w.output} = value;
            }`;return{...t,output:{dims:u,type:o[0].type,textureType:2},shaderSource:He,hasMain:!0}},no=(a,t,o)=>{let e=fm(t.length>2,o.activationCacheKey);return{...e,get:()=>cm(a,e,t,o)}}});var rf,nf=L(()=>{"use strict";to();Ql();Pi();rf=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=Rr(e,r,o.dilations,o.pads,o.strides),s=a.run(Zl(a,t[0],t[1],n,o),[t[0]]),i=a.reshapePacked(t[1],[r[0],r[1]*r[2]*r[3]]),u=t.length===3?[i,s,t[2]]:[i,s],l=a.run(no(a,u,o),u);return a.reshapePacked(l,n)}});var mm,bm,of,Ei,Di=L(()=>{"use strict";ae();mm=a=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:a}),bm=(a,t,o,e,r,n)=>{let s=o.dims,i=e.dims,u=r.length,l=Ei(s,i,r,4),c=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
        const int KH = ${n.kernelShape[0]};
        const int KW = ${n.kernelShape[1]};
        const int dilationH = ${n.dilations[0]};
        const int dilationW = ${n.dilations[1]};
        const int strideH = ${n.strides[0]};
        const int strideW = ${n.strides[1]};
        const int padH = ${n.pads[0]};
        const int padW = ${n.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${s.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...t,output:{dims:l,type:o.type,textureType:4},shaderSource:c}},of=(a,t,o,e,r)=>{let n=mm(r.cacheKey);return{...n,get:()=>bm(a,n,t,o,e,r)}},Ei=(a,t,o,e=4)=>[o[0],o[2],o[3],Math.ceil(a[1]*t[2]*t[3]/e)]});var gm,ym,af,sf=L(()=>{"use strict";fe();we();ae();xr();Di();gm=(a,t)=>({name:"ConvDotProduct",inputNames:a?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:a?[0,4,0]:[0,4],cacheKey:t.activationCacheKey}),ym=(a,t,o,e,r)=>{let n=o[0].dims,s=o[1].dims,i=[s[0],Math.ceil(n[1]*s[2]*s[3]/4)],u=Ei(n,s,e),[l,c]=a.calculateTextureWidthAndHeight(i,4),p=U.computeStrides(u),[d,T]=a.calculateTextureWidthAndHeight(u,4),w=e.length,v=o.length<3?"0.0":"_B(b)",S=Math.ceil(n[1]*s[2]*s[3]/4),{activationFunction:A,applyActivation:C}=Rt(r),F=H(a.session.backend.glContext.version),J=`
${A}
float process(int indices[${w}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${i[1]};
  float value = ${v};
  for (int i = 0; i < ${S}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${d}, ${T});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${F.texture2D}(Im2Col, im2colCoords), ${F.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${C}
  return value;
}`;return{...t,output:{dims:e,type:o[0].type,textureType:0},shaderSource:J}},af=(a,t,o,e)=>{let r=gm(t.length>2,e);return{...r,get:()=>ym(a,r,t,o,e)}}});var Rr,Li,Tm,xm,wm,vm,Ci,_m,to=L(()=>{"use strict";Ue();fe();Jl();nf();sf();xr();Di();ro();Rr=(a,t,o,e,r)=>{let n=a[0],s=a.slice(2),i=s.length,u=t[0],c=t.slice(2).map((w,v)=>w+(w-1)*(o[v]-1)),d=s.map((w,v)=>w+e[v]+e[v+i]).map((w,v)=>Math.floor((w-c[v]+r[v])/r[v]));return[n,u].concat(...d)},Li=(a,t,o)=>(_m(t,o),Tm(a,t,o)),Tm=(a,t,o)=>{let e=vm(o,t),r=a.session.pack,n=e.kernelShape[0]===1&&e.kernelShape[1]===1;return e.group>1?[a.run(Kl(a,t,e),t)]:n&&r?[xm(a,t,e)]:r&&t[0].dims.length===4&&t[0].dims[0]===1&&!n?[rf(a,t,e)]:[wm(a,t,e)]},xm=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=Rr(e,r,o.dilations,o.pads,o.strides),s=a.reshapeUnpacked(t[0],[e[1],e[2]*e[3]]),i=a.reshapeUnpacked(t[1],[r[0],r[1]]),u=t.length>2?[i,s,t[2]]:[i,s],l=a.run(Si(u,o),u);return a.reshapeUnpacked(l,n)},wm=(a,t,o)=>{let e=t[0].dims,r=t[1].dims,n=Rr(e,r,o.dilations,o.pads,o.strides),s=a.run(of(a,t[0],t[1],n,o),[t[0]]),i=t.length===3?[s,t[1],t[2]]:[s,t[1]];return a.run(af(a,t,n,o),i)},vm=(a,t)=>{let o=a.kernelShape.slice();if(a.kernelShape.length===0)for(let n=2;n<t[1].dims.length;++n)o.push(t[1].dims[n]);let e=a.pads.slice();mr.adjustPadsBasedOnAutoPad(t[0].dims,a.strides,a.dilations,o,e,a.autoPad);let r=Object.assign({},a);return Object.assign(r,{kernelShape:o,pads:e,cacheKey:a.cacheKey}),r},Ci=a=>{let t=a.attributes,o=Nr(t),e=t.getString("auto_pad","NOTSET"),r=t.getInts("dilations",[1,1]),n=t.getInt("group",1),s=t.getInts("kernel_shape",[]),i=t.getInts("pads",[0,0,0,0]),u=t.getInts("strides",[1,1]);return Q({autoPad:e,dilations:r,group:n,kernelShape:s,pads:i,strides:u,...o})},_m=(a,t)=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(a[0].dims.length!==4||a[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let o=a[0].dims[1],e=a[1].dims[1]*t.group;if(o!==e)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(a.length===3&&(a[2].dims.length!==1||a[1].dims[0]!==a[2].dims[0]))throw new Error("invalid bias");let r=a[0].dims.length-2;if(t.dilations.length!==r)throw new Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw new Error(`strides should be ${r}D`);if(t.pads.length!==r*2)throw new Error(`pads should be ${r*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==a[1].dims.length-2)throw new Error("invalid kernel shape");if(a[0].type!=="float32"||a[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(a.length===3&&a[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var Om,Im,Sm,uf,Am,Pm,Em,Dm,Lm,Cm,lf,Fm,ff=L(()=>{"use strict";Ue();we();ae();xr();Om=(a,t,o,e,r,n)=>(a-1)*t+o+(e-1)*r+1-n,Im=(a,t,o,e,r)=>{let n=Math.floor(a/2);t==="SAME_UPPER"?(o[e]=n,o[r]=a-n):t==="SAME_LOWER"&&(o[e]=a-n,o[r]=n)},Sm=(a,t,o,e,r,n,s,i)=>{let u=a.length-2,l=i.length===0;for(let c=0;c<u;++c){let p=l?a[c+2]*n[c]:i[c],d=Om(a[c+2],n[c],r[c],t[c],o[c],p);Im(d,e,r,c,c+u),l&&i.push(n[c]*(a[c+2]-1)+s[c]+(t[c]-1)*o[c]+1-r[c]-r[c+u])}},uf=(a,t,o)=>(Fm(t,o),Am(a,t,o)),Am=(a,t,o)=>{let e=Cm(o,t);return[Lm(a,t,e)]},Pm=(a,t)=>({name:"ConvTranspose",inputNames:a?["X","W","B"]:["X","W"],inputTypes:a?[0,0,0]:[0,0],cacheHint:t}),Em=(a,t,o,e)=>{let n=t.length>2?"getB(output_channel)":"0.0",s=t[0].dims,i=t[1].dims,u=i[1],l=i[0]/e.group,c=[t[0].dims[0],t[1].dims[1]*e.group,...e.outputShape],p=H(a.session.backend.glContext.version),{activationFunction:d,applyActivation:T}=Rt(e),w=`
  const ivec2 strides = ivec2(${e.strides[0]}, ${e.strides[1]});
  const ivec2 pads = ivec2(${e.pads[0]}, ${e.pads[1]});
  ${d}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${n};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${i[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${i[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${e.dilations[0]}, wHOff * ${e.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${T}
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...o,output:{dims:c,type:t[0].type,textureType:0},shaderSource:w,hasMain:!0}},Dm=(a,t,o)=>{let e=Pm(t.length>2,o.cacheKey);return{...e,get:()=>Em(a,t,e,o)}},Lm=(a,t,o)=>a.run(Dm(a,t,o),t),Cm=(a,t)=>{let o=a.kernelShape.slice();if(a.kernelShape.length===0)for(let i=2;i<t[1].dims.length;++i)o.push(t[1].dims[i]);let e=a.pads.slice(),r=a.outputShape.slice(),n=t[0].dims;Sm(n,o,a.dilations,a.autoPad,e,a.strides,a.outputPadding,r);let s=Object.assign({},a);return Object.assign(s,{kernelShape:o,pads:e,outputShape:r,cacheKey:a.cacheKey}),s},lf=a=>{let t=a.attributes,o=Nr(t),e=t.getString("auto_pad","NOTSET"),r=t.getInts("dilations",[1,1]),n=t.getInt("group",1),s=t.getInts("kernel_shape",[]),i=t.getInts("output_padding",[0,0]),u=t.getInts("output_shape",[]),l=t.getInts("pads",[0,0,0,0]),c=t.getInts("strides",[1,1]);return Q({autoPad:e,dilations:r,group:n,kernelShape:s,outputPadding:i,outputShape:u,pads:l,strides:c,...o})},Fm=(a,t)=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(a[0].dims.length!==4||a[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let o=a[0].dims[1],e=a[1].dims[0];if(o!==e)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=a[1].dims[1]*t.group;if(a.length===3&&(a[2].dims.length!==1||a[2].dims[0]!==r))throw new Error("invalid bias");let n=a[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==a[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==a[0].dims.length-2)throw new Error("invalid output shape");if(a[0].type!=="float32"||a[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(a.length===3&&a[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var cf,wr,pf,$m,df,km,Bm,Nm,oo=L(()=>{"use strict";Ue();fe();ae();cf={name:"Transpose",inputNames:["A"],inputTypes:[0]},wr=(a,t,o)=>(Nm(t),[a.run({...cf,cacheHint:o.cacheKey,get:()=>$m(a,t[0],o.perm)},t)]),pf=a=>Q({perm:a.attributes.getInts("perm",[])}),$m=(a,t,o)=>{let e=t.dims;o=df(e,o);let r=km(e,o),n=e.length,s=`
      ${Bm("perm",o,n)}
      float process(int indices[${n}]) {
        int a[${n}];
        perm(a, indices);
        return _A(a);
      }`;return{...cf,output:{dims:r,type:t.type,textureType:0},shaderSource:s}},df=(a,t)=>(t&&t.length!==a.length&&(t=[...a.keys()].reverse()),t),km=(a,t)=>(t=df(a,t),U.sortBasedOnPerm(a,t)),Bm=(a,t,o)=>{let e=[];e.push(`void ${a}(out int a[${o}], int src[${o}]) {`);for(let r=0;r<o;++r)e.push(`	a[${t[r]}]=src[${r}];`);return e.push("	}"),e.join(`
`)},Nm=a=>{if(!a||a.length!==1)throw new Error("Transpose requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("input should be float tensor")}});var hf,mf,Rm,bf=L(()=>{"use strict";oo();hf=(a,t,o)=>{Rm(t);let e=o.blocksize,r=e*e,n=o.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=o.mode==="DCR"?[t[0].dims[0],e,e,t[0].dims[1]/r,t[0].dims[2],t[0].dims[3]]:[t[0].dims[0],t[0].dims[1]/r,e,e,t[0].dims[2],t[0].dims[3]],i=a.reshapeUnpacked(t[0],s),u={perm:n,cacheKey:`${n}`},[l]=wr(a,[i],u),c=[t[0].dims[0],t[0].dims[1]/r,t[0].dims[2]*e,t[0].dims[3]*e];return[a.reshapeUnpacked(l,c)]},mf=a=>{let t=a.attributes.getInt("blocksize");if(t<1)throw new Error(`blocksize must be >= 1, but got : ${t} for DepthToSpace`);let o=a.attributes.getString("mode","DCR");if(o!=="DCR"&&o!=="CRD")throw new Error(`unrecognized mode: ${o} for DepthToSpace`);return{mode:o,blocksize:t}},Rm=a=>{if(a.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${a.length}`);if(a[0].type==="string"||a[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var gf,yf,Mm,Tf=L(()=>{"use strict";fe();gf=(a,t,o)=>{Mm(t,o);let e=U.flattenShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},yf=a=>a.attributes.getInt("axis",1),Mm=(a,t)=>{if(!a||a.length!==1)throw new Error("Flatten requires 1 input.");let o=a[0].dims.length;if(o===0)throw new Error("scalar tensor is not supported.");if(t<-o||t>o)throw new Error("Invalid axis");if(a[0].type==="string")throw new Error("string tensor is not supported.")}});var Qt,pn=L(()=>{"use strict";Qt=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var xf,wf,Gm,Um,zm,Vm,vf=L(()=>{"use strict";Ue();pn();fe();ae();xf=(a,t,o)=>(Vm(t,o.axis),[a.run(zm(a,t,o),t)]),wf=a=>Q({axis:a.attributes.getInt("axis",0)}),Gm={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},Um=(a,t,o,e)=>{let r=o[0].dims.slice(),n=o[1].dims.slice(),s=new Array(r.length+n.length-1);e=U.normalizeAxis(e,r.length);let i=[];for(let d=0;d<s.length;d++)d<e?(s[d]=r[d],i.push(`inputIdx[${d}] = outputIdx[${d}];`)):d<e+n.length?(s[d]=n[d-e],i.push(`indexDataIdx[${d-e}] = outputIdx[${d}];`)):(s[d]=r[d-n.length+1],i.push(`inputIdx[${d-n.length+1}] = outputIdx[${d}];`));let u=s.length||1,l=r.length,c=n.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${i.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${e}] = idx < 0 ? idx + ${r[e]} : idx;
        return _A(inputIdx);
      }`;return{...t,output:{dims:s,type:o[0].type,textureType:0},shaderSource:p}},zm=(a,t,o)=>{let e={...Gm,cacheHint:o.cacheKey};return{...e,get:()=>Um(a,e,t,o.axis)}},Vm=(a,t)=>{if(!a||a.length!==2)throw new Error("Gather requires 2 inputs.");let o=a[0].dims.length;if(o<1)throw new Error("Invalid input shape.");if(t<-o||t>o-1)throw new Error("Invalid axis.");if(Qt.indexOf(a[0].type)===-1)throw new Error("Invaid input type.");if(a[1].type!=="int32"&&a[1].type!=="int16")throw new Error("Invaid input type.")}});var Fi,_f,Of,If,Wm,Hm,qm,Sf=L(()=>{"use strict";Ue();fe();ae();Fi=(a,t,o)=>(qm(t,o),[a.run(Wm(t,o),t)]),_f=(a,t)=>{let o=a.attributes.getInt("transA",0)!==0,e=a.attributes.getInt("transB",0)!==0,r=a.attributes.getFloat("alpha",1),n=a.attributes.getFloat("beta",1);return Q({transA:o,transB:e,alpha:r,beta:n,isOptionalC:t})},Of=a=>_f(a,!1),If=a=>_f(a,!0),Wm=(a,t)=>{let o={name:"Gemm",inputNames:a.length===3?["A","B","C"]:["A","B"],inputTypes:a.length===3?[0,0,0]:[0,0],key:t.cacheKey};return{...o,get:()=>Hm(o,a,t)}},Hm=(a,t,o)=>{let e=t[0].dims.slice(),r=t[1].dims.slice(),[n,s]=jn.getShapeOfGemmResult(e,o.transA,r,o.transB,t.length===3?t[2].dims:void 0),i=[n,s];if(!i)throw new Error("Can't use gemm on the given tensors");let u=e[e.length-1],l="";o.transA&&(u=e[0]),o.transA&&o.transB?l="value += _A_T(a) * _B_T(b);":o.transA&&!o.transB?l="value += _A_T(a) * _B(b);":!o.transA&&o.transB?l="value += _A(a) * _B_T(b);":!o.transA&&!o.transB&&(l="value += _A(a) * _B(b);");let c=i.length,p=t.length===3?`int c[${t[2].dims.length}];`:"",d=t.length===3?"bcastIndices_C(indices, c);":"",T=t.length===3?"value += beta * _C(c);":"",w=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${d}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${T}
          return value;
      }`;return{...a,output:{dims:i,type:t[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:o.alpha},{name:"beta",type:"float",data:o.beta}],shaderSource:w}},qm=(a,t)=>{if(!a)throw new Error("Input is missing");if(t.isOptionalC&&(a.length<2||a.length>3))throw new Error("Invaid input shape.");if(!t.isOptionalC&&a.length!==3)throw new Error("Gemm requires 3 inputs");if(a.length===3&&a[2].dims.length!==1&&a[2].dims.length!==2)throw new Error("Invalid input shape of C");if(a[0].type!=="float32"&&a[0].type!=="float64"||a[1].type!=="float32"&&a[1].type!=="float64"||a.length===3&&a[2].type!=="float32"&&a[2].type!=="float64")throw new Error("Invalid input type.");if(a[0].type!==a[1].type||a.length===3&&a[0].type!==a[2].type)throw new Error("Input types are mismatched")}});var Af,Pf,jm,Ym,Xm,Km,Jm,Ef=L(()=>{"use strict";Ue();ae();Af=(a,t,o)=>(Jm(t),[a.run(Xm(a,t,o),t)]),Pf=a=>{let t=a.attributes.getFloat("scale"),o=a.attributes.getFloats("bias");return Q({scale:t,bias:o})},jm={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},Ym=(a,t,o,e)=>{let r=o[0].dims.slice(),n=r.length,i=`
      ${Km(e.bias.length)}
      float process(int indices[${n}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...t,output:{dims:r,type:o[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:e.bias.length,data:e.bias},{name:"scale",type:"float",data:e.scale}],shaderSource:i}},Xm=(a,t,o)=>{let e={...jm,cacheHint:o.cacheKey};return{...e,get:()=>Ym(a,e,t,o)}},Km=a=>{let t=[`float getBias(float bias[${a}], int channel) {`];for(let o=0;o<a;++o)o===0?t.push(`	if (channel == ${o}) { return bias[${o}]; }`):o===a-1?t.push(`	else { return bias[${o}]; }`):t.push(`	else if (channel == ${o}) { return bias[${o}]; }`);return t.push("	}"),t.join(`
`)},Jm=a=>{if(!a||a.length!==1)throw new Error("ImageScaler requires 1 input.");if(a[0].dims.length!==4)throw new Error("Invalid input shape.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")}});var Lf,Cf,Df,Zm,Qm,eb,tb,rb,nb,Ff=L(()=>{"use strict";we();ae();Lf=(a,t,o)=>{nb(t);let e=a.run(Qm(t[0]),t);return[a.run(rb(a,t[0],o,e.dims),[t[0],e,t[1],t[2]])]},Cf=a=>a.attributes.getFloat("epsilon",1e-5),Df={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},Zm=(a,t)=>{let o=t.dims.slice(),e=o[1],r=o[2]*o[3],n=[o[0],e],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${o[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${o[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${r});
        temp = 0.0;
        for(int a2=0; a2<${o[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${o[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${r});

        return v;
      }`;return{...a,output:{dims:n,type:t.type,textureType:4},shaderSource:s}},Qm=a=>({...Df,get:()=>Zm(Df,a)}),eb={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},tb=(a,t,o,e,r)=>{let n=H(a.session.backend.glContext.version),[s,i]=a.calculateTextureWidthAndHeight(r,4),[u,l]=[s/4,i],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${n.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...t,output:{dims:o.dims,type:o.type,textureType:0},variables:[{name:"epsilon",type:"float",data:e}],shaderSource:c}},rb=(a,t,o,e)=>{let r={...eb,cacheHint:`${o}`};return{...r,get:()=>tb(a,r,t,o,e)}},nb=a=>{if(!a||a.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let t=a[0],o=a[1],e=a[2];if(t.dims.length<3||o.dims.length!==1||e.dims.length!==1)throw new Error("Invalid input shape.");if(o.dims[0]!==t.dims[1]||e.dims[0]!==t.dims[1])throw new Error("Input shapes are mismatched.");if(t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||e.type!=="float32"&&e.type!=="float64")throw new Error("Invalid input type.");if(a[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function ob(a,t){let o=a[0].dims[1],e=a[0].dims.length,r=-Math.floor((t.size-1)/2),n=Math.ceil((t.size-1)/2),s=`float(${t.alpha}) / float(${t.size})`,i=`float(${t.bias})`,u=`float(${t.beta})`,l=`
    float process(int indices[${e}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${r}; i <= ${n}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${o}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${i} + ${s} * square_sum, ${u});
    }`;return{...Bf,cacheHint:t.cacheKey,output:{dims:a[0].dims,type:a[0].type,textureType:0},shaderSource:l}}function ib(a,t){return{...Bf,cacheHint:t.cacheKey,get:()=>ob(a,t)}}var $f,kf,Bf,ab,Nf=L(()=>{"use strict";Ue();ae();$f=(a,t,o)=>(ab(t),[a.run(ib(t,o),t)]),kf=a=>{let t=a.attributes.getFloat("alpha",1e-4),o=a.attributes.getFloat("beta",.75),e=a.attributes.getFloat("bias",1),r=a.attributes.getInt("size");return Q({alpha:t,beta:o,bias:e,size:r})},Bf={name:"LRN",inputNames:["X"],inputTypes:[0]};ab=a=>{if(!a||a.length!==1)throw new Error("LRN requires 1 input.");if(a[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(a[0].type!=="float32")throw new Error("input should be float type")}});var sb,$i,Rf,Mf,Gf,ub,lb,fb,cb,pb,db,hb,mb,Uf=L(()=>{"use strict";Ue();fe();we();ae();sb={name:"Pad",inputNames:["A"],inputTypes:[0]},$i=(a,t,o)=>(fb(t),[a.run({...sb,cacheHint:o.cacheKey,get:()=>lb(a,t[0],o)},t)]),Rf=a=>{let t=a.attributes.getString("mode","constant"),o=a.attributes.getFloat("value",0),e=a.attributes.getInts("pads");return Q({mode:t,value:o,pads:e})},Mf=(a,t,o)=>{cb(t);let e=ub(a,t,o);return $i(a,[t[0]],e)},Gf=a=>a.attributes.getString("mode","constant"),ub=(a,t,o)=>{if(!a.session.isInitializer(t[1].dataId)||t.length>=3&&!a.session.isInitializer(t[2].dataId))throw new Error("dynamic pad attributes are not allowed");let e=Array.from(t[1].integerData),r=t.length>=3?t[2].floatData[0]:0;return Q({mode:o,pads:e,value:r})},lb=(a,t,o)=>{let e=U.padShape(t.dims.slice(),o.pads),r=e.length,s=`
      ${pb(a,t,o)}
      float process(int[${r}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:e,type:t.type,textureType:0},shaderSource:s}},fb=a=>{if(!a||a.length!==1)throw new Error("Pad requires 1 input");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")},cb=a=>{if(!a||a.length!==2&&a.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(a[1].type!=="int32")throw new Error("Invalid input type.");if(a.length>=3&&a[2].type==="string")throw new Error("Invalid input type.")},pb=(a,t,o)=>{let e=H(a.session.backend.glContext.version),[r,n]=a.calculateTextureWidthAndHeight(t.dims,0),s=U.computeStrides(t.dims);switch(o.mode){case"constant":return db(e,t.dims,s,r,n,o.pads,o.value);case"reflect":return hb(e,t.dims,s,r,n,o.pads);case"edge":return mb(e,t.dims,s,r,n,o.pads);default:throw new Error("Invalid mode")}},db=(a,t,o,e,r,n,s)=>{let i=t.length,u="";for(let l=i-1;l>=0;--l)u+=`
        k = m[${l}] - ${n[l]};
        if (k < 0)  return constant;
        if (k >= ${t[l]}) return constant;
        offset += k * ${o[l]};
        `;return`
      float padA(int m[${i}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `},hb=(a,t,o,e,r,n)=>{let s=t.length,i="";for(let u=s-1;u>=0;--u)i+=`
        k = m[${u}] - ${n[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(t[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${t[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${o[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${i}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `},mb=(a,t,o,e,r,n)=>{let s=t.length,i="";for(let u=s-1;u>=0;--u)i+=`
        k = m[${u}] - ${n[u]};
        if (k < 0)  k = 0;
        if (k >= ${t[u]}) k = ${t[u]-1};
        offset += k * ${o[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${i}
        vec2 coords = offsetToCoords(offset, ${e}, ${r});
        float value = getColorAsFloat(${a.texture2D}(A, coords));
        return value;
      }
      `}});var Vf,Wf,Hf,qf,jf,Yf,Xf,Kf,Jf,bb,zf,Zf,ao,Qf,io,gb,ec=L(()=>{"use strict";Ue();fe();ae();Vf=(a,t,o)=>{ao(t);let e={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:o.cacheKey};return[a.run({...e,get:()=>Hf(t,e,!1,o)},t)]},Wf=a=>{let t=a.attributes.getString("auto_pad","NOTSET"),o=a.attributes.getInt("ceil_mode",0),e=a.attributes.getInt("count_include_pad",0)!==0,r=a.attributes.getInts("kernel_shape"),n=a.attributes.getInts("strides",[]),s=a.attributes.getInts("pads",[]);if(o!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Q({autoPad:t,ceilMode:o,countIncludePad:e,kernelShape:r,strides:n,pads:s})},Hf=(a,t,o,e)=>{let[r,n]=Jf(a,e,o),s=U.size(r.kernelShape),i="value += _X(x);",u="";r.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let c=`
        ${Qf(a[0].dims,r,i,u,"0.0")}
      `;return{...t,output:{dims:n,type:a[0].type,textureType:0},shaderSource:c}},qf=(a,t,o)=>{ao(t);let e={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${o.countIncludePad}`};return[a.run({...e,get:()=>Hf(t,e,!0,o)},t)]},jf=a=>{let t=a.attributes.getInt("count_include_pad",0)!==0;return Q({autoPad:"",ceilMode:0,countIncludePad:t,kernelShape:[],strides:[],pads:[]})},Yf=(a,t,o)=>{ao(t);let e={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:o.cacheKey};return[a.run({...e,get:()=>Kf(t,e,!1,o)},t)]},Xf=a=>{let t=a.attributes.getString("auto_pad","NOTSET"),o=a.attributes.getInt("ceil_mode",0),e=a.attributes.getInts("kernel_shape"),r=a.attributes.getInts("strides",[]),n=a.attributes.getInts("pads",[]),s=a.attributes.getInt("storage_order",0),i=a.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(o!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Q({autoPad:t,ceilMode:o,countIncludePad:!1,kernelShape:e,strides:r,pads:n,storageOrder:s,dilations:i})},Kf=(a,t,o,e)=>{let[r,n]=Jf(a,e,o),s=`
      value = max(_X(x), value);
    `,i="",l=`
      ${Qf(a[0].dims,r,s,i,"-1e5")}
    `;return{...t,output:{dims:n,type:a[0].type,textureType:0},shaderSource:l}},Jf=(a,t,o)=>{let e=a[0].dims.slice(),r=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),s=t.strides.slice(),i=r?t.dilations.slice():[],u=t.pads.slice();mr.adjustPoolAttributes(o,e,n,s,i,u);let l=mr.computePoolOutputShape(o,e,s,i,n,u,t.autoPad),c=Object.assign({},t);return r?Object.assign(c,{kernelShape:n,strides:s,pads:u,dilations:i,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:n,strides:s,pads:u,cacheKey:t.cacheKey}),[c,l]},bb={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},zf={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Zf=(a,t)=>(ao(t),[a.run({...zf,get:()=>Kf(t,zf,!0,bb)},t)]),ao=a=>{if(!a||a.length!==1)throw new Error("Pool ops requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.")},Qf=(a,t,o,e,r)=>{let n=a.length;if(t.kernelShape.length<=2){let s=t.kernelShape[t.kernelShape.length-1],i=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=a[n-1],p="",d="",T="";if(u+l!==0?p=`
          for (int i = 0; i < ${s}; i++) {
            x[${n} - 1] = indices[${n} - 1] * ${i} - ${u} + i;
            if (x[${n} - 1] < 0 || x[${n} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${o}
          }`:p=`
          for (int i = 0; i < ${s}; i++) {
            x[${n} - 1] = indices[${n} - 1] * ${i} - ${u} + i;
            ${o}
          }`,t.kernelShape.length===2){let v=t.kernelShape[t.kernelShape.length-2],S=t.strides[t.strides.length-2],A=t.pads[t.pads.length/2-2],C=t.pads[t.pads.length-2],F=a[n-2];A+C!==0?d=`
            for (int j = 0; j < ${v}; j++) {
              x[${n} - 2] = indices[${n} - 2] * ${S} - ${A} + j;
              if (x[${n} - 2] < 0 || x[${n} - 2] >= ${F}) {
                pad+= ${s};
                continue;
              }
          `:d=`
            for (int j = 0; j < ${v}; j++) {
              x[${n} - 2] = indices[${n} - 2] * ${S} - ${A} + j;
            `,T=`
          }
        `}return`
        float process(int indices[${n}]) {
          int x[${n}];
          copyVec(indices, x);

          float value = ${r};
          int pad = 0;
          ${d}
          ${p}
          ${T}
          ${e}
          return value;
        }
      `}else{let s=U.size(t.kernelShape),i=U.computeStrides(t.kernelShape),u=i.length,l=t.pads.length,c=gb(u),p=io(a,"inputDims"),d=io(t.pads,"pads"),T=io(i,"kernelStrides"),w=io(t.strides,"strides"),v=t.pads.reduce((C,F)=>C+F),S="";return v?S=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${o}
          }`:S=`
          }
          ${o}
        `,`
        ${c}
        float process(int indices[${n}]) {
          int x[${n}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${n}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${d}
          ${p}
          ${w}
          ${T}

          float value = ${r};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${n} - ${u}; j < ${n}; j++) {
              x[j] = indices[j] * strides[j - ${n} + ${u}]
                + offset[j - ${n} + ${u}] - pads[j - 2];
              ${S}
          }
          ${e}

          return value;
        }
      `}},io=(a,t)=>{let o="";for(let e=0;e<a.length;e++)o+=`
      ${t}[${e}] = ${a[e]};
    `;return o},gb=a=>`
  void offsetToIndices(int offset, int[${a}] strides, out int[${a}] indices) {
    if (${a} == 0) {
      return;
    }
    for (int i = 0; i < ${a} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${a} - 1] = offset;
  }`});var vr,er,yb,Tb,tc,rc,nc,oc,ic,ac,sc,uc=L(()=>{"use strict";Ue();pn();fe();ae();vr=(a,t,o,e,r)=>{Tb(t);let n={name:e,inputNames:["A"],inputTypes:[0]};return[a.run({...n,cacheHint:o.cacheKey,get:()=>yb(a,t,o,e,r,n)},t)]},er=a=>{let t=a.attributes.getInts("axes",[]),o=a.attributes.getInt("keepdims",1)===1;return Q({axes:t,keepDims:o})},yb=(a,t,o,e,r,n)=>{let s=[],i=t[0].dims.length||1,u=[],l=U.normalizeAxes(o.axes,t[0].dims.length),c=r(t,l),p=c[1];for(let w=0;w<t[0].dims.length;w++)l.indexOf(w)>=0||l.length===0?(o.keepDims&&s.push(1),p=`
          for(int j${w} = 0; j${w} < ${t[0].dims[w]}; j${w}++) {
            inputIdx[${w}] = j${w};
            ${p}
          }`):(u.push(`inputIdx[${w}] = outputIdx[${s.length}];`),s.push(t[0].dims[w]));let T=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${i}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${p}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...n,output:{dims:s,type:t[0].type,textureType:0},shaderSource:T}},Tb=a=>{if(!a||a.length!==1)throw new Error("Reduce op requires 1 input.");if(Qt.indexOf(a[0].type)===-1)throw new Error("Invalid input type.")},tc=(a,t,o)=>vr(a,t,o,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),rc=(a,t,o)=>vr(a,t,o,"ReduceMean",(r,n)=>{let s=1;for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&(s*=r[0].dims[i]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),nc=(a,t,o)=>vr(a,t,o,"ReduceMax",(r,n)=>{let s=[];for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&s.push(`inputIdx[${i}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),oc=(a,t,o)=>vr(a,t,o,"ReduceMin",(r,n)=>{let s=[];for(let i=0;i<r[0].dims.length;i++)(n.indexOf(i)>=0||n.length===0)&&s.push(`inputIdx[${i}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),ic=(a,t,o)=>vr(a,t,o,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),ac=(a,t,o)=>vr(a,t,o,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),sc=(a,t,o)=>vr(a,t,o,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var lc,fc=L(()=>{"use strict";fe();lc=(a,t)=>{let o=U.calculateReshapedDims(t[0].dims,t[1].integerData);return a.session.pack?[a.reshapePacked(t[0],o)]:[a.reshapeUnpacked(t[0],o)]}});var cc,ki,pc,dc,dn,xb,Bi,so,Ni=L(()=>{"use strict";Ue();we();ae();cc={name:"Upsample",inputNames:["X"],inputTypes:[0]},ki=(a,t,o)=>(Bi(t,o),[a.run({...cc,cacheHint:o.cacheKey,get:()=>xb(a,t,o)},t)]),pc=a=>dn(a,7),dc=a=>dn(a,9),dn=(a,t)=>{let o=t>=10,e=a.attributes.getString("mode","nearest");if(e!=="nearest"&&e!=="linear"&&(t<11||e!=="cubic"))throw new Error(`unrecognized mode: ${e}`);let r=[];t<9&&(r=a.attributes.getFloats("scales"),so(r,e,o));let n=a.attributes.getFloat("extrapolation_value",0),s=t>10?a.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let i=s==="tf_crop_and_resize",u=i,l=e==="nearest"&&t>=11?a.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=a.attributes.getFloat("cubic_coeff_a",-.75),p=a.attributes.getInt("exclude_outside",0)!==0;if(p&&e!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let d=t<11?!0:e==="nearest"&&s==="asymmetric"&&l==="floor",T=0,w=0,v=0;return t>10?a.inputs.length>2?(T=1,w=2,v=3):(w=1,v=2):t===9&&(w=1),Q({opset:t,isResize:o,mode:e,scales:r,extrapolationValue:n,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:i,nearestMode:l,cubicCoefficientA:c,excludeOutside:p,useNearest2xOptimization:d,roiInputIdx:T,scalesInputIdx:w,sizesInputIdx:v})},xb=(a,t,o)=>{let e=H(a.session.backend.glContext.version),[r,n]=a.calculateTextureWidthAndHeight(t[0].dims,0),s=t[0].dims.map((v,S)=>Math.floor(v*o.scales[S])),[i,u]=a.calculateTextureWidthAndHeight(s,0),l=s.length,c=new Array(l),p=new Array(l),d=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let v=l-1;v>=0;v--)c[v]=v===l-1?1:c[v+1]*s[v+1],p[v]=v===l-1?1:p[v+1]*t[0].dims[v+1],d+=`
        output_pitches[${v}] = ${c[v]};
        input_pitches[${v}] = ${p[v]};
        `;let T=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${r}, ${n});
        float value = getColorAsFloat(${e.texture2D}(X, coords));
        return value;
      }
      `,w=o.mode==="nearest"?`
    ${T}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${d}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${T}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${d}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${t[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${T}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${i}, ${u});

      ${d}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${t[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...cc,output:{dims:s,type:t[0].type,textureType:0},shaderSource:w,variables:[{name:"scales",type:"int",arrayLength:o.scales.length,data:o.scales.map(v=>Math.ceil(v))}]}},Bi=(a,t)=>{if(!a||t.opset<9&&a.length!==1||t.opset>=9&&t.opset<11&&a.length!==2||t.opset>=11&&a.length<2)throw new Error("invalid inputs.");if(t.scales.length>0&&a[0].dims.length!==t.scales.length)throw new Error("Invalid input shape.");if(a[0].type==="string")throw new Error("Invalid input tensor types.")},so=(a,t,o)=>{if(o){for(let e of a)if(e<=0)throw new Error("Scale value should be greater than 0.")}else for(let e of a)if(e<1)throw new Error("Scale value should be greater than or equal to 1.");if((t==="linear"||t==="cubic")&&a.length!==2&&(a.length!==4||a[0]!==1||a[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${o?"Resize":"Upsample"} opeartor.`)}});var Ri,Mi,hc,mc,wb,vb,_b,Ob,bc=L(()=>{"use strict";we();ae();Bt();Tr();Ni();Ri={name:"Resize",inputNames:["A"],inputTypes:[2]},Mi=(a,t,o)=>(Bi(t,o),[a.run({...Ri,cacheHint:o.cacheKey,get:()=>wb(a,t,o)},t)]),hc=a=>dn(a,10),mc=a=>dn(a,11),wb=(a,t,o)=>{let e=H(a.session.backend.glContext.version),[r,n]=vb(t,o);if(r.every(F=>F===1)&&o.coordinateTransformMode!=="tf_crop_and_resize")return{...Ri,output:{dims:n,type:t[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${e.texture2D}(X, TexCoords);
                    ${e.output} = v;
                }`};let i=n.length;if(i<2)throw new Error(`output dimension should be at least 2, but got ${i}`);let u=n[i-2],l=n[i-1],c=t[0].dims;if(i!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${i}`);let p=c[i-2],d=c[i-1],T=r[i-2],w=r[i-1],v="";if(o.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${o.mode}'`);switch(o.coordinateTransformMode){case"asymmetric":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":v=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${d}.0 - 1.0, ${p}.0 - 1.0, ${d}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${o.coordinateTransformMode}'`)}let S=Qe(i),A=Nt(),C=`
            const vec2 inputWH = vec2(${p}.0, ${d}.0);
            const vec4 scaleWHWH = vec4(float(${T}), float(${w}), float(${T}), float(${w}));
            ${A}
            ${v}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${S} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${e.output} = vec4(newValue);
            }
        `;return{...Ri,output:{dims:n,type:t[0].type,textureType:2},hasMain:!0,shaderSource:C}},vb=(a,t)=>{let e=a[0].dims,r=t.scales,n;if(r.length===0){let i=a[t.scalesInputIdx];if(i&&i.size!==0){if(a[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");r=_b(i,t.mode,t.isResize)}else{let u=a[t.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");n=Array.from(u.integerData),r=Ob(n,e,t.mode,t.isResize)}}else if(a[t.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=n||e.map((i,u)=>Math.floor(i*r[u]));return[r,s]},_b=(a,t,o)=>{let e=Array.from(a.floatData);return so(e,t,o),e},Ob=(a,t,o,e)=>{let r=t.length,n=new Array(r);for(let s=0,i=r;s<i;s++)if(t[s]===0){if(a[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");n[s]=1}else n[s]=a[s]/t[s];return so(n,o,e),n}});var gc,Ib,yc=L(()=>{"use strict";yr();gc=(a,t)=>(Ib(t),[new $e([t[0].dims.length],"int32",void 0,void 0,new Int32Array(t[0].dims))]),Ib=a=>{if(!a||a.length!==1)throw new Error("Shape requires 1 input.")}});var Gi,Tc,xc,wc,Sb,vc,Ab,Pb,_c=L(()=>{"use strict";Ue();pn();fe();ae();Gi={name:"Slice",inputNames:["A"],inputTypes:[0]},Tc=(a,t,o)=>(Sb(t),[a.run({...Gi,cacheHint:o.cacheKey,get:()=>wc(a,t[0],o)},t)]),xc=a=>{let t=a.attributes.getInts("starts"),o=a.attributes.getInts("ends"),e=a.attributes.getInts("axes",[]);return Q({starts:t,ends:o,axes:e})},wc=(a,t,o)=>{let e=o.axes.length===0?t.dims.slice(0).map((p,d)=>d):o.axes,r=U.normalizeAxes(e,t.dims.length),n=o.starts.map((p,d)=>p>t.dims[r[d]]-1?t.dims[r[d]]:U.normalizeAxis(p,t.dims[r[d]])),s=o.ends.map((p,d)=>p>t.dims[r[d]]-1?t.dims[r[d]]:U.normalizeAxis(p,t.dims[r[d]])),i=t.dims.slice(),u=[];for(let p=0;p<r.length;p++)i[r[p]]=s[p]-n[p],n[p]>0&&u.push(`outputIdx[${r[p]}] += ${n[p]};`);let c=`
      float process(int outputIdx[${i.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Gi,output:{dims:i,type:t.type,textureType:0},shaderSource:c}},Sb=a=>{if(!a||a.length!==1)throw new Error("Slice requires 1 input.");if(Qt.indexOf(a[0].type)===-1)throw new Error("Invalid input type.")},vc=(a,t)=>{Pb(t);let o=Ab(a,t);return[a.run({...Gi,cacheHint:o.cacheKey,get:()=>wc(a,t[0],o)},[t[0]])]},Ab=(a,t)=>{if(!a.session.isInitializer(t[1].dataId)||!a.session.isInitializer(t[2].dataId)||t.length>=4&&!a.session.isInitializer(t[3].dataId)||t.length>=5&&!a.session.isInitializer(t[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(t.length>=5&&t[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let o=Array.from(t[1].integerData),e=Array.from(t[2].integerData),r=t.length>=4?Array.from(t[3].integerData):[],n=`${r};${o};${e}`;return{starts:o,ends:e,axes:r,cacheKey:n}},Pb=a=>{if(!a||a.length<3||a.length>5)throw new Error("Invalid input number.");if(a[1].type!=="int32"||a[1].dims.length!==1)throw new Error("Invalid input type.");if(a[2].type!=="int32"||a[2].dims.length!==1)throw new Error("Invalid input type.");if(a.length>=4&&(a[3].type!=="int32"||a[3].dims.length!==1))throw new Error("Invalid input type.");if(a.length>=5&&(a[4].type!=="int32"||a[4].dims.length!==1))throw new Error("Invalid input type.")}});var Oc,Ic,Sc,Ac,Pc,Ec,Dc,Lc,Eb,Db,Lb,Cc,Fc=L(()=>{"use strict";Ue();fe();we();ae();oo();Oc={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Ic={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Sc={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Ac=(a,t,o)=>{Cc(t);let e=t[0].dims.slice(),r=U.normalizeAxis(o.axis,e.length),n=U.sizeToDimension(e,r),s=U.sizeFromDimension(e,r);return Lc(a,t,o,n,s)},Pc=a=>Q({axis:a.attributes.getInt("axis",1)}),Ec=a=>Q({axis:a.attributes.getInt("axis",-1)}),Dc=(a,t,o)=>{Cc(t);let e=t[0].dims.slice(),r=U.normalizeAxis(o.axis,e.length),n=e.length,s=r!==n-1,i=[],u=[],l=[],c;s&&(u=Array.from({length:n}).map((w,v)=>v),u[r]=n-1,u[n-1]=r,u.map(w=>i.push(e[w])),c=Q({perm:u}),l=wr(a,t,c));let p=s?U.sizeToDimension(i,n-1):U.sizeToDimension(e,n-1),d=s?U.sizeFromDimension(i,n-1):U.sizeFromDimension(e,n-1),T=Lc(a,s?l:t,o,p,d);return s?wr(a,T,c):T},Lc=(a,t,o,e,r)=>{let n=Eb(a,t[0],e,r,[e]),s=a.run({...Oc,cacheHint:o.cacheKey,get:()=>n},t),i=Db(a,t[0],e,r,n.output.dims,[e]),u=a.run({...Ic,cacheHint:o.cacheKey,get:()=>i},[t[0],s]),l=Lb(a,t[0],e,r,n.output.dims,i.output.dims);return[a.run({...Sc,cacheHint:o.cacheKey,get:()=>l},[t[0],s,u])]},Eb=(a,t,o,e,r)=>{let[n,s]=a.calculateTextureWidthAndHeight(t.dims,0),i=r.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(r.length!==1)throw new Error("Dimensionality of the output should be 1");if(r[0]!==o)throw new Error("Shape of the output should be equal to logical row count");let u=H(a.session.backend.glContext.version),l=`
      float process(int[${i}] indices) {
        int logical_row_start_offset = indices[0] * ${e};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${n},
        ${s} )));
        for(int i=1; i<${e}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${n}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Oc,output:{dims:r,type:t.type,textureType:0},shaderSource:l}},Db=(a,t,o,e,r,n)=>{let[s,i]=a.calculateTextureWidthAndHeight(t.dims,0),u=n.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(n.length!==1)throw new Error("Dimensionality of the output should be 1");if(n[0]!==o)throw new Error("Shape of the output should be equal to logical row count");if(r.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(r[0]!==o)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=H(a.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${e};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${e}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${i}))) - max);
        }

        return norm_factor;
      }`;return{...Ic,output:{dims:n,type:t.type,textureType:0},shaderSource:c}},Lb=(a,t,o,e,r,n)=>{let[s,i]=a.calculateTextureWidthAndHeight(t.dims,0),u=t.dims.length;if(o<1||e<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(r.length!==1||n.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(r[0]!==o||n[0]!==o)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${i});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${e};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Sc,output:{dims:t.dims,type:t.type,textureType:0},shaderSource:l}},Cc=a=>{if(!a||a.length!==1)throw new Error("Softmax requires 1 input.");if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type")}});var $c,kc,Bc,Cb,Fb,$b,Nc=L(()=>{"use strict";Ue();fe();ae();$c={name:"Split",inputNames:["A"],inputTypes:[0]},kc=(a,t,o)=>{$b(t);let e=U.normalizeAxis(o.axis,t[0].dims.length),r=Cb(a,t,e,o),n=[];for(let s=0;s<r;++s)n.push(a.run({...$c,cacheHint:`${o.cacheKey};${s}`,get:()=>Fb(a,t[0],o,e,s)},t));return n},Bc=a=>{let t=a.attributes.getInt("axis",0),o=a.attributes.getInts("split",[]),e=a.outputs.length;return Q({axis:t,split:o,numOutputs:e})},Cb=(a,t,o,e)=>{let[,r]=an.splitShape(t[0].dims,o,e.split,e.numOutputs);return r.length},Fb=(a,t,o,e,r)=>{let[n,s]=an.splitShape(t.dims,e,o.split,o.numOutputs),i=s[r],u=n[r],c=`
      float process(int indices[${u.length}]) {
        indices[${e}] += ${i};
        return _A(indices);
      }
    `;return{...$c,cacheHint:`${o.cacheKey}:${r}`,output:{dims:u,type:t.type,textureType:0},shaderSource:c}},$b=a=>{if(!a||a.length!==1)throw new Error("Split requires one input.");if(a[0].type!=="int8"&&a[0].type!=="uint8"&&a[0].type!=="int16"&&a[0].type!=="uint16"&&a[0].type!=="int32"&&a[0].type!=="uint32"&&a[0].type!=="float32"&&a[0].type!=="float64"&&a[0].type!=="bool")throw new Error("Invalid input type.")}});var Ui,Rc,Mc,kb,Bb,Gc=L(()=>{"use strict";fe();Ui=(a,t,o)=>{kb(t);let e=U.squeezeShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},Rc=(a,t)=>(Bb(t),Ui(a,[t[0]],Array.from(t[1].integerData))),Mc=a=>a.attributes.getInts("axes"),kb=a=>{if(!a||a.length!==1)throw new Error("Squeeze requires 1 input.");if(a[0].type==="string")throw new Error("invalid input tensor types.")},Bb=a=>{if(!a||a.length!==2)throw new Error("Squeeze requires 2 inputs.");if(a[1].type!=="int32")throw new Error("Invalid input type.")}});var Uc,Nb,Rb,zc=L(()=>{"use strict";we();ae();Uc=(a,t)=>{Rb(t);let o={name:"Sum",inputNames:t.map((r,n)=>`X${n}`),inputTypes:new Array(t.length).fill(0)};return[a.run({...o,get:()=>Nb(a,t,o)},t)]},Nb=(a,t,o)=>{let e=H(a.session.backend.glContext.version),r=t[0].dims.slice(),s=`
      void main() {
        vec4 result = ${t.map((i,u)=>`${e.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${e.output} = result;
      }
    `;return{...o,output:{dims:r,type:t[0].type,textureType:0},hasMain:!0,shaderSource:s}},Rb=a=>{if(!a||a.length===0)throw new Error("Sum requires inputs.");let t=a[0].dims.length;for(let o=1;o<a.length;o++){if(t!==a[o].dims.length)throw new Error("Input shapes are mismatched.");for(let e=0;e<t;e++)if(a[0].dims[e]!==a[o].dims[e])throw new Error("Input shapes are not matched.")}if(a[0].type!=="float32"&&a[0].type!=="float64")throw new Error("Invalid input type.");for(let o=1;o<a.length;o++)if(a[0].type!==a[o].type)throw new Error("Input types are not matched.")}});var Vc,Mb,Gb,Wc=L(()=>{"use strict";pn();ae();Vc=(a,t)=>{Gb(t);let o={name:"Tile",inputNames:["A"],inputTypes:[0]};return[a.run({...o,get:()=>Mb(a,t,o)},t)]},Mb=(a,t,o)=>{let e=t[0].dims.slice(),r=new Array(e.length),n=[];for(let u=0;u<e.length;u++)r[u]=e[u]*t[1].numberData[u],n.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${e[u]}.));`);let s=r.length,i=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${n.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...o,output:{dims:r,type:t[0].type,textureType:0},shaderSource:i}},Gb=a=>{if(!a||a.length!==2)throw new Error("Tile requires 2 input.");if(a[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(a[1].dims[0]!==a[0].dims.length)throw new Error("Invalid input shape.");if(Qt.indexOf(a[0].type)===-1)throw new Error("Invalid input type.");if(a[1].type!=="int32"&&a[1].type!=="int16")throw new Error("Invalid repeat type.")}});var zi,Hc,qc,Ub,zb,jc=L(()=>{"use strict";fe();zi=(a,t,o)=>{Ub(t);let e=U.unsqueezeShape(t[0].dims,o);return[a.reshapeUnpacked(t[0],e)]},Hc=(a,t)=>(zb(t),zi(a,[t[0]],Array.from(t[1].integerData))),qc=a=>a.attributes.getInts("axes"),Ub=a=>{if(!a||a.length!==1)throw new Error("Unsqueeze requires 1 input.");if(a[0].type==="string")throw new Error("invalid input tensor types.")},zb=a=>{if(!a||a.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(a[1].type!=="int32")throw new Error("Invalid input type.")}});var Yc,Xc=L(()=>{"use strict";ol();gl();xl();Sl();to();ff();bf();Tf();vf();Sf();Ef();Ff();Nf();ro();Uf();ec();uc();fc();bc();yc();_c();Fc();Nc();Gc();zc();Wc();oo();Ii();jc();Ni();Yc=[["Abs","","6+",Al],["Acos","","7+",Pl],["Add","","7+",il],["And","","7+",al],["Asin","","7+",El],["Atan","","7+",Dl],["AveragePool","","7+",Vf,Wf],["BatchNormalization","","7+",rl,nl],["Cast","","6+",yl,Tl],["Ceil","","6+",Fl],["Clip","","6-10",_i,Ll],["Clip","","11+",Cl],["Concat","","4+",_l,Il],["Conv","","1+",Li,Ci],["ConvTranspose","","1+",uf,lf],["Cos","","7+",$l],["Div","","7+",sl],["Dropout","","7+",Oi],["DepthToSpace","","1+",hf,mf],["Equal","","7+",ul],["Elu","","6+",kl,Bl],["Exp","","6+",Nl],["Flatten","","1+",gf,yf],["Floor","","6+",Rl],["FusedConv","com.microsoft","1+",Li,Ci],["Gather","","1+",xf,wf],["Gemm","","7-10",Fi,Of],["Gemm","","11+",Fi,If],["GlobalAveragePool","","1+",qf,jf],["GlobalMaxPool","","1+",Zf],["Greater","","7+",ll],["Identity","","1+",Oi],["ImageScaler","","1+",Af,Pf],["InstanceNormalization","","6+",Lf,Cf],["LeakyRelu","","6+",Ml,Gl],["Less","","7+",fl],["LRN","","1+",$f,kf],["Log","","6+",Ul],["MatMul","","1+",ef,tf],["MaxPool","","1+",Yf,Xf],["Mul","","7+",cl],["Neg","","6+",zl],["Not","","1+",Vl],["Or","","7+",pl],["Pad","","2-10",$i,Rf],["Pad","","11+",Mf,Gf],["Pow","","7+",dl],["PRelu","","7+",hl],["ReduceLogSum","","1+",ac,er],["ReduceMax","","1+",nc,er],["ReduceMean","","1+",rc,er],["ReduceMin","","1+",oc,er],["ReduceProd","","1+",ic,er],["ReduceSum","","1-12",tc,er],["ReduceSumSquare","","1+",sc,er],["Relu","","6+",Wl],["Reshape","","5+",lc],["Resize","","10",Mi,hc],["Resize","","11+",Mi,mc],["Shape","","1+",gc],["Sigmoid","","6+",Hl],["Sin","","7+",ql],["Slice","","10+",vc],["Slice","","1-9",Tc,xc],["Softmax","","1-12",Ac,Pc],["Softmax","","13+",Dc,Ec],["Split","","2-12",kc,Bc],["Sqrt","","6+",jl],["Squeeze","","1-12",Ui,Mc],["Squeeze","","13+",Rc],["Sub","","7+",ml],["Sum","","6+",Uc],["Tan","","7+",Yl],["Tanh","","6+",Xl],["Tile","","6+",Vc],["Transpose","","1+",wr,pf],["Upsample","","7-8",ki,pc],["Upsample","","9",ki,dc],["Unsqueeze","","1-12",zi,qc],["Unsqueeze","","13+",Hc],["Xor","","7+",bl]]});function Jc(a){let t={},o;for(;(o=Kc.exec(a))!==null;){let e=o[3].split(",").map(r=>{let n=r.trim().split(" ");return n&&n.length===2?{type:n[0],name:n[1]}:null}).filter(r=>r!==null);t[o[2]]={params:e,body:o[4]}}for(let e in t){let r=Vb.replace("__FUNC__",e),n=new RegExp(r,"gm");for(;(o=n.exec(a))!==null;){let s=o[1],i=o[2],u=o[3].split(","),l=s?`${s} ${i};`:"",c=t[e].body,p="";t[e].params.forEach((T,w)=>{T&&(p+=`${T.type} ${T.name} = ${u[w]};
`)}),c=`${p}
 ${c}`,c=c.replace("return",`${i} = `);let d=`
      ${l}
      {
        ${c}
      }
      `;a=a.replace(o[0],d)}}return a=a.replace(Kc,""),a}var Kc,Vb,Zc=L(()=>{"use strict";Kc=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,Vb="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Mr(a,t){let o=[],e=[],r=t!=null&&Array.isArray(t)&&t.length===0,n=t==null||r?null:Wb(t,a).sort(),s=0;for(let i=0;i<a.length;++i){if(n!=null){if(n[s]===i&&a[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${a[i]}' is not 1`);(n[s]==null||n[s]>i)&&a[i]===1&&(o.push(a[i]),e.push(i)),n[s]<=i&&s++}a[i]!==1&&(o.push(a[i]),e.push(i))}return{newShape:o,keptDims:e}}function Wb(a,t){let o=t.length;return a=a==null?t.map((e,r)=>r):[].concat(a),Fr(a.every(e=>e>=-o&&e<o),()=>`All values in axis param must be in range [-${o}, ${o}) but got axis ${a}`),Fr(a.every(Hb),()=>`All values in axis param must be integers but got axis ${a}`),a.map(e=>e<0?o+e:e)}function Hb(a){return a%1===0}function qb(a){if(a.length===0)return 1;let t=a[0];for(let o=1;o<a.length;o++)t*=a[o];return t}function Qc(a){let t=Math.ceil(Math.sqrt(a));return[t,Math.ceil(a/t)]}var uo,Vi=L(()=>{"use strict";lt();fe();uo=class{constructor(t){this.maxTextureSize=t}computeTextureWH(t,o){let e=this.computeTexture(t,o);return o&&o.isPacked&&(e[0]/=2,e[1]/=2),o&&o.reverseWH?[e[1],e[0]]:e}computeTexture(t,o){let e=o&&o.isPacked;if(t.length===0)return e?[2,2]:[1,1];let r=this.maxTextureSize;if(o&&o.breakAxis!==void 0){let i=o.breakAxis>=t.length?1:t.slice(o.breakAxis).reduce((l,c)=>l*c),u=o.breakAxis<=0?1:t.slice(0,o.breakAxis).reduce((l,c)=>l*c);if(i>r||u>r)ce.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${t}, breakAxis:${o.breakAxis}`);else return[i,u]}let n=t.slice(0);e&&(r=r*2,n=n.map((i,u)=>u>=n.length-2?n[u]%2===0?n[u]:n[u]+1:n[u]),n.length===1&&(n=[2,n[0]])),n.length!==2&&(n=Mr(n).newShape);let s=qb(n);return n.length<=1&&s<=r?[1,s]:n.length===2&&n[0]<=r&&n[1]<=r?n:n.length===3&&n[0]*n[1]<=r&&n[2]<=r?[n[0]*n[1],n[2]]:n.length===3&&n[0]<=r&&n[1]*n[2]<=r?[n[0],n[1]*n[2]]:n.length===4&&n[0]*n[1]*n[2]<=r&&n[3]<=r?[n[0]*n[1]*n[2],n[3]]:n.length===4&&n[0]<=r&&n[1]*n[2]*n[3]<=r?[n[0],n[1]*n[2]*n[3]]:e?Qc(s/4).map(i=>i*2):Qc(s)}}});var lo,ep=L(()=>{"use strict";fe();Wt();we();Vi();Bt();lo=class extends dt{constructor(o){super(o)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let o="offsetToCoords";return{offsetToCoords:new R(`
      vec2 ${o}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let o="coordsToOffset";return{coordsToOffset:new R(`
      int ${o}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let o=this.context.outputTextureLayout;return o.isPacked?this.getPackedOutputSamplingSnippet(o):this.getUnpackedOutputSamplingSnippet(o)}getPackedOutputSamplingSnippet(o){let e=o.unpackedShape,r=[o.width,o.height],n={},s="getOutputCoords";switch(e.length){case 0:n[s]=this.getOutputScalarCoords();break;case 1:n[s]=this.getOutputPacked1DCoords(e,r);break;case 2:n[s]=this.getOutputPacked2DCoords(e,r);break;case 3:n[s]=this.getOutputPacked3DCoords(e,r);break;default:n[s]=this.getOutputPackedNDCoords(e,r)}let u=`
      void setOutput(vec4 val) {
        ${H(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return n[l]=new R(u),n}getUnpackedOutputSamplingSnippet(o){let e=o.unpackedShape,r=[o.width,o.height],n={},s="getOutputCoords";switch(e.length){case 0:n[s]=this.getOutputScalarCoords();break;case 1:n[s]=this.getOutputUnpacked1DCoords(e,r);break;case 2:n[s]=this.getOutputUnpacked2DCoords(e,r);break;case 3:n[s]=this.getOutputUnpacked3DCoords(e,r);break;case 4:n[s]=this.getOutputUnpacked4DCoords(e,r);break;case 5:n[s]=this.getOutputUnpacked5DCoords(e,r);break;case 6:n[s]=this.getOutputUnpacked6DCoords(e,r);break;default:throw new Error(`Unsupported output dimensionality: ${e.length}`)}let u=`
        void setOutput(float val) {
          ${H(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return n[l]=new R(u),n}getOutputScalarCoords(){return new R(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(o,e){let r=e,n="";return r[0]===1?(n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${r[1]}.0);
          }
        `,new R(n)):r[1]===1?(n=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${r[0]}.0);
          }
        `,new R(n)):(n=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${r[0]}, ${r[1]}));
          return 2 * (resTexRC.y * ${r[0]} + resTexRC.x);
        }
      `,new R(n))}getOutputPacked2DCoords(o,e){let r="";if(hr.arraysEqual(o,e))return r=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${e[0]}, ${e[1]}));
        }
      `,new R(r);let n=e,s=Math.ceil(o[1]/2);return r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));

          int index = resTexRC.y * ${n[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new R(r)}getOutputPacked3DCoords(o,e){let r=[e[0],e[1]],n=Math.ceil(o[2]/2),s=n*Math.ceil(o[1]/2),i=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;

          int b = index / ${s};
          index -= b * ${s};

          // reverse r and c order for packed texture
          int r = imod(index, ${n}) * 2;
          int c = 2 * (index / ${n});

          return ivec3(b, r, c);
        }
      `;return new R(i)}getOutputPackedNDCoords(o,e){let r=[e[0],e[1]],n=Math.ceil(o[o.length-1]/2),s=n*Math.ceil(o[o.length-2]/2),i=s,u="",l="b, r, c";for(let p=2;p<o.length-1;p++)i*=o[o.length-p-1],u=`
      int b${p} = index / ${i};
      index -= b${p} * ${i};
    `+u,l=`b${p}, `+l;let c=`
      ivec${o.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${r[0]}, ${r[1]}));
        int index = resTexRC.y * ${r[0]} + resTexRC.x;

        ${u}

        int b = index / ${s};
        index -= b * ${s};

        // reverse r and c order for packed texture
        int r = imod(index, ${n}) * 2;
        int c = 2 * (index / ${n});

        return ivec${o.length}(${l});
      }
    `;return new R(c)}getOutputUnpacked1DCoords(o,e){let r=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          return resTexRC.y * ${e[0]} + resTexRC.x;
        }
      `;return new R(r)}getOutputUnpacked2DCoords(o,e){let r=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          int r = index / ${o[1]};
          int c = index - r * ${o[1]};
          return ivec2(r, c);
        }
      `;return new R(r)}getOutputUnpacked3DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,d=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${d};`}).join("");return r=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new R(r)}getOutputUnpacked4DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,d=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${d};`}).join("");return r=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new R(r)}getOutputUnpacked5DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2","d3"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,d=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${d};`}).join("");return r=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${e[0]}, ${e[1]}));
          int index = resTexRC.y * ${e[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new R(r)}getOutputUnpacked6DCoords(o,e){let r="",n=o.length,s=null;n<2&&(s=[]),s=new Array(n-1),s[n-2]=o[n-1];for(let l=n-3;l>=0;--l)s[l]=s[l+1]*o[l+1];let i=["r","c","d","d2","d3","d4"],u=s.map((l,c)=>{let p=`int ${i[c]} = index / ${l}`,d=c===s.length-1?`int ${i[c+1]} = index - ${i[c]} * ${l}`:`index -= ${i[c]} * ${l}`;return`${p}; ${d};`}).join("");return r=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${e[0]}, ${e[1]}));
         int index = resTexRC.y * ${e[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new R(r)}getCommonUtilFuncs(){let o={},e="uvFromFlat";o[e]=new R(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),e="packedUVfrom1D",o[e]=new R(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="packedUVfrom2D",o[e]=new R(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="packedUVfrom3D",o[e]=new R(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),e="sampleTexture";let r=H(this.context.glContext.version);return o[e]=new R(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${r.texture2D}(textureSampler, uv).r;
        }`),o}getInputsSamplingSnippets(){let o={},e=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((r,n)=>{let s=this.context.inputTextureLayouts[n],i=Yn(r);s.isPacked?o[i]=this.getPackedSamplerFromInput(i,r,s):o[i]=this.getUnpackedSamplerFromInput(i,r,s);let u=Gu(r);s.unpackedShape.length<=e.unpackedShape.length&&(s.isPacked?o[u]=this.getPackedSamplerAtOutputCoords(u,s,e,r):o[u]=this.getUnpackedSamplerAtOutputCoords(u,s,e,r))}),o}getPackedSamplerAtOutputCoords(o,e,r,n){let s=e.unpackedShape,i=r.unpackedShape,l=Yn(n),c=s.length,p=i.length,d=Ze.getBroadcastDims(s,i),T=Qe(p),w=p-c,v,S=Dt();c===0?v="":p<2&&d.length>=1?v="coords = 0;":v=d.map(He=>`coords.${S[He+w]} = 0;`).join(`
`);let A="";p<2&&c>0?A="coords":A=s.map((He,Le)=>`coords.${S[Le+w]}`).join(", ");let C="return outputValue;",J=U.size(s)===1,ie=U.size(i)===1;if(c===1&&!J&&!ie)C=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(J&&!ie)p===1?C=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:C=`
          return vec4(outputValue.x);
        `;else if(d.length){let He=c-2,Le=c-1;d.indexOf(He)>-1&&d.indexOf(Le)>-1?C="return vec4(outputValue.x);":d.indexOf(He)>-1?C="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":d.indexOf(Le)>-1&&(C="return vec4(outputValue.xx, outputValue.zz);")}let G=`
        int lastDim = coords.${S[p-1]};
        coords.${S[p-1]} = coords.${S[p-2]};
        coords.${S[p-2]} = lastDim;
      `,Te=`
      vec4 ${o}() {
        ${T} coords = getOutputCoords();
        ${G}
        ${v}
        vec4 outputValue = ${l}(${A});
        ${C}
      }
    `;return new R(Te,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(o,e,r,n){let s=[r.width,r.height],i=[e.width,e.height],u=e.unpackedShape.length,l=r.unpackedShape.length,c=e.unpackedShape,p=r.unpackedShape,d=Yn(n);if(u===l&&hr.arraysEqual(i,s)){let J=`
          float ${o}() {
            return sampleTexture(${n}, TexCoords);
          }
        `;return new R(J,["coordinates.sampleTexture"])}let T=Qe(l),w=Ze.getBroadcastDims(c,p),v=l-u,S,A=Dt();u===0?S="":l<2&&w.length>=1?S="coords = 0;":S=w.map(J=>`coords.${A[J+v]} = 0;`).join(`
`);let C="";l<2&&u>0?C="coords":C=e.unpackedShape.map((J,j)=>`coords.${A[j+v]}`).join(", ");let F=`
        float ${o}() {
          ${T} coords = getOutputCoords();
          ${S}
          return ${d}(${C});
        }
      `;return new R(F,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(o,e,r){switch(r.unpackedShape.length){case 0:return this.getPackedSamplerScalar(o,e);case 1:return this.getPackedSampler1D(o,e,r);case 2:return this.getPackedSampler2D(o,e,r);case 3:return this.getPackedSampler3D(o,e,r);default:return this.getPackedSamplerND(o,e,r)}}getUnpackedSamplerFromInput(o,e,r){let n=r.unpackedShape;switch(n.length){case 0:return this.getUnpackedSamplerScalar(o,e,r);case 1:return this.getUnpackedSampler1D(o,e,r);case 2:return this.getUnpackedSampler2D(o,e,r);case 3:return this.getUnpackedSampler3D(o,e,r);case 4:return this.getUnpackedSampler4D(o,e,r);case 5:return this.getUnpackedSampler5D(o,e,r);case 6:return this.getUnpackedSampler6D(o,e,r);default:throw new Error(`Unsupported dimension ${n.length}-D`)}}getPackedSamplerScalar(o,e){let r=H(this.context.glContext.version),n=`
          vec4 ${o}() {
            return ${r.texture2D}(${e}, halfCR);
          }
        `;return new R(n)}getPackedSampler1D(o,e,r){let n=[r.width,r.height],s=[n[1],n[0]],i=H(this.context.glContext.version),l=`vec4 ${o}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${i.texture2D}(${e}, uv);
    }`;return new R(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(o,e,r){let n=r.unpackedShape,s=[r.width,r.height],i=H(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&hr.arraysEqual(n,s)){let w=`vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${i.texture2D}(${e}, uv);
      }`;return new R(w)}let c=s,p=Math.ceil(n[1]/2),T=`vec4 ${o}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${p}, row, col);
      return ${i.texture2D}(${e}, uv);
    }`;return new R(T,["coordinates.packedUVfrom2D"])}getPackedSampler3D(o,e,r){let n=r.unpackedShape,s=[r.width,r.height],i=[s[0],s[1]],u=H(this.context.glContext.version);if(n[0]===1){let v=n.slice(1),S=[1,2],A=$r(n,v),C=["b","row","col"],F=JSON.parse(JSON.stringify(r));F.unpackedShape=A;let J=this.getPackedSamplerFromInput(o,e,F),ie=`${J.routineBody}
      vec4 ${o}(int b, int row, int col) {
        return ${o}(${kr(C,S)});
      } `;return new R(ie,J.dependencies)}let l=i[0],c=i[1],p=Math.ceil(n[2]/2),d=p*Math.ceil(n[1]/2),w=`vec4 ${o}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${d}, ${p}, b, row, col);
      return ${u.texture2D}(${e}, uv);}`;return new R(w,["coordinates.packedUVfrom3D"])}getPackedSamplerND(o,e,r){let n=r.unpackedShape,s=n.length,i=[r.width,r.height],u=H(this.context.glContext.version),l=[i[0],i[1]],c=l[1],p=l[0],d=Math.ceil(n[s-1]/2),T=d*Math.ceil(n[s-2]/2),w="int b, int row, int col",v=`b * ${T} + (row / 2) * ${d} + (col / 2)`;for(let C=2;C<s-1;C++)w=`int b${C}, `+w,T*=n[s-C-1],v=`b${C} * ${T} + `+v;let A=`vec4 ${o}(${w}) {
      int index = ${v};
      int texR = index / ${p};
      int texC = index - texR * ${p};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${p}, ${c});
      return ${u.texture2D}(${e}, uv);
    }`;return new R(A)}getUnpackedSamplerScalar(o,e,r){let[n,s]=[r.width,r.height];if(n===1&&s===1){let u=`
          float ${o}() {
            return sampleTexture(${e}, halfCR);
          }
        `;return new R(u,["coordinates.sampleTexture"])}let i=`
        float ${o}() {
          int offset_${e} = coordsToOffset(TexCoords, ${n}, ${s});
          vec2 uv = uvFromFlat(${n}, ${s}, offset_${e});
          return sampleTexture(${e}, uv);
        }
      `;return new R(i,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(o,e,r){let n=r.width,s=r.height;if(s===1&&n===1){let u=`
        float ${o}(int index) {
          return sampleTexture(${e}, halfCR);
        }
      `;return new R(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${o}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${n}.0, 0.5);
            return sampleTexture(${e}, uv);
          }
        `;return new R(u,["coordinates.sampleTexture"])}if(n===1){let u=`
          float ${o}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new R(u,["coordinates.sampleTexture"])}let i=`
        float ${o}(int index) {
          vec2 uv = uvFromFlat(${n}, ${s}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new R(i,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(o,e,r){let n=r.unpackedShape,s=[r.height,r.width];if(s!=null&&hr.arraysEqual(n,s)){let T=s[1],w=s[0],v=`
          float ${o}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${T}.0, ${w}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new R(v,["coordinates.sampleTexture"])}let{newShape:i,keptDims:u}=Mr(n),l=i;if(l.length<n.length){let T=$r(n,l),w=JSON.parse(JSON.stringify(r));w.unpackedShape=T;let v=["col","row"],S=`
          ${this.getUnpackedSamplerFromInput(o,e,w).routineBody}
          float ${o}(int row, int col) {
            return ${o}(${kr(v,u)});
          }
        `;return new R(S,["coordinates.sampleTexture"])}let c=s[1],p=s[0];if(p===1){let T=`
          float ${o}(int row, int col) {
            int offset_${e} = coordsToOffset(TexCoords, ${c}, ${p});
            float index = dot(vec3(row, col, offset_${e}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${e}, uv);
          }
        `;return new R(T,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let T=`
          float ${o}(int row, int col) {
            int offset_${e} = coordsToOffset(TexCoords, ${c}, ${p});
            float index = dot(vec3(row, col, offset_${e}), vec3(${n[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${p}.0, 0.5);
            return sampleTexture(${e}, uv);
          }
        `;return new R(T,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let d=`
        float ${o}(int row, int col) {
          int index = col * ${n[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${p}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new R(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(o,e,r){let n=r.unpackedShape,s=n[1]*n[2],i=n[2],{newShape:u,keptDims:l}=Mr(n),c=u;if(c.length<n.length){let w=$r(n,c),v=["batch","col","row"],S=JSON.parse(JSON.stringify(r));S.unpackedShape=w;let A=this.getUnpackedSamplerFromInput(o,e,S),C=l.reverse(),F=`
          ${A.routineBody}
          float ${o}(int batch, int row, int col) {
            return ${o}(${kr(v,C)});
          }
        `;return new R(F,A.dependencies)}let p=r.width,d=r.height,T=`
          float ${o}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${i} + row;
            vec2 uv = uvFromFlat(${p}, ${d}, index);
            return sampleTexture(${e}, uv);
          }
      `;return new R(T,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(o,e,r){let n=r.unpackedShape,s=n[3],i=n[2]*s,u=n[1]*i,l=r.width,c=r.height,p=`
        float ${o}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${i} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new R(p,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(o,e,r){let n=r.unpackedShape,s=n[4],i=n[3]*s,u=n[2]*i,l=n[1]*u,{newShape:c,keptDims:p}=Mr(n);if(c.length<n.length){let v=$r(n,c),S=["row","col","depth","depth2","depth3"],A=JSON.parse(JSON.stringify(r));A.unpackedShape=v;let C=`
          ${this.getUnpackedSamplerFromInput(o,e,A).routineBody}
          float ${o}(int row, int col, int depth, int depth2, int depth3) {
            return ${o}(${kr(S,p)});
          }
        `;return new R(C,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=r.width,T=r.height,w=`
        float ${o}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${i} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${d}, ${T}, index);
          return sampleTexture(${e}, uv);
        }
      `;return new R(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(o,e,r){let n=r.unpackedShape,s=n[5],i=n[4]*s,u=n[3]*i,l=n[2]*u,c=n[1]*l,{newShape:p,keptDims:d}=Mr(n);if(p.length<n.length){let S=$r(n,p),A=["row","col","depth","depth2","depth3","depth4"],C=JSON.parse(JSON.stringify(r));C.unpackedShape=S;let F=`
            ${this.getUnpackedSamplerFromInput(o,e,C).routineBody}
            float ${o}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${o}(${kr(A,d)});
            }
          `;return new R(F,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let T=r.width,w=r.height,v=`
          float ${o}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${l} + depth * ${u} +
            depth2 * ${i} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${T}, ${w}, index);
            return sampleTexture(${e}, uv);
          }
        `;return new R(v,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let o=this.context.outputTextureLayout,e=o.shape.length,r=o.strides,n=o.width,s=o.height,i=[];for(let l=0;l<e-1;++l)i.push(`
        c[${l}] = offset / ${r[l]};`),i.push(`
        offset -= c[${l}] * ${r[l]};`);i.push(`
        c[${e-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${e}]) {
        int offset = coordsToOffset(texCoords, ${n}, ${s});
        ${i.join("")}
      }
      void toVec(int offset, out int c[${e}]) {
        ${i.join("")}
      }
    `;return{toVec:new R(u,["coordinates.coordsToOffset"])}}valueFrom(){let o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r],i=(n.unpackedShape.length>0?n.unpackedShape:n.shape).length,u=`_${e}`;o[u]=new R(this.getValueFromSingle(e,i,n.width,n.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",o[u]=new R(this.getValueFromSingle(e,i,n.width,n.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),o}getValueFromSingle(o,e,r,n,s){let i=`_${o}`;s&&(i=i+"_T");let u=H(this.context.glContext.version);return`
        float ${i}(int m[${e}]) {
          int offset = indicesToOffset${i}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          float value = getColorAsFloat(${u.texture2D}(${o}, coords));
          return value;
        }
        `}getPackedValueFrom(o,e,r,n,s){let i=`_${o}_Pack`;s&&(i=i+"_T");let u=H(this.context.glContext.version);return`
        vec4 ${i}(int m[${e}]) {
          int offset = indicesToOffset_${o}(m);
          vec2 coords = offsetToCoords(offset, ${r}, ${n});
          return ${u.texture2D}(${o}, coords);
        }
        `}}});var fo,tp=L(()=>{"use strict";Wt();fo=class a extends dt{constructor(t){super(t)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new R(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new R(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let t=a.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new R(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${t}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let t=a.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new R(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${t}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let t=new ArrayBuffer(4),o=new Uint32Array(t),e=new Uint8Array(t);if(o[0]=3735928559,e[0]===239)return!0;if(e[0]===222)return!1;throw new Error("unknown endianness")}}});var co,rp=L(()=>{"use strict";Wt();we();co=class extends dt{constructor(t){super(t)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let t=H(this.context.glContext.version);return{setFragColor:new R(`
        void setFragColor(float value) {
            ${t.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new R(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var po,np=L(()=>{"use strict";Wt();po=class a extends dt{constructor(t){super(t)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let t=this.context.outputTextureLayout.shape.length,o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r].unpackedShape;if(n.length<=t){let s=n.length,i=t-s,u=`bcastIndices_${e}`,l="";for(let p=0;p<s;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${i+p}]), ${n[p]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${t}], out int realIndices[${s}]) {
          ${l}
        }
        `;o[u]=new R(c)}}),o}bcastMatmulIndex(){let t=this.context.outputTextureLayout.shape.length,o={};return this.context.programInfo.inputNames.forEach((e,r)=>{let n=this.context.inputTextureLayouts[r].shape;if(!(n.length<2||n.length>t)){let s=n.length,i=t-s,u=`bcastMatmulIndices_${e}`,l="";for(let p=0;p<s-2;++p)l+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${i+p}]), ${n[p]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${t}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${t-1}];
          realIndices[${s-2}] = bcastedIndices[${t-2}];
        }
        `;o[u]=new R(c)}}),o}indicesToOffset(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=this.context.inputTextureLayouts[e].strides,s=r.length,i=`indicesToOffset_${o}`;t[i]=new R(a.indexToOffsetSingle(i,s,n)),i=`indicesToOffset_${o}_T`,t[i]=new R(a.indexToOffsetSingle(i,s,n.slice().reverse()))}),t}static indexToOffsetSingle(t,o,e){let r="";for(let n=o-1;n>=0;--n)r+=`
        offset += indices[${n}] * ${e[n]};
        `;return`
      int ${t}(int indices[${o}]) {
        int offset = 0;
        ${r}
        return offset;
      }
      `}offsetToIndices(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=this.context.inputTextureLayouts[e].strides,s=r.length,i=`offsetToIndices_${o}`;t[i]=new R(a.offsetToIndicesSingle(i,s,n)),i=`offsetToIndices_${o}_T`,t[i]=new R(a.offsetToIndicesSingle(i,s,n.slice().reverse()))}),t}static offsetToIndicesSingle(t,o,e){let r=[];for(let n=0;n<o-1;++n)r.push(`
      indices[${n}] = offset / ${e[n]};`),r.push(`
        offset -= indices[${n}] * ${e[n]};`);return r.push(`
      indices[${o-1}] = offset;`),`
      void ${t}(int offset, out int indices[${o}]) {
        ${r.join("")}
      }
      `}incrementIndices(){let t={};return this.context.programInfo.inputNames.forEach((o,e)=>{let r=this.context.inputTextureLayouts[e].shape,n=r.length,s=`incrementIndices_${o}`,i="";for(let l=0;l<n;++l)i+=`
        shape[${l}] = ${r[l]};`;let u=`
        void ${s}(int axis, out int indices[${n}]) {
          int shape[${n}];
          ${i};
          for(int i = ${n} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;t[s]=new R(u)}),t}}});var ho,op=L(()=>{"use strict";Wt();ho=class extends dt{constructor(t){super(t)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let o=this.context.outputTextureLayout.shape.length,e={add:"+=",sub:"-=",mul:"*=",div:"/="},r={};for(let n in e){let s=`${n}Vec`,i="";for(let l=0;l<o;++l)i+=`
          dest[${l}] ${e[n]} src[${l}];
          `;let u=`
        void ${s}(int src[${o}], out int dest[${o}]) {
          ${i}
        }
        `;r[s]=new R(u)}return r}copyVec(){let o=this.context.outputTextureLayout.shape.length,e="";for(let n=0;n<o;++n)e+=`
        dest[${n}] = src[${n}];
        `;let r=`
      void copyVec(int src[${o}], out int dest[${o}]) {
        ${e}
      }
      `;return{copyVec:new R(r)}}setVecItem(){let o=this.context.outputTextureLayout.shape.length,e=`
        if(index < 0)
            index =${o} + index;
        if (index == 0)
            m[0] = value;
        `;for(let n=1;n<o-1;++n)e+=`
        else if (index == ${n})
            m[${n}] = value;
            `;e+=`
        else
            m[${o-1}] = value;
        `;let r=`
      void setVecItem(out int m[${o}], int index, int value) {
        ${e}
      }
        `;return{setVecItem:new R(r)}}getVecItem(){let o=this.context.outputTextureLayout.shape.length,e=`
        if(index < 0)
            index = ${o} + index;
        if (index == 0)
            return m[0];
      `;for(let n=1;n<o-1;++n)e+=`
        else if (index == ${n})
            return m[${n}];
      `;e+=`
        else
            return m[${o-1}];
        `;let r=`
      int getVecItem(int m[${o}], int index) {
        ${e}
      }
    `;return{getVecItem:new R(r)}}}});var Wi,ip=L(()=>{"use strict";ep();tp();rp();np();op();Wi={encoding:fo,fragcolor:co,vec:ho,shapeUtils:po,coordinates:lo}});var mo,ap=L(()=>{"use strict";Wt();Zc();ip();we();mo=class{constructor(t,o,e,r){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Zn(t,o,e,r),Object.keys(Wi).forEach(s=>{let i=new Wi[s](this.context);this.libs[s]=i});let n=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let c=s+"."+l,p;n[c]?(p=n[c],p.routineBody=u[l].routineBody):(p=new cn(c,u[l].routineBody),n[c]=p);let d=u[l].dependencies;if(d)for(let T=0;T<d.length;++T)if(n[d[T]])p.addDependency(n[d[T]]);else{let w=new cn(d[T]);n[d[T]]=w,p.addDependency(w)}}}}preprocess(){let t=this.context.programInfo,o=t.shaderSource;return this.context.programInfo.hasMain||(o=`${o}
      ${Mu(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),o=Jc(o),`${Ru(this.context.glContext.version)}
    ${this.getUniforms(t.inputNames,t.variables)}
    ${this.getImports(o)}
    ${o}`}getImports(t){let o=this.selectGlslLibRoutinesToBeIncluded(t);if(o.length===0)return"";let e="";for(let r=0;r<o.length;++r)if(o[r].routineBody)e+=o[r].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${o[r].name}`);return e}selectGlslLibRoutinesToBeIncluded(t){let o=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(e=>{let r=e.split(".")[1];t.indexOf(r)!==-1&&o.push(this.glslLibRoutineDependencyGraph[e])}),Qn.returnOrderedNodes(o)}getUniforms(t,o){let e=[];if(t)for(let r of t)e.push(`uniform sampler2D ${r};`);if(o)for(let r of o)e.push(`uniform ${r.type} ${r.name}${r.arrayLength?`[${r.arrayLength}]`:""};`);return e.join(`
`)}}});var bo,sp=L(()=>{"use strict";Ot();lt();ap();we();bo=class{constructor(t,o,e){this.profiler=t;this.glContext=o;this.textureLayoutStrategy=e;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,o){this.repo.set(t,o)}run(t,o,e){this.profiler.event("op",`ProgramManager.run ${t.programInfo.name??"unknown kernel"}`,()=>{let r=this.glContext.gl,n=t.program;r.useProgram(n);try{this.bindOutput(e),this.attributesBound||this.bindAttributes(t.attribLocations),this.bindUniforms(t.uniformLocations,t.programInfo.variables??[],o)}catch(s){throw ce.error("ProgramManager",t.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(t=>this.glContext.deleteProgram(t.program))}build(t,o,e){return this.profiler.event("backend","ProgramManager.build",()=>{let r=new mo(this.glContext,t,o,e),n=r.preprocess(),s=this.compile(n);return{programInfo:t,program:s,uniformLocations:this.getUniformLocations(s,r.context.programInfo.inputNames,r.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(t){if(!this.vertexShader){ce.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let r=Nu(this.glContext.version);this.vertexShader=this.glContext.compileShader(r,this.glContext.gl.VERTEX_SHADER)}Z.debug&&ce.verbose("ProrgramManager",`FragShader:
${t}
`);let o=this.glContext.compileShader(t,this.glContext.gl.FRAGMENT_SHADER),e=this.glContext.createProgram(this.vertexShader,o);return this.glContext.deleteShader(o),e}bindOutput(t){let o=t.width,e=t.height;ce.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${o}/${e}, shape=${t.shape}, type=${t.tensor.type}`),this.glContext.attachFramebuffer(t.texture,o,e)}bindAttributes(t){let o=t.position,e=t.textureCoord;this.glContext.setVertexAttributes(o,e),this.attributesBound=!0}bindUniforms(t,o,e){let r=this.glContext.gl,n=0;for(let{name:s,type:i,location:u,arrayLength:l}of t){let c=o.find(p=>p.name===s)?.data;if(i!=="sampler2D"&&!c)throw new Error(`variable '${s}' does not have data defined in program info`);switch(i){case"sampler2D":this.bindTexture(e[n],u,n),n++;break;case"float":l?r.uniform1fv(u,c):r.uniform1f(u,c);break;case"int":l?r.uniform1iv(u,c):r.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${i}`)}}}bindTexture(t,o,e){this.glContext.bindTextureToUniform(t.texture,e,o)}getAttribLocations(t){return{position:this.getAttribLocation(t,"position"),textureCoord:this.getAttribLocation(t,"textureCoord")}}getUniformLocations(t,o,e){let r=[];if(o)for(let n of o)r.push({name:n,type:"sampler2D",location:this.getUniformLocation(t,n)});if(e)for(let n of e)r.push({...n,location:this.getUniformLocation(t,n.name)});return r}getUniformLocation(t,o){let r=this.glContext.gl.getUniformLocation(t,o);if(r===null)throw new Error(`Uniform ${o} not found.`);return r}getAttribLocation(t,o){return this.glContext.gl.getAttribLocation(t,o)}}});var go,up=L(()=>{"use strict";lt();ln();go=class{constructor(t,o,e,r){this.glContext=t;this.layoutStrategy=o;this.profiler=e;this.config=r;this.pendingRead=new Map;r.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(t,o,e,r){let n=this.toEncoderType(t),s=this.glContext.getEncoder(n,o.channels||1,r);if(o.isPacked&&r===1)throw new Error("not implemented");let i=o.width,u=o.height,l,c;if(this.config.reuseTextures){l=`${i}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let d=this.idleTextures.get(l);if(d&&d.length>0){let T=d.pop();return c.push(T),r===1&&this.glContext.updateTexture(T,i,u,s,this.toTextureData(t,e)),T}}ce.verbose("TextureManager",`Creating new texture of size ${o.width}x${o.height}`);let p=this.glContext.allocateTexture(i,u,s,this.toTextureData(t,e));return this.config.reuseTextures&&(c.push(p),this.textureLookup.set(p,l)),p}readTexture(t,o,e){return e||(e=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let r=t.shape.reduce((s,i)=>s*i)*e,n=this.glContext.readTexture(t.texture,t.width,t.height,r,this.toEncoderType(o),e);return this.toTensorData(o,n)})}async readTextureAsync(t,o,e){let r=t.tensor.dataId;if(e||(e=1),this.pendingRead.has(r)){let n=this.pendingRead.get(r);return new Promise(s=>n?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(r,[]);let n=t.shape.reduce((l,c)=>l*c)*e;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(t.texture,t.width,t.height,n,this.toEncoderType(o),e),i=this.toTensorData(o,s),u=this.pendingRead.get(r);return this.pendingRead.delete(r),u?.forEach(l=>l(i)),i})}readUint8TextureAsFloat(t){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let o=t.shape.reduce((r,n)=>r*n),e=this.glContext.readTexture(t.texture,t.width,t.height,o*4,"byte",4);return new Float32Array(e.buffer,e.byteOffset,o)})}releaseTexture(t,o){let e;if(this.config.reuseTextures&&(e=this.textureLookup.get(t.texture),e)){o&&this.textureLookup.delete(e);let r=this.inUseTextures.get(e);if(r){let n=r.indexOf(t.texture);if(n!==-1){r.splice(n,1);let s=this.idleTextures.get(e);s||(s=[],this.idleTextures.set(e,s)),s.push(t.texture)}}}(!e||o)&&(ce.verbose("TextureManager",`Deleting texture of size ${t.width}x${t.height}`),this.glContext.deleteTexture(t.texture))}toTensorData(t,o){switch(t){case"int16":return o instanceof Int16Array?o:Int16Array.from(o);case"int32":return o instanceof Int32Array?o:Int32Array.from(o);case"int8":return o instanceof Int8Array?o:Int8Array.from(o);case"uint16":return o instanceof Uint16Array?o:Uint16Array.from(o);case"uint32":return o instanceof Uint32Array?o:Uint32Array.from(o);case"uint8":case"bool":return o instanceof Uint8Array?o:Uint8Array.from(o);case"float32":return o instanceof Float32Array?o:Float32Array.from(o);case"float64":return o instanceof Float64Array?o:Float64Array.from(o);default:throw new Error(`TensorData type ${t} is not supported`)}}toTextureData(t,o){if(o)return o instanceof Float32Array?o:new Float32Array(o)}toEncoderType(t){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var yo,lp=L(()=>{"use strict";lt();_s();el();Xc();sp();Vi();up();yo=class{constructor(t,o){this.backend=t;this.context=o;this.layoutStrategy=new uo(t.glContext.maxTextureSize),this.programManager=new bo(this.context.profiler,t.glContext,this.layoutStrategy),this.textureManager=new go(t.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:t.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=t.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Jn(this)}onGraphInitialized(t){let o=t.getValues().filter(e=>e.from===-1&&e.tensor).map(e=>e.tensor.dataId);this.initializers=new Set(o)}isInitializer(t){return this.initializers?this.initializers.has(t):!1}addInitializer(t){this.initializers.add(t)}getTextureData(t,o){return o?this.packedTextureDataCache.get(t):this.unpackedTextureDataCache.get(t)}setTextureData(t,o,e=!1){ce.verbose("WebGLSessionHandler","Storing Texture data in cache"),e?this.packedTextureDataCache.set(t,o):this.unpackedTextureDataCache.set(t,o)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(t=>this.textureManager.releaseTexture(t,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(t=>this.textureManager.releaseTexture(t,!0)),this.unpackedTextureDataCache=new Map}resolve(t,o,e){let r=vs(t,o,Yc);return{impl:r.opImpl,context:r.opInit?r.opInit(t,e):t}}}});function jb(a){let t=0;for(;t<a.length&&a[t]();++t);return t-1}var hn,fp=L(()=>{"use strict";Ot();ln();ln();Bt();hn=class{constructor(t,o){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=t,this.version=o,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(t,o,e,r){let n=this.gl,s=n.createTexture();n.bindTexture(n.TEXTURE_2D,s),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE);let i=r?e.encode(r,t*o):null;return n.texImage2D(n.TEXTURE_2D,0,e.internalFormat,t,o,0,e.format,e.textureType,i),this.checkError(),s}updateTexture(t,o,e,r,n){let s=this.gl;s.bindTexture(s.TEXTURE_2D,t);let i=r.encode(n,o*e);s.texSubImage2D(s.TEXTURE_2D,0,0,0,o,e,r.format,r.textureType,i),this.checkError()}attachFramebuffer(t,o,e){let r=this.gl;r.bindTexture(r.TEXTURE_2D,t),r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0),this.checkError(),r.viewport(0,0,o,e),r.scissor(0,0,o,e)}readTexture(t,o,e,r,n,s){let i=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(t,o,e);let u=this.getEncoder(n,s),l=u.allocate(o*e);return i.bindTexture(i.TEXTURE_2D,t),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,t,0),i.readPixels(0,0,o,e,i.RGBA,u.textureType,l),this.checkError(),u.decode(l,r)}isFramebufferReady(){return!0}getActiveTexture(){let t=this.gl;return`TEXTURE${t.getParameter(this.gl.ACTIVE_TEXTURE)-t.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(t,o){let e=this.gl;e.vertexAttribPointer(t,3,e.FLOAT,!1,20,0),e.enableVertexAttribArray(t),o!==-1&&(e.vertexAttribPointer(o,2,e.FLOAT,!1,20,12),e.enableVertexAttribArray(o)),this.checkError()}createProgram(t,o){let e=this.gl,r=e.createProgram();return e.attachShader(r,t),e.attachShader(r,o),e.linkProgram(r),r}compileShader(t,o){let e=this.gl,r=e.createShader(o);if(!r)throw new Error(`createShader() returned null with type ${o}`);if(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${e.getShaderInfoLog(r)}
Shader source:
${t}`);return r}deleteShader(t){this.gl.deleteShader(t)}bindTextureToUniform(t,o,e){let r=this.gl;r.activeTexture(r.TEXTURE0+o),this.checkError(),r.bindTexture(r.TEXTURE_2D,t),this.checkError(),r.uniform1i(e,o),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(Z.debug){let t=this.gl,o=t.getError(),e="";switch(o){case t.NO_ERROR:return;case t.INVALID_ENUM:e="INVALID_ENUM";break;case t.INVALID_VALUE:e="INVALID_VALUE";break;case t.INVALID_OPERATION:e="INVALID_OPERATION";break;case t.INVALID_FRAMEBUFFER_OPERATION:e="INVALID_FRAMEBUFFER_OPERATION";break;case t.OUT_OF_MEMORY:e="OUT_OF_MEMORY";break;case t.CONTEXT_LOST_WEBGL:e="CONTEXT_LOST_WEBGL";break;default:e=`Unknown WebGL Error: ${o.toString(16)}`}throw new Error(e)}}deleteTexture(t){this.gl.deleteTexture(t)}deleteProgram(t){this.gl.deleteProgram(t)}getEncoder(t,o,e=0){if(this.version===2)return new Xn(this.gl,o);switch(t){case"float":return e===1||this.isRenderFloat32Supported?new un(this.gl,o):new un(this.gl,o,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Kn(this.gl,o);default:throw new Error(`Invalid dataType: ${t}`)}}clearActiveTextures(){let t=this.gl;for(let o=0;o<this.maxTextureImageUnits;++o)t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(this.framebuffer),t.bindBuffer(t.ARRAY_BUFFER,null),t.deleteBuffer(this.vertexbuffer),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null),t.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let t=this.gl,o=t.createBuffer();if(!o)throw new Error("createBuffer() returned null");let e=this.createDefaultGeometry();return t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),this.checkError(),o}createFramebuffer(){let t=this.gl.createFramebuffer();if(!t)throw new Error("createFramebuffer returned null");return t}queryVitalParameters(){let t=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=t.getParameter(t.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let t=this.gl,o=t.createTexture();t.bindTexture(t.TEXTURE_2D,o);let e=this.version===2?t.RGBA32F:t.RGBA;t.texImage2D(t.TEXTURE_2D,0,e,1,1,0,t.RGBA,t.FLOAT,null);let r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0);let n=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;return t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteTexture(o),t.deleteFramebuffer(r),n}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let t=this.gl,o,e,r,n,s;try{o=t.createTexture(),e=t.createFramebuffer(),t.bindTexture(t.TEXTURE_2D,o);let i=this.version===2?t.RGBA32F:t.RGBA;return t.texImage2D(t.TEXTURE_2D,0,i,1,1,0,t.RGBA,t.FLOAT,null),t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),t.enable(t.BLEND),r=t.createShader(t.VERTEX_SHADER),!r||(t.shaderSource(r,"void main(){}"),t.compileShader(r),n=t.createShader(t.FRAGMENT_SHADER),!n)||(t.shaderSource(n,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),t.compileShader(n),s=t.createProgram(),!s)?!1:(t.attachShader(s,r),t.attachShader(s,n),t.linkProgram(s),t.useProgram(s),t.drawArrays(t.POINTS,0,1),t.getError()===t.NO_ERROR)}finally{t.disable(t.BLEND),s&&t.deleteProgram(s),r&&t.deleteShader(r),n&&t.deleteShader(n),e&&(t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(e)),o&&(t.bindTexture(t.TEXTURE_2D,null),t.deleteTexture(o))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let t=this.gl,o=this.disjointTimerQueryWebgl2Extension,e=t.createQuery();return t.beginQuery(o.TIME_ELAPSED_EXT,e),e}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let t=this.gl,o=this.disjointTimerQueryWebgl2Extension;t.endQuery(o.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(t){let o=!1,e=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let r=this.gl,n=this.disjointTimerQueryWebgl2Extension;o=r.getQueryParameter(t,r.QUERY_RESULT_AVAILABLE),e=r.getParameter(n.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return o&&!e}getTimerResult(t){let o=0;if(this.version===2){let e=this.gl;o=e.getQueryParameter(t,e.QUERY_RESULT),e.deleteQuery(t)}else throw new Error("WebGL1 profiling currently not supported");return o/1e6}async waitForQueryAndGetTime(t){return await mi(()=>this.isTimerResultAvailable(t)),this.getTimerResult(t)}async createAndWaitForFence(){let t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let o,e=t,r=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0);return t.flush(),r===null?o=()=>!0:o=()=>{let n=e.clientWaitSync(r,0,0);return n===e.ALREADY_SIGNALED||n===e.CONDITION_SATISFIED},{query:r,isFencePassed:o}}async pollFence(t){return new Promise(o=>{this.addItemToPoll(()=>t.isFencePassed(),()=>o())})}pollItems(){let t=jb(this.itemsToPoll.map(o=>o.isDoneFn));for(let o=0;o<=t;++o){let{resolveFn:e}=this.itemsToPoll[o];e()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}async addItemToPoll(t,o){this.itemsToPoll.push({isDoneFn:t,resolveFn:o}),!(this.itemsToPoll.length>1)&&await mi(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Hi(a){let t;if((!a||a==="webgl2")&&"webgl2"in Gr?t=Gr.webgl2:(!a||a==="webgl")&&"webgl"in Gr&&(t=Gr.webgl),!t)try{let e=Xb();t=cp(e,a)}catch{let r=Yb();t=cp(r,a)}a=a||t.version===1?"webgl":"webgl2";let o=t.gl;return Gr[a]=t,o.isContextLost()?(delete Gr[a],Hi(a)):(o.disable(o.DEPTH_TEST),o.disable(o.STENCIL_TEST),o.disable(o.BLEND),o.disable(o.DITHER),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SAMPLE_COVERAGE),o.enable(o.SCISSOR_TEST),o.enable(o.CULL_FACE),o.cullFace(o.BACK),t)}function cp(a,t){let o={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},e,r=o;if((!t||t==="webgl2")&&(e=a.getContext("webgl2",r),e))try{return new hn(e,2)}catch(n){ce.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${n}`)}if((!t||t==="webgl")&&(e=a.getContext("webgl",r)||a.getContext("experimental-webgl",r),e))try{return new hn(e,1)}catch(n){ce.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${n}`)}throw new Error("WebGL is not supported")}function Yb(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let a=document.createElement("canvas");return a.width=1,a.height=1,a}function Xb(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Gr,pp=L(()=>{"use strict";lt();fp();Gr={}});var To,dp=L(()=>{"use strict";Ot();lt();lp();pp();To=class{get contextId(){return Z.webgl.contextId}set contextId(t){Z.webgl.contextId=t}get matmulMaxBatchSize(){return Z.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(t){Z.webgl.matmulMaxBatchSize=t}get textureCacheMode(){return Z.webgl.textureCacheMode}set textureCacheMode(t){Z.webgl.textureCacheMode=t}get pack(){return Z.webgl.pack}set pack(t){Z.webgl.pack=t}get async(){return Z.webgl.async}set async(t){Z.webgl.async=t}initialize(){try{return this.glContext=Hi(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ce.setWithEnv(Z),Z.webgl.context||Object.defineProperty(Z.webgl,"context",{value:this.glContext.gl}),ce.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(t){return ce.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${t}`),!1}}createSessionHandler(t){return new yo(this,t)}dispose(){this.glContext.dispose()}}});async function qi(a){if(a){let t=typeof a=="string"?[a]:a;for(let o of t){let e=hp.get(o);if(e)return e;let r=await Jb(o);if(r)return r}}else return qi(["webgl"]);throw new Error("no available backend to use")}async function Jb(a){let t=Kb;if(typeof t[a]<"u"&&Zb(t[a])){let o=t[a],e=o.initialize();if(typeof e=="object"&&"then"in e&&(e=await e),e)return hp.set(a,o),o}}function Zb(a){let t=a;return"initialize"in t&&typeof t.initialize=="function"&&"createSessionHandler"in t&&typeof t.createSessionHandler=="function"&&"dispose"in t&&typeof t.dispose=="function"}var hp,Kb,mp=L(()=>{"use strict";dp();hp=new Map,Kb={webgl:new To}});var ji,xo,bp=L(()=>{"use strict";lt();ji=class{constructor(t,o){this.op=t;this.node=o}},xo=class{constructor(t,o,e){this.graph=t;this.profiler=e;this.initialize(o)}initialize(t){this.profiler.event("session","ExecutionPlan.initialize",()=>{let o=this.graph.getNodes();if(o.length!==t.length)throw new Error("The size of nodes and OPs do not match.");this._ops=t.map((e,r)=>new ji(e,o[r])),this.reset(),this._starter=[],this._ops.forEach((e,r)=>{let n=!0;for(let s of e.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){n=!1;break}n&&this._starter.push(r)})})}reset(){this._values=this.graph.getValues().map(t=>t.tensor)}async execute(t,o){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let e=t.createInferenceHandler(),r=this.graph.getInputIndices();if(o.length!==r.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${o.length} expected: ${r.length}`);o.forEach((c,p)=>{let d=r[p];this._values[d]=c});let n=this._starter.slice(0),s=this.graph.getValues(),i=this.graph.getNodes(),u=0;for(;u<n.length;){let c=n[u++],p=this._ops[c],d=p.node.inputs.map(S=>this._values[S]);if(d.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let T=d;ce.verbose("ExecPlan",`Runing op:${p.node.name} (${T.map((S,A)=>`'${p.node.inputs[A]}': ${S.type}[${S.dims.join(",")}]`).join(", ")})`);let w=await this.profiler.event("node",p.node.name,async()=>p.op.impl(e,T,p.op.context));if(w.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");w.forEach((S,A)=>{let C=p.node.outputs[A];if(this._values[C])throw new Error(`output [${C}] already has value: op:${p.node.name}`);this._values[C]=S});let v=new Set;w.forEach((S,A)=>{let C=p.node.outputs[A];for(let F of s[C].to){let J=i[F],j=!0;for(let ie of J.inputs)if(!this._values[ie]){j=!1;break}j&&v.add(F)}}),n.push(...v)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let p=this.graph.getOutputIndices()[c],d=this._values[p];if(d===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await d.getData():d.data,l.push(d)}return ce.verbose("ExecPlan","disposing of inferenceHandler"),e.dispose(),l})}}});var oe,bt,mn,gp=L(()=>{"use strict";tn();oe=Ar(Cr());yr();fe();bt=V.experimental.fbs,mn=class a{constructor(t){if(this._attributes=new Map,t!=null){for(let o of t)o instanceof oe.onnx.AttributeProto?this._attributes.set(o.name,[a.getValue(o),a.getType(o)]):o instanceof bt.Attribute&&this._attributes.set(o.name(),[a.getValue(o),a.getType(o)]);if(this._attributes.size<t.length)throw new Error("duplicated attribute names")}}set(t,o,e){this._attributes.set(t,[e,o])}delete(t){this._attributes.delete(t)}getFloat(t,o){return this.get(t,"float",o)}getInt(t,o){return this.get(t,"int",o)}getString(t,o){return this.get(t,"string",o)}getTensor(t,o){return this.get(t,"tensor",o)}getFloats(t,o){return this.get(t,"floats",o)}getInts(t,o){return this.get(t,"ints",o)}getStrings(t,o){return this.get(t,"strings",o)}getTensors(t,o){return this.get(t,"tensors",o)}get(t,o,e){let r=this._attributes.get(t);if(r===void 0){if(e!==void 0)return e;throw new Error(`required attribute not found: ${t}`)}if(r[1]!==o)throw new Error(`type mismatch: expected ${o} but got ${r[1]}`);return r[0]}static getType(t){let o=t instanceof oe.onnx.AttributeProto?t.type:t.type();switch(o){case oe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case oe.onnx.AttributeProto.AttributeType.INT:return"int";case oe.onnx.AttributeProto.AttributeType.STRING:return"string";case oe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case oe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case oe.onnx.AttributeProto.AttributeType.INTS:return"ints";case oe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case oe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${oe.onnx.AttributeProto.AttributeType[o]}`)}}static getValue(t){let o=t instanceof oe.onnx.AttributeProto?t.type:t.type();if(o===oe.onnx.AttributeProto.AttributeType.GRAPH||o===oe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let e=this.getValueNoCheck(t);if(o===oe.onnx.AttributeProto.AttributeType.INT&&it.isLong(e))return it.longToNumber(e);if(o===oe.onnx.AttributeProto.AttributeType.INTS){let r=e,n=new Array(r.length);for(let s=0;s<r.length;s++){let i=r[s];n[s]=it.longToNumber(i)}return n}if(o===oe.onnx.AttributeProto.AttributeType.TENSOR)return t instanceof oe.onnx.AttributeProto?$e.fromProto(e):$e.fromOrtTensor(e);if(o===oe.onnx.AttributeProto.AttributeType.TENSORS){if(t instanceof oe.onnx.AttributeProto)return e.map(n=>$e.fromProto(n));if(t instanceof bt.Attribute)return e.map(n=>$e.fromOrtTensor(n))}return o===oe.onnx.AttributeProto.AttributeType.STRING&&t instanceof oe.onnx.AttributeProto?sn(e):o===oe.onnx.AttributeProto.AttributeType.STRINGS&&t instanceof oe.onnx.AttributeProto?e.map(sn):e}static getValueNoCheck(t){return t instanceof oe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(t):this.getValueNoCheckFromOrtFormat(t)}static getValueNoCheckFromOnnxFormat(t){switch(t.type){case oe.onnx.AttributeProto.AttributeType.FLOAT:return t.f;case oe.onnx.AttributeProto.AttributeType.INT:return t.i;case oe.onnx.AttributeProto.AttributeType.STRING:return t.s;case oe.onnx.AttributeProto.AttributeType.TENSOR:return t.t;case oe.onnx.AttributeProto.AttributeType.GRAPH:return t.g;case oe.onnx.AttributeProto.AttributeType.FLOATS:return t.floats;case oe.onnx.AttributeProto.AttributeType.INTS:return t.ints;case oe.onnx.AttributeProto.AttributeType.STRINGS:return t.strings;case oe.onnx.AttributeProto.AttributeType.TENSORS:return t.tensors;case oe.onnx.AttributeProto.AttributeType.GRAPHS:return t.graphs;default:throw new Error(`unsupported attribute type: ${oe.onnx.AttributeProto.AttributeType[t.type]}`)}}static getValueNoCheckFromOrtFormat(t){switch(t.type()){case bt.AttributeType.FLOAT:return t.f();case bt.AttributeType.INT:return t.i();case bt.AttributeType.STRING:return t.s();case bt.AttributeType.TENSOR:return t.t();case bt.AttributeType.GRAPH:return t.g();case bt.AttributeType.FLOATS:return t.floatsArray();case bt.AttributeType.INTS:{let o=[];for(let e=0;e<t.intsLength();e++)o.push(t.ints(e));return o}case bt.AttributeType.STRINGS:{let o=[];for(let e=0;e<t.stringsLength();e++)o.push(t.strings(e));return o}case bt.AttributeType.TENSORS:{let o=[];for(let e=0;e<t.tensorsLength();e++)o.push(t.tensors(e));return o}default:throw new Error(`unsupported attribute type: ${bt.AttributeType[t.type()]}`)}}}});var Xi,wo,Ki,Mt,vo,Yi,yp=L(()=>{"use strict";gp();tn();Xi=Ar(Cr());yr();fe();wo=V.experimental.fbs,Ki={from:(a,t)=>new Yi(a,t)},Mt=class{constructor(t){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,t&&(this.type=We.tensorValueTypeFromProto(t.type.tensorType))}get from(){return this._from}get to(){return this._to}},vo=class{constructor(t,o){t instanceof Xi.onnx.NodeProto?(this.name=t.name,this.opType=t.opType,this.attributes=new mn(t.attribute)):t instanceof wo.Node&&(this.name=o??t.name(),this.opType=t.opType(),this.attributes=new mn(We.tensorAttributesFromORTFormat(t))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Yi=class{constructor(t,o){if(!t)throw new TypeError("graph is empty");this.buildGraph(t),this.transformGraph(o),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(t){if(t instanceof Xi.onnx.GraphProto)this.buildGraphFromOnnxFormat(t);else if(t instanceof wo.Graph)this.buildGraphFromOrtFormat(t);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(t){let o=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let e=new Map;if(!t.input)throw new Error("missing information in graph: input");let r=[];for(let n of t.input){if(o.has(n.name))throw new Error(`duplicated input name: ${n.name}`);let s=this._allData.push(new Mt(n))-1;o.set(n.name,s),r.push(n.name)}if(!t.initializer)throw new Error("missing information in graph: initializer");for(let n of t.initializer){let s=o.get(n.name);if(s===void 0){let i=new Mt;i.type={shape:{dims:We.tensorDimsFromProto(n.dims)},tensorType:We.tensorDataTypeFromProto(n.dataType)},s=this._allData.push(i)-1,o.set(n.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=$e.fromProto(n)}for(let n=0;n<this._allData.length;n++)this._allData[n].tensor||(this._allInputIndices.push(n),this._allInputNames.push(r[n]));if(!t.output)throw new Error("missing information in graph: output");for(let n of t.output){if(o.has(n.name))throw new Error(`duplicated output name: ${n.name}`);let s=this._allData.push(new Mt(n))-1;o.set(n.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(n.name)}if(!t.node)throw new Error("missing information in graph: node");for(let n of t.node){if(!n.name)for(let i=0;;i++){let u=`unnamed_${n.opType}_${i}`;if(!e.has(u)){n.name=u;break}}if(e.has(n.name))throw new Error(`duplicated node name: ${n.name}`);let s=this._nodes.push(new vo(n))-1;e.set(n.name,s)}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.node[n];if(!i.output)throw new Error(`missing output for node: ${i.name}`);for(let u of i.output){let l=o.get(u);if(typeof l>"u"&&(l=this._allData.push(new Mt)-1,o.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=n,i.opType==="Constant"){if(!i.attribute||i.attribute.length!==1||!i.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!i.output||i.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=$e.fromProto(i.attribute[0].t)}}}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.node[n];if(!i.input)throw new Error(`missing input for node: ${i.name}`);for(let u of i.input){let l=o.get(u);if(typeof l>"u"){if(u===""&&(i.input.length===3||i.input.length===4)&&i.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${i.name}`)}s.inputs.push(l),this._allData[l]._to.push(n)}}return!0}buildGraphFromOrtFormat(t){let o=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let e=new Map,r=[];for(let n=0;n<t.inputsLength();n++){let s=t.inputs(n);if(o.has(s))throw new Error(`duplicated input name: ${s}`);for(let i=0;i<t.nodeArgsLength();i++)if(t.nodeArgs(i)?.name()===s){let u=new Mt;if(t.nodeArgs(i)?.type()?.valueType()!==wo.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=t.nodeArgs(i).type().value(new wo.TensorTypeAndShape),p=We.tensorDataTypeFromProto(c.elemType()),d=c.shape(),T=[];for(let v=0;v<d.dimLength();v++)T.push(it.longToNumber(d.dim(v).value().dimValue()));u.type={shape:{dims:T},tensorType:p};let w=this._allData.push(u)-1;o.set(s,w),r.push(s)}}for(let n=0;n<t.initializersLength();n++){let s=t.initializers(n),i=o.get(s.name());if(i===void 0){let u=new Mt,l=We.tensorDimsFromORTFormat(s),c=We.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:c},i=this._allData.push(u)-1,o.set(s.name(),i)}this._allData[i]._from=-1,this._allData[i].tensor=$e.fromOrtTensor(s)}for(let n=0;n<this._allData.length;n++)this._allData[n].tensor||(this._allInputIndices.push(n),this._allInputNames.push(r[n]));for(let n=0;n<t.outputsLength();n++){let s=t.outputs(n);if(o.has(s))throw new Error(`duplicated output name: ${s}`);let i=this._allData.push(new Mt)-1;o.set(s,i),this._allOutputIndices.push(i),this._allOutputNames.push(s)}if(!t.nodes)throw new Error("missing information in graph: node");for(let n=0;n<t.nodesLength();n++){let s=t.nodes(n),i=s.name();if(!i)for(let l=0;i=`unnamed_${s.opType()}_${l}`,!!e.has(i);l++);if(e.has(i))throw new Error(`duplicated node name: ${i}`);let u=this._nodes.push(new vo(s,i))-1;e.set(i,u)}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.nodes(n);if(i==null)throw new Error(`No node exists at index ${n}`);if(i?.outputsLength()===0)throw new Error(`missing output for node: ${i.name}`);for(let u=0;u<i?.outputsLength();u++){let l=i?.outputs(u),c=o.get(l);if(typeof c>"u"&&(c=this._allData.push(new Mt)-1,o.set(l,c)),s.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=n,i.opType()==="Constant"){if(i.attributesLength()!==1||!i.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(i.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=$e.fromOrtTensor(i.attributes(0).t())}}}for(let n=0;n<this._nodes.length;n++){let s=this._nodes[n],i=t.nodes(n);if(i.inputsLength()===0)throw new Error(`missing input for node: ${i.name}`);for(let u=0;u<i.inputsLength();u++){let l=i.inputs(u),c=o.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${i.name()}`);s.inputs.push(c),this._allData[c]._to.push(n)}}}checkIsAcyclic(){let t=new Set;this._allInputIndices.forEach(r=>{this._allData[r]._to.forEach(s=>{t.add(s)})});let o=Array.from(t),e=new Array(this._nodes.length).fill("white");for(;o.length>0;){let r=o.pop();e[r]==="gray"?e[r]="black":(o.push(r),e[r]="gray",this._nodes[r].outputs.forEach(n=>{let s=this._allData[n];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==r)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(i=>{if(e[i]==="gray")throw new Error("model graph is cyclic");e[i]==="white"&&o.push(i)})}))}}transformGraph(t){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),t&&t.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let t=0,o=new Array(this._nodes.length,0),e=0;for(let r=0;r<this._nodes.length;r++)o[r]=e,this._nodes[r].executeNode?(e!==r&&(this._nodes[e]=this._nodes[r]),e++):this._nodes[r].outputs.forEach(n=>{this._allData[n]._from=-2});this._nodes.splice(e,this._nodes.length-e);for(let r=0;r<this._allData.length;r++){let n=this._allData[r];n._from!==void 0&&n._from!==-1&&n._from!==-2&&(n._from=o[n._from]);for(let s=0;s<n._to.length;s++)if(n._to[s]>=0)n._to[s]=o[n._to[s]];else throw new Error("Trying to update a removed node")}t=0;for(let r=0;r<this._allData.length;r++){if(this._allData[r].from===-2&&this._allOutputIndices.indexOf(r+t)===-1){t++,this._allData.splice(r,1),r--;continue}if(t>0){let n=-1;this._allData[r].from!==void 0&&this._allData[r].from!==-1?(n=this._nodes[this._allData[r].from].outputs.indexOf(r+t),n!==-1&&(this._nodes[this._allData[r].from].outputs[n]=r)):(n=this._allInputIndices.indexOf(r+t),n!==-1&&(this._allInputIndices[n]=r)),this._allData[r].to.forEach(s=>{n=this._nodes[s].inputs.indexOf(r+t),n!==-1&&(this._nodes[s].inputs[n]=r)}),this._allData[r].to.length===0&&(n=this._allOutputIndices.indexOf(r+t),n!==-1&&(this._allOutputIndices[n]=r))}}}deleteNode(t){let o=this._nodes[t];if(o.outputs.length>1){for(let i=1;i<o.outputs.length;i++)if(this._allData[o.outputs[i]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}o.executeNode=!1;let e=o.inputs[0],r=o.outputs[0],n=this._allData[r].to;for(let i=0;i<o.inputs.length;i++){let u=this._allData[o.inputs[i]].to.indexOf(t);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[o.inputs[i]].to.splice(u,1)}this._allData[r]._to=[];let s=this._allOutputIndices.indexOf(r);if(s!==-1&&(this._allOutputIndices[s]=e),n&&n.length>0)for(let i of n){let u=this._nodes[i].inputs.indexOf(r);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[i].inputs[u]=e,this._allData[e].to.push(i)}}removeAllDropoutNodes(){let t=0;for(let o of this._nodes){if(o.opType==="Dropout"){if(o.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(o.outputs.length!==1&&o.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(o.outputs.length===2&&this._allData[o.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(t)}t++}}removeAllIdentityNodes(){let t=0;for(let o of this._nodes)o.opType==="Identity"&&this.deleteNode(t),t++}isActivation(t){switch(t.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let t of this._nodes)if(t.opType==="Conv"){let o=this._allData[t.outputs[0]]._to;if(o.length===1&&this.isActivation(this._nodes[o[0]])){let e=this._nodes[o[0]];if(e.opType==="Clip")if(e.inputs.length===1)try{t.attributes.set("activation_params","floats",[e.attributes.getFloat("min"),e.attributes.getFloat("max")])}catch{t.attributes.set("activation_params","floats",[br,gr])}else if(e.inputs.length>=3&&this._allData[e.inputs[1]].tensor!==void 0&&this._allData[e.inputs[2]].tensor!==void 0)t.attributes.set("activation_params","floats",[this._allData[e.inputs[1]].tensor.floatData[0],this._allData[e.inputs[2]].tensor.floatData[0]]);else continue;t.attributes.set("activation","string",e.opType),this.deleteNode(o[0])}}}}});var Tp,Qb,_o,xp=L(()=>{"use strict";zn();yp();tn();Tp=Ar(Cr());fe();Qb=V.experimental.fbs,_o=class{constructor(){}load(t,o,e){let r;if(!e)try{this.loadFromOnnxFormat(t,o);return}catch(n){if(e!==void 0)throw n;r=n}try{this.loadFromOrtFormat(t,o)}catch(n){throw e!==void 0?n:new Error(`Failed to load model as ONNX format: ${r}
as ORT format: ${n}`)}}loadFromOnnxFormat(t,o){let e=Tp.onnx.ModelProto.decode(t);if(it.longToNumber(e.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=e.opsetImport.map(n=>({domain:n.domain,version:it.longToNumber(n.version)})),this._graph=Ki.from(e.graph,o)}loadFromOrtFormat(t,o){let e=new _.ByteBuffer(t),r=Qb.InferenceSession.getRootAsInferenceSession(e).model();if(it.longToNumber(r.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<r.opsetImportLength();s++){let i=r.opsetImport(s);this._opsets.push({domain:i?.domain(),version:it.longToNumber(i.version())})}this._graph=Ki.from(r.graph(),o)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Oo,wp=L(()=>{"use strict";mp();bp();lt();xp();Oo=class{constructor(t={}){this._initialized=!1,this.backendHint=t.backendHint,this.profiler=Gn.create(t.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(t,o,e){await this.profiler.event("session","Session.loadModel",async()=>{let r=await qi(this.backendHint);if(this.sessionHandler=r.createSessionHandler(this.context),this._model=new _o,typeof t=="string"){let n=t.endsWith(".ort");if(typeof process<"u"&&process.versions&&process.versions.node){let s=await(void 0)(t);this.initialize(s,n)}else{let i=await(await fetch(t)).arrayBuffer();this.initialize(new Uint8Array(i),n)}}else if(ArrayBuffer.isView(t))this.initialize(t);else{let n=new Uint8Array(t,o||0,e||t.byteLength);this.initialize(n)}})}initialize(t,o){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let e=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(t,e,o),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new xo(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(t){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let o=this.normalizeAndValidateInputs(t),e=await this._executionPlan.execute(this.sessionHandler,o);return this.createOutput(e)})}normalizeAndValidateInputs(t){let o=this._model.graph.getInputNames();if(Array.isArray(t)){if(t.length!==o.length)throw new Error(`incorrect input array length: expected ${o.length} but got ${t.length}`)}else{if(t.size!==o.length)throw new Error(`incorrect input map size: expected ${o.length} but got ${t.size}`);let e=new Array(t.size),r=0;for(let n=0;n<o.length;++n){let s=t.get(o[n]);if(!s)throw new Error(`missing input tensor for: '${name}'`);e[r++]=s}t=e}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let e=this._model.graph.getInputIndices(),r=this._model.graph.getValues(),n=new Array(e.length);for(let s=0;s<e.length;++s){let i=r[e[s]];n[s]=i.type.shape.dims,this.context.graphInputTypes.push(i.type.tensorType),this.context.graphInputDims.push(t[s].dims)}this.validateInputTensorDims(n,t,!0)}else this.validateInputTensorDims(this.context.graphInputDims,t,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,t),t}validateInputTensorTypes(t,o){for(let e=0;e<o.length;e++){let r=t[e],n=o[e].type;if(r!==n)throw new Error(`input tensor[${e}] check failed: expected type '${r}' but got ${n}`)}}validateInputTensorDims(t,o,e){for(let r=0;r<o.length;r++){let n=t[r],s=o[r].dims;if(!this.compareTensorDims(n,s,e))throw new Error(`input tensor[${r}] check failed: expected shape '[${n.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(t,o,e){if(t.length!==o.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==o[r]&&(!e||t[r]!==0))return!1;return!0}createOutput(t){let o=this._model.graph.getOutputNames();if(t.length!==o.length)throw new Error("expected number of outputs do not match number of generated outputs");let e=new Map;for(let r=0;r<o.length;++r)e.set(o[r],t[r]);return e}initializeOps(t){let o=t.getNodes();this._ops=new Array(o.length);for(let e=0;e<o.length;e++)this._ops[e]=this.sessionHandler.resolve(o[e],this._model.opsets,t)}}});var Io,vp=L(()=>{"use strict";Ot();yr();Io=class{constructor(t){this.session=t;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(t,o,e){let r=new Map;for(let i in t)if(Object.hasOwnProperty.call(t,i)){let u=t[i];r.set(i,new $e(u.dims,u.type,void 0,void 0,u.data))}let n=await this.session.run(r),s={};return n.forEach((i,u)=>{s[u]=new Me(i.type,i.data,i.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var _p={};Sr(_p,{onnxjsBackend:()=>tg});var Ji,tg,Op=L(()=>{"use strict";wp();vp();Ji=class{async init(){}async createInferenceSessionHandler(t,o){let e=new Oo(o);return typeof t=="string"?await e.loadModel(t):await e.loadModel(t),new Io(e)}},tg=new Ji});var Zi={};Sr(Zi,{createReadStream:()=>Ip,readFile:()=>rg,readFileSync:()=>ng});var rg,ng,Ip,Qi=L(()=>{rg=void 0,ng=void 0,Ip=void 0});var ea={};Sr(ea,{join:()=>og});var og,ta=L(()=>{og=void 0});var Pp=me((Ap,ra)=>{"use strict";var Sp=(()=>{var a=typeof document<"u"?document.currentScript?.src:void 0;return typeof __filename<"u"&&(a||=__filename),function(t={}){var o=t,e,r,n=new Promise((m,x)=>{e=m,r=x}),s=Object.assign({},o),i="./this.program",u=typeof window=="object",l=typeof importScripts=="function",c=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",p="",d,T,w;if(c){var v=(Qi(),ar(Zi)),S=(ta(),ar(ea));p=l?S.dirname(p)+"/":__dirname+"/",d=(m,x)=>(m=Ke(m)?new URL(m):S.normalize(m),v.readFileSync(m,x?void 0:"utf8")),w=m=>(m=d(m,!0),m.buffer||(m=new Uint8Array(m)),m),T=(m,x,O,D=!0)=>{m=Ke(m)?new URL(m):S.normalize(m),v.readFile(m,D?void 0:"utf8",(M,q)=>{M?O(M):x(D?q.buffer:q)})},!o.thisProgram&&1<process.argv.length&&(i=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2)}else(u||l)&&(l?p=self.location.href:typeof document<"u"&&document.currentScript&&(p=document.currentScript.src),a&&(p=a),p.startsWith("blob:")?p="":p=p.substr(0,p.replace(/[?#].*/,"").lastIndexOf("/")+1),d=m=>{var x=new XMLHttpRequest;return x.open("GET",m,!1),x.send(null),x.responseText},l&&(w=m=>{var x=new XMLHttpRequest;return x.open("GET",m,!1),x.responseType="arraybuffer",x.send(null),new Uint8Array(x.response)}),T=(m,x,O)=>{var D=new XMLHttpRequest;D.open("GET",m,!0),D.responseType="arraybuffer",D.onload=()=>{D.status==200||D.status==0&&D.response?x(D.response):O()},D.onerror=O,D.send(null)});var A=console.log.bind(console),C=console.error.bind(console);Object.assign(o,s),s=null;var F,J=!1,j,ie,G,Te,He;function Le(){var m=F.buffer;o.HEAP8=j=new Int8Array(m),o.HEAP16=new Int16Array(m),o.HEAPU8=ie=new Uint8Array(m),o.HEAPU16=new Uint16Array(m),o.HEAP32=G=new Int32Array(m),o.HEAPU32=Te=new Uint32Array(m),o.HEAPF32=new Float32Array(m),o.HEAPF64=He=new Float64Array(m)}var Y=[],Ne=[],Se=[],yt=0,et=null,ee=null;function qe(m){throw m="Aborted("+m+")",C(m),J=!0,m=new WebAssembly.RuntimeError(m+". Build with -sASSERTIONS for more info."),r(m),m}var Ht=m=>m.startsWith("data:application/octet-stream;base64,"),Ke=m=>m.startsWith("file://"),at;if(at="ort-wasm.wasm",!Ht(at)){var Re=at;at=o.locateFile?o.locateFile(Re,p):p+Re}function Ce(m){if(w)return w(m);throw"both async and sync fetching of the wasm failed"}function Hr(m){if(u||l){if(typeof fetch=="function"&&!Ke(m))return fetch(m,{credentials:"same-origin"}).then(x=>{if(!x.ok)throw`failed to load wasm binary file at '${m}'`;return x.arrayBuffer()}).catch(()=>Ce(m));if(T)return new Promise((x,O)=>{T(m,D=>x(new Uint8Array(D)),O)})}return Promise.resolve().then(()=>Ce(m))}function Tt(m,x,O){return Hr(m).then(D=>WebAssembly.instantiate(D,x)).then(O,D=>{C(`failed to asynchronously prepare wasm: ${D}`),qe(D)})}function qt(m,x){var O=at;return typeof WebAssembly.instantiateStreaming!="function"||Ht(O)||Ke(O)||c||typeof fetch!="function"?Tt(O,m,x):fetch(O,{credentials:"same-origin"}).then(D=>WebAssembly.instantiateStreaming(D,m).then(x,function(M){return C(`wasm streaming compile failed: ${M}`),C("falling back to ArrayBuffer instantiation"),Tt(O,m,x)}))}var xt,Lt={798088:(m,x,O,D)=>{if(typeof o>"u"||!o.ya)return 1;if(m=je(m>>>0),m.startsWith("./")&&(m=m.substring(2)),m=o.ya.get(m),!m)return 2;if(x>>>=0,O>>>=0,x+O>m.byteLength)return 3;try{return ie.set(m.subarray(x,x+O),D>>>0>>>0),0}catch{return 4}}};class wt{constructor(x){this.wa=x-24}}var tt=0,tr=0,ke=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Be=(m,x,O)=>{x>>>=0;var D=x+O;for(O=x;m[O]&&!(O>=D);)++O;if(16<O-x&&m.buffer&&ke)return ke.decode(m.subarray(x,O));for(D="";x<O;){var M=m[x++];if(M&128){var q=m[x++]&63;if((M&224)==192)D+=String.fromCharCode((M&31)<<6|q);else{var re=m[x++]&63;M=(M&240)==224?(M&15)<<12|q<<6|re:(M&7)<<18|q<<12|re<<6|m[x++]&63,65536>M?D+=String.fromCharCode(M):(M-=65536,D+=String.fromCharCode(55296|M>>10,56320|M&1023))}}else D+=String.fromCharCode(M)}return D},je=(m,x)=>(m>>>=0)?Be(ie,m,x):"",vt=m=>{for(var x=0,O=0;O<m.length;++O){var D=m.charCodeAt(O);127>=D?x++:2047>=D?x+=2:55296<=D&&57343>=D?(x+=4,++O):x+=3}return x},_t=(m,x,O,D)=>{if(O>>>=0,!(0<D))return 0;var M=O;D=O+D-1;for(var q=0;q<m.length;++q){var re=m.charCodeAt(q);if(55296<=re&&57343>=re){var Fe=m.charCodeAt(++q);re=65536+((re&1023)<<10)|Fe&1023}if(127>=re){if(O>=D)break;x[O++>>>0]=re}else{if(2047>=re){if(O+1>=D)break;x[O++>>>0]=192|re>>6}else{if(65535>=re){if(O+2>=D)break;x[O++>>>0]=224|re>>12}else{if(O+3>=D)break;x[O++>>>0]=240|re>>18,x[O++>>>0]=128|re>>12&63}x[O++>>>0]=128|re>>6&63}x[O++>>>0]=128|re&63}}return x[O>>>0]=0,O-M},jt=m=>m%4===0&&(m%100!==0||m%400===0),qr=[0,31,60,91,121,152,182,213,244,274,305,335],Tn=[0,31,59,90,120,151,181,212,243,273,304,334],Ct=[],Or={},rr=()=>{if(!nr){var m={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:i||"./this.program"},x;for(x in Or)Or[x]===void 0?delete m[x]:m[x]=Or[x];var O=[];for(x in m)O.push(`${x}=${m[x]}`);nr=O}return nr},nr,xn=[null,[],[]],Gt=[31,29,31,30,31,30,31,31,30,31,30,31],wn=[31,28,31,30,31,30,31,31,30,31,30,31];function he(m){var x=Array(vt(m)+1);return _t(m,x,0,x.length),x}function jr(m,x,O,D){function M(P,pe,xe){for(P=typeof P=="number"?P.toString():P||"";P.length<pe;)P=xe[0]+P;return P}function q(P,pe){return M(P,pe,"0")}function re(P,pe){function xe(Zr){return 0>Zr?-1:0<Zr?1:0}var Ft;return(Ft=xe(P.getFullYear()-pe.getFullYear()))===0&&(Ft=xe(P.getMonth()-pe.getMonth()))===0&&(Ft=xe(P.getDate()-pe.getDate())),Ft}function Fe(P){switch(P.getDay()){case 0:return new Date(P.getFullYear()-1,11,29);case 1:return P;case 2:return new Date(P.getFullYear(),0,3);case 3:return new Date(P.getFullYear(),0,2);case 4:return new Date(P.getFullYear(),0,1);case 5:return new Date(P.getFullYear()-1,11,31);case 6:return new Date(P.getFullYear()-1,11,30)}}function st(P){var pe=P.sa;for(P=new Date(new Date(P.ta+1900,0,1).getTime());0<pe;){var xe=P.getMonth(),Ft=(jt(P.getFullYear())?Gt:wn)[xe];if(pe>Ft-P.getDate())pe-=Ft-P.getDate()+1,P.setDate(1),11>xe?P.setMonth(xe+1):(P.setMonth(0),P.setFullYear(P.getFullYear()+1));else{P.setDate(P.getDate()+pe);break}}return xe=new Date(P.getFullYear()+1,0,4),pe=Fe(new Date(P.getFullYear(),0,4)),xe=Fe(xe),0>=re(pe,P)?0>=re(xe,P)?P.getFullYear()+1:P.getFullYear():P.getFullYear()-1}m>>>=0,x>>>=0,O>>>=0,D>>>=0;var ze=Te[D+40>>>2>>>0];D={Ba:G[D>>>2>>>0],Aa:G[D+4>>>2>>>0],ua:G[D+8>>>2>>>0],xa:G[D+12>>>2>>>0],va:G[D+16>>>2>>>0],ta:G[D+20>>>2>>>0],na:G[D+24>>>2>>>0],sa:G[D+28>>>2>>>0],Da:G[D+32>>>2>>>0],za:G[D+36>>>2>>>0],Ca:ze?je(ze):""},O=je(O),ze={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var Ve in ze)O=O.replace(new RegExp(Ve,"g"),ze[Ve]);var Jr="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Yt="January February March April May June July August September October November December".split(" ");ze={"%a":P=>Jr[P.na].substring(0,3),"%A":P=>Jr[P.na],"%b":P=>Yt[P.va].substring(0,3),"%B":P=>Yt[P.va],"%C":P=>q((P.ta+1900)/100|0,2),"%d":P=>q(P.xa,2),"%e":P=>M(P.xa,2," "),"%g":P=>st(P).toString().substring(2),"%G":st,"%H":P=>q(P.ua,2),"%I":P=>(P=P.ua,P==0?P=12:12<P&&(P-=12),q(P,2)),"%j":P=>{for(var pe=0,xe=0;xe<=P.va-1;pe+=(jt(P.ta+1900)?Gt:wn)[xe++]);return q(P.xa+pe,3)},"%m":P=>q(P.va+1,2),"%M":P=>q(P.Aa,2),"%n":()=>`
`,"%p":P=>0<=P.ua&&12>P.ua?"AM":"PM","%S":P=>q(P.Ba,2),"%t":()=>"	","%u":P=>P.na||7,"%U":P=>q(Math.floor((P.sa+7-P.na)/7),2),"%V":P=>{var pe=Math.floor((P.sa+7-(P.na+6)%7)/7);if(2>=(P.na+371-P.sa-2)%7&&pe++,pe)pe==53&&(xe=(P.na+371-P.sa)%7,xe==4||xe==3&&jt(P.ta)||(pe=1));else{pe=52;var xe=(P.na+7-P.sa-1)%7;(xe==4||xe==5&&jt(P.ta%400-1))&&pe++}return q(pe,2)},"%w":P=>P.na,"%W":P=>q(Math.floor((P.sa+7-(P.na+6)%7)/7),2),"%y":P=>(P.ta+1900).toString().substring(2),"%Y":P=>P.ta+1900,"%z":P=>{P=P.za;var pe=0<=P;return P=Math.abs(P)/60,(pe?"+":"-")+("0000"+(P/60*100+P%60)).slice(-4)},"%Z":P=>P.Ca,"%%":()=>"%"},O=O.replace(/%%/g,"\0\0");for(Ve in ze)O.includes(Ve)&&(O=O.replace(new RegExp(Ve,"g"),ze[Ve](D)));return O=O.replace(/\0\0/g,"%"),Ve=he(O),Ve.length>x?0:(j.set(Ve,m>>>0),Ve.length-1)}var Yr={a:function(m,x,O){m>>>=0;var D=new wt(m);throw Te[D.wa+16>>>2>>>0]=0,Te[D.wa+4>>>2>>>0]=x>>>0,Te[D.wa+8>>>2>>>0]=O>>>0,tt=m,tr++,tt},e:function(){return 0},H:function(){},x:function(){},z:function(){},J:function(){return 0},F:function(){},A:function(){},E:function(){},g:function(){},y:function(){},v:function(){},G:function(){},w:function(){},k:()=>1,I:function(m,x,O){return x>>>=0,ie.copyWithin(m>>>0>>>0,x>>>0,x+(O>>>0)>>>0)},n:function(m,x,O){m=x+2097152>>>0<4194305-!!m?(m>>>0)+4294967296*x:NaN,O>>>=0,m=new Date(1e3*m),G[O>>>2>>>0]=m.getUTCSeconds(),G[O+4>>>2>>>0]=m.getUTCMinutes(),G[O+8>>>2>>>0]=m.getUTCHours(),G[O+12>>>2>>>0]=m.getUTCDate(),G[O+16>>>2>>>0]=m.getUTCMonth(),G[O+20>>>2>>>0]=m.getUTCFullYear()-1900,G[O+24>>>2>>>0]=m.getUTCDay(),G[O+28>>>2>>>0]=(m.getTime()-Date.UTC(m.getUTCFullYear(),0,1,0,0,0,0))/864e5|0},o:function(m,x,O){m=x+2097152>>>0<4194305-!!m?(m>>>0)+4294967296*x:NaN,O>>>=0,m=new Date(1e3*m),G[O>>>2>>>0]=m.getSeconds(),G[O+4>>>2>>>0]=m.getMinutes(),G[O+8>>>2>>>0]=m.getHours(),G[O+12>>>2>>>0]=m.getDate(),G[O+16>>>2>>>0]=m.getMonth(),G[O+20>>>2>>>0]=m.getFullYear()-1900,G[O+24>>>2>>>0]=m.getDay(),G[O+28>>>2>>>0]=(jt(m.getFullYear())?qr:Tn)[m.getMonth()]+m.getDate()-1|0,G[O+36>>>2>>>0]=-(60*m.getTimezoneOffset()),x=new Date(m.getFullYear(),6,1).getTimezoneOffset();var D=new Date(m.getFullYear(),0,1).getTimezoneOffset();G[O+32>>>2>>>0]=(x!=D&&m.getTimezoneOffset()==Math.min(D,x))|0},p:function(m){m>>>=0;var x=new Date(G[m+20>>>2>>>0]+1900,G[m+16>>>2>>>0],G[m+12>>>2>>>0],G[m+8>>>2>>>0],G[m+4>>>2>>>0],G[m>>>2>>>0],0),O=G[m+32>>>2>>>0],D=x.getTimezoneOffset(),M=new Date(x.getFullYear(),6,1).getTimezoneOffset(),q=new Date(x.getFullYear(),0,1).getTimezoneOffset(),re=Math.min(q,M);return 0>O?G[m+32>>>2>>>0]=+(M!=q&&re==D):0<O!=(re==D)&&(M=Math.max(q,M),x.setTime(x.getTime()+6e4*((0<O?re:M)-D))),G[m+24>>>2>>>0]=x.getDay(),G[m+28>>>2>>>0]=(jt(x.getFullYear())?qr:Tn)[x.getMonth()]+x.getDate()-1|0,G[m>>>2>>>0]=x.getSeconds(),G[m+4>>>2>>>0]=x.getMinutes(),G[m+8>>>2>>>0]=x.getHours(),G[m+12>>>2>>>0]=x.getDate(),G[m+16>>>2>>>0]=x.getMonth(),G[m+20>>>2>>>0]=x.getYear(),m=x.getTime(),m=isNaN(m)?-1:m/1e3,Xr((xt=m,1<=+Math.abs(xt)?0<xt?+Math.floor(xt/4294967296)>>>0:~~+Math.ceil((xt-+(~~xt>>>0))/4294967296)>>>0:0)),m>>>0},l:function(){return-52},m:function(){},t:function(m,x,O,D){O>>>=0,D>>>=0;var M=new Date().getFullYear(),q=new Date(M,0,1),re=new Date(M,6,1);M=q.getTimezoneOffset();var Fe=re.getTimezoneOffset();Te[m>>>0>>>2>>>0]=60*Math.max(M,Fe),G[x>>>0>>>2>>>0]=+(M!=Fe),m=st=>st.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1],q=m(q),re=m(re),Fe<M?(_t(q,ie,O,17),_t(re,ie,D,17)):(_t(q,ie,D,17),_t(re,ie,O,17))},d:()=>{qe("")},B:function(m,x,O){m>>>=0,x>>>=0,O>>>=0,Ct.length=0;for(var D;D=ie[x++>>>0];){var M=D!=105;M&=D!=112,O+=M&&O%8?4:0,Ct.push(D==112?Te[O>>>2>>>0]:D==105?G[O>>>2>>>0]:He[O>>>3>>>0]),O+=M?8:4}return Lt[m](...Ct)},h:()=>Date.now(),u:function(){return 4294901760},b:()=>performance.now(),s:function(m){m>>>=0;var x=ie.length;if(4294901760<m)return!1;for(var O=1;4>=O;O*=2){var D=x*(1+.2/O);D=Math.min(D,m+100663296);var M=Math;D=Math.max(m,D);e:{M=(M.min.call(M,4294901760,D+(65536-D%65536)%65536)-F.buffer.byteLength+65535)/65536;try{F.grow(M),Le();var q=1;break e}catch{}q=void 0}if(q)return!0}return!1},C:function(m,x){m>>>=0,x>>>=0;var O=0;return rr().forEach((D,M)=>{var q=x+O;for(M=Te[m+4*M>>>2>>>0]=q,q=0;q<D.length;++q)j[M++>>>0]=D.charCodeAt(q);j[M>>>0]=0,O+=D.length+1}),0},D:function(m,x){m>>>=0,x>>>=0;var O=rr();Te[m>>>2>>>0]=O.length;var D=0;return O.forEach(M=>D+=M.length+1),Te[x>>>2>>>0]=D,0},f:()=>52,j:function(){return 52},q:function(){return 70},i:function(m,x,O,D){x>>>=0,O>>>=0,D>>>=0;for(var M=0,q=0;q<O;q++){var re=Te[x>>>2>>>0],Fe=Te[x+4>>>2>>>0];x+=8;for(var st=0;st<Fe;st++){var ze=ie[re+st>>>0],Ve=xn[m];ze===0||ze===10?((m===1?A:C)(Be(Ve,0)),Ve.length=0):Ve.push(ze)}M+=Fe}return Te[D>>>2>>>0]=M,0},r:jr,c:function(m,x,O,D){return jr(m>>>0,x>>>0,O>>>0,D>>>0)}},te=function(){function m(O){return te=O.exports,te=_n(),F=te.K,Le(),Ne.unshift(te.L),yt--,yt==0&&(et!==null&&(clearInterval(et),et=null),ee&&(O=ee,ee=null,O())),te}var x={a:Yr};if(yt++,o.instantiateWasm)try{return o.instantiateWasm(x,m)}catch(O){C(`Module.instantiateWasm callback failed with error: ${O}`),r(O)}return qt(x,function(O){m(O.instance)}).catch(r),{}}();o._OrtInit=(m,x)=>(o._OrtInit=te.M)(m,x),o._OrtGetLastError=(m,x)=>(o._OrtGetLastError=te.N)(m,x),o._OrtCreateSessionOptions=(m,x,O,D,M,q,re,Fe,st,ze)=>(o._OrtCreateSessionOptions=te.O)(m,x,O,D,M,q,re,Fe,st,ze),o._OrtAppendExecutionProvider=(m,x)=>(o._OrtAppendExecutionProvider=te.P)(m,x),o._OrtAddFreeDimensionOverride=(m,x,O)=>(o._OrtAddFreeDimensionOverride=te.Q)(m,x,O),o._OrtAddSessionConfigEntry=(m,x,O)=>(o._OrtAddSessionConfigEntry=te.R)(m,x,O),o._OrtReleaseSessionOptions=m=>(o._OrtReleaseSessionOptions=te.S)(m),o._OrtCreateSession=(m,x,O)=>(o._OrtCreateSession=te.T)(m,x,O),o._OrtReleaseSession=m=>(o._OrtReleaseSession=te.U)(m),o._OrtGetInputOutputCount=(m,x,O)=>(o._OrtGetInputOutputCount=te.V)(m,x,O),o._OrtGetInputName=(m,x)=>(o._OrtGetInputName=te.W)(m,x),o._OrtGetOutputName=(m,x)=>(o._OrtGetOutputName=te.X)(m,x),o._OrtFree=m=>(o._OrtFree=te.Y)(m),o._OrtCreateTensor=(m,x,O,D,M,q)=>(o._OrtCreateTensor=te.Z)(m,x,O,D,M,q),o._OrtGetTensorData=(m,x,O,D,M)=>(o._OrtGetTensorData=te._)(m,x,O,D,M),o._OrtReleaseTensor=m=>(o._OrtReleaseTensor=te.$)(m),o._OrtCreateRunOptions=(m,x,O,D)=>(o._OrtCreateRunOptions=te.aa)(m,x,O,D),o._OrtAddRunConfigEntry=(m,x,O)=>(o._OrtAddRunConfigEntry=te.ba)(m,x,O),o._OrtReleaseRunOptions=m=>(o._OrtReleaseRunOptions=te.ca)(m),o._OrtCreateBinding=m=>(o._OrtCreateBinding=te.da)(m),o._OrtBindInput=(m,x,O)=>(o._OrtBindInput=te.ea)(m,x,O),o._OrtBindOutput=(m,x,O,D)=>(o._OrtBindOutput=te.fa)(m,x,O,D),o._OrtClearBoundOutputs=m=>(o._OrtClearBoundOutputs=te.ga)(m),o._OrtReleaseBinding=m=>(o._OrtReleaseBinding=te.ha)(m),o._OrtRunWithBinding=(m,x,O,D,M)=>(o._OrtRunWithBinding=te.ia)(m,x,O,D,M),o._OrtRun=(m,x,O,D,M,q,re,Fe)=>(o._OrtRun=te.ja)(m,x,O,D,M,q,re,Fe),o._OrtEndProfiling=m=>(o._OrtEndProfiling=te.ka)(m),o._malloc=m=>(o._malloc=te.la)(m),o._free=m=>(o._free=te.ma)(m);var Xr=m=>(Xr=te.oa)(m),vn=m=>(vn=te.pa)(m),X=m=>(X=te.qa)(m),or=()=>(or=te.ra)();function _n(){var m=te;m=Object.assign({},m);var x=O=>D=>O(D)>>>0;return m.la=x(m.la),m.qa=x(m.qa),m.ra=(O=>()=>O()>>>0)(m.ra),m}o.stackSave=()=>or(),o.stackRestore=m=>vn(m),o.stackAlloc=m=>X(m),o.UTF8ToString=je,o.stringToUTF8=(m,x,O)=>_t(m,ie,x,O),o.lengthBytesUTF8=vt;var Ut;ee=function m(){Ut||Kr(),Ut||(ee=m)};function Kr(){if(!(0<yt)){if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;){var m=o.preRun.shift();Y.unshift(m)}for(;0<Y.length;)Y.shift()(o);if(!(0<yt||Ut||(Ut=!0,o.calledRun=!0,J))){for(;0<Ne.length;)Ne.shift()(o);for(e(o);0<Se.length;)Se.shift()(o)}}}return Kr(),n}})();typeof Ap=="object"&&typeof ra=="object"?ra.exports=Sp:typeof define=="function"&&define.amd&&define([],()=>Sp)});var Ep=me(()=>{});var Dp=me(()=>{});var Lp={};Sr(Lp,{cpus:()=>ig});var ig,Cp=L(()=>{ig=void 0});var kp=me(($p,na)=>{"use strict";var Fp=(()=>{var a=typeof document<"u"?document.currentScript?.src:void 0;return typeof __filename<"u"&&(a||=__filename),function(t={}){function o(){return Se.buffer!=qe.buffer&&Ce(),qe}function e(){return Se.buffer!=qe.buffer&&Ce(),Ht}function r(){return Se.buffer!=qe.buffer&&Ce(),Ke}function n(){return Se.buffer!=qe.buffer&&Ce(),at}function s(){return Se.buffer!=qe.buffer&&Ce(),Re}var i=t,u,l,c=new Promise((f,b)=>{u=f,l=b}),p=Object.assign({},i),d="./this.program",T=(f,b)=>{throw b},w=typeof window=="object",v=typeof importScripts=="function",S=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",A=i.ENVIRONMENT_IS_PTHREAD||!1,C="";function F(f){return i.locateFile?i.locateFile(f,C):C+f}var J,j,ie;if(S){var G=(Qi(),ar(Zi)),Te=(ta(),ar(ea));C=v?Te.dirname(C)+"/":__dirname+"/",J=(f,b)=>(f=je(f)?new URL(f):Te.normalize(f),G.readFileSync(f,b?void 0:"utf8")),ie=f=>(f=J(f,!0),f.buffer||(f=new Uint8Array(f)),f),j=(f,b,y,I=!0)=>{f=je(f)?new URL(f):Te.normalize(f),G.readFile(f,I?void 0:"utf8",(k,$)=>{k?y(k):b(I?$.buffer:$)})},!i.thisProgram&&1<process.argv.length&&(d=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),T=(f,b)=>{throw process.exitCode=f,b},global.Worker=Ep().Worker}else(w||v)&&(v?C=self.location.href:typeof document<"u"&&document.currentScript&&(C=document.currentScript.src),typeof a<"u"&&a&&(C=a),C.startsWith("blob:")?C="":C=C.substr(0,C.replace(/[?#].*/,"").lastIndexOf("/")+1),S||(J=f=>{var b=new XMLHttpRequest;return b.open("GET",f,!1),b.send(null),b.responseText},v&&(ie=f=>{var b=new XMLHttpRequest;return b.open("GET",f,!1),b.responseType="arraybuffer",b.send(null),new Uint8Array(b.response)}),j=(f,b,y)=>{var I=new XMLHttpRequest;I.open("GET",f,!0),I.responseType="arraybuffer",I.onload=()=>{I.status==200||I.status==0&&I.response?b(I.response):y()},I.onerror=y,I.send(null)}));S&&typeof performance>"u"&&(global.performance=Dp().performance);var He=console.log.bind(console),Le=console.error.bind(console);S&&(He=(...f)=>G.writeSync(1,f.join(" ")+`
`),Le=(...f)=>G.writeSync(2,f.join(" ")+`
`));var Y=He,Ne=Le;Object.assign(i,p),p=null;var Se,yt,et=!1,ee,qe,Ht,Ke,at,Re;function Ce(){var f=Se.buffer;i.HEAP8=qe=new Int8Array(f),i.HEAP16=new Int16Array(f),i.HEAPU8=Ht=new Uint8Array(f),i.HEAPU16=new Uint16Array(f),i.HEAP32=Ke=new Int32Array(f),i.HEAPU32=at=new Uint32Array(f),i.HEAPF32=new Float32Array(f),i.HEAPF64=Re=new Float64Array(f)}var Hr=16777216;if(A)Se=i.wasmMemory;else if(i.wasmMemory)Se=i.wasmMemory;else if(Se=new WebAssembly.Memory({initial:Hr/65536,maximum:65536,shared:!0}),!(Se.buffer instanceof SharedArrayBuffer))throw Ne("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),S&&Ne("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");Ce(),Hr=Se.buffer.byteLength;var Tt=[],qt=[],xt=[],Lt=0,wt=null,tt=null;function tr(){if(Lt--,Lt==0&&(wt!==null&&(clearInterval(wt),wt=null),tt)){var f=tt;tt=null,f()}}function ke(f){throw f="Aborted("+f+")",Ne(f),et=!0,ee=1,f=new WebAssembly.RuntimeError(f+". Build with -sASSERTIONS for more info."),l(f),f}var Be=f=>f.startsWith("data:application/octet-stream;base64,"),je=f=>f.startsWith("file://"),vt;vt="ort-wasm-threaded.wasm",Be(vt)||(vt=F(vt));function _t(f){if(ie)return ie(f);throw"both async and sync fetching of the wasm failed"}function jt(f){if(w||v){if(typeof fetch=="function"&&!je(f))return fetch(f,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw`failed to load wasm binary file at '${f}'`;return b.arrayBuffer()}).catch(()=>_t(f));if(j)return new Promise((b,y)=>{j(f,I=>b(new Uint8Array(I)),y)})}return Promise.resolve().then(()=>_t(f))}function qr(f,b,y){return jt(f).then(I=>WebAssembly.instantiate(I,b)).then(y,I=>{Ne(`failed to asynchronously prepare wasm: ${I}`),ke(I)})}function Tn(f,b){var y=vt;return typeof WebAssembly.instantiateStreaming!="function"||Be(y)||je(y)||S||typeof fetch!="function"?qr(y,f,b):fetch(y,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(b,function(k){return Ne(`wasm streaming compile failed: ${k}`),Ne("falling back to ArrayBuffer instantiation"),qr(y,f,b)}))}var Ct,Or={799444:(f,b,y,I)=>{if(typeof i>"u"||!i.bb)return 1;if(f=Fe(f>>>0),f.startsWith("./")&&(f=f.substring(2)),f=i.bb.get(f),!f)return 2;if(b>>>=0,y>>>=0,I>>>=0,b+y>f.byteLength)return 3;try{return e().set(f.subarray(b,b+y),I>>>0),0}catch{return 4}}};function rr(f){this.name="ExitStatus",this.message=`Program terminated with exit(${f})`,this.status=f}var nr=f=>{f.terminate(),f.onmessage=()=>{}},xn=f=>{X.Oa.length==0&&(Xr(),X.Xa(X.Oa[0]));var b=X.Oa.pop();if(!b)return 6;X.Pa.push(b),X.La[f.Na]=b,b.Na=f.Na;var y={cmd:"run",start_routine:f.gb,arg:f.cb,pthread_ptr:f.Na};return S&&b.unref(),b.postMessage(y,f.mb),0},Gt=0,wn=f=>{var b=zo();return f=f(),Sn(b),f},he=(f,b,...y)=>wn(()=>{for(var I=y.length,k=Uo(8*I),$=k>>>3,z=0;z<y.length;z++){var Oe=y[z];s()[$+z>>>0]=Oe}return ka(f,0,I,k,b)});function jr(f){if(A)return he(0,1,f);ee=f,0<Gt||(X.hb(),i.onExit?.(f),et=!0),T(f,new rr(f))}var Yr=f=>{if(ee=f,A)throw _n(f),"unwind";jr(f)};function te(){for(var f=i.numThreads;f--;)Xr();Tt.unshift(()=>{Lt++,vn(()=>tr())})}function Xr(){var f=F("ort-wasm-threaded.worker.js");f=new Worker(f),X.Oa.push(f)}function vn(f){A?f():Promise.all(X.Oa.map(X.Xa)).then(f)}var X={Oa:[],Pa:[],ab:[],La:{},Va(){A?(X.receiveObjectTransfer=X.fb,X.threadInitTLS=X.$a,X.setExitStatus=X.Za):te()},Za:f=>ee=f,pb:["$terminateWorker"],hb:()=>{for(var f of X.Pa)nr(f);for(f of X.Oa)nr(f);X.Oa=[],X.Pa=[],X.La=[]},Ya:f=>{var b=f.Na;delete X.La[b],X.Oa.push(f),X.Pa.splice(X.Pa.indexOf(f),1),f.Na=0,Mo(b)},fb(){},$a(){X.ab.forEach(f=>f())},Xa:f=>new Promise(b=>{f.onmessage=$=>{$=$.data;var z=$.cmd;if($.targetThread&&$.targetThread!=In()){var Oe=X.La[$.targetThread];Oe?Oe.postMessage($,$.transferList):Ne(`Internal error! Worker sent a message "${z}" to target pthread ${$.targetThread}, but that thread no longer exists!`)}else z==="checkMailbox"?On():z==="spawnThread"?xn($):z==="cleanupThread"?X.Ya(X.La[$.thread]):z==="killThread"?($=$.thread,z=X.La[$],delete X.La[$],nr(z),Mo($),X.Pa.splice(X.Pa.indexOf(z),1),z.Na=0):z==="cancelThread"?X.La[$.thread].postMessage({cmd:"cancel"}):z==="loaded"?(f.loaded=!0,S&&!f.Na&&f.unref(),b(f)):z==="alert"?alert(`Thread ${$.threadId}: ${$.text}`):$.target==="setimmediate"?f.postMessage($):z==="callHandler"?i[$.handler](...$.args):z&&Ne(`worker sent an unknown command ${z}`)},f.onerror=$=>{throw Ne(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$},S&&(f.on("message",$=>f.onmessage({data:$})),f.on("error",$=>f.onerror($)));var y=[],I=["onExit"],k;for(k of I)i.hasOwnProperty(k)&&y.push(k);f.postMessage({cmd:"load",handlers:y,urlOrBlob:i.mainScriptUrlOrBlob||a,wasmMemory:Se,wasmModule:yt})})};i.PThread=X;var or=f=>{for(;0<f.length;)f.shift()(i)};i.establishStackSpace=()=>{var f=In(),b=n()[f+52>>>2>>>0];f=n()[f+56>>>2>>>0],Ra(b,b-f),Sn(b)};function _n(f){if(A)return he(1,0,f);Yr(f)}var Ut=[],Kr;i.invokeEntryPoint=(f,b)=>{Gt=0;var y=Ut[f];y||(f>=Ut.length&&(Ut.length=f+1),Ut[f]=y=Kr.get(f)),f=y(b),0<Gt?X.Za(f):Go(f)};class m{constructor(b){this.Ua=b-24}Va(b,y){n()[this.Ua+16>>>2>>>0]=0,n()[this.Ua+4>>>2>>>0]=b,n()[this.Ua+8>>>2>>>0]=y}}var x=0,O=0;function D(f,b,y,I){return A?he(2,1,f,b,y,I):M(f,b,y,I)}function M(f,b,y,I){if(f>>>=0,b>>>=0,y>>>=0,I>>>=0,typeof SharedArrayBuffer>"u")return Ne("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var k=[];return A&&k.length===0?D(f,b,y,I):(f={gb:y,Na:f,cb:I,mb:k},A?(f.ob="spawnThread",postMessage(f,k),0):xn(f))}var q=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,re=(f,b,y)=>{b>>>=0;var I=b+y;for(y=b;f[y]&&!(y>=I);)++y;if(16<y-b&&f.buffer&&q)return q.decode(f.buffer instanceof SharedArrayBuffer?f.slice(b,y):f.subarray(b,y));for(I="";b<y;){var k=f[b++];if(k&128){var $=f[b++]&63;if((k&224)==192)I+=String.fromCharCode((k&31)<<6|$);else{var z=f[b++]&63;k=(k&240)==224?(k&15)<<12|$<<6|z:(k&7)<<18|$<<12|z<<6|f[b++]&63,65536>k?I+=String.fromCharCode(k):(k-=65536,I+=String.fromCharCode(55296|k>>10,56320|k&1023))}}else I+=String.fromCharCode(k)}return I},Fe=(f,b)=>(f>>>=0)?re(e(),f,b):"";function st(f,b,y){return A?he(3,1,f,b,y):0}function ze(f,b){if(A)return he(4,1,f,b)}var Ve=f=>{for(var b=0,y=0;y<f.length;++y){var I=f.charCodeAt(y);127>=I?b++:2047>=I?b+=2:55296<=I&&57343>=I?(b+=4,++y):b+=3}return b},Jr=(f,b,y,I)=>{if(y>>>=0,!(0<I))return 0;var k=y;I=y+I-1;for(var $=0;$<f.length;++$){var z=f.charCodeAt($);if(55296<=z&&57343>=z){var Oe=f.charCodeAt(++$);z=65536+((z&1023)<<10)|Oe&1023}if(127>=z){if(y>=I)break;b[y++>>>0]=z}else{if(2047>=z){if(y+1>=I)break;b[y++>>>0]=192|z>>6}else{if(65535>=z){if(y+2>=I)break;b[y++>>>0]=224|z>>12}else{if(y+3>=I)break;b[y++>>>0]=240|z>>18,b[y++>>>0]=128|z>>12&63}b[y++>>>0]=128|z>>6&63}b[y++>>>0]=128|z&63}}return b[y>>>0]=0,y-k},Yt=(f,b,y)=>Jr(f,e(),b,y);function P(f,b){if(A)return he(5,1,f,b)}function pe(f,b,y){if(A)return he(6,1,f,b,y)}function xe(f,b,y){return A?he(7,1,f,b,y):0}function Ft(f,b){if(A)return he(8,1,f,b)}function Zr(f,b,y){if(A)return he(9,1,f,b,y)}function ha(f,b,y,I){if(A)return he(10,1,f,b,y,I)}function ma(f,b,y,I){if(A)return he(11,1,f,b,y,I)}function ba(f,b,y,I){if(A)return he(12,1,f,b,y,I)}function ga(f){if(A)return he(13,1,f)}function ya(f,b){if(A)return he(14,1,f,b)}function Ta(f,b,y){if(A)return he(15,1,f,b,y)}function $o(f){f>>>=0,typeof Atomics.nb=="function"&&(Atomics.nb(r(),f>>>2,f).value.then(On),f+=128,Atomics.store(r(),f>>>2,1))}i.__emscripten_thread_mailbox_await=$o;var On=()=>{var f=In();if(f&&($o(f),f=Ba,!et))try{if(f(),!(0<Gt))try{A?Go(ee):Yr(ee)}catch(b){b instanceof rr||b=="unwind"||T(1,b)}}catch(b){b instanceof rr||b=="unwind"||T(1,b)}};i.checkMailbox=On;var ko=[],Ir=f=>f%4===0&&(f%100!==0||f%400===0),xa=[0,31,60,91,121,152,182,213,244,274,305,335],wa=[0,31,59,90,120,151,181,212,243,273,304,334];function va(f,b,y,I,k,$,z,Oe){return A?he(16,1,f,b,y,I,k,$,z,Oe):-52}function _a(f,b,y,I,k,$,z){if(A)return he(17,1,f,b,y,I,k,$,z)}var Bo=[],No={},Oa=()=>{if(!Ro){var f={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:d||"./this.program"},b;for(b in No)No[b]===void 0?delete f[b]:f[b]=No[b];var y=[];for(b in f)y.push(`${b}=${f[b]}`);Ro=y}return Ro},Ro;function Ia(f,b){if(A)return he(18,1,f,b);f>>>=0,b>>>=0;var y=0;return Oa().forEach((I,k)=>{var $=b+y;for(k=n()[f+4*k>>>2>>>0]=$,$=0;$<I.length;++$)o()[k++>>>0]=I.charCodeAt($);o()[k>>>0]=0,y+=I.length+1}),0}function Sa(f,b){if(A)return he(19,1,f,b);f>>>=0,b>>>=0;var y=Oa();n()[f>>>2>>>0]=y.length;var I=0;return y.forEach(k=>I+=k.length+1),n()[b>>>2>>>0]=I,0}function Aa(f){return A?he(20,1,f):52}function Pa(f,b,y,I){return A?he(21,1,f,b,y,I):52}function Ea(f,b,y,I,k){return A?he(22,1,f,b,y,I,k):70}var bd=[null,[],[]];function Da(f,b,y,I){if(A)return he(23,1,f,b,y,I);b>>>=0,y>>>=0,I>>>=0;for(var k=0,$=0;$<y;$++){var z=n()[b>>>2>>>0],Oe=n()[b+4>>>2>>>0];b+=8;for(var $t=0;$t<Oe;$t++){var Ye=e()[z+$t>>>0],rt=bd[f];Ye===0||Ye===10?((f===1?Y:Ne)(re(rt,0)),rt.length=0):rt.push(Ye)}k+=Oe}return n()[I>>>2>>>0]=k,0}var La=[31,29,31,30,31,30,31,31,30,31,30,31],Ca=[31,28,31,30,31,30,31,31,30,31,30,31];function gd(f){var b=Array(Ve(f)+1);return Jr(f,b,0,b.length),b}var yd=(f,b)=>{o().set(f,b>>>0)};function Fa(f,b,y,I){function k(E,de,Ie){for(E=typeof E=="number"?E.toString():E||"";E.length<de;)E=Ie[0]+E;return E}function $(E,de){return k(E,de,"0")}function z(E,de){function Ie(za){return 0>za?-1:0<za?1:0}var ir;return(ir=Ie(E.getFullYear()-de.getFullYear()))===0&&(ir=Ie(E.getMonth()-de.getMonth()))===0&&(ir=Ie(E.getDate()-de.getDate())),ir}function Oe(E){switch(E.getDay()){case 0:return new Date(E.getFullYear()-1,11,29);case 1:return E;case 2:return new Date(E.getFullYear(),0,3);case 3:return new Date(E.getFullYear(),0,2);case 4:return new Date(E.getFullYear(),0,1);case 5:return new Date(E.getFullYear()-1,11,31);case 6:return new Date(E.getFullYear()-1,11,30)}}function $t(E){var de=E.Qa;for(E=new Date(new Date(E.Ra+1900,0,1).getTime());0<de;){var Ie=E.getMonth(),ir=(Ir(E.getFullYear())?La:Ca)[Ie];if(de>ir-E.getDate())de-=ir-E.getDate()+1,E.setDate(1),11>Ie?E.setMonth(Ie+1):(E.setMonth(0),E.setFullYear(E.getFullYear()+1));else{E.setDate(E.getDate()+de);break}}return Ie=new Date(E.getFullYear()+1,0,4),de=Oe(new Date(E.getFullYear(),0,4)),Ie=Oe(Ie),0>=z(de,E)?0>=z(Ie,E)?E.getFullYear()+1:E.getFullYear():E.getFullYear()-1}f>>>=0,b>>>=0,y>>>=0,I>>>=0;var Ye=n()[I+40>>>2>>>0];I={kb:r()[I>>>2>>>0],jb:r()[I+4>>>2>>>0],Sa:r()[I+8>>>2>>>0],Wa:r()[I+12>>>2>>>0],Ta:r()[I+16>>>2>>>0],Ra:r()[I+20>>>2>>>0],Ma:r()[I+24>>>2>>>0],Qa:r()[I+28>>>2>>>0],qb:r()[I+32>>>2>>>0],ib:r()[I+36>>>2>>>0],lb:Ye?Fe(Ye):""},y=Fe(y),Ye={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rt in Ye)y=y.replace(new RegExp(rt,"g"),Ye[rt]);var Ga="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Ua="January February March April May June July August September October November December".split(" ");Ye={"%a":E=>Ga[E.Ma].substring(0,3),"%A":E=>Ga[E.Ma],"%b":E=>Ua[E.Ta].substring(0,3),"%B":E=>Ua[E.Ta],"%C":E=>$((E.Ra+1900)/100|0,2),"%d":E=>$(E.Wa,2),"%e":E=>k(E.Wa,2," "),"%g":E=>$t(E).toString().substring(2),"%G":$t,"%H":E=>$(E.Sa,2),"%I":E=>(E=E.Sa,E==0?E=12:12<E&&(E-=12),$(E,2)),"%j":E=>{for(var de=0,Ie=0;Ie<=E.Ta-1;de+=(Ir(E.Ra+1900)?La:Ca)[Ie++]);return $(E.Wa+de,3)},"%m":E=>$(E.Ta+1,2),"%M":E=>$(E.jb,2),"%n":()=>`
`,"%p":E=>0<=E.Sa&&12>E.Sa?"AM":"PM","%S":E=>$(E.kb,2),"%t":()=>"	","%u":E=>E.Ma||7,"%U":E=>$(Math.floor((E.Qa+7-E.Ma)/7),2),"%V":E=>{var de=Math.floor((E.Qa+7-(E.Ma+6)%7)/7);if(2>=(E.Ma+371-E.Qa-2)%7&&de++,de)de==53&&(Ie=(E.Ma+371-E.Qa)%7,Ie==4||Ie==3&&Ir(E.Ra)||(de=1));else{de=52;var Ie=(E.Ma+7-E.Qa-1)%7;(Ie==4||Ie==5&&Ir(E.Ra%400-1))&&de++}return $(de,2)},"%w":E=>E.Ma,"%W":E=>$(Math.floor((E.Qa+7-(E.Ma+6)%7)/7),2),"%y":E=>(E.Ra+1900).toString().substring(2),"%Y":E=>E.Ra+1900,"%z":E=>{E=E.ib;var de=0<=E;return E=Math.abs(E)/60,(de?"+":"-")+("0000"+(E/60*100+E%60)).slice(-4)},"%Z":E=>E.lb,"%%":()=>"%"},y=y.replace(/%%/g,"\0\0");for(rt in Ye)y.includes(rt)&&(y=y.replace(new RegExp(rt,"g"),Ye[rt](I)));return y=y.replace(/\0\0/g,"%"),rt=gd(y),rt.length>b?0:(yd(rt,f),rt.length-1)}X.Va();var Td=[jr,_n,D,st,ze,P,pe,xe,Ft,Zr,ha,ma,ba,ga,ya,Ta,va,_a,Ia,Sa,Aa,Pa,Ea,Da],xd={b:function(f,b,y){throw f>>>=0,new m(f).Va(b>>>0,y>>>0),x=f,O++,x},L:function(f){$a(f>>>0,!v,1,!w,131072,!1),X.$a()},j:function(f){f>>>=0,A?postMessage({cmd:"cleanupThread",thread:f}):X.Ya(X.La[f])},H:M,h:st,S:ze,D:P,F:pe,T:xe,Q:Ft,J:Zr,P:ha,n:ma,E:ba,B:ga,R:ya,C:Ta,p:()=>1,z:function(f,b){f>>>=0,f==b>>>0?setTimeout(On):A?postMessage({targetThread:f,cmd:"checkMailbox"}):(f=X.La[f])&&f.postMessage({cmd:"checkMailbox"})},I:function(f,b,y,I,k){b>>>=0,y>>>=0,ko.length=I,k=k>>>0>>>3;for(var $=0;$<I;$++)ko[$]=s()[k+$>>>0];return f=b?Or[b]:Td[f],X.eb=y,y=f(...ko),X.eb=0,y},K:$o,o:function(f){S&&X.La[f>>>0].ref()},s:function(f,b,y){f=b+2097152>>>0<4194305-!!f?(f>>>0)+4294967296*b:NaN,y>>>=0,f=new Date(1e3*f),r()[y>>>2>>>0]=f.getUTCSeconds(),r()[y+4>>>2>>>0]=f.getUTCMinutes(),r()[y+8>>>2>>>0]=f.getUTCHours(),r()[y+12>>>2>>>0]=f.getUTCDate(),r()[y+16>>>2>>>0]=f.getUTCMonth(),r()[y+20>>>2>>>0]=f.getUTCFullYear()-1900,r()[y+24>>>2>>>0]=f.getUTCDay(),f=(f.getTime()-Date.UTC(f.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,r()[y+28>>>2>>>0]=f},t:function(f,b,y){f=b+2097152>>>0<4194305-!!f?(f>>>0)+4294967296*b:NaN,y>>>=0,f=new Date(1e3*f),r()[y>>>2>>>0]=f.getSeconds(),r()[y+4>>>2>>>0]=f.getMinutes(),r()[y+8>>>2>>>0]=f.getHours(),r()[y+12>>>2>>>0]=f.getDate(),r()[y+16>>>2>>>0]=f.getMonth(),r()[y+20>>>2>>>0]=f.getFullYear()-1900,r()[y+24>>>2>>>0]=f.getDay(),b=(Ir(f.getFullYear())?xa:wa)[f.getMonth()]+f.getDate()-1|0,r()[y+28>>>2>>>0]=b,r()[y+36>>>2>>>0]=-(60*f.getTimezoneOffset()),b=new Date(f.getFullYear(),6,1).getTimezoneOffset();var I=new Date(f.getFullYear(),0,1).getTimezoneOffset();f=(b!=I&&f.getTimezoneOffset()==Math.min(I,b))|0,r()[y+32>>>2>>>0]=f},u:function(f){f>>>=0;var b=new Date(r()[f+20>>>2>>>0]+1900,r()[f+16>>>2>>>0],r()[f+12>>>2>>>0],r()[f+8>>>2>>>0],r()[f+4>>>2>>>0],r()[f>>>2>>>0],0),y=r()[f+32>>>2>>>0],I=b.getTimezoneOffset(),k=new Date(b.getFullYear(),6,1).getTimezoneOffset(),$=new Date(b.getFullYear(),0,1).getTimezoneOffset(),z=Math.min($,k);return 0>y?r()[f+32>>>2>>>0]=+(k!=$&&z==I):0<y!=(z==I)&&(k=Math.max($,k),b.setTime(b.getTime()+6e4*((0<y?z:k)-I))),r()[f+24>>>2>>>0]=b.getDay(),y=(Ir(b.getFullYear())?xa:wa)[b.getMonth()]+b.getDate()-1|0,r()[f+28>>>2>>>0]=y,r()[f>>>2>>>0]=b.getSeconds(),r()[f+4>>>2>>>0]=b.getMinutes(),r()[f+8>>>2>>>0]=b.getHours(),r()[f+12>>>2>>>0]=b.getDate(),r()[f+16>>>2>>>0]=b.getMonth(),r()[f+20>>>2>>>0]=b.getYear(),f=b.getTime(),f=isNaN(f)?-1:f/1e3,Na((Ct=f,1<=+Math.abs(Ct)?0<Ct?+Math.floor(Ct/4294967296)>>>0:~~+Math.ceil((Ct-+(~~Ct>>>0))/4294967296)>>>0:0)),f>>>0},q:va,r:_a,y:function(f,b,y,I){f>>>=0,b>>>=0,y>>>=0,I>>>=0;var k=new Date().getFullYear(),$=new Date(k,0,1),z=new Date(k,6,1);k=$.getTimezoneOffset();var Oe=z.getTimezoneOffset(),$t=Math.max(k,Oe);n()[f>>>2>>>0]=60*$t,r()[b>>>2>>>0]=+(k!=Oe),f=Ye=>Ye.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1],$=f($),z=f(z),Oe<k?(Yt($,y,17),Yt(z,I,17)):(Yt($,I,17),Yt(z,y,17))},c:()=>{ke("")},O:function(f,b,y){f>>>=0,b>>>=0,y>>>=0,Bo.length=0;for(var I;I=e()[b++>>>0];){var k=I!=105;k&=I!=112,y+=k&&y%8?4:0,Bo.push(I==112?n()[y>>>2>>>0]:I==105?r()[y>>>2>>>0]:s()[y>>>3>>>0]),y+=k?8:4}return Or[f](...Bo)},k:()=>{},i:()=>Date.now(),U:()=>{throw Gt+=1,"unwind"},A:function(){return 4294901760},e:()=>performance.timeOrigin+performance.now(),f:()=>S?(Cp(),ar(Lp)).cpus().length:navigator.hardwareConcurrency,x:function(f){f>>>=0;var b=e().length;if(f<=b||4294901760<f)return!1;for(var y=1;4>=y;y*=2){var I=b*(1+.2/y);I=Math.min(I,f+100663296);var k=Math;I=Math.max(f,I);e:{k=(k.min.call(k,4294901760,I+(65536-I%65536)%65536)-Se.buffer.byteLength+65535)/65536;try{Se.grow(k),Ce();var $=1;break e}catch{}$=void 0}if($)return!0}return!1},M:Ia,N:Sa,G:Yr,g:Aa,m:Pa,v:Ea,l:Da,a:Se||i.wasmMemory,w:Fa,d:function(f,b,y,I){return Fa(f>>>0,b>>>0,y>>>0,I>>>0)}},K=function(){function f(y,I){return K=y.exports,K=wd(),X.ab.push(K.ya),Kr=K.za,qt.unshift(K.V),yt=I,tr(),K}var b={a:xd};if(Lt++,i.instantiateWasm)try{return i.instantiateWasm(b,f)}catch(y){Ne(`Module.instantiateWasm callback failed with error: ${y}`),l(y)}return Tn(b,function(y){f(y.instance,y.module)}).catch(l),{}}();i._OrtInit=(f,b)=>(i._OrtInit=K.W)(f,b),i._OrtGetLastError=(f,b)=>(i._OrtGetLastError=K.X)(f,b),i._OrtCreateSessionOptions=(f,b,y,I,k,$,z,Oe,$t,Ye)=>(i._OrtCreateSessionOptions=K.Y)(f,b,y,I,k,$,z,Oe,$t,Ye),i._OrtAppendExecutionProvider=(f,b)=>(i._OrtAppendExecutionProvider=K.Z)(f,b),i._OrtAddFreeDimensionOverride=(f,b,y)=>(i._OrtAddFreeDimensionOverride=K._)(f,b,y),i._OrtAddSessionConfigEntry=(f,b,y)=>(i._OrtAddSessionConfigEntry=K.$)(f,b,y),i._OrtReleaseSessionOptions=f=>(i._OrtReleaseSessionOptions=K.aa)(f),i._OrtCreateSession=(f,b,y)=>(i._OrtCreateSession=K.ba)(f,b,y),i._OrtReleaseSession=f=>(i._OrtReleaseSession=K.ca)(f),i._OrtGetInputOutputCount=(f,b,y)=>(i._OrtGetInputOutputCount=K.da)(f,b,y),i._OrtGetInputName=(f,b)=>(i._OrtGetInputName=K.ea)(f,b),i._OrtGetOutputName=(f,b)=>(i._OrtGetOutputName=K.fa)(f,b),i._OrtFree=f=>(i._OrtFree=K.ga)(f),i._OrtCreateTensor=(f,b,y,I,k,$)=>(i._OrtCreateTensor=K.ha)(f,b,y,I,k,$),i._OrtGetTensorData=(f,b,y,I,k)=>(i._OrtGetTensorData=K.ia)(f,b,y,I,k),i._OrtReleaseTensor=f=>(i._OrtReleaseTensor=K.ja)(f),i._OrtCreateRunOptions=(f,b,y,I)=>(i._OrtCreateRunOptions=K.ka)(f,b,y,I),i._OrtAddRunConfigEntry=(f,b,y)=>(i._OrtAddRunConfigEntry=K.la)(f,b,y),i._OrtReleaseRunOptions=f=>(i._OrtReleaseRunOptions=K.ma)(f),i._OrtCreateBinding=f=>(i._OrtCreateBinding=K.na)(f),i._OrtBindInput=(f,b,y)=>(i._OrtBindInput=K.oa)(f,b,y),i._OrtBindOutput=(f,b,y,I)=>(i._OrtBindOutput=K.pa)(f,b,y,I),i._OrtClearBoundOutputs=f=>(i._OrtClearBoundOutputs=K.qa)(f),i._OrtReleaseBinding=f=>(i._OrtReleaseBinding=K.ra)(f),i._OrtRunWithBinding=(f,b,y,I,k)=>(i._OrtRunWithBinding=K.sa)(f,b,y,I,k),i._OrtRun=(f,b,y,I,k,$,z,Oe)=>(i._OrtRun=K.ta)(f,b,y,I,k,$,z,Oe),i._OrtEndProfiling=f=>(i._OrtEndProfiling=K.ua)(f);var In=i._pthread_self=()=>(In=i._pthread_self=K.va)();i._malloc=f=>(i._malloc=K.wa)(f),i._free=f=>(i._free=K.xa)(f),i.__emscripten_tls_init=()=>(i.__emscripten_tls_init=K.ya)();var $a=i.__emscripten_thread_init=(f,b,y,I,k,$)=>($a=i.__emscripten_thread_init=K.Aa)(f,b,y,I,k,$);i.__emscripten_thread_crashed=()=>(i.__emscripten_thread_crashed=K.Ba)();var ka=(f,b,y,I,k)=>(ka=K.Ca)(f,b,y,I,k),Mo=f=>(Mo=K.Da)(f),Go=i.__emscripten_thread_exit=f=>(Go=i.__emscripten_thread_exit=K.Ea)(f),Ba=()=>(Ba=K.Fa)(),Na=f=>(Na=K.Ga)(f),Ra=(f,b)=>(Ra=K.Ha)(f,b),Sn=f=>(Sn=K.Ia)(f),Uo=f=>(Uo=K.Ja)(f),zo=()=>(zo=K.Ka)();function wd(){var f=K;f=Object.assign({},f);var b=I=>()=>I()>>>0,y=I=>k=>I(k)>>>0;return f.va=b(f.va),f.wa=y(f.wa),f.emscripten_main_runtime_thread_id=b(f.emscripten_main_runtime_thread_id),f.Ja=y(f.Ja),f.Ka=b(f.Ka),f}i.wasmMemory=Se,i.stackSave=()=>zo(),i.stackRestore=f=>Sn(f),i.stackAlloc=f=>Uo(f),i.keepRuntimeAlive=()=>0<Gt,i.UTF8ToString=Fe,i.stringToUTF8=Yt,i.lengthBytesUTF8=Ve,i.ExitStatus=rr,i.PThread=X;var An;tt=function f(){An||Ma(),An||(tt=f)};function Ma(){if(!(0<Lt))if(A)u(i),A||or(qt),startWorker(i);else{if(i.preRun)for(typeof i.preRun=="function"&&(i.preRun=[i.preRun]);i.preRun.length;)Tt.unshift(i.preRun.shift());or(Tt),0<Lt||An||(An=!0,i.calledRun=!0,et||(A||or(qt),u(i),A||or(xt)))}}return Ma(),c}})();typeof $p=="object"&&typeof na=="object"?na.exports=Fp:typeof define=="function"&&define.amd&&define([],()=>Fp)});var Bp=me((aO,ag)=>{ag.exports='"use strict";var Module={},ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",e=>onmessage({data:e}));var fs=require("fs"),vm=require("vm");Object.assign(global,{self:global,require,Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:e=>vm.runInThisContext(fs.readFileSync(e,"utf8"),{filename:e}),postMessage:e=>parentPort.postMessage(e),performance:global.performance||{now:Date.now}})}var initializedJS=!1;function threadPrintErr(...e){var a=e.join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,a+`\n`);return}console.error(a)}function threadAlert(...e){var a=e.join(" ");postMessage({cmd:"alert",text:a,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,a)=>{var r=Module.wasmModule;Module.wasmModule=null;var t=new WebAssembly.Instance(r,e);return a(t)},self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let r=[];self.onmessage=t=>r.push(t),self.startWorker=t=>{Module=t,postMessage({cmd:"loaded"});for(let s of r)handleMessage(s);self.onmessage=handleMessage},Module.wasmModule=e.data.wasmModule;for(const t of e.data.handlers)Module[t]=(...s)=>{postMessage({cmd:"callHandler",handler:t,args:s})};if(Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,typeof e.data.urlOrBlob=="string")importScripts(e.data.urlOrBlob);else{var a=URL.createObjectURL(e.data.urlOrBlob);importScripts(a),URL.revokeObjectURL(a)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.__emscripten_thread_mailbox_await(e.data.pthread_ptr),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(r){if(r!="unwind")throw r}}else e.data.cmd==="cancel"?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):e.data.target==="setimmediate"||(e.data.cmd==="checkMailbox"?initializedJS&&Module.checkMailbox():e.data.cmd&&(err(`worker.js received unknown command ${e.data.cmd}`),err(e.data)))}catch(r){throw Module.__emscripten_thread_crashed?.(),r}}self.onmessage=handleMessage;\n'});var Rp,sg,oa,ia,So,Np,ug,lg,fg,Mp,De,Ur=L(()=>{"use strict";Rp=Pp();sg=kp(),ia=!1,So=!1,Np=!1,ug=a=>{if(a===1)return!1;if(typeof SharedArrayBuffer>"u")return typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+a+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),!1;typeof process<"u"&&process.versions&&process.versions.node&&console.warn("env.wasm.numThreads is set to "+a+", however, currently onnxruntime-web does not support multi-threads in Node.js. Please consider using onnxruntime-node for performance critical scenarios.");try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},lg=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},fg=(a,t)=>a?t?"ort-wasm-simd-threaded.wasm":"ort-wasm-simd.wasm":t?"ort-wasm-threaded.wasm":"ort-wasm.wasm",Mp=async a=>{if(ia)return Promise.resolve();if(So)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Np)throw new Error("previous call to 'initializeWebAssembly()' failed.");So=!0;let t=a.initTimeout,o=a.numThreads,e=a.simd,r=ug(o),n=e&&lg(),s=a.wasmPaths,i=typeof s=="string"?s:void 0,u=fg(n,r),l=typeof s=="object"?s[u]:void 0,c=!1,p=[];if(t>0&&p.push(new Promise(d=>{setTimeout(()=>{c=!0,d()},t)})),p.push(new Promise((d,T)=>{let w=r?sg:Rp,v={locateFile:(S,A)=>r&&S.endsWith(".worker.js")&&typeof Blob<"u"?URL.createObjectURL(new Blob([Bp()],{type:"text/javascript"})):S.endsWith(".wasm")?l||(i??A)+u:A+S};if(r)if(v.numThreads=o,typeof Blob>"u")v.mainScriptUrlOrBlob=(void 0)(__dirname,"ort-wasm-threaded.js");else{let S=`var ortWasmThreaded=${w.toString()};`;v.mainScriptUrlOrBlob=new Blob([S],{type:"text/javascript"})}w(v).then(S=>{So=!1,ia=!0,oa=S,d()},S=>{So=!1,Np=!0,T(S)})})),await Promise.race(p),c)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},De=()=>{if(ia&&oa)return oa;throw new Error("WebAssembly is not initialized yet.")}});var ve,bn,_e,Ao=L(()=>{"use strict";Ur();ve=(a,t)=>{let o=De(),e=o.lengthBytesUTF8(a)+1,r=o._malloc(e);return o.stringToUTF8(a,r,e),t.push(r),r},bn=(a,t,o,e)=>{if(typeof a=="object"&&a!==null){if(o.has(a))throw new Error("Circular reference in options");o.add(a)}Object.entries(a).forEach(([r,n])=>{let s=t?t+r:r;if(typeof n=="object")bn(n,s+".",o,e);else if(typeof n=="string"||typeof n=="number")e(s,n.toString());else if(typeof n=="boolean")e(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},_e=a=>{let t=De(),o=t.stackSave();try{let e=t.stackAlloc(8);t._OrtGetLastError(e,e+4);let r=t.HEAP32[e/4],n=t.HEAPU32[e/4+1],s=n?t.UTF8ToString(n):"";throw new Error(`${a} ERROR_CODE: ${r}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(o)}}});var Gp,Up=L(()=>{"use strict";Ur();Ao();Gp=a=>{let t=De(),o=0,e=[],r=a||{};try{if(a?.logSeverityLevel===void 0)r.logSeverityLevel=2;else if(typeof a.logSeverityLevel!="number"||!Number.isInteger(a.logSeverityLevel)||a.logSeverityLevel<0||a.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${a.logSeverityLevel}`);if(a?.logVerbosityLevel===void 0)r.logVerbosityLevel=0;else if(typeof a.logVerbosityLevel!="number"||!Number.isInteger(a.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${a.logVerbosityLevel}`);a?.terminate===void 0&&(r.terminate=!1);let n=0;return a?.tag!==void 0&&(n=ve(a.tag,e)),o=t._OrtCreateRunOptions(r.logSeverityLevel,r.logVerbosityLevel,!!r.terminate,n),o===0&&_e("Can't create run options."),a?.extra!==void 0&&bn(a.extra,"",new WeakSet,(s,i)=>{let u=ve(s,e),l=ve(i,e);t._OrtAddRunConfigEntry(o,u,l)!==0&&_e(`Can't set a run config entry: ${s} - ${i}.`)}),[o,e]}catch(n){throw o!==0&&t._OrtReleaseRunOptions(o),e.forEach(s=>t._free(s)),n}}});var cg,pg,dg,hg,zp,Vp=L(()=>{"use strict";Ur();Ao();cg=a=>{switch(a){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${a}`)}},pg=a=>{switch(a){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${a}`)}},dg=a=>{a.extra||(a.extra={}),a.extra.session||(a.extra.session={});let t=a.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),a.executionProviders&&a.executionProviders.some(o=>(typeof o=="string"?o:o.name)==="webgpu")&&(a.enableMemPattern=!1)},hg=(a,t,o)=>{for(let e of t){let r=typeof e=="string"?e:e.name;switch(r){case"webnn":if(r="WEBNN",typeof e!="string"){let s=e;if(s?.deviceType){let i=ve("deviceType",o),u=ve(s.deviceType,o);De()._OrtAddSessionConfigEntry(a,i,u)!==0&&_e(`Can't set a session config entry: 'deviceType' - ${s.deviceType}.`)}if(s?.numThreads){let i=s.numThreads;(typeof i!="number"||!Number.isInteger(i)||i<0)&&(i=0);let u=ve("numThreads",o),l=ve(i.toString(),o);De()._OrtAddSessionConfigEntry(a,u,l)!==0&&_e(`Can't set a session config entry: 'numThreads' - ${s.numThreads}.`)}if(s?.powerPreference){let i=ve("powerPreference",o),u=ve(s.powerPreference,o);De()._OrtAddSessionConfigEntry(a,i,u)!==0&&_e(`Can't set a session config entry: 'powerPreference' - ${s.powerPreference}.`)}}break;case"webgpu":if(r="JS",typeof e!="string"){let s=e;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let i=ve("preferredLayout",o),u=ve(s.preferredLayout,o);De()._OrtAddSessionConfigEntry(a,i,u)!==0&&_e(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${r}`)}let n=ve(r,o);De()._OrtAppendExecutionProvider(a,n)!==0&&_e(`Can't append execution provider: ${r}.`)}},zp=a=>{let t=De(),o=0,e=[],r=a||{};dg(r);try{let n=cg(r.graphOptimizationLevel??"all"),s=pg(r.executionMode??"sequential"),i=typeof r.logId=="string"?ve(r.logId,e):0,u=r.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=r.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof r.optimizedModelFilePath=="string"?ve(r.optimizedModelFilePath,e):0;if(o=t._OrtCreateSessionOptions(n,!!r.enableCpuMemArena,!!r.enableMemPattern,s,!!r.enableProfiling,0,i,u,l,c),o===0&&_e("Can't create session options."),r.executionProviders&&hg(o,r.executionProviders,e),r.enableGraphCapture!==void 0){if(typeof r.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${r.enableGraphCapture}`);let p=ve("enableGraphCapture",e),d=ve(r.enableGraphCapture.toString(),e);t._OrtAddSessionConfigEntry(o,p,d)!==0&&_e(`Can't set a session config entry: 'enableGraphCapture' - ${r.enableGraphCapture}.`)}if(r.freeDimensionOverrides)for(let[p,d]of Object.entries(r.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof d!="number"||!Number.isInteger(d)||d<0)throw new Error(`free dimension override value must be a non-negative integer: ${d}`);let T=ve(p,e);t._OrtAddFreeDimensionOverride(o,T,d)!==0&&_e(`Can't set a free dimension override: ${p} - ${d}.`)}return r.extra!==void 0&&bn(r.extra,"",new WeakSet,(p,d)=>{let T=ve(p,e),w=ve(d,e);t._OrtAddSessionConfigEntry(o,T,w)!==0&&_e(`Can't set a session config entry: ${p} - ${d}.`)}),[o,e]}catch(n){throw o!==0&&t._OrtReleaseSessionOptions(o),e.forEach(s=>t._free(s)),n}}});var aa,Wp,sa,Hp,qp,Po,jp,ua=L(()=>{"use strict";aa=a=>{switch(a){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${a}`)}},Wp=a=>{switch(a){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${a}`)}},sa=a=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][a],Hp=a=>{switch(a){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${a}`)}},qp=a=>{switch(a){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${a}`)}},Po=a=>a==="float32"||a==="float16"||a==="int32"||a==="int64"||a==="uint32"||a==="uint8"||a==="bool",jp=a=>{switch(a){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${a}`)}}});var gn,la=L(()=>{"use strict";gn=async a=>{if(typeof a=="string")if(typeof process<"u"&&process.versions&&process.versions.node)try{return new Uint8Array(await(void 0)(a))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let o=(void 0)(a),e=[];for await(let r of o)e.push(r);return new Uint8Array(Buffer.concat(e))}throw t}else{let t=await fetch(a);if(!t.ok)throw new Error(`failed to load external data file: ${a}`);let o=t.headers.get("Content-Length"),e=o?parseInt(o,10):0;if(e<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${a}, no response body.`);let r=t.body.getReader(),n;try{n=new ArrayBuffer(e)}catch(i){if(i instanceof RangeError){let u=Math.ceil(e/65536);n=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw i}let s=0;for(;;){let{done:i,value:u}=await r.read();if(i)break;let l=u.byteLength;new Uint8Array(n,s,l).set(u),s+=l}return new Uint8Array(n,0,e)}}else return a instanceof Blob?new Uint8Array(await a.arrayBuffer()):a instanceof Uint8Array?a:new Uint8Array(a)}});var mg,Xp,Kp,zr,bg,fa,Jp,Zp,Yp,Qp,ed,td,rd=L(()=>{"use strict";Up();Vp();ua();Ur();Ao();la();mg=(a,t)=>{De()._OrtInit(a,t)!==0&&_e("Can't initialize onnxruntime.")},Xp=async a=>{mg(a.wasm.numThreads,qp(a.logLevel))},Kp=async(a,t)=>{},zr=new Map,bg=a=>{let t=De(),o=t.stackSave();try{let e=t.stackAlloc(8);return t._OrtGetInputOutputCount(a,e,e+4)!==0&&_e("Can't get session input/output count."),[t.HEAP32[e/4],t.HEAP32[e/4+1]]}finally{t.stackRestore(o)}},fa=a=>{let t=De(),o=t._malloc(a.byteLength);if(o===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${a.byteLength}.`);return t.HEAPU8.set(a,o),[o,a.byteLength]},Jp=async(a,t)=>{let o,e,r=De();Array.isArray(a)?[o,e]=a:a.buffer===r.HEAPU8.buffer?[o,e]=[a.byteOffset,a.byteLength]:[o,e]=fa(a);let n=0,s=0,i=0,u=[],l=[],c=[];try{if([s,u]=zp(t),t?.externalData&&r.mountExternalData){let C=[];for(let F of t.externalData){let J=typeof F=="string"?F:F.path;C.push(gn(typeof F=="string"?F:F.data).then(j=>{r.mountExternalData(J,j)}))}await Promise.all(C)}n=await r._OrtCreateSession(o,e,s),n===0&&_e("Can't create a session.");let[p,d]=bg(n),T=!!t?.enableGraphCapture,w=[],v=[],S=[];for(let C=0;C<p;C++){let F=r._OrtGetInputName(n,C);F===0&&_e("Can't get an input name."),l.push(F),w.push(r.UTF8ToString(F))}for(let C=0;C<d;C++){let F=r._OrtGetOutputName(n,C);F===0&&_e("Can't get an output name."),c.push(F);let J=r.UTF8ToString(F);v.push(J)}let A=null;return zr.set(n,[n,l,c,A,T,!1]),[n,w,v]}catch(p){throw l.forEach(d=>r._OrtFree(d)),c.forEach(d=>r._OrtFree(d)),i!==0&&r._OrtReleaseBinding(i),n!==0&&r._OrtReleaseSession(n),p}finally{r._free(o),s!==0&&r._OrtReleaseSessionOptions(s),u.forEach(p=>r._free(p)),r.unmountExternalData?.()}},Zp=a=>{let t=De(),o=zr.get(a);if(!o)throw new Error(`cannot release session. invalid session id: ${a}`);let[e,r,n,s,i]=o;s&&(i&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(a),r.forEach(u=>t._OrtFree(u)),n.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(e),zr.delete(a)},Yp=(a,t,o,e,r,n=!1)=>{if(!a){t.push(0);return}let s=De(),i=a[0],u=a[1],l=a[3],c,p;if(i==="string"&&l==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(n&&l!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${r} when enableGraphCapture is true.`);if(l==="gpu-buffer"){let w=a[2].gpuBuffer,v=sa(aa(i));p=u.reduce((A,C)=>A*C,1)*v;let S=s.jsepRegisterBuffer;if(!S)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=S(e,r,w,p)}else{let w=a[2];if(Array.isArray(w)){p=4*w.length,c=s._malloc(p),o.push(c);let v=c/4;for(let S=0;S<w.length;S++){if(typeof w[S]!="string")throw new TypeError(`tensor data at index ${S} is not a string`);s.HEAPU32[v++]=ve(w[S],o)}}else p=w.byteLength,c=s._malloc(p),o.push(c),s.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,p),c)}let d=s.stackSave(),T=s.stackAlloc(4*u.length);try{let w=T/4;u.forEach(S=>s.HEAP32[w++]=S);let v=s._OrtCreateTensor(aa(i),c,p,T,u.length,jp(l));v===0&&_e(`Can't create tensor for input/output. session=${e}, index=${r}.`),t.push(v)}finally{s.stackRestore(d)}},Qp=async(a,t,o,e,r,n)=>{let s=De(),i=zr.get(a);if(!i)throw new Error(`cannot run inference. invalid session id: ${a}`);let u=i[0],l=i[1],c=i[2],p=i[3],d=i[4],T=i[5],w=t.length,v=e.length,S=0,A=[],C=[],F=[],J=[],j=s.stackSave(),ie=s.stackAlloc(w*4),G=s.stackAlloc(w*4),Te=s.stackAlloc(v*4),He=s.stackAlloc(v*4);try{[S,A]=Gp(n);for(let ee=0;ee<w;ee++)Yp(o[ee],C,J,a,t[ee],d);for(let ee=0;ee<v;ee++)Yp(r[ee],F,J,a,w+e[ee],d);let Le=ie/4,Y=G/4,Ne=Te/4,Se=He/4;for(let ee=0;ee<w;ee++)s.HEAPU32[Le++]=C[ee],s.HEAPU32[Y++]=l[t[ee]];for(let ee=0;ee<v;ee++)s.HEAPU32[Ne++]=F[ee],s.HEAPU32[Se++]=c[e[ee]];s.jsepOnRunStart?.(u);let yt;yt=await s._OrtRun(u,G,ie,w,He,v,Te,S),yt!==0&&_e("failed to call OrtRun().");let et=[];for(let ee=0;ee<v;ee++){let qe=s.HEAPU32[Te/4+ee];if(qe===F[ee]){et.push(r[ee]);continue}let Ht=s.stackSave(),Ke=s.stackAlloc(4*4),at=!1,Re,Ce=0;try{s._OrtGetTensorData(qe,Ke,Ke+4,Ke+8,Ke+12)!==0&&_e(`Can't access output tensor data on index ${ee}.`);let Tt=Ke/4,qt=s.HEAPU32[Tt++];Ce=s.HEAPU32[Tt++];let xt=s.HEAPU32[Tt++],Lt=s.HEAPU32[Tt++],wt=[];for(let ke=0;ke<Lt;ke++)wt.push(s.HEAPU32[xt/4+ke]);s._OrtFree(xt);let tt=wt.reduce((ke,Be)=>ke*Be,1);Re=Wp(qt);let tr=p?.outputPreferredLocations[e[ee]];if(Re==="string"){if(tr==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let ke=[],Be=Ce/4;for(let je=0;je<tt;je++){let vt=s.HEAPU32[Be++],_t=je===tt-1?void 0:s.HEAPU32[Be]-vt;ke.push(s.UTF8ToString(vt,_t))}et.push([Re,wt,ke,"cpu"])}else if(tr==="gpu-buffer"&&tt>0){let ke=s.jsepGetBuffer;if(!ke)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Be=ke(Ce),je=sa(qt);if(je===void 0||!Po(Re))throw new Error(`Unsupported data type: ${Re}`);at=!0,et.push([Re,wt,{gpuBuffer:Be,download:s.jsepCreateDownloader(Be,tt*je,Re),dispose:()=>{s._OrtReleaseTensor(qe)}},"gpu-buffer"])}else{let ke=Hp(Re),Be=new ke(tt);new Uint8Array(Be.buffer,Be.byteOffset,Be.byteLength).set(s.HEAPU8.subarray(Ce,Ce+Be.byteLength)),et.push([Re,wt,Be,"cpu"])}}finally{s.stackRestore(Ht),Re==="string"&&Ce&&s._free(Ce),at||s._OrtReleaseTensor(qe)}}return p&&!d&&(s._OrtClearBoundOutputs(p.handle),zr.set(a,[u,l,c,p,d,!1])),et}finally{s.stackRestore(j),C.forEach(Le=>s._OrtReleaseTensor(Le)),F.forEach(Le=>s._OrtReleaseTensor(Le)),J.forEach(Le=>s._free(Le)),S!==0&&s._OrtReleaseRunOptions(S),A.forEach(Le=>s._free(Le))}},ed=a=>{let t=De(),o=zr.get(a);if(!o)throw new Error("invalid session id");let e=o[0],r=t._OrtEndProfiling(e);r===0&&_e("Can't get an profile file name."),t._OrtFree(r)},td=a=>{let t=[];for(let o of a){let e=o[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}});var nd=me((IO,yg)=>{yg.exports='/*!\n * ONNX Runtime Web v1.18.0\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Licensed under the MIT License.\n */\n"use strict";(()=>{var vt=Object.defineProperty;var qr=Object.getOwnPropertyDescriptor;var Vr=Object.getOwnPropertyNames;var Jr=Object.prototype.hasOwnProperty;var _t=(i,c)=>()=>(i&&(c=i(i=0)),c);var Ke=(i,c)=>()=>(c||i((c={exports:{}}).exports,c),c.exports),Et=(i,c)=>{for(var a in c)vt(i,a,{get:c[a],enumerable:!0})},Xr=(i,c,a,h)=>{if(c&&typeof c=="object"||typeof c=="function")for(let f of Vr(c))!Jr.call(i,f)&&f!==a&&vt(i,f,{get:()=>c[f],enumerable:!(h=qr(c,f))||h.enumerable});return i};var et=i=>Xr(vt({},"__esModule",{value:!0}),i);var St={};Et(St,{createReadStream:()=>lr,readFile:()=>Qr,readFileSync:()=>Zr});var Qr,Zr,lr,At=_t(()=>{Qr=void 0,Zr=void 0,lr=void 0});var Tt={};Et(Tt,{join:()=>Kr});var Kr,Mt=_t(()=>{Kr=void 0});var pr=Ke((dr,Ct)=>{"use strict";var cr=(()=>{var i=typeof document<"u"?document.currentScript?.src:void 0;return typeof __filename<"u"&&(i||=__filename),function(c={}){var a=c,h,f,w=new Promise((t,o)=>{h=t,f=o}),g=Object.assign({},a),s="./this.program",S=typeof window=="object",x=typeof importScripts=="function",H=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",A="",I,V,R;if(H){var B=(At(),et(St)),D=(Mt(),et(Tt));A=x?D.dirname(A)+"/":__dirname+"/",I=(t,o)=>(t=ce(t)?new URL(t):D.normalize(t),B.readFileSync(t,o?void 0:"utf8")),R=t=>(t=I(t,!0),t.buffer||(t=new Uint8Array(t)),t),V=(t,o,u,m=!0)=>{t=ce(t)?new URL(t):D.normalize(t),B.readFile(t,m?void 0:"utf8",(O,E)=>{O?u(O):o(m?E.buffer:E)})},!a.thisProgram&&1<process.argv.length&&(s=process.argv[1].replace(/\\\\/g,"/")),process.argv.slice(2)}else(S||x)&&(x?A=self.location.href:typeof document<"u"&&document.currentScript&&(A=document.currentScript.src),i&&(A=i),A.startsWith("blob:")?A="":A=A.substr(0,A.replace(/[?#].*/,"").lastIndexOf("/")+1),I=t=>{var o=new XMLHttpRequest;return o.open("GET",t,!1),o.send(null),o.responseText},x&&(R=t=>{var o=new XMLHttpRequest;return o.open("GET",t,!1),o.responseType="arraybuffer",o.send(null),new Uint8Array(o.response)}),V=(t,o,u)=>{var m=new XMLHttpRequest;m.open("GET",t,!0),m.responseType="arraybuffer",m.onload=()=>{m.status==200||m.status==0&&m.response?o(m.response):u()},m.onerror=u,m.send(null)});var T=console.log.bind(console),L=console.error.bind(console);Object.assign(a,g),g=null;var W,de=!1,pe,Z,_,J,Pe;function le(){var t=W.buffer;a.HEAP8=pe=new Int8Array(t),a.HEAP16=new Int16Array(t),a.HEAPU8=Z=new Uint8Array(t),a.HEAPU16=new Uint16Array(t),a.HEAP32=_=new Int32Array(t),a.HEAPU32=J=new Uint32Array(t),a.HEAPF32=new Float32Array(t),a.HEAPF64=Pe=new Float64Array(t)}var Ie=[],ne=[],X=[],we=0,me=null,F=null;function ie(t){throw t="Aborted("+t+")",L(t),de=!0,t=new WebAssembly.RuntimeError(t+". Build with -sASSERTIONS for more info."),f(t),t}var xe=t=>t.startsWith("data:application/octet-stream;base64,"),ce=t=>t.startsWith("file://"),be;if(be="ort-wasm.wasm",!xe(be)){var ae=be;be=a.locateFile?a.locateFile(ae,A):A+ae}function K(t){if(R)return R(t);throw"both async and sync fetching of the wasm failed"}function je(t){if(S||x){if(typeof fetch=="function"&&!ce(t))return fetch(t,{credentials:"same-origin"}).then(o=>{if(!o.ok)throw`failed to load wasm binary file at \'${t}\'`;return o.arrayBuffer()}).catch(()=>K(t));if(V)return new Promise((o,u)=>{V(t,m=>o(new Uint8Array(m)),u)})}return Promise.resolve().then(()=>K(t))}function Oe(t,o,u){return je(t).then(m=>WebAssembly.instantiate(m,o)).then(u,m=>{L(`failed to asynchronously prepare wasm: ${m}`),ie(m)})}function Ue(t,o){var u=be;return typeof WebAssembly.instantiateStreaming!="function"||xe(u)||ce(u)||H||typeof fetch!="function"?Oe(u,t,o):fetch(u,{credentials:"same-origin"}).then(m=>WebAssembly.instantiateStreaming(m,t).then(o,function(O){return L(`wasm streaming compile failed: ${O}`),L("falling back to ArrayBuffer instantiation"),Oe(u,t,o)}))}var ve,Ae={798088:(t,o,u,m)=>{if(typeof a>"u"||!a.ya)return 1;if(t=ue(t>>>0),t.startsWith("./")&&(t=t.substring(2)),t=a.ya.get(t),!t)return 2;if(o>>>=0,u>>>=0,o+u>t.byteLength)return 3;try{return Z.set(t.subarray(o,o+u),m>>>0>>>0),0}catch{return 4}}};class _e{constructor(o){this.wa=o-24}}var ge=0,Be=0,te=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,re=(t,o,u)=>{o>>>=0;var m=o+u;for(u=o;t[u]&&!(u>=m);)++u;if(16<u-o&&t.buffer&&te)return te.decode(t.subarray(o,u));for(m="";o<u;){var O=t[o++];if(O&128){var E=t[o++]&63;if((O&224)==192)m+=String.fromCharCode((O&31)<<6|E);else{var U=t[o++]&63;O=(O&240)==224?(O&15)<<12|E<<6|U:(O&7)<<18|E<<12|U<<6|t[o++]&63,65536>O?m+=String.fromCharCode(O):(O-=65536,m+=String.fromCharCode(55296|O>>10,56320|O&1023))}}else m+=String.fromCharCode(O)}return m},ue=(t,o)=>(t>>>=0)?re(Z,t,o):"",Ee=t=>{for(var o=0,u=0;u<t.length;++u){var m=t.charCodeAt(u);127>=m?o++:2047>=m?o+=2:55296<=m&&57343>=m?(o+=4,++u):o+=3}return o},Se=(t,o,u,m)=>{if(u>>>=0,!(0<m))return 0;var O=u;m=u+m-1;for(var E=0;E<t.length;++E){var U=t.charCodeAt(E);if(55296<=U&&57343>=U){var ee=t.charCodeAt(++E);U=65536+((U&1023)<<10)|ee&1023}if(127>=U){if(u>=m)break;o[u++>>>0]=U}else{if(2047>=U){if(u+1>=m)break;o[u++>>>0]=192|U>>6}else{if(65535>=U){if(u+2>=m)break;o[u++>>>0]=224|U>>12}else{if(u+3>=m)break;o[u++>>>0]=240|U>>18,o[u++>>>0]=128|U>>12&63}o[u++>>>0]=128|U>>6&63}o[u++>>>0]=128|U&63}}return o[u>>>0]=0,u-O},Le=t=>t%4===0&&(t%100!==0||t%400===0),ze=[0,31,60,91,121,152,182,213,244,274,305,335],rt=[0,31,59,90,120,151,181,212,243,273,304,334],Te=[],Ge={},ke=()=>{if(!We){var t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:s||"./this.program"},o;for(o in Ge)Ge[o]===void 0?delete t[o]:t[o]=Ge[o];var u=[];for(o in t)u.push(`${o}=${t[o]}`);We=u}return We},We,nt=[null,[],[]],De=[31,29,31,30,31,30,31,31,30,31,30,31],at=[31,28,31,30,31,30,31,31,30,31,30,31];function G(t){var o=Array(Ee(t)+1);return Se(t,o,0,o.length),o}function qe(t,o,u,m){function O(d,k,$){for(d=typeof d=="number"?d.toString():d||"";d.length<k;)d=$[0]+d;return d}function E(d,k){return O(d,k,"0")}function U(d,k){function $(Ze){return 0>Ze?-1:0<Ze?1:0}var Me;return(Me=$(d.getFullYear()-k.getFullYear()))===0&&(Me=$(d.getMonth()-k.getMonth()))===0&&(Me=$(d.getDate()-k.getDate())),Me}function ee(d){switch(d.getDay()){case 0:return new Date(d.getFullYear()-1,11,29);case 1:return d;case 2:return new Date(d.getFullYear(),0,3);case 3:return new Date(d.getFullYear(),0,2);case 4:return new Date(d.getFullYear(),0,1);case 5:return new Date(d.getFullYear()-1,11,31);case 6:return new Date(d.getFullYear()-1,11,30)}}function ye(d){var k=d.sa;for(d=new Date(new Date(d.ta+1900,0,1).getTime());0<k;){var $=d.getMonth(),Me=(Le(d.getFullYear())?De:at)[$];if(k>Me-d.getDate())k-=Me-d.getDate()+1,d.setDate(1),11>$?d.setMonth($+1):(d.setMonth(0),d.setFullYear(d.getFullYear()+1));else{d.setDate(d.getDate()+k);break}}return $=new Date(d.getFullYear()+1,0,4),k=ee(new Date(d.getFullYear(),0,4)),$=ee($),0>=U(k,d)?0>=U($,d)?d.getFullYear()+1:d.getFullYear():d.getFullYear()-1}t>>>=0,o>>>=0,u>>>=0,m>>>=0;var oe=J[m+40>>>2>>>0];m={Ba:_[m>>>2>>>0],Aa:_[m+4>>>2>>>0],ua:_[m+8>>>2>>>0],xa:_[m+12>>>2>>>0],va:_[m+16>>>2>>>0],ta:_[m+20>>>2>>>0],na:_[m+24>>>2>>>0],sa:_[m+28>>>2>>>0],Da:_[m+32>>>2>>>0],za:_[m+36>>>2>>>0],Ca:oe?ue(oe):""},u=ue(u),oe={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var se in oe)u=u.replace(new RegExp(se,"g"),oe[se]);var Qe="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),Re="January February March April May June July August September October November December".split(" ");oe={"%a":d=>Qe[d.na].substring(0,3),"%A":d=>Qe[d.na],"%b":d=>Re[d.va].substring(0,3),"%B":d=>Re[d.va],"%C":d=>E((d.ta+1900)/100|0,2),"%d":d=>E(d.xa,2),"%e":d=>O(d.xa,2," "),"%g":d=>ye(d).toString().substring(2),"%G":ye,"%H":d=>E(d.ua,2),"%I":d=>(d=d.ua,d==0?d=12:12<d&&(d-=12),E(d,2)),"%j":d=>{for(var k=0,$=0;$<=d.va-1;k+=(Le(d.ta+1900)?De:at)[$++]);return E(d.xa+k,3)},"%m":d=>E(d.va+1,2),"%M":d=>E(d.Aa,2),"%n":()=>`\n`,"%p":d=>0<=d.ua&&12>d.ua?"AM":"PM","%S":d=>E(d.Ba,2),"%t":()=>"	","%u":d=>d.na||7,"%U":d=>E(Math.floor((d.sa+7-d.na)/7),2),"%V":d=>{var k=Math.floor((d.sa+7-(d.na+6)%7)/7);if(2>=(d.na+371-d.sa-2)%7&&k++,k)k==53&&($=(d.na+371-d.sa)%7,$==4||$==3&&Le(d.ta)||(k=1));else{k=52;var $=(d.na+7-d.sa-1)%7;($==4||$==5&&Le(d.ta%400-1))&&k++}return E(k,2)},"%w":d=>d.na,"%W":d=>E(Math.floor((d.sa+7-(d.na+6)%7)/7),2),"%y":d=>(d.ta+1900).toString().substring(2),"%Y":d=>d.ta+1900,"%z":d=>{d=d.za;var k=0<=d;return d=Math.abs(d)/60,(k?"+":"-")+("0000"+(d/60*100+d%60)).slice(-4)},"%Z":d=>d.Ca,"%%":()=>"%"},u=u.replace(/%%/g,"\\0\\0");for(se in oe)u.includes(se)&&(u=u.replace(new RegExp(se,"g"),oe[se](m)));return u=u.replace(/\\0\\0/g,"%"),se=G(u),se.length>o?0:(pe.set(se,t>>>0),se.length-1)}var Ve={a:function(t,o,u){t>>>=0;var m=new _e(t);throw J[m.wa+16>>>2>>>0]=0,J[m.wa+4>>>2>>>0]=o>>>0,J[m.wa+8>>>2>>>0]=u>>>0,ge=t,Be++,ge},e:function(){return 0},H:function(){},x:function(){},z:function(){},J:function(){return 0},F:function(){},A:function(){},E:function(){},g:function(){},y:function(){},v:function(){},G:function(){},w:function(){},k:()=>1,I:function(t,o,u){return o>>>=0,Z.copyWithin(t>>>0>>>0,o>>>0,o+(u>>>0)>>>0)},n:function(t,o,u){t=o+2097152>>>0<4194305-!!t?(t>>>0)+4294967296*o:NaN,u>>>=0,t=new Date(1e3*t),_[u>>>2>>>0]=t.getUTCSeconds(),_[u+4>>>2>>>0]=t.getUTCMinutes(),_[u+8>>>2>>>0]=t.getUTCHours(),_[u+12>>>2>>>0]=t.getUTCDate(),_[u+16>>>2>>>0]=t.getUTCMonth(),_[u+20>>>2>>>0]=t.getUTCFullYear()-1900,_[u+24>>>2>>>0]=t.getUTCDay(),_[u+28>>>2>>>0]=(t.getTime()-Date.UTC(t.getUTCFullYear(),0,1,0,0,0,0))/864e5|0},o:function(t,o,u){t=o+2097152>>>0<4194305-!!t?(t>>>0)+4294967296*o:NaN,u>>>=0,t=new Date(1e3*t),_[u>>>2>>>0]=t.getSeconds(),_[u+4>>>2>>>0]=t.getMinutes(),_[u+8>>>2>>>0]=t.getHours(),_[u+12>>>2>>>0]=t.getDate(),_[u+16>>>2>>>0]=t.getMonth(),_[u+20>>>2>>>0]=t.getFullYear()-1900,_[u+24>>>2>>>0]=t.getDay(),_[u+28>>>2>>>0]=(Le(t.getFullYear())?ze:rt)[t.getMonth()]+t.getDate()-1|0,_[u+36>>>2>>>0]=-(60*t.getTimezoneOffset()),o=new Date(t.getFullYear(),6,1).getTimezoneOffset();var m=new Date(t.getFullYear(),0,1).getTimezoneOffset();_[u+32>>>2>>>0]=(o!=m&&t.getTimezoneOffset()==Math.min(m,o))|0},p:function(t){t>>>=0;var o=new Date(_[t+20>>>2>>>0]+1900,_[t+16>>>2>>>0],_[t+12>>>2>>>0],_[t+8>>>2>>>0],_[t+4>>>2>>>0],_[t>>>2>>>0],0),u=_[t+32>>>2>>>0],m=o.getTimezoneOffset(),O=new Date(o.getFullYear(),6,1).getTimezoneOffset(),E=new Date(o.getFullYear(),0,1).getTimezoneOffset(),U=Math.min(E,O);return 0>u?_[t+32>>>2>>>0]=+(O!=E&&U==m):0<u!=(U==m)&&(O=Math.max(E,O),o.setTime(o.getTime()+6e4*((0<u?U:O)-m))),_[t+24>>>2>>>0]=o.getDay(),_[t+28>>>2>>>0]=(Le(o.getFullYear())?ze:rt)[o.getMonth()]+o.getDate()-1|0,_[t>>>2>>>0]=o.getSeconds(),_[t+4>>>2>>>0]=o.getMinutes(),_[t+8>>>2>>>0]=o.getHours(),_[t+12>>>2>>>0]=o.getDate(),_[t+16>>>2>>>0]=o.getMonth(),_[t+20>>>2>>>0]=o.getYear(),t=o.getTime(),t=isNaN(t)?-1:t/1e3,Je((ve=t,1<=+Math.abs(ve)?0<ve?+Math.floor(ve/4294967296)>>>0:~~+Math.ceil((ve-+(~~ve>>>0))/4294967296)>>>0:0)),t>>>0},l:function(){return-52},m:function(){},t:function(t,o,u,m){u>>>=0,m>>>=0;var O=new Date().getFullYear(),E=new Date(O,0,1),U=new Date(O,6,1);O=E.getTimezoneOffset();var ee=U.getTimezoneOffset();J[t>>>0>>>2>>>0]=60*Math.max(O,ee),_[o>>>0>>>2>>>0]=+(O!=ee),t=ye=>ye.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1],E=t(E),U=t(U),ee<O?(Se(E,Z,u,17),Se(U,Z,m,17)):(Se(E,Z,m,17),Se(U,Z,u,17))},d:()=>{ie("")},B:function(t,o,u){t>>>=0,o>>>=0,u>>>=0,Te.length=0;for(var m;m=Z[o++>>>0];){var O=m!=105;O&=m!=112,u+=O&&u%8?4:0,Te.push(m==112?J[u>>>2>>>0]:m==105?_[u>>>2>>>0]:Pe[u>>>3>>>0]),u+=O?8:4}return Ae[t](...Te)},h:()=>Date.now(),u:function(){return 4294901760},b:()=>performance.now(),s:function(t){t>>>=0;var o=Z.length;if(4294901760<t)return!1;for(var u=1;4>=u;u*=2){var m=o*(1+.2/u);m=Math.min(m,t+100663296);var O=Math;m=Math.max(t,m);e:{O=(O.min.call(O,4294901760,m+(65536-m%65536)%65536)-W.buffer.byteLength+65535)/65536;try{W.grow(O),le();var E=1;break e}catch{}E=void 0}if(E)return!0}return!1},C:function(t,o){t>>>=0,o>>>=0;var u=0;return ke().forEach((m,O)=>{var E=o+u;for(O=J[t+4*O>>>2>>>0]=E,E=0;E<m.length;++E)pe[O++>>>0]=m.charCodeAt(E);pe[O>>>0]=0,u+=m.length+1}),0},D:function(t,o){t>>>=0,o>>>=0;var u=ke();J[t>>>2>>>0]=u.length;var m=0;return u.forEach(O=>m+=O.length+1),J[o>>>2>>>0]=m,0},f:()=>52,j:function(){return 52},q:function(){return 70},i:function(t,o,u,m){o>>>=0,u>>>=0,m>>>=0;for(var O=0,E=0;E<u;E++){var U=J[o>>>2>>>0],ee=J[o+4>>>2>>>0];o+=8;for(var ye=0;ye<ee;ye++){var oe=Z[U+ye>>>0],se=nt[t];oe===0||oe===10?((t===1?T:L)(re(se,0)),se.length=0):se.push(oe)}O+=ee}return J[m>>>2>>>0]=O,0},r:qe,c:function(t,o,u,m){return qe(t>>>0,o>>>0,u>>>0,m>>>0)}},P=function(){function t(u){return P=u.exports,P=st(),W=P.K,le(),ne.unshift(P.L),we--,we==0&&(me!==null&&(clearInterval(me),me=null),F&&(u=F,F=null,u())),P}var o={a:Ve};if(we++,a.instantiateWasm)try{return a.instantiateWasm(o,t)}catch(u){L(`Module.instantiateWasm callback failed with error: ${u}`),f(u)}return Ue(o,function(u){t(u.instance)}).catch(f),{}}();a._OrtInit=(t,o)=>(a._OrtInit=P.M)(t,o),a._OrtGetLastError=(t,o)=>(a._OrtGetLastError=P.N)(t,o),a._OrtCreateSessionOptions=(t,o,u,m,O,E,U,ee,ye,oe)=>(a._OrtCreateSessionOptions=P.O)(t,o,u,m,O,E,U,ee,ye,oe),a._OrtAppendExecutionProvider=(t,o)=>(a._OrtAppendExecutionProvider=P.P)(t,o),a._OrtAddFreeDimensionOverride=(t,o,u)=>(a._OrtAddFreeDimensionOverride=P.Q)(t,o,u),a._OrtAddSessionConfigEntry=(t,o,u)=>(a._OrtAddSessionConfigEntry=P.R)(t,o,u),a._OrtReleaseSessionOptions=t=>(a._OrtReleaseSessionOptions=P.S)(t),a._OrtCreateSession=(t,o,u)=>(a._OrtCreateSession=P.T)(t,o,u),a._OrtReleaseSession=t=>(a._OrtReleaseSession=P.U)(t),a._OrtGetInputOutputCount=(t,o,u)=>(a._OrtGetInputOutputCount=P.V)(t,o,u),a._OrtGetInputName=(t,o)=>(a._OrtGetInputName=P.W)(t,o),a._OrtGetOutputName=(t,o)=>(a._OrtGetOutputName=P.X)(t,o),a._OrtFree=t=>(a._OrtFree=P.Y)(t),a._OrtCreateTensor=(t,o,u,m,O,E)=>(a._OrtCreateTensor=P.Z)(t,o,u,m,O,E),a._OrtGetTensorData=(t,o,u,m,O)=>(a._OrtGetTensorData=P._)(t,o,u,m,O),a._OrtReleaseTensor=t=>(a._OrtReleaseTensor=P.$)(t),a._OrtCreateRunOptions=(t,o,u,m)=>(a._OrtCreateRunOptions=P.aa)(t,o,u,m),a._OrtAddRunConfigEntry=(t,o,u)=>(a._OrtAddRunConfigEntry=P.ba)(t,o,u),a._OrtReleaseRunOptions=t=>(a._OrtReleaseRunOptions=P.ca)(t),a._OrtCreateBinding=t=>(a._OrtCreateBinding=P.da)(t),a._OrtBindInput=(t,o,u)=>(a._OrtBindInput=P.ea)(t,o,u),a._OrtBindOutput=(t,o,u,m)=>(a._OrtBindOutput=P.fa)(t,o,u,m),a._OrtClearBoundOutputs=t=>(a._OrtClearBoundOutputs=P.ga)(t),a._OrtReleaseBinding=t=>(a._OrtReleaseBinding=P.ha)(t),a._OrtRunWithBinding=(t,o,u,m,O)=>(a._OrtRunWithBinding=P.ia)(t,o,u,m,O),a._OrtRun=(t,o,u,m,O,E,U,ee)=>(a._OrtRun=P.ja)(t,o,u,m,O,E,U,ee),a._OrtEndProfiling=t=>(a._OrtEndProfiling=P.ka)(t),a._malloc=t=>(a._malloc=P.la)(t),a._free=t=>(a._free=P.ma)(t);var Je=t=>(Je=P.oa)(t),ot=t=>(ot=P.pa)(t),M=t=>(M=P.qa)(t),Ne=()=>(Ne=P.ra)();function st(){var t=P;t=Object.assign({},t);var o=u=>m=>u(m)>>>0;return t.la=o(t.la),t.qa=o(t.qa),t.ra=(u=>()=>u()>>>0)(t.ra),t}a.stackSave=()=>Ne(),a.stackRestore=t=>ot(t),a.stackAlloc=t=>M(t),a.UTF8ToString=ue,a.stringToUTF8=(t,o,u)=>Se(t,Z,o,u),a.lengthBytesUTF8=Ee;var Fe;F=function t(){Fe||Xe(),Fe||(F=t)};function Xe(){if(!(0<we)){if(a.preRun)for(typeof a.preRun=="function"&&(a.preRun=[a.preRun]);a.preRun.length;){var t=a.preRun.shift();Ie.unshift(t)}for(;0<Ie.length;)Ie.shift()(a);if(!(0<we||Fe||(Fe=!0,a.calledRun=!0,de))){for(;0<ne.length;)ne.shift()(a);for(h(a);0<X.length;)X.shift()(a)}}}return Xe(),w}})();typeof dr=="object"&&typeof Ct=="object"?Ct.exports=cr:typeof define=="function"&&define.amd&&define([],()=>cr)});var mr=Ke(()=>{});var gr=Ke(()=>{});var hr={};Et(hr,{cpus:()=>en});var en,br=_t(()=>{en=void 0});var Or=Ke((wr,Dt)=>{"use strict";var yr=(()=>{var i=typeof document<"u"?document.currentScript?.src:void 0;return typeof __filename<"u"&&(i||=__filename),function(c={}){function a(){return X.buffer!=ie.buffer&&K(),ie}function h(){return X.buffer!=ie.buffer&&K(),xe}function f(){return X.buffer!=ie.buffer&&K(),ce}function w(){return X.buffer!=ie.buffer&&K(),be}function g(){return X.buffer!=ie.buffer&&K(),ae}var s=c,S,x,H=new Promise((e,r)=>{S=e,x=r}),A=Object.assign({},s),I="./this.program",V=(e,r)=>{throw r},R=typeof window=="object",B=typeof importScripts=="function",D=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",T=s.ENVIRONMENT_IS_PTHREAD||!1,L="";function W(e){return s.locateFile?s.locateFile(e,L):L+e}var de,pe,Z;if(D){var _=(At(),et(St)),J=(Mt(),et(Tt));L=B?J.dirname(L)+"/":__dirname+"/",de=(e,r)=>(e=ue(e)?new URL(e):J.normalize(e),_.readFileSync(e,r?void 0:"utf8")),Z=e=>(e=de(e,!0),e.buffer||(e=new Uint8Array(e)),e),pe=(e,r,n,l=!0)=>{e=ue(e)?new URL(e):J.normalize(e),_.readFile(e,l?void 0:"utf8",(y,b)=>{y?n(y):r(l?b.buffer:b)})},!s.thisProgram&&1<process.argv.length&&(I=process.argv[1].replace(/\\\\/g,"/")),process.argv.slice(2),V=(e,r)=>{throw process.exitCode=e,r},global.Worker=mr().Worker}else(R||B)&&(B?L=self.location.href:typeof document<"u"&&document.currentScript&&(L=document.currentScript.src),typeof i<"u"&&i&&(L=i),L.startsWith("blob:")?L="":L=L.substr(0,L.replace(/[?#].*/,"").lastIndexOf("/")+1),D||(de=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.send(null),r.responseText},B&&(Z=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),pe=(e,r,n)=>{var l=new XMLHttpRequest;l.open("GET",e,!0),l.responseType="arraybuffer",l.onload=()=>{l.status==200||l.status==0&&l.response?r(l.response):n()},l.onerror=n,l.send(null)}));D&&typeof performance>"u"&&(global.performance=gr().performance);var Pe=console.log.bind(console),le=console.error.bind(console);D&&(Pe=(...e)=>_.writeSync(1,e.join(" ")+`\n`),le=(...e)=>_.writeSync(2,e.join(" ")+`\n`));var Ie=Pe,ne=le;Object.assign(s,A),A=null;var X,we,me=!1,F,ie,xe,ce,be,ae;function K(){var e=X.buffer;s.HEAP8=ie=new Int8Array(e),s.HEAP16=new Int16Array(e),s.HEAPU8=xe=new Uint8Array(e),s.HEAPU16=new Uint16Array(e),s.HEAP32=ce=new Int32Array(e),s.HEAPU32=be=new Uint32Array(e),s.HEAPF32=new Float32Array(e),s.HEAPF64=ae=new Float64Array(e)}var je=16777216;if(T)X=s.wasmMemory;else if(s.wasmMemory)X=s.wasmMemory;else if(X=new WebAssembly.Memory({initial:je/65536,maximum:65536,shared:!0}),!(X.buffer instanceof SharedArrayBuffer))throw ne("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),D&&ne("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");K(),je=X.buffer.byteLength;var Oe=[],Ue=[],ve=[],Ae=0,_e=null,ge=null;function Be(){if(Ae--,Ae==0&&(_e!==null&&(clearInterval(_e),_e=null),ge)){var e=ge;ge=null,e()}}function te(e){throw e="Aborted("+e+")",ne(e),me=!0,F=1,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),x(e),e}var re=e=>e.startsWith("data:application/octet-stream;base64,"),ue=e=>e.startsWith("file://"),Ee;Ee="ort-wasm-threaded.wasm",re(Ee)||(Ee=W(Ee));function Se(e){if(Z)return Z(e);throw"both async and sync fetching of the wasm failed"}function Le(e){if(R||B){if(typeof fetch=="function"&&!ue(e))return fetch(e,{credentials:"same-origin"}).then(r=>{if(!r.ok)throw`failed to load wasm binary file at \'${e}\'`;return r.arrayBuffer()}).catch(()=>Se(e));if(pe)return new Promise((r,n)=>{pe(e,l=>r(new Uint8Array(l)),n)})}return Promise.resolve().then(()=>Se(e))}function ze(e,r,n){return Le(e).then(l=>WebAssembly.instantiate(l,r)).then(n,l=>{ne(`failed to asynchronously prepare wasm: ${l}`),te(l)})}function rt(e,r){var n=Ee;return typeof WebAssembly.instantiateStreaming!="function"||re(n)||ue(n)||D||typeof fetch!="function"?ze(n,e,r):fetch(n,{credentials:"same-origin"}).then(l=>WebAssembly.instantiateStreaming(l,e).then(r,function(y){return ne(`wasm streaming compile failed: ${y}`),ne("falling back to ArrayBuffer instantiation"),ze(n,e,r)}))}var Te,Ge={799444:(e,r,n,l)=>{if(typeof s>"u"||!s.bb)return 1;if(e=ee(e>>>0),e.startsWith("./")&&(e=e.substring(2)),e=s.bb.get(e),!e)return 2;if(r>>>=0,n>>>=0,l>>>=0,r+n>e.byteLength)return 3;try{return h().set(e.subarray(r,r+n),l>>>0),0}catch{return 4}}};function ke(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}var We=e=>{e.terminate(),e.onmessage=()=>{}},nt=e=>{M.Oa.length==0&&(Je(),M.Xa(M.Oa[0]));var r=M.Oa.pop();if(!r)return 6;M.Pa.push(r),M.La[e.Na]=r,r.Na=e.Na;var n={cmd:"run",start_routine:e.gb,arg:e.cb,pthread_ptr:e.Na};return D&&r.unref(),r.postMessage(n,e.mb),0},De=0,at=e=>{var r=Ot();return e=e(),ft(r),e},G=(e,r,...n)=>at(()=>{for(var l=n.length,y=wt(8*l),b=y>>>3,v=0;v<n.length;v++){var z=n[v];g()[b+v>>>0]=z}return rr(e,0,l,y,r)});function qe(e){if(T)return G(0,1,e);F=e,0<De||(M.hb(),s.onExit?.(e),me=!0),V(e,new ke(e))}var Ve=e=>{if(F=e,T)throw st(e),"unwind";qe(e)};function P(){for(var e=s.numThreads;e--;)Je();Oe.unshift(()=>{Ae++,ot(()=>Be())})}function Je(){var e=W("ort-wasm-threaded.worker.js");e=new Worker(e),M.Oa.push(e)}function ot(e){T?e():Promise.all(M.Oa.map(M.Xa)).then(e)}var M={Oa:[],Pa:[],ab:[],La:{},Va(){T?(M.receiveObjectTransfer=M.fb,M.threadInitTLS=M.$a,M.setExitStatus=M.Za):P()},Za:e=>F=e,pb:["$terminateWorker"],hb:()=>{for(var e of M.Pa)We(e);for(e of M.Oa)We(e);M.Oa=[],M.Pa=[],M.La=[]},Ya:e=>{var r=e.Na;delete M.La[r],M.Oa.push(e),M.Pa.splice(M.Pa.indexOf(e),1),e.Na=0,bt(r)},fb(){},$a(){M.ab.forEach(e=>e())},Xa:e=>new Promise(r=>{e.onmessage=b=>{b=b.data;var v=b.cmd;if(b.targetThread&&b.targetThread!=ut()){var z=M.La[b.targetThread];z?z.postMessage(b,b.transferList):ne(`Internal error! Worker sent a message "${v}" to target pthread ${b.targetThread}, but that thread no longer exists!`)}else v==="checkMailbox"?it():v==="spawnThread"?nt(b):v==="cleanupThread"?M.Ya(M.La[b.thread]):v==="killThread"?(b=b.thread,v=M.La[b],delete M.La[b],We(v),bt(b),M.Pa.splice(M.Pa.indexOf(v),1),v.Na=0):v==="cancelThread"?M.La[b.thread].postMessage({cmd:"cancel"}):v==="loaded"?(e.loaded=!0,D&&!e.Na&&e.unref(),r(e)):v==="alert"?alert(`Thread ${b.threadId}: ${b.text}`):b.target==="setimmediate"?e.postMessage(b):v==="callHandler"?s[b.handler](...b.args):v&&ne(`worker sent an unknown command ${v}`)},e.onerror=b=>{throw ne(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b},D&&(e.on("message",b=>e.onmessage({data:b})),e.on("error",b=>e.onerror(b)));var n=[],l=["onExit"],y;for(y of l)s.hasOwnProperty(y)&&n.push(y);e.postMessage({cmd:"load",handlers:n,urlOrBlob:s.mainScriptUrlOrBlob||i,wasmMemory:X,wasmModule:we})})};s.PThread=M;var Ne=e=>{for(;0<e.length;)e.shift()(s)};s.establishStackSpace=()=>{var e=ut(),r=w()[e+52>>>2>>>0];e=w()[e+56>>>2>>>0],or(r,r-e),ft(r)};function st(e){if(T)return G(1,0,e);Ve(e)}var Fe=[],Xe;s.invokeEntryPoint=(e,r)=>{De=0;var n=Fe[e];n||(e>=Fe.length&&(Fe.length=e+1),Fe[e]=n=Xe.get(e)),e=n(r),0<De?M.Za(e):yt(e)};class t{constructor(r){this.Ua=r-24}Va(r,n){w()[this.Ua+16>>>2>>>0]=0,w()[this.Ua+4>>>2>>>0]=r,w()[this.Ua+8>>>2>>>0]=n}}var o=0,u=0;function m(e,r,n,l){return T?G(2,1,e,r,n,l):O(e,r,n,l)}function O(e,r,n,l){if(e>>>=0,r>>>=0,n>>>=0,l>>>=0,typeof SharedArrayBuffer>"u")return ne("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var y=[];return T&&y.length===0?m(e,r,n,l):(e={gb:n,Na:e,cb:l,mb:y},T?(e.ob="spawnThread",postMessage(e,y),0):nt(e))}var E=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,U=(e,r,n)=>{r>>>=0;var l=r+n;for(n=r;e[n]&&!(n>=l);)++n;if(16<n-r&&e.buffer&&E)return E.decode(e.buffer instanceof SharedArrayBuffer?e.slice(r,n):e.subarray(r,n));for(l="";r<n;){var y=e[r++];if(y&128){var b=e[r++]&63;if((y&224)==192)l+=String.fromCharCode((y&31)<<6|b);else{var v=e[r++]&63;y=(y&240)==224?(y&15)<<12|b<<6|v:(y&7)<<18|b<<12|v<<6|e[r++]&63,65536>y?l+=String.fromCharCode(y):(y-=65536,l+=String.fromCharCode(55296|y>>10,56320|y&1023))}}else l+=String.fromCharCode(y)}return l},ee=(e,r)=>(e>>>=0)?U(h(),e,r):"";function ye(e,r,n){return T?G(3,1,e,r,n):0}function oe(e,r){if(T)return G(4,1,e,r)}var se=e=>{for(var r=0,n=0;n<e.length;++n){var l=e.charCodeAt(n);127>=l?r++:2047>=l?r+=2:55296<=l&&57343>=l?(r+=4,++n):r+=3}return r},Qe=(e,r,n,l)=>{if(n>>>=0,!(0<l))return 0;var y=n;l=n+l-1;for(var b=0;b<e.length;++b){var v=e.charCodeAt(b);if(55296<=v&&57343>=v){var z=e.charCodeAt(++b);v=65536+((v&1023)<<10)|z&1023}if(127>=v){if(n>=l)break;r[n++>>>0]=v}else{if(2047>=v){if(n+1>=l)break;r[n++>>>0]=192|v>>6}else{if(65535>=v){if(n+2>=l)break;r[n++>>>0]=224|v>>12}else{if(n+3>=l)break;r[n++>>>0]=240|v>>18,r[n++>>>0]=128|v>>12&63}r[n++>>>0]=128|v>>6&63}r[n++>>>0]=128|v&63}}return r[n>>>0]=0,n-y},Re=(e,r,n)=>Qe(e,h(),r,n);function d(e,r){if(T)return G(5,1,e,r)}function k(e,r,n){if(T)return G(6,1,e,r,n)}function $(e,r,n){return T?G(7,1,e,r,n):0}function Me(e,r){if(T)return G(8,1,e,r)}function Ze(e,r,n){if(T)return G(9,1,e,r,n)}function Rt(e,r,n,l){if(T)return G(10,1,e,r,n,l)}function It(e,r,n,l){if(T)return G(11,1,e,r,n,l)}function Bt(e,r,n,l){if(T)return G(12,1,e,r,n,l)}function kt(e){if(T)return G(13,1,e)}function Wt(e,r){if(T)return G(14,1,e,r)}function Nt(e,r,n){if(T)return G(15,1,e,r,n)}function dt(e){e>>>=0,typeof Atomics.nb=="function"&&(Atomics.nb(f(),e>>>2,e).value.then(it),e+=128,Atomics.store(f(),e>>>2,1))}s.__emscripten_thread_mailbox_await=dt;var it=()=>{var e=ut();if(e&&(dt(e),e=nr,!me))try{if(e(),!(0<De))try{T?yt(F):Ve(F)}catch(r){r instanceof ke||r=="unwind"||V(1,r)}}catch(r){r instanceof ke||r=="unwind"||V(1,r)}};s.checkMailbox=it;var pt=[],$e=e=>e%4===0&&(e%100!==0||e%400===0),Ht=[0,31,60,91,121,152,182,213,244,274,305,335],Gt=[0,31,59,90,120,151,181,212,243,273,304,334];function $t(e,r,n,l,y,b,v,z){return T?G(16,1,e,r,n,l,y,b,v,z):-52}function Yt(e,r,n,l,y,b,v){if(T)return G(17,1,e,r,n,l,y,b,v)}var mt=[],gt={},jt=()=>{if(!ht){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:I||"./this.program"},r;for(r in gt)gt[r]===void 0?delete e[r]:e[r]=gt[r];var n=[];for(r in e)n.push(`${r}=${e[r]}`);ht=n}return ht},ht;function zt(e,r){if(T)return G(18,1,e,r);e>>>=0,r>>>=0;var n=0;return jt().forEach((l,y)=>{var b=r+n;for(y=w()[e+4*y>>>2>>>0]=b,b=0;b<l.length;++b)a()[y++>>>0]=l.charCodeAt(b);a()[y>>>0]=0,n+=l.length+1}),0}function qt(e,r){if(T)return G(19,1,e,r);e>>>=0,r>>>=0;var n=jt();w()[e>>>2>>>0]=n.length;var l=0;return n.forEach(y=>l+=y.length+1),w()[r>>>2>>>0]=l,0}function Vt(e){return T?G(20,1,e):52}function Jt(e,r,n,l){return T?G(21,1,e,r,n,l):52}function Xt(e,r,n,l,y){return T?G(22,1,e,r,n,l,y):70}var Hr=[null,[],[]];function Qt(e,r,n,l){if(T)return G(23,1,e,r,n,l);r>>>=0,n>>>=0,l>>>=0;for(var y=0,b=0;b<n;b++){var v=w()[r>>>2>>>0],z=w()[r+4>>>2>>>0];r+=8;for(var Ce=0;Ce<z;Ce++){var fe=h()[v+Ce>>>0],he=Hr[e];fe===0||fe===10?((e===1?Ie:ne)(U(he,0)),he.length=0):he.push(fe)}y+=z}return w()[l>>>2>>>0]=y,0}var Zt=[31,29,31,30,31,30,31,31,30,31,30,31],Kt=[31,28,31,30,31,30,31,31,30,31,30,31];function Gr(e){var r=Array(se(e)+1);return Qe(e,r,0,r.length),r}var $r=(e,r)=>{a().set(e,r>>>0)};function er(e,r,n,l){function y(p,N,q){for(p=typeof p=="number"?p.toString():p||"";p.length<N;)p=q[0]+p;return p}function b(p,N){return y(p,N,"0")}function v(p,N){function q(fr){return 0>fr?-1:0<fr?1:0}var He;return(He=q(p.getFullYear()-N.getFullYear()))===0&&(He=q(p.getMonth()-N.getMonth()))===0&&(He=q(p.getDate()-N.getDate())),He}function z(p){switch(p.getDay()){case 0:return new Date(p.getFullYear()-1,11,29);case 1:return p;case 2:return new Date(p.getFullYear(),0,3);case 3:return new Date(p.getFullYear(),0,2);case 4:return new Date(p.getFullYear(),0,1);case 5:return new Date(p.getFullYear()-1,11,31);case 6:return new Date(p.getFullYear()-1,11,30)}}function Ce(p){var N=p.Qa;for(p=new Date(new Date(p.Ra+1900,0,1).getTime());0<N;){var q=p.getMonth(),He=($e(p.getFullYear())?Zt:Kt)[q];if(N>He-p.getDate())N-=He-p.getDate()+1,p.setDate(1),11>q?p.setMonth(q+1):(p.setMonth(0),p.setFullYear(p.getFullYear()+1));else{p.setDate(p.getDate()+N);break}}return q=new Date(p.getFullYear()+1,0,4),N=z(new Date(p.getFullYear(),0,4)),q=z(q),0>=v(N,p)?0>=v(q,p)?p.getFullYear()+1:p.getFullYear():p.getFullYear()-1}e>>>=0,r>>>=0,n>>>=0,l>>>=0;var fe=w()[l+40>>>2>>>0];l={kb:f()[l>>>2>>>0],jb:f()[l+4>>>2>>>0],Sa:f()[l+8>>>2>>>0],Wa:f()[l+12>>>2>>>0],Ta:f()[l+16>>>2>>>0],Ra:f()[l+20>>>2>>>0],Ma:f()[l+24>>>2>>>0],Qa:f()[l+28>>>2>>>0],qb:f()[l+32>>>2>>>0],ib:f()[l+36>>>2>>>0],lb:fe?ee(fe):""},n=ee(n),fe={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var he in fe)n=n.replace(new RegExp(he,"g"),fe[he]);var ir="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ur="January February March April May June July August September October November December".split(" ");fe={"%a":p=>ir[p.Ma].substring(0,3),"%A":p=>ir[p.Ma],"%b":p=>ur[p.Ta].substring(0,3),"%B":p=>ur[p.Ta],"%C":p=>b((p.Ra+1900)/100|0,2),"%d":p=>b(p.Wa,2),"%e":p=>y(p.Wa,2," "),"%g":p=>Ce(p).toString().substring(2),"%G":Ce,"%H":p=>b(p.Sa,2),"%I":p=>(p=p.Sa,p==0?p=12:12<p&&(p-=12),b(p,2)),"%j":p=>{for(var N=0,q=0;q<=p.Ta-1;N+=($e(p.Ra+1900)?Zt:Kt)[q++]);return b(p.Wa+N,3)},"%m":p=>b(p.Ta+1,2),"%M":p=>b(p.jb,2),"%n":()=>`\n`,"%p":p=>0<=p.Sa&&12>p.Sa?"AM":"PM","%S":p=>b(p.kb,2),"%t":()=>"	","%u":p=>p.Ma||7,"%U":p=>b(Math.floor((p.Qa+7-p.Ma)/7),2),"%V":p=>{var N=Math.floor((p.Qa+7-(p.Ma+6)%7)/7);if(2>=(p.Ma+371-p.Qa-2)%7&&N++,N)N==53&&(q=(p.Ma+371-p.Qa)%7,q==4||q==3&&$e(p.Ra)||(N=1));else{N=52;var q=(p.Ma+7-p.Qa-1)%7;(q==4||q==5&&$e(p.Ra%400-1))&&N++}return b(N,2)},"%w":p=>p.Ma,"%W":p=>b(Math.floor((p.Qa+7-(p.Ma+6)%7)/7),2),"%y":p=>(p.Ra+1900).toString().substring(2),"%Y":p=>p.Ra+1900,"%z":p=>{p=p.ib;var N=0<=p;return p=Math.abs(p)/60,(N?"+":"-")+("0000"+(p/60*100+p%60)).slice(-4)},"%Z":p=>p.lb,"%%":()=>"%"},n=n.replace(/%%/g,"\\0\\0");for(he in fe)n.includes(he)&&(n=n.replace(new RegExp(he,"g"),fe[he](l)));return n=n.replace(/\\0\\0/g,"%"),he=Gr(n),he.length>r?0:($r(he,e),he.length-1)}M.Va();var Yr=[qe,st,m,ye,oe,d,k,$,Me,Ze,Rt,It,Bt,kt,Wt,Nt,$t,Yt,zt,qt,Vt,Jt,Xt,Qt],jr={b:function(e,r,n){throw e>>>=0,new t(e).Va(r>>>0,n>>>0),o=e,u++,o},L:function(e){tr(e>>>0,!B,1,!R,131072,!1),M.$a()},j:function(e){e>>>=0,T?postMessage({cmd:"cleanupThread",thread:e}):M.Ya(M.La[e])},H:O,h:ye,S:oe,D:d,F:k,T:$,Q:Me,J:Ze,P:Rt,n:It,E:Bt,B:kt,R:Wt,C:Nt,p:()=>1,z:function(e,r){e>>>=0,e==r>>>0?setTimeout(it):T?postMessage({targetThread:e,cmd:"checkMailbox"}):(e=M.La[e])&&e.postMessage({cmd:"checkMailbox"})},I:function(e,r,n,l,y){r>>>=0,n>>>=0,pt.length=l,y=y>>>0>>>3;for(var b=0;b<l;b++)pt[b]=g()[y+b>>>0];return e=r?Ge[r]:Yr[e],M.eb=n,n=e(...pt),M.eb=0,n},K:dt,o:function(e){D&&M.La[e>>>0].ref()},s:function(e,r,n){e=r+2097152>>>0<4194305-!!e?(e>>>0)+4294967296*r:NaN,n>>>=0,e=new Date(1e3*e),f()[n>>>2>>>0]=e.getUTCSeconds(),f()[n+4>>>2>>>0]=e.getUTCMinutes(),f()[n+8>>>2>>>0]=e.getUTCHours(),f()[n+12>>>2>>>0]=e.getUTCDate(),f()[n+16>>>2>>>0]=e.getUTCMonth(),f()[n+20>>>2>>>0]=e.getUTCFullYear()-1900,f()[n+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,f()[n+28>>>2>>>0]=e},t:function(e,r,n){e=r+2097152>>>0<4194305-!!e?(e>>>0)+4294967296*r:NaN,n>>>=0,e=new Date(1e3*e),f()[n>>>2>>>0]=e.getSeconds(),f()[n+4>>>2>>>0]=e.getMinutes(),f()[n+8>>>2>>>0]=e.getHours(),f()[n+12>>>2>>>0]=e.getDate(),f()[n+16>>>2>>>0]=e.getMonth(),f()[n+20>>>2>>>0]=e.getFullYear()-1900,f()[n+24>>>2>>>0]=e.getDay(),r=($e(e.getFullYear())?Ht:Gt)[e.getMonth()]+e.getDate()-1|0,f()[n+28>>>2>>>0]=r,f()[n+36>>>2>>>0]=-(60*e.getTimezoneOffset()),r=new Date(e.getFullYear(),6,1).getTimezoneOffset();var l=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=(r!=l&&e.getTimezoneOffset()==Math.min(l,r))|0,f()[n+32>>>2>>>0]=e},u:function(e){e>>>=0;var r=new Date(f()[e+20>>>2>>>0]+1900,f()[e+16>>>2>>>0],f()[e+12>>>2>>>0],f()[e+8>>>2>>>0],f()[e+4>>>2>>>0],f()[e>>>2>>>0],0),n=f()[e+32>>>2>>>0],l=r.getTimezoneOffset(),y=new Date(r.getFullYear(),6,1).getTimezoneOffset(),b=new Date(r.getFullYear(),0,1).getTimezoneOffset(),v=Math.min(b,y);return 0>n?f()[e+32>>>2>>>0]=+(y!=b&&v==l):0<n!=(v==l)&&(y=Math.max(b,y),r.setTime(r.getTime()+6e4*((0<n?v:y)-l))),f()[e+24>>>2>>>0]=r.getDay(),n=($e(r.getFullYear())?Ht:Gt)[r.getMonth()]+r.getDate()-1|0,f()[e+28>>>2>>>0]=n,f()[e>>>2>>>0]=r.getSeconds(),f()[e+4>>>2>>>0]=r.getMinutes(),f()[e+8>>>2>>>0]=r.getHours(),f()[e+12>>>2>>>0]=r.getDate(),f()[e+16>>>2>>>0]=r.getMonth(),f()[e+20>>>2>>>0]=r.getYear(),e=r.getTime(),e=isNaN(e)?-1:e/1e3,ar((Te=e,1<=+Math.abs(Te)?0<Te?+Math.floor(Te/4294967296)>>>0:~~+Math.ceil((Te-+(~~Te>>>0))/4294967296)>>>0:0)),e>>>0},q:$t,r:Yt,y:function(e,r,n,l){e>>>=0,r>>>=0,n>>>=0,l>>>=0;var y=new Date().getFullYear(),b=new Date(y,0,1),v=new Date(y,6,1);y=b.getTimezoneOffset();var z=v.getTimezoneOffset(),Ce=Math.max(y,z);w()[e>>>2>>>0]=60*Ce,f()[r>>>2>>>0]=+(y!=z),e=fe=>fe.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1],b=e(b),v=e(v),z<y?(Re(b,n,17),Re(v,l,17)):(Re(b,l,17),Re(v,n,17))},c:()=>{te("")},O:function(e,r,n){e>>>=0,r>>>=0,n>>>=0,mt.length=0;for(var l;l=h()[r++>>>0];){var y=l!=105;y&=l!=112,n+=y&&n%8?4:0,mt.push(l==112?w()[n>>>2>>>0]:l==105?f()[n>>>2>>>0]:g()[n>>>3>>>0]),n+=y?8:4}return Ge[e](...mt)},k:()=>{},i:()=>Date.now(),U:()=>{throw De+=1,"unwind"},A:function(){return 4294901760},e:()=>performance.timeOrigin+performance.now(),f:()=>D?(br(),et(hr)).cpus().length:navigator.hardwareConcurrency,x:function(e){e>>>=0;var r=h().length;if(e<=r||4294901760<e)return!1;for(var n=1;4>=n;n*=2){var l=r*(1+.2/n);l=Math.min(l,e+100663296);var y=Math;l=Math.max(e,l);e:{y=(y.min.call(y,4294901760,l+(65536-l%65536)%65536)-X.buffer.byteLength+65535)/65536;try{X.grow(y),K();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1},M:zt,N:qt,G:Ve,g:Vt,m:Jt,v:Xt,l:Qt,a:X||s.wasmMemory,w:er,d:function(e,r,n,l){return er(e>>>0,r>>>0,n>>>0,l>>>0)}},C=function(){function e(n,l){return C=n.exports,C=zr(),M.ab.push(C.ya),Xe=C.za,Ue.unshift(C.V),we=l,Be(),C}var r={a:jr};if(Ae++,s.instantiateWasm)try{return s.instantiateWasm(r,e)}catch(n){ne(`Module.instantiateWasm callback failed with error: ${n}`),x(n)}return rt(r,function(n){e(n.instance,n.module)}).catch(x),{}}();s._OrtInit=(e,r)=>(s._OrtInit=C.W)(e,r),s._OrtGetLastError=(e,r)=>(s._OrtGetLastError=C.X)(e,r),s._OrtCreateSessionOptions=(e,r,n,l,y,b,v,z,Ce,fe)=>(s._OrtCreateSessionOptions=C.Y)(e,r,n,l,y,b,v,z,Ce,fe),s._OrtAppendExecutionProvider=(e,r)=>(s._OrtAppendExecutionProvider=C.Z)(e,r),s._OrtAddFreeDimensionOverride=(e,r,n)=>(s._OrtAddFreeDimensionOverride=C._)(e,r,n),s._OrtAddSessionConfigEntry=(e,r,n)=>(s._OrtAddSessionConfigEntry=C.$)(e,r,n),s._OrtReleaseSessionOptions=e=>(s._OrtReleaseSessionOptions=C.aa)(e),s._OrtCreateSession=(e,r,n)=>(s._OrtCreateSession=C.ba)(e,r,n),s._OrtReleaseSession=e=>(s._OrtReleaseSession=C.ca)(e),s._OrtGetInputOutputCount=(e,r,n)=>(s._OrtGetInputOutputCount=C.da)(e,r,n),s._OrtGetInputName=(e,r)=>(s._OrtGetInputName=C.ea)(e,r),s._OrtGetOutputName=(e,r)=>(s._OrtGetOutputName=C.fa)(e,r),s._OrtFree=e=>(s._OrtFree=C.ga)(e),s._OrtCreateTensor=(e,r,n,l,y,b)=>(s._OrtCreateTensor=C.ha)(e,r,n,l,y,b),s._OrtGetTensorData=(e,r,n,l,y)=>(s._OrtGetTensorData=C.ia)(e,r,n,l,y),s._OrtReleaseTensor=e=>(s._OrtReleaseTensor=C.ja)(e),s._OrtCreateRunOptions=(e,r,n,l)=>(s._OrtCreateRunOptions=C.ka)(e,r,n,l),s._OrtAddRunConfigEntry=(e,r,n)=>(s._OrtAddRunConfigEntry=C.la)(e,r,n),s._OrtReleaseRunOptions=e=>(s._OrtReleaseRunOptions=C.ma)(e),s._OrtCreateBinding=e=>(s._OrtCreateBinding=C.na)(e),s._OrtBindInput=(e,r,n)=>(s._OrtBindInput=C.oa)(e,r,n),s._OrtBindOutput=(e,r,n,l)=>(s._OrtBindOutput=C.pa)(e,r,n,l),s._OrtClearBoundOutputs=e=>(s._OrtClearBoundOutputs=C.qa)(e),s._OrtReleaseBinding=e=>(s._OrtReleaseBinding=C.ra)(e),s._OrtRunWithBinding=(e,r,n,l,y)=>(s._OrtRunWithBinding=C.sa)(e,r,n,l,y),s._OrtRun=(e,r,n,l,y,b,v,z)=>(s._OrtRun=C.ta)(e,r,n,l,y,b,v,z),s._OrtEndProfiling=e=>(s._OrtEndProfiling=C.ua)(e);var ut=s._pthread_self=()=>(ut=s._pthread_self=C.va)();s._malloc=e=>(s._malloc=C.wa)(e),s._free=e=>(s._free=C.xa)(e),s.__emscripten_tls_init=()=>(s.__emscripten_tls_init=C.ya)();var tr=s.__emscripten_thread_init=(e,r,n,l,y,b)=>(tr=s.__emscripten_thread_init=C.Aa)(e,r,n,l,y,b);s.__emscripten_thread_crashed=()=>(s.__emscripten_thread_crashed=C.Ba)();var rr=(e,r,n,l,y)=>(rr=C.Ca)(e,r,n,l,y),bt=e=>(bt=C.Da)(e),yt=s.__emscripten_thread_exit=e=>(yt=s.__emscripten_thread_exit=C.Ea)(e),nr=()=>(nr=C.Fa)(),ar=e=>(ar=C.Ga)(e),or=(e,r)=>(or=C.Ha)(e,r),ft=e=>(ft=C.Ia)(e),wt=e=>(wt=C.Ja)(e),Ot=()=>(Ot=C.Ka)();function zr(){var e=C;e=Object.assign({},e);var r=l=>()=>l()>>>0,n=l=>y=>l(y)>>>0;return e.va=r(e.va),e.wa=n(e.wa),e.emscripten_main_runtime_thread_id=r(e.emscripten_main_runtime_thread_id),e.Ja=n(e.Ja),e.Ka=r(e.Ka),e}s.wasmMemory=X,s.stackSave=()=>Ot(),s.stackRestore=e=>ft(e),s.stackAlloc=e=>wt(e),s.keepRuntimeAlive=()=>0<De,s.UTF8ToString=ee,s.stringToUTF8=Re,s.lengthBytesUTF8=se,s.ExitStatus=ke,s.PThread=M;var lt;ge=function e(){lt||sr(),lt||(ge=e)};function sr(){if(!(0<Ae))if(T)S(s),T||Ne(Ue),startWorker(s);else{if(s.preRun)for(typeof s.preRun=="function"&&(s.preRun=[s.preRun]);s.preRun.length;)Oe.unshift(s.preRun.shift());Ne(Oe),0<Ae||lt||(lt=!0,s.calledRun=!0,me||(T||Ne(Ue),S(s),T||Ne(ve)))}}return sr(),H}})();typeof wr=="object"&&typeof Dt=="object"?Dt.exports=yr:typeof define=="function"&&define.amd&&define([],()=>yr)});var vr=Ke((yn,tn)=>{tn.exports=\'"use strict";var Module={},ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",e=>onmessage({data:e}));var fs=require("fs"),vm=require("vm");Object.assign(global,{self:global,require,Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:e=>vm.runInThisContext(fs.readFileSync(e,"utf8"),{filename:e}),postMessage:e=>parentPort.postMessage(e),performance:global.performance||{now:Date.now}})}var initializedJS=!1;function threadPrintErr(...e){var a=e.join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,a+`\\n`);return}console.error(a)}function threadAlert(...e){var a=e.join(" ");postMessage({cmd:"alert",text:a,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,a)=>{var r=Module.wasmModule;Module.wasmModule=null;var t=new WebAssembly.Instance(r,e);return a(t)},self.onunhandledrejection=e=>{throw e.reason||e};function handleMessage(e){try{if(e.data.cmd==="load"){let r=[];self.onmessage=t=>r.push(t),self.startWorker=t=>{Module=t,postMessage({cmd:"loaded"});for(let s of r)handleMessage(s);self.onmessage=handleMessage},Module.wasmModule=e.data.wasmModule;for(const t of e.data.handlers)Module[t]=(...s)=>{postMessage({cmd:"callHandler",handler:t,args:s})};if(Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,typeof e.data.urlOrBlob=="string")importScripts(e.data.urlOrBlob);else{var a=URL.createObjectURL(e.data.urlOrBlob);importScripts(a),URL.revokeObjectURL(a)}ortWasmThreaded(Module)}else if(e.data.cmd==="run"){Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.__emscripten_thread_mailbox_await(e.data.pthread_ptr),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(r){if(r!="unwind")throw r}}else e.data.cmd==="cancel"?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):e.data.target==="setimmediate"||(e.data.cmd==="checkMailbox"?initializedJS&&Module.checkMailbox():e.data.cmd&&(err(`worker.js received unknown command ${e.data.cmd}`),err(e.data)))}catch(r){throw Module.__emscripten_thread_crashed?.(),r}}self.onmessage=handleMessage;\\n\'});var Er;Er=pr();var rn=Or(),Ft,Pt=!1,ct=!1,_r=!1,nn=i=>{if(i===1)return!1;if(typeof SharedArrayBuffer>"u")return typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),!1;typeof process<"u"&&process.versions&&process.versions.node&&console.warn("env.wasm.numThreads is set to "+i+", however, currently onnxruntime-web does not support multi-threads in Node.js. Please consider using onnxruntime-node for performance critical scenarios.");try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},an=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},on=(i,c)=>i?c?"ort-wasm-simd-threaded.wasm":"ort-wasm-simd.wasm":c?"ort-wasm-threaded.wasm":"ort-wasm.wasm",Sr=async i=>{if(Pt)return Promise.resolve();if(ct)throw new Error("multiple calls to \'initializeWebAssembly()\' detected.");if(_r)throw new Error("previous call to \'initializeWebAssembly()\' failed.");ct=!0;let c=i.initTimeout,a=i.numThreads,h=i.simd,f=nn(a),w=h&&an(),g=i.wasmPaths,s=typeof g=="string"?g:void 0,S=on(w,f),x=typeof g=="object"?g[S]:void 0,H=!1,A=[];if(c>0&&A.push(new Promise(I=>{setTimeout(()=>{H=!0,I()},c)})),A.push(new Promise((I,V)=>{let R=f?rn:Er,B={locateFile:(D,T)=>f&&D.endsWith(".worker.js")&&typeof Blob<"u"?URL.createObjectURL(new Blob([vr()],{type:"text/javascript"})):D.endsWith(".wasm")?x||(s??T)+S:T+D};if(f)if(B.numThreads=a,typeof Blob>"u")B.mainScriptUrlOrBlob=(void 0)(__dirname,"ort-wasm-threaded.js");else{let D=`var ortWasmThreaded=${R.toString()};`;B.mainScriptUrlOrBlob=new Blob([D],{type:"text/javascript"})}R(B).then(D=>{ct=!1,Pt=!0,Ft=D,I()},D=>{ct=!1,_r=!0,V(D)})})),await Promise.race(A),H)throw new Error(`WebAssembly backend initializing failed due to timeout: ${c}ms`)},Q=()=>{if(Pt&&Ft)return Ft;throw new Error("WebAssembly is not initialized yet.")};var Y=(i,c)=>{let a=Q(),h=a.lengthBytesUTF8(i)+1,f=a._malloc(h);return a.stringToUTF8(i,f,h),c.push(f),f},tt=(i,c,a,h)=>{if(typeof i=="object"&&i!==null){if(a.has(i))throw new Error("Circular reference in options");a.add(i)}Object.entries(i).forEach(([f,w])=>{let g=c?c+f:f;if(typeof w=="object")tt(w,g+".",a,h);else if(typeof w=="string"||typeof w=="number")h(g,w.toString());else if(typeof w=="boolean")h(g,w?"1":"0");else throw new Error(`Can\'t handle extra config type: ${typeof w}`)})},j=i=>{let c=Q(),a=c.stackSave();try{let h=c.stackAlloc(8);c._OrtGetLastError(h,h+4);let f=c.HEAP32[h/4],w=c.HEAPU32[h/4+1],g=w?c.UTF8ToString(w):"";throw new Error(`${i} ERROR_CODE: ${f}, ERROR_MESSAGE: ${g}`)}finally{c.stackRestore(a)}};var Ar=i=>{let c=Q(),a=0,h=[],f=i||{};try{if(i?.logSeverityLevel===void 0)f.logSeverityLevel=2;else if(typeof i.logSeverityLevel!="number"||!Number.isInteger(i.logSeverityLevel)||i.logSeverityLevel<0||i.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${i.logSeverityLevel}`);if(i?.logVerbosityLevel===void 0)f.logVerbosityLevel=0;else if(typeof i.logVerbosityLevel!="number"||!Number.isInteger(i.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${i.logVerbosityLevel}`);i?.terminate===void 0&&(f.terminate=!1);let w=0;return i?.tag!==void 0&&(w=Y(i.tag,h)),a=c._OrtCreateRunOptions(f.logSeverityLevel,f.logVerbosityLevel,!!f.terminate,w),a===0&&j("Can\'t create run options."),i?.extra!==void 0&&tt(i.extra,"",new WeakSet,(g,s)=>{let S=Y(g,h),x=Y(s,h);c._OrtAddRunConfigEntry(a,S,x)!==0&&j(`Can\'t set a run config entry: ${g} - ${s}.`)}),[a,h]}catch(w){throw a!==0&&c._OrtReleaseRunOptions(a),h.forEach(g=>c._free(g)),w}};var sn=i=>{switch(i){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${i}`)}},un=i=>{switch(i){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${i}`)}},fn=i=>{i.extra||(i.extra={}),i.extra.session||(i.extra.session={});let c=i.extra.session;c.use_ort_model_bytes_directly||(c.use_ort_model_bytes_directly="1"),i.executionProviders&&i.executionProviders.some(a=>(typeof a=="string"?a:a.name)==="webgpu")&&(i.enableMemPattern=!1)},ln=(i,c,a)=>{for(let h of c){let f=typeof h=="string"?h:h.name;switch(f){case"webnn":if(f="WEBNN",typeof h!="string"){let g=h;if(g?.deviceType){let s=Y("deviceType",a),S=Y(g.deviceType,a);Q()._OrtAddSessionConfigEntry(i,s,S)!==0&&j(`Can\'t set a session config entry: \'deviceType\' - ${g.deviceType}.`)}if(g?.numThreads){let s=g.numThreads;(typeof s!="number"||!Number.isInteger(s)||s<0)&&(s=0);let S=Y("numThreads",a),x=Y(s.toString(),a);Q()._OrtAddSessionConfigEntry(i,S,x)!==0&&j(`Can\'t set a session config entry: \'numThreads\' - ${g.numThreads}.`)}if(g?.powerPreference){let s=Y("powerPreference",a),S=Y(g.powerPreference,a);Q()._OrtAddSessionConfigEntry(i,s,S)!==0&&j(`Can\'t set a session config entry: \'powerPreference\' - ${g.powerPreference}.`)}}break;case"webgpu":if(f="JS",typeof h!="string"){let g=h;if(g?.preferredLayout){if(g.preferredLayout!=="NCHW"&&g.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either \'NCHW\' or \'NHWC\': ${g.preferredLayout}`);let s=Y("preferredLayout",a),S=Y(g.preferredLayout,a);Q()._OrtAddSessionConfigEntry(i,s,S)!==0&&j(`Can\'t set a session config entry: \'preferredLayout\' - ${g.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${f}`)}let w=Y(f,a);Q()._OrtAppendExecutionProvider(i,w)!==0&&j(`Can\'t append execution provider: ${f}.`)}},Tr=i=>{let c=Q(),a=0,h=[],f=i||{};fn(f);try{let w=sn(f.graphOptimizationLevel??"all"),g=un(f.executionMode??"sequential"),s=typeof f.logId=="string"?Y(f.logId,h):0,S=f.logSeverityLevel??2;if(!Number.isInteger(S)||S<0||S>4)throw new Error(`log serverity level is not valid: ${S}`);let x=f.logVerbosityLevel??0;if(!Number.isInteger(x)||x<0||x>4)throw new Error(`log verbosity level is not valid: ${x}`);let H=typeof f.optimizedModelFilePath=="string"?Y(f.optimizedModelFilePath,h):0;if(a=c._OrtCreateSessionOptions(w,!!f.enableCpuMemArena,!!f.enableMemPattern,g,!!f.enableProfiling,0,s,S,x,H),a===0&&j("Can\'t create session options."),f.executionProviders&&ln(a,f.executionProviders,h),f.enableGraphCapture!==void 0){if(typeof f.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${f.enableGraphCapture}`);let A=Y("enableGraphCapture",h),I=Y(f.enableGraphCapture.toString(),h);c._OrtAddSessionConfigEntry(a,A,I)!==0&&j(`Can\'t set a session config entry: \'enableGraphCapture\' - ${f.enableGraphCapture}.`)}if(f.freeDimensionOverrides)for(let[A,I]of Object.entries(f.freeDimensionOverrides)){if(typeof A!="string")throw new Error(`free dimension override name must be a string: ${A}`);if(typeof I!="number"||!Number.isInteger(I)||I<0)throw new Error(`free dimension override value must be a non-negative integer: ${I}`);let V=Y(A,h);c._OrtAddFreeDimensionOverride(a,V,I)!==0&&j(`Can\'t set a free dimension override: ${A} - ${I}.`)}return f.extra!==void 0&&tt(f.extra,"",new WeakSet,(A,I)=>{let V=Y(A,h),R=Y(I,h);c._OrtAddSessionConfigEntry(a,V,R)!==0&&j(`Can\'t set a session config entry: ${A} - ${I}.`)}),[a,h]}catch(w){throw a!==0&&c._OrtReleaseSessionOptions(a),h.forEach(g=>c._free(g)),w}};var xt=i=>{switch(i){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${i}`)}},Mr=i=>{switch(i){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${i}`)}},Ut=i=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][i],Cr=i=>{switch(i){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${i}`)}},Dr=i=>{switch(i){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${i}`)}},Fr=i=>i==="float32"||i==="float16"||i==="int32"||i==="int64"||i==="uint32"||i==="uint8"||i==="bool",Pr=i=>{switch(i){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${i}`)}};var xr=async i=>{if(typeof i=="string")if(typeof process<"u"&&process.versions&&process.versions.node)try{return new Uint8Array(await(void 0)(i))}catch(c){if(c.code==="ERR_FS_FILE_TOO_LARGE"){let a=(void 0)(i),h=[];for await(let f of a)h.push(f);return new Uint8Array(Buffer.concat(h))}throw c}else{let c=await fetch(i);if(!c.ok)throw new Error(`failed to load external data file: ${i}`);let a=c.headers.get("Content-Length"),h=a?parseInt(a,10):0;if(h<1073741824)return new Uint8Array(await c.arrayBuffer());{if(!c.body)throw new Error(`failed to load external data file: ${i}, no response body.`);let f=c.body.getReader(),w;try{w=new ArrayBuffer(h)}catch(s){if(s instanceof RangeError){let S=Math.ceil(h/65536);w=new WebAssembly.Memory({initial:S,maximum:S}).buffer}else throw s}let g=0;for(;;){let{done:s,value:S}=await f.read();if(s)break;let x=S.byteLength;new Uint8Array(w,g,x).set(S),g+=x}return new Uint8Array(w,0,h)}}else return i instanceof Blob?new Uint8Array(await i.arrayBuffer()):i instanceof Uint8Array?i:new Uint8Array(i)};var cn=(i,c)=>{Q()._OrtInit(i,c)!==0&&j("Can\'t initialize onnxruntime.")},Lr=async i=>{cn(i.wasm.numThreads,Dr(i.logLevel))},Rr=async(i,c)=>{},Ye=new Map,dn=i=>{let c=Q(),a=c.stackSave();try{let h=c.stackAlloc(8);return c._OrtGetInputOutputCount(i,h,h+4)!==0&&j("Can\'t get session input/output count."),[c.HEAP32[h/4],c.HEAP32[h/4+1]]}finally{c.stackRestore(a)}},Lt=i=>{let c=Q(),a=c._malloc(i.byteLength);if(a===0)throw new Error(`Can\'t create a session. failed to allocate a buffer of size ${i.byteLength}.`);return c.HEAPU8.set(i,a),[a,i.byteLength]},Ir=async(i,c)=>{let a,h,f=Q();Array.isArray(i)?[a,h]=i:i.buffer===f.HEAPU8.buffer?[a,h]=[i.byteOffset,i.byteLength]:[a,h]=Lt(i);let w=0,g=0,s=0,S=[],x=[],H=[];try{if([g,S]=Tr(c),c?.externalData&&f.mountExternalData){let L=[];for(let W of c.externalData){let de=typeof W=="string"?W:W.path;L.push(xr(typeof W=="string"?W:W.data).then(pe=>{f.mountExternalData(de,pe)}))}await Promise.all(L)}w=await f._OrtCreateSession(a,h,g),w===0&&j("Can\'t create a session.");let[A,I]=dn(w),V=!!c?.enableGraphCapture,R=[],B=[],D=[];for(let L=0;L<A;L++){let W=f._OrtGetInputName(w,L);W===0&&j("Can\'t get an input name."),x.push(W),R.push(f.UTF8ToString(W))}for(let L=0;L<I;L++){let W=f._OrtGetOutputName(w,L);W===0&&j("Can\'t get an output name."),H.push(W);let de=f.UTF8ToString(W);B.push(de)}let T=null;return Ye.set(w,[w,x,H,T,V,!1]),[w,R,B]}catch(A){throw x.forEach(I=>f._OrtFree(I)),H.forEach(I=>f._OrtFree(I)),s!==0&&f._OrtReleaseBinding(s),w!==0&&f._OrtReleaseSession(w),A}finally{f._free(a),g!==0&&f._OrtReleaseSessionOptions(g),S.forEach(A=>f._free(A)),f.unmountExternalData?.()}},Br=i=>{let c=Q(),a=Ye.get(i);if(!a)throw new Error(`cannot release session. invalid session id: ${i}`);let[h,f,w,g,s]=a;g&&(s&&c._OrtClearBoundOutputs(g.handle),c._OrtReleaseBinding(g.handle)),c.jsepOnReleaseSession?.(i),f.forEach(S=>c._OrtFree(S)),w.forEach(S=>c._OrtFree(S)),c._OrtReleaseSession(h),Ye.delete(i)},Ur=(i,c,a,h,f,w=!1)=>{if(!i){c.push(0);return}let g=Q(),s=i[0],S=i[1],x=i[3],H,A;if(s==="string"&&x==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(w&&x!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${f} when enableGraphCapture is true.`);if(x==="gpu-buffer"){let R=i[2].gpuBuffer,B=Ut(xt(s));A=S.reduce((T,L)=>T*L,1)*B;let D=g.jsepRegisterBuffer;if(!D)throw new Error(\'Tensor location "gpu-buffer" is not supported without using WebGPU.\');H=D(h,f,R,A)}else{let R=i[2];if(Array.isArray(R)){A=4*R.length,H=g._malloc(A),a.push(H);let B=H/4;for(let D=0;D<R.length;D++){if(typeof R[D]!="string")throw new TypeError(`tensor data at index ${D} is not a string`);g.HEAPU32[B++]=Y(R[D],a)}}else A=R.byteLength,H=g._malloc(A),a.push(H),g.HEAPU8.set(new Uint8Array(R.buffer,R.byteOffset,A),H)}let I=g.stackSave(),V=g.stackAlloc(4*S.length);try{let R=V/4;S.forEach(D=>g.HEAP32[R++]=D);let B=g._OrtCreateTensor(xt(s),H,A,V,S.length,Pr(x));B===0&&j(`Can\'t create tensor for input/output. session=${h}, index=${f}.`),c.push(B)}finally{g.stackRestore(I)}},kr=async(i,c,a,h,f,w)=>{let g=Q(),s=Ye.get(i);if(!s)throw new Error(`cannot run inference. invalid session id: ${i}`);let S=s[0],x=s[1],H=s[2],A=s[3],I=s[4],V=s[5],R=c.length,B=h.length,D=0,T=[],L=[],W=[],de=[],pe=g.stackSave(),Z=g.stackAlloc(R*4),_=g.stackAlloc(R*4),J=g.stackAlloc(B*4),Pe=g.stackAlloc(B*4);try{[D,T]=Ar(w);for(let F=0;F<R;F++)Ur(a[F],L,de,i,c[F],I);for(let F=0;F<B;F++)Ur(f[F],W,de,i,R+h[F],I);let le=Z/4,Ie=_/4,ne=J/4,X=Pe/4;for(let F=0;F<R;F++)g.HEAPU32[le++]=L[F],g.HEAPU32[Ie++]=x[c[F]];for(let F=0;F<B;F++)g.HEAPU32[ne++]=W[F],g.HEAPU32[X++]=H[h[F]];g.jsepOnRunStart?.(S);let we;we=await g._OrtRun(S,_,Z,R,Pe,B,J,D),we!==0&&j("failed to call OrtRun().");let me=[];for(let F=0;F<B;F++){let ie=g.HEAPU32[J/4+F];if(ie===W[F]){me.push(f[F]);continue}let xe=g.stackSave(),ce=g.stackAlloc(4*4),be=!1,ae,K=0;try{g._OrtGetTensorData(ie,ce,ce+4,ce+8,ce+12)!==0&&j(`Can\'t access output tensor data on index ${F}.`);let Oe=ce/4,Ue=g.HEAPU32[Oe++];K=g.HEAPU32[Oe++];let ve=g.HEAPU32[Oe++],Ae=g.HEAPU32[Oe++],_e=[];for(let te=0;te<Ae;te++)_e.push(g.HEAPU32[ve/4+te]);g._OrtFree(ve);let ge=_e.reduce((te,re)=>te*re,1);ae=Mr(Ue);let Be=A?.outputPreferredLocations[h[F]];if(ae==="string"){if(Be==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let te=[],re=K/4;for(let ue=0;ue<ge;ue++){let Ee=g.HEAPU32[re++],Se=ue===ge-1?void 0:g.HEAPU32[re]-Ee;te.push(g.UTF8ToString(Ee,Se))}me.push([ae,_e,te,"cpu"])}else if(Be==="gpu-buffer"&&ge>0){let te=g.jsepGetBuffer;if(!te)throw new Error(\'preferredLocation "gpu-buffer" is not supported without using WebGPU.\');let re=te(K),ue=Ut(Ue);if(ue===void 0||!Fr(ae))throw new Error(`Unsupported data type: ${ae}`);be=!0,me.push([ae,_e,{gpuBuffer:re,download:g.jsepCreateDownloader(re,ge*ue,ae),dispose:()=>{g._OrtReleaseTensor(ie)}},"gpu-buffer"])}else{let te=Cr(ae),re=new te(ge);new Uint8Array(re.buffer,re.byteOffset,re.byteLength).set(g.HEAPU8.subarray(K,K+re.byteLength)),me.push([ae,_e,re,"cpu"])}}finally{g.stackRestore(xe),ae==="string"&&K&&g._free(K),be||g._OrtReleaseTensor(ie)}}return A&&!I&&(g._OrtClearBoundOutputs(A.handle),Ye.set(i,[S,x,H,A,I,!1])),me}finally{g.stackRestore(pe),L.forEach(le=>g._OrtReleaseTensor(le)),W.forEach(le=>g._OrtReleaseTensor(le)),de.forEach(le=>g._free(le)),D!==0&&g._OrtReleaseRunOptions(D),T.forEach(le=>g._free(le))}},Wr=i=>{let c=Q(),a=Ye.get(i);if(!a)throw new Error("invalid session id");let h=a[0],f=c._OrtEndProfiling(h);f===0&&j("Can\'t get an profile file name."),c._OrtFree(f)},Nr=i=>{let c=[];for(let a of i){let h=a[2];!Array.isArray(h)&&"buffer"in h&&c.push(h.buffer)}return c};self.onmessage=i=>{let{type:c,in:a}=i.data;try{switch(c){case"init-wasm":Sr(a.wasm).then(()=>{Lr(a).then(()=>{postMessage({type:c})},h=>{postMessage({type:c,err:h})})},h=>{postMessage({type:c,err:h})});break;case"init-ep":{let{epName:h,env:f}=a;Rr(f,h).then(()=>{postMessage({type:c})},w=>{postMessage({type:c,err:w})});break}case"copy-from":{let{buffer:h}=a,f=Lt(h);postMessage({type:c,out:f});break}case"create":{let{model:h,options:f}=a;Ir(h,f).then(w=>{postMessage({type:c,out:w})},w=>{postMessage({type:c,err:w})});break}case"release":Br(a),postMessage({type:c});break;case"run":{let{sessionId:h,inputIndices:f,inputs:w,outputIndices:g,options:s}=a;kr(h,f,w,g,new Array(g.length).fill(null),s).then(S=>{S.some(x=>x[3]!=="cpu")?postMessage({type:c,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:c,out:S},Nr([...w,...S]))},S=>{postMessage({type:c,err:S})});break}case"end-profiling":Wr(a),postMessage({type:c});break;default:}}catch(h){postMessage({type:c,err:h})}};})();\n'});var _r,gt,yn,Do,Lo,ca,pa,Vr,Wr,Tg,Eo,od,id,ad,sd,ud,ld,fd,da=L(()=>{"use strict";Ot();rd();Ur();_r=()=>!!Z.wasm.proxy&&typeof document<"u",yn=!1,Do=!1,Lo=!1,pa=new Map,Vr=(a,t)=>{let o=pa.get(a);o?o.push(t):pa.set(a,[t])},Wr=()=>{if(yn||!Do||Lo||!gt)throw new Error("worker not ready")},Tg=a=>{switch(a.data.type){case"init-wasm":yn=!1,a.data.err?(Lo=!0,ca[1](a.data.err)):(Do=!0,ca[0]());break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=pa.get(a.data.type);a.data.err?t.shift()[1](a.data.err):t.shift()[0](a.data.out);break}default:}},Eo=typeof document<"u"?document?.currentScript?.src:void 0,od=async()=>{if(!Do){if(yn)throw new Error("multiple calls to 'initWasm()' detected.");if(Lo)throw new Error("previous call to 'initWasm()' failed.");if(yn=!0,_r())return Z.wasm.wasmPaths===void 0&&Eo&&Eo.indexOf("blob:")!==0&&(Z.wasm.wasmPaths=Eo.substr(0,+Eo.lastIndexOf("/")+1)),new Promise((a,t)=>{gt?.terminate();let o=URL.createObjectURL(new Blob([nd()],{type:"text/javascript"}));gt=new Worker(o,{name:"ort-wasm-proxy-worker"}),gt.onerror=r=>t(r),gt.onmessage=Tg,URL.revokeObjectURL(o),ca=[a,t];let e={type:"init-wasm",in:Z};gt.postMessage(e)});try{await Mp(Z.wasm),await Xp(Z),Do=!0}catch(a){throw Lo=!0,a}finally{yn=!1}}},id=async a=>{if(_r())return Wr(),new Promise((t,o)=>{Vr("init-ep",[t,o]);let e={type:"init-ep",in:{epName:a,env:Z}};gt.postMessage(e)});await Kp(Z,a)},ad=async a=>_r()?(Wr(),new Promise((t,o)=>{Vr("copy-from",[t,o]);let e={type:"copy-from",in:{buffer:a}};gt.postMessage(e,[a.buffer])})):fa(a),sd=async(a,t)=>{if(_r()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wr(),new Promise((o,e)=>{Vr("create",[o,e]);let r={type:"create",in:{model:a,options:{...t}}},n=[];a instanceof Uint8Array&&n.push(a.buffer),gt.postMessage(r,n)})}else return Jp(a,t)},ud=async a=>{if(_r())return Wr(),new Promise((t,o)=>{Vr("release",[t,o]);let e={type:"release",in:a};gt.postMessage(e)});Zp(a)},ld=async(a,t,o,e,r,n)=>{if(_r()){if(o.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(r.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wr(),new Promise((s,i)=>{Vr("run",[s,i]);let u=o,l={type:"run",in:{sessionId:a,inputIndices:t,inputs:u,outputIndices:e,options:n}};gt.postMessage(l,td(u))})}else return Qp(a,t,o,e,r,n)},fd=async a=>{if(_r())return Wr(),new Promise((t,o)=>{Vr("end-profiling",[t,o]);let e={type:"end-profiling",in:a};gt.postMessage(e)});ed(a)}});var cd,xg,Co,pd=L(()=>{"use strict";Ot();da();ua();la();cd=(a,t)=>{switch(a.location){case"cpu":return[a.type,a.dims,a.data,"cpu"];case"gpu-buffer":return[a.type,a.dims,{gpuBuffer:a.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${a.location} for ${t()}`)}},xg=a=>{switch(a[3]){case"cpu":return new Me(a[0],a[2],a[1]);case"gpu-buffer":{let t=a[0];if(!Po(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:o,download:e,dispose:r}=a[2];return Me.fromGpuBuffer(o,{dataType:t,dims:a[1],download:e,dispose:r})}default:throw new Error(`invalid data location: ${a[3]}`)}},Co=class{async fetchModelAndCopyToWasmMemory(t){return ad(await gn(t))}async loadModel(t,o){lr();let e;typeof t=="string"?typeof process<"u"&&process.versions&&process.versions.node?e=await gn(t):e=await this.fetchModelAndCopyToWasmMemory(t):e=t,[this.sessionId,this.inputNames,this.outputNames]=await sd(e,o),fr()}async dispose(){return ud(this.sessionId)}async run(t,o,e){lr();let r=[],n=[];Object.entries(t).forEach(d=>{let T=d[0],w=d[1],v=this.inputNames.indexOf(T);if(v===-1)throw new Error(`invalid input '${T}'`);r.push(w),n.push(v)});let s=[],i=[];Object.entries(o).forEach(d=>{let T=d[0],w=d[1],v=this.outputNames.indexOf(T);if(v===-1)throw new Error(`invalid output '${T}'`);s.push(w),i.push(v)});let u=r.map((d,T)=>cd(d,()=>`input "${this.inputNames[n[T]]}"`)),l=s.map((d,T)=>d?cd(d,()=>`output "${this.outputNames[i[T]]}"`):null),c=await ld(this.sessionId,n,u,i,l,e),p={};for(let d=0;d<c.length;d++)p[this.outputNames[i[d]]]=s[d]??xg(c[d]);return fr(),p}startProfiling(){}endProfiling(){fd(this.sessionId)}}});var wg,Fo,dd=L(()=>{"use strict";Ot();da();pd();wg=()=>{if((typeof Z.wasm.initTimeout!="number"||Z.wasm.initTimeout<0)&&(Z.wasm.initTimeout=0),typeof Z.wasm.simd!="boolean"&&(Z.wasm.simd=!0),typeof Z.wasm.proxy!="boolean"&&(Z.wasm.proxy=!1),typeof Z.wasm.trace!="boolean"&&(Z.wasm.trace=!1),typeof Z.wasm.numThreads!="number"||!Number.isInteger(Z.wasm.numThreads)||Z.wasm.numThreads<=0){(typeof self<"u"&&!self.crossOriginIsolated||typeof process<"u"&&process.versions&&process.versions.node)&&(Z.wasm.numThreads=1);let a=typeof navigator>"u"?(void 0)().length:navigator.hardwareConcurrency;Z.wasm.numThreads=Math.min(4,Math.ceil((a||1)/2))}},Fo=class{async init(t){wg(),await od(),await id(t)}async createInferenceSessionHandler(t,o){let e=new Co;return await e.loadModel(t,o),Promise.resolve(e)}}});var hd={};Sr(hd,{wasmBackend:()=>vg});var vg,md=L(()=>{"use strict";dd();vg=new Fo});Ot();Ot();Ot();var Ts="1.18.0";var jO=qo;{let a=(Op(),ar(_p)).onnxjsBackend;Pr("webgl",a,-10)}{let a=(md(),ar(hd)).wasmBackend;Pr("cpu",a,10),Pr("wasm",a,10)}Object.defineProperty(Z.versions,"web",{value:Ts,enumerable:!0});
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.min.js.map


/***/ })

}]);