import React from 'react';
import './Table.css';

const table = ({ data, activeColumn, updateData }) => {
	const columnHandler = columnIndex => {
		activeColumn === columnIndex
			? updateData({ activeColumn: -1 })
			: updateData({ activeColumn: columnIndex });
	};

	return (
		<table>
			<tbody>
				{data.map((obj, index) => {
					return (
						<tr key={obj.id}>
							{Object.values(obj).map((item, i) => {
								return (
									<td
										key={i}
										className={activeColumn === i ? 'selected' : ''}
										onClick={() => {
											columnHandler(i);
										}}
									>
										{item}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default table;
