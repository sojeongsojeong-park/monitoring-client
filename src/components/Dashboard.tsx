import dayjs from 'dayjs';
import { Status, type Data, type ServerData } from '../types/types';
import Box from './ui/Box';
import RegionCard from './ui/RegionCard';
import { useState } from 'react';
import Modal from './ui/Modal';

interface DashboardProps {
	data: Data;
}

const Dashboard = ({ data }: DashboardProps) => {
	const [isModalOpen, setIsModalOpen] = useState<ServerData | null>(null);
	const servers = data.data;

	return (
		<>
			<div className='flex flex-col items-center w-full gap-4 mx-8'>
				<Box className='py-2'>
					<div className='text-sm'>HEALTH CHECK</div>
					<div>{data.status === Status.ok ? '🟢' : '🔴'}</div>
				</Box>
				<p>UPDATE AT: {dayjs(data.update_at).format('YYYY.MM.DD HH:mm')}</p>
				{data.server_issue && (
					<p className='text-2xl text-center text-red-500'>
						{data.server_issue}
					</p>
				)}
				<div className='grid gap-4 grid-col-1 sm:grid-cols-2 sm:grid-rows-3'>
					{servers.map((server, idx) =>
						server.status == Status.ok ? (
							<RegionCard
								key={`${idx}-${server.region}`}
								server={server}
								handleModalOpen={() => setIsModalOpen(server)}
							/>
						) : (
							<Box
								className='justify-center py-4 text-center shadow-red-300'
								key={idx}>
								❌ {server.data}
							</Box>
						)
					)}
				</div>
			</div>

			{isModalOpen && (
				<Modal onClose={() => setIsModalOpen(null)} data={isModalOpen} />
			)}
		</>
	);
};

export default Dashboard;
