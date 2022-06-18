import { Component } from 'react'
import TodoHeader from '../todoHeader/TodoHeader'
import AddTaskInput from '../addTaskInput/AddTaskInput'
import TodoList from '../todoList/TodoList'
import TodoFilter from '../todoFilter/TodoFilter'
import Empty from '../empty/Empty'

import './App.scss'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todoData: [],
			maxId: 0,
			filter: 'All',
			darkMode: false,
		}
	}

	componentDidMount() {
		this.setState(() => ({
			todoData: JSON.parse(localStorage.getItem('todoList')) || [],
			maxId: JSON.parse(localStorage.getItem('maxId')) || 0,
		}))
	}

	componentDidUpdate() {
		localStorage.setItem('todoList', JSON.stringify(this.state.todoData))
		localStorage.setItem('maxId', JSON.stringify(this.state.maxId))
	}

	onChangeThemeMod = () => {
		this.setState(({ darkMode }) => ({
			darkMode: !darkMode,
		}))
	}

	onChangeComplete = id => {
		this.setState(({ todoData }) => ({
			todoData: todoData.map(todoItem => {
				if (todoItem.id === id) {
					return { ...todoItem, complete: !todoItem.complete }
				}
				return todoItem
			}),
		}))
	}

	onCleanCompleteTasks = () => {
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(task => !task.complete),
		}))
	}

	deleteTask = id => {
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(task => task.id !== id),
		}))
	}

	addTask = (complete, taskName) => {
		this.setState({ maxId: this.state.maxId + 1 })
		const newTask = {
			taskName,
			complete,
			id: this.state.maxId,
		}

		this.setState(({ todoData }) => ({
			todoData: [...todoData, newTask],
		}))
	}

	filterTodoList = (items, filter) => {
		switch (filter) {
			case 'Active':
				return items.filter(item => !item.complete)
			case 'Completed':
				return items.filter(item => item.complete)
			default:
				return items
		}
	}

	onFilterSelect = filter => {
		this.setState({ filter })
	}

	render() {
		const { todoData, filter, darkMode } = this.state
		const completeTasksCount = todoData.filter(task => !task.complete).length
		const filterTodaData = this.filterTodoList(todoData, filter)
		const darkModeClass = darkMode ? 'todo dark' : 'todo'

		return (
			<div className={darkModeClass}>
				<TodoHeader
					onChangeThemeMod={this.onChangeThemeMod}
					darkMode={darkMode}
				/>
				<main className='container'>
					<AddTaskInput addTask={this.addTask} />
					<section className='todo__list__container'>
						<section className='todo__list'>
							{filterTodaData.length === 0 ? (
								<Empty />
							) : (
								<TodoList
									todoData={filterTodaData}
									onChangeComplete={this.onChangeComplete}
									deleteTask={this.deleteTask}
								/>
							)}
						</section>
						<section className='todo__panel'>
							<div className='todo__counter'>
								{completeTasksCount} items left
							</div>
							<TodoFilter
								onFilterSelect={this.onFilterSelect}
								filter={filter}
							/>
							<div className='todo__clear' onClick={this.onCleanCompleteTasks}>
								Clear Completed
							</div>
						</section>
					</section>
				</main>
			</div>
		)
	}
}
