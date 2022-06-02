import { Component } from "react";

import './AddTaskInput.scss';

export default class AddTaskInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            taskName: '',
            complete: false
        }
    }

    addNewTask = (e) => {
        if(e.code == 'Enter' && this.state.taskName !== ''){
            this.props.addTask(this.state.complete, this.state.taskName);
            this.setState(()=> ({
                taskName: '',
                complete: false,
            }))
        }
    }

    componentDidMount(){
        window.addEventListener('keyup', this.addNewTask)
    }

    componentWillUnmount(){
        window.removeEventListener('keyup', this.addNewTask)
    }

    onChangeCheckbox = () => {
        this.setState({
            complete: !this.state.complete
        })
    }

    onInputValue = (e) => {
        this.setState({
            taskName: e.target.value
        })
    }

    render(){
        return(
            <form action="#"
            onSubmit={(e) => e.preventDefault()}
            >
                <input 
                    type='checkbox' 
                    name='input-checkbox' 
                    id="task-check"
                    defaultChecked={this.state.complete}/> 
                
                <div className="checkbox-label">
                    <label htmlFor="task-check"
                    onClick={this.onChangeCheckbox}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                            <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
                        </svg>
                    </label>
                </div>
                <input type='text' 
                name='task-input' 
                placeholder='Create a new todo…'
                value={this.state.taskName}
                onChange={this.onInputValue}
                />
            </form>
        )
    }
}
