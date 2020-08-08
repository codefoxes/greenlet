/** @license ColorWings v1.0.0
* color-wings-preview.js
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function (React$1) {
	'use strict';

	var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;

	window.cw = window.parent.cw;

	if ('cwPreviewObject' in window) {
	  cw.Evt.emit('preview-object-ready', window.cwPreviewObject);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

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

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

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
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  return function () {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (_isNativeReflectConstruct()) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var STORE = {};
	var COUNTER = 0;
	var Store = /*#__PURE__*/function () {
	  function Store(initialState, name) {
	    _classCallCheck(this, Store);

	    this.name = '';
	    this._listeners = [];
	    if (name) this.name = name;
	    this.idx = COUNTER++;
	    STORE[this.idx] = initialState;
	    this.initialState = initialState;
	  }

	  _createClass(Store, [{
	    key: "get",
	    value: function get() {
	      return STORE[this.idx];
	    }
	  }, {
	    key: "set",
	    value: function set(state, info) {
	      if (this.condition) {
	        var newState = this.condition(Object.assign(Object.assign({}, STORE[this.idx]), state(STORE[this.idx])), info);
	        if (newState) STORE[this.idx] = newState;
	      } else {
	        STORE[this.idx] = Object.assign(Object.assign({}, STORE[this.idx]), state(STORE[this.idx]));
	      }

	      this._listeners.forEach(function (fn) {
	        return fn();
	      });
	    }
	  }, {
	    key: "replace",
	    value: function replace(state, info) {
	      if (this.condition) {
	        var newState = this.condition(state(STORE[this.idx]), info);
	        if (newState) STORE[this.idx] = newState;
	      } else {
	        STORE[this.idx] = state(STORE[this.idx]);
	      }

	      this._listeners.forEach(function (fn) {
	        return fn();
	      });
	    }
	  }, {
	    key: "setCondition",
	    value: function setCondition(func) {
	      this.condition = func;
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      STORE[this.idx] = this.initialState;
	    }
	  }, {
	    key: "subscribe",
	    value: function subscribe(fn) {
	      this._listeners.push(fn);
	    }
	  }, {
	    key: "unsubscribe",
	    value: function unsubscribe(fn) {
	      this._listeners = this._listeners.filter(function (f) {
	        return f !== fn;
	      });
	    }
	  }, {
	    key: "overrideInitialState",
	    value: function overrideInitialState(state) {
	      // Hack method to override initialState
	      STORE[this.idx] = state;
	      this.initialState = state;
	    }
	  }]);

	  return Store;
	}(); // React Specific.

	var Subscribe = /*#__PURE__*/function (_React$PureComponent) {
	  _inherits(Subscribe, _React$PureComponent);

	  var _super = _createSuper(Subscribe);

	  function Subscribe() {
	    var _this;

	    _classCallCheck(this, Subscribe);

	    _this = _super.apply(this, arguments);
	    _this.stores = [];

	    _this.onUpdate = function () {
	      _this.forceUpdate();
	    };

	    return _this;
	  }

	  _createClass(Subscribe, [{
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps() {
	      this._unsubscribe();
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this._unsubscribe();
	    }
	  }, {
	    key: "_unsubscribe",
	    value: function _unsubscribe() {
	      var _this2 = this;

	      this.stores.forEach(function (store) {
	        store.unsubscribe(_this2.onUpdate);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this,
	          _this$props;

	      var stores = [];
	      var states = this.props.to.map(function (store) {
	        store.unsubscribe(_this3.onUpdate);
	        store.subscribe(_this3.onUpdate);
	        stores.push(store);
	        return store.get();
	      });
	      this.stores = stores;
	      return (_this$props = this.props).children.apply(_this$props, _toConsumableArray(states));
	    }
	  }]);

	  return Subscribe;
	}(React.PureComponent);
	function useStore(store) {
	  var _React$useState = React.useState(store.get()),
	      _React$useState2 = _slicedToArray(_React$useState, 2),
	      state = _React$useState2[0],
	      setState = _React$useState2[1];

	  function updateState() {
	    setState(store.get());
	  }

	  React.useEffect(function () {
	    store.subscribe(updateState);
	    return function () {
	      return store.unsubscribe(updateState);
	    };
	  });
	  return state;
	}

	var initialState = {
	  focusLines: {
	    top: {},
	    right: {},
	    bottom: {},
	    left: {}
	  },
	  focusDetails: {
	    style: {},
	    selector: ''
	  },
	  focused: false,
	  focusOpacity: 1,
	  detailsOpacity: 1
	};

	var FocusClass = /*#__PURE__*/function (_Store) {
	  _inherits(FocusClass, _Store);

	  var _super = _createSuper(FocusClass);

	  function FocusClass() {
	    _classCallCheck(this, FocusClass);

	    return _super.apply(this, arguments);
	  }

	  _createClass(FocusClass, [{
	    key: "moveFocus",
	    value: function moveFocus(newState) {
	      this.set(function () {
	        return newState;
	      });
	    }
	  }, {
	    key: "lockFocus",
	    value: function lockFocus() {
	      this.set(function () {
	        return {
	          focused: true
	        };
	      });
	    }
	  }, {
	    key: "unlockFocus",
	    value: function unlockFocus() {
	      this.set(function () {
	        return initialState;
	      });
	    }
	  }, {
	    key: "isFocused",
	    value: function isFocused() {
	      return this.get().focused;
	    }
	  }, {
	    key: "reduceFocusOpacity",
	    value: function reduceFocusOpacity() {
	      this.set(function () {
	        return {
	          focusOpacity: 0,
	          detailsOpacity: 1
	        };
	      });
	    }
	  }, {
	    key: "increaseFocusOpacity",
	    value: function increaseFocusOpacity() {
	      this.set(function () {
	        return {
	          focusOpacity: 1,
	          detailsOpacity: 1
	        };
	      });
	    }
	  }]);

	  return FocusClass;
	}(Store);

	var FocusStore = new FocusClass(initialState);

	var _cw = cw,
	    Evt = _cw.Evt;

	var getSelector = function getSelector(el) {
	  if (el === document.body) {
	    return 'body';
	  }

	  if (el.id !== '') {
	    return "#".concat(el.id);
	  }

	  var selector = '';
	  var selectors = [];
	  el.classList.forEach(function (cls) {
	    // Ignore classes
	    if (selectors.length >= 2) {
	      return false;
	    } // Ignore autogen sequential classes


	    if (/\w*-\d*/.test("".concat(cls))) {
	      return false;
	    }

	    selector += ".".concat(cls);
	    selectors.push(cls);
	  });

	  if (el.classList.length === 0) {
	    selector = el.tagName.toLowerCase();
	  }

	  var parentSelector = getSelector(el.parentElement); // Ignore classes

	  if ("".concat(parentSelector, " ").concat(selector).length > 30) {
	    return selector;
	  }

	  return "".concat(parentSelector, " ").concat(selector);
	};

	var getFocusLinesNewState = function getFocusLinesNewState(client) {
	  var offsetTop = window.pageYOffset + client.top;
	  return {
	    top: {
	      borderTopWidth: '1px',
	      width: client.width,
	      left: client.left,
	      top: offsetTop
	    },
	    right: {
	      borderRightWidth: '1px',
	      height: client.height,
	      left: client.right,
	      top: offsetTop
	    },
	    bottom: {
	      borderTopWidth: '1px',
	      width: client.width + 1,
	      left: client.left,
	      top: window.pageYOffset + client.bottom
	    },
	    left: {
	      borderRightWidth: '1px',
	      height: client.height,
	      left: client.left,
	      top: offsetTop
	    }
	  };
	};

	var currentTarget;

	var moveFocus = function moveFocus(ip) {
	  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (FocusStore.isFocused() && force === false) {
	    return;
	  }

	  var isSelector = false;

	  if ((ip === undefined || ip === false) && currentTarget !== undefined) ; else if (ip.target === undefined) {
	    currentTarget = document.querySelector(ip);
	    isSelector = true;
	  } else {
	    currentTarget = ip.target;
	  }

	  var client = currentTarget.getBoundingClientRect();
	  var offsetTop = window.pageYOffset + client.top;
	  var detailsTop = offsetTop - 24 < window.pageYOffset ? offsetTop + client.height : offsetTop - 24;

	  if (detailsTop >= document.body.clientHeight) {
	    detailsTop = 0;
	  }

	  var newState = {
	    focusLines: getFocusLinesNewState(client),
	    focusDetails: {
	      style: {
	        left: client.left,
	        top: detailsTop,
	        height: '24px',
	        background: '#7CB342'
	      },
	      selector: isSelector ? ip : getSelector(currentTarget)
	    }
	  };
	  FocusStore.moveFocus(newState);
	};

	var lockUnlockFocus = function lockUnlockFocus(e) {
	  var op = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (e) {
	    e.preventDefault();
	    e.stopPropagation();
	  }

	  if (FocusStore.isFocused() && op !== 'lock') {
	    FocusStore.unlockFocus();
	    Evt.emit('focusUnlocked', FocusStore.get().focusDetails.selector);
	  } else {
	    FocusStore.lockFocus();
	    Evt.emit('focusLocked', {
	      currentSelector: FocusStore.get().focusDetails.selector,
	      currentTarget: currentTarget
	    });
	  }

	  cw.MainStore.setSelectorClass();
	};

	var reduceFocus = function reduceFocus() {
	  FocusStore.reduceFocusOpacity();
	};

	var increaseFocus = function increaseFocus() {
	  FocusStore.increaseFocusOpacity();
	};

	var updateFocus = function updateFocus() {
	  if (currentTarget === undefined) {
	    return;
	  }

	  moveFocus(false, true);
	};

	var updateSelector = function updateSelector(selector) {
	  var el = null;

	  try {
	    el = document.querySelector(selector);
	  } catch (_unused) {}

	  if (el === null) {
	    cw.MainStore.setSelectorClass('invalid');
	  } else {
	    moveFocus(selector, true);
	    lockUnlockFocus(false, 'lock');
	  }
	};

	var bodyContent = document.querySelectorAll('body > *:not(script):not(style):not(#color-wings)');
	bodyContent.forEach(function (el) {
	  el.addEventListener('mouseover', moveFocus);
	});
	cw.Evt.on('mount-colorwings', function () {
	  bodyContent.forEach(function (el) {
	    el.addEventListener('click', lockUnlockFocus, true);
	  });
	});
	cw.Evt.on('unmount-colorwings', function () {
	  bodyContent.forEach(function (el) {
	    el.removeEventListener('click', lockUnlockFocus, true);
	  });
	});
	document.body.addEventListener('mouseleave', reduceFocus);
	document.body.addEventListener('mouseenter', increaseFocus); // Quick Select

	var selectors = [{
	  name: 'Body',
	  sel: 'body'
	}, {
	  name: 'Header',
	  sel: '.site-header'
	}, {
	  name: 'Content Wrapper',
	  sel: '.site-content'
	}, {
	  name: 'Main Content',
	  sel: '.main'
	}, {
	  name: 'Sidebar',
	  sel: '.sidebar'
	}, {
	  name: 'Footer',
	  sel: '.site-footer'
	}, {
	  name: 'Buttons',
	  sel: 'button'
	}, {
	  name: 'Links',
	  sel: 'a'
	}, {
	  name: 'Inputs',
	  sel: 'input'
	}, {
	  name: 'H1',
	  sel: 'h1'
	}, {
	  name: 'H2',
	  sel: 'h2'
	}, {
	  name: 'Paragraphs',
	  sel: 'p'
	}, {
	  name: 'Code',
	  sel: 'code'
	}, {
	  name: 'Article Card',
	  sel: '.entry-article'
	}];
	var filtered = selectors.filter(function (item) {
	  return null !== document.querySelector(item.sel);
	});
	cw.MainStore.setQuickSelectors(filtered);
	cw.Evt.on('select-element', function (selector) {
	  moveFocus(selector, true);
	  lockUnlockFocus(false, 'lock');
	});
	cw.Evt.on('update-selector', function (selector) {
	  updateSelector(selector);
	});

	var $ = jQuery;
	function debounce(callback, wait) {
	  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var timeout = null;
	  return function () {
	    var _arguments = arguments,
	        _this = this;

	    var callNow = immediate && !timeout;

	    var next = function next() {
	      return callback.apply(_this, _arguments);
	    };

	    clearTimeout(timeout);
	    timeout = setTimeout(next, wait);

	    if (callNow) {
	      next();
	    }
	  };
	}

	var addCWStylesTag = function addCWStylesTag() {
	  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cw-applied-styles';
	  var styleTag = document.createElement('style');
	  styleTag.id = id;
	  document.head.appendChild(styleTag);
	  return styleTag;
	};

	var addCWLinkTag = function addCWLinkTag(id) {
	  var linkTag = document.createElement('link');
	  linkTag.id = id;
	  linkTag.rel = 'stylesheet';
	  document.head.appendChild(linkTag);
	  return linkTag;
	};

	var styleTagMain = addCWStylesTag();
	var styleTagTemp = addCWStylesTag('cw-temp-styles');
	var fontLinkTag = addCWLinkTag('cw-applied-font');

	var addStyles = function addStyles() {
	  var _cw$StylesStore$get = cw.StylesStore.get(),
	      allOutputs = _cw$StylesStore$get.allOutputs;

	  var output = '';

	  for (var page in allOutputs) {
	    if (!allOutputs.hasOwnProperty(page)) {
	      continue;
	    }

	    if (page === 'global') {
	      output += allOutputs[page];
	    } else if (page in window.cwPreviewObject && window.cwPreviewObject[page] === '1') {
	      output += allOutputs[page];
	    }
	  }

	  styleTagMain.innerHTML = output;
	  styleTagTemp.innerHTML = '';
	};

	var addTempStyles = function addTempStyles(styleOutput) {
	  return styleTagTemp.innerHTML = styleOutput;
	};

	var debouncedUpdateFocus = debounce(updateFocus, 500, true); // Not Needed

	var addFont = function addFont() {
	  var _cw$MainStore$get = cw.MainStore.get(),
	      currentPage = _cw$MainStore$get.currentPage,
	      allFonts = _cw$MainStore$get.allFonts;

	  for (var source in allFonts[currentPage]) {
	    if (!allFonts[currentPage].hasOwnProperty(source)) {
	      continue;
	    }

	    var fonts = allFonts[currentPage][source];

	    if ('google' === source) {
	      var args = [];

	      for (var family in fonts) {
	        if (!fonts.hasOwnProperty(family)) {
	          continue;
	        }

	        var weights = fonts[family];
	        var familyFormatted = family.replace(' ', '+');
	        args.push("".concat(familyFormatted, ":").concat(weights.join(',')));
	      }

	      fontLinkTag.href = "https://fonts.googleapis.com/css?family=".concat(args.join('|'), "&display=fallback");
	    } // Todo: Add custom fonts.

	  }
	};

	cw.StylesStore.registerSpecialSubscriber(addTempStyles);
	cw.StylesStore.registerSpecialSubscriber(addFont, 'fontManager');
	cw.StylesStore.subscribe(addStyles);
	cw.StylesStore.subscribe(debouncedUpdateFocus);
	window.addEventListener('resize', debouncedUpdateFocus);

	function Focuser() {
	  var _useStore = useStore(FocusStore),
	      focusLines = _useStore.focusLines,
	      focusOpacity = _useStore.focusOpacity;

	  return /*#__PURE__*/React.createElement("div", {
	    id: "cw-focuser",
	    style: {
	      opacity: focusOpacity
	    }
	  }, /*#__PURE__*/React.createElement("div", {
	    className: "cw-focus-line",
	    id: "cw-focuser-top",
	    style: focusLines.top
	  }), /*#__PURE__*/React.createElement("div", {
	    className: "cw-focus-line",
	    id: "cw-focuser-right",
	    style: focusLines.right
	  }), /*#__PURE__*/React.createElement("div", {
	    className: "cw-focus-line",
	    id: "cw-focuser-bottom",
	    style: focusLines.bottom
	  }), /*#__PURE__*/React.createElement("div", {
	    className: "cw-focus-line",
	    id: "cw-focuser-left",
	    style: focusLines.left
	  }));
	}

	function FocusDetails() {
	  var _useStore = useStore(FocusStore),
	      focusDetails = _useStore.focusDetails,
	      detailsOpacity = _useStore.detailsOpacity;

	  var styles = _objectSpread2({}, focusDetails.style, {
	    opacity: detailsOpacity
	  });

	  return /*#__PURE__*/React.createElement("div", {
	    id: "cw-focus-details",
	    className: "cw-focus-details",
	    style: styles
	  }, /*#__PURE__*/React.createElement("div", {
	    id: "cw-focus-selector",
	    className: "cw-selector"
	  }, focusDetails.selector));
	}

	var initialState$1 = {
	  currentTarget: '',
	  showDomTree: false
	};

	var DomTreeClass = /*#__PURE__*/function (_Store) {
	  _inherits(DomTreeClass, _Store);

	  var _super = _createSuper(DomTreeClass);

	  function DomTreeClass() {
	    _classCallCheck(this, DomTreeClass);

	    return _super.apply(this, arguments);
	  }

	  _createClass(DomTreeClass, [{
	    key: "showDomTree",
	    value: function showDomTree(data) {
	      this.set(function () {
	        return {
	          currentTarget: data.currentTarget,
	          showDomTree: true
	        };
	      });
	    }
	  }]);

	  return DomTreeClass;
	}(Store);

	var DomTreeStore = new DomTreeClass(initialState$1);

	var Evt$1 = window.cw.Evt;
	Evt$1.on('focusLocked', function (data) {
	  return DomTreeStore.showDomTree(data);
	});
	var getSelector$1 = function getSelector(el) {
	  var domTree = [];
	  var element = {
	    tag: '',
	    id: '',
	    "class": []
	  }; // Todo: what if el === null ?

	  if (el === document.body || null === el) {
	    element.tag = 'body';
	    domTree.push(element);
	    return domTree;
	  }

	  element.tag = el.tagName.toLowerCase();

	  if (el.id !== '') {
	    element.id = el.id;
	  }

	  var selectors = [];
	  el.classList.forEach(function (cls) {
	    if (selectors.length >= 4) {
	      return false;
	    } // Ignore autogen sequential classes.


	    if (/\w*-\d*/.test("".concat(cls))) {
	      return false;
	    }

	    selectors.push(cls);
	  });
	  element["class"] = selectors;
	  var parentDomTree = getSelector(el.parentElement);
	  parentDomTree.push(element);
	  return parentDomTree;
	};

	var styles = "#cw-domtree {\n  width: 100%;\n  border-top: 1px solid #dddddd;\n  bottom: 0;\n  position: fixed;\n  background: #eeeeee;\n  font-size: 14px;\n  color: #444444;\n  line-height: 16px;\n  margin: 0; }\n  #cw-domtree .cw-domtree-list {\n    white-space: nowrap;\n    list-style-type: none;\n    margin: 0; }\n    #cw-domtree .cw-domtree-list .cw-node-attributes {\n      display: none;\n      position: absolute;\n      bottom: 100%;\n      background: #eeeeee;\n      height: auto;\n      min-width: 15em;\n      color: #444;\n      line-height: 16px;\n      margin: 0;\n      transition: all .5s ease-in-out;\n      border: 1px solid #ddd;\n      border-radius: 3px;\n      left: 0; }\n    #cw-domtree .cw-domtree-list .cw-node-attributes li {\n      list-style-type: none; }\n  #cw-domtree .cw-domtree-elements:hover > .cw-node-attributes {\n    display: block; }\n  #cw-domtree .cw-domtree-elements {\n    display: inline-block;\n    padding: 0 20px;\n    background-color: #ddd;\n    line-height: 2;\n    margin: 0;\n    position: relative; }\n  #cw-domtree .cw-domtree-elements:hover, #cw-domtree .cw-domtree-elements:hover::after {\n    background-color: #7cb342;\n    color: #fff; }\n  #cw-domtree .cw-domtree-elements::after {\n    content: \"\";\n    position: absolute;\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    top: 0;\n    background-color: #ddd;\n    border-top-right-radius: 5px;\n    transform: scale(0.707) rotate(45deg);\n    box-shadow: 1px -1px rgba(0, 0, 0, 0.25);\n    z-index: 1;\n    margin-left: 5px; }\n\nh3.cw-selection-title {\n  font-size: 14px;\n  padding: 12px 5px;\n  font-weight: 600; }\n";

	function highlightReducer(highlighted, value) {
	  if (!value) {
	    return -1;
	  }

	  const {
	    key,
	    options
	  } = value;

	  if (!options) {
	    return highlighted;
	  }

	  let newHighlighted = -1;

	  if (key === 'ArrowDown' && highlighted < options.length - 1) {
	    newHighlighted = highlighted + 1;
	  } else if (key === 'ArrowDown' && highlighted === options.length - 1) {
	    newHighlighted = 0;
	  } else if (key === 'ArrowUp' && highlighted > 0) {
	    newHighlighted = highlighted - 1;
	  } else if (key === 'ArrowUp' && highlighted === 0) {
	    newHighlighted = options.length - 1;
	  }

	  const option = options[newHighlighted];

	  if (option && option.disabled) {
	    return highlightReducer(newHighlighted, {
	      key,
	      options
	    });
	  }

	  return newHighlighted;
	}

	function getDisplayValue(value) {
	  if (value && typeof value === 'object') {
	    if (Array.isArray(value)) {
	      return value.map(singleOption => singleOption.name).join(', ');
	    }

	    return value.name;
	  }

	  return '';
	}

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function flattenOptions(options) {
	  if (!Array.isArray(options)) {
	    return [];
	  }

	  const nextOptions = [];
	  options.forEach((option, index) => {
	    if ('type' in option && option.type === 'group') {
	      const id = option.name.replace(/\s+/g, '-').toLowerCase() + "-" + index;
	      option.items.forEach(groupOption => {
	        const nextGroupOption = _objectSpread({}, groupOption);

	        nextGroupOption.groupId = id;
	        nextGroupOption.groupName = option.name;
	        nextOptions.push(nextGroupOption);
	      });
	      return;
	    }

	    nextOptions.push(_objectSpread(_objectSpread({}, option), {}, {
	      index
	    }));
	  });
	  return nextOptions;
	}

	function groupOptions(options) {
	  const nextOptions = [];
	  options.forEach((option, i) => {
	    if ('groupId' in option) {
	      const nextOption = Object.assign({}, option);
	      const groupIndex = nextOptions.findIndex(el => 'groupId' in el && el.groupId === nextOption.groupId);
	      nextOption.index = i;

	      if (groupIndex > -1) {
	        nextOptions[groupIndex].items.push(nextOption);
	      } else {
	        nextOptions.push({
	          items: [nextOption],
	          groupId: option.groupId,
	          type: 'group',
	          name: option.groupName
	        });
	      }
	    } else {
	      nextOptions.push(option);
	    }
	  });
	  return nextOptions;
	}

	function getNewValue(value, oldValue, multiple) {
	  if (!multiple) {
	    return value;
	  }

	  let newValue = null;

	  if (oldValue && !Array.isArray(oldValue)) {
	    newValue = [oldValue];
	  } else if (!oldValue) {
	    newValue = [];
	  } else {
	    newValue = [...oldValue];
	  }

	  const valueIndex = newValue.findIndex(val => val === value);

	  if (valueIndex >= 0) {
	    newValue.splice(valueIndex, 1);
	  } else {
	    newValue.push(value);
	  }

	  return newValue;
	}

	function getOption(value, defaultOptions) {
	  if (value) {
	    if (Array.isArray(value)) {
	      return value.map(singleValue => defaultOptions.find(option => option.value === singleValue));
	    }

	    return defaultOptions.find(option => option.value === value) || null;
	  }

	  return null;
	}

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var fuse = createCommonjsModule(function (module, exports) {
	/*!
	 * Fuse.js v3.6.1 - Lightweight fuzzy-search (http://fusejs.io)
	 * 
	 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
	 * All Rights Reserved. Apache Software License 2.0
	 * 
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){return (n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}var i=r(1),a=r(7),s=a.get,c=(a.deepValue,a.isArray),h=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,a=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.caseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.id,S=void 0===b?null:b,x=r.keys,M=void 0===x?[]:x,_=r.shouldSort,w=void 0===_||_,L=r.getFn,A=void 0===L?s:L,O=r.sortFn,C=void 0===O?function(e,t){return e.score-t.score}:O,j=r.tokenize,P=void 0!==j&&j,I=r.matchAllTokens,F=void 0!==I&&I,T=r.includeMatches,N=void 0!==T&&T,z=r.includeScore,E=void 0!==z&&z,W=r.verbose,K=void 0!==W&&W;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,minMatchCharLength:k,id:S,keys:M,includeMatches:N,includeScore:E,shouldSort:w,getFn:A,sortFn:C,verbose:K,tokenize:P,matchAllTokens:F},this.setCollection(t),this._processKeys(M);}var t,r;return t=e,(r=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"_processKeys",value:function(e){if(this._keyWeights={},this._keyNames=[],e.length&&"string"==typeof e[0])for(var t=0,r=e.length;t<r;t+=1){var n=e[t];this._keyWeights[n]=1,this._keyNames.push(n);}else {for(var a=0,s=0,c=e.length;s<c;s+=1){var h=e[s];if(!h.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var l=h.name;if(this._keyNames.push(l),!h.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var u=h.weight;if(u<0||u>1)throw new Error('"weight" property in key must bein the range of [0, 1)');this._keyWeights[l]=u,a+=u;}if(a>1)throw new Error("Total of weights cannot exceed 1")}}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o);return this._computeScore(i),this.options.shouldSort&&this._sort(i),t.limit&&"number"==typeof t.limit&&(i=i.slice(0,t.limit)),this._format(i)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,o=r.length;n<o;n+=1)t.push(new i(r[n],this.options));return {tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return o}for(var s=0,c=r.length;s<c;s+=1)for(var h=r[s],l=0,u=this._keyNames.length;l<u;l+=1){var f=this._keyNames[l];this._analyze({key:f,value:this.options.getFn(h,f),record:h,index:s},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});}return o}},{key:"_analyze",value:function(e,t){var r=this,n=e.key,o=e.arrayIndex,i=void 0===o?-1:o,a=e.value,s=e.record,h=e.index,l=t.tokenSearchers,u=void 0===l?[]:l,f=t.fullSearcher,v=t.resultMap,p=void 0===v?{}:v,d=t.results,g=void 0===d?[]:d;!function e(t,o,i,a){if(null!=o)if("string"==typeof o){var s=!1,h=-1,l=0;r._log("\nKey: ".concat(""===n?"--":n));var v=f.search(o);if(r._log('Full text: "'.concat(o,'", score: ').concat(v.score)),r.options.tokenize){for(var d=o.split(r.options.tokenSeparator),y=d.length,m=[],k=0,b=u.length;k<b;k+=1){var S=u[k];r._log('\nPattern: "'.concat(S.pattern,'"'));for(var x=!1,M=0;M<y;M+=1){var _=d[M],w=S.search(_),L={};w.isMatch?(L[_]=w.score,s=!0,x=!0,m.push(w.score)):(L[_]=1,r.options.matchAllTokens||m.push(1)),r._log('Token: "'.concat(_,'", score: ').concat(L[_]));}x&&(l+=1);}h=m[0];for(var A=m.length,O=1;O<A;O+=1)h+=m[O];h/=A,r._log("Token score average:",h);}var C=v.score;h>-1&&(C=(C+h)/2),r._log("Score average:",C);var j=!r.options.tokenize||!r.options.matchAllTokens||l>=u.length;if(r._log("\nCheck Matches: ".concat(j)),(s||v.isMatch)&&j){var P={key:n,arrayIndex:t,value:o,score:C};r.options.includeMatches&&(P.matchedIndices=v.matchedIndices);var I=p[a];I?I.output.push(P):(p[a]={item:i,output:[P]},g.push(p[a]));}}else if(c(o))for(var F=0,T=o.length;F<T;F+=1)e(F,o[F],i,a);}(i,a,s,h);}},{key:"_computeScore",value:function(e){this._log("\n\nComputing score:\n");for(var t=this._keyWeights,r=!!Object.keys(t).length,n=0,o=e.length;n<o;n+=1){for(var i=e[n],a=i.output,s=a.length,c=1,h=0;h<s;h+=1){var l=a[h],u=l.key,f=r?t[u]:1,v=0===l.score&&t&&t[u]>0?Number.EPSILON:l.score;c*=Math.pow(v,f);}i.score=c,this._log(i);}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn);}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===n(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t);}return t},2)),r=null;}var o=[];this.options.includeMatches&&o.push(function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a);}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score;});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c);}else t.push(s.item);}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments);}}])&&o(t.prototype,r),e}();e.exports=h;},function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}var o=r(2),i=r(3),a=r(6),s=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,s=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.isCaseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.includeMatches,S=void 0!==b&&b;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,includeMatches:S,minMatchCharLength:k},this.pattern=v?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern));}var t,r;return t=e,(r=[{key:"search",value:function(e){var t=this.options,r=t.isCaseSensitive,n=t.includeMatches;if(r||(e=e.toLowerCase()),this.pattern===e){var a={isMatch:!0,score:0};return n&&(a.matchedIndices=[[0,e.length-1]]),a}var s=this.options,c=s.maxPatternLength,h=s.tokenSeparator;if(this.pattern.length>c)return o(e,this.pattern,h);var l=this.options,u=l.location,f=l.distance,v=l.threshold,p=l.findAllMatches,d=l.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:u,distance:f,threshold:v,findAllMatches:p,minMatchCharLength:d,includeMatches:n})}}])&&n(t.prototype,r),e}();e.exports=s;},function(e,t){var r=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(r,"\\$&").replace(n,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1]);}return {score:a?.5:1,isMatch:a,matchedIndices:s}};},function(e,t,r){var n=r(4),o=r(5);e.exports=function(e,t,r,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,v=void 0!==f&&f,p=i.minMatchCharLength,d=void 0===p?1:p,g=i.includeMatches,y=void 0!==g&&g,m=s,k=e.length,b=u,S=e.indexOf(t,m),x=t.length,M=[],_=0;_<k;_+=1)M[_]=0;if(-1!==S){var w=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});if(b=Math.min(w,b),-1!==(S=e.lastIndexOf(t,m+x))){var L=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});b=Math.min(L,b);}}S=-1;for(var A=[],O=1,C=x+k,j=1<<(x<=31?x-1:30),P=0;P<x;P+=1){for(var I=0,F=C;I<F;){n(t,{errors:P,currentLocation:m+F,expectedLocation:m,distance:h})<=b?I=F:C=F,F=Math.floor((C-I)/2+I);}C=F;var T=Math.max(1,m-F+1),N=v?k:Math.min(m+F,k)+x,z=Array(N+2);z[N+1]=(1<<P)-1;for(var E=N;E>=T;E-=1){var W=E-1,K=r[e.charAt(W)];if(K&&(M[W]=1),z[E]=(z[E+1]<<1|1)&K,0!==P&&(z[E]|=(A[E+1]|A[E])<<1|1|A[E+1]),z[E]&j&&(O=n(t,{errors:P,currentLocation:W,expectedLocation:m,distance:h}))<=b){if(b=O,(S=W)<=m)break;T=Math.max(1,2*m-S);}}if(n(t,{errors:P+1,currentLocation:m,expectedLocation:m,distance:h})>b)break;A=z;}var $={isMatch:S>=0,score:0===O?.001:O};return y&&($.matchedIndices=o(M,d)),$};},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l};},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1);}return e[i-1]&&i-n>=t&&r.push([n,i-1]),r};},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t};},function(e,t){var r=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},n=function(e){return null==e?"":function(e){if("string"==typeof e)return e;var t=e+"";return "0"==t&&1/e==-1/0?"-0":t}(e)},o=function(e){return "string"==typeof e},i=function(e){return "number"==typeof e};e.exports={get:function(e,t){var a=[];return function e(t,s){if(s){var c=s.indexOf("."),h=s,l=null;-1!==c&&(h=s.slice(0,c),l=s.slice(c+1));var u=t[h];if(null!=u)if(l||!o(u)&&!i(u))if(r(u))for(var f=0,v=u.length;f<v;f+=1)e(u[f],l);else l&&e(u,l);else a.push(n(u));}else a.push(t);}(e,t),a},isArray:r,isString:o,isNum:i,toString:n};}])});
	});

	unwrapExports(fuse);
	var fuse_1 = fuse.Fuse;

	let Fuse = null;

	try {
	  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
	  Fuse = fuse;
	} catch (e) {
	}

	function fuzzySearch(value, options, fuseOptions) {
	  const fuse = new Fuse(options, fuseOptions);
	  return fuse.search(value).map((item, index) => Object.assign({}, item, {
	    index
	  }));
	}

	function search(value, options, fuseOptions) {
	  if (value.length && Fuse && fuseOptions) {
	    return fuzzySearch(value, options, fuseOptions);
	  }

	  return false;
	}

	function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function useSelectSearch({
	  value: defaultValue = null,
	  disabled = false,
	  multiple = false,
	  search: canSearch = false,
	  fuse = false,
	  options: defaultOptions,
	  onChange = () => {},
	  getOptions = null,
	  allowEmpty = true,
	  closeOnSelect = true
	}) {
	  const ref = React$1.useRef(null);
	  const flatDefaultOptions = React$1.useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
	  const [state, setState] = React$1.useState({
	    flat: [],
	    addedOptions: [],
	    value: defaultValue,
	    search: '',
	    focus: false,
	    searching: false,
	    highlighted: -1,
	    changed: null
	  });
	  const {
	    flat,
	    addedOptions,
	    value,
	    search: search$1,
	    focus,
	    searching,
	    highlighted
	  } = state;
	  const option = React$1.useMemo(() => {
	    let newOption = getOption(value, [...flatDefaultOptions, ...addedOptions]);

	    if (!newOption && !allowEmpty && !multiple) {
	      [newOption] = flatDefaultOptions;
	    }

	    return newOption;
	  }, [value, flatDefaultOptions, addedOptions, allowEmpty, multiple]);
	  const options = React$1.useMemo(() => groupOptions(flat), [flat]);
	  const displayValue = React$1.useMemo(() => getDisplayValue(option), [option]);
	  const onBlur = React$1.useCallback(() => {
	    setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	      focus: false,
	      search: '',
	      flat: flatDefaultOptions,
	      highlighted: -1
	    }));

	    if (ref.current) {
	      ref.current.blur();
	    }
	  }, [flatDefaultOptions, ref]);

	  const setFocus = newFocus => setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	    focus: newFocus
	  }));

	  const onClick = () => setFocus(!focus);

	  const onFocus = () => setFocus(true);

	  const onSelect = React$1.useCallback(val => {
	    setState(oldState => {
	      const item = val || oldState.flat[oldState.highlighted].value;
	      const values = getNewValue(item, oldState.value, multiple);
	      const newOptions = getOption(values, oldState.flat);
	      return _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	        addedOptions: multiple ? newOptions : [newOptions],
	        value: values,
	        changed: [values, newOptions]
	      });
	    });
	  }, [multiple, onChange]);
	  const onMouseDown = React$1.useCallback(e => {
	    if (!closeOnSelect || multiple) {
	      e.preventDefault();

	      if (multiple) {
	        e.target.focus();
	      }
	    }

	    onSelect(e.currentTarget.value);
	  }, [onSelect, closeOnSelect, multiple]);
	  const onKeyDown = React$1.useCallback(e => {
	    const {
	      key
	    } = e;

	    if (key === 'ArrowDown' || key === 'ArrowUp') {
	      e.preventDefault();
	      setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	        highlighted: highlightReducer(oldState.highlighted, {
	          key,
	          options: oldState.flat
	        })
	      }));
	    }
	  }, []);
	  const onKeyPress = React$1.useCallback(({
	    key
	  }) => {
	    if (key === 'Enter') {
	      onSelect();

	      if (!multiple && closeOnSelect) {
	        onBlur();
	      }
	    }
	  }, [onSelect, multiple, closeOnSelect, onBlur]);
	  const onKeyUp = React$1.useCallback(({
	    key
	  }) => {
	    if (key === 'Escape') {
	      onBlur();
	    }
	  }, [onBlur]);

	  const onSearch = ({
	    target
	  }) => {
	    const {
	      value: inputVal
	    } = target;
	    const newState = {
	      search: inputVal
	    };
	    let searchableOption = flatDefaultOptions;

	    if (getOptions && inputVal.length) {
	      newState.searching = true;
	      searchableOption = getOptions(inputVal);
	    }

	    setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), newState));
	    Promise.resolve(searchableOption).then(foundOptions => {
	      let newOptions = foundOptions;

	      if (inputVal.length) {
	        newOptions = search(inputVal, foundOptions, fuse);
	      }

	      setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	        flat: newOptions === false ? foundOptions : newOptions,
	        searching: false
	      }));
	    }).catch(() => setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	      flat: flatDefaultOptions,
	      searching: false
	    })));
	  };

	  const valueProps = {
	    tabIndex: '0',
	    readOnly: !canSearch,
	    onChange: canSearch ? onSearch : null,
	    disabled,
	    onMouseDown: onClick,
	    onBlur,
	    onFocus,
	    onKeyPress,
	    onKeyDown,
	    onKeyUp,
	    ref
	  };
	  const optionProps = React$1.useMemo(() => ({
	    tabIndex: '-1',
	    onMouseDown,
	    onKeyDown,
	    onKeyPress,
	    onBlur
	  }), [onMouseDown, onKeyDown, onKeyPress, onBlur]);
	  React$1.useEffect(() => {
	    setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	      value: defaultValue
	    }));
	  }, [defaultValue]);
	  React$1.useEffect(() => {
	    setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	      flat: flatDefaultOptions
	    }));
	  }, [flatDefaultOptions]);
	  React$1.useEffect(() => {
	    if (state.changed) {
	      onChange(...state.changed);
	    }
	  }, [state.changed]);
	  return [{
	    value: option,
	    highlighted,
	    options,
	    disabled,
	    displayValue,
	    focus,
	    search: search$1,
	    searching
	  }, valueProps, optionProps, newValue => setState(oldState => _objectSpread$1(_objectSpread$1({}, oldState), {}, {
	    value: newValue
	  }))];
	}

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
	var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
	var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
	var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

	var reactIs_production_min = {
		AsyncMode: AsyncMode,
		ConcurrentMode: ConcurrentMode,
		ContextConsumer: ContextConsumer,
		ContextProvider: ContextProvider,
		Element: Element,
		ForwardRef: ForwardRef,
		Fragment: Fragment,
		Lazy: Lazy,
		Memo: Memo,
		Portal: Portal,
		Profiler: Profiler,
		StrictMode: StrictMode,
		Suspense: Suspense,
		isAsyncMode: isAsyncMode,
		isConcurrentMode: isConcurrentMode,
		isContextConsumer: isContextConsumer,
		isContextProvider: isContextProvider,
		isElement: isElement,
		isForwardRef: isForwardRef,
		isFragment: isFragment,
		isLazy: isLazy,
		isMemo: isMemo,
		isPortal: isPortal,
		isProfiler: isProfiler,
		isStrictMode: isStrictMode,
		isSuspense: isSuspense,
		isValidElementType: isValidElementType,
		typeOf: typeOf
	};

	var reactIs_development = createCommonjsModule(function (module, exports) {
	});
	var reactIs_development_1 = reactIs_development.AsyncMode;
	var reactIs_development_2 = reactIs_development.ConcurrentMode;
	var reactIs_development_3 = reactIs_development.ContextConsumer;
	var reactIs_development_4 = reactIs_development.ContextProvider;
	var reactIs_development_5 = reactIs_development.Element;
	var reactIs_development_6 = reactIs_development.ForwardRef;
	var reactIs_development_7 = reactIs_development.Fragment;
	var reactIs_development_8 = reactIs_development.Lazy;
	var reactIs_development_9 = reactIs_development.Memo;
	var reactIs_development_10 = reactIs_development.Portal;
	var reactIs_development_11 = reactIs_development.Profiler;
	var reactIs_development_12 = reactIs_development.StrictMode;
	var reactIs_development_13 = reactIs_development.Suspense;
	var reactIs_development_14 = reactIs_development.isAsyncMode;
	var reactIs_development_15 = reactIs_development.isConcurrentMode;
	var reactIs_development_16 = reactIs_development.isContextConsumer;
	var reactIs_development_17 = reactIs_development.isContextProvider;
	var reactIs_development_18 = reactIs_development.isElement;
	var reactIs_development_19 = reactIs_development.isForwardRef;
	var reactIs_development_20 = reactIs_development.isFragment;
	var reactIs_development_21 = reactIs_development.isLazy;
	var reactIs_development_22 = reactIs_development.isMemo;
	var reactIs_development_23 = reactIs_development.isPortal;
	var reactIs_development_24 = reactIs_development.isProfiler;
	var reactIs_development_25 = reactIs_development.isStrictMode;
	var reactIs_development_26 = reactIs_development.isSuspense;
	var reactIs_development_27 = reactIs_development.isValidElementType;
	var reactIs_development_28 = reactIs_development.typeOf;

	var reactIs = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_production_min;
	}
	});

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
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

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	var has = Function.call.bind(Object.prototype.hasOwnProperty);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	var factoryWithThrowingShims = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret_1) {
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
	  }  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }  // Important!
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
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = factoryWithThrowingShims();
	}
	});

	const option = propTypes.shape({
	  name: propTypes.string.isRequired,
	  value: propTypes.string.isRequired
	});
	const optionType = propTypes.oneOfType([option, propTypes.shape({
	  name: propTypes.string.isRequired,
	  type: propTypes.string.isRequired,
	  items: propTypes.arrayOf(option)
	})]);
	const valueType = propTypes.oneOfType([propTypes.object, propTypes.arrayOf(propTypes.object)]);
	const classNameType = propTypes.oneOfType([propTypes.string, propTypes.func]);

	function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

	const Option = (_ref) => {
	  let {
	    optionProps,
	    highlighted,
	    selected,
	    cls,
	    renderOption
	  } = _ref,
	      option = _objectWithoutProperties(_ref, ["optionProps", "highlighted", "selected", "cls", "renderOption"]);

	  const optionClass = [cls('option'), selected ? cls('is-selected') : false, highlighted ? cls('is-highlighted') : false].filter(single => !!single).join(' ');

	  const domProps = _objectSpread$2(_objectSpread$2({}, optionProps), {}, {
	    value: option.value,
	    disabled: option.disabled
	  });

	  return /*#__PURE__*/React$1__default.createElement("li", {
	    className: cls('row'),
	    role: "menuitem",
	    "data-index": option.index,
	    "data-value": escape(option.value),
	    key: option.value
	  }, renderOption(domProps, option, {
	    selected,
	    highlighted
	  }, optionClass));
	};

	Option.defaultProps = {
	  disabled: false,
	  index: null,
	  value: null
	};
	Option.propTypes =  {};
	var Option$1 = React$1.memo(Option);

	function isSelected(itemValue, selectedValue) {
	  if (!selectedValue) {
	    return false;
	  }

	  return Array.isArray(selectedValue) ? selectedValue.findIndex(item => item.value === itemValue.value) >= 0 : selectedValue.value === itemValue.value;
	}

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	const SelectSearch = React$1.forwardRef(({
	  value: defaultValue,
	  disabled,
	  placeholder,
	  multiple,
	  search,
	  autoFocus,
	  autoComplete,
	  options: defaultOptions,
	  onChange,
	  printOptions,
	  closeOnSelect,
	  className,
	  renderValue,
	  renderOption,
	  renderGroupHeader,
	  getOptions,
	  fuse
	}, ref) => {
	  const selectRef = React$1.createRef();
	  const [snapshot, valueProps, optionProps] = useSelectSearch({
	    options: defaultOptions,
	    value: defaultValue,
	    multiple,
	    disabled,
	    fuse,
	    search,
	    onChange,
	    getOptions,
	    closeOnSelect,
	    allowEmpty: !!placeholder
	  });
	  const {
	    focus,
	    highlighted,
	    value,
	    options,
	    searching,
	    displayValue,
	    search: searchValue
	  } = snapshot;
	  const cls = React$1.useCallback(key => {
	    if (typeof className === 'function') {
	      return className(key);
	    }

	    if (key.indexOf('container') === 0) {
	      return key.replace('container', className);
	    }

	    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
	      return key;
	    }

	    return className.split(' ')[0] + "__" + key;
	  }, [className]);
	  const wrapperClass = [cls('container'), disabled ? cls('is-disabled') : false, searching ? cls('is-loading') : false, focus ? cls('has-focus') : false].filter(single => !!single).join(' ');
	  const inputValue = focus && search ? searchValue : displayValue;
	  React$1.useEffect(() => {
	    const {
	      current
	    } = selectRef;

	    if (!current) {
	      return;
	    }

	    let query = null;

	    if (highlighted > -1) {
	      query = "[data-index=\"" + highlighted + "\"]";
	    } else if (value && !multiple) {
	      query = "[data-value=\"" + escape(value.value) + "\"]";
	    }

	    const selected = current.querySelector(query);

	    if (selected) {
	      const rect = current.getBoundingClientRect();
	      const selectedRect = selected.getBoundingClientRect();
	      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
	    }
	  }, [focus, value, highlighted, selectRef, multiple]);
	  let shouldRenderOptions = true;

	  switch (printOptions) {
	    case 'never':
	      shouldRenderOptions = false;
	      break;

	    case 'always':
	      shouldRenderOptions = true;
	      break;

	    case 'on-focus':
	      shouldRenderOptions = focus;
	      break;

	    default:
	      shouldRenderOptions = !disabled && (focus || multiple);
	      break;
	  }

	  return /*#__PURE__*/React$1__default.createElement("div", {
	    ref: ref,
	    className: wrapperClass
	  }, (!multiple || placeholder || search) && /*#__PURE__*/React$1__default.createElement("div", {
	    className: cls('value')
	  }, renderValue(_objectSpread$3(_objectSpread$3({}, valueProps), {}, {
	    placeholder,
	    autoFocus,
	    autoComplete,
	    value: inputValue
	  }), snapshot, cls('input'))), shouldRenderOptions && /*#__PURE__*/React$1__default.createElement("div", {
	    className: cls('select'),
	    ref: selectRef
	  }, /*#__PURE__*/React$1__default.createElement("ul", {
	    className: cls('options')
	  }, options.map(option => {
	    if (option.type === 'group') {
	      return /*#__PURE__*/React$1__default.createElement("li", {
	        role: "none",
	        className: cls('row'),
	        key: option.groupId
	      }, /*#__PURE__*/React$1__default.createElement("div", {
	        className: cls('group')
	      }, /*#__PURE__*/React$1__default.createElement("div", {
	        className: cls('group-header')
	      }, renderGroupHeader(option.name)), /*#__PURE__*/React$1__default.createElement("ul", {
	        className: cls('options')
	      }, option.items.map(o => /*#__PURE__*/React$1__default.createElement(Option$1, _extends({
	        key: o.value,
	        cls: cls,
	        optionProps: optionProps,
	        selected: isSelected(o, value),
	        highlighted: highlighted === o.index,
	        renderOption: renderOption
	      }, o))))));
	    }

	    return /*#__PURE__*/React$1__default.createElement(Option$1, _extends({
	      key: option.value,
	      cls: cls,
	      optionProps: optionProps,
	      selected: isSelected(option, value),
	      highlighted: highlighted === option.index,
	      renderOption: renderOption
	    }, option));
	  }))));
	});
	SelectSearch.defaultProps = {
	  className: 'select-search',
	  disabled: false,
	  search: false,
	  multiple: false,
	  placeholder: null,
	  autoFocus: false,
	  autoComplete: 'on',
	  value: '',
	  onChange: () => {},
	  printOptions: 'auto',
	  closeOnSelect: true,
	  renderOption: (domProps, option, snapshot, className) => /*#__PURE__*/React$1__default.createElement("button", _extends({
	    className: className
	  }, domProps), option.name),
	  renderGroupHeader: name => name,
	  renderValue: (valueProps, snapshot, className) => /*#__PURE__*/React$1__default.createElement("input", _extends({}, valueProps, {
	    className: className
	  })),
	  fuse: {
	    keys: ['name', 'groupName'],
	    threshold: 0.3
	  },
	  getOptions: null
	};
	SelectSearch.propTypes =  {};
	var SelectSearch$1 = React$1.memo(SelectSearch);

	var SelectStyles = "/**\n * Main wrapper\n */\n.select-search {\n  width: 300px; }\n\n.select-search *,\n.select-search *::after,\n.select-search *::before {\n  box-sizing: inherit; }\n\n/**\n * Value wrapper\n */\n.select-search__value {\n  position: relative;\n  z-index: 1; }\n\n.select-search__value::after {\n  content: '';\n  display: inline-block;\n  position: absolute;\n  top: calc(50% - 9px);\n  right: 19px;\n  width: 11px;\n  height: 11px; }\n\n/**\n * Input\n */\n.select-search__input {\n  display: block;\n  height: 36px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: 1px solid transparent;\n  box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);\n  border-radius: 3px;\n  outline: none;\n  font-family: 'Noto Sans', sans-serif;\n  font-size: 14px;\n  text-align: left;\n  text-overflow: ellipsis;\n  line-height: 36px;\n  -webkit-appearance: none; }\n\n.select-search__input::-webkit-search-decoration,\n.select-search__input::-webkit-search-cancel-button,\n.select-search__input::-webkit-search-results-button,\n.select-search__input::-webkit-search-results-decoration {\n  -webkit-appearance: none; }\n\n.select-search__input:not([readonly]):focus {\n  cursor: initial; }\n\n/**\n * Options wrapper\n */\n.select-search__select {\n  background: #fff;\n  box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15); }\n\n/**\n * Options\n */\n.select-search__options {\n  list-style: none;\n  margin: 1rem 1rem 1rem 1rem; }\n\n/**\n * Option row\n */\n.select-search__row:not(:first-child) {\n  border-top: 1px solid #eee; }\n\n/**\n * Option\n */\n.select-search__option {\n  display: block;\n  height: 36px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer;\n  text-transform: none; }\n\n.select-search--multiple .select-search__option {\n  height: 48px; }\n\n.select-search__option.is-selected {\n  background: #7cb342;\n  color: #fff; }\n\n.select-search__option.is-highlighted,\n.select-search__option:not(.is-selected):hover {\n  background: rgba(47, 204, 139, 0.1); }\n\n.select-search__option.is-highlighted.is-selected,\n.select-search__option.is-selected:hover {\n  background: #7cb34d;\n  color: #fff; }\n\n/**\n * Group\n */\n.select-search__group-header {\n  font-size: 14px;\n  font-weight: 600;\n  background: #eee;\n  padding: 8px 16px; }\n\n/**\n * States\n */\n.select-search.is-disabled {\n  opacity: 0.5; }\n\n.select-search.is-loading .select-search__value::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath fill='%232F2D37' d='M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E\");\n  background-size: 11px; }\n\n.select-search:not(.is-disabled) .select-search__input {\n  cursor: pointer; }\n\n/**\n * Modifiers\n */\n.select-search--multiple {\n  border-radius: 3px;\n  overflow: hidden; }\n\n.select-search:not(.is-loading):not(.select-search--multiple) .select-search__value::after {\n  transform: rotate(45deg);\n  border-right: 1px solid #000;\n  border-bottom: 1px solid #000;\n  pointer-events: none; }\n\n.select-search--multiple .select-search__input {\n  cursor: initial; }\n\n.select-search--multiple .select-search__input {\n  border-radius: 3px 3px 0 0; }\n\n.select-search--multiple:not(.select-search--search) .select-search__input {\n  cursor: default; }\n\n.select-search:not(.select-search--multiple) .select-search__input:hover {\n  border-color: #2FCC8B; }\n\n.select-search:not(.select-search--multiple) .select-search__select {\n  z-index: 2;\n  top: 44px;\n  right: 0;\n  left: 0;\n  border-radius: 3px;\n  overflow: auto;\n  max-height: 360px; }\n\n.select-search--multiple .select-search__select {\n  overflow: auto;\n  max-height: 260px;\n  border-top: 1px solid #eee;\n  border-radius: 0 0 3px 3px; }\n";

	function DomTree() {
	  var _useStore = useStore(DomTreeStore),
	      currentTarget = _useStore.currentTarget,
	      showDomTree = _useStore.showDomTree;

	  return /*#__PURE__*/React.createElement("div", {
	    id: "cw-domtree"
	  }, showDomTree ? DomTreeElement(getSelector$1(currentTarget)) : 'Click any element to show DOM element tree here', /*#__PURE__*/React.createElement("style", {
	    type: "text/css"
	  }, styles, " ", SelectStyles));
	}

	function DomTreeElement(domTree) {
	  return /*#__PURE__*/React.createElement("ul", {
	    className: "cw-domtree-list"
	  }, domTree.map(function (element, i) {
	    return /*#__PURE__*/React.createElement("li", {
	      key: "".concat(element.tag, "-").concat(i),
	      className: "cw-domtree-elements"
	    }, element.tag, element.id || element["class"] && element["class"].length > 0 ? /*#__PURE__*/React.createElement("div", {
	      className: "cw-node-attributes"
	    }, /*#__PURE__*/React.createElement(DomAttributeSelectSearch, {
	      element: element
	    })) : null);
	  }));
	}

	function DomAttributeSelectSearch(_ref) {
	  var element = _ref.element;
	  var selectOptions = [];

	  if (element.id) {
	    selectOptions.push({
	      name: 'Select Id',
	      type: 'group',
	      items: [{
	        value: element.id,
	        name: element.id
	      }]
	    });
	  }

	  if (element["class"] && element["class"].length > 0) {
	    var classOptions = [];
	    element["class"].map(function (cls) {
	      return classOptions.push({
	        value: cls,
	        name: cls
	      });
	    });
	    selectOptions.push({
	      name: 'Select Class',
	      type: 'group',
	      items: classOptions
	    });
	  }

	  return /*#__PURE__*/React.createElement(SelectSearch$1, {
	    options: selectOptions,
	    multiple: true
	  });
	}

	var styles$1 = "#color-wings {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n  overflow: visible;\n  z-index: 1500; }\n\n#cw-focuser .cw-focus-line {\n  position: absolute;\n  border-color: #7cb342;\n  border-style: solid;\n  border-width: 0; }\n\n#cw-focus-details {\n  position: absolute;\n  color: #fff;\n  font-size: 12px;\n  line-height: 24px;\n  font-weight: 500; }\n  #cw-focus-details .cw-selector {\n    padding: 0 10px; }\n";

	function Canvas() {
	  return /*#__PURE__*/React.createElement("div", {
	    id: "cw-canvas"
	  }, /*#__PURE__*/React.createElement(FocusDetails, null), /*#__PURE__*/React.createElement(Focuser, null), /*#__PURE__*/React.createElement(DomTree, null), /*#__PURE__*/React.createElement("style", {
	    type: "text/css"
	  }, styles$1));
	}

	/**
	 * Color Wings
	 */

	function isCustomizer() {
	  return !!(typeof wp !== 'undefined' && wp.hasOwnProperty('customize'));
	}

	if (isCustomizer()) {
	  wp.customize.bind('preview-ready', function () {
	    // Send Example
	    // wp.customize.preview.send( 'test-event', 'Reply' )
	    var canvas = document.createElement('div');
	    canvas.id = 'color-wings';
	    document.body.appendChild(canvas); // Todo: This might occur before preview-ready.

	    cw.Evt.on('mount-colorwings', function () {
	      // Todo: Without setTimeout browser hangs, not sure why.
	      setTimeout(function () {
	        return ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, null), canvas);
	      }, 100);
	    });
	    cw.Evt.on('unmount-colorwings', function () {
	      ReactDOM.unmountComponentAtNode(canvas);
	    });
	  });
	}

}(React));
//# sourceMappingURL=color-wings-preview.js.map
