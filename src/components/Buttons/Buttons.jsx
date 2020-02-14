import React from 'react';
import './Buttons.css';

const Buttons = ({ child, activeColumn, columnSort }) => {
	return (
		<div className="buttons">
			{child.map(ch => {
				return (
					<button key={ch} onClick={() => columnSort(activeColumn, ch)}>
						{ch}
					</button>
				);
			})}
		</div>
	);
};

export default Buttons;
