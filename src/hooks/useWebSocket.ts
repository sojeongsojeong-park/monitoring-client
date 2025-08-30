import { useEffect, useState } from 'react';
import type { Data } from '../types/types';

const useWebSocket = (url: string) => {
	const [data, setData] = useState<Data>();

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => console.log('✅ Connected to server');
		ws.onmessage = (event) => {
			try {
				const parsed = JSON.parse(event.data);
				setData(parsed);
			} catch (e) {
				console.error('Failed to parse:', e);
			}
		};
		ws.onerror = (err) => console.error('❌ WebSocket error:', err);

		return () => ws.close();
	}, [url]);

	return data;
};

export default useWebSocket;
