(function (React$1, reactDom) {
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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
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
    focused: false
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
    }]);

    return FocusClass;
  }(Store);

  var FocusStore = new FocusClass(initialState);

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

  function getSelector(el) {
    if (el === document.body) {
      return 'body';
    }

    if (el.id !== '') {
      return "#".concat(el.id);
    }

    var selector = '';
    el.classList.forEach(function (cls) {
      // Ignore classes
      if (selector.length > 20) {
        return false;
      }

      selector += ".".concat(cls);
    });

    if (el.classList.length === 0) {
      selector = el.tagName.toLowerCase();
    }

    var parentSelector = getSelector(el.parentElement); // Ignore classes

    if ("".concat(parentSelector, " ").concat(selector).length > 30) {
      return selector;
    }

    return "".concat(parentSelector, " ").concat(selector);
  }

  var moveFocus = function moveFocus(e) {
    // if (
    // 	e.target.id.includes( 'cw-focus' ) ||
    // 	e.target.id.includes( 'cw-canvas' ) ||
    // 	e.target.id.includes( 'cw-edit' )
    // ) {
    // 	return
    // }
    if (FocusStore.isFocused()) {
      return;
    }

    var client = e.target.getBoundingClientRect();
    var offsetTop = window.pageYOffset + client.top;
    var detailsTop = offsetTop - 24 < window.pageYOffset ? offsetTop + client.height : offsetTop - 24;
    var newState = {
      focusLines: {
        top: {
          borderTop: '1px solid #7CB342',
          width: client.width,
          left: client.left,
          top: offsetTop
        },
        right: {
          borderRight: '1px solid #7CB342',
          height: client.height,
          left: client.right,
          top: offsetTop
        },
        bottom: {
          borderTop: '1px solid #7CB342',
          width: client.width + 1,
          left: client.left,
          top: window.pageYOffset + client.bottom
        },
        left: {
          borderRight: '1px solid #7CB342',
          height: client.height,
          left: client.left,
          top: offsetTop
        }
      },
      focusDetails: {
        style: {
          left: client.left,
          top: detailsTop,
          height: '24px',
          background: '#7CB342'
        },
        selector: getSelector(e.target)
      }
    };
    FocusStore.moveFocus(newState);
  };

  function lockUnlockFocus(e) {
    e.preventDefault();
    e.stopPropagation();

    if (FocusStore.isFocused()) {
      FocusStore.unlockFocus();
      Evt.emit('focusUnlocked', FocusStore.get().focusDetails.selector);
    } else {
      FocusStore.lockFocus();
      Evt.emit('focusLocked', FocusStore.get().focusDetails.selector);
    }
  }

  var bodyContent = document.querySelectorAll('body > *:not(script):not(style):not(#color-wings)');
  bodyContent.forEach(function (el) {
    el.addEventListener('mouseover', moveFocus);
    el.addEventListener('click', lockUnlockFocus, true);
  }); // document.body.addEventListener( 'mouseover', moveFocus )
  // document.addEventListener( 'click', lockUnlockFocus, true )

  var initialState$1 = {
    currentSelector: '',
    openSection: false
  };

  var EditorClass = /*#__PURE__*/function (_Store) {
    _inherits(EditorClass, _Store);

    var _super = _createSuper(EditorClass);

    function EditorClass() {
      _classCallCheck(this, EditorClass);

      return _super.apply(this, arguments);
    }

    _createClass(EditorClass, [{
      key: "test",
      value: function test(newState) {
        _get(_getPrototypeOf(EditorClass.prototype), "set", this).call(this, function () {
          return newState;
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
    }]);

    return EditorClass;
  }(Store);

  var EditorStore = new EditorClass(initialState$1);

  Evt.on('focusLocked', function (currentSelector) {
    EditorStore.set(function () {
      return {
        currentSelector: currentSelector
      };
    });
  });
  Evt.on('focusUnlocked', function () {
    EditorStore.set(function () {
      return {
        currentSelector: ''
      };
    });
  });

  function Focuser() {
    var _useStore = useStore(FocusStore),
        focusLines = _useStore.focusLines;

    return /*#__PURE__*/React.createElement("div", {
      id: "cw-focuser"
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
        focusDetails = _useStore.focusDetails;

    return /*#__PURE__*/React.createElement("div", {
      id: "cw-focus-details",
      className: "cw-focus-details",
      style: focusDetails.style
    }, /*#__PURE__*/React.createElement("div", {
      id: "cw-focus-selector",
      className: "cw-selector"
    }, focusDetails.selector));
  }

  var LengthTab = /*#__PURE__*/function (_React$Component) {
    _inherits(LengthTab, _React$Component);

    var _super = _createSuper(LengthTab);

    function LengthTab(props) {
      var _this;

      _classCallCheck(this, LengthTab);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), "showShortHand", ['radius', 'padding', 'margin'].includes(_this.props.subType));

      _defineProperty(_assertThisInitialized(_this), "units", {
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
        }
      });

      _defineProperty(_assertThisInitialized(_this), "resetValue", _this.props.val);

      _defineProperty(_assertThisInitialized(_this), "getLength", function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var size = '';

        if (false !== value) {
          size = value;
        } else {
          size = _this.props.val;
          var splits = size.split(' ');

          if (splits.length === 4) {
            size = _this.props.tab === 0 ? '0px' : splits[_this.props.tab - 1];
          }
        }

        var matches = size.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
        return [null === matches ? '' : matches[1], null === matches ? 'px' : matches[2]];
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        var _this$getLength = _this.getLength(),
            _this$getLength2 = _slicedToArray(_this$getLength, 2),
            main = _this$getLength2[0],
            unit = _this$getLength2[1];

        _this.setState({
          main: main,
          unit: unit
        }, _this.handleChange);
      });

      _defineProperty(_assertThisInitialized(_this), "handleChange", function () {
        _this.props.handleChange(_this.props.tab, _this.state.main + _this.state.unit);
      });

      _defineProperty(_assertThisInitialized(_this), "handleLengthChange", function (e) {
        e.persist();

        _this.setState({
          main: e.target.value
        }, _this.handleChange);
      });

      _defineProperty(_assertThisInitialized(_this), "handleUnitChange", function (e) {
        e.persist();
        var unit = e.target.value;

        _this.setState({
          unit: unit,
          step: _this.units[unit].step,
          min: _this.units[unit].min,
          max: _this.units[unit].max
        }, _this.handleChange);
      });

      var _this$getLength3 = _this.getLength(),
          _this$getLength4 = _slicedToArray(_this$getLength3, 2),
          _main = _this$getLength4[0],
          _unit = _this$getLength4[1];

      _this.state = {
        main: _main,
        unit: _unit,
        step: _this.units[_unit].step,
        min: _this.units[_unit].min,
        max: _this.units[_unit].max
      };
      return _this;
    }

    _createClass(LengthTab, [{
      key: "render",
      value: function render() {
        var main = this.state.main;
        return /*#__PURE__*/React.createElement("div", {
          className: "tab-content " + (this.showShortHand ? 'shorthand' : '') + (this.props.hidden ? ' hidden' : '')
        }, /*#__PURE__*/React.createElement("div", {
          className: "cw-row"
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-7 range-wrap"
        }, /*#__PURE__*/React.createElement("input", {
          type: "range",
          step: this.state.step,
          min: this.state.min,
          max: this.state.max,
          value: main,
          onChange: this.handleLengthChange
        })), /*#__PURE__*/React.createElement("div", {
          className: "col-3"
        }, /*#__PURE__*/React.createElement("input", {
          type: "number",
          step: this.state.step,
          min: this.state.min,
          max: this.state.max,
          value: main,
          onChange: this.handleLengthChange
        })), /*#__PURE__*/React.createElement("select", {
          className: "col-2 length-unit",
          onChange: this.handleUnitChange,
          value: this.state.unit
        }, Object.keys(this.units).map(function (unit) {
          return /*#__PURE__*/React.createElement("option", {
            key: unit,
            value: unit
          }, unit);
        })), /*#__PURE__*/React.createElement("span", {
          className: "reset",
          onClick: this.reset
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
    }]);

    return LengthTab;
  }(React.Component);

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

  var Length = /*#__PURE__*/function (_React$Component) {
    _inherits(Length, _React$Component);

    var _super = _createSuper(Length);

    function Length(props) {
      var _this;

      _classCallCheck(this, Length);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), "showShortHand", ['radius', 'padding', 'margin'].includes(_this.props.subType));

      _defineProperty(_assertThisInitialized(_this), "onTab", function (e, i) {
        e.currentTarget.parentNode.childNodes.forEach(function (tab) {
          return tab.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        _this.setState({
          tab: i
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleChange", function (tab, val) {
        var values = _this.state.values;
        values[tab] = val;
        var currentVal = val;

        if (tab !== 0 && tab !== undefined) {
          currentVal = "".concat(values[1], " ").concat(values[2], " ").concat(values[3], " ").concat(values[4]);
        }

        _this.setState({
          currentVal: currentVal
        });

        _this.setState({
          values: values
        });

        _this.props.onChange(currentVal);
      });

      var size = _this.props.val;
      var splits = size.split(' ');
      var _values = [size, size, size, size, size];

      if (splits.length === 4) {
        _values = ['0px', splits[0], splits[1], splits[2], splits[3]];
      }

      _this.state = {
        tab: 0,
        values: _values,
        currentVal: _this.props.val
      };
      return _this;
    }

    _createClass(Length, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        this.onTab = this.onTab.bind(this);
        var tabs = this.showShortHand && /*#__PURE__*/React.createElement("div", {
          className: "tabs"
        }, [0, 1, 2, 3, 4].map(function (i) {
          return /*#__PURE__*/React.createElement("div", {
            key: i,
            className: "tab tab-".concat(i, " ").concat(i === 0 ? 'active' : ''),
            onClick: function onClick(e) {
              return _this2.onTab(e, i);
            }
          }, /*#__PURE__*/React.createElement(LengthIcon, {
            tab: i,
            subType: _this2.props.subType
          }));
        }));
        var tabContent;

        if (this.showShortHand) {
          tabContent = [0, 1, 2, 3, 4].map(function (i) {
            return /*#__PURE__*/React.createElement(LengthTab, _extends({}, _this2.props, {
              key: i,
              tab: i,
              hidden: i !== _this2.state.tab,
              handleChange: _this2.handleChange
            }));
          });
        } else {
          tabContent = /*#__PURE__*/React.createElement(LengthTab, _extends({}, this.props, {
            handleChange: this.handleChange
          }));
        }

        var output = this.showShortHand && /*#__PURE__*/React.createElement("div", {
          className: "output"
        }, "Output: ", this.state.currentVal);
        return /*#__PURE__*/React.createElement("div", {
          className: "cw-length"
        }, this.props.label && /*#__PURE__*/React.createElement("span", {
          className: "customize-control-title"
        }, this.props.label), this.props.description && /*#__PURE__*/React.createElement("span", {
          className: "description customize-control-description"
        }, this.props.description), tabs, tabContent, output);
      }
    }]);

    return Length;
  }(React.Component);

  function useEnsuredForwardedRef(forwardedRef) {
    var ensuredRef = React$1.useRef(forwardedRef && forwardedRef.current);
    React$1.useEffect(function () {
      if (!forwardedRef) {
        return;
      }

      forwardedRef.current = ensuredRef.current;
    }, [forwardedRef]);
    return ensuredRef;
  }

  var Context = React.createContext(null);
  function handleError(_ref) {
    var error = _ref.error,
        styleSheets = _ref.styleSheets,
        root = _ref.root;

    switch (error.name) {
      case 'NotSupportedError':
        styleSheets.length > 0 && (root.adoptedStyleSheets = styleSheets);
        break;

      default:
        throw error;
    }
  }

  function ShadowContent(_ref) {
    var root = _ref.root,
        children = _ref.children;
    return reactDom.createPortal(children, root);
  }

  ShadowContent.defaultProps = {
    children: null
  };
  function create(options) {
    var ShadowRoot = React$1.forwardRef(function (_ref2, ref) {
      var mode = _ref2.mode,
          delegatesFocus = _ref2.delegatesFocus,
          styleSheets = _ref2.styleSheets,
          ssr = _ref2.ssr,
          children = _ref2.children,
          props = _objectWithoutProperties(_ref2, ["mode", "delegatesFocus", "styleSheets", "ssr", "children"]);

      var node = useEnsuredForwardedRef(ref);

      var _useState = React$1.useState(null),
          _useState2 = _slicedToArray(_useState, 2),
          root = _useState2[0],
          setRoot = _useState2[1];

      var key = "node_".concat(mode).concat(delegatesFocus);
      React$1.useEffect(function () {
        if (node.current) {
          try {
            typeof ref === 'function' && ref(node.current);

            if (ssr) {
              var _root2 = node.current.shadowRoot;
              setRoot(_root2);
              return;
            }

            var _root = node.current.attachShadow({
              mode: mode,
              delegatesFocus: delegatesFocus
            });

            styleSheets.length > 0 && (_root.adoptedStyleSheets = styleSheets);
            setRoot(_root);
          } catch (error) {
            handleError({
              error: error,
              styleSheets: styleSheets,
              root: root
            });
          }
        }
      }, [ref, node, styleSheets]);
      return /*#__PURE__*/React$1__default.createElement(React$1__default.Fragment, null, /*#__PURE__*/React$1__default.createElement(options.tag, _extends({
        key: key,
        ref: node
      }, props), (root || ssr) && /*#__PURE__*/React$1__default.createElement(Context.Provider, {
        value: root
      }, ssr ? /*#__PURE__*/React$1__default.createElement("template", {
        shadowroot: "open"
      }, options.render({
        root: root,
        ssr: ssr,
        children: children
      })) : /*#__PURE__*/React$1__default.createElement(ShadowContent, {
        root: root
      }, options.render({
        root: root,
        ssr: ssr,
        children: children
      })))));
    });
    ShadowRoot.defaultProps = {
      mode: 'open',
      delegatesFocus: false,
      styleSheets: [],
      ssr: false,
      children: null
    };
    return ShadowRoot;
  }

  var tags = new Map();

  var separateWords = function separateWords(string, options) {
    options = options || {};
    var separator = options.separator || '_';
    var split = options.split || /(?=[A-Z])/;
    return string.split(split).join(separator);
  };

  var decamelize = function decamelize(string, options) {
    return separateWords(string, options).toLowerCase();
  };

  function createProxy() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'core';
    var render = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (_ref) {
      var children = _ref.children;
      return children;
    };
    return new Proxy(target, {
      get: function get(_, name) {
        var tag = decamelize(name, {
          separator: '-'
        });
        var key = "".concat(id, "-").concat(tag);
        if (!tags.has(key)) tags.set(key, create({
          tag: tag,
          render: render
        }));
        return tags.get(key);
      }
    });
  }
  var root = createProxy();

  var styles = "input {\n  display: inline-block;\n  box-sizing: border-box;\n  width: 100%; }\n\n.hidden {\n  display: none; }\n\n.cw-row {\n  display: flex; }\n  .cw-row .col-2 {\n    width: 16.667%; }\n  .cw-row .col-3 {\n    width: 25%; }\n  .cw-row .col-7 {\n    width: 58.333%; }\n\n#cw-editor-wrap ul, #cw-editor-wrap li {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n#cw-editor-wrap .cw-panel {\n  position: fixed;\n  top: 18%;\n  left: 1%;\n  display: block;\n  width: 16%;\n  height: 80%;\n  background: #eee;\n  font-size: 13px;\n  color: #444;\n  border: 1px solid #ddd;\n  box-shadow: 0 0 2px 0 rgba(124, 179, 66, 0.2); }\n\n#cw-editor-wrap .cw-panel-title {\n  border-bottom: 1px solid #ddd;\n  font-size: 14px;\n  padding: 12px 16px;\n  color: #444;\n  line-height: 16px;\n  margin: 0; }\n\n#cw-editor-wrap .cw-panel-main {\n  height: calc(100% - 41px);\n  overflow-y: auto; }\n\n#cw-editor-wrap h3.cw-section-title {\n  border-bottom: 1px solid #ddd;\n  background: #fff;\n  font-size: 14px;\n  padding: 12px 16px;\n  font-weight: 600;\n  color: #444;\n  line-height: 16px;\n  margin: 0; }\n\n.cw-section-content {\n  border-bottom: 1px solid #ddd;\n  max-height: 0;\n  transform: scaleY(0);\n  overflow: auto;\n  transition: max-height .7s linear, transform .7s linear; }\n\n.open .cw-section-content {\n  transform: scaleY(1);\n  max-height: 600px; }\n\n.cw-control .cw-length .tabs {\n  display: flex;\n  margin: 0 0 -1px -1px;\n  position: relative;\n  z-index: 2; }\n\n.cw-control .cw-length .tab {\n  padding: 8px 10px;\n  border: 1px solid transparent;\n  border-top: none;\n  cursor: pointer; }\n  .cw-control .cw-length .tab.active {\n    border: 1px solid #ccc;\n    border-bottom-color: #eee;\n    border-top: none;\n    background: #eee; }\n\n.cw-control .cw-length .tab-content {\n  position: relative; }\n  .cw-control .cw-length .tab-content.shorthand {\n    border-top: 1px solid #ccc;\n    padding: 30px 5px 15px; }\n\n.cw-control .cw-length .output {\n  padding: 5px;\n  border-top: 1px solid #ccc;\n  font-size: 11px;\n  margin-top: -1px; }\n\n.cw-control .cw-length .reset {\n  position: absolute;\n  right: 6px;\n  bottom: 47px;\n  padding: 4px;\n  cursor: pointer; }\n  .cw-control .cw-length .reset:hover {\n    background: #fff; }\n\n.cw-control .cw-length svg {\n  display: block; }\n";

  function Editor() {
    var _useStore = useStore(EditorStore),
        currentSelector = _useStore.currentSelector,
        openSection = _useStore.openSection;

    var onChange = function onChange(data) {
      return console.log(data);
    };

    var sections = [{
      id: 'padding',
      title: 'Padding',
      controls: [{
        id: 'padding',
        Component: Length,
        params: {
          subType: 'padding',
          val: '2px',
          onChange: onChange
        }
      }]
    }, {
      id: 'margin',
      title: 'Margin',
      controls: [{
        id: 'margin',
        Component: Length,
        params: {
          subType: 'margin',
          val: '2px',
          onChange: onChange
        }
      }]
    }];
    return /*#__PURE__*/React.createElement(root.div, {
      id: "cw-editor"
    }, /*#__PURE__*/React.createElement("div", {
      id: "cw-editor-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      id: "cw-editor-panel",
      className: "cw-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-title"
    }, currentSelector ? currentSelector : 'No Element Selected'), /*#__PURE__*/React.createElement("div", {
      className: "cw-panel-main"
    }, currentSelector !== '' && /*#__PURE__*/React.createElement("ul", {
      className: "cw-panel-sections"
    }, sections.map(function (section) {
      return /*#__PURE__*/React.createElement("li", {
        key: section.id,
        className: "cw-panel-section ".concat(openSection === section.id ? 'open' : '')
      }, /*#__PURE__*/React.createElement("h3", {
        className: "cw-section-title",
        onClick: function onClick() {
          return EditorStore.toggleSection(section.id);
        }
      }, section.title), /*#__PURE__*/React.createElement("div", {
        className: "cw-section-content"
      }, section.controls.map(function (control) {
        return /*#__PURE__*/React.createElement("div", {
          key: control.id,
          className: "cw-control"
        }, /*#__PURE__*/React.createElement(control.Component, control.params));
      })));
    }), /*#__PURE__*/React.createElement("li", {
      key: "text",
      className: "cw-padding-section"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "cw-section-title"
    }, "Text")), /*#__PURE__*/React.createElement("li", {
      key: "bg",
      className: "cw-padding-section"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "cw-section-title"
    }, "Background")))))), /*#__PURE__*/React.createElement("style", {
      type: "text/css"
    }, styles));
  }

  function Canvas() {
    return /*#__PURE__*/React.createElement("div", {
      id: "cw-canvas"
    }, /*#__PURE__*/React.createElement(FocusDetails, null), /*#__PURE__*/React.createElement(Focuser, null), /*#__PURE__*/React.createElement(Editor, null));
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
      wp.customize.preview.bind('init-wings', function (data) {
        if (data === true) {
          var canvas = document.createElement('div');
          canvas.id = 'color-wings';
          document.body.appendChild(canvas);
          ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, null), canvas);
        }
      });
    });
  } else {
    var canvas = document.createElement('div');
    canvas.id = 'color-wings';
    document.body.appendChild(canvas);
    ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, null), canvas);
  }

  /**
  * Greenlet Customizer Preview.
  *
  * @package greenlet
  */
  function legacy() {
    if (typeof wp === 'undefined' || !wp.hasOwnProperty('customize')) {
      return;
    }
    /**
     * Get current computed CSS property of an element.
     *
     * @param   {Element} element  DOM Element.
     * @param   {string}  property CSS Property.
     * @returns {string}           Current CSS Value.
     */


    function getCurrentStyle(element, property) {
      if (null === element) {
        return 'inherit';
      }

      return window.getComputedStyle(element, null).getPropertyValue(property);
    }
    /**
     * Add or Update Style Link.
     *
     * @param {string} styleId Unique style ID.
     * @param {string} href    Link href.
     */


    function updateStyleLink(styleId, href) {
      var styleLink = document.getElementById(styleId);

      if (styleLink === null) {
        var link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      } else {
        styleLink.href = href;
      }
    }
    /**
     * Bind Selector Style to contoldId.
     *
     * @param {string} controlId Control ID.
     * @param {string} selector  CSS Selctor.
     * @param {string} style     Style Property.
     * @param {string} suffix    Unit suffix.
     */


    function bindStyle(controlId, selector, style) {
      var suffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      wp.customize(controlId, function (value) {
        var headTag = document.head;
        var styleTag = document.createElement('style');
        styleTag.id = controlId + '-css';
        headTag.appendChild(styleTag);
        value.bind(function (to) {
          if ('' !== suffix) {
            to = to + suffix;
          }

          if ('font' === style) {
            var newFontFamily = to.family === 'Default' ? 'system-ui' : to.family;
            newFontFamily += ', ' + getCurrentStyle(document.querySelector(selector), 'font-family');
            newFontFamily = newFontFamily.split(', ').slice(0, 5).join(', ');
            styleTag.innerHTML = selector + '{ font-family: ' + newFontFamily + '; \
							font-style: ' + to.style + '; \
							font-weight: ' + to.weight + '; \
							font-size: ' + to.size + ';}';

            if (to.source === 'google') {
              var fontFamily = to.family.split(' ').join('+');
              updateStyleLink(controlId + '-google', 'https://fonts.googleapis.com/css?family=' + fontFamily + ':' + to.weight);
            }
          } else {
            styleTag.innerHTML = selector + '{' + style + ': ' + to + ';}';
          }
        });
      });
    }

    var inputSelector = 'input[type="email"], input[type="number"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], input[type="password"], textarea, select';
    var buttonSelector = '.button, button, input[type="submit"], input[type="reset"], input[type="button"], .pagination li a, .pagination li span';
    var headingSelector = 'h1, h2, h3, h4, h5, h6, .entry-title a';

    function getPseudo(selectors, pseudo) {
      if (!Array.isArray(selectors)) {
        selectors = selectors.split(',');
      }

      if (typeof pseudo === 'undefined') {
        pseudo = ':hover';
      }

      var pseudoSelectors = [];
      var selectorsLength = selectors.length;

      for (var i = 0; i < selectorsLength; i++) {
        pseudoSelectors.push(selectors[i] + pseudo);
      }

      return pseudoSelectors.join(',');
    }

    bindStyle('logo_width', '.site-logo img', 'width');
    bindStyle('logo_height', '.site-logo img', 'height');
    bindStyle('site_bg', 'body', 'background');
    bindStyle('site_color', 'body', 'color');
    bindStyle('topbar_bg', '.topbar', 'background');
    bindStyle('topbar_color', '.topbar', 'color');
    bindStyle('header_bg', '.site-header, .site-navigation ul .children, .site-navigation ul .sub-menu', 'background');
    bindStyle('header_color', '.site-header, .site-header a, .site-header .hamburger', 'color');
    bindStyle('header_link_hover', '.site-header a:hover', 'color');
    bindStyle('main_bg', '.site-content', 'background');
    bindStyle('content_bg', '.entry-article, .sidebar > .wrap, #comments, .breadcrumb', 'background');
    bindStyle('semifooter_bg', '.semifooter', 'background');
    bindStyle('semifooter_color', '.semifooter', 'color');
    bindStyle('footer_bg', '.site-footer', 'background');
    bindStyle('footer_color', '.site-footer', 'color');
    bindStyle('heading_color', headingSelector, 'color');
    bindStyle('heading_hover_color', getPseudo(headingSelector), 'color');
    bindStyle('heading_font', headingSelector, 'font');
    bindStyle('h1_font', 'h1', 'font');
    bindStyle('h2_font', 'h2, h2.entry-title a', 'font');
    bindStyle('h3_font', 'h3', 'font');
    bindStyle('h4_font', 'h4', 'font');
    bindStyle('h5_font', 'h5', 'font');
    bindStyle('h6_font', 'h6', 'font');
    bindStyle('link_color', 'a, .entry-meta li', 'color');
    bindStyle('link_hover', 'a:hover', 'color');
    bindStyle('link_font', 'a, .entry-meta li', 'font');
    bindStyle('button_bg', buttonSelector, 'background');
    bindStyle('button_color', buttonSelector, 'color');
    bindStyle('button_border', buttonSelector, 'border');
    bindStyle('button_radius', buttonSelector, 'border-radius');
    bindStyle('button_hover_bg', getPseudo(buttonSelector), 'background');
    bindStyle('button_hover_color', getPseudo(buttonSelector), 'color');
    bindStyle('button_hover_border', getPseudo(buttonSelector), 'border');
    bindStyle('button_font', buttonSelector, 'font');
    bindStyle('input_bg', inputSelector, 'background');
    bindStyle('input_color', inputSelector, 'color');
    bindStyle('input_border', inputSelector, 'border');
    bindStyle('input_radius', inputSelector, 'border-radius');
    bindStyle('input_placeholder', getPseudo(inputSelector, '::placeholder'), 'color');
    bindStyle('input_focus_bg', getPseudo(inputSelector, ':focus'), 'background');
    bindStyle('input_focus_color', getPseudo(inputSelector, ':focus'), 'color');
    bindStyle('input_focus_border', getPseudo(inputSelector, ':focus'), 'border');
    bindStyle('input_focus_placeholder', getPseudo(getPseudo(inputSelector, ':focus'), '::placeholder'), 'color');
    bindStyle('input_font', inputSelector, 'font');
    bindStyle('para_color', 'p', 'color');
    bindStyle('para_font', 'p', 'font');
    bindStyle('code_bg', 'code', 'background');
    bindStyle('code_color', 'code', 'color');
    bindStyle('code_border', 'code', 'border');
    bindStyle('code_font', 'code', 'font');
    bindStyle('icons_color', '.entry-meta svg', 'fill');
    bindStyle('base_font', 'body', 'font');
    bindStyle('header_font', '.site-header', 'font');
    bindStyle('logo_font', '.site-logo, h1.site-name a', 'font');
    bindStyle('content_font', '.site-content', 'font');
    bindStyle('footer_font', '.site-footer', 'font');
    bindStyle('container_width', '.container', 'max-width');
    bindStyle('topbar_width', '.topbar', 'max-width');
    bindStyle('topbar_container', '.topbar .container', 'max-width');
    bindStyle('header_width', '.site-header', 'max-width');
    bindStyle('header_container', '.site-header .container', 'max-width');
    bindStyle('main_width', '.site-content', 'max-width');
    bindStyle('main_container', '.site-content .container', 'max-width');
    bindStyle('semifooter_width', '.semifooter', 'max-width');
    bindStyle('semifooter_container', '.semifooter .container', 'max-width');
    bindStyle('footer_width', '.site-footer', 'max-width');
    bindStyle('footer_container', '.site-footer .container', 'max-width');
  }

  /**
   * Greenlet Customizer Preview.
   *
   * @package greenlet
   */
  legacy();

}(React, ReactDOM));
//# sourceMappingURL=greenlet-preview.js.map
