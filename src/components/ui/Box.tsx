import { twMerge } from 'tailwind-merge';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const Box = ({ children, className, onClick }: BoxProps) => {
	return (
		<div
			className={twMerge(
				'flex items-center gap-4 px-3 py-1 bg-white rounded-md shadow',
				className
			)}
			onClick={onClick}>
			{children}
		</div>
	);
};

export default Box;
