import { useEffect, useRef, useState } from 'react';
import { Status, type Data } from '../types/types';

interface SuccessWebsocketData {
	status: Status.ok;
	data: Data;
}

interface ErrorWebsocketData {
	status: Status.error | Status.reconnecting | Status.loading;
	data: string;
}
type WebsocketData = SuccessWebsocketData | ErrorWebsocketData;

const useWebSocket = (url: string) => {
	const [data, setData] = useState<WebsocketData>();
	const reconnectAttempts = useRef(0);
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		let isMounted = true;

		const connect = () => {
			if (!isMounted) return;
			const ws = new WebSocket(url);
			wsRef.current = ws;

			ws.onopen = () => {
				setData({ status: Status.loading, data: 'Loading...' });
				reconnectAttempts.current = 0;
			};

			ws.onmessage = (event) => {
				try {
					const parsed = JSON.parse(event.data);
					setData({ status: Status.ok, data: parsed });
				} catch (e) {
					console.error('Failed to parse:', e);
				}
			};

			ws.onerror = (err) => {
				console.error('❌ WebSocket error:', err);
				setData({ status: Status.error, data: '❌ WebSocket error' });
			};

			ws.onclose = () => {
				reconnect();
			};
		};

		const reconnect = () => {
			if (!isMounted) return;

			const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
			setData({
				status: Status.reconnecting,
				data: `🔄 Attempting to reconnect in ${timeout / 1000}s...`,
			});
			reconnectAttempts.current += 1;

			setTimeout(() => {
				connect();
			}, timeout);
		};

		connect();

		return () => {
			isMounted = false;
			wsRef.current?.close();
		};
	}, [url]);

	return data;
};

export default useWebSocket;
