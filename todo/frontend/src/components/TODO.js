import React from "react";


const ToDoItem = ({ todo, deleteTODO }) => {
    let is_active = undefined
    if (todo.is_active) {
        is_active = '+'
    } else {
        is_active = '-'
    }
    let project_id = String(todo.project).slice(31).replace(/[^0-9]/g, '')
    let user_id = String(todo.user).slice(31).replace(/[^0-9]/g, '')

    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.create_on}</td>
            <td>{is_active}</td>
            <td>{project_id}</td>
            <td>{user_id}</td>
            <td>
                <a href="http://localhost:3000/TODO/create"><button>Create</button></a>
                <button type='button' onClick={() => deleteTODO(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({ todos, deleteTODO }) => {
    return (
        <table>
            <th>Text</th>
            <th>Create On</th>
            <th>Is Active</th>
            <th>Project ID</th>
            <th>User ID</th>
            {todos.map((todo) => <ToDoItem todo={todo} deleteTODO={deleteTODO} />)}
        </table>
    )
}


export default ToDoList;