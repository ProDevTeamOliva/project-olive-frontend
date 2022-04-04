export default function listenForOutsideClicks(
	listening,
	setListening,
	searchBarRef,
	setIsOpen
) {
	return () => {
		if (listening) return;
		if (!searchBarRef.current) return;
		setListening(true);
		['click', 'touchstart'].forEach(() => {
			document.addEventListener('click', (evt) => {
				const cur = searchBarRef.current;
				const node = evt.target;
				if (cur && cur.contains(node)) return;
				setIsOpen(false);
			});
		});
	};
}