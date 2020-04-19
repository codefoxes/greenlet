export default function useEnsuredForwardedRef( forwardedRef ) {
	const ensuredRef = React.useRef( forwardedRef && forwardedRef.current )

	React.useEffect(() => {
		if ( ! forwardedRef ) {
			return
		}

		forwardedRef.current = ensuredRef.current
	}, [ forwardedRef ] )
	return ensuredRef
}

export function ensuredForwardRef( Component ) {
	return React.forwardRef( ( props, ref ) => {
		const ensuredRef = useEnsuredForwardedRef( ref )
		return Component( props, ensuredRef )
	} )
}
