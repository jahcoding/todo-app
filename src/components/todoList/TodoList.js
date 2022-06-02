import { Component } from "react";
import TodoListItem from "../todoListItem/TodoListItem";

import './TodoList.scss';

export default class TodoList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {todoData, onChangeComplete, deleteTask} = this.props;
        const tasks = todoData.map(task => {
            const {id, taskName, complete} = task

            return(
                <TodoListItem 
                key={id} 
                id={id} 
                taskName={taskName} 
                complete={complete}
                onChangeComplete={() => onChangeComplete(id)}
                deleteTask={() => deleteTask(id)}
                />
            )
        }).reverse()
        return(
            <ul className="todo__list__wrapper">
                {tasks}
            </ul>
        )
    }
}




 



