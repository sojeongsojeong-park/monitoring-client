import Dashboard from './components/Dashboard';
import Header from './components/Header';
import useWebSocket from './hooks/useWebSocket';

function App() {
	const data = useWebSocket(
		import.meta.env.VITE_WS_URL || 'ws://localhost:4000'
	);

	return (
		<div className='w-full bg-gray-50'>
			<Header />
			<main className='flex items-center justify-center min-h-screen pt-12'>
				<Dashboard data={data} />
			</main>
		</div>
	);
}

export default App;
