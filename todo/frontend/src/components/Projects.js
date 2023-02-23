import React from "react";


const ProjectItem = ({ project }) => {
    let user_id = String(project.user).slice(31).replace(/[^0-9]/g, '')
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.repo_link}</td>
            <td>{user_id}</td>
        </tr>
    )
}

const ProjectsList = ({ projects }) => {
    return (
        <table>
            <th>Name</th>
            <th>Repo Link</th>
            <th>User ID</th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectsList;