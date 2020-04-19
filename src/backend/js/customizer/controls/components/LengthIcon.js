function LengthIcon( props ) {

	const { subType, tab } = props
	let mainShape, extraShape
	if ( subType === 'radius' ) {
		mainShape = <rect stroke="#999" fill="none" x="1" y="1" width="14" height="14" rx="3" />
		extraShape = <rect stroke="#7CB342" strokeWidth="2" fill="none" x="1" y="1" width="14" height="14" rx="4" />
		if ( tab === 1 ) {
			extraShape = <path d="M8,0 L8,2 L5,2 C3.34,2 2,3.34 2,5 L2,8 L0,8 L0,5 C0,2.24 2.24,0 5,0 L8,0 Z" fill="#7CB342" />
		} else if ( tab === 2 ) {
			extraShape = <path d="M8,0 L11,0 C13.76,0 16,2.24 16,5 L16,8 L14,8 L14,5 C14,3.34 12.66,2 11,2 L8,2 L8,0 Z" fill="#7CB342" />
		} else if ( tab === 3 ) {
			extraShape = <path d="M16,8 L16,11 C16,13.76 13.76,16 11,16 L8,16 L8,14 L11,14 C12.66,14 14,12.66 14,11 L14,8 L16,8 Z" fill="#7CB342" />
		} else if ( tab === 4 ) {
			extraShape = <path d="M8,16 L5,16 C2.24,16 0,13.76 0,11 L0,8 L2,8 L2,11 C2,12.66 3.34,14 5,14 L8,14 L8,16 Z" fill="#7CB342" />
		}
	} else if ( subType === 'padding' ) {
		mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="1" y="1" width="14" height="14" rx="1" />
		extraShape = <rect stroke="#7CB342" strokeWidth="4" fill="none" x="3" y="3" width="10" height="10" rx="0" opacity=".6" />
		if ( tab === 1 ) {
			extraShape = <rect fill="#7CB342" x="1" y="1" width="14" height="5" opacity=".6" />
		} else if ( tab === 2 ) {
			extraShape = <rect fill="#7CB342" x="10" y="1" width="5" height="14" opacity=".6" />
		} else if ( tab === 3 ) {
			extraShape = <rect fill="#7CB342" x="1" y="10" width="14" height="5" opacity=".6" />
		} else if ( tab === 4 ) {
			extraShape = <rect fill="#7CB342" x="1" y="1" width="5" height="14" opacity=".6" />
		}
	} else if ( subType === 'margin' ) {
		mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="2.5" y="2.5" width="11" height="11" rx="1" />
		extraShape = <rect stroke="#F9CDA0" strokeWidth="2.5" fill="none" x="1" y="1" width="14" height="14" rx="1" />
		if ( tab === 1 ) {
			mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="1" y="5.5" width="14" height="9.5" rx="1" />
			extraShape = <rect fill="#F9CDA0" x="1" y="0" width="14" height="5" />
		} else if ( tab === 2 ) {
			mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="1" y="1" width="9.5" height="14" rx="1" />
			extraShape = <rect fill="#F9CDA0" x="11" y="1" width="5" height="14" />
		} else if ( tab === 3 ) {
			mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="1" y="1" width="14" height="9.5" rx="1" />
			extraShape = <rect fill="#F9CDA0" x="1" y="11" width="14" height="5" />
		} else if ( tab === 4 ) {
			mainShape = <rect stroke="#000" strokeWidth=".6" fill="none" x="5.5" y="1" width="9.5" height="14" rx="1" />
			extraShape = <rect fill="#F9CDA0" x="0" y="1" width="5" height="14" />
		}
	}

	return (
		<svg width="16px" height="16px" viewBox="0 0 16 16" style={{ pointerEvents: 'bounding-box' }} >
			{ mainShape }
			{ extraShape }
		</svg>
	)
}

export default LengthIcon
