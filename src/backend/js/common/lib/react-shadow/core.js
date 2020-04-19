import useEnsuredForwardedRef from './forwardedRef';
import * as utils from './utils';

function ShadowContent({ root, children }) {
	return ReactDOM.createPortal(children, root);
}

ShadowContent.defaultProps = { children: null };

export default function create(options) {
	const ShadowRoot = React.forwardRef(
		(
			{ mode, delegatesFocus, styleSheets, ssr, children, ...props },
			ref,
		) => {
			const node = useEnsuredForwardedRef(ref);
			const [root, setRoot] = React.useState(null);
			const key = `node_${mode}${delegatesFocus}`;

			React.useEffect(() => {
				if (node.current) {
					try {
						typeof ref === 'function' && ref(node.current);

						if (ssr) {
							const root = node.current.shadowRoot;
							setRoot(root);
							return;
						}

						const root = node.current.attachShadow({
							mode,
							delegatesFocus,
						});
						styleSheets.length > 0 &&
						(root.adoptedStyleSheets = styleSheets);
						setRoot(root);
					} catch (error) {
						utils.handleError({ error, styleSheets, root });
					}
				}
			}, [ref, node, styleSheets]);

			return (
				<>
					<options.tag key={key} ref={node} {...props}>
						{(root || ssr) && (
							<utils.Context.Provider value={root}>
								{ssr ? (
									<template shadowroot="open">
										{options.render({
											root,
											ssr,
											children,
										})}
									</template>
								) : (
									<ShadowContent root={root}>
										{options.render({
											root,
											ssr,
											children,
										})}
									</ShadowContent>
								)}
							</utils.Context.Provider>
						)}
					</options.tag>
				</>
			);
		},
	);

	ShadowRoot.defaultProps = {
		mode: 'open',
		delegatesFocus: false,
		styleSheets: [],
		ssr: false,
		children: null,
	};

	return ShadowRoot;
}
