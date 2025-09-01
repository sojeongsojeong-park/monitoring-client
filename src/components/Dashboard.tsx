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
		<div className='flex flex-col w-full gap-4 mx-8'>
			<div className='flex justify-center gap-4'>
				<Box>
					<div className='text-sm'>
						HEALTH <br />
						CHECK
					</div>
					<div>{data.status === Status.ok ? '🟢' : '🔴'}</div>
				</Box>
				<div>
					<div> UPDATE AT: {data.update_at.toLocaleString()}</div>
				</div>
			</div>

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
