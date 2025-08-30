import type { Data } from '../types/types';
import Box from './ui/Box';

interface DashboardProps {
	data?: Data;
}

const Dashboard = ({ data }: DashboardProps) => {
	if (!data) {
		return <p className='text-gray-500'>Waiting for data...</p>;
	}

	if (data.status !== 'ok') {
		return <p className='text-red-500'>Error: {data.status}</p>;
	}

	const server = data.data;

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4'>
				<Box>
					<div className='text-sm'>
						HEALTH <br />
						CHECK
					</div>
					<div>{data.status === 'ok' ? '🟢' : '🔴'}</div>
				</Box>
				<div>
					<div> VERSION: {server.version}</div>
					<div> UPDATE AT: </div>
				</div>
			</div>
			{server.server_issue && (
				<p className='text-2xl text-center text-red-500'>
					{server.server_issue}
				</p>
			)}
			<div>
				<Box className='flex-col gap-2'>
					<div className='text-center'>{server.region}</div>
					<div>
						{server.roles.map((role) => (
							<span
								key={role}
								className='px-2 py-1 text-xs bg-gray-100 rounded'>
								{role}
							</span>
						))}
					</div>
					<div className='flex items-center gap-2'>
						<span>Redis: {server.results.services.redis ? '🟢' : '🔴'}</span>
						<span>
							Database: {server.results.services.database ? '🟢' : '🔴'}
						</span>
					</div>
				</Box>
			</div>
		</div>
	);
};

export default Dashboard;
