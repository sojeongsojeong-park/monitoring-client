import dayjs from 'dayjs';
import { Status, type Data } from '../types/types';
import Box from './ui/Box';
import RegionCard from './ui/RegionCard';

interface DashboardProps {
	data: Data;
}

const Dashboard = ({ data }: DashboardProps) => {
	console.log(data);
	const servers = data.data;

	return (
		<div className='flex flex-col items-center w-full gap-4 mx-8'>
			<Box className='py-2'>
				<div className='text-sm'>HEALTH CHECK</div>
				<div>{data.status === Status.ok ? '🟢' : '🔴'}</div>
			</Box>
			<p>UPDATE AT: {dayjs(data.update_at).format('YYYY.MM.DD HH:mm')}</p>

			{data.server_issue && (
				<p className='text-2xl text-center text-red-500'>{data.server_issue}</p>
			)}
			<div className='grid gap-4 grid-col-1 sm:grid-cols-2 sm:grid-rows-3'>
				{servers.map((server) =>
					server.status == Status.ok ? (
						<RegionCard key={server.region} {...server} />
					) : (
						<Box className='justify-center py-4 text-center shadow-red-300'>
							❌ {server.error}
						</Box>
					)
				)}
			</div>
		</div>
	);
};

export default Dashboard;
