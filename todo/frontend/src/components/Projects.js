import React from "react";
// import App from "../App";



const ProjectItem = ({ project, deleteProject }) => {
    let user_id = String(project.user).slice(31).replace(/[^0-9]/g, '')
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo_link}</td>
            <td>{user_id}</td>
            <td>
                <a href="http://localhost:3000/projects/create"><button>Create</button></a>
                <button type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const handleChange = (event) => {
    console.log(event.target.value)
}

const ProjectsList = ({ projects, deleteProject }) => {
    return (
        <div>
            <form onChange={(event) => handleChange(event)}>Поиск
                <input placeholder="Введите название проекта"></input>
            </form>

            <table>
                <th>ID</th>
                <th>Name</th>
                <th>Repo Link</th>
                <th>User ID</th>
                <th>Actions</th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
        </div>
    )

}


export default ProjectsList