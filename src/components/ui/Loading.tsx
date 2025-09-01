import { motion, type Variants } from 'motion/react';

const Loading = () => {
	return (
		<motion.div
			animate='pulse'
			transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
			className='container'>
			<motion.div className='dot' variants={dotVariants} />
			<motion.div className='dot' variants={dotVariants} />
			<motion.div className='dot' variants={dotVariants} />
			<StyleSheet />
		</motion.div>
	);
};

const dotVariants: Variants = {
	pulse: {
		scale: [1, 1.5, 1],
		transition: {
			duration: 1.2,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
};

const StyleSheet = () => {
	return (
		<style>
			{`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }

            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #bd4ed3;
                will-change: transform;
            }
            `}
		</style>
	);
};

export default Loading;
