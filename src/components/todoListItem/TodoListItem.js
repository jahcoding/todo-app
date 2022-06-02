import { Component } from "react";

import './TodoListItem.scss';


export default class TodoListItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            complete: false
        }
    }


    render(){
        const {id, taskName, onChangeComplete, deleteTask, complete} = this.props

        return(
            <li className="todo__list__item checked">
                <input type='checkbox' name='input-checkbox' id={`task${id}`} defaultChecked={complete}/>
                <div 
                className="checkbox-label">
                    <label 
                    htmlFor={`task${id}`}
                    onClick={onChangeComplete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                            <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
                        </svg>
                    </label>
                </div>
                <span>{taskName}</span>
                <div className="cross" 
                onClick={deleteTask}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                        <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                    </svg>
                </div>
            </li>
        )
    }
}