import React from 'react';
import './DataSearch.css';

const dataSearch = ({ data, columnIndex, updateData }) => {
	let columnName =
		columnIndex === 0
			? 'id'
			: columnIndex === 1
			? 'name'
			: columnIndex === 2
			? 'date'
			: 'count';

	const search = e => {
		const value = e.target.value.toLowerCase();
		if (columnIndex === -1) {
			e.target.value = '';
			alert('Выбери столбец:)');
		} else {
			const filter = data.filter(obj => {
				return obj[columnName]
					.toString()
					.toLowerCase()
					.includes(value);
			});
			updateData({
				info: filter
			});
		}
	};

	return <input type="text" onChange={search} placeholder="Text smthg.." />;
};

export default dataSearch;
