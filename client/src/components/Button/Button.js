import React from 'react';
import styles from './index.module.scss';

export default function Button(props) {
	const { label = '', onClick = () => {}, className } = props;

	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={() => onClick()}
		>
			{label}
		</button>
	);
}
