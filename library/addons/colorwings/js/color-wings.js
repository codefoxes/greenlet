/** @license ColorWings v1.0.0
* color-wings.js
*
* Copyright (c) Color Wings and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
(function (React$1) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;

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

  function _extends() {
    _extends = Object.assign || function (target) {
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

  var EventEmitter = /*#__PURE__*/function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this.events = {};
    }

    _createClass(EventEmitter, [{
      key: "on",
      value: function on(event, listener) {
        var _this = this;

        if (_typeof(this.events[event]) !== 'object') {
          this.events[event] = [];
        }

        this.events[event].push(listener);
        return function () {
          return _this.removeListener(event, listener);
        };
      }
    }, {
      key: "removeListener",
      value: function removeListener(event, listener) {
        if (_typeof(this.events[event]) === 'object') {
          var idx = this.events[event].indexOf(listener);

          if (idx > -1) {
            this.events[event].splice(idx, 1);
          }
        }
      }
    }, {
      key: "emit",
      value: function emit(event) {
        var _this2 = this;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (_typeof(this.events[event]) === 'object') {
          this.events[event].forEach(function (listener) {
            return listener.apply(_this2, args);
          });
        }
      }
    }, {
      key: "once",
      value: function once(event, listener) {
        var _this3 = this;

        var remove = this.on(event, function () {
          remove();

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(_this3, args);
        });
      }
    }]);

    return EventEmitter;
  }();

  var Evt = new EventEmitter();

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

  // http://www.w3.org/TR/CSS21/grammar.html
  // https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
  var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

  var CssParser = function CssParser(css, options) {
    options = options || {};
    /**
     * Positional.
     */

    var lineno = 1;
    var column = 1;
    /**
     * Update lineno and column based on `str`.
     */

    function updatePosition(str) {
      var lines = str.match(/\n/g);
      if (lines) lineno += lines.length;
      var i = str.lastIndexOf('\n');
      column = ~i ? str.length - i : column + str.length;
    }
    /**
     * Mark position and patch `node.position`.
     */


    function position() {
      var start = {
        line: lineno,
        column: column
      };
      return function (node) {
        node.position = new Position(start);
        whitespace();
        return node;
      };
    }
    /**
     * Store position information for a node
     */


    function Position(start) {
      this.start = start;
      this.end = {
        line: lineno,
        column: column
      };
      this.source = options.source;
    }
    /**
     * Non-enumerable source string
     */


    Position.prototype.content = css;
    /**
     * Error `msg`.
     */

    var errorsList = [];

    function error(msg) {
      var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
      err.reason = msg;
      err.filename = options.source;
      err.line = lineno;
      err.column = column;
      err.source = css;

      if (options.silent) {
        errorsList.push(err);
      } else {
        throw err;
      }
    }
    /**
     * Parse stylesheet.
     */


    function stylesheet() {
      var rulesList = rules();
      return {
        type: 'stylesheet',
        stylesheet: {
          source: options.source,
          rules: rulesList,
          parsingErrors: errorsList
        }
      };
    }
    /**
     * Opening brace.
     */


    function open() {
      return match(/^{\s*/);
    }
    /**
     * Closing brace.
     */


    function close() {
      return match(/^}/);
    }
    /**
     * Parse ruleset.
     */


    function rules() {
      var node;
      var rules = [];
      whitespace();
      comments(rules);

      while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
        if (node !== false) {
          rules.push(node);
          comments(rules);
        }
      }

      return rules;
    }
    /**
     * Match `re` and return captures.
     */


    function match(re) {
      var m = re.exec(css);
      if (!m) return;
      var str = m[0];
      updatePosition(str);
      css = css.slice(str.length);
      return m;
    }
    /**
     * Parse whitespace.
     */


    function whitespace() {
      match(/^\s*/);
    }
    /**
     * Parse comments;
     */


    function comments(rules) {
      var c;
      rules = rules || [];

      while (c = comment()) {
        if (c !== false) {
          rules.push(c);
        }
      }

      return rules;
    }
    /**
     * Parse comment.
     */


    function comment() {
      var pos = position();
      if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;
      var i = 2;

      while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) {
        ++i;
      }

      i += 2;

      if ("" === css.charAt(i - 1)) {
        return error('End of comment missing');
      }

      var str = css.slice(2, i - 2);
      column += 2;
      updatePosition(str);
      css = css.slice(i);
      column += 2;
      return pos({
        type: 'comment',
        comment: str
      });
    }
    /**
     * Parse selector.
     */


    function selector() {
      var m = match(/^([^{]+)/);
      if (!m) return;
      /* @fix Remove all comments from selectors
       * http://ostermiller.org/findcomment.html */

      return trim(m[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '').replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
        return m.replace(/,/g, "\u200C");
      }).split(/\s*(?![^(]*\)),\s*/).map(function (s) {
        return s.replace(/\u200C/g, ',');
      });
    }
    /**
     * Parse declaration.
     */


    function declaration() {
      var pos = position(); // prop

      var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (!prop) return;
      prop = trim(prop[0]); // :

      if (!match(/^:\s*/)) return error("property missing ':'"); // val

      var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
      var ret = pos({
        type: 'declaration',
        property: prop.replace(commentre, ''),
        value: val ? trim(val[0]).replace(commentre, '') : ''
      }); // ;

      match(/^[;\s]*/);
      return ret;
    }
    /**
     * Parse declarations.
     */


    function declarations() {
      var decls = [];
      if (!open()) return error("missing '{'");
      comments(decls); // declarations

      var decl;

      while (decl = declaration()) {
        if (decl !== false) {
          decls.push(decl);
          comments(decls);
        }
      }

      if (!close()) return error("missing '}'");
      return decls;
    }
    /**
     * Parse keyframe.
     */


    function keyframe() {
      var m;
      var vals = [];
      var pos = position();

      while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
        vals.push(m[1]);
        match(/^,\s*/);
      }

      if (!vals.length) return;
      return pos({
        type: 'keyframe',
        values: vals,
        declarations: declarations()
      });
    }
    /**
     * Parse keyframes.
     */


    function atkeyframes() {
      var pos = position();
      var m = match(/^@([-\w]+)?keyframes\s*/);
      if (!m) return;
      var vendor = m[1]; // identifier

      var m = match(/^([-\w]+)\s*/);
      if (!m) return error("@keyframes missing name");
      var name = m[1];
      if (!open()) return error("@keyframes missing '{'");
      var frame;
      var frames = comments();

      while (frame = keyframe()) {
        frames.push(frame);
        frames = frames.concat(comments());
      }

      if (!close()) return error("@keyframes missing '}'");
      return pos({
        type: 'keyframes',
        name: name,
        vendor: vendor,
        keyframes: frames
      });
    }
    /**
     * Parse supports.
     */


    function atsupports() {
      var pos = position();
      var m = match(/^@supports *([^{]+)/);
      if (!m) return;
      var supports = trim(m[1]);
      if (!open()) return error("@supports missing '{'");
      var style = comments().concat(rules());
      if (!close()) return error("@supports missing '}'");
      return pos({
        type: 'supports',
        supports: supports,
        rules: style
      });
    }
    /**
     * Parse host.
     */


    function athost() {
      var pos = position();
      var m = match(/^@host\s*/);
      if (!m) return;
      if (!open()) return error("@host missing '{'");
      var style = comments().concat(rules());
      if (!close()) return error("@host missing '}'");
      return pos({
        type: 'host',
        rules: style
      });
    }
    /**
     * Parse media.
     */


    function atmedia() {
      var pos = position();
      var m = match(/^@media *([^{]+)/);
      if (!m) return;
      var media = trim(m[1]);
      if (!open()) return error("@media missing '{'");
      var style = comments().concat(rules());
      if (!close()) return error("@media missing '}'");
      return pos({
        type: 'media',
        media: media,
        rules: style
      });
    }
    /**
     * Parse custom-media.
     */


    function atcustommedia() {
      var pos = position();
      var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
      if (!m) return;
      return pos({
        type: 'custom-media',
        name: trim(m[1]),
        media: trim(m[2])
      });
    }
    /**
     * Parse paged media.
     */


    function atpage() {
      var pos = position();
      var m = match(/^@page */);
      if (!m) return;
      var sel = selector() || [];
      if (!open()) return error("@page missing '{'");
      var decls = comments(); // declarations

      var decl;

      while (decl = declaration()) {
        decls.push(decl);
        decls = decls.concat(comments());
      }

      if (!close()) return error("@page missing '}'");
      return pos({
        type: 'page',
        selectors: sel,
        declarations: decls
      });
    }
    /**
     * Parse document.
     */


    function atdocument() {
      var pos = position();
      var m = match(/^@([-\w]+)?document *([^{]+)/);
      if (!m) return;
      var vendor = trim(m[1]);
      var doc = trim(m[2]);
      if (!open()) return error("@document missing '{'");
      var style = comments().concat(rules());
      if (!close()) return error("@document missing '}'");
      return pos({
        type: 'document',
        document: doc,
        vendor: vendor,
        rules: style
      });
    }
    /**
     * Parse font-face.
     */


    function atfontface() {
      var pos = position();
      var m = match(/^@font-face\s*/);
      if (!m) return;
      if (!open()) return error("@font-face missing '{'");
      var decls = comments(); // declarations

      var decl;

      while (decl = declaration()) {
        decls.push(decl);
        decls = decls.concat(comments());
      }

      if (!close()) return error("@font-face missing '}'");
      return pos({
        type: 'font-face',
        declarations: decls
      });
    }
    /**
     * Parse import
     */


    var atimport = _compileAtrule('import');
    /**
     * Parse charset
     */


    var atcharset = _compileAtrule('charset');
    /**
     * Parse namespace
     */


    var atnamespace = _compileAtrule('namespace');
    /**
     * Parse non-block at-rules
     */


    function _compileAtrule(name) {
      var re = new RegExp('^@' + name + '\\s*([^;]+);');
      return function () {
        var pos = position();
        var m = match(re);
        if (!m) return;
        var ret = {
          type: name
        };
        ret[name] = m[1].trim();
        return pos(ret);
      };
    }
    /**
     * Parse at rule.
     */


    function atrule() {
      if (css[0] != '@') return;
      return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface();
    }
    /**
     * Parse rule.
     */


    function rule() {
      var pos = position();
      var sel = selector();
      if (!sel) return error('selector missing');
      comments();
      return pos({
        type: 'rule',
        selectors: sel,
        declarations: declarations()
      });
    }

    return addParent(stylesheet());
  };
  /**
   * Trim `str`.
   */


  function trim(str) {
    return str ? str.replace(/^\s+|\s+$/g, '') : '';
  }
  /**
   * Adds non-enumerable parent node reference to each node.
   */


  function addParent(obj, parent) {
    var isNode = obj && typeof obj.type === 'string';
    var childParent = isNode ? obj : parent;

    for (var k in obj) {
      var value = obj[k];

      if (Array.isArray(value)) {
        value.forEach(function (v) {
          addParent(v, childParent);
        });
      } else if (value && _typeof(value) === 'object') {
        addParent(value, childParent);
      }
    }

    if (isNode) {
      Object.defineProperty(obj, 'parent', {
        configurable: true,
        writable: true,
        enumerable: false,
        value: parent || null
      });
    }

    return obj;
  }

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
  function waitUntil(condition) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
    var resolveCb;

    var resolved = function resolved(cb) {
      resolveCb = cb;
    }; // Todo: Add rejected logic.


    var rejected = function rejected() {};

    var counter = timeout / interval;
    var intId = setInterval(function () {
      counter--;

      if (typeof condition === 'function' && condition() === true || condition === true && typeof resolveCb === 'function') {
        resolveCb();
        clearInterval(intId);
      }

      if (counter <= 0) {
        clearInterval(intId);
      }
    }, interval);
    return [resolved, rejected];
  }

  var initialState = {
    mounted: true,
    currentTheme: cwControlObject.theme,
    currentPage: 'global',
    currentPageType: 'global',
    currentSelector: '',
    currentPseudo: '',
    openSection: false,
    currentStyles: {},
    previewObject: {},
    allFonts: {},
    quickSelectors: [],
    selectorClass: ''
  };

  var MainStoreClass = /*#__PURE__*/function (_Store) {
    _inherits(MainStoreClass, _Store);

    var _super = _createSuper(MainStoreClass);

    function MainStoreClass() {
      _classCallCheck(this, MainStoreClass);

      return _super.apply(this, arguments);
    }

    _createClass(MainStoreClass, [{
      key: "setMounted",
      value: function setMounted(mounted) {
        this.set(function () {
          return {
            mounted: mounted
          };
        });
      }
    }, {
      key: "toggleSection",
      value: function toggleSection(section) {
        this.set(function (state) {
          return state.openSection === section ? {
            openSection: false
          } : {
            openSection: section
          };
        });
      }
    }, {
      key: "addInitialSettings",
      value: function addInitialSettings(settings) {
        if (!settings) {
          return;
        }

        var allFonts = {};

        for (var page in settings) {
          if (!settings.hasOwnProperty(page)) {
            continue;
          }

          if ('fonts' in settings[page]) {
            allFonts[page] = settings[page].fonts;
          }
        }

        this.set(function () {
          return {
            allFonts: allFonts
          };
        });
      }
    }, {
      key: "changePage",
      value: function changePage(currentPage, currentPageType) {
        this.set(function () {
          return {
            currentPage: currentPage,
            currentPageType: currentPageType
          };
        });
      }
    }, {
      key: "addPreviewObject",
      value: function addPreviewObject(previewObject) {
        this.set(function () {
          return {
            previewObject: previewObject
          };
        });
      }
    }, {
      key: "addFont",
      value: function addFont(font) {
        this.set(function (_ref) {
          var currentPage = _ref.currentPage,
              allFonts = _ref.allFonts;

          if (!(currentPage in allFonts)) {
            allFonts[currentPage] = {};
          }

          var source = font.source;
          var family = font.family;
          var style = 'normal' === font.style ? '' : 'i';
          var weight = "".concat(font.weight).concat(style);

          if (source in allFonts[currentPage]) {
            if (family in allFonts[currentPage][source]) {
              if (!allFonts[currentPage][source][family].includes(weight)) {
                allFonts[currentPage][source][family].push(weight);
              }
            } else {
              allFonts[currentPage][source][family] = [weight];
            }
          } else {
            allFonts[currentPage][source] = _defineProperty({}, family, [weight]);
          }

          return {
            allFonts: allFonts
          };
        });
      }
    }, {
      key: "setQuickSelectors",
      value: function setQuickSelectors(quickSelectors) {
        this.set(function () {
          return {
            quickSelectors: quickSelectors
          };
        });
      }
    }, {
      key: "togglePseudo",
      value: function togglePseudo() {
        var currentPseudo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.set(function () {
          return {
            currentPseudo: currentPseudo
          };
        });
      }
    }, {
      key: "setSelectorClass",
      value: function setSelectorClass() {
        var selectorClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.set(function () {
          return {
            selectorClass: selectorClass
          };
        });
      }
    }]);

    return MainStoreClass;
  }(Store);

  var MainStore = new MainStoreClass(initialState);

  var initialState$1 = {
    currentPreviewWidth: 0,
    breakpoints: [],
    queries: {},
    currentMedia: {
      key: '',
      query: 'all'
    }
  };

  var MediaClass = /*#__PURE__*/function (_Store) {
    _inherits(MediaClass, _Store);

    var _super = _createSuper(MediaClass);

    function MediaClass() {
      _classCallCheck(this, MediaClass);

      return _super.apply(this, arguments);
    }

    _createClass(MediaClass, [{
      key: "setInitialMediaQueries",
      value: function setInitialMediaQueries(mediaQueries) {
        var queries = {};
        var breakpoints = [];
        mediaQueries.forEach(function (query) {
          if (query === 'all') {
            return;
          }

          var minMatch = query.match(/\d*(min-width):\s*(\d+\s?)(px)/);
          var maxMatch = query.match(/\d*(max-width):\s*(\d+\s?)(px)/);

          if (minMatch === null && maxMatch === null) {
            return;
          }

          var min = 0,
              max = 5000;

          if (minMatch !== null) {
            min = Number(minMatch[2]);
            if (breakpoints.indexOf(min) === -1) breakpoints.push(min);
          }

          if (maxMatch !== null) {
            max = Number(maxMatch[2]);
            if (breakpoints.indexOf(max) === -1) breakpoints.push(max);
          }

          queries["".concat(min, "-").concat(max)] = {
            min: min,
            max: max,
            enabled: true
          };
        });
        this.set(function () {
          return {
            queries: queries,
            breakpoints: breakpoints
          };
        });
      }
    }, {
      key: "addBreakpoint",
      value: function addBreakpoint() {
        var prepareQueries = function prepareQueries(breakpoints) {
          var points = [0].concat(_toConsumableArray(breakpoints), [5000]);
          var pairs = {};

          for (var i = 0; i < points.length - 1; i++) {
            for (var j = i; j < points.length - 1; j++) {
              if (i === 0 && j === points.length - 2) {
                continue;
              }

              pairs["".concat(points[i], "-").concat(points[j + 1])] = {
                min: points[i],
                max: points[j + 1],
                enabled: i === j
              };
            }
          }

          return pairs;
        };

        this.set(function (state) {
          var breakpoints = state.breakpoints,
              currentPreviewWidth = state.currentPreviewWidth;

          if (breakpoints.indexOf(currentPreviewWidth) === -1) {
            breakpoints.push(currentPreviewWidth);
          }

          breakpoints.sort(function (a, b) {
            return a - b;
          });
          var queries = prepareQueries(breakpoints);
          return {
            breakpoints: breakpoints,
            queries: queries
          };
        });
      }
    }, {
      key: "updatePreviewWidth",
      value: function updatePreviewWidth(currentPreviewWidth) {
        this.set(function () {
          return {
            currentPreviewWidth: currentPreviewWidth
          };
        });
      }
    }, {
      key: "toggleEnabled",
      value: function toggleEnabled(queryKey) {
        var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.set(function (prev) {
          var queries = prev.queries;
          queries[queryKey].enabled = state ? state : !queries[queryKey].enabled;
          return {
            queries: queries
          };
        });
      }
    }, {
      key: "activateQuery",
      value: function activateQuery(queryKey) {
        var getQuery = function getQuery(q) {
          return "".concat(q.min !== 0 ? '(min-width: ' + q.min + 'px)' : '').concat(q.min !== 0 && q.max !== 5000 ? ' and ' : '').concat(q.max !== 5000 ? '(max-width: ' + q.max + 'px)' : '');
        };

        this.set(function (prev) {
          return {
            currentMedia: {
              key: queryKey,
              query: getQuery(prev.queries[queryKey])
            }
          };
        });
        this.toggleEnabled(queryKey, true);
      }
    }, {
      key: "deActivateQuery",
      value: function deActivateQuery() {
        this.set(function () {
          return {
            currentMedia: {
              key: '',
              query: 'all'
            }
          };
        });
      }
    }, {
      key: "removeBreakpoint",
      value: function removeBreakpoint(breakpoint) {
        this.set(function (prev) {
          var breakpoints = prev.breakpoints.filter(function (point) {
            return point !== breakpoint;
          });
          var queries = Object.filter(prev.queries, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                query = _ref2[1];

            return query.min !== breakpoint && query.max !== breakpoint;
          });
          return {
            queries: queries,
            breakpoints: breakpoints
          };
        });
      }
    }]);

    return MediaClass;
  }(Store);

  var MediaStore = new MediaClass(initialState$1);

  var initialState$2 = {
    styles: {
      all: {}
    },
    allOutputs: {}
  };

  var StylesClass = /*#__PURE__*/function (_Store) {
    _inherits(StylesClass, _Store);

    var _super = _createSuper(StylesClass);

    function StylesClass() {
      _classCallCheck(this, StylesClass);

      return _super.apply(this, arguments);
    }

    _createClass(StylesClass, [{
      key: "addInitialStyle",
      value: function addInitialStyle(styles, settings) {
        var allOutputs = {};

        for (var page in settings) {
          if (!settings.hasOwnProperty(page)) {
            continue;
          }

          allOutputs[page] = settings[page].styles;
        }

        var parsedStyles = this.parseStyles(styles);
        this.overrideInitialState({
          styles: parsedStyles,
          allOutputs: allOutputs
        });
        MediaStore.setInitialMediaQueries(Object.keys(parsedStyles));
      }
    }, {
      key: "generateOutput",
      value: function generateOutput(styles) {
        var styleString = '';

        for (var media in styles) {
          if (!styles.hasOwnProperty(media)) {
            continue;
          }

          if ('all' !== media) {
            styleString += "@media ".concat(media, "{");
          }

          for (var selector in styles[media]) {
            if (!styles[media].hasOwnProperty(selector)) {
              continue;
            }

            styleString += selector + '{';

            for (var property in styles[media][selector]) {
              if (!styles[media][selector].hasOwnProperty(property)) {
                continue;
              }

              styleString += "".concat(property, ":").concat(styles[media][selector][property], ";");
            }

            styleString += '}';
          }

          if ('all' !== media) {
            styleString += "}";
          }
        }

        return styleString;
      }
    }, {
      key: "registerSpecialSubscriber",
      value: function registerSpecialSubscriber(fn) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tempStyler';

        if (name === 'tempStyler') {
          this.tempStyler = fn;
        } else if (name === 'fontManager') {
          this.addFont = fn;
        }

        this.debouncedSetStyles = debounce(this.setStyles, 500);
      }
    }, {
      key: "addStyle",
      value: function addStyle(selector, property, value) {
        var media = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'all';
        this.tempStyler("".concat(selector, " { ").concat(property, ": ").concat(value, "; }"));
        this.debouncedSetStyles(selector, property, value, media);
      }
    }, {
      key: "addStyleNow",
      value: function addStyleNow(selector, property, value) {
        var media = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'all';
        // Add style without debounce.
        this.tempStyler("".concat(selector, " { ").concat(property, ": ").concat(value, "; }"));
        this.setStyles(selector, property, value, media);
      }
    }, {
      key: "setStyles",
      value: function setStyles(selector, property, value) {
        var _this = this;

        var media = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'all';
        // Todo: Maybe get media while calling setStyles
        media = MediaStore.get().currentMedia.query;
        this.set(function (state) {
          var _MainStore$get = MainStore.get(),
              currentPseudo = _MainStore$get.currentPseudo;

          selector = currentPseudo !== '' ? "".concat(selector, ":").concat(currentPseudo) : selector;
          var styles = state.styles;

          if (!styles.hasOwnProperty(media)) {
            styles[media] = {};
          }

          if (!styles[media].hasOwnProperty(selector)) {
            styles[media][selector] = {};
          }

          styles[media][selector][property] = value;

          var _MainStore$get2 = MainStore.get(),
              currentPage = _MainStore$get2.currentPage;

          state.allOutputs[currentPage] = _this.generateOutput(styles);
          return {
            styles: styles,
            allOutputs: state.allOutputs
          };
        });
      }
    }, {
      key: "parseStyles",
      value: function parseStyles(cssString) {
        var getStylesFromRules = function getStylesFromRules(rules) {
          var media = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
          var styles = {};
          styles[media] = {};
          rules.forEach(function (rule) {
            if (rule.type === 'rule') {
              var declarations = {};
              rule.declarations.forEach(function (declaration) {
                declarations[declaration.property] = declaration.value;
              });
              styles[media][rule.selectors.join(', ')] = declarations;
            } else if (rule.type === 'media') {
              styles[rule.media] = getStylesFromRules(rule.rules, rule.media)[rule.media];
            }
          });
          return styles;
        };

        try {
          var parsed = CssParser(cssString);
          return getStylesFromRules(parsed.stylesheet.rules);
        } catch (error) {
          console.log(error); // If error show notice

          return false;
        }
      }
    }, {
      key: "addFromString",
      value: function addFromString(cssString) {
        var styles = this.parseStyles(cssString);
        if (!styles) return false;
        this.set(function (state) {
          var _MainStore$get3 = MainStore.get(),
              currentPage = _MainStore$get3.currentPage;

          state.allOutputs[currentPage] = cssString;
          return {
            styles: styles,
            allOutputs: state.allOutputs
          };
        });
      }
    }, {
      key: "removeMediaStyles",
      value: function removeMediaStyles(queries) {
        var _this2 = this;

        this.set(function (state) {
          var styles = state.styles;
          queries.forEach(function (query) {
            delete styles[query];
          });
          state.allOutputs[MainStore.get().currentPage] = _this2.generateOutput(styles);
          return {
            styles: styles,
            allOutputs: state.allOutputs
          };
        });
      }
    }]);

    return StylesClass;
  }(Store);

  var StylesStore = new StylesClass(initialState$2);

  window.cw = {
    Evt: Evt,
    StylesStore: StylesStore,
    MainStore: MainStore
  };

  Object.filter = function (obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(predicate));
  };

  var specialStyle, barStyle, resizerDetails;
  cw.Evt.on('cw-media-loaded', function () {
    specialStyle = document.createElement('style');
    specialStyle.id = 'cwm-special-styles';
    barStyle = document.createElement('style');
    barStyle.id = 'cwm-bar-styles';
    document.getElementById('color-wings-media').append(specialStyle, barStyle);
    resizerDetails = document.getElementById('cwm-resizer-details');
  });

  function resizePreview(left) {
    specialStyle.innerHTML = ".cwm-resizer{left:".concat(left, "px;}.cwm-enabled #customize-preview{width:").concat(left, "px;}");
    resizerDetails.innerHTML = "".concat(left, "px");
  }

  function endResizePreview(left) {
    barStyle.innerHTML = ".cwm-bar .cwm-breakpoint-adder{left:".concat(left, "px;}");
    MediaStore.updatePreviewWidth(left);
  }

  function resetResizer() {
    specialStyle.innerHTML = '';
    setTimeout(function () {
      var preview = document.getElementById('customize-preview');
      resizerDetails.innerHTML = "".concat(preview.clientWidth, "px");
      endResizePreview(preview.clientWidth);
    }, 500);
  }

  function toggleCurrentQuery(key) {
    if (key === MediaStore.get().currentMedia.key || '' === key) {
      MediaStore.deActivateQuery();
    } else {
      MediaStore.activateQuery(key);
    }
  }

  function BreakPoint(_ref) {
    var left = _ref.left;

    var _React$useState = React.useState({
      show: false,
      x: 0,
      y: 0
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        context = _React$useState2[0],
        setContext = _React$useState2[1];

    var showContextMenu = function showContextMenu(e) {
      e.preventDefault();
      setContext({
        show: true,
        x: e.clientX,
        y: e.clientY
      });
    };

    var hideContextMenu = function hideContextMenu() {
      return setContext({
        show: false
      });
    };

    var getBreakpointQueries = function getBreakpointQueries(point) {
      var _StylesStore$get = StylesStore.get(),
          styles = _StylesStore$get.styles;

      var queries = [];
      var queriesString = '';

      for (var media in styles) {
        if (!styles.hasOwnProperty(media)) {
          continue;
        }

        if (media.includes(point)) {
          queries.push(media);
          queriesString += "\n".concat(media);
        }
      }

      return {
        queries: queries,
        queriesString: queriesString
      };
    };

    var showConfirm = function showConfirm() {
      var confirmed = true;

      var _getBreakpointQueries = getBreakpointQueries(left),
          queries = _getBreakpointQueries.queries,
          queriesString = _getBreakpointQueries.queriesString;

      if (queriesString !== '') {
        confirmed = window.confirm("This will also remove all styles for following media queries:\n".concat(queriesString, "\n\nAre you sure you want to remove?"));
      }

      if (confirmed) {
        MediaStore.removeBreakpoint(left);
        StylesStore.removeMediaStyles(queries);
      }

      hideContextMenu();
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, context.show && /*#__PURE__*/React.createElement("div", {
      className: "cwm-breakpoint-context"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cwm-context-bg",
      onClick: hideContextMenu
    }), /*#__PURE__*/React.createElement("div", {
      className: "cwm-context-menu",
      style: {
        left: context.x + 2,
        top: context.y
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cwm-context-item",
      onClick: showConfirm
    }, "Remove Breakpoint"))), /*#__PURE__*/React.createElement("div", {
      className: "cwm-breakpoint",
      style: {
        left: "".concat(left, "px")
      },
      onContextMenu: showContextMenu
    }));
  }

  function Bar() {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        expanded = _React$useState2[0],
        setExpanded = _React$useState2[1];

    var _useStore = useStore(MediaStore),
        queries = _useStore.queries,
        breakpoints = _useStore.breakpoints,
        currentPreviewWidth = _useStore.currentPreviewWidth,
        currentMedia = _useStore.currentMedia;

    var isNew = function isNew() {
      return breakpoints.indexOf(currentPreviewWidth) === -1;
    };

    var addBreakpoint = function addBreakpoint() {
      MediaStore.addBreakpoint();
    };

    var colors = ['rgba(229, 57, 53, .2)', 'rgb(142, 36, 170, .2)', 'rgb(57, 73, 171, .2)', 'rgb(3, 155, 229, .2)', 'rgb(0, 137, 123, .2)', 'rgb(124, 179, 66, .2)', 'rgb(253, 216, 53, .2)', 'rgb(251, 140, 0, .2)', 'rgb(109, 76, 65, .2)', 'rgb(84, 110, 122, .2)'];
    var eColors = ['rgba(229, 57, 53, .8)', 'rgb(142, 36, 170, .8)', 'rgb(57, 73, 171, .8)', 'rgb(3, 155, 229, .8)', 'rgb(0, 137, 123, .8)', 'rgb(124, 179, 66, .8)', 'rgb(253, 216, 53, .8)', 'rgb(251, 140, 0, .8)', 'rgb(109, 76, 65, .8)', 'rgb(84, 110, 122, .8)'];

    var toggleMediaBar = function toggleMediaBar() {
      setExpanded(function (prev) {
        return !prev;
      });
    };

    var toggleEnabled = function toggleEnabled(e, key) {
      e.stopPropagation();
      MediaStore.toggleEnabled(key);
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cwm-bar".concat(expanded ? ' expanded' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "cwm-queries"
    }, Object.entries(queries).map(function (_ref, i) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          query = _ref2[1];

      var top = expanded ? "".concat(25 * (i % 10), "px") : "".concat(2 * (i % 10), "px");
      var active = currentMedia.key === key;

      if (active && !expanded) {
        top = 0;
      }

      return /*#__PURE__*/React.createElement("div", {
        key: key,
        onClick: function onClick() {
          return toggleCurrentQuery(key);
        },
        className: "cwm-query".concat(query.enabled ? ' enabled' : '').concat(active ? ' active' : ''),
        style: {
          left: "".concat(query.min + 1, "px"),
          width: "".concat(query.max - query.min - 2, "px"),
          background: query.enabled ? eColors[i % 9] : colors[i % 9],
          top: top
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "cwm-query-enabler dashicons ".concat(query.enabled ? 'dashicons-visibility' : 'dashicons-hidden'),
        onClick: function onClick(e) {
          return toggleEnabled(e, key);
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "cwm-query-details"
      }, query.min !== 0 ? "(min: ".concat(query.min, "px)") : '', " ", query.min !== 0 && query.max !== 5000 ? '&' : '', " ", query.max !== 5000 ? "(max: ".concat(query.max, "px)") : ''));
    })), /*#__PURE__*/React.createElement("div", {
      className: "cwm-breakpoints"
    }, breakpoints.map(function (breakpoint) {
      return /*#__PURE__*/React.createElement(BreakPoint, {
        key: breakpoint,
        left: breakpoint
      });
    })), isNew() && /*#__PURE__*/React.createElement("div", {
      className: "cwm-breakpoint-adder",
      onClick: addBreakpoint
    }, /*#__PURE__*/React.createElement("span", {
      className: "plus-sign"
    }, "+"), /*#__PURE__*/React.createElement("span", {
      className: "adder-text"
    }, "Add Breakpoint")), /*#__PURE__*/React.createElement("div", {
      className: "cwm-bar-toggler",
      onClick: toggleMediaBar
    }, /*#__PURE__*/React.createElement("span", {
      className: "dashicons dashicons-leftright"
    })));
  }

  function Resizer(props) {
    var ref = React.createRef();
    var pos = 0,
        left = 0;

    var elementDrag = function elementDrag(e) {
      e.preventDefault();
      var rawLeft = Math.floor(e.clientX - pos);
      if (rawLeft < 1) return;
      left = rawLeft;

      if (props.onResize) {
        props.onResize(left);
      }
    };

    var end = function end() {
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', end);
      document.removeEventListener('touchcancel', end);
      document.removeEventListener('touchend', end);

      if (props.onEnd) {
        props.onEnd(left);
      }

      document.body.classList.remove('cwm-resizing');
    };

    function start(e) {
      e.preventDefault();
      document.body.classList.add('cwm-resizing');
      pos = ref.current.parentNode.getBoundingClientRect().left;
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', end);
      document.addEventListener('touchcancel', end);
      document.addEventListener('touchend', end);
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "cwm-resizer",
      ref: ref,
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: end,
      onTouchCancel: end,
      onTouchEnd: end
    }, /*#__PURE__*/React.createElement("div", {
      className: "cwm-resizer-tip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cwm-indicator"
    }), /*#__PURE__*/React.createElement("div", {
      id: "cwm-resizer-details"
    })));
  }

  var styles = "#color-wings-media {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100%; }\n  #color-wings-media * {\n    box-sizing: border-box; }\n\n.cwm-enabled #color-wings-media {\n  display: block; }\n\n.cwm-enabled #customize-preview {\n  height: calc( 100% - 24px);\n  top: 24px;\n  left: 0;\n  margin: auto 0 auto 1px; }\n  .cwm-enabled #customize-preview iframe {\n    z-index: 2; }\n\n.cwm-bar {\n  position: fixed;\n  top: 0;\n  left: 301px;\n  right: 0;\n  height: 24px;\n  background: #444;\n  color: #eee;\n  border-bottom: 1px solid #555;\n  z-index: 5; }\n\n@media screen and (min-width: 1667px) {\n  .cwm-bar {\n    left: calc( 18% + 1px); } }\n\n.collapsed .cwm-bar {\n  left: 1px !important; }\n\n.cwm-resizer {\n  position: absolute;\n  left: 100%;\n  height: 100%;\n  width: 14px;\n  background: #666;\n  cursor: ew-resize;\n  z-index: 3; }\n  .cwm-resizer:before {\n    content: '';\n    width: 2px;\n    height: 26px;\n    top: 50%;\n    position: absolute;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    border-right: 2px solid #888;\n    border-left: 2px solid #888; }\n\n.cwm-resizing #color-wings-media {\n  z-index: 3; }\n\n.cwm-resizing #customize-preview {\n  transition: none !important; }\n\n.cwm-resizer-tip {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.cwm-indicator {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 26px;\n  width: 0;\n  border-top: 1px solid #eee;\n  border-right: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  border-left: 1px solid #69e000; }\n\n#cwm-resizer-details {\n  position: absolute;\n  top: 2px;\n  color: #fff;\n  left: 16px;\n  background: #444444;\n  padding: 0 10px; }\n\n.cwm-breakpoint-adder {\n  position: absolute;\n  background: #eee;\n  border: 1px solid #666;\n  color: #000;\n  left: 0;\n  top: 0;\n  padding: 0 5px 0 5px;\n  border-radius: 0 0 3px 0;\n  max-height: 18px;\n  white-space: nowrap;\n  cursor: pointer;\n  z-index: 5;\n  border-top-width: 0;\n  line-height: 16px; }\n  .cwm-breakpoint-adder:before, .cwm-breakpoint-adder:after {\n    content: '';\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 100%;\n    width: 0;\n    height: 0;\n    border-top: 6px solid #eee;\n    border-right: 8px solid transparent;\n    border-bottom: 0 solid transparent;\n    border-left: 0 solid transparent; }\n  .cwm-breakpoint-adder:before {\n    left: -1px;\n    border-top: 8px solid #666;\n    border-right: 11px solid transparent;\n    border-bottom: 0 solid transparent;\n    border-left: 0 solid transparent; }\n  .cwm-breakpoint-adder .plus-sign {\n    font-size: 18px; }\n  .cwm-breakpoint-adder .adder-text {\n    display: none; }\n  .cwm-breakpoint-adder:hover .adder-text {\n    display: block; }\n  .cwm-breakpoint-adder:hover .plus-sign {\n    display: none; }\n\n.cwm-resizing .cwm-breakpoint-adder {\n  display: none; }\n\n.cwm-queries, .cwm-breakpoints {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n.cwm-breakpoints {\n  height: 0; }\n\n.cwm-breakpoint {\n  position: absolute;\n  height: 24px;\n  width: 10px;\n  cursor: pointer;\n  transform: translateX(-50%); }\n  .cwm-breakpoint:before {\n    content: '';\n    position: absolute;\n    left: 50%;\n    height: 100%;\n    width: 1px;\n    background: #7cb342; }\n\n.cwm-query {\n  position: absolute;\n  height: 30%;\n  line-height: 24px;\n  color: #444;\n  cursor: pointer;\n  display: none; }\n  .cwm-query.enabled {\n    color: #fff;\n    display: block; }\n\n.cwm-bar.expanded .cwm-queries {\n  height: 250px;\n  background: #fff;\n  box-shadow: 0 0 100px 50px #000; }\n\n.cwm-bar.expanded .cwm-query {\n  display: block;\n  height: 24px;\n  border-radius: 3px; }\n  .cwm-bar.expanded .cwm-query:not(.active) .cwm-query-enabler {\n    display: block; }\n\n.cwm-bar.expanded .cwm-query-details {\n  display: block; }\n\n.cwm-bar-toggler {\n  position: absolute;\n  right: 0;\n  background: #7cb342;\n  cursor: pointer; }\n  .cwm-bar-toggler .dashicons {\n    line-height: 24px;\n    height: 24px;\n    width: 24px;\n    transform: rotateZ(90deg); }\n\n.cwm-query-enabler {\n  position: absolute;\n  font-size: 14px;\n  line-height: 24px;\n  height: 24px;\n  padding: 0 6px;\n  width: max-content;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  display: none; }\n  .cwm-query-enabler:hover {\n    background: rgba(0, 0, 0, 0.2); }\n\n.cwm-query-details {\n  font-size: 12px;\n  white-space: nowrap;\n  padding-left: 34px;\n  display: none; }\n  .cwm-query-details:hover {\n    background: #7cb342;\n    color: #fff; }\n\n.cwm-query.active {\n  height: 24px; }\n  .cwm-query.active .cwm-query-details {\n    display: block;\n    padding-left: 8px; }\n\n.cwm-context-bg {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 100%; }\n\n.cwm-context-menu {\n  position: fixed;\n  padding: 4px 0 5px;\n  background: rgba(239, 239, 239, 0.95);\n  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.34);\n  border-radius: 4px;\n  color: #000; }\n\n.cwm-context-item {\n  padding: 1px 20px;\n  cursor: default; }\n  .cwm-context-item:hover {\n    background: #4195fa;\n    color: #fff; }\n";

  function Canvas() {
    React.useEffect(function () {
      cw.Evt.emit('cw-media-loaded');
    }, []);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Bar, null), /*#__PURE__*/React.createElement(Resizer, {
      onResize: resizePreview,
      onEnd: endResizePreview
    }), /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, styles));
  }

  var cwmNode, cwmState, cwmDevice;

  function toggleMediaEditor() {
    var op = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'disable';
    cwmNode = document.getElementById('color-wings-media');

    if (null === cwmNode) {
      cwmNode = document.createElement('div');
      cwmNode.id = 'color-wings-media';
      var preview = document.getElementById('customize-preview');
      preview.appendChild(cwmNode); // preview.parentNode.insertBefore(cwmNode, preview.nextSibling);

      ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, null), cwmNode);
    }

    if (op === 'enable') {
      cwmState = 'open';

      if ('desktop' !== cwmDevice) {
        document.documentElement.classList.add('cwm-enabled');
      }
    } else {
      cwmState = 'close';
      document.documentElement.classList.remove('cwm-enabled');
    }
  }

  function changeDevice(newDevice) {
    cwmDevice = newDevice;

    if ('desktop' !== newDevice && 'open' === cwmState) {
      document.documentElement.classList.add('cwm-enabled');
      resetResizer();
    } else {
      toggleCurrentQuery('');
      document.documentElement.classList.remove('cwm-enabled');
    }
  }

  var control;

  var _MainStore$get = MainStore.get(),
      currentTheme = _MainStore$get.currentTheme,
      currentPage = _MainStore$get.currentPage;

  var isObject = function isObject(obj) {
    return obj === Object(obj);
  };

  var toggleMounted = function toggleMounted() {
    var mount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'toggle';

    var _MainStore$get2 = MainStore.get(),
        mounted = _MainStore$get2.mounted;

    if (!mounted || mount === true) {
      cw.Evt.emit('mount-colorwings');
      toggleMediaEditor('enable');
      MainStore.setMounted(true);
    } else {
      cw.Evt.emit('unmount-colorwings');
      toggleMediaEditor('disable');
      MainStore.setMounted(false);
    }
  };

  var sendUpdateControlEvent = function sendUpdateControlEvent() {
    var _MainStore$get3 = MainStore.get(),
        currentPage = _MainStore$get3.currentPage,
        currentPageType = _MainStore$get3.currentPageType,
        allFonts = _MainStore$get3.allFonts;

    var styles = StylesStore.get().allOutputs[currentPage];
    var currentStylesDetails;

    if (!isObject(control.setting._value)) {
      currentStylesDetails = _defineProperty({}, currentTheme, {});
    } else {
      currentStylesDetails = JSON.parse(JSON.stringify(control.setting._value));
    }

    if (!(currentTheme in currentStylesDetails)) {
      currentStylesDetails[currentTheme] = {};
    }

    currentStylesDetails[currentTheme][currentPage] = {
      type: currentPageType,
      styles: styles,
      fonts: allFonts[currentPage]
    };
    cw.Evt.emit('update-control', currentStylesDetails);
  };

  var updateOnPageChange = function updateOnPageChange() {
    var page = MainStore.get().currentPage;

    if (page !== currentPage) {
      if (isObject(control.setting._value) && currentTheme in control.setting._value && page in control.setting._value[currentTheme]) {
        var currentStyles = control.setting._value[currentTheme][page].styles;
        StylesStore.addFromString(currentStyles);
      } else {
        StylesStore.addFromString('');
      }

      sendUpdateControlEvent();
      currentPage = page;
    }
  };

  var addInitialStyles = function addInitialStyles(api) {
    control = api;

    if (!control.setting._value || !(currentTheme in control.setting._value)) {
      return;
    }

    var themeStyles = control.setting._value[currentTheme];
    var current;

    if ('global' in themeStyles) {
      current = themeStyles.global;
    } else {
      var keys = Object.keys(themeStyles);

      if (keys.length > 0) {
        current = themeStyles[keys[0]];
        MainStore.changePage(keys[0], current.type);
      }
    }

    MainStore.addInitialSettings(themeStyles);
    StylesStore.addInitialStyle(current.styles, themeStyles);
  };
  var addPreviewObject = function addPreviewObject(previewObject) {
    MainStore.addPreviewObject(previewObject);
  };
  var subscribeToStores = function subscribeToStores() {
    StylesStore.subscribe(sendUpdateControlEvent);
    MainStore.subscribe(updateOnPageChange);
  };

  subscribeToStores();
  cw.Evt.on('colorwings-will-mount', addInitialStyles);
  cw.Evt.on('preview-object-ready', addPreviewObject);

  var Evt$1 = window.cw.Evt;
  Evt$1.on('focusLocked', function (data) {
    var currentSelector = data.currentSelector,
        currentTarget = data.currentTarget; // const pseudo = MainStore.get().currentPseudo === '' ? null : `:${ MainStore.get().currentPseudo }`

    var currentStyles = window.getComputedStyle(currentTarget); // Todo: Only store the styles used by the editor.

    MainStore.set(function () {
      return {
        currentSelector: currentSelector,
        currentStyles: currentStyles
      };
    });
  });
  Evt$1.on('focusUnlocked', function () {
    MainStore.set(function () {
      return {
        currentSelector: ''
      };
    });
  });

  var styles$1 = "#color-wings {\n  margin-left: -12px;\n  margin-right: -12px;\n  margin-top: -15px; }\n\n.cw-row {\n  display: flex; }\n  .cw-row .col {\n    flex: 1; }\n  .cw-row .col-1 {\n    flex: 0 0 8.33333%; }\n  .cw-row .col-2 {\n    flex: 0 0 16.66667%; }\n  .cw-row .col-3 {\n    flex: 0 0 25%; }\n  .cw-row .col-4 {\n    flex: 0 0 33.33333%; }\n  .cw-row .col-5 {\n    flex: 0 0 41.66667%; }\n  .cw-row .col-6 {\n    flex: 0 0 50%; }\n  .cw-row .col-7 {\n    flex: 0 0 58.33333%; }\n  .cw-row .col-8 {\n    flex: 0 0 66.66667%; }\n  .cw-row .col-9 {\n    flex: 0 0 75%; }\n  .cw-row .col-10 {\n    flex: 0 0 83.33333%; }\n  .cw-row .col-11 {\n    flex: 0 0 91.66667%; }\n  .cw-row .col-12 {\n    flex: 0 0 100%; }\n\n.cw-panel-heading {\n  padding: 10px;\n  align-items: center;\n  position: relative; }\n  .cw-panel-heading .popup-content {\n    width: 100%;\n    box-sizing: border-box;\n    position: absolute;\n    z-index: 5;\n    background: #fff;\n    right: 0;\n    border: 1px solid #ccc; }\n  .cw-panel-heading .popup-overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n  .cw-panel-heading .popup-arrow {\n    width: 14px;\n    height: 14px;\n    background: white;\n    position: absolute;\n    right: 100px;\n    top: -6px;\n    transform: rotate(135deg);\n    z-index: -1;\n    box-shadow: rgba(0, 0, 0, 0.3) -1px 1px 1px; }\n  .cw-panel-heading .cw-current-page {\n    max-height: 30px;\n    white-space: pre-wrap;\n    overflow: auto; }\n  .cw-panel-heading .page-selector .button {\n    border-color: transparent;\n    background: none;\n    padding: 10px 20px; }\n    .cw-panel-heading .page-selector .button:focus {\n      border-color: #0071a1; }\n  .cw-panel-heading .cw-pause {\n    margin: 0 0 0 auto;\n    display: block;\n    line-height: 1; }\n\n.button.button-block {\n  width: 100%;\n  text-align: center; }\n\n.cw-tabs {\n  display: flex;\n  margin: 0 -1px;\n  position: relative;\n  z-index: 2; }\n  .cw-tabs .tab {\n    flex: 1;\n    padding: 8px;\n    background: #ddd;\n    border: 1px solid transparent;\n    border-bottom-color: #ccc;\n    cursor: pointer;\n    text-align: center; }\n    .cw-tabs .tab.active {\n      border: 1px solid #ccc;\n      border-bottom-color: #fff;\n      background: #fff;\n      cursor: auto; }\n\n#cw-code-editor {\n  width: 100%; }\n\n.cw-code-editor .CodeMirror {\n  height: calc( 100vh - 255px);\n  margin-bottom: -22px;\n  overflow: hidden; }\n\n.customize-control .cw-link-wrap {\n  background: #fff;\n  padding: 6px 10px;\n  cursor: pointer;\n  border-left: 2px solid transparent;\n  transition: all .15s ease-in-out, border-color .15s ease-in-out, background .15s ease-in-out;\n  box-shadow: 0 0 0 1px #ddd;\n  position: relative; }\n  .customize-control .cw-link-wrap:hover {\n    color: #0073aa;\n    background: #f3f3f5;\n    border-left: 2px solid #0073aa; }\n    .customize-control .cw-link-wrap:hover:after {\n      color: #0073aa; }\n  .customize-control .cw-link-wrap:after {\n    content: '\\f345';\n    font: normal 16px/1 dashicons;\n    color: #a0a5aa;\n    position: absolute;\n    right: 6px;\n    top: calc(50% - 8px); }\n\n.customize-control .cw-link-text {\n  position: absolute;\n  right: 26px;\n  top: calc(50% - 9px);\n  font-size: 11px; }\n";

  function LengthTab(props) {
    var showShortHand = ['radius', 'padding', 'margin'].includes(props.subType);
    var units = {
      'px': {
        step: 1,
        min: 0,
        max: 2000
      },
      'pc': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'cm': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'mm': {
        step: 1,
        min: 0,
        max: 2000
      },
      'rem': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'em': {
        step: 0.01,
        min: 0,
        max: 100
      },
      'ex': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'ch': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'vh': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'vw': {
        step: 0.1,
        min: 0,
        max: 200
      },
      'in': {
        step: 0.01,
        min: 0,
        max: 100
      },
      '%': {
        step: 0.1,
        min: 0,
        max: 200
      },
      '': {
        step: 0.1,
        min: 0,
        max: 1
      }
    };

    var getLength = function getLength() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var size = '';

      if (false !== value) {
        size = value;
      } else {
        size = props.val;

        if ('values' in props) {
          size = props.values[props.tab];
        }
      }

      var matches = size.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
      return [null === matches ? '' : matches[1], null === matches ? 'px' : matches[2]];
    };

    var _getLength = getLength(),
        _getLength2 = _slicedToArray(_getLength, 2),
        main = _getLength2[0],
        unit = _getLength2[1];

    var _React$useState = React.useState({
      main: main,
      unit: unit,
      step: units[unit].step,
      min: units[unit].min,
      max: units[unit].max
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var _React$useState3 = React.useState([]),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        resetVal = _React$useState4[0],
        setReset = _React$useState4[1];

    React.useEffect(function () {
      setReset(getLength());
    }, []);
    React.useEffect(function () {
      var _getLength3 = getLength(),
          _getLength4 = _slicedToArray(_getLength3, 2),
          main = _getLength4[0],
          unit = _getLength4[1];

      setState(function (prev) {
        return _objectSpread2({}, prev, {
          main: main,
          unit: unit
        });
      });
    }, [props.val]);

    var handleChange = function handleChange(val) {
      props.handleChange(props.tab, val);
    };

    var reset = function reset() {
      setState(function (prev) {
        var _resetVal = _slicedToArray(resetVal, 2),
            main = _resetVal[0],
            unit = _resetVal[1];

        handleChange("".concat(main).concat(unit));
        return _objectSpread2({}, prev, {
          main: main,
          unit: unit
        });
      });
    };

    var handleLengthChange = function handleLengthChange(e) {
      e.persist();
      setState(function (prev) {
        handleChange("".concat(e.target.value).concat(prev.unit));
        return _objectSpread2({}, prev, {
          main: e.target.value
        });
      });
    };

    var handleUnitChange = function handleUnitChange(e) {
      e.persist();
      var unit = e.target.value;
      setState(function (prev) {
        handleChange("".concat(prev.main).concat(unit));
        return _objectSpread2({}, prev, {
          unit: unit,
          step: units[unit].step,
          min: units[unit].min,
          max: units[unit].max
        });
      });
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "tab-content " + (showShortHand ? 'shorthand' : '') + (props.hidden ? ' hidden' : '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-".concat(props.subType === 'unitLess' ? '9' : '7', " range-wrap")
    }, /*#__PURE__*/React.createElement("input", {
      type: "range",
      step: state.step,
      min: state.min,
      max: state.max,
      value: state.main,
      onChange: handleLengthChange
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: state.step,
      min: state.min,
      max: state.max,
      value: state.main,
      onChange: handleLengthChange
    })), props.subType !== 'unitLess' && /*#__PURE__*/React.createElement("select", {
      className: "col-2 length-unit",
      onChange: handleUnitChange,
      value: state.unit
    }, Object.keys(units).map(function (unit) {
      return /*#__PURE__*/React.createElement("option", {
        key: unit,
        value: unit
      }, unit);
    })), /*#__PURE__*/React.createElement("span", {
      className: "reset",
      onClick: reset
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15px",
      height: "14.7px",
      viewBox: "0 0 50 49",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,20 L14,0 C14,6 14,9 14,9 C40,-3 65,30 38,49 C58,27 36,7 18,17 C18,17 20,19 24,23 L0,20 Z",
      fill: "#7CB342"
    })))));
  }

  function LengthIcon(props) {
    var subType = props.subType,
        tab = props.tab;
    var mainShape, extraShape;

    if (subType === 'radius') {
      mainShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#999",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "3"
      });
      extraShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#7CB342",
        strokeWidth: "2",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "4"
      });

      if (tab === 1) {
        extraShape = /*#__PURE__*/React.createElement("path", {
          d: "M8,0 L8,2 L5,2 C3.34,2 2,3.34 2,5 L2,8 L0,8 L0,5 C0,2.24 2.24,0 5,0 L8,0 Z",
          fill: "#7CB342"
        });
      } else if (tab === 2) {
        extraShape = /*#__PURE__*/React.createElement("path", {
          d: "M8,0 L11,0 C13.76,0 16,2.24 16,5 L16,8 L14,8 L14,5 C14,3.34 12.66,2 11,2 L8,2 L8,0 Z",
          fill: "#7CB342"
        });
      } else if (tab === 3) {
        extraShape = /*#__PURE__*/React.createElement("path", {
          d: "M16,8 L16,11 C16,13.76 13.76,16 11,16 L8,16 L8,14 L11,14 C12.66,14 14,12.66 14,11 L14,8 L16,8 Z",
          fill: "#7CB342"
        });
      } else if (tab === 4) {
        extraShape = /*#__PURE__*/React.createElement("path", {
          d: "M8,16 L5,16 C2.24,16 0,13.76 0,11 L0,8 L2,8 L2,11 C2,12.66 3.34,14 5,14 L8,14 L8,16 Z",
          fill: "#7CB342"
        });
      }
    } else if (subType === 'padding') {
      mainShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#000",
        strokeWidth: ".6",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "1"
      });
      extraShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#7CB342",
        strokeWidth: "4",
        fill: "none",
        x: "3",
        y: "3",
        width: "10",
        height: "10",
        rx: "0",
        opacity: ".6"
      });

      if (tab === 1) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#7CB342",
          x: "1",
          y: "1",
          width: "14",
          height: "5",
          opacity: ".6"
        });
      } else if (tab === 2) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#7CB342",
          x: "10",
          y: "1",
          width: "5",
          height: "14",
          opacity: ".6"
        });
      } else if (tab === 3) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#7CB342",
          x: "1",
          y: "10",
          width: "14",
          height: "5",
          opacity: ".6"
        });
      } else if (tab === 4) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#7CB342",
          x: "1",
          y: "1",
          width: "5",
          height: "14",
          opacity: ".6"
        });
      }
    } else if (subType === 'margin') {
      mainShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#000",
        strokeWidth: ".6",
        fill: "none",
        x: "2.5",
        y: "2.5",
        width: "11",
        height: "11",
        rx: "1"
      });
      extraShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#F9CDA0",
        strokeWidth: "2.5",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "1"
      });

      if (tab === 1) {
        mainShape = /*#__PURE__*/React.createElement("rect", {
          stroke: "#000",
          strokeWidth: ".6",
          fill: "none",
          x: "1",
          y: "5.5",
          width: "14",
          height: "9.5",
          rx: "1"
        });
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#F9CDA0",
          x: "1",
          y: "0",
          width: "14",
          height: "5"
        });
      } else if (tab === 2) {
        mainShape = /*#__PURE__*/React.createElement("rect", {
          stroke: "#000",
          strokeWidth: ".6",
          fill: "none",
          x: "1",
          y: "1",
          width: "9.5",
          height: "14",
          rx: "1"
        });
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#F9CDA0",
          x: "11",
          y: "1",
          width: "5",
          height: "14"
        });
      } else if (tab === 3) {
        mainShape = /*#__PURE__*/React.createElement("rect", {
          stroke: "#000",
          strokeWidth: ".6",
          fill: "none",
          x: "1",
          y: "1",
          width: "14",
          height: "9.5",
          rx: "1"
        });
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#F9CDA0",
          x: "1",
          y: "11",
          width: "14",
          height: "5"
        });
      } else if (tab === 4) {
        mainShape = /*#__PURE__*/React.createElement("rect", {
          stroke: "#000",
          strokeWidth: ".6",
          fill: "none",
          x: "5.5",
          y: "1",
          width: "9.5",
          height: "14",
          rx: "1"
        });
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#F9CDA0",
          x: "0",
          y: "1",
          width: "5",
          height: "14"
        });
      }
    } else if (subType === 'border') {
      mainShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#000",
        strokeWidth: ".6",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "1"
      });
      extraShape = /*#__PURE__*/React.createElement("rect", {
        stroke: "#000",
        strokeWidth: "2",
        fill: "none",
        x: "1",
        y: "1",
        width: "14",
        height: "14",
        rx: "1"
      });

      if (tab === 1) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#000",
          x: "1",
          y: "1",
          width: "14",
          height: "2"
        });
      } else if (tab === 2) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#000",
          x: "13",
          y: "1",
          width: "2",
          height: "14"
        });
      } else if (tab === 3) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#000",
          x: "1",
          y: "13",
          width: "14",
          height: "2"
        });
      } else if (tab === 4) {
        extraShape = /*#__PURE__*/React.createElement("rect", {
          fill: "#000",
          x: "1",
          y: "1",
          width: "2",
          height: "14"
        });
      }
    }

    return /*#__PURE__*/React.createElement("svg", {
      width: "16px",
      height: "16px",
      viewBox: "0 0 16 16",
      style: {
        pointerEvents: 'bounding-box'
      }
    }, mainShape, extraShape);
  }

  function Length(props) {
    var subType = props.subType,
        val = props.val,
        onChange = props.onChange;
    var showShortHand = ['radius', 'padding', 'margin'].includes(subType);
    var size = val;
    var splits = size.split(' ');
    var values = [size, size, size, size, size];

    if (splits.length === 4) {
      values = ['0px', splits[0], splits[1], splits[2], splits[3]];
    } else if (splits.length === 3) {
      values = ['0px', splits[0], splits[1], splits[2], splits[1]];
    } else if (splits.length === 2) {
      values = ['0px', splits[0], splits[1], splits[0], splits[1]];
    }

    var _React$useState = React.useState({
      tab: 0,
      values: values,
      currentVal: val
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var onTab = function onTab(e, i) {
      e.currentTarget.parentNode.childNodes.forEach(function (tab) {
        return tab.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      setState(function (prev) {
        return _objectSpread2({}, prev, {
          tab: i
        });
      });
    };

    var handleChange = function handleChange(tab, val) {
      var values = state.values;
      values[tab] = val;
      var currentVal = val;

      if (tab !== 0 && tab !== undefined) {
        currentVal = "".concat(values[1], " ").concat(values[2], " ").concat(values[3], " ").concat(values[4]);
      }

      setState(function (prev) {
        return _objectSpread2({}, prev, {
          currentVal: currentVal,
          values: values
        });
      });
      onChange(currentVal);
    };

    var tabs = showShortHand && /*#__PURE__*/React.createElement("div", {
      className: "cw-tabs"
    }, [0, 1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "tab tab-".concat(i, " ").concat(i === 0 ? 'active' : ''),
        onClick: function onClick(e) {
          return onTab(e, i);
        }
      }, /*#__PURE__*/React.createElement(LengthIcon, {
        tab: i,
        subType: subType
      }));
    }));
    var tabContent;

    if (showShortHand) {
      tabContent = [0, 1, 2, 3, 4].map(function (i) {
        return /*#__PURE__*/React.createElement(LengthTab, _extends({}, props, {
          values: values,
          key: i,
          tab: i,
          hidden: i !== state.tab,
          handleChange: handleChange
        }));
      });
    } else {
      tabContent = /*#__PURE__*/React.createElement(LengthTab, _extends({}, props, {
        handleChange: handleChange
      }));
    }

    var output = showShortHand && /*#__PURE__*/React.createElement("div", {
      className: "output"
    }, "Output: ", state.currentVal);
    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content cw-length " + (showShortHand ? 'shorthand' : 'single-length')
    }, props.label && /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label), props.description && /*#__PURE__*/React.createElement("span", {
      className: "description customize-control-description"
    }, props.description), tabs, tabContent, output);
  }

  function handlePickerPosition(irisRefNode) {
    var cp = irisRefNode.parentNode.parentNode.parentNode;

    if (!cp.classList.contains('fixed')) {
      var left = cp.getBoundingClientRect().left;
      var holder = cp.querySelector('.wp-picker-holder');
      holder.style.left = "-".concat(left - 12, "px");
      holder.style.position = 'absolute';
      cp.classList.add('fixed'); // If color picker is under transition.

      setTimeout(function () {
        holder.style.left = "-".concat(cp.getBoundingClientRect().left - 12, "px");
      }, 1000);
    }
  }

  function Color(props) {
    var componentToHex = function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length === 1 ? "0".concat(hex) : hex;
    };

    function rgbToHex(rgb) {
      if (rgb.indexOf('rgb(') !== -1) {
        var _rgb$substring$replac = rgb.substring(4, rgb.length - 1).replace(/ /g, '').split(','),
            _rgb$substring$replac2 = _slicedToArray(_rgb$substring$replac, 3),
            r = _rgb$substring$replac2[0],
            g = _rgb$substring$replac2[1],
            b = _rgb$substring$replac2[2];

        return '#' + componentToHex(parseInt(r, 10)) + componentToHex(parseInt(g, 10)) + componentToHex(parseInt(b, 10));
      }

      if (rgb.indexOf('rgba(') !== -1) {
        var _rgb$substring$replac3 = rgb.substring(5, rgb.length - 1).replace(/ /g, '').split(','),
            _rgb$substring$replac4 = _slicedToArray(_rgb$substring$replac3, 4),
            _r = _rgb$substring$replac4[0],
            _g = _rgb$substring$replac4[1],
            _b = _rgb$substring$replac4[2],
            a = _rgb$substring$replac4[3];

        if (a === '0') {
          return '#' + componentToHex(parseInt(_r, 10)) + componentToHex(parseInt(_g, 10)) + componentToHex(parseInt(_b, 10));
        }
      }

      return rgb.replace(/ /g, '');
    }

    var defaultColor = rgbToHex(props.val);
    var irisOptions = {
      change: function change(event, ui) {
        var newColor = ui.color.toString();

        if (newColor !== defaultColor) {
          props.onChange(newColor);
        }
      },
      clear: function clear() {
        props.onChange('');
      }
    };
    var irisRef = React.createRef();

    var refIsNotNull = function refIsNotNull() {
      return irisRef.current !== null;
    };

    var initIris = function initIris() {
      $(irisRef.current).wpColorPicker(irisOptions);
      $(irisRef.current).iris('color', defaultColor);
      handlePickerPosition(irisRef.current);
    };

    var _waitUntil = waitUntil(refIsNotNull),
        _waitUntil2 = _slicedToArray(_waitUntil, 1),
        resolved = _waitUntil2[0];

    resolved(initIris);
    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content cw-color"
    }, props.label && /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label), /*#__PURE__*/React.createElement("input", {
      type: "text",
      ref: irisRef,
      "data-alpha": "true",
      defaultValue: defaultColor
    }));
  }

  function highlightReducer(highlighted, value) {
    const {
      key,
      options
    } = value;
    const max = options.length - 1;
    let newHighlighted = key === 'ArrowDown' ? highlighted + 1 : highlighted - 1;

    if (newHighlighted < 0) {
      newHighlighted = max;
    } else if (newHighlighted > max) {
      newHighlighted = 0;
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
          nextOptions.push(_objectSpread(_objectSpread({}, groupOption), {}, {
            groupId: id,
            groupName: option.name,
            _id: "" + groupOption.value
          }));
        });
        return;
      }

      nextOptions.push(_objectSpread(_objectSpread({}, option), {}, {
        _id: "" + option.value,
        index
      }));
    });
    return nextOptions;
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function groupOptions(options) {
    const nextOptions = [];
    options.forEach((option, i) => {
      if ('groupId' in option) {
        const nextOption = _objectSpread$1({}, option);

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

    if (!oldValue) {
      return [value];
    }

    const newValue = !Array.isArray(oldValue) ? [oldValue] : [...oldValue];
    const valueIndex = newValue.findIndex(val => val === value);

    if (valueIndex >= 0) {
      newValue.splice(valueIndex, 1);
    } else {
      newValue.push(value);
    }

    return newValue;
  }

  function getOption(value, defaultOptions) {
    if (Array.isArray(value)) {
      return value.map(singleValue => defaultOptions.find(option => option.value === singleValue));
    }

    return defaultOptions.find(option => option.value === value) || null;
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

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  let Fuse = null;

  try {
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    Fuse = fuse;
  } catch (e) {
  }

  function fuzzySearch(value, options, fuseOptions) {
    const fuse = new Fuse(options, fuseOptions);
    return fuse.search(value).map((item, index) => _objectSpread$2(_objectSpread$2({}, item), {}, {
      index
    }));
  }

  function search(value, options, fuseOptions) {
    if (value.length && Fuse && fuseOptions) {
      return fuzzySearch(value, options, fuseOptions);
    }

    return false;
  }

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function useSelect({
    value: defaultValue = null,
    disabled = false,
    multiple = false,
    search: canSearch = false,
    fuse = false,
    options: defaultOptions,
    onChange = () => {},
    getOptions = null,
    allowEmpty = true,
    closeOnSelect = true,
    closable = true
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
      changed: false
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
      setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
        focus: false,
        search: '',
        flat: flatDefaultOptions,
        highlighted: -1
      }));

      if (ref.current) {
        ref.current.blur();
      }
    }, [flatDefaultOptions, ref]);

    const setFocus = newFocus => setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
      focus: newFocus
    }));

    const onClick = () => setFocus(!focus);

    const onFocus = () => setFocus(true);

    const onSelect = React$1.useCallback(id => {
      setState(prevState => {
        const {
          flat: prevFlat,
          highlighted: prevHighlighted
        } = prevState; // eslint-disable-next-line no-underscore-dangle,eqeqeq

        const item = id ? prevFlat.find(i => i.value == id) : prevFlat[prevHighlighted];

        if (!item) {
          return prevState;
        }

        const values = getNewValue(item.value, prevState.value, multiple);
        const newOptions = getOption(values, prevFlat);
        return _objectSpread$3(_objectSpread$3({}, prevState), {}, {
          addedOptions: multiple ? newOptions : [newOptions],
          value: values,
          changed: [values, newOptions]
        });
      });
    }, [multiple]);
    const onMouseDown = React$1.useCallback(e => {
      if (!closeOnSelect) {
        e.preventDefault();
      }

      onSelect(e.currentTarget.value);
    }, [onSelect, closeOnSelect]);
    const onKeyDown = React$1.useCallback(e => {
      const {
        key
      } = e;

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
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

        if (closable && closeOnSelect) {
          onBlur();
        }
      }
    }, [onSelect, closeOnSelect, onBlur, closable]);
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

      setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), newState));
      Promise.resolve(searchableOption).then(foundOptions => {
        let newOptions = foundOptions;

        if (inputVal.length) {
          newOptions = search(inputVal, foundOptions, fuse);
        }

        setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
          flat: newOptions === false ? foundOptions : newOptions,
          searching: false
        }));
      }).catch(() => setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
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
      setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
        value: defaultValue
      }));
    }, [defaultValue]);
    React$1.useEffect(() => {
      setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
        flat: flatDefaultOptions
      }));
    }, [flatDefaultOptions]);
    React$1.useEffect(() => {
      if (state.changed !== false) {
        setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
          changed: false
        }));
        onChange(...state.changed);
      }
    }, [state.changed, onChange]);
    return [{
      value: option,
      highlighted,
      options,
      disabled,
      displayValue,
      focus,
      search: search$1,
      searching
    }, valueProps, optionProps, newValue => setState(oldState => _objectSpread$3(_objectSpread$3({}, oldState), {}, {
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
    value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
  });
  const optionType = propTypes.oneOfType([option, propTypes.shape({
    name: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    items: propTypes.arrayOf(option)
  })]);
  const valueType = propTypes.oneOfType([propTypes.object, propTypes.arrayOf(propTypes.object)]);
  const classNameType = propTypes.oneOfType([propTypes.string, propTypes.func]);

  function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    const domProps = _objectSpread$4(_objectSpread$4({}, optionProps), {}, {
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
  var Option$1 = /*#__PURE__*/React$1.memo(Option);

  function isSelected(itemValue, selectedValue) {
    if (!selectedValue) {
      return false;
    }

    return Array.isArray(selectedValue) ? selectedValue.findIndex(item => item.value === itemValue.value) >= 0 : selectedValue.value === itemValue.value;
  }

  function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

  function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  const SelectSearch = /*#__PURE__*/React$1.forwardRef(({
    value: defaultValue,
    disabled,
    placeholder,
    multiple,
    search,
    autoFocus,
    autoComplete,
    options: defaultOptions,
    id,
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
    const selectRef = React$1.useRef(null);
    const [snapshot, valueProps, optionProps] = useSelect({
      options: defaultOptions,
      value: defaultValue,
      multiple,
      disabled,
      fuse,
      search,
      onChange,
      getOptions,
      closeOnSelect,
      closable: !multiple || printOptions === 'on-focus',
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

      if (!current || multiple || highlighted < 0 && !value) {
        return;
      }

      const query = highlighted > -1 ? "[data-index=\"" + highlighted + "\"]" : "[data-value=\"" + escape(value.value) + "\"]";
      const selected = current.querySelector(query);

      if (selected) {
        const rect = current.getBoundingClientRect();
        const selectedRect = selected.getBoundingClientRect();
        current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
      }
    }, [focus, value, highlighted, selectRef, multiple]);
    let shouldRenderOptions;

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
      className: wrapperClass,
      id: id
    }, (!multiple || placeholder || search) && /*#__PURE__*/React$1__default.createElement("div", {
      className: cls('value')
    }, renderValue(_objectSpread$5(_objectSpread$5({}, valueProps), {}, {
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
      const isGroup = option.type === 'group';
      const items = isGroup ? option.items : [option];
      const base = {
        cls,
        optionProps,
        renderOption
      };
      const rendered = items.map(o => /*#__PURE__*/React$1__default.createElement(Option$1, _extends$1({
        key: o.value,
        selected: isSelected(o, value),
        highlighted: highlighted === o.index
      }, base, o)));

      if (isGroup) {
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
        }, rendered)));
      }

      return rendered;
    }))));
  });
  SelectSearch.defaultProps = {
    className: 'select-search',
    disabled: false,
    search: false,
    multiple: false,
    placeholder: null,
    id: null,
    autoFocus: false,
    autoComplete: 'on',
    value: '',
    onChange: () => {},
    printOptions: 'auto',
    closeOnSelect: true,
    renderOption: (domProps, option, snapshot, className) =>
    /*#__PURE__*/
    // eslint-disable-next-line react/button-has-type
    React$1__default.createElement("button", _extends$1({
      className: className
    }, domProps), option.name),
    renderGroupHeader: name => name,
    renderValue: (valueProps, snapshot, className) => /*#__PURE__*/React$1__default.createElement("input", _extends$1({}, valueProps, {
      className: className
    })),
    fuse: {
      keys: ['name', 'groupName'],
      threshold: 0.3
    },
    getOptions: null
  };
  SelectSearch.propTypes =  {};
  var SelectSearch$1 = /*#__PURE__*/React$1.memo(SelectSearch);

  /**
   * Select Control for dropdown selection.
   *
   * @return {mixed}
   */

  function Select(props) {
    var options = props.options;
    var formattedOptions = options;

    if (!Array.isArray(options) || options.length === 0) {
      return null;
    }

    if (_typeof(options[0]) !== 'object') {
      formattedOptions = options.map(function (option) {
        return {
          name: option,
          value: option
        };
      });
    }

    var params = _objectSpread2({
      search: false,
      printOptions: 'auto'
    }, props);

    var renderOption = function renderOption(domProps, option, snapshot, className) {
      return /*#__PURE__*/React.createElement("button", _extends({
        className: className
      }, domProps, {
        type: "button"
      }), option.name);
    };

    var renderOptionWithCls = function renderOptionWithCls(domProps, option, snapshot, className) {
      return /*#__PURE__*/React.createElement("button", _extends({}, domProps, {
        className: className,
        type: "button"
      }), /*#__PURE__*/React.createElement("span", {
        className: 'clsName' in option ? option.clsName : ''
      }, /*#__PURE__*/React.createElement("span", null, option.name)));
    };

    var forwardProps = {
      options: formattedOptions,
      value: props.val,
      name: props.name,
      onChange: props.onChange,
      search: params.search,
      printOptions: params.printOptions,
      className: params.horizontal ? 'select-search horizontal' : 'select-search',
      renderOption: renderOption
    };

    if (_typeof(options[0]) === 'object' && 'clsName' in options[0]) {
      forwardProps['renderOption'] = renderOptionWithCls;
    }

    if ('renderOption' in params) {
      forwardProps['renderOption'] = params.renderOption;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content cw-select"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label, " "), /*#__PURE__*/React.createElement(SelectSearch$1, forwardProps));
  }

  function Shadow(props) {
    var initState = ['0px', '0px', '0px', '0px', '#000000'];

    if (props.val !== 'none') {
      if (isNaN(props.val.charAt(0))) {
        var temp = props.val.split(/ (?![^\(]*\))/);
        initState = [temp[1], temp[2], temp[3], temp[4], temp[0]];
      } else {
        initState = props.val.split(' ');
      }
    }

    var _React$useState = React.useState(initState),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        values = _React$useState2[0],
        changeValues = _React$useState2[1];

    var onXChange = function onXChange(t, val) {
      changeValues(function (prev) {
        prev[0] = val;
        return prev;
      });
      props.onChange(values.join(' '));
    };

    var onYChange = function onYChange(t, val) {
      changeValues(function (prev) {
        prev[1] = val;
        return prev;
      });
      props.onChange(values.join(' '));
    };

    var onBlurChange = function onBlurChange(t, val) {
      changeValues(function (prev) {
        prev[2] = val;
        return prev;
      });
      props.onChange(values.join(' '));
    };

    var onSpreadChange = function onSpreadChange(t, val) {
      changeValues(function (prev) {
        prev[3] = val;
        return prev;
      });
      props.onChange(values.join(' '));
    };

    var onColorChange = function onColorChange(val) {
      changeValues(function (prev) {
        prev[4] = val;
        return prev;
      });
      props.onChange(values.join(' '));
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content border"
    }, props.label && /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label), /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, "X Offset"), /*#__PURE__*/React.createElement(LengthTab, {
      val: values[0],
      tab: 0,
      hidden: false,
      handleChange: onXChange
    }), /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, "Y Offset"), /*#__PURE__*/React.createElement(LengthTab, {
      val: values[1],
      tab: 0,
      hidden: false,
      handleChange: onYChange
    }), /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, "Blur Radius"), /*#__PURE__*/React.createElement(LengthTab, {
      val: values[2],
      tab: 0,
      hidden: false,
      handleChange: onBlurChange
    }), /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, "Spread Radius"), /*#__PURE__*/React.createElement(LengthTab, {
      val: values[3],
      tab: 0,
      hidden: false,
      handleChange: onSpreadChange
    }), /*#__PURE__*/React.createElement(Color, {
      val: values[4],
      onChange: onColorChange,
      label: "Color"
    }));
  }

  function Border(props) {
    var initState = {
      tab: 0,
      values: [['0px', 'none', '#000000'], ['0px', 'none', '#000000'], ['0px', 'none', '#000000'], ['0px', 'none', '#000000'], ['0px', 'none', '#000000']]
    };

    if ('borderTopWidth' in props.val) {
      initState.values = [[props.val.borderTopWidth, props.val.borderTopStyle, props.val.borderTopColor], [props.val.borderTopWidth, props.val.borderTopStyle, props.val.borderTopColor], [props.val.borderRightWidth, props.val.borderRightStyle, props.val.borderRightColor], [props.val.borderBottomWidth, props.val.borderBottomStyle, props.val.borderBottomColor], [props.val.borderLeftWidth, props.val.borderLeftStyle, props.val.borderLeftColor]];
    }

    var _React$useState = React.useState(initState),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        changeState = _React$useState2[1];

    var onTab = function onTab(e, i) {
      e.currentTarget.parentNode.childNodes.forEach(function (tab) {
        return tab.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      changeState(function (prev) {
        return _objectSpread2({}, prev, {
          tab: i
        });
      });
    };

    var tabs = /*#__PURE__*/React.createElement("div", {
      className: "cw-tabs"
    }, [0, 1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "tab tab-".concat(i, " ").concat(i === 0 ? 'active' : ''),
        onClick: function onClick(e) {
          return onTab(e, i);
        }
      }, /*#__PURE__*/React.createElement(LengthIcon, {
        tab: i,
        subType: 'border'
      }));
    }));
    var tab = state.tab,
        values = state.values;

    var onWidthChange = function onWidthChange(t, val) {
      changeState(function (prev) {
        prev.values[tab][0] = val;
        return prev;
      });
      props.onChange(values, tab);
    };

    var onStyleChange = function onStyleChange(val) {
      changeState(function (prev) {
        prev.values[tab][1] = val;
        return prev;
      });
      props.onChange(values, tab);
    };

    var onColorChange = function onColorChange(val) {
      changeState(function (prev) {
        prev.values[tab][2] = val;
        return prev;
      });
      props.onChange(values, tab);
    };

    var styleOptions = [{
      name: 'x',
      value: 'none'
    }, {
      name: '',
      value: 'solid'
    }, {
      name: '',
      value: 'dotted'
    }, {
      name: '',
      value: 'dashed'
    }];
    var tabContent = /*#__PURE__*/React.createElement("div", {
      className: "cw-tab-wrap"
    }, /*#__PURE__*/React.createElement(LengthTab, {
      val: values[tab][0],
      tab: 0,
      hidden: false,
      handleChange: onWidthChange
    }), /*#__PURE__*/React.createElement(Color, {
      val: values[tab][2],
      onChange: onColorChange,
      label: "Color"
    }), /*#__PURE__*/React.createElement(Select, {
      options: styleOptions,
      val: values[tab][1],
      onChange: onStyleChange,
      printOptions: "always",
      horizontal: "true",
      label: "Style"
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content cw-border"
    }, props.label && /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label), tabs, tabContent);
  }

  /**
   * Quick Select selectors.
   */
  function QuickSelect(_ref) {
    var selectors = _ref.selectors;

    var selectElement = function selectElement(selector) {
      cw.Evt.emit('select-element', selector);
    };

    var highlightToggle = function highlightToggle(selector) {
      var deHighlight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (deHighlight === true) {
        cw.Evt.emit('de-highlight-elements');
      } else {
        cw.Evt.emit('highlight-elements', selector);
      }
    };

    var rightArrow = /*#__PURE__*/React.createElement("span", {
      className: "dashicons dashicons-arrow-right-alt"
    });
    return /*#__PURE__*/React.createElement("div", {
      id: "cw-quick-select"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-title"
    }, /*#__PURE__*/React.createElement("span", null, "No Element Selected.")), /*#__PURE__*/React.createElement("div", {
      className: "cw-qs-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-qs-title"
    }, "Click on any element to edit the styles ", rightArrow, /*#__PURE__*/React.createElement("br", null), "OR", /*#__PURE__*/React.createElement("br", null), "Quick select an Element below"), /*#__PURE__*/React.createElement("ul", {
      className: "cw-qs-btns"
    }, selectors.map(function (selector) {
      return /*#__PURE__*/React.createElement("li", {
        key: selector.name,
        className: "cw-qs-btn",
        onClick: function onClick() {
          return selectElement(selector.sel);
        },
        onMouseEnter: function onMouseEnter() {
          return highlightToggle(selector.sel, false);
        },
        onMouseLeave: highlightToggle
      }, selector.name);
    }))));
  }

  /**
   * Pseudo Selector.
   *
   * @return {mixed}
   */

  function Pseudo() {
    var togglePseudo = function togglePseudo(elem) {
      var op = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var cls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'open';

      if ('add' === op) {
        elem.classList.add(cls);
      } else {
        elem.classList.remove(cls);
      }
    };

    var _React$useState = React.useState(['hover', 'focus', 'active', 'visited']),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        pseudos = _React$useState2[0],
        update = _React$useState2[1];

    var handleChange = function handleChange(e) {
      var val = e.target.innerText;

      if (MainStore.get().currentPseudo === val) {
        MainStore.togglePseudo('');
        togglePseudo(e.target.parentNode.parentNode, '', 'active');
      } else {
        MainStore.togglePseudo(val); // Move to the beginning.

        if (pseudos.indexOf(val) > 0) {
          pseudos.splice(pseudos.indexOf(val), 1);
          pseudos.unshift(val);
          update(pseudos);
        }

        togglePseudo(e.target.parentNode.parentNode);
        togglePseudo(e.target.parentNode.parentNode, 'add', 'active');
      }

      e.target.parentNode.childNodes.forEach(function (item) {
        return item.classList.remove('selected');
      });
    };

    var activeCls = MainStore.get().currentPseudo === '' ? '' : 'active';
    return /*#__PURE__*/React.createElement("div", {
      className: "cw-pseudo ".concat(activeCls),
      onMouseEnter: function onMouseEnter(e) {
        return togglePseudo(e.currentTarget, 'add');
      },
      onMouseLeave: function onMouseLeave(e) {
        return togglePseudo(e.currentTarget);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "cw-pseudo-icon dashicons dashicons-menu-alt2"
    }), /*#__PURE__*/React.createElement("div", {
      className: "cw-pseudo-content"
    }, pseudos.map(function (ps, k) {
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        className: "cw-pseudo-item",
        onClick: handleChange
      }, ps);
    })));
  }

  var MediaUpload = wp.mediaUtils.MediaUpload;

  function Media(props) {
    var initialSrc = props.val;

    if ('none' !== initialSrc) {
      var matches = _toConsumableArray(initialSrc.matchAll(/(url)(?:\(['"]?)(.*?)(?:['"]?\))/g));

      if (matches.length && matches[0].length > 2) {
        initialSrc = matches[0][2];
      }
    }

    var _React$useState = React.useState(initialSrc),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        src = _React$useState2[0],
        updateSrc = _React$useState2[1];

    var onSelect = function onSelect(media) {
      updateSrc(media.url);
      props.onChange("url('".concat(media.url, "')"));
    };

    var remove = function remove() {
      updateSrc('none');
      props.onChange("none");
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-control-content cw-media"
    }, props.label && /*#__PURE__*/React.createElement("span", {
      className: "cw-control-title"
    }, props.label), /*#__PURE__*/React.createElement("div", {
      className: "attachment-media-view"
    }, 'none' === src ? /*#__PURE__*/React.createElement(MediaUpload, {
      onSelect: onSelect,
      allowedTypes: ['image'],
      value: '',
      render: function render(_ref) {
        var open = _ref.open;
        return /*#__PURE__*/React.createElement("button", {
          type: "button",
          onClick: open,
          className: "upload-button button-add-media"
        }, props.buttonText ? props.buttonText : 'Select Image');
      }
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "thumbnail thumbnail-image"
    }, /*#__PURE__*/React.createElement("img", {
      className: "attachment-thumb",
      src: src
    })), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: remove,
      className: "button remove-button"
    }, "Remove"), /*#__PURE__*/React.createElement(MediaUpload, {
      onSelect: onSelect,
      allowedTypes: ['image'],
      value: '',
      render: function render(_ref2) {
        var open = _ref2.open;
        return /*#__PURE__*/React.createElement("button", {
          type: "button",
          onClick: open,
          className: "button upload-button"
        }, props.changeText ? props.changeText : 'Change Image');
      }
    })))));
  }

  var styles$2 = "#cw-editor-wrap ul, #cw-editor-wrap li {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#cw-editor-wrap .cw-panel {\n  background: #eee;\n  font-size: 13px;\n  color: #444; }\n\n#cw-editor-wrap .cw-panel-title {\n  background: #fff;\n  border-bottom: 1px solid #ddd;\n  font-size: 13px;\n  padding: 16px;\n  color: #444;\n  line-height: 16px;\n  margin: 0; }\n  #cw-editor-wrap .cw-panel-title * {\n    box-sizing: border-box; }\n  #cw-editor-wrap .cw-panel-title .title-inner {\n    display: inline-flex;\n    width: calc(100% - 54px); }\n  #cw-editor-wrap .cw-panel-title .title-desc {\n    padding: 3px 0;\n    width: 90px; }\n  #cw-editor-wrap .cw-panel-title .selector {\n    background: #f2f8ec;\n    border: 1px solid #7cb342;\n    padding: 3px 5px;\n    width: calc(100% - 90px);\n    border-radius: 0;\n    min-height: 24px;\n    line-height: 1;\n    font-size: 13px;\n    background-image: none !important; }\n    #cw-editor-wrap .cw-panel-title .selector:focus {\n      box-shadow: none;\n      border-color: #5b8230; }\n    #cw-editor-wrap .cw-panel-title .selector.invalid, #cw-editor-wrap .cw-panel-title .selector.invalid:focus {\n      border-color: #c78100; }\n\n#cw-editor-wrap .cw-panel-main {\n  height: calc(100% - 41px);\n  overflow-y: auto; }\n\n#cw-editor-wrap h3.cw-section-title {\n  border-bottom: 1px solid #ddd;\n  background: #fff;\n  font-size: 14px;\n  padding: 12px 16px;\n  font-weight: 600;\n  color: #444;\n  line-height: 16px;\n  margin: 0;\n  cursor: pointer; }\n\n.cw-section-content {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0 12px;\n  max-height: 0;\n  opacity: 0;\n  overflow: auto;\n  transition: max-height .2s ease, opacity .2s ease; }\n\n.cw-panel .open .cw-section-content {\n  opacity: 1;\n  max-height: 1000px;\n  border-bottom: 1px solid #ddd; }\n\n.cw-control {\n  flex-shrink: 0;\n  width: 100%;\n  margin-bottom: 12px;\n  box-sizing: border-box; }\n  .cw-control.padding, .cw-control.margin {\n    margin-bottom: 0; }\n  .cw-control.col-4 {\n    width: 33.333%; }\n  .cw-control.col-5 {\n    width: 41.666%; }\n  .cw-control.col-6 {\n    width: 50%; }\n  .cw-control.col-7 {\n    width: 58.333%; }\n  .cw-control.col-8 {\n    width: 66.666%; }\n  .cw-control .cw-tabs {\n    margin: 0 -12px -1px -13px; }\n  .cw-control .tab.active {\n    border-bottom-color: #eee;\n    background: #eee; }\n  .cw-control .tab-content {\n    position: relative;\n    padding: 30px 0 15px; }\n  .cw-control .shorthand .tab-content {\n    border-top: 1px solid #ccc; }\n  .cw-control .single-length .tab-content {\n    padding: 20px 0 0; }\n    .cw-control .single-length .tab-content .reset {\n      bottom: 32px; }\n  .cw-control .output {\n    padding: 5px;\n    border-top: 1px dotted #ddd;\n    border-bottom: 1px solid #ddd;\n    font-size: 11px;\n    margin-top: -1px; }\n  .cw-control .reset {\n    position: absolute;\n    right: 2px;\n    bottom: 47px;\n    padding: 4px;\n    cursor: pointer; }\n    .cw-control .reset:hover {\n      background: #fff; }\n  .cw-control .range-wrap {\n    padding-right: 5px;\n    line-height: 1.8; }\n  .cw-control input:focus {\n    outline: none; }\n  .cw-control svg {\n    display: block;\n    margin: auto; }\n  .cw-control .wp-picker-container {\n    position: relative; }\n    .cw-control .wp-picker-container.wp-picker-active {\n      min-height: 270px; }\n    .cw-control .wp-picker-container .wp-color-result.button {\n      margin-right: 2px; }\n  .cw-control .wp-picker-active .wp-color-result-text {\n    display: none; }\n  .cw-control .wp-picker-clear, .cw-control .wp-picker-clear:hover, .cw-control .wp-picker-clear:focus, .cw-control .wp-picker-clear:active {\n    height: 30px;\n    text-indent: -100px;\n    background-image: url(\"data:image/svg+xml,%3Csvg width='15px' height='14.7px' viewBox='0 0 50 49' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,20 L14,0 C14,6 14,9 14,9 C40,-3 65,30 38,49 C58,27 36,7 18,17 C18,17 20,19 24,23 L0,20 Z' fill='%237CB342'%3E%3C/path%3E%3C/svg%3E\");\n    background-repeat: no-repeat;\n    background-position: center;\n    min-width: 26px; }\n  .cw-control.color input[type=\"text\"].wp-color-picker {\n    max-width: 120px; }\n  .cw-control.border input[type=\"text\"].wp-color-picker {\n    max-width: 100px; }\n  .cw-control.font-style, .cw-control.text-decoration, .cw-control.display {\n    padding-right: 12px; }\n  .cw-control.position .select-search__option {\n    font-size: 13px; }\n\n.cw-control-title {\n  display: block;\n  padding: 10px 0; }\n  .cw-control-title + .tab-content {\n    margin-top: -25px; }\n\n.border .cw-tab-wrap {\n  display: flex;\n  flex-wrap: wrap; }\n  .border .cw-tab-wrap > * {\n    flex-shrink: 0;\n    width: 100%;\n    box-sizing: border-box; }\n  .border .cw-tab-wrap .cw-color {\n    width: 60%; }\n  .border .cw-tab-wrap .cw-select {\n    width: 40%; }\n\nbutton.wp-color-result .color-alpha {\n  height: 28px !important; }\n\n#cw-quick-select .cw-qs-title {\n  padding: 15px 0 10px;\n  text-align: center;\n  line-height: 22px; }\n  #cw-quick-select .cw-qs-title .dashicons {\n    background-color: #0171a1;\n    background-image: linear-gradient(90deg, #01a0e4, #0171a1);\n    background-size: 100%;\n    background-repeat: repeat;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    font-size: 16px;\n    height: 16px;\n    vertical-align: text-top; }\n\n#cw-quick-select .cw-qs-title svg {\n  vertical-align: text-top;\n  padding-left: 10px; }\n\n#cw-quick-select ul.cw-qs-btns {\n  padding: 10px;\n  display: flex;\n  flex-flow: column wrap;\n  align-content: space-between;\n  height: 300px; }\n  #cw-quick-select ul.cw-qs-btns::before, #cw-quick-select ul.cw-qs-btns::after {\n    content: '';\n    flex-basis: 100%;\n    width: 0;\n    order: 2; }\n\n#cw-quick-select .cw-qs-btn:nth-child(3n+1) {\n  order: 1; }\n\n#cw-quick-select .cw-qs-btn:nth-child(3n+2) {\n  order: 2; }\n\n#cw-quick-select .cw-qs-btn:nth-child(3n) {\n  order: 3; }\n\n#cw-quick-select li.cw-qs-btn {\n  padding: 6px 8px;\n  background: #fff linear-gradient(90deg, #ffffff 0%, #f3f7f4 100%);\n  color: #0071a1;\n  border: 1px solid #0071a1;\n  border-radius: 3px;\n  cursor: pointer;\n  width: calc(33.3% - 5px);\n  box-sizing: border-box;\n  margin-bottom: 10px;\n  text-align: center; }\n\n.cw-pseudo {\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n  position: relative; }\n\n.cw-pseudo-icon {\n  display: inline-block;\n  background: #f2f8ec;\n  border: 1px solid #7cb342;\n  border-left: none;\n  color: #5b8230;\n  cursor: pointer;\n  line-height: 22px;\n  height: 24px; }\n\n.cw-pseudo-content {\n  border: 1px solid #7cb342;\n  box-sizing: border-box;\n  display: none;\n  position: absolute;\n  top: 0;\n  left: -1px;\n  background: white;\n  z-index: 3; }\n\n.cw-pseudo-item {\n  padding: 3px 0 3px 7px;\n  width: 52px;\n  display: none; }\n  .cw-pseudo-item:hover {\n    color: #5b8230; }\n\n.cw-pseudo.active .cw-pseudo-content {\n  display: inline-block; }\n\n.cw-pseudo.active .cw-pseudo-item:first-child {\n  display: inline-block;\n  background: #f2f8ec; }\n\n.cw-pseudo.active .cw-pseudo-icon {\n  display: none; }\n\n.cw-pseudo.open .cw-pseudo-content {\n  display: inline-block; }\n\n.cw-pseudo.open .cw-pseudo-item {\n  display: inline-block; }\n\n.cw-pseudo.open .cw-pseudo-icon {\n  display: none; }\n\n.cw-media .thumbnail img {\n  max-height: 100px; }\n\n[id*=\"__lpform_input\"] {\n  display: none !important; }\n";

  var selectStyles = "/**\n * Main wrapper\n */\n.select-search {\n  position: relative;\n  box-sizing: border-box; }\n\n.select-search *,\n.select-search *::after,\n.select-search *::before {\n  box-sizing: inherit; }\n\n/**\n * Value wrapper\n */\n.select-search__value {\n  position: relative;\n  z-index: 1; }\n\n.select-search__value::after {\n  content: '';\n  display: inline-block;\n  position: absolute;\n  top: calc(50% - 7px);\n  right: 19px;\n  width: 9px;\n  height: 9px; }\n\n/**\n * Input\n */\n.select-search__input {\n  display: block;\n  height: 30px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff !important;\n  border: 1px solid #7cb342;\n  border-radius: 3px;\n  outline: none;\n  font-family: 'Noto Sans', sans-serif;\n  font-size: 14px;\n  text-align: left;\n  text-overflow: ellipsis;\n  line-height: 36px;\n  -webkit-appearance: none;\n  margin: 0; }\n\n.select-search__input::-webkit-search-decoration,\n.select-search__input::-webkit-search-cancel-button,\n.select-search__input::-webkit-search-results-button,\n.select-search__input::-webkit-search-results-decoration {\n  -webkit-appearance: none; }\n\n.select-search__input:not([readonly]):focus {\n  cursor: initial; }\n\n/**\n * Options wrapper\n */\n.select-search__select {\n  background: #fff;\n  box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15); }\n\n/**\n * Options\n */\n.select-search__options {\n  list-style: none; }\n\n/**\n * Option row\n */\n.select-search__row:not(:first-child) {\n  border-top: 1px solid #eee; }\n\n/**\n * Option\n */\n.select-search__option {\n  display: block;\n  height: 36px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer; }\n\n.select-search--multiple .select-search__option {\n  height: 48px; }\n\n.select-search__option.is-selected {\n  background: #7cb342;\n  color: #fff; }\n\n.select-search__option.is-highlighted,\n.select-search__option:not(.is-selected):hover {\n  background: #f1f7eb; }\n\n.select-search__option.is-highlighted.is-selected,\n.select-search__option.is-selected:hover {\n  background: #6fa13b;\n  color: #fff; }\n\n/**\n * Group\n */\n.select-search__group-header {\n  font-size: 10px;\n  text-transform: uppercase;\n  background: #f7f7f7;\n  padding: 6px 16px;\n  position: sticky;\n  top: 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); }\n\n/**\n * States\n */\n.select-search.is-disabled {\n  opacity: 0.5; }\n\n.select-search.is-loading .select-search__value::after {\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath fill='%232F2D37' d='M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E\");\n  background-size: 11px; }\n\n.select-search:not(.is-disabled) .select-search__input {\n  cursor: pointer; }\n\n/**\n * Modifiers\n */\n.select-search--multiple {\n  border-radius: 3px;\n  overflow: hidden; }\n\n.select-search:not(.is-loading):not(.select-search--multiple) .select-search__value::after {\n  transform: rotate(45deg);\n  border-right: 2px solid #555;\n  border-bottom: 2px solid #555;\n  pointer-events: none; }\n\n.select-search--multiple .select-search__input {\n  cursor: initial; }\n\n.select-search--multiple .select-search__input {\n  border-radius: 3px 3px 0 0; }\n\n.select-search--multiple:not(.select-search--search) .select-search__input {\n  cursor: default; }\n\n.select-search:not(.select-search--multiple) .select-search__input:hover {\n  border-color: #7cb342; }\n\n.select-search:not(.select-search--multiple) .select-search__select {\n  z-index: 2;\n  top: 38px;\n  right: 0;\n  left: 0;\n  border-radius: 3px;\n  overflow: auto;\n  max-height: 360px;\n  border: 1px solid #7cb342; }\n\n.select-search--multiple .select-search__select {\n  position: relative;\n  overflow: auto;\n  max-height: 260px;\n  border-top: 1px solid #eee;\n  border-radius: 0 0 3px 3px; }\n\n.select-search.horizontal .select-search__value {\n  display: none; }\n\n.select-search.horizontal .select-search__select {\n  top: 0;\n  box-shadow: none; }\n\n.select-search.horizontal .select-search__options {\n  display: flex; }\n\n.select-search.horizontal .select-search__option {\n  height: 28px;\n  position: relative;\n  text-align: center;\n  padding: 0 10px; }\n\n.select-search.horizontal .select-search__row {\n  flex: 1; }\n  .select-search.horizontal .select-search__row:not(:first-child) {\n    border-top: none; }\n\n.select-search__row[data-value=\"italic\"] .select-search__option {\n  font-style: italic; }\n\n.select-search__row[data-value=\"overline\"] .select-search__option {\n  text-decoration: overline; }\n\n.select-search__row[data-value=\"underline\"] .select-search__option {\n  text-decoration: underline; }\n\n.select-search__row[data-value=\"line-through\"] .select-search__option {\n  text-decoration: line-through; }\n\n.cw-border .select-search__row .select-search__option:after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 15%;\n  width: 70%; }\n\n.cw-border .select-search__row[data-value=\"solid\"] .select-search__option:after {\n  border-top: 2px solid #000; }\n\n.cw-border .select-search__row[data-value=\"dotted\"] .select-search__option:after {\n  border-top: 2px dotted #000; }\n\n.cw-border .select-search__row[data-value=\"dashed\"] .select-search__option:after {\n  border-top: 2px dashed #000; }\n\n.font-weight .select-search__row[data-value=\"100\"] .select-search__option {\n  font-weight: 100; }\n\n.font-weight .select-search__row[data-value=\"200\"] .select-search__option {\n  font-weight: 200; }\n\n.font-weight .select-search__row[data-value=\"300\"] .select-search__option {\n  font-weight: 300; }\n\n.font-weight .select-search__row[data-value=\"400\"] .select-search__option {\n  font-weight: 400; }\n\n.font-weight .select-search__row[data-value=\"500\"] .select-search__option {\n  font-weight: 500; }\n\n.font-weight .select-search__row[data-value=\"600\"] .select-search__option {\n  font-weight: 600; }\n\n.font-weight .select-search__row[data-value=\"700\"] .select-search__option {\n  font-weight: 700; }\n\n.font-weight .select-search__row[data-value=\"800\"] .select-search__option {\n  font-weight: 800; }\n\n.font-weight .select-search__row[data-value=\"900\"] .select-search__option {\n  font-weight: 900; }\n";

  function Editor() {
    var colorWingsFonts = cwControlObject.fonts;

    var _useStore = useStore(MainStore),
        currentSelector = _useStore.currentSelector,
        openSection = _useStore.openSection,
        currentStyles = _useStore.currentStyles,
        quickSelectors = _useStore.quickSelectors,
        selectorClass = _useStore.selectorClass;

    var _React$useState = React.useState({
      styleOptions: ['normal', 'italic'],
      weightOptions: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        font = _React$useState2[0],
        setFontParams = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        renderControls = _React$useState4[0],
        updateRender = _React$useState4[1];

    if (currentSelector !== '') {
      setTimeout(function () {
        return updateRender(true);
      }, 0);
    } else {
      setTimeout(function () {
        return updateRender(false);
      }, 0);
    }

    React.useEffect(function () {
      setFontParams(function (prev) {
        return _objectSpread2({}, prev, {
          family: currentStyles.fontFamily,
          style: currentStyles.fontStyle,
          weight: currentStyles.fontWeight
        });
      });
    }, [currentStyles]);

    var getFontsOptions = function getFontsOptions() {
      var options = [];

      for (var fontSet in colorWingsFonts.allFonts) {
        var setName = fontSet;

        if ('system' === fontSet) {
          setName = 'System Fonts';
        } else if ('google' === fontSet) {
          setName = 'Google Fonts';
        }

        var families = [];

        for (var family in colorWingsFonts.allFonts[fontSet]) {
          var name = 'Default' === family ? 'Default System Font' : family;
          families.push({
            name: name,
            value: family
          });
        }

        options.push({
          type: 'group',
          name: setName,
          items: families
        });
      }

      return options;
    };

    var getFontDetails = function getFontDetails(fontFamily) {
      fontFamily = fontFamily.replace(/^"(.+(?="$))"$/, '$1');
      var details = {
        'family': fontFamily,
        'source': 'system'
      };

      if (colorWingsFonts.allFonts.system.hasOwnProperty(fontFamily)) {
        details['variants'] = colorWingsFonts.defaults.variants;
        details['category'] = colorWingsFonts.allFonts.system[fontFamily].category;
      } else if (colorWingsFonts.allFonts.google.hasOwnProperty(fontFamily)) {
        var variants = colorWingsFonts.allFonts.google[fontFamily][0];
        var category = colorWingsFonts.allFonts.google[fontFamily][1];
        details['source'] = 'google';
        details['category'] = category;
        details['variants'] = {};

        if (variants[0].length > 0) {
          details['variants']['normal'] = variants[0];
        }

        if (variants[1].length > 0) {
          details['variants']['italic'] = variants[1];
        }
      } else if (fontFamily.includes('system-ui')) {
        details['variants'] = colorWingsFonts.defaults.variants;
        details['category'] = 'sans-serif';
      }

      return details;
    };

    var getNearestWeight = function getNearestWeight(weight, weightsArray) {
      return weightsArray.reduce(function (prev, curr) {
        return Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev;
      });
    };

    var setFontOptions = function setFontOptions() {
      var fontFamily = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var fontStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var fontWeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Todo: Get latest currentStyles
      fontFamily = fontFamily ? fontFamily : font.family;
      fontFamily = fontFamily.replace(/^"(.+(?="$))"$/, '$1');
      var currentFontDetails = getFontDetails(fontFamily); // If fontFamily is given set Font Style options.

      if (!fontStyle) {
        fontStyle = font.style; // If fontStyle not in currentFontDetails.style set first available style.

        if (!currentFontDetails.variants.hasOwnProperty(fontStyle)) {
          fontStyle = Object.keys(currentFontDetails.variants)[0];
        }
      } // If fontStyle is given set Font Weight options.


      if (!fontWeight) {
        fontWeight = font.weight; // If fontWeight not in currentFontDetails.style[ fontStyle ] set nearest weight.

        if (currentFontDetails.variants[fontStyle].indexOf(fontWeight) === -1) {
          fontWeight = getNearestWeight(fontWeight, currentFontDetails.variants[fontStyle]);
        }
      }

      setFontParams({
        styleOptions: Object.keys(currentFontDetails.variants),
        weightOptions: currentFontDetails.variants[fontStyle],
        family: fontFamily,
        style: fontStyle,
        weight: fontWeight.toString()
      });
      var newFont = {
        family: fontFamily,
        style: fontStyle,
        weight: fontWeight,
        source: currentFontDetails.source,
        category: currentFontDetails.category
      };
      MainStore.addFont(newFont);
      StylesStore.addFont();
      font.family !== fontFamily && StylesStore.addStyleNow(currentSelector, 'font-family', fontFamily);
      font.style !== fontStyle && StylesStore.addStyleNow(currentSelector, 'font-style', fontStyle);
      font.weight !== fontWeight && StylesStore.addStyleNow(currentSelector, 'font-weight', fontWeight);
    };

    var onFontChange = function onFontChange(val) {
      return setFontOptions(val, false, false);
    };

    var onStyleChange = function onStyleChange(val) {
      return setFontOptions(false, val, false);
    };

    var onWeightChange = function onWeightChange(val) {
      return setFontOptions(false, false, val);
    };

    var onBorderChange = function onBorderChange(values, tab) {
      if (values.every(function (val, i, arr) {
        return val === arr[0];
      }) || 0 === tab) {
        StylesStore.addStyleNow(currentSelector, 'border', "".concat(values[0][0], " ").concat(values[0][1], " ").concat(values[0][2]));
      } else {
        StylesStore.addStyleNow(currentSelector, 'border-top', "".concat(values[1][0], " ").concat(values[1][1], " ").concat(values[1][2]));
        StylesStore.addStyleNow(currentSelector, 'border-right', "".concat(values[2][0], " ").concat(values[2][1], " ").concat(values[2][2]));
        StylesStore.addStyleNow(currentSelector, 'border-bottom', "".concat(values[3][0], " ").concat(values[3][1], " ").concat(values[3][2]));
        StylesStore.addStyleNow(currentSelector, 'border-left', "".concat(values[4][0], " ").concat(values[4][1], " ").concat(values[4][2]));
      }
    };

    var sections = [{
      id: 'padding',
      title: 'Padding',
      controls: [{
        property: 'padding',
        Component: Length,
        params: {
          subType: 'padding',
          val: currentStyles.padding
        }
      }]
    }, {
      id: 'margin',
      title: 'Margin',
      controls: [{
        property: 'margin',
        Component: Length,
        params: {
          subType: 'margin',
          val: currentStyles.margin
        }
      }]
    }, {
      id: 'background',
      title: 'Background',
      controls: [{
        property: 'background',
        Component: Color,
        params: {
          label: 'Background Color',
          val: currentStyles.backgroundColor
        }
      }, {
        property: 'background-image',
        Component: Media,
        params: {
          label: 'Background Image',
          val: currentStyles.backgroundImage
        }
      }, {
        property: 'background-size',
        Component: Select,
        params: {
          label: 'Background Size',
          name: 'background-size',
          options: [{
            name: 'Auto',
            value: 'auto'
          }, {
            name: 'Cover',
            value: 'cover'
          }, {
            name: 'Contain',
            value: 'contain'
          }],
          val: currentStyles.backgroundSize,
          printOptions: 'always',
          horizontal: true
        }
      }]
    }, {
      id: 'text',
      title: 'Text',
      controls: [{
        property: 'font-size',
        Component: Length,
        params: {
          label: 'Font Size',
          subType: 'size',
          val: currentStyles.fontSize
        }
      }, {
        property: 'line-height',
        Component: Length,
        params: {
          label: 'Line Height',
          subType: 'size',
          val: currentStyles.lineHeight
        }
      }, {
        property: 'font-family',
        Component: Select,
        params: {
          label: 'Font Family',
          name: 'font-family',
          options: getFontsOptions(),
          val: font.family,
          search: true,
          onChange: onFontChange
        }
      }, {
        property: 'color',
        Component: Color,
        params: {
          label: 'Font Color',
          val: currentStyles.color
        },
        cls: 'col-8'
      }, {
        property: 'font-weight',
        Component: Select,
        params: {
          label: 'Font Weight',
          name: 'font-weight',
          options: font.weightOptions,
          val: font.weight,
          onChange: onWeightChange
        },
        cls: 'col-4'
      }, {
        property: 'font-style',
        Component: Select,
        params: {
          label: 'Font Style',
          name: 'font-style',
          options: font.styleOptions,
          val: font.style,
          onChange: onStyleChange,
          printOptions: 'always',
          horizontal: true
        },
        cls: 'col-5'
      }, {
        property: 'text-align',
        Component: Select,
        params: {
          label: 'Text Align',
          name: 'text-align',
          options: [{
            name: '',
            value: 'left',
            clsName: 'dashicons dashicons-editor-alignleft'
          }, {
            name: '',
            value: 'right',
            clsName: 'dashicons dashicons-editor-alignright'
          }, {
            name: '',
            value: 'center',
            clsName: 'dashicons dashicons-editor-aligncenter'
          }, {
            name: '',
            value: 'justify',
            clsName: 'dashicons dashicons-editor-justify'
          }],
          val: currentStyles.textAlign,
          printOptions: 'always',
          horizontal: true
        },
        cls: 'col-7'
      }, {
        property: 'text-decoration',
        Component: Select,
        params: {
          label: 'Text Decoration',
          name: 'text-decoration',
          options: [{
            name: 'A',
            value: 'none'
          }, {
            name: 'O',
            value: 'overline'
          }, {
            name: 'U',
            value: 'underline'
          }, {
            name: 'S',
            value: 'line-through'
          }],
          val: currentStyles.textDecoration,
          printOptions: 'always',
          horizontal: true
        },
        cls: 'col-6'
      }, {
        property: 'text-transform',
        Component: Select,
        params: {
          label: 'Text Transform',
          name: 'text-transform',
          options: [{
            name: 'x',
            value: 'none'
          }, {
            name: 'Aa',
            value: 'capitalize'
          }, {
            name: 'aa',
            value: 'lowercase'
          }, {
            name: 'AA',
            value: 'uppercase'
          }],
          val: currentStyles.textTransform,
          printOptions: 'always',
          horizontal: true
        },
        cls: 'col-6'
      }, {
        property: 'letter-spacing',
        Component: Length,
        params: {
          label: 'Letter Spacing',
          subType: 'size',
          val: currentStyles.letterSpacing === 'normal' ? '0px' : currentStyles.letterSpacing
        }
      }, {
        property: 'word-spacing',
        Component: Length,
        params: {
          label: 'Word Spacing',
          subType: 'size',
          val: currentStyles.wordSpacing
        }
      }, {
        property: 'text-indent',
        Component: Length,
        params: {
          label: 'Text Indent',
          subType: 'size',
          val: currentStyles.textIndent
        }
      }]
    }, {
      id: 'border',
      title: 'Border',
      controls: [{
        property: 'border-radius',
        Component: Length,
        params: {
          label: 'Border Radius',
          subType: 'radius',
          val: currentStyles.borderRadius
        }
      }, {
        property: 'border',
        Component: Border,
        params: {
          label: 'Border Width',
          val: currentStyles,
          onChange: onBorderChange
        }
      }]
    }, {
      id: 'size',
      title: 'Size',
      controls: [{
        property: 'width',
        Component: Length,
        params: {
          label: 'Width',
          subType: 'size',
          val: currentStyles.width
        }
      }, {
        property: 'height',
        Component: Length,
        params: {
          label: 'Height',
          subType: 'size',
          val: currentStyles.height
        }
      }, {
        property: 'min-width',
        Component: Length,
        params: {
          label: 'Min Width',
          subType: 'size',
          val: currentStyles.minWidth
        }
      }, {
        property: 'min-height',
        Component: Length,
        params: {
          label: 'Min Height',
          subType: 'size',
          val: currentStyles.minHeight
        }
      }, {
        property: 'max-width',
        Component: Length,
        params: {
          label: 'Max Width',
          subType: 'size',
          val: currentStyles.maxWidth
        }
      }, {
        property: 'max-height',
        Component: Length,
        params: {
          label: 'Max Height',
          subType: 'size',
          val: currentStyles.maxHeight
        }
      }]
    }, {
      id: 'shadow',
      title: 'Shadow',
      controls: [{
        property: 'box-shadow',
        Component: Shadow,
        params: {
          val: currentStyles.boxShadow
        }
      }]
    }, {
      id: 'position',
      title: 'Position',
      controls: [{
        property: 'position',
        Component: Select,
        params: {
          label: 'Position',
          name: 'position',
          options: [{
            name: 'Relative',
            value: 'relative'
          }, {
            name: 'Absolute',
            value: 'absolute'
          }, {
            name: 'Static',
            value: 'static'
          }, {
            name: 'Fixed',
            value: 'fixed'
          }, {
            name: 'Sticky',
            value: 'sticky'
          }],
          val: currentStyles.position,
          printOptions: 'always',
          horizontal: true
        }
      }, {
        property: 'top',
        Component: Length,
        params: {
          label: 'Top',
          subType: 'size',
          val: currentStyles.top
        }
      }, {
        property: 'right',
        Component: Length,
        params: {
          label: 'Right',
          subType: 'size',
          val: currentStyles.right
        }
      }, {
        property: 'bottom',
        Component: Length,
        params: {
          label: 'Bottom',
          subType: 'size',
          val: currentStyles.bottom
        }
      }, {
        property: 'left',
        Component: Length,
        params: {
          label: 'Left',
          subType: 'size',
          val: currentStyles.left
        }
      }]
    }, {
      id: 'others',
      title: 'Others',
      controls: [{
        property: 'display',
        Component: Select,
        params: {
          label: 'Display',
          name: 'display',
          options: [{
            name: 'block',
            value: 'block'
          }, {
            name: 'none',
            value: 'none'
          }, {
            name: 'flex',
            value: 'flex'
          }, {
            name: 'grid',
            value: 'grid'
          }, {
            name: 'inline',
            value: 'inline'
          }, {
            name: 'inline-block',
            value: 'inline-block'
          }, {
            name: 'inline-flex',
            value: 'inline-flex'
          }, {
            name: 'inline-grid',
            value: 'inline-grid'
          }, {
            name: 'contents',
            value: 'contents'
          }, {
            name: 'inline-table',
            value: 'inline-table'
          }, {
            name: 'list-item',
            value: 'list-item'
          }, {
            name: 'run-in',
            value: 'run-in'
          }, {
            name: 'table',
            value: 'table'
          }, {
            name: 'table-caption',
            value: 'table-caption'
          }, {
            name: 'table-column-group',
            value: 'table-column-group'
          }, {
            name: 'table-header-group',
            value: 'table-header-group'
          }, {
            name: 'table-footer-group',
            value: 'table-footer-group'
          }, {
            name: 'table-row-group',
            value: 'table-row-group'
          }, {
            name: 'table-cell',
            value: 'table-cell'
          }, {
            name: 'table-column',
            value: 'table-column'
          }, {
            name: 'table-row',
            value: 'table-row'
          }, {
            name: 'initial',
            value: 'initial'
          }, {
            name: 'inherit',
            value: 'inherit'
          }],
          val: currentStyles.display
        },
        cls: 'col-6'
      }, {
        property: 'visibility',
        Component: Select,
        params: {
          label: 'Visibility',
          name: 'visibility',
          options: [{
            name: '',
            value: 'Visible',
            clsName: 'dashicons dashicons-visibility'
          }, {
            name: '',
            value: 'Hidden',
            clsName: 'dashicons dashicons-hidden'
          }],
          val: currentStyles.visibility,
          printOptions: 'always',
          horizontal: true
        },
        cls: 'col-6'
      }, {
        property: 'opacity',
        Component: Length,
        params: {
          label: 'Opacity',
          subType: 'unitLess',
          val: currentStyles.opacity
        }
      }]
    }];
    sections.forEach(function (section) {
      section.controls.forEach(function (control) {
        if (!('onChange' in control.params)) {
          control.params.onChange = function (data) {
            StylesStore.addStyle(currentSelector, control.property, data);
          };
        }
      });
    });

    var _React$useState5 = React.useState(currentSelector),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        tempSelector = _React$useState6[0],
        updateTempSelector = _React$useState6[1];

    React.useEffect(function () {
      return updateTempSelector(currentSelector);
    }, [currentSelector]);

    var onSelectorChange = function onSelectorChange(e) {
      updateTempSelector(e.target.value);
      cw.Evt.emit('update-selector', e.target.value);
    };

    return /*#__PURE__*/React.createElement("div", {
      id: "cw-editor-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      id: "cw-editor-panel",
      className: "cw-panel"
    }, currentSelector !== '' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title-inner"
    }, /*#__PURE__*/React.createElement("span", {
      className: "title-desc"
    }, "You're editing:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "selector ".concat(selectorClass),
      value: tempSelector,
      onChange: onSelectorChange
    })), /*#__PURE__*/React.createElement(Pseudo, null)), /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-main"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "cw-panel-sections"
    }, sections.map(function (section) {
      return /*#__PURE__*/React.createElement("li", {
        key: section.id,
        className: "cw-panel-section ".concat(openSection === section.id ? 'open' : '')
      }, /*#__PURE__*/React.createElement("h3", {
        className: "cw-section-title",
        onClick: function onClick() {
          return MainStore.toggleSection(section.id);
        }
      }, section.title), /*#__PURE__*/React.createElement("div", {
        className: "cw-section-content"
      }, section.controls.map(function (control) {
        return openSection === section.id ? /*#__PURE__*/React.createElement("div", {
          key: control.property,
          className: "cw-control ".concat(control.property, " ").concat(control.cls ? control.cls : '')
        }, renderControls && /*#__PURE__*/React.createElement(control.Component, control.params)) : null;
      })));
    })))) : /*#__PURE__*/React.createElement(QuickSelect, {
      selectors: quickSelectors
    })), /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, styles$2, " ", selectStyles));
  }

  var cm = false;
  var isRunningChange = false;
  var isProgrammaticalChange = false;
  var changeOrigin;

  function onChange(i, changeObj) {
    changeOrigin = changeObj.origin;

    if (isProgrammaticalChange === true || isRunningChange === true) {
      return;
    }

    isRunningChange = true;
    StylesStore.addFromString(cm.getValue());
    setTimeout(function () {
      isRunningChange = false;
    }, 100);
  }

  function mountCodeMirror(args) {
    if (cm !== false) {
      return;
    }

    var editorSettings = {
      indentUnit: 2,
      indentWithTabs: true,
      inputStyle: 'contenteditable',
      lineNumbers: true,
      autoRefresh: true,
      lineWrapping: true,
      styleActiveLine: true,
      continueComments: true,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-/": "toggleComment",
        "Cmd-/": "toggleComment",
        "Alt-F": "findPersistent",
        "Ctrl-F": "findPersistent",
        "Cmd-F": "findPersistent"
      },
      direction: "ltr",
      gutters: [],
      mode: "text/css",
      lint: false,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchTags: {
        bothTags: true
      },
      tabSize: 2,
      matchBrackets: true,
      jshint: {}
    };

    var _waitUntil = waitUntil(!!(typeof wp !== 'undefined' && wp.hasOwnProperty('CodeMirror'))),
        _waitUntil2 = _slicedToArray(_waitUntil, 1),
        resolved = _waitUntil2[0];

    resolved(function () {
      cm = wp.CodeMirror.fromTextArea(document.getElementById(args.textAreaId), editorSettings);
      cm.on('change', onChange);

      if (cm.showHint) {
        cm.on('keyup', function (editor, event) {
          var shouldAutocomplete,
              isAlphaKey = /^[a-zA-Z]$/.test(event.key),
              lineBeforeCursor,
              innerMode,
              token;

          if (cm.state.completionActive && isAlphaKey) {
            return;
          } // Prevent auto-completion in string literals or comments.


          token = cm.getTokenAt(cm.getCursor());

          if ('string' === token.type || 'comment' === token.type) {
            return;
          }

          innerMode = wp.CodeMirror.innerMode(cm.getMode(), token.state).mode.name;
          lineBeforeCursor = cm.doc.getLine(cm.doc.getCursor().line).substr(0, cm.doc.getCursor().ch);

          if ('css' === innerMode) {
            shouldAutocomplete = isAlphaKey || ':' === event.key || ' ' === event.key && /:\s+$/.test(lineBeforeCursor);
          }

          if (shouldAutocomplete) {
            cm.showHint({
              completeSingle: false
            });
          }
        });
      }
    });
  }

  StylesStore.subscribe(function () {
    // Todo: Debounce the Update
    isProgrammaticalChange = true;

    if (isRunningChange !== true) {
      cm.getDoc().setValue(StylesStore.get().allOutputs[MainStore.get().currentPage]);
    }

    if (changeOrigin === 'setValue') {
      cm.autoFormatRange({
        line: 0,
        ch: 0
      }, {
        line: cm.lineCount()
      });
    }

    setTimeout(function () {
      isProgrammaticalChange = false;
    }, 100);
  });
  Evt.on('textarea-ready', mountCodeMirror);

  function CodeEditor() {
    var _useStore = useStore(StylesStore),
        allOutputs = _useStore.allOutputs;

    var _useStore2 = useStore(MainStore),
        currentPage = _useStore2.currentPage;

    var textAreaId = 'cw-code-editor';
    Evt.emit('textarea-ready', {
      textAreaId: textAreaId
    });
    return /*#__PURE__*/React.createElement("textarea", {
      id: textAreaId,
      defaultValue: allOutputs[currentPage]
    });
  }

  function Panel() {
    var _React$useState = React.useState('editor'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        tab = _React$useState2[0],
        setTab = _React$useState2[1];

    var _React$useState3 = React.useState({
      show: false,
      style: {
        content: {
          top: 0
        },
        arrow: {
          right: 0
        }
      }
    }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        popState = _React$useState4[0],
        setPopState = _React$useState4[1];

    var _useStore = useStore(MainStore),
        previewObject = _useStore.previewObject,
        mounted = _useStore.mounted;

    var allPages = [{
      type: 'global',
      name: 'global',
      title: 'All Pages'
    }];

    if ('pages' in previewObject) {
      if (previewObject.pages.is_home) {
        allPages.push({
          type: 'template',
          name: 'is_home',
          title: 'Blog Post List Page'
        });
      }

      if (previewObject.pages.is_front_page) {
        allPages.push({
          type: 'template',
          name: 'is_front_page',
          title: 'Front Page'
        });
      }

      if (previewObject.pages.is_single) {
        allPages.push({
          type: 'template',
          name: 'is_single',
          title: 'All Single Posts'
        });
        allPages.push({
          type: 'single',
          name: previewObject.page.id,
          title: "Post: ".concat(previewObject.page.title)
        });
      }

      if (previewObject.pages.is_page) {
        allPages.push({
          type: 'template',
          name: 'is_page',
          title: 'All Single Pages'
        });
        allPages.push({
          type: 'single',
          name: previewObject.page.id,
          title: "Page: ".concat(previewObject.page.title)
        });
      }
    }

    var _MainStore$get = MainStore.get(),
        currentPage = _MainStore$get.currentPage;

    var currentTitle = 'All Pages';

    for (var page in allPages) {
      if (allPages.hasOwnProperty(page) && allPages[page].name === currentPage) {
        currentTitle = allPages[page].title;
        break;
      }
    }

    var changePage = function changePage(e, page) {
      MainStore.changePage(page.name, page.type);
      setPopState(function (prev) {
        return _objectSpread2({}, prev, {
          show: false
        });
      });
    };

    var popupNow = function popupNow(e) {
      var clientRect = e.target.getBoundingClientRect();
      var buttonBottom = clientRect.bottom - e.target.offsetParent.getBoundingClientRect().top;
      setPopState(function (prevPopState) {
        return {
          show: !prevPopState.show,
          style: {
            content: {
              top: "".concat(buttonBottom + 10, "px")
            },
            arrow: {
              left: "".concat(clientRect.left + clientRect.width / 2 - 7, "px")
            }
          }
        };
      });
    };

    var togglePause = function togglePause() {
      toggleMounted();
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "cw-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-heading cw-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-5"
    }, /*#__PURE__*/React.createElement("span", null, "Editing Styles for: ")), /*#__PURE__*/React.createElement("div", {
      className: "col-5"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button button-block cw-current-page",
      onClick: popupNow,
      type: "button"
    }, currentTitle), /*#__PURE__*/React.createElement("div", {
      className: "popup-overlay ".concat(popState.show ? '' : 'hidden'),
      onClick: function onClick() {
        return setPopState(function (prev) {
          return _objectSpread2({}, prev, {
            show: false
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "page-selector popup-content ".concat(popState.show ? '' : 'hidden'),
      style: popState.style.content
    }, /*#__PURE__*/React.createElement("div", {
      className: "popup-arrow",
      style: popState.style.arrow
    }), allPages.map(function (page) {
      return /*#__PURE__*/React.createElement("button", {
        key: page.name,
        onClick: function onClick(e) {
          return changePage(e, page);
        },
        className: "button button-block",
        type: "button"
      }, page.title);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button cw-pause",
      onClick: togglePause,
      type: "button"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dashicons dashicons-controls-".concat(mounted ? 'pause' : 'play')
    })))), /*#__PURE__*/React.createElement("div", {
      className: "panel-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-tabs"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'editor-tab tab' + (tab === 'editor' ? ' active' : ''),
      onClick: function onClick() {
        return setTab('editor');
      }
    }, "Visual Editor"), /*#__PURE__*/React.createElement("div", {
      className: "code-tab tab" + (tab === 'code' ? ' active' : ''),
      onClick: function onClick() {
        return setTab('code');
      }
    }, "Code Editor")), /*#__PURE__*/React.createElement("div", {
      className: 'tab-content cw-editor' + (tab !== 'editor' ? ' hidden' : '')
    }, /*#__PURE__*/React.createElement(Editor, null)), /*#__PURE__*/React.createElement("div", {
      className: 'tab-content cw-code-editor' + (tab !== 'code' ? ' hidden' : '')
    }, /*#__PURE__*/React.createElement(CodeEditor, null))));
  }

  function Canvas$1() {
    return /*#__PURE__*/React.createElement("div", {
      id: "cw-canvas"
    }, /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, styles$1), /*#__PURE__*/React.createElement(Panel, null));
  }

  /**
   * Setup Color Wings.
   */
  wp.customize.controlConstructor['color-wings'] = wp.customize.Control.extend({
    ready: function ready() {
      var control = this;
      cw.Evt.emit('colorwings-will-mount', control);
      ReactDOM.render( /*#__PURE__*/React.createElement(Canvas$1, null), document.getElementById('color-wings'));
      wp.customize.section('extra_styles', function (section) {
        section.expanded.bind(function (isExpanded) {
          if (isExpanded) {
            // api.state( 'paneVisible' ).set( false )
            toggleMounted(true);
          } else {
            toggleMounted(false);
          }
        });
      });
      wp.customize.state('previewedDevice').bind(changeDevice);
      cw.Evt.on('update-control', function (currentStylesDetails) {
        console.log(currentStylesDetails); // Todo: Append current style details to the settings

        control.setting.set(currentStylesDetails);
      });
    }
  });
  wp.customize.controlConstructor['cw-link'] = wp.customize.Control.extend({
    ready: function ready() {
      var _this = this;

      this.container[0].addEventListener('click', function () {
        cw.Evt.emit('focusUnlocked');
        wp.customize.control('color_wings').focus();
        cw.Evt.emit('select-element', _this.params.options.selector);
      });
    }
  });

}(React));
//# sourceMappingURL=color-wings.js.map
