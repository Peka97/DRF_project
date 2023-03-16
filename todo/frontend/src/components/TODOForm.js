import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', project: 0, user: 0 }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">TODO text</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">Project Name</label>
                    <input type="text" className="form-control" name="project"
                        value={this.state.project} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="user_id">User ID</label>
                    <input type="number" className="form-control" name="user"
                        value={this.state.user} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Создать" />
            </form>
        );
    }
}


export default TODOForm


