(function () {
  'use strict';

  window.cw = window.parent.cw;

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
            detailsOpacity: 0
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

  var moveFocus = function moveFocus(e) {
    if (FocusStore.isFocused()) {
      return;
    }

    currentTarget = e.target;
    var client = currentTarget.getBoundingClientRect();
    var offsetTop = window.pageYOffset + client.top;
    var detailsTop = offsetTop - 24 < window.pageYOffset ? offsetTop + client.height : offsetTop - 24;
    var newState = {
      focusLines: getFocusLinesNewState(client),
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

  var lockUnlockFocus = function lockUnlockFocus(e) {
    e.preventDefault();
    e.stopPropagation();

    if (FocusStore.isFocused()) {
      FocusStore.unlockFocus();
      Evt.emit('focusUnlocked', FocusStore.get().focusDetails.selector);
    } else {
      FocusStore.lockFocus();
      Evt.emit('focusLocked', {
        currentSelector: FocusStore.get().focusDetails.selector,
        currentTarget: currentTarget
      });
    }
  };

  var reduceFocus = function reduceFocus() {
    FocusStore.reduceFocusOpacity();
  };

  var increaseFocus = function increaseFocus() {
    FocusStore.increaseFocusOpacity();
  };

  var updateFocus = function updateFocus() {
    var client = currentTarget.getBoundingClientRect();
    var newState = {
      focusLines: getFocusLinesNewState(client)
    };
    FocusStore.moveFocus(newState);
  };
  var bodyContent = document.querySelectorAll('body > *:not(script):not(style):not(#color-wings)');
  bodyContent.forEach(function (el) {
    el.addEventListener('mouseover', moveFocus);
    el.addEventListener('click', lockUnlockFocus, true);
  });
  document.body.addEventListener('mouseleave', reduceFocus);
  document.body.addEventListener('mouseenter', increaseFocus);

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

  var styleTag;

  var addCWStylesTag = function addCWStylesTag() {
    styleTag = document.createElement('style');
    styleTag.id = 'cw-applied-styles';
    document.head.appendChild(styleTag);
  };

  addCWStylesTag();

  var addStyles = function addStyles() {
    var _cw$StylesStore$get = cw.StylesStore.get(),
        output = _cw$StylesStore$get.output;

    styleTag.innerHTML = output;
  };

  var debouncedUpdateFocus = debounce(updateFocus, 500, true);
  cw.StylesStore.subscribe(addStyles);
  cw.StylesStore.subscribe(debouncedUpdateFocus);

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

  function Canvas() {
    return /*#__PURE__*/React.createElement("div", {
      id: "cw-canvas"
    }, /*#__PURE__*/React.createElement(FocusDetails, null), /*#__PURE__*/React.createElement(Focuser, null));
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
      document.body.appendChild(canvas);
      cw.Evt.on('mount-colorwings', function () {
        ReactDOM.render( /*#__PURE__*/React.createElement(Canvas, null), canvas);
      });
      cw.Evt.on('unmount-colorwings', function () {
        ReactDOM.unmountComponentAtNode(canvas);
      });
    });
  } // else {
  // 	const canvas = document.createElement( 'div' )
  // 	canvas.id = 'color-wings';
  // 	document.body.appendChild( canvas )
  // 	ReactDOM.render(
  // 		<Canvas />,
  // 		canvas
  // 	)
  // }

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

}());
//# sourceMappingURL=greenlet-preview.js.map
