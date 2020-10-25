(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PropTypes = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */

		'use strict';

		var printWarning = function() {};

		if ("development" !== 'production') {
			var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
			var loggedTypeFailures = {};

			printWarning = function(text) {
				var message = 'Warning: ' + text;
				if (typeof console !== 'undefined') {
					console.error(message);
				}
				try {
					// --- Welcome to debugging React ---
					// This error was thrown as a convenience so that you can use this stack
					// to find the callsite that caused this warning to fire.
					throw new Error(message);
				} catch (x) {}
			};
		}

		/**
		 * Assert that the values match with the type specs.
		 * Error messages are memorized and will only be shown once.
		 *
		 * @param {object} typeSpecs Map of name to a ReactPropType
		 * @param {object} values Runtime values that need to be type-checked
		 * @param {string} location e.g. "prop", "context", "child context"
		 * @param {string} componentName Name of the component for error messages.
		 * @param {?Function} getStack Returns the component stack.
		 * @private
		 */
		function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
			if ("development" !== 'production') {
				for (var typeSpecName in typeSpecs) {
					if (typeSpecs.hasOwnProperty(typeSpecName)) {
						var error;
						// Prop type validation may throw. In case they do, we don't want to
						// fail the render phase where it didn't fail before. So we log it.
						// After these have been cleaned up, we'll let them throw.
						try {
							// This is intentionally an invariant that gets caught. It's the same
							// behavior as without this statement except with a better message.
							if (typeof typeSpecs[typeSpecName] !== 'function') {
								var err = Error(
									(componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
									'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
								);
								err.name = 'Invariant Violation';
								throw err;
							}
							error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
						} catch (ex) {
							error = ex;
						}
						if (error && !(error instanceof Error)) {
							printWarning(
								(componentName || 'React class') + ': type specification of ' +
								location + ' `' + typeSpecName + '` is invalid; the type checker ' +
								'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
								'You may have forgotten to pass an argument to the type checker ' +
								'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
								'shape all require an argument).'
							)

						}
						if (error instanceof Error && !(error.message in loggedTypeFailures)) {
							// Only monitor this failure once because there tends to be a lot of the
							// same error.
							loggedTypeFailures[error.message] = true;

							var stack = getStack ? getStack() : '';

							printWarning(
								'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
							);
						}
					}
				}
			}
		}

		module.exports = checkPropTypes;

	},{"./lib/ReactPropTypesSecret":5}],2:[function(require,module,exports){
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */

		'use strict';

		var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

		function emptyFunction() {}

		module.exports = function() {
			function shim(props, propName, componentName, location, propFullName, secret) {
				if (secret === ReactPropTypesSecret) {
					// It is still safe when called from React.
					return;
				}
				var err = new Error(
					'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
					'Use PropTypes.checkPropTypes() to call them. ' +
					'Read more at http://fb.me/use-check-prop-types'
				);
				err.name = 'Invariant Violation';
				throw err;
			};
			shim.isRequired = shim;
			function getShim() {
				return shim;
			};
			// Important!
			// Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
			var ReactPropTypes = {
				array: shim,
				bool: shim,
				func: shim,
				number: shim,
				object: shim,
				string: shim,
				symbol: shim,

				any: shim,
				arrayOf: getShim,
				element: shim,
				instanceOf: getShim,
				node: shim,
				objectOf: getShim,
				oneOf: getShim,
				oneOfType: getShim,
				shape: getShim,
				exact: getShim
			};

			ReactPropTypes.checkPropTypes = emptyFunction;
			ReactPropTypes.PropTypes = ReactPropTypes;

			return ReactPropTypes;
		};

	},{"./lib/ReactPropTypesSecret":5}],3:[function(require,module,exports){
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */

		'use strict';

		var assign = require('object-assign');

		var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
		var checkPropTypes = require('./checkPropTypes');

		var printWarning = function() {};

		if ("development" !== 'production') {
			printWarning = function(text) {
				var message = 'Warning: ' + text;
				if (typeof console !== 'undefined') {
					console.error(message);
				}
				try {
					// --- Welcome to debugging React ---
					// This error was thrown as a convenience so that you can use this stack
					// to find the callsite that caused this warning to fire.
					throw new Error(message);
				} catch (x) {}
			};
		}

		function emptyFunctionThatReturnsNull() {
			return null;
		}

		module.exports = function(isValidElement, throwOnDirectAccess) {
			/* global Symbol */
			var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
			var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

			/**
			 * Returns the iterator method function contained on the iterable object.
			 *
			 * Be sure to invoke the function with the iterable as context:
			 *
			 *     var iteratorFn = getIteratorFn(myIterable);
			 *     if (iteratorFn) {
			 *       var iterator = iteratorFn.call(myIterable);
			 *       ...
			 *     }
			 *
			 * @param {?object} maybeIterable
			 * @return {?function}
			 */
			function getIteratorFn(maybeIterable) {
				var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
				if (typeof iteratorFn === 'function') {
					return iteratorFn;
				}
			}

			/**
			 * Collection of methods that allow declaration and validation of props that are
			 * supplied to React components. Example usage:
			 *
			 *   var Props = require('ReactPropTypes');
			 *   var MyArticle = React.createClass({
			 *     propTypes: {
			 *       // An optional string prop named "description".
			 *       description: Props.string,
			 *
			 *       // A required enum prop named "category".
			 *       category: Props.oneOf(['News','Photos']).isRequired,
			 *
			 *       // A prop named "dialog" that requires an instance of Dialog.
			 *       dialog: Props.instanceOf(Dialog).isRequired
			 *     },
			 *     render: function() { ... }
			 *   });
			 *
			 * A more formal specification of how these methods are used:
			 *
			 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
			 *   decl := ReactPropTypes.{type}(.isRequired)?
			 *
			 * Each and every declaration produces a function with the same signature. This
			 * allows the creation of custom validation functions. For example:
			 *
			 *  var MyLink = React.createClass({
			 *    propTypes: {
			 *      // An optional string or URI prop named "href".
			 *      href: function(props, propName, componentName) {
			 *        var propValue = props[propName];
			 *        if (propValue != null && typeof propValue !== 'string' &&
			 *            !(propValue instanceof URI)) {
			 *          return new Error(
			 *            'Expected a string or an URI for ' + propName + ' in ' +
			 *            componentName
			 *          );
			 *        }
			 *      }
			 *    },
			 *    render: function() {...}
			 *  });
			 *
			 * @internal
			 */

			var ANONYMOUS = '<<anonymous>>';

			// Important!
			// Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
			var ReactPropTypes = {
				array: createPrimitiveTypeChecker('array'),
				bool: createPrimitiveTypeChecker('boolean'),
				func: createPrimitiveTypeChecker('function'),
				number: createPrimitiveTypeChecker('number'),
				object: createPrimitiveTypeChecker('object'),
				string: createPrimitiveTypeChecker('string'),
				symbol: createPrimitiveTypeChecker('symbol'),

				any: createAnyTypeChecker(),
				arrayOf: createArrayOfTypeChecker,
				element: createElementTypeChecker(),
				instanceOf: createInstanceTypeChecker,
				node: createNodeChecker(),
				objectOf: createObjectOfTypeChecker,
				oneOf: createEnumTypeChecker,
				oneOfType: createUnionTypeChecker,
				shape: createShapeTypeChecker,
				exact: createStrictShapeTypeChecker,
			};

			/**
			 * inlined Object.is polyfill to avoid requiring consumers ship their own
			 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
			 */
			/*eslint-disable no-self-compare*/
			function is(x, y) {
				// SameValue algorithm
				if (x === y) {
					// Steps 1-5, 7-10
					// Steps 6.b-6.e: +0 != -0
					return x !== 0 || 1 / x === 1 / y;
				} else {
					// Step 6.a: NaN == NaN
					return x !== x && y !== y;
				}
			}
			/*eslint-enable no-self-compare*/

			/**
			 * We use an Error-like object for backward compatibility as people may call
			 * PropTypes directly and inspect their output. However, we don't use real
			 * Errors anymore. We don't inspect their stack anyway, and creating them
			 * is prohibitively expensive if they are created too often, such as what
			 * happens in oneOfType() for any type before the one that matched.
			 */
			function PropTypeError(message) {
				this.message = message;
				this.stack = '';
			}
			// Make `instanceof Error` still work for returned errors.
			PropTypeError.prototype = Error.prototype;

			function createChainableTypeChecker(validate) {
				if ("development" !== 'production') {
					var manualPropTypeCallCache = {};
					var manualPropTypeWarningCount = 0;
				}
				function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
					componentName = componentName || ANONYMOUS;
					propFullName = propFullName || propName;

					if (secret !== ReactPropTypesSecret) {
						if (throwOnDirectAccess) {
							// New behavior only for users of `prop-types` package
							var err = new Error(
								'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
								'Use `PropTypes.checkPropTypes()` to call them. ' +
								'Read more at http://fb.me/use-check-prop-types'
							);
							err.name = 'Invariant Violation';
							throw err;
						} else if ("development" !== 'production' && typeof console !== 'undefined') {
							// Old behavior for people using React.PropTypes
							var cacheKey = componentName + ':' + propName;
							if (
								!manualPropTypeCallCache[cacheKey] &&
								// Avoid spamming the console because they are often not actionable except for lib authors
								manualPropTypeWarningCount < 3
							) {
								printWarning(
									'You are manually calling a React.PropTypes validation ' +
									'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
									'and will throw in the standalone `prop-types` package. ' +
									'You may be seeing this warning due to a third-party PropTypes ' +
									'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
								);
								manualPropTypeCallCache[cacheKey] = true;
								manualPropTypeWarningCount++;
							}
						}
					}
					if (props[propName] == null) {
						if (isRequired) {
							if (props[propName] === null) {
								return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
							}
							return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
						}
						return null;
					} else {
						return validate(props, propName, componentName, location, propFullName);
					}
				}

				var chainedCheckType = checkType.bind(null, false);
				chainedCheckType.isRequired = checkType.bind(null, true);

				return chainedCheckType;
			}

			function createPrimitiveTypeChecker(expectedType) {
				function validate(props, propName, componentName, location, propFullName, secret) {
					var propValue = props[propName];
					var propType = getPropType(propValue);
					if (propType !== expectedType) {
						// `propValue` being instance of, say, date/regexp, pass the 'object'
						// check, but we can offer a more precise error message here rather than
						// 'of type `object`'.
						var preciseType = getPreciseType(propValue);

						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createAnyTypeChecker() {
				return createChainableTypeChecker(emptyFunctionThatReturnsNull);
			}

			function createArrayOfTypeChecker(typeChecker) {
				function validate(props, propName, componentName, location, propFullName) {
					if (typeof typeChecker !== 'function') {
						return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
					}
					var propValue = props[propName];
					if (!Array.isArray(propValue)) {
						var propType = getPropType(propValue);
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
					}
					for (var i = 0; i < propValue.length; i++) {
						var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
						if (error instanceof Error) {
							return error;
						}
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createElementTypeChecker() {
				function validate(props, propName, componentName, location, propFullName) {
					var propValue = props[propName];
					if (!isValidElement(propValue)) {
						var propType = getPropType(propValue);
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createInstanceTypeChecker(expectedClass) {
				function validate(props, propName, componentName, location, propFullName) {
					if (!(props[propName] instanceof expectedClass)) {
						var expectedClassName = expectedClass.name || ANONYMOUS;
						var actualClassName = getClassName(props[propName]);
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createEnumTypeChecker(expectedValues) {
				if (!Array.isArray(expectedValues)) {
					"development" !== 'production' ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
					return emptyFunctionThatReturnsNull;
				}

				function validate(props, propName, componentName, location, propFullName) {
					var propValue = props[propName];
					for (var i = 0; i < expectedValues.length; i++) {
						if (is(propValue, expectedValues[i])) {
							return null;
						}
					}

					var valuesString = JSON.stringify(expectedValues);
					return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
				}
				return createChainableTypeChecker(validate);
			}

			function createObjectOfTypeChecker(typeChecker) {
				function validate(props, propName, componentName, location, propFullName) {
					if (typeof typeChecker !== 'function') {
						return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
					}
					var propValue = props[propName];
					var propType = getPropType(propValue);
					if (propType !== 'object') {
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
					}
					for (var key in propValue) {
						if (propValue.hasOwnProperty(key)) {
							var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
							if (error instanceof Error) {
								return error;
							}
						}
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createUnionTypeChecker(arrayOfTypeCheckers) {
				if (!Array.isArray(arrayOfTypeCheckers)) {
					"development" !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
					return emptyFunctionThatReturnsNull;
				}

				for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
					var checker = arrayOfTypeCheckers[i];
					if (typeof checker !== 'function') {
						printWarning(
							'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
							'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
						);
						return emptyFunctionThatReturnsNull;
					}
				}

				function validate(props, propName, componentName, location, propFullName) {
					for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
						var checker = arrayOfTypeCheckers[i];
						if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
							return null;
						}
					}

					return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
				}
				return createChainableTypeChecker(validate);
			}

			function createNodeChecker() {
				function validate(props, propName, componentName, location, propFullName) {
					if (!isNode(props[propName])) {
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createShapeTypeChecker(shapeTypes) {
				function validate(props, propName, componentName, location, propFullName) {
					var propValue = props[propName];
					var propType = getPropType(propValue);
					if (propType !== 'object') {
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
					}
					for (var key in shapeTypes) {
						var checker = shapeTypes[key];
						if (!checker) {
							continue;
						}
						var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
						if (error) {
							return error;
						}
					}
					return null;
				}
				return createChainableTypeChecker(validate);
			}

			function createStrictShapeTypeChecker(shapeTypes) {
				function validate(props, propName, componentName, location, propFullName) {
					var propValue = props[propName];
					var propType = getPropType(propValue);
					if (propType !== 'object') {
						return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
					}
					// We need to check all keys in case some are required but missing from
					// props.
					var allKeys = assign({}, props[propName], shapeTypes);
					for (var key in allKeys) {
						var checker = shapeTypes[key];
						if (!checker) {
							return new PropTypeError(
								'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
								'\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
								'\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
							);
						}
						var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
						if (error) {
							return error;
						}
					}
					return null;
				}

				return createChainableTypeChecker(validate);
			}

			function isNode(propValue) {
				switch (typeof propValue) {
					case 'number':
					case 'string':
					case 'undefined':
						return true;
					case 'boolean':
						return !propValue;
					case 'object':
						if (Array.isArray(propValue)) {
							return propValue.every(isNode);
						}
						if (propValue === null || isValidElement(propValue)) {
							return true;
						}

						var iteratorFn = getIteratorFn(propValue);
						if (iteratorFn) {
							var iterator = iteratorFn.call(propValue);
							var step;
							if (iteratorFn !== propValue.entries) {
								while (!(step = iterator.next()).done) {
									if (!isNode(step.value)) {
										return false;
									}
								}
							} else {
								// Iterator will provide entry [k,v] tuples rather than values.
								while (!(step = iterator.next()).done) {
									var entry = step.value;
									if (entry) {
										if (!isNode(entry[1])) {
											return false;
										}
									}
								}
							}
						} else {
							return false;
						}

						return true;
					default:
						return false;
				}
			}

			function isSymbol(propType, propValue) {
				// Native Symbol.
				if (propType === 'symbol') {
					return true;
				}

				// 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
				if (propValue['@@toStringTag'] === 'Symbol') {
					return true;
				}

				// Fallback for non-spec compliant Symbols which are polyfilled.
				if (typeof Symbol === 'function' && propValue instanceof Symbol) {
					return true;
				}

				return false;
			}

			// Equivalent of `typeof` but with special handling for array and regexp.
			function getPropType(propValue) {
				var propType = typeof propValue;
				if (Array.isArray(propValue)) {
					return 'array';
				}
				if (propValue instanceof RegExp) {
					// Old webkits (at least until Android 4.0) return 'function' rather than
					// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
					// passes PropTypes.object.
					return 'object';
				}
				if (isSymbol(propType, propValue)) {
					return 'symbol';
				}
				return propType;
			}

			// This handles more types than `getPropType`. Only used for error messages.
			// See `createPrimitiveTypeChecker`.
			function getPreciseType(propValue) {
				if (typeof propValue === 'undefined' || propValue === null) {
					return '' + propValue;
				}
				var propType = getPropType(propValue);
				if (propType === 'object') {
					if (propValue instanceof Date) {
						return 'date';
					} else if (propValue instanceof RegExp) {
						return 'regexp';
					}
				}
				return propType;
			}

			// Returns a string that is postfixed to a warning about an invalid type.
			// For example, "undefined" or "of type array"
			function getPostfixForTypeWarning(value) {
				var type = getPreciseType(value);
				switch (type) {
					case 'array':
					case 'object':
						return 'an ' + type;
					case 'boolean':
					case 'date':
					case 'regexp':
						return 'a ' + type;
					default:
						return type;
				}
			}

			// Returns class name of the object, if any.
			function getClassName(propValue) {
				if (!propValue.constructor || !propValue.constructor.name) {
					return ANONYMOUS;
				}
				return propValue.constructor.name;
			}

			ReactPropTypes.checkPropTypes = checkPropTypes;
			ReactPropTypes.PropTypes = ReactPropTypes;

			return ReactPropTypes;
		};

	},{"./checkPropTypes":1,"./lib/ReactPropTypesSecret":5,"object-assign":6}],4:[function(require,module,exports){
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */

		if ("development" !== 'production') {
			var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
				Symbol.for &&
				Symbol.for('react.element')) ||
				0xeac7;

			var isValidElement = function(object) {
				return typeof object === 'object' &&
					object !== null &&
					object.$$typeof === REACT_ELEMENT_TYPE;
			};

			// By explicitly using `prop-types` you are opting into new development behavior.
			// http://fb.me/prop-types-in-prod
			var throwOnDirectAccess = true;
			module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
		} else {
			// By explicitly using `prop-types` you are opting into new production behavior.
			// http://fb.me/prop-types-in-prod
			module.exports = require('./factoryWithThrowingShims')();
		}

	},{"./factoryWithThrowingShims":2,"./factoryWithTypeCheckers":3}],5:[function(require,module,exports){
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */

		'use strict';

		var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

		module.exports = ReactPropTypesSecret;

	},{}],6:[function(require,module,exports){
		/*
		object-assign
		(c) Sindre Sorhus
		@license MIT
		*/

		'use strict';
		/* eslint-disable no-unused-vars */
		var getOwnPropertySymbols = Object.getOwnPropertySymbols;
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var propIsEnumerable = Object.prototype.propertyIsEnumerable;

		function toObject(val) {
			if (val === null || val === undefined) {
				throw new TypeError('Object.assign cannot be called with null or undefined');
			}

			return Object(val);
		}

		function shouldUseNative() {
			try {
				if (!Object.assign) {
					return false;
				}

				// Detect buggy property enumeration order in older V8 versions.

				// https://bugs.chromium.org/p/v8/issues/detail?id=4118
				var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
				test1[5] = 'de';
				if (Object.getOwnPropertyNames(test1)[0] === '5') {
					return false;
				}

				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test2 = {};
				for (var i = 0; i < 10; i++) {
					test2['_' + String.fromCharCode(i)] = i;
				}
				var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
					return test2[n];
				});
				if (order2.join('') !== '0123456789') {
					return false;
				}

				// https://bugs.chromium.org/p/v8/issues/detail?id=3056
				var test3 = {};
				'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
					test3[letter] = letter;
				});
				if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
					return false;
				}

				return true;
			} catch (err) {
				// We don't expect any of the above to throw, but better to be safe.
				return false;
			}
		}

		module.exports = shouldUseNative() ? Object.assign : function (target, source) {
			var from;
			var to = toObject(target);
			var symbols;

			for (var s = 1; s < arguments.length; s++) {
				from = Object(arguments[s]);

				for (var key in from) {
					if (hasOwnProperty.call(from, key)) {
						to[key] = from[key];
					}
				}

				if (getOwnPropertySymbols) {
					symbols = getOwnPropertySymbols(from);
					for (var i = 0; i < symbols.length; i++) {
						if (propIsEnumerable.call(from, symbols[i])) {
							to[symbols[i]] = from[symbols[i]];
						}
					}
				}
			}

			return to;
		};

	},{}]},{},[4])(4)
});

/** React Sortable HOC **/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'react-dom'], factory) :
	(global = global || self, factory(global.SortableHOC = {}, global.React, global.PropTypes, global.ReactDOM));
}(this, function (exports, React, PropTypes, reactDom) { 'use strict';

	PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	var arrayWithHoles = _arrayWithHoles;

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	var iterableToArrayLimit = _iterableToArrayLimit;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var nonIterableRest = _nonIterableRest;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	var objectSpread = _objectSpread;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	var invariant_1 = invariant;

	var Manager = function () {
	  function Manager() {
	    classCallCheck(this, Manager);

	    defineProperty(this, "refs", {});
	  }

	  createClass(Manager, [{
	    key: "add",
	    value: function add(collection, ref) {
	      if (!this.refs[collection]) {
	        this.refs[collection] = [];
	      }

	      this.refs[collection].push(ref);
	    }
	  }, {
	    key: "remove",
	    value: function remove(collection, ref) {
	      var index = this.getIndex(collection, ref);

	      if (index !== -1) {
	        this.refs[collection].splice(index, 1);
	      }
	    }
	  }, {
	    key: "isActive",
	    value: function isActive() {
	      return this.active;
	    }
	  }, {
	    key: "getActive",
	    value: function getActive() {
	      var _this = this;

	      return this.refs[this.active.collection].find(function (_ref) {
	        var node = _ref.node;
	        return node.sortableInfo.index == _this.active.index;
	      });
	    }
	  }, {
	    key: "getIndex",
	    value: function getIndex(collection, ref) {
	      return this.refs[collection].indexOf(ref);
	    }
	  }, {
	    key: "getOrderedRefs",
	    value: function getOrderedRefs() {
	      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.active.collection;
	      return this.refs[collection].sort(sortByIndex);
	    }
	  }]);

	  return Manager;
	}();

	function sortByIndex(_ref2, _ref3) {
	  var index1 = _ref2.node.sortableInfo.index;
	  var index2 = _ref3.node.sortableInfo.index;
	  return index1 - index2;
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function arrayMove(array, from, to) {
	  {
	    if (typeof console !== 'undefined') {
	      console.warn("Deprecation warning: arrayMove will no longer be exported by 'react-sortable-hoc' in the next major release. Please install the `array-move` package locally instead. https://www.npmjs.com/package/array-move");
	    }
	  }

	  array = array.slice();
	  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
	  return array;
	}
	function omit(obj, keysToOmit) {
	  return Object.keys(obj).reduce(function (acc, key) {
	    if (keysToOmit.indexOf(key) === -1) {
	      acc[key] = obj[key];
	    }

	    return acc;
	  }, {});
	}
	var events = {
	  end: ['touchend', 'touchcancel', 'mouseup'],
	  move: ['touchmove', 'mousemove'],
	  start: ['touchstart', 'mousedown']
	};
	var vendorPrefix = function () {
	  if (typeof window === 'undefined' || typeof document === 'undefined') {
	    return '';
	  }

	  var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
	  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

	  switch (pre) {
	    case 'ms':
	      return 'ms';

	    default:
	      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
	  }
	}();
	function setInlineStyles(node, styles) {
	  Object.keys(styles).forEach(function (key) {
	    node.style[key] = styles[key];
	  });
	}
	function setTranslate3d(node, translate) {
	  node.style["".concat(vendorPrefix, "Transform")] = translate == null ? '' : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
	}
	function setTransitionDuration(node, duration) {
	  node.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? '' : "".concat(duration, "ms");
	}
	function closest(el, fn) {
	  while (el) {
	    if (fn(el)) {
	      return el;
	    }

	    el = el.parentNode;
	  }

	  return null;
	}
	function limit(min, max, value) {
	  return Math.max(min, Math.min(value, max));
	}

	function getPixelValue(stringValue) {
	  if (stringValue.substr(-2) === 'px') {
	    return parseFloat(stringValue);
	  }

	  return 0;
	}

	function getElementMargin(element) {
	  var style = window.getComputedStyle(element);
	  return {
	    bottom: getPixelValue(style.marginBottom),
	    left: getPixelValue(style.marginLeft),
	    right: getPixelValue(style.marginRight),
	    top: getPixelValue(style.marginTop)
	  };
	}
	function provideDisplayName(prefix, Component) {
	  var componentName = Component.displayName || Component.name;
	  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
	}
	function getScrollAdjustedBoundingClientRect(node, scrollDelta) {
	  var boundingClientRect = node.getBoundingClientRect();
	  return {
	    top: boundingClientRect.top + scrollDelta.top,
	    left: boundingClientRect.left + scrollDelta.left
	  };
	}
	function getPosition(event) {
	  if (event.touches && event.touches.length) {
	    return {
	      x: event.touches[0].pageX,
	      y: event.touches[0].pageY
	    };
	  } else if (event.changedTouches && event.changedTouches.length) {
	    return {
	      x: event.changedTouches[0].pageX,
	      y: event.changedTouches[0].pageY
	    };
	  } else {
	    return {
	      x: event.pageX,
	      y: event.pageY
	    };
	  }
	}
	function isTouchEvent(event) {
	  return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
	}
	function getEdgeOffset(node, parent) {
	  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
	    left: 0,
	    top: 0
	  };

	  if (!node) {
	    return undefined;
	  }

	  var nodeOffset = {
	    left: offset.left + node.offsetLeft,
	    top: offset.top + node.offsetTop
	  };

	  if (node.parentNode === parent) {
	    return nodeOffset;
	  }

	  return getEdgeOffset(node.parentNode, parent, nodeOffset);
	}
	function getTargetIndex(newIndex, prevIndex, oldIndex) {
	  if (newIndex < oldIndex && newIndex > prevIndex) {
	    return newIndex - 1;
	  } else if (newIndex > oldIndex && newIndex < prevIndex) {
	    return newIndex + 1;
	  } else {
	    return newIndex;
	  }
	}
	function getLockPixelOffset(_ref) {
	  var lockOffset = _ref.lockOffset,
	      width = _ref.width,
	      height = _ref.height;
	  var offsetX = lockOffset;
	  var offsetY = lockOffset;
	  var unit = 'px';

	  if (typeof lockOffset === 'string') {
	    var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
	    invariant_1(match !== null, 'lockOffset value should be a number or a string of a ' + 'number followed by "px" or "%". Given %s', lockOffset);
	    offsetX = parseFloat(lockOffset);
	    offsetY = parseFloat(lockOffset);
	    unit = match[1];
	  }

	  invariant_1(isFinite(offsetX) && isFinite(offsetY), 'lockOffset value should be a finite. Given %s', lockOffset);

	  if (unit === '%') {
	    offsetX = offsetX * width / 100;
	    offsetY = offsetY * height / 100;
	  }

	  return {
	    x: offsetX,
	    y: offsetY
	  };
	}
	function getLockPixelOffsets(_ref2) {
	  var height = _ref2.height,
	      width = _ref2.width,
	      lockOffset = _ref2.lockOffset;
	  var offsets = Array.isArray(lockOffset) ? lockOffset : [lockOffset, lockOffset];
	  invariant_1(offsets.length === 2, 'lockOffset prop of SortableContainer should be a single ' + 'value or an array of exactly two values. Given %s', lockOffset);

	  var _offsets = slicedToArray(offsets, 2),
	      minLockOffset = _offsets[0],
	      maxLockOffset = _offsets[1];

	  return [getLockPixelOffset({
	    height: height,
	    lockOffset: minLockOffset,
	    width: width
	  }), getLockPixelOffset({
	    height: height,
	    lockOffset: maxLockOffset,
	    width: width
	  })];
	}

	function isScrollable(el) {
	  var computedStyle = window.getComputedStyle(el);
	  var overflowRegex = /(auto|scroll)/;
	  var properties = ['overflow', 'overflowX', 'overflowY'];
	  return properties.find(function (property) {
	    return overflowRegex.test(computedStyle[property]);
	  });
	}

	function getScrollingParent(el) {
	  if (!(el instanceof HTMLElement)) {
	    return null;
	  } else if (isScrollable(el)) {
	    return el;
	  } else {
	    return getScrollingParent(el.parentNode);
	  }
	}
	function getContainerGridGap(element) {
	  var style = window.getComputedStyle(element);

	  if (style.display === 'grid') {
	    return {
	      x: getPixelValue(style.gridColumnGap),
	      y: getPixelValue(style.gridRowGap)
	    };
	  }

	  return {
	    x: 0,
	    y: 0
	  };
	}
	var KEYCODE = {
	  TAB: 9,
	  ESC: 27,
	  SPACE: 32,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40
	};
	var NodeType = {
	  Anchor: 'A',
	  Button: 'BUTTON',
	  Canvas: 'CANVAS',
	  Input: 'INPUT',
	  Option: 'OPTION',
	  Textarea: 'TEXTAREA',
	  Select: 'SELECT'
	};
	function cloneNode(node) {
	  var selector = 'input, textarea, select, canvas, [contenteditable]';
	  var fields = node.querySelectorAll(selector);
	  var clonedNode = node.cloneNode(true);

	  var clonedFields = toConsumableArray(clonedNode.querySelectorAll(selector));

	  clonedFields.forEach(function (field, i) {
	    if (field.type !== 'file') {
	      field.value = fields[i].value;
	    }

	    if (field.type === 'radio' && field.name) {
	      field.name = "__sortableClone__".concat(field.name);
	    }

	    if (field.tagName === NodeType.Canvas && fields[i].width > 0 && fields[i].height > 0) {
	      var destCtx = field.getContext('2d');
	      destCtx.drawImage(fields[i], 0, 0);
	    }
	  });
	  return clonedNode;
	}

	function sortableHandle(WrappedComponent) {
	  var _class, _temp;

	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    withRef: false
	  };
	  return _temp = _class = function (_React$Component) {
	    inherits(WithSortableHandle, _React$Component);

	    function WithSortableHandle() {
	      classCallCheck(this, WithSortableHandle);

	      return possibleConstructorReturn(this, getPrototypeOf(WithSortableHandle).apply(this, arguments));
	    }

	    createClass(WithSortableHandle, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        var node = reactDom.findDOMNode(this);
	        node.sortableHandle = true;
	      }
	    }, {
	      key: "getWrappedInstance",
	      value: function getWrappedInstance() {
	        invariant_1(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call');
	        return this.refs.wrappedInstance;
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var ref = config.withRef ? 'wrappedInstance' : null;
	        return React.createElement(WrappedComponent, _extends_1({
	          ref: ref
	        }, this.props));
	      }
	    }]);

	    return WithSortableHandle;
	  }(React.Component), defineProperty(_class, "displayName", provideDisplayName('sortableHandle', WrappedComponent)), _temp;
	}
	function isSortableHandle(node) {
	  return node.sortableHandle != null;
	}

	var AutoScroller = function () {
	  function AutoScroller(container, onScrollCallback) {
	    classCallCheck(this, AutoScroller);

	    this.container = container;
	    this.onScrollCallback = onScrollCallback;
	  }

	  createClass(AutoScroller, [{
	    key: "clear",
	    value: function clear() {
	      if (this.interval == null) {
	        return;
	      }

	      clearInterval(this.interval);
	      this.interval = null;
	    }
	  }, {
	    key: "update",
	    value: function update(_ref) {
	      var _this = this;

	      var translate = _ref.translate,
	          minTranslate = _ref.minTranslate,
	          maxTranslate = _ref.maxTranslate,
	          width = _ref.width,
	          height = _ref.height;
	      var direction = {
	        x: 0,
	        y: 0
	      };
	      var speed = {
	        x: 1,
	        y: 1
	      };
	      var acceleration = {
	        x: 10,
	        y: 10
	      };
	      var _this$container = this.container,
	          scrollTop = _this$container.scrollTop,
	          scrollLeft = _this$container.scrollLeft,
	          scrollHeight = _this$container.scrollHeight,
	          scrollWidth = _this$container.scrollWidth,
	          clientHeight = _this$container.clientHeight,
	          clientWidth = _this$container.clientWidth;
	      var isTop = scrollTop === 0;
	      var isBottom = scrollHeight - scrollTop - clientHeight === 0;
	      var isLeft = scrollLeft === 0;
	      var isRight = scrollWidth - scrollLeft - clientWidth === 0;

	      if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
	        direction.y = 1;
	        speed.y = acceleration.y * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
	      } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
	        direction.x = 1;
	        speed.x = acceleration.x * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
	      } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
	        direction.y = -1;
	        speed.y = acceleration.y * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
	      } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
	        direction.x = -1;
	        speed.x = acceleration.x * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
	      }

	      if (this.interval) {
	        this.clear();
	        this.isAutoScrolling = false;
	      }

	      if (direction.x !== 0 || direction.y !== 0) {
	        this.interval = setInterval(function () {
	          _this.isAutoScrolling = true;
	          var offset = {
	            left: speed.x * direction.x,
	            top: speed.y * direction.y
	          };
	          _this.container.scrollTop += offset.top;
	          _this.container.scrollLeft += offset.left;

	          _this.onScrollCallback(offset);
	        }, 5);
	      }
	    }
	  }]);

	  return AutoScroller;
	}();

	function defaultGetHelperDimensions(_ref) {
	  var node = _ref.node;
	  return {
	    height: node.offsetHeight,
	    width: node.offsetWidth
	  };
	}

	function defaultShouldCancelStart(event) {
	  var interactiveElements = [NodeType.Input, NodeType.Textarea, NodeType.Select, NodeType.Option, NodeType.Button];

	  if (interactiveElements.indexOf(event.target.tagName) !== -1) {
	    return true;
	  }

	  if (closest(event.target, function (el) {
	    return el.contentEditable === 'true';
	  })) {
	    return true;
	  }

	  return false;
	}

	var propTypes = {
	  axis: PropTypes.oneOf(['x', 'y', 'xy']),
	  contentWindow: PropTypes.any,
	  disableAutoscroll: PropTypes.bool,
	  distance: PropTypes.number,
	  getContainer: PropTypes.func,
	  getHelperDimensions: PropTypes.func,
	  helperClass: PropTypes.string,
	  helperContainer: PropTypes.oneOfType([PropTypes.func, typeof HTMLElement === 'undefined' ? PropTypes.any : PropTypes.instanceOf(HTMLElement)]),
	  hideSortableGhost: PropTypes.bool,
	  keyboardSortingTransitionDuration: PropTypes.number,
	  lockAxis: PropTypes.string,
	  lockOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))]),
	  lockToContainerEdges: PropTypes.bool,
	  onSortEnd: PropTypes.func,
	  onSortMove: PropTypes.func,
	  onSortOver: PropTypes.func,
	  onSortStart: PropTypes.func,
	  pressDelay: PropTypes.number,
	  pressThreshold: PropTypes.number,
	  keyCodes: PropTypes.shape({
	    lift: PropTypes.arrayOf(PropTypes.number),
	    drop: PropTypes.arrayOf(PropTypes.number),
	    cancel: PropTypes.arrayOf(PropTypes.number),
	    up: PropTypes.arrayOf(PropTypes.number),
	    down: PropTypes.arrayOf(PropTypes.number)
	  }),
	  shouldCancelStart: PropTypes.func,
	  transitionDuration: PropTypes.number,
	  updateBeforeSortStart: PropTypes.func,
	  useDragHandle: PropTypes.bool,
	  useWindowAsScrollContainer: PropTypes.bool
	};
	var defaultKeyCodes = {
	  lift: [KEYCODE.SPACE],
	  drop: [KEYCODE.SPACE],
	  cancel: [KEYCODE.ESC],
	  up: [KEYCODE.UP, KEYCODE.LEFT],
	  down: [KEYCODE.DOWN, KEYCODE.RIGHT]
	};
	var defaultProps = {
	  axis: 'y',
	  disableAutoscroll: false,
	  distance: 0,
	  getHelperDimensions: defaultGetHelperDimensions,
	  hideSortableGhost: true,
	  lockOffset: '50%',
	  lockToContainerEdges: false,
	  pressDelay: 0,
	  pressThreshold: 5,
	  keyCodes: defaultKeyCodes,
	  shouldCancelStart: defaultShouldCancelStart,
	  transitionDuration: 300,
	  useWindowAsScrollContainer: false
	};
	var omittedProps = Object.keys(propTypes);
	function validateProps(props) {
	  invariant_1(!(props.distance && props.pressDelay), 'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.');
	}

	function _finallyRethrows(body, finalizer) {
	  try {
	    var result = body();
	  } catch (e) {
	    return finalizer(true, e);
	  }

	  if (result && result.then) {
	    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	  }

	  return finalizer(false, value);
	}
	function sortableContainer(WrappedComponent) {
	  var _class, _temp;

	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    withRef: false
	  };
	  return _temp = _class = function (_React$Component) {
	    inherits(WithSortableContainer, _React$Component);

	    function WithSortableContainer(props) {
	      var _this;

	      classCallCheck(this, WithSortableContainer);

	      _this = possibleConstructorReturn(this, getPrototypeOf(WithSortableContainer).call(this, props));

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "state", {});

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleStart", function (event) {
	        var _this$props = _this.props,
	            distance = _this$props.distance,
	            shouldCancelStart = _this$props.shouldCancelStart;

	        if (event.button === 2 || shouldCancelStart(event)) {
	          return;
	        }

	        _this.touched = true;
	        _this.position = getPosition(event);
	        var node = closest(event.target, function (el) {
	          return el.sortableInfo != null;
	        });

	        if (node && node.sortableInfo && _this.nodeIsChild(node) && !_this.state.sorting) {
	          var useDragHandle = _this.props.useDragHandle;
	          var _node$sortableInfo = node.sortableInfo,
	              index = _node$sortableInfo.index,
	              collection = _node$sortableInfo.collection,
	              disabled = _node$sortableInfo.disabled;

	          if (disabled) {
	            return;
	          }

	          if (useDragHandle && !closest(event.target, isSortableHandle)) {
	            return;
	          }

	          _this.manager.active = {
	            collection: collection,
	            index: index
	          };

	          if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
	            event.preventDefault();
	          }

	          if (!distance) {
	            if (_this.props.pressDelay === 0) {
	              _this.handlePress(event);
	            } else {
	              _this.pressTimer = setTimeout(function () {
	                return _this.handlePress(event);
	              }, _this.props.pressDelay);
	            }
	          }
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "nodeIsChild", function (node) {
	        return node.sortableInfo.manager === _this.manager;
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleMove", function (event) {
	        var _this$props2 = _this.props,
	            distance = _this$props2.distance,
	            pressThreshold = _this$props2.pressThreshold;

	        if (!_this.state.sorting && _this.touched && !_this._awaitingUpdateBeforeSortStart) {
	          var position = getPosition(event);
	          var delta = {
	            x: _this.position.x - position.x,
	            y: _this.position.y - position.y
	          };
	          var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
	          _this.delta = delta;

	          if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
	            clearTimeout(_this.cancelTimer);
	            _this.cancelTimer = setTimeout(_this.cancel, 0);
	          } else if (distance && combinedDelta >= distance && _this.manager.isActive()) {
	            _this.handlePress(event);
	          }
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleEnd", function () {
	        _this.touched = false;

	        _this.cancel();
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "cancel", function () {
	        var distance = _this.props.distance;
	        var sorting = _this.state.sorting;

	        if (!sorting) {
	          if (!distance) {
	            clearTimeout(_this.pressTimer);
	          }

	          _this.manager.active = null;
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handlePress", function (event) {
	        try {
	          var active = _this.manager.getActive();

	          var _temp6 = function () {
	            if (active) {
	              var _temp7 = function _temp7() {
	                var index = _node.sortableInfo.index;
	                var margin = getElementMargin(_node);
	                var gridGap = getContainerGridGap(_this.container);

	                var containerBoundingRect = _this.scrollContainer.getBoundingClientRect();

	                var dimensions = _getHelperDimensions({
	                  index: index,
	                  node: _node,
	                  collection: _collection
	                });

	                _this.node = _node;
	                _this.margin = margin;
	                _this.gridGap = gridGap;
	                _this.width = dimensions.width;
	                _this.height = dimensions.height;
	                _this.marginOffset = {
	                  x: _this.margin.left + _this.margin.right + _this.gridGap.x,
	                  y: Math.max(_this.margin.top, _this.margin.bottom, _this.gridGap.y)
	                };
	                _this.boundingClientRect = _node.getBoundingClientRect();
	                _this.containerBoundingRect = containerBoundingRect;
	                _this.index = index;
	                _this.newIndex = index;
	                _this.axis = {
	                  x: _axis.indexOf('x') >= 0,
	                  y: _axis.indexOf('y') >= 0
	                };
	                _this.offsetEdge = getEdgeOffset(_node, _this.container);

	                if (_isKeySorting) {
	                  _this.initialOffset = getPosition(objectSpread({}, event, {
	                    pageX: _this.boundingClientRect.left,
	                    pageY: _this.boundingClientRect.top
	                  }));
	                } else {
	                  _this.initialOffset = getPosition(event);
	                }

	                _this.initialScroll = {
	                  left: _this.scrollContainer.scrollLeft,
	                  top: _this.scrollContainer.scrollTop
	                };
	                _this.initialWindowScroll = {
	                  left: window.pageXOffset,
	                  top: window.pageYOffset
	                };
	                _this.helper = _this.helperContainer.appendChild(cloneNode(_node));
	                setInlineStyles(_this.helper, {
	                  boxSizing: 'border-box',
	                  height: "".concat(_this.height, "px"),
	                  left: "".concat(_this.boundingClientRect.left - margin.left, "px"),
	                  pointerEvents: 'none',
	                  position: 'fixed',
	                  top: "".concat(_this.boundingClientRect.top - margin.top, "px"),
	                  width: "".concat(_this.width, "px")
	                });

	                if (_isKeySorting) {
	                  _this.helper.focus();
	                }

	                if (_hideSortableGhost) {
	                  _this.sortableGhost = _node;
	                  setInlineStyles(_node, {
	                    opacity: 0,
	                    visibility: 'hidden'
	                  });
	                }

	                _this.minTranslate = {};
	                _this.maxTranslate = {};

	                if (_isKeySorting) {
	                  var _ref = _useWindowAsScrollContainer ? {
	                    top: 0,
	                    left: 0,
	                    width: _this.contentWindow.innerWidth,
	                    height: _this.contentWindow.innerHeight
	                  } : _this.containerBoundingRect,
	                      containerTop = _ref.top,
	                      containerLeft = _ref.left,
	                      containerWidth = _ref.width,
	                      containerHeight = _ref.height;

	                  var containerBottom = containerTop + containerHeight;
	                  var containerRight = containerLeft + containerWidth;

	                  if (_this.axis.x) {
	                    _this.minTranslate.x = containerLeft - _this.boundingClientRect.left;
	                    _this.maxTranslate.x = containerRight - (_this.boundingClientRect.left + _this.width);
	                  }

	                  if (_this.axis.y) {
	                    _this.minTranslate.y = containerTop - _this.boundingClientRect.top;
	                    _this.maxTranslate.y = containerBottom - (_this.boundingClientRect.top + _this.height);
	                  }
	                } else {
	                  if (_this.axis.x) {
	                    _this.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this.boundingClientRect.left - _this.width / 2;
	                    _this.maxTranslate.x = (_useWindowAsScrollContainer ? _this.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this.boundingClientRect.left - _this.width / 2;
	                  }

	                  if (_this.axis.y) {
	                    _this.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this.boundingClientRect.top - _this.height / 2;
	                    _this.maxTranslate.y = (_useWindowAsScrollContainer ? _this.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this.boundingClientRect.top - _this.height / 2;
	                  }
	                }

	                if (_helperClass) {
	                  _helperClass.split(' ').forEach(function (className) {
	                    return _this.helper.classList.add(className);
	                  });
	                }

	                _this.listenerNode = event.touches ? _node : _this.contentWindow;

	                if (_isKeySorting) {
	                  _this.listenerNode.addEventListener('wheel', _this.handleKeyEnd, true);

	                  _this.listenerNode.addEventListener('mousedown', _this.handleKeyEnd, true);

	                  _this.listenerNode.addEventListener('keydown', _this.handleKeyDown);
	                } else {
	                  events.move.forEach(function (eventName) {
	                    return _this.listenerNode.addEventListener(eventName, _this.handleSortMove, false);
	                  });
	                  events.end.forEach(function (eventName) {
	                    return _this.listenerNode.addEventListener(eventName, _this.handleSortEnd, false);
	                  });
	                }

	                _this.setState({
	                  sorting: true,
	                  sortingIndex: index
	                });

	                if (_onSortStart) {
	                  _onSortStart({
	                    node: _node,
	                    index: index,
	                    collection: _collection,
	                    isKeySorting: _isKeySorting,
	                    nodes: _this.manager.getOrderedRefs(),
	                    helper: _this.helper
	                  }, event);
	                }

	                if (_isKeySorting) {
	                  _this.keyMove(0);
	                }
	              };

	              var _this$props3 = _this.props,
	                  _axis = _this$props3.axis,
	                  _getHelperDimensions = _this$props3.getHelperDimensions,
	                  _helperClass = _this$props3.helperClass,
	                  _hideSortableGhost = _this$props3.hideSortableGhost,
	                  updateBeforeSortStart = _this$props3.updateBeforeSortStart,
	                  _onSortStart = _this$props3.onSortStart,
	                  _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
	              var _node = active.node,
	                  _collection = active.collection;
	              var _isKeySorting = _this.manager.isKeySorting;

	              var _temp8 = function () {
	                if (typeof updateBeforeSortStart === 'function') {
	                  _this._awaitingUpdateBeforeSortStart = true;

	                  var _temp9 = _finallyRethrows(function () {
	                    var index = _node.sortableInfo.index;
	                    return Promise.resolve(updateBeforeSortStart({
	                      collection: _collection,
	                      index: index,
	                      node: _node,
	                      isKeySorting: _isKeySorting
	                    }, event)).then(function () {});
	                  }, function (_wasThrown, _result) {
	                    _this._awaitingUpdateBeforeSortStart = false;
	                    if (_wasThrown) throw _result;
	                    return _result;
	                  });

	                  if (_temp9 && _temp9.then) return _temp9.then(function () {});
	                }
	              }();

	              return _temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8);
	            }
	          }();

	          return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
	        } catch (e) {
	          return Promise.reject(e);
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleSortMove", function (event) {
	        var onSortMove = _this.props.onSortMove;

	        if (typeof event.preventDefault === 'function') {
	          event.preventDefault();
	        }

	        _this.updateHelperPosition(event);

	        _this.animateNodes();

	        _this.autoscroll();

	        if (onSortMove) {
	          onSortMove(event);
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleSortEnd", function (event) {
	        var _this$props4 = _this.props,
	            hideSortableGhost = _this$props4.hideSortableGhost,
	            onSortEnd = _this$props4.onSortEnd;
	        var _this$manager = _this.manager,
	            collection = _this$manager.active.collection,
	            isKeySorting = _this$manager.isKeySorting;

	        var nodes = _this.manager.getOrderedRefs();

	        if (_this.listenerNode) {
	          if (isKeySorting) {
	            _this.listenerNode.removeEventListener('wheel', _this.handleKeyEnd, true);

	            _this.listenerNode.removeEventListener('mousedown', _this.handleKeyEnd, true);

	            _this.listenerNode.removeEventListener('keydown', _this.handleKeyDown);
	          } else {
	            events.move.forEach(function (eventName) {
	              return _this.listenerNode.removeEventListener(eventName, _this.handleSortMove);
	            });
	            events.end.forEach(function (eventName) {
	              return _this.listenerNode.removeEventListener(eventName, _this.handleSortEnd);
	            });
	          }
	        }

	        _this.helper.parentNode.removeChild(_this.helper);

	        if (hideSortableGhost && _this.sortableGhost) {
	          setInlineStyles(_this.sortableGhost, {
	            opacity: '',
	            visibility: ''
	          });
	        }

	        for (var i = 0, len = nodes.length; i < len; i++) {
	          var _node2 = nodes[i];
	          var el = _node2.node;
	          _node2.edgeOffset = null;
	          _node2.boundingClientRect = null;
	          setTranslate3d(el, null);
	          setTransitionDuration(el, null);
	          _node2.translate = null;
	        }

	        _this.autoScroller.clear();

	        _this.manager.active = null;
	        _this.manager.isKeySorting = false;

	        _this.setState({
	          sorting: false,
	          sortingIndex: null
	        });

	        if (typeof onSortEnd === 'function') {
	          onSortEnd({
	            collection: collection,
	            newIndex: _this.newIndex,
	            oldIndex: _this.index,
	            isKeySorting: isKeySorting,
	            nodes: nodes
	          }, event);
	        }

	        _this.touched = false;
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "autoscroll", function () {
	        var disableAutoscroll = _this.props.disableAutoscroll;
	        var isKeySorting = _this.manager.isKeySorting;

	        if (disableAutoscroll) {
	          _this.autoScroller.clear();

	          return;
	        }

	        if (isKeySorting) {
	          var translate = objectSpread({}, _this.translate);

	          var scrollX = 0;
	          var scrollY = 0;

	          if (_this.axis.x) {
	            translate.x = Math.min(_this.maxTranslate.x, Math.max(_this.minTranslate.x, _this.translate.x));
	            scrollX = _this.translate.x - translate.x;
	          }

	          if (_this.axis.y) {
	            translate.y = Math.min(_this.maxTranslate.y, Math.max(_this.minTranslate.y, _this.translate.y));
	            scrollY = _this.translate.y - translate.y;
	          }

	          _this.translate = translate;
	          setTranslate3d(_this.helper, _this.translate);
	          _this.scrollContainer.scrollLeft += scrollX;
	          _this.scrollContainer.scrollTop += scrollY;
	          return;
	        }

	        _this.autoScroller.update({
	          height: _this.height,
	          maxTranslate: _this.maxTranslate,
	          minTranslate: _this.minTranslate,
	          translate: _this.translate,
	          width: _this.width
	        });
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAutoScroll", function (offset) {
	        _this.translate.x += offset.left;
	        _this.translate.y += offset.top;

	        _this.animateNodes();
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleKeyDown", function (event) {
	        var keyCode = event.keyCode;
	        var _this$props5 = _this.props,
	            shouldCancelStart = _this$props5.shouldCancelStart,
	            _this$props5$keyCodes = _this$props5.keyCodes,
	            customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;

	        var keyCodes = objectSpread({}, defaultKeyCodes, customKeyCodes);

	        if (_this.manager.active && !_this.manager.isKeySorting || !_this.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this.isValidSortingTarget(event))) {
	          return;
	        }

	        event.stopPropagation();
	        event.preventDefault();

	        if (keyCodes.lift.includes(keyCode) && !_this.manager.active) {
	          _this.keyLift(event);
	        } else if (keyCodes.drop.includes(keyCode) && _this.manager.active) {
	          _this.keyDrop(event);
	        } else if (keyCodes.cancel.includes(keyCode)) {
	          _this.newIndex = _this.manager.active.index;

	          _this.keyDrop(event);
	        } else if (keyCodes.up.includes(keyCode)) {
	          _this.keyMove(-1);
	        } else if (keyCodes.down.includes(keyCode)) {
	          _this.keyMove(1);
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "keyLift", function (event) {
	        var target = event.target;
	        var node = closest(target, function (el) {
	          return el.sortableInfo != null;
	        });
	        var _node$sortableInfo2 = node.sortableInfo,
	            index = _node$sortableInfo2.index,
	            collection = _node$sortableInfo2.collection;
	        _this.initialFocusedNode = target;
	        _this.manager.isKeySorting = true;
	        _this.manager.active = {
	          index: index,
	          collection: collection
	        };

	        _this.handlePress(event);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "keyMove", function (shift) {
	        var nodes = _this.manager.getOrderedRefs();

	        var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
	        var newIndex = _this.newIndex + shift;
	        var prevIndex = _this.newIndex;

	        if (newIndex < 0 || newIndex > lastIndex) {
	          return;
	        }

	        _this.prevIndex = prevIndex;
	        _this.newIndex = newIndex;
	        var targetIndex = getTargetIndex(_this.newIndex, _this.prevIndex, _this.index);
	        var target = nodes.find(function (_ref2) {
	          var node = _ref2.node;
	          return node.sortableInfo.index === targetIndex;
	        });
	        var targetNode = target.node;
	        var scrollDelta = _this.containerScrollDelta;
	        var targetBoundingClientRect = target.boundingClientRect || getScrollAdjustedBoundingClientRect(targetNode, scrollDelta);
	        var targetTranslate = target.translate || {
	          x: 0,
	          y: 0
	        };
	        var targetPosition = {
	          top: targetBoundingClientRect.top + targetTranslate.y - scrollDelta.top,
	          left: targetBoundingClientRect.left + targetTranslate.x - scrollDelta.left
	        };
	        var shouldAdjustForSize = prevIndex < newIndex;
	        var sizeAdjustment = {
	          x: shouldAdjustForSize && _this.axis.x ? targetNode.offsetWidth - _this.width : 0,
	          y: shouldAdjustForSize && _this.axis.y ? targetNode.offsetHeight - _this.height : 0
	        };

	        _this.handleSortMove({
	          pageX: targetPosition.left + sizeAdjustment.x,
	          pageY: targetPosition.top + sizeAdjustment.y,
	          ignoreTransition: shift === 0
	        });
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "keyDrop", function (event) {
	        _this.handleSortEnd(event);

	        if (_this.initialFocusedNode) {
	          _this.initialFocusedNode.focus();
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleKeyEnd", function (event) {
	        if (_this.manager.active) {
	          _this.keyDrop(event);
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "isValidSortingTarget", function (event) {
	        var useDragHandle = _this.props.useDragHandle;
	        var target = event.target;
	        var node = closest(target, function (el) {
	          return el.sortableInfo != null;
	        });
	        return node && node.sortableInfo && !node.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
	      });

	      validateProps(props);
	      _this.manager = new Manager();
	      _this.events = {
	        end: _this.handleEnd,
	        move: _this.handleMove,
	        start: _this.handleStart
	      };
	      return _this;
	    }

	    createClass(WithSortableContainer, [{
	      key: "getChildContext",
	      value: function getChildContext() {
	        return {
	          manager: this.manager
	        };
	      }
	    }, {
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        var _this2 = this;

	        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
	        var container = this.getContainer();
	        Promise.resolve(container).then(function (containerNode) {
	          _this2.container = containerNode;
	          _this2.document = _this2.container.ownerDocument || document;
	          var contentWindow = _this2.props.contentWindow || _this2.document.defaultView || window;
	          _this2.contentWindow = typeof contentWindow === 'function' ? contentWindow() : contentWindow;
	          _this2.scrollContainer = useWindowAsScrollContainer ? _this2.document.scrollingElement || _this2.document.documentElement : getScrollingParent(_this2.container) || _this2.container;
	          _this2.autoScroller = new AutoScroller(_this2.scrollContainer, _this2.onAutoScroll);
	          Object.keys(_this2.events).forEach(function (key) {
	            return events[key].forEach(function (eventName) {
	              return _this2.container.addEventListener(eventName, _this2.events[key], false);
	            });
	          });

	          _this2.container.addEventListener('keydown', _this2.handleKeyDown);
	        });
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        var _this3 = this;

	        if (this.helper && this.helper.parentNode) {
	          this.helper.parentNode.removeChild(this.helper);
	        }

	        if (!this.container) {
	          return;
	        }

	        Object.keys(this.events).forEach(function (key) {
	          return events[key].forEach(function (eventName) {
	            return _this3.container.removeEventListener(eventName, _this3.events[key]);
	          });
	        });
	        this.container.removeEventListener('keydown', this.handleKeyDown);
	      }
	    }, {
	      key: "updateHelperPosition",
	      value: function updateHelperPosition(event) {
	        var _this$props6 = this.props,
	            lockAxis = _this$props6.lockAxis,
	            lockOffset = _this$props6.lockOffset,
	            lockToContainerEdges = _this$props6.lockToContainerEdges,
	            transitionDuration = _this$props6.transitionDuration,
	            _this$props6$keyboard = _this$props6.keyboardSortingTransitionDuration,
	            keyboardSortingTransitionDuration = _this$props6$keyboard === void 0 ? transitionDuration : _this$props6$keyboard;
	        var isKeySorting = this.manager.isKeySorting;
	        var ignoreTransition = event.ignoreTransition;
	        var offset = getPosition(event);
	        var translate = {
	          x: offset.x - this.initialOffset.x,
	          y: offset.y - this.initialOffset.y
	        };
	        translate.y -= window.pageYOffset - this.initialWindowScroll.top;
	        translate.x -= window.pageXOffset - this.initialWindowScroll.left;
	        this.translate = translate;

	        if (lockToContainerEdges) {
	          var _getLockPixelOffsets = getLockPixelOffsets({
	            height: this.height,
	            lockOffset: lockOffset,
	            width: this.width
	          }),
	              _getLockPixelOffsets2 = slicedToArray(_getLockPixelOffsets, 2),
	              minLockOffset = _getLockPixelOffsets2[0],
	              maxLockOffset = _getLockPixelOffsets2[1];

	          var minOffset = {
	            x: this.width / 2 - minLockOffset.x,
	            y: this.height / 2 - minLockOffset.y
	          };
	          var maxOffset = {
	            x: this.width / 2 - maxLockOffset.x,
	            y: this.height / 2 - maxLockOffset.y
	          };
	          translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
	          translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
	        }

	        if (lockAxis === 'x') {
	          translate.y = 0;
	        } else if (lockAxis === 'y') {
	          translate.x = 0;
	        }

	        if (isKeySorting && keyboardSortingTransitionDuration && !ignoreTransition) {
	          setTransitionDuration(this.helper, keyboardSortingTransitionDuration);
	        }

	        setTranslate3d(this.helper, translate);
	      }
	    }, {
	      key: "animateNodes",
	      value: function animateNodes() {
	        var _this$props7 = this.props,
	            transitionDuration = _this$props7.transitionDuration,
	            hideSortableGhost = _this$props7.hideSortableGhost,
	            onSortOver = _this$props7.onSortOver;
	        var containerScrollDelta = this.containerScrollDelta,
	            windowScrollDelta = this.windowScrollDelta;
	        var nodes = this.manager.getOrderedRefs();
	        var sortingOffset = {
	          left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
	          top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
	        };
	        var isKeySorting = this.manager.isKeySorting;
	        var prevIndex = this.newIndex;
	        this.newIndex = null;

	        for (var i = 0, len = nodes.length; i < len; i++) {
	          var _node3 = nodes[i].node;
	          var index = _node3.sortableInfo.index;
	          var width = _node3.offsetWidth;
	          var height = _node3.offsetHeight;
	          var offset = {
	            height: this.height > height ? height / 2 : this.height / 2,
	            width: this.width > width ? width / 2 : this.width / 2
	          };
	          var mustShiftBackward = isKeySorting && index > this.index && index <= prevIndex;
	          var mustShiftForward = isKeySorting && index < this.index && index >= prevIndex;
	          var translate = {
	            x: 0,
	            y: 0
	          };
	          var edgeOffset = nodes[i].edgeOffset;

	          if (!edgeOffset) {
	            edgeOffset = getEdgeOffset(_node3, this.container);
	            nodes[i].edgeOffset = edgeOffset;

	            if (isKeySorting) {
	              nodes[i].boundingClientRect = getScrollAdjustedBoundingClientRect(_node3, containerScrollDelta);
	            }
	          }

	          var nextNode = i < nodes.length - 1 && nodes[i + 1];
	          var prevNode = i > 0 && nodes[i - 1];

	          if (nextNode && !nextNode.edgeOffset) {
	            nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);

	            if (isKeySorting) {
	              nextNode.boundingClientRect = getScrollAdjustedBoundingClientRect(nextNode.node, containerScrollDelta);
	            }
	          }

	          if (index === this.index) {
	            if (hideSortableGhost) {
	              this.sortableGhost = _node3;
	              setInlineStyles(_node3, {
	                opacity: 0,
	                visibility: 'hidden'
	              });
	            }

	            continue;
	          }

	          if (transitionDuration) {
	            setTransitionDuration(_node3, transitionDuration);
	          }

	          if (this.axis.x) {
	            if (this.axis.y) {
	              if (mustShiftForward || index < this.index && (sortingOffset.left + windowScrollDelta.left - offset.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height || sortingOffset.top + windowScrollDelta.top + offset.height <= edgeOffset.top)) {
	                translate.x = this.width + this.marginOffset.x;

	                if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
	                  if (nextNode) {
	                    translate.x = nextNode.edgeOffset.left - edgeOffset.left;
	                    translate.y = nextNode.edgeOffset.top - edgeOffset.top;
	                  }
	                }

	                if (this.newIndex === null) {
	                  this.newIndex = index;
	                }
	              } else if (mustShiftBackward || index > this.index && (sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top + height)) {
	                translate.x = -(this.width + this.marginOffset.x);

	                if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
	                  if (prevNode) {
	                    translate.x = prevNode.edgeOffset.left - edgeOffset.left;
	                    translate.y = prevNode.edgeOffset.top - edgeOffset.top;
	                  }
	                }

	                this.newIndex = index;
	              }
	            } else {
	              if (mustShiftBackward || index > this.index && sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left) {
	                translate.x = -(this.width + this.marginOffset.x);
	                this.newIndex = index;
	              } else if (mustShiftForward || index < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset.width) {
	                translate.x = this.width + this.marginOffset.x;

	                if (this.newIndex == null) {
	                  this.newIndex = index;
	                }
	              }
	            }
	          } else if (this.axis.y) {
	            if (mustShiftBackward || index > this.index && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top) {
	              translate.y = -(this.height + this.marginOffset.y);
	              this.newIndex = index;
	            } else if (mustShiftForward || index < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height) {
	              translate.y = this.height + this.marginOffset.y;

	              if (this.newIndex == null) {
	                this.newIndex = index;
	              }
	            }
	          }

	          setTranslate3d(_node3, translate);
	          nodes[i].translate = translate;
	        }

	        if (this.newIndex == null) {
	          this.newIndex = this.index;
	        }

	        if (isKeySorting) {
	          this.newIndex = prevIndex;
	        }

	        var oldIndex = isKeySorting ? this.prevIndex : prevIndex;

	        if (onSortOver && this.newIndex !== oldIndex) {
	          onSortOver({
	            collection: this.manager.active.collection,
	            index: this.index,
	            newIndex: this.newIndex,
	            oldIndex: oldIndex,
	            isKeySorting: isKeySorting,
	            nodes: nodes,
	            helper: this.helper
	          });
	        }
	      }
	    }, {
	      key: "getWrappedInstance",
	      value: function getWrappedInstance() {
	        invariant_1(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call');
	        return this.refs.wrappedInstance;
	      }
	    }, {
	      key: "getContainer",
	      value: function getContainer() {
	        var getContainer = this.props.getContainer;

	        if (typeof getContainer !== 'function') {
	          return reactDom.findDOMNode(this);
	        }

	        return getContainer(config.withRef ? this.getWrappedInstance() : undefined);
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var ref = config.withRef ? 'wrappedInstance' : null;
	        return React.createElement(WrappedComponent, _extends_1({
	          ref: ref
	        }, omit(this.props, omittedProps)));
	      }
	    }, {
	      key: "helperContainer",
	      get: function get() {
	        var helperContainer = this.props.helperContainer;

	        if (typeof helperContainer === 'function') {
	          return helperContainer();
	        }

	        return this.props.helperContainer || this.document.body;
	      }
	    }, {
	      key: "containerScrollDelta",
	      get: function get() {
	        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;

	        if (useWindowAsScrollContainer) {
	          return {
	            left: 0,
	            top: 0
	          };
	        }

	        return {
	          left: this.scrollContainer.scrollLeft - this.initialScroll.left,
	          top: this.scrollContainer.scrollTop - this.initialScroll.top
	        };
	      }
	    }, {
	      key: "windowScrollDelta",
	      get: function get() {
	        return {
	          left: this.contentWindow.pageXOffset - this.initialWindowScroll.left,
	          top: this.contentWindow.pageYOffset - this.initialWindowScroll.top
	        };
	      }
	    }]);

	    return WithSortableContainer;
	  }(React.Component), defineProperty(_class, "displayName", provideDisplayName('sortableList', WrappedComponent)), defineProperty(_class, "defaultProps", defaultProps), defineProperty(_class, "propTypes", propTypes), defineProperty(_class, "childContextTypes", {
	    manager: PropTypes.object.isRequired
	  }), _temp;
	}

	var propTypes$1 = {
	  index: PropTypes.number.isRequired,
	  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  disabled: PropTypes.bool
	};
	var omittedProps$1 = Object.keys(propTypes$1);
	function sortableElement(WrappedComponent) {
	  var _class, _temp;

	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    withRef: false
	  };
	  return _temp = _class = function (_React$Component) {
	    inherits(WithSortableElement, _React$Component);

	    function WithSortableElement() {
	      classCallCheck(this, WithSortableElement);

	      return possibleConstructorReturn(this, getPrototypeOf(WithSortableElement).apply(this, arguments));
	    }

	    createClass(WithSortableElement, [{
	      key: "componentDidMount",
	      value: function componentDidMount() {
	        this.register();
	      }
	    }, {
	      key: "componentDidUpdate",
	      value: function componentDidUpdate(prevProps) {
	        if (this.node) {
	          if (prevProps.index !== this.props.index) {
	            this.node.sortableInfo.index = this.props.index;
	          }

	          if (prevProps.disabled !== this.props.disabled) {
	            this.node.sortableInfo.disabled = this.props.disabled;
	          }
	        }

	        if (prevProps.collection !== this.props.collection) {
	          this.unregister(prevProps.collection);
	          this.register();
	        }
	      }
	    }, {
	      key: "componentWillUnmount",
	      value: function componentWillUnmount() {
	        this.unregister();
	      }
	    }, {
	      key: "register",
	      value: function register() {
	        var _this$props = this.props,
	            collection = _this$props.collection,
	            disabled = _this$props.disabled,
	            index = _this$props.index;
	        var node = reactDom.findDOMNode(this);
	        node.sortableInfo = {
	          collection: collection,
	          disabled: disabled,
	          index: index,
	          manager: this.context.manager
	        };
	        this.node = node;
	        this.ref = {
	          node: node
	        };
	        this.context.manager.add(collection, this.ref);
	      }
	    }, {
	      key: "unregister",
	      value: function unregister() {
	        var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.collection;
	        this.context.manager.remove(collection, this.ref);
	      }
	    }, {
	      key: "getWrappedInstance",
	      value: function getWrappedInstance() {
	        invariant_1(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call');
	        return this.refs.wrappedInstance;
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var ref = config.withRef ? 'wrappedInstance' : null;
	        return React.createElement(WrappedComponent, _extends_1({
	          ref: ref
	        }, omit(this.props, omittedProps$1)));
	      }
	    }]);

	    return WithSortableElement;
	  }(React.Component), defineProperty(_class, "displayName", provideDisplayName('sortableElement', WrappedComponent)), defineProperty(_class, "contextTypes", {
	    manager: PropTypes.object.isRequired
	  }), defineProperty(_class, "propTypes", propTypes$1), defineProperty(_class, "defaultProps", {
	    collection: 0
	  }), _temp;
	}

	exports.SortableContainer = sortableContainer;
	exports.sortableContainer = sortableContainer;
	exports.SortableElement = sortableElement;
	exports.sortableElement = sortableElement;
	exports.SortableHandle = sortableHandle;
	exports.sortableHandle = sortableHandle;
	exports.arrayMove = arrayMove;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
