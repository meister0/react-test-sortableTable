import React, { Component } from 'react';
import './App.css';
import Table from './Table/Table';
import Buttons from './Buttons/Buttons';
import DataSearch from './DataSearch/DataSearch';

class App extends Component {
	state = {
		info: [
			{ id: 1, name: 'Вася', date: '15.06.2018', count: 11 },
			{ id: 2, name: 'Петя', date: '23.11.2018', count: 23 },
			{ id: 3, name: 'Иван', date: '12 марта 2017', count: 3 },
			{ id: 4, name: 'Александр', date: '20/12/2010', count: 1 },
			{ id: 5, name: 'Евгений', date: '12.09.2018', count: 112 },
			{ id: 6, name: 'Мария', date: '1.08.2016', count: 122 },
			{ id: 7, name: 'Анастасия', date: '20.11.2018', count: 34 },
			{ id: 8, name: 'Степан', date: '12.11.2019', count: 10 }
		],
		activeColumn: -1,
		sortType: ['Asc', 'Desc', 'Def']
	};

	month = {
		января: '01',
		февраля: '02',
		марта: '03',
		апреля: '04',
		мая: '05',
		июня: '06',
		июля: '07',
		августа: '08',
		сентября: '09',
		октября: '10',
		ноября: '11',
		декабря: '12'
	};

	copiedInfo = JSON.parse(JSON.stringify(this.state.info));

	updateData(config) {
		this.setState(config);
	}

	dateFormat = data => {
		const copiedData = [...data].map(date => {
			date = date.replace(/\//g, '.');
			let searchedDate = date.match('[а-яА-Я]+');
			if (searchedDate) {
				for (let key in this.month) {
					if (searchedDate[0] === key) {
						date = date.replace(/ ?[а-яА-Я]+ ?/, '.' + this.month[key] + '.');
					}
				}
			}
			date = date
				.split('.')
				.reverse()
				.join('.');
			return date;
		});
		return copiedData;
	};

	dateSort = (data, direction) => {
		const arrOfDates = this.dateFormat(data);
		if (arrOfDates[0] === arrOfDates[1]) return 0;
		return arrOfDates[0] > arrOfDates[1] ? direction : direction * -1;
	};

	columnSort = (columnIndex, sortType) => {
		const data = this.state.info;
		let columnName =
			columnIndex === 0
				? 'id'
				: columnIndex === 1
				? 'name'
				: columnIndex === 2
				? 'date'
				: 'count';
		let direction = sortType === 'Asc' ? 1 : sortType === 'Desc' ? -1 : '';
		if (direction === '') {
			columnName = 'id';
			direction = 1;
		}

		if (columnIndex === -1 && (sortType === 'Asc' || sortType === 'Desc')) {
			alert('Выбери столбец:)');
		} else {
			const sorted = [].slice.call(data).sort((a, b) => {
				if (columnName === 'date') {
					return this.dateSort([a[columnName], b[columnName]], direction);
				} else {
					if (a[columnName] === b[columnName]) return 0;
					return a[columnName] > b[columnName] ? direction : direction * -1;
				}
			});
			this.updateData({ info: sorted, activeColumn: -1 });
		}
	};

	render() {
		const state = this.state;
		return (
			<div className="App">
				<Buttons
					child={state.sortType}
					activeColumn={state.activeColumn}
					columnSort={this.columnSort}
				/>
				<Table
					data={state.info}
					activeColumn={state.activeColumn}
					updateData={this.updateData.bind(this)}
				/>
				<DataSearch
					data={this.copiedInfo}
					columnIndex={state.activeColumn}
					updateData={this.updateData.bind(this)}
				/>
				<span>
					Asc - ascension <br />
					Desc - descension <br />
					Def - default
				</span>
			</div>
		);
	}
}

export default App;
