import { useContext } from 'react';
import create from './core';
import * as utils from './utils';

const tags = new Map();

export function useShadowRoot() {
	return useContext(utils.Context);
}

const separateWords = ( string, options ) => {
	options = options || {}
	const separator = options.separator || '_'
	const split = options.split || /(?=[A-Z])/
	return string.split(split).join(separator)
}

const decamelize = ( string, options ) => {
	return separateWords(string, options).toLowerCase()
}

export function createProxy(
	target = {},
	id = 'core',
	render = ({ children }) => children,
) {
	return new Proxy(target, {
		get: function get(_, name) {
			const tag = decamelize(name, { separator: '-' });
			const key = `${id}-${tag}`;

			if (!tags.has(key)) tags.set(key, create({ tag, render }));
			return tags.get(key);
		},
	});
}

export default createProxy();
