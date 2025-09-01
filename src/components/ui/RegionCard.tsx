import type { ServerData } from '../../types/types';
import Box from './Box';
import Label from './Label';

const RegionCard = (server: ServerData) => {
	const stats = server.results.stats;
	const displayData = [
		{ id: 0, title: '👤 online', data: stats.online },
		{
			id: 1,
			title: '🔗 active \n connections',
			data: stats.server.active_connections,
		},
		{ id: 2, title: '🖥️ session', data: stats.session },
		{ id: 3, title: '💻 cpu', data: stats.server.cpus },
		{ id: 4, title: '⏳ wait time', data: stats.server.wait_time },
		{ id: 5, title: '⏰ timers', data: stats.server.timers },
	];
	return (
		<Box className='flex-col gap-6 py-4 cursor-pointer' key={server.region}>
			<div className='flex gap-4'>
				<span className='text-lg font-bold text-center'>{server.region}</span>

				<div>
					{server.results.services.redis && server.results.services.database ? (
						<Label className='bg-[#d4f5da]'>healthy services</Label>
					) : !server.results.services.redis ? (
						<Label className='bg-[#fef4f2]'>unhealthy redis</Label>
					) : (
						<Label className='bg-[#fef4f2]'>unhealthy database</Label>
					)}
				</div>
			</div>

			<div className='grid items-start grid-cols-3 gap-4'>
				{displayData.map((data) => (
					<div key={data.id} className='flex flex-col items-center h-full'>
						<span className='text-2xl font-bold'>{data.data}</span>
						<span className='mt-auto text-sm text-center whitespace-pre'>
							{data.title}
						</span>
					</div>
				))}
			</div>

			<div className='w-3/4'>
				<p className='mb-2 text-lg font-bold'>CPU Load</p>
				<div className='w-full h-4 overflow-hidden bg-gray-200 rounded-full'>
					<div
						className={`
        h-4 rounded-full 
        ${
					stats.server.cpu_load < 0.7
						? 'bg-green-500'
						: stats.server.cpu_load < 0.9
						? 'bg-yellow-500'
						: 'bg-red-500'
				}
      `}
						style={{ width: `${stats.server.cpu_load * 100}%` }}></div>
				</div>
				<p className='mt-1 text-sm text-gray-600'>
					{(stats.server.cpu_load * 100).toFixed(0)}%
				</p>
			</div>

			<p className='text-sm text-gray-500'>version: {server.version}</p>
		</Box>
	);
};

export default RegionCard;
