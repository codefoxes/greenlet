/** @license ColorWings v1.1.0
* color-wings-preview.js
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
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
    if (n === "Map" || n === "Set") return Array.from(o);
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

  window.cw = window.parent.cw;
  var computed = window.getComputedStyle(document.documentElement);
  var cssVars = {};
  Array.from(document.styleSheets).filter(function (sheet) {
    return sheet.href === null || sheet.href.startsWith(window.location.origin);
  }).reduce(function (acc, s) {
    return acc = [].concat(_toConsumableArray(acc), _toConsumableArray(Array.from(s.cssRules).reduce(function (def, rule) {
      return def = rule.selectorText === ':root' ? [].concat(_toConsumableArray(def), _toConsumableArray(Array.from(rule.style).filter(function (n) {
        return n.startsWith('--') && !n.startsWith('--wp-admin-');
      }))) : def;
    }, [])));
  }, []).forEach(function (varName) {
    cssVars[varName] = computed.getPropertyValue(varName).trim();
  });

  if ('cwPreviewObject' in window) {
    cw.Evt.emit('preview-object-ready', _objectSpread2(_objectSpread2({}, window.cwPreviewObject), {}, {
      cssVars: cssVars
    }));
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
    detailsOpacity: 1,
    highlightStyles: {
      box: {},
      main: {},
      padding: {},
      margin: {}
    },
    similarStyles: '',
    currentTarget: false,
    showDomTree: false,
    domTree: []
  };

  var PreviewClass = /*#__PURE__*/function (_Store) {
    _inherits(PreviewClass, _Store);

    var _super = _createSuper(PreviewClass);

    function PreviewClass() {
      _classCallCheck(this, PreviewClass);

      return _super.apply(this, arguments);
    }

    _createClass(PreviewClass, [{
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
    }, {
      key: "setHighlightStyles",
      value: function setHighlightStyles(highlightStyles) {
        this.set(function () {
          return {
            highlightStyles: highlightStyles
          };
        });
      }
    }, {
      key: "setSimilarStyles",
      value: function setSimilarStyles(similarStyles) {
        this.set(function () {
          return {
            similarStyles: similarStyles
          };
        });
      }
    }, {
      key: "showDomTree",
      value: function showDomTree(data, domTree) {
        this.set(function () {
          return {
            currentTarget: data.currentTarget,
            showDomTree: true,
            domTree: domTree
          };
        });
      }
    }, {
      key: "hideDomTree",
      value: function hideDomTree() {
        this.set(function () {
          return {
            showDomTree: false,
            domTree: []
          };
        });
      }
    }]);

    return PreviewClass;
  }(Store);

  var PreviewStore = new PreviewClass(initialState);

  var prevStyles = '';
  var isPrevTemp = false;
  var markSimilar = function markSimilar(selector, temp) {
    if (true === temp) {
      if (!isPrevTemp) {
        prevStyles = PreviewStore.get().similarStyles;
      }
    }

    var styles = "".concat(selector, " {\n\t\toutline: 1px dashed #7cb342 !important;\n\t\toutline-offset: -1px !important;\n\t}");
    PreviewStore.setSimilarStyles(styles);
    isPrevTemp = temp;
  };
  var unmarkSimilar = function unmarkSimilar(restore) {
    if (true === restore) {
      PreviewStore.setSimilarStyles(prevStyles);
    } else {
      PreviewStore.setSimilarStyles('');
    }
  };
  var highlight = function highlight(selector, target, temp) {
    var el;

    if (undefined === target) {
      el = document.querySelector(selector);
    } else {
      el = target;
    }

    if (null !== el) {
      var client = el.getBoundingClientRect();
      var styles = window.getComputedStyle(el);
      var paddingTop = parseInt(styles.paddingTop.split('px')[0], 10);
      var paddingRight = parseInt(styles.paddingRight.split('px')[0], 10);
      var paddingBottom = parseInt(styles.paddingBottom.split('px')[0], 10);
      var paddingLeft = parseInt(styles.paddingLeft.split('px')[0], 10);
      var marginTop = parseInt(styles.marginTop.split('px')[0], 10);
      var marginRight = parseInt(styles.marginRight.split('px')[0], 10);
      var marginBottom = parseInt(styles.marginBottom.split('px')[0], 10);
      var marginLeft = parseInt(styles.marginLeft.split('px')[0], 10);
      var highlightStyles = {
        box: {
          top: client.top + window.pageYOffset,
          left: client.left + window.pageXOffset
        },
        main: {
          width: client.width - paddingLeft - paddingRight,
          height: client.height - paddingTop - paddingBottom,
          top: paddingTop,
          left: paddingLeft
        },
        padding: {
          width: client.width,
          height: client.height,
          borderTopWidth: paddingTop,
          borderRightWidth: paddingRight,
          borderBottomWidth: paddingBottom,
          borderLeftWidth: paddingLeft
        },
        margin: {
          top: 0 - marginTop,
          left: 0 - marginLeft,
          width: client.width,
          height: client.height,
          borderTopWidth: marginTop > 0 ? marginTop : 0,
          borderRightWidth: marginRight > 0 ? marginRight : 0,
          borderBottomWidth: marginBottom > 0 ? marginBottom : 0,
          borderLeftWidth: marginLeft > 0 ? marginLeft : 0
        }
      };
      PreviewStore.setHighlightStyles(highlightStyles);
    }

    markSimilar(selector, temp);
  };
  var deHighlight = function deHighlight() {
    var restore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    PreviewStore.setHighlightStyles({
      box: {},
      main: {},
      padding: {},
      margin: {}
    });
    unmarkSimilar(restore);
  };

  var _cw = cw,
      Evt = _cw.Evt;
  var maxSelectorLength = 30;

  var getTree = function getTree(el) {
    var tree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    tree.push({
      el: el
    });

    if (el.parentNode !== document) {
      getTree(el.parentNode, tree);
    }

    return tree;
  };

  var getSelectorFromTree = function getSelectorFromTree(tree) {
    // Changes tree object. So don't call this directly.
    var selector = '';
    tree.forEach(function (elObj, i) {
      var el = elObj.el;
      elObj.cwSelected = {
        classSelected: []
      };
      var elSelector = '';

      if (el.id !== '' && !/\w*-\d+/g.test("".concat(el.id))) {
        if ("#".concat(el.id, " ").concat(selector).length <= maxSelectorLength) {
          elObj.cwSelected.idSelected = true;
          selector = 0 === i ? "#".concat(el.id) : "#".concat(el.id, " ").concat(selector);
          return;
        }
      }

      var clsList = [];
      el.classList.forEach(function (cls) {
        // Ignore classes
        if (clsList.length >= 2) return; // Ignore autogen sequential classes

        if (/\w*-\d+/g.test("".concat(cls))) return;
        if ("".concat(elSelector, ".").concat(cls, " ").concat(selector).length >= maxSelectorLength) return;
        elObj.cwSelected.classSelected.push(cls);
        elSelector = "".concat(elSelector, ".").concat(cls);
        clsList.push(cls);
      });

      if (el.classList.length === 0) {
        var tagName = el.tagName.toLowerCase();
        if ('html' === tagName && 0 !== selector.length) return;

        if ("".concat(tagName).concat(elSelector, " ").concat(selector).length <= maxSelectorLength) {
          elSelector = "".concat(tagName).concat(elSelector);
          elObj.cwSelected.tagSelected = true;
        }
      }

      if ("".concat(elSelector, " ").concat(selector).length >= maxSelectorLength) {
        elObj.cwSelected = {
          classSelected: []
        };
        return;
      }

      selector = 0 === i ? elSelector : "".concat('' === elSelector ? '' : elSelector + ' ').concat(selector);
    });
    return selector;
  };

  var getSelector = function getSelector(el) {
    // Todo: throws error if el === null
    // Maybe this?
    if (null === el) return '';
    var selectorTree = getTree(el);
    return getSelectorFromTree(selectorTree);
  };

  var getSelectorTree = function getSelectorTree(el) {
    if (null === el) return '';
    var selectorTree = getTree(el);
    getSelectorFromTree(selectorTree);
    return selectorTree;
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
        left: client.right - 1,
        top: offsetTop
      },
      bottom: {
        borderTopWidth: '1px',
        width: client.width,
        left: client.left,
        top: window.pageYOffset + client.bottom - 1
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

    if (PreviewStore.isFocused() && force === false) {
      return;
    }

    var isSelector = false;

    if ((ip === undefined || ip === false) && currentTarget !== undefined) ; else if (ip.target === undefined) {
      if ('' === ip) {
        return;
      }

      var allTargets = _toConsumableArray(document.querySelectorAll(ip));

      if (!allTargets.includes(currentTarget)) {
        currentTarget = allTargets[0];
      }

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
    PreviewStore.moveFocus(newState);
  };
  var highlightElements = function highlightElements(selector) {
    var temp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var target;

    if ('string' !== typeof selector) {
      target = selector;
      selector = getSelector(selector);
    }

    highlight(selector, target, temp);
  };
  var lockUnlockFocus = function lockUnlockFocus(e) {
    var op = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    var currentSelector = PreviewStore.get().focusDetails.selector;

    if (PreviewStore.isFocused() && op !== 'lock') {
      PreviewStore.unlockFocus();
      Evt.emit('focus-unlocked', currentSelector);
      deHighlight();
    } else {
      PreviewStore.lockFocus();
      Evt.emit('focus-locked', {
        currentSelector: currentSelector,
        currentTarget: currentTarget
      });
      deHighlight();
      markSimilar(currentSelector);
    }

    cw.MainStore.setSelectorClass();
  };
  var reduceFocus = function reduceFocus() {
    PreviewStore.reduceFocusOpacity();
  };
  var increaseFocus = function increaseFocus() {
    PreviewStore.increaseFocusOpacity();
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
  function clone(o) {
    // If Date or Proto disabling is needed, use: https://github.com/davidmarkclements/rfdc
    var out, val, key;

    if (_typeof(o) !== "object" || o === null) {
      return o;
    }

    out = Array.isArray(o) ? [] : {};

    for (key in o) {
      val = o[key];
      out[key] = clone(val);
    }

    return out;
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

    if ('global' in allOutputs) {
      output += allOutputs.global;
    }

    for (var page in allOutputs) {
      if (!allOutputs.hasOwnProperty(page)) {
        continue;
      }

      if (page in window.cwPreviewObject.pages && window.cwPreviewObject.pages[page]) {
        output += allOutputs[page];
      }
    }

    for (var _page in allOutputs) {
      if (!allOutputs.hasOwnProperty(_page)) {
        continue;
      }

      if ('page' in window.cwPreviewObject && 'id' in window.cwPreviewObject.page && _page === window.cwPreviewObject.page.id.toString()) {
        output += allOutputs[_page];
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

  var bodyContent = document.querySelectorAll('body > *:not(script):not(style):not(#color-wings)');

  function listenFocusActions() {
    bodyContent.forEach(function (el) {
      el.addEventListener('mouseover', moveFocus);
      el.addEventListener('click', lockUnlockFocus, true);
    });
    document.body.addEventListener('mouseleave', reduceFocus);
    document.body.addEventListener('mouseenter', increaseFocus);
  }

  function unListenFocusActions() {
    bodyContent.forEach(function (el) {
      el.removeEventListener('mouseover', moveFocus);
      el.removeEventListener('click', lockUnlockFocus, true);
    });
    document.body.removeEventListener('mouseleave', reduceFocus);
    document.body.removeEventListener('mouseenter', increaseFocus);
  }

  function selectElement(selector) {
    moveFocus(selector, true);
    lockUnlockFocus(false, 'lock');
  }

  function togglePreview() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'show';
    var el = document.getElementById('color-wings');

    if (el !== null) {
      el.style.display = state === 'show' ? '' : 'none';
    }
  }

  cw.Evt.on('preview-object-ready', function () {
    cw.Evt.off('mount-colorwings', listenFocusActions);
    cw.Evt.off('unmount-colorwings', unListenFocusActions);
    cw.Evt.off('select-element', selectElement);
    cw.Evt.off('update-selector', updateSelector);
    cw.Evt.off('highlight-elements', highlightElements);
    cw.Evt.off('de-highlight-elements', deHighlight);
    cw.Evt.off('toggle-preview', togglePreview);
  });
  cw.Evt.on('mount-colorwings', listenFocusActions);
  cw.Evt.on('unmount-colorwings', unListenFocusActions);
  cw.Evt.on('select-element', selectElement);
  cw.Evt.on('update-selector', updateSelector);
  cw.Evt.on('highlight-elements', highlightElements);
  cw.Evt.on('de-highlight-elements', deHighlight);
  cw.Evt.on('toggle-preview', togglePreview); // Quick Select

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

  var getTree$1 = function getTree(el) {
    if (false === el) return [];
    var domTree = [];
    var selectorTree = getSelectorTree(el);
    selectorTree.forEach(function (elObj) {
      var element = {
        tag: {},
        id: {},
        cls: {}
      };
      element.tag.name = elObj.el.tagName.toLowerCase();
      element.tag.selected = !!(elObj.cwSelected && elObj.cwSelected.tagSelected);

      if (elObj.el.id !== '') {
        element.id.name = "#".concat(elObj.el.id);
        element.id.selected = !!(elObj.cwSelected && elObj.cwSelected.idSelected);
      }

      elObj.el.classList.forEach(function (cls) {
        element.cls[".".concat(cls)] = {
          name: ".".concat(cls),
          selected: elObj.cwSelected ? elObj.cwSelected.classSelected.includes(cls) : false
        };
      });
      domTree.unshift(element);
    });
    return domTree;
  };
  var showTree = function showTree(data) {
    var _PreviewStore$get = PreviewStore.get(),
        currentTarget = _PreviewStore$get.currentTarget,
        showDomTree = _PreviewStore$get.showDomTree;

    if (currentTarget !== data.currentTarget || !showDomTree) {
      PreviewStore.showDomTree(data, getTree$1(data.currentTarget));
    }
  };
  var hideTree = function hideTree() {
    return PreviewStore.hideDomTree();
  };

  var getSelector$1 = function getSelector(domTree) {
    var selector = '';
    domTree.forEach(function (el) {
      if (selector !== '' && !selector.endsWith(' ')) {
        selector += ' ';
      }

      if ('name' in el.tag && !!el.tag.selected) {
        selector += el.tag.name;
      }

      if ('name' in el.id && !!el.id.selected) {
        selector += el.id.name;
      }

      Object.values(el.cls).forEach(function (cls) {
        if (!!cls.selected) {
          selector += cls.name;
        }
      });
    });
    return selector;
  };

  var updateSelector$1 = function updateSelector(domTree) {
    var selector = getSelector$1(domTree);
    cw.Evt.emit('select-element', selector);
  };

  var getTarget = function getTarget(reverseIndex) {
    var target = PreviewStore.get().currentTarget;

    while (reverseIndex > 0) {
      target = target.parentElement;
      reverseIndex--;
    }

    return target;
  };

  var changeTarget = function changeTarget(ri) {
    PreviewStore.hideDomTree();
    setTimeout(function () {
      cw.Evt.emit('select-element', {
        target: getTarget(ri)
      });
    }, 0);
  };
  var highlightToggle = function highlightToggle(ri) {
    var deHighlight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (deHighlight === true) {
      cw.Evt.emit('de-highlight-elements', true);
    } else {
      cw.Evt.emit('highlight-elements', getTarget(ri), true);
    }
  };

  /**
  This is solution for an interesting problem.
  'preview-object-ready' is already triggered when JS reaches here.
  However, as cw.Evt is an object from the parent window (customizer, not the preview where this code is running)
  event callbacks for old page are still triggered after a new page is loaded in the preview.
  Those callbacks (registered in the parent cw.Evt) can be removed in the old preview page upon new preview page's 'preview-object-ready' event.
   */

  cw.Evt.on('preview-object-ready', function () {
    cw.Evt.off('focus-locked', showTree);
    cw.Evt.off('focus-unlocked', hideTree);
  });
  cw.Evt.on('focus-locked', showTree);
  cw.Evt.on('focus-unlocked', hideTree);

  function Focuser() {
    var _useStore = useStore(PreviewStore),
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
    var _useStore = useStore(PreviewStore),
        focusDetails = _useStore.focusDetails,
        detailsOpacity = _useStore.detailsOpacity;

    var styles = _objectSpread2(_objectSpread2({}, focusDetails.style), {}, {
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

  var styles = "#cw-domtree{width:100%;bottom:0;position:fixed;background:#eee;font-size:14px;color:#444;line-height:16px;margin:0}#cw-domtree .cw-domtree-list{white-space:nowrap;list-style-type:none;margin:0;border-top:1px solid #bbb}#cw-domtree .cw-domtree-node{display:inline-block;background-color:#ddd;margin:0;position:relative}#cw-domtree .cw-node-tag{position:relative}#cw-domtree .cw-node-tag button{margin:0;text-transform:none;border:none;letter-spacing:normal;font-size:12px;font-weight:500;height:24px;line-height:24px;padding:0 16px 0 20px;background:#ddd;color:#555;transition:none}#cw-domtree .cw-node-tag .cw-target{display:none;position:absolute;right:-3px;top:6px;width:12px;height:12px;border-radius:6px;background:center/contain no-repeat url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12px' height='12px' viewBox='0 0 12 12'%3E%3Crect fill='%23333' x='5.5' y='.5' width='1' height='3.5'/%3E%3Crect fill='%23333' x='5.5' y='8' width='1' height='3.5'/%3E%3Crect fill='%23333' x='.5' y='5.5' width='3.5' height='1'/%3E%3Crect fill='%23333' x='8' y='5.5' width='3.5' height='1'/%3E%3C/svg%3E\");padding:0;z-index:3}#cw-domtree .cw-node-tag:before{content:\" \";display:block;width:0;height:0;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:10px solid rgba(0,0,0,0.4);position:absolute;top:0;margin-left:1px;left:100%;z-index:1}#cw-domtree .cw-node-tag:after{content:\" \";display:block;width:0;height:0;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:10px solid #ddd;position:absolute;top:0;left:100%;z-index:2}#cw-domtree .cw-domtree-node:hover,#cw-domtree .cw-domtree-node:hover .cw-node-tag button,#cw-domtree .cw-domtree-node .selected button{background-color:#7cb342;color:#fff}#cw-domtree .cw-domtree-node:hover .cw-node-tag:after,#cw-domtree .cw-domtree-node .cw-node-tag.selected:after{border-left-color:#7cb342}#cw-domtree .cw-domtree-node:not(:last-child):hover .cw-target{display:block;background-color:#fff}#cw-domtree .cw-domtree-node .selected button{color:#fff}#cw-domtree .cw-node-attributes{display:none;position:absolute;bottom:100%;background:#eee;height:auto;min-width:15em;color:#444;line-height:16px;margin:0;padding:0 5px;transition:all .5s ease-in-out;border:1px solid #bbb;border-radius:3px;left:0}#cw-domtree .cw-select{display:flex;flex-wrap:wrap;border:none;border-bottom:1px solid #ccc;border-radius:0;box-shadow:none;background:#eee;padding:5px 0}#cw-domtree .cw-select:last-child{border-bottom:none}#cw-domtree .cw-select .cw-select-option{margin:2px;border:none}#cw-domtree .cw-select button{margin:0;text-transform:none;font-weight:500;letter-spacing:normal;height:22px;line-height:22px;font-size:12px;border-radius:3px;padding:0 8px;background:#fff;color:#444;border:none}#cw-domtree .cw-select button.selected{background-color:#7cb342;color:#fff}#cw-domtree .cw-select button:hover{background:#f1f7eb}#cw-domtree .cw-select button.selected:hover{background:#6fa13b}#cw-domtree .cw-domtree-node:hover>.cw-node-attributes{display:block}\n";

  function DomTree() {
    var _useStore = useStore(PreviewStore),
        showDomTree = _useStore.showDomTree,
        domTree = _useStore.domTree;

    return /*#__PURE__*/React.createElement("div", {
      id: "cw-domtree"
    }, showDomTree ? DomTreeList(domTree) : '', /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, styles));
  }

  function DomTreeList(domTree) {
    // If no timeout dom update is jerky.
    var update = function update() {
      return setTimeout(function () {
        return updateSelector$1(domTree);
      }, 100);
    };

    var listItems = [];
    domTree.forEach(function (element, i) {
      listItems.push( /*#__PURE__*/React.createElement("li", {
        key: "".concat(element.tag.name, "-").concat(i),
        className: "cw-domtree-node"
      }, /*#__PURE__*/React.createElement(DomTreeTag, {
        element: element,
        callUpdateSelector: update,
        ri: domTree.length - i - 1
      }), element.id.name || element.cls && Object.keys(element.cls).length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: "cw-node-attributes"
      }, /*#__PURE__*/React.createElement(DomNodeAttributes, {
        element: element,
        callUpdateSelector: update
      })) : null));
    });
    return /*#__PURE__*/React.createElement("ul", {
      className: "cw-domtree-list"
    }, listItems);
  }

  function DomTreeTag(_ref) {
    var element = _ref.element,
        callUpdateSelector = _ref.callUpdateSelector,
        ri = _ref.ri;

    var _React$useState = React.useState(!!element.tag.selected),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        selected = _React$useState2[0],
        updateSelected = _React$useState2[1];

    var changeSelected = function changeSelected() {
      updateSelected(function (prev) {
        element.tag.selected = !prev;
        return !prev;
      });
      callUpdateSelector();
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-node-tag".concat(selected ? ' selected' : '')
    }, /*#__PURE__*/React.createElement("button", {
      onClick: changeSelected
    }, element.tag.name), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return changeTarget(ri);
      },
      className: "cw-target",
      onMouseEnter: function onMouseEnter() {
        return highlightToggle(ri, false);
      },
      onMouseLeave: highlightToggle
    }));
  }

  function DomNodeAttributes(_ref2) {
    var element = _ref2.element,
        callUpdateSelector = _ref2.callUpdateSelector;
    var idValue = [],
        clsValue = [],
        idOptions = [],
        clsOptions = [];

    if (element.id && element.id.name) {
      if (element.id.selected) {
        idValue.push(element.id.name);
      }

      idOptions.push({
        value: element.id.name,
        name: element.id.name
      });
    }

    if (element.cls) {
      Object.entries(element.cls).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            cls = _ref4[1];

        if (cls.selected) {
          clsValue.push(cls.name);
        }

        clsOptions.push({
          value: cls.name,
          name: cls.name
        });
      });
    }

    var onClsChange = function onClsChange(values) {
      Object.values(element.cls).forEach(function (cls) {
        cls.selected = false;
      });
      values.forEach(function (val) {
        element.cls[val].selected = true;
      });
      callUpdateSelector();
    };

    var onIdChange = function onIdChange(values) {
      element.id.selected = values.includes(element.id.name);
      callUpdateSelector();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, idOptions.length > 0 && /*#__PURE__*/React.createElement(DomAttributesSelect, {
      options: idOptions,
      onChange: onIdChange,
      value: idValue
    }), clsOptions.length > 0 && /*#__PURE__*/React.createElement(DomAttributesSelect, {
      options: clsOptions,
      onChange: onClsChange,
      value: clsValue
    }));
  }

  function DomAttributesSelect(_ref5) {
    var options = _ref5.options,
        value = _ref5.value,
        onChange = _ref5.onChange;
    var cOptions = clone(options).map(function (option) {
      return _objectSpread2(_objectSpread2({}, option), {}, {
        selected: value.includes(option.value)
      });
    });

    var _React$useState3 = React.useState(cOptions),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        sOptions = _React$useState4[0],
        updateOptions = _React$useState4[1];

    var _onClick = function onClick(i) {
      updateOptions(function (prev) {
        var cloned = clone(prev);
        cloned[i].selected = !cloned[i].selected;
        onChange(cloned.reduce(function (a, o) {
          if (o.selected) {
            a.push(o.value);
          }

          return a;
        }, []));
        return cloned;
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-select"
    }, sOptions.map(function (option, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: option.value,
        className: "cw-select-option"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _onClick(i);
        },
        className: "".concat(option.selected ? 'selected' : '')
      }, option.name));
    }));
  }

  function Highlighter() {
    var _useStore = useStore(PreviewStore),
        highlightStyles = _useStore.highlightStyles,
        similarStyles = _useStore.similarStyles;

    return /*#__PURE__*/React.createElement("div", {
      id: "cw-highlighter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-highlight-box",
      style: highlightStyles.box
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-highlight-main",
      style: highlightStyles.main
    }), /*#__PURE__*/React.createElement("div", {
      className: "cw-highlight-padding",
      style: highlightStyles.padding
    }), /*#__PURE__*/React.createElement("div", {
      className: "cw-highlight-margin",
      style: highlightStyles.margin
    })), /*#__PURE__*/React.createElement("style", null, similarStyles));
  }

  var styles$1 = "#color-wings{font-family:system-ui, -apple-system, Arial, sans-serif;position:absolute;top:0;left:0;width:100%;height:0;overflow:visible;z-index:1500}#cw-focuser .cw-focus-line{position:absolute;border-color:#7cb342;border-style:solid;border-width:0;box-shadow:0 0 2px rgba(124,179,66,0.6)}#cw-focus-details{position:absolute;color:#fff;font-size:12px;line-height:24px;font-weight:500}#cw-focus-details .cw-selector{padding:0 10px;white-space:nowrap}#cw-highlighter .cw-highlight-box{position:absolute}#cw-highlighter .cw-highlight-main{position:absolute;background:rgba(92,153,214,0.6)}#cw-highlighter .cw-highlight-padding{position:absolute;top:0;left:0;border:0 solid rgba(147,197,129,0.6);box-sizing:border-box}#cw-highlighter .cw-highlight-margin{position:absolute;border:0 solid rgba(244,166,87,0.6);box-sizing:content-box}.customize-partial-edit-shortcut,.customize-partial-edit-shortcut{display:none}\n";

  function Canvas() {
    return /*#__PURE__*/React.createElement("div", {
      id: "cw-canvas"
    }, /*#__PURE__*/React.createElement(FocusDetails, null), /*#__PURE__*/React.createElement(Focuser, null), /*#__PURE__*/React.createElement(Highlighter, null), /*#__PURE__*/React.createElement(DomTree, null), /*#__PURE__*/React.createElement("style", {
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

}());
//# sourceMappingURL=color-wings-preview.js.map
