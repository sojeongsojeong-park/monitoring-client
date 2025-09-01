import { twMerge } from 'tailwind-merge';

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
}

const Label = ({ children, className }: LabelProps) => {
	return (
		<div className={twMerge('px-1 py-0.5 rounded-sm text-sm', className)}>
			{children}
		</div>
	);
};

export default Label;
