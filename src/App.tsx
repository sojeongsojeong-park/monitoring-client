import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Loading from './components/ui/Loading';
import useWebSocket from './hooks/useWebSocket';
import { Status } from './types/types';

function App() {
	const data = useWebSocket(
		import.meta.env.VITE_WS_URL || 'ws://localhost:8080'
	);

	return (
		<div className='w-full bg-gray-50'>
			<Header />
			<main className='flex justify-center min-h-screen pt-24'>
				{!data ? (
					<Loading />
				) : data.status === Status.ok ? (
					<Dashboard data={data.data} />
				) : data.status === Status.loading ? (
					<Loading />
				) : data.status === Status.reconnecting ? (
					<p className='flex items-center'>🔄 reconnecting...</p>
				) : (
					<p className='text-red-500'>Error: {data.data}</p>
				)}
			</main>
		</div>
	);
}

export default App;
