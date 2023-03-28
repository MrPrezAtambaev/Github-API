import { useEffect, useState } from "react";

export function useDebaunce(value: string, delay = 300): string {
	const [debaunced, setDebaunced] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebaunced(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debaunced;
}
