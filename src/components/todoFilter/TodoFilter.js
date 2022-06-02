import { Component } from "react";

import './TodoFilter.scss';


export default class TodoFilter extends Component{
    constructor(props){
        super(props)
        this.state = {
            filterList: [
                {id: 1,name: 'All'},
                {id: 2,name: 'Active'},
                {id: 3,name: 'Completed'}
            ]
        }
    }

    render(){
        const {onFilterSelect, filter} = this.props
        const filterLists = this.state.filterList.map(list => {
            const {name, id} = list;
            const active = filter === name
            const clazz = active ? 
            'todo__filter__item todo__filter__item_active' : 'todo__filter__item';
            return(
                <li
                key={id}
                className={clazz} 
                data-name={name}
                onClick={() => onFilterSelect(name)}>
                    {name}
                </li>
            )
        })

        return(
            <ul className="todo__filter">
                {filterLists}
            </ul>
        )
    }
}