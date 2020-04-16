let STORE = {};
let COUNTER = 0;

export class Store {
	constructor(initialState, name) {
		this.name = '';
		this._listeners = [];
		if (name)
			this.name = name;
		this.idx = COUNTER++;
		STORE[this.idx] = initialState;
		this.initialState = initialState;
	}
	get() {
		return STORE[this.idx];
	}
	set(state, info) {
		if (this.condition) {
			const newState = this.condition(Object.assign(Object.assign({}, STORE[this.idx]), state(STORE[this.idx])), info);
			if (newState)
				STORE[this.idx] = newState;
		}
		else {
			STORE[this.idx] = Object.assign(Object.assign({}, STORE[this.idx]), state(STORE[this.idx]));
		}
		this._listeners.forEach(fn => fn());
	}
	replace(state, info) {
		if (this.condition) {
			const newState = this.condition(state(STORE[this.idx]), info);
			if (newState)
				STORE[this.idx] = newState;
		}
		else {
			STORE[this.idx] = state(STORE[this.idx]);
		}
		this._listeners.forEach(fn => fn());
	}
	setCondition(func) {
		this.condition = func;
	}
	reset() {
		STORE[this.idx] = this.initialState;
	}
	subscribe(fn) {
		this._listeners.push(fn);
	}
	unsubscribe(fn) {
		this._listeners = this._listeners.filter(f => f !== fn);
	}
}

// React Specific.
export class Subscribe extends React.PureComponent {
	constructor() {
		super(...arguments);
		this.stores = [];
		this.onUpdate = () => {
			this.forceUpdate();
		};
	}
	componentWillReceiveProps() {
		this._unsubscribe();
	}
	componentWillUnmount() {
		this._unsubscribe();
	}
	_unsubscribe() {
		this.stores.forEach(store => {
			store.unsubscribe(this.onUpdate);
		});
	}
	render() {
		let stores = [];
		const states = this.props.to.map(store => {
			store.unsubscribe(this.onUpdate);
			store.subscribe(this.onUpdate);
			stores.push(store);
			return store.get();
		});
		this.stores = stores;
		return this.props.children(...states);
	}
}
export function useStore(store) {
	const [state, setState] = React.useState(store.get());
	function updateState() {
		setState(store.get());
	}
	React.useEffect(() => {
		store.subscribe(updateState);
		return () => store.unsubscribe(updateState);
	});
	return state;
}
export function useStores(stores) {
	const [state, setState] = React.useState(stores.map(store => store.get()));
	function updateState() {
		setState(stores.map(store => store.get()));
	}
	React.useEffect(() => {
		stores.map(store => store.subscribe(updateState));
		return () => stores.map(store => store.unsubscribe(updateState));
	});
	return state;
}
