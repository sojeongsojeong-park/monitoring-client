import {
	Status,
	type BlockedKey,
	type ServerData,
	type TopKey,
} from '../../types/types';
import Label from './Label';

interface IModalProps {
	data: ServerData;
	onClose: () => void;
}

const Modal = ({ data, onClose }: IModalProps) => {
	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60'
			onClick={onClose}>
			<div
				className='p-6 overflow-y-auto bg-white rounded-lg shadow-lg max-w-4/5 max-h-4/5'
				onClick={(e) => e.stopPropagation()}>
				<h2 className='mb-4 text-xl font-bold text-center'>
					{data.status === Status.ok ? '🟢' : '🔴'}&nbsp;
					{data.region}
				</h2>
				<div className='flex flex-col items-center gap-4'>
					<div className='flex gap-4'>
						<Label
							className={
								data.results.services.database ? 'bg-[#d4f5da]' : 'bg-[#fef4f2]'
							}>
							database
						</Label>
						<Label
							className={
								data.results.services.redis ? 'bg-[#d4f5da]' : 'bg-[#fef4f2]'
							}>
							redis
						</Label>
					</div>
					{data.server_issue && (
						<p className='text-red-500'>{data.server_issue}</p>
					)}

					<div className='px-4'>
						<span className='ml-2 text-lg font-bold'>workers</span>
						<div className='flex flex-col gap-4 mt-2'>
							{data.results.stats.server.workers.map((worker, idx) => {
								const name = worker[0];
								const stats = Object.entries(worker[1]);
								return (
									<div key={idx} className='p-4 bg-white rounded-lg shadow'>
										<h3 className='mb-2 text-lg font-bold'>{String(name)}</h3>
										{stats.map(([key, value], statIdx) =>
											key === 'recently_blocked_keys' ? (
												<div>
													<span className='font-medium'>
														recently_blocked_keys
													</span>
													<table className='min-w-full'>
														<tbody>
															{(value as BlockedKey[]).map(
																([key, count, time], idx) => (
																	<tr key={idx}>
																		<td className='px-4 py-2'>{key}</td>
																		<td className='px-4 py-2'>{count}</td>
																		<td className='px-4 py-2'>{time}</td>
																	</tr>
																)
															)}
														</tbody>
													</table>
												</div>
											) : key === 'top_keys' ? (
												<div>
													<span className='font-medium'>top_keys</span>
													<table className='min-w-full'>
														<tbody>
															{(value as TopKey[]).map(([key, time], idx) => (
																<tr key={idx}>
																	<td className='px-4 py-2'>{key}</td>
																	<td className='px-4 py-2'>{time}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											) : (
												<div key={statIdx} className='flex justify-between'>
													<span className='font-medium'>{key}</span>
													<span>{String(value)}</span>
												</div>
											)
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<button
					className=' text-white bg-[#bd4ed3] mt-4 ml-4'
					onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
