import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

// import logo from './logo.svg';
import './App.css';
import MenuList from './components/Menu.js';
import UserList from './components/User.js';
import ProjectsList from './components/Projects';
import ToDoList from './components/TODO';
import FooterList from './components/Footer.js';
import LoginForm from './components/Auth';
import NotFound404 from './components/PageNotFound404';
import ProjectForm from './components/ProjectForm';
import TODOForm from './components/TODOForm';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.filter = ''
        this.state = {
            'menu': [{
                'main': 'Главное',
                'contacts': 'Контакты',
            }],
            'users': [],
            'projects': [],
            'todos': [],
            'footer': [{
                'for_users': 'Для пользователей',
                'about': 'О нас',
            }],
            'token': '',
        }
    }

    load_data() {
        const headers = this.get_headers()
        axios.get(
            'http://127.0.0.1:8000/api/users/', { headers }
        ).then(response => {
            this.setState({ 'users': response.data.results })
        }).catch(error => console.log(error))


        axios.get(
            'http://127.0.0.1:8000/api/projects/', { headers }
        ).then(response => {
            this.setState({ 'projects': response.data.results })
        }).catch(error => console.log(error))


        axios.get(
            'http://127.0.0.1:8000/api/TODO/', { headers }
        ).then(response => {
            this.setState({ 'todos': response.data.results })
        }).catch(error => console.log(error))
    };

    get_token(username, password) {
        axios.post(
            'http://127.0.0.1:8000/api-token-auth/',
            {
                username: username,
                password: password
            }
        ).then(response => {
            this.set_token(response.data['token'])
            console.log(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({ 'token': token }, () => this.load_data())
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({ 'token': token }, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1',
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    createProject(name, repo_link, user_id) {
        const headers = this.get_headers()
        const data = { name: name, repo_link: repo_link, user: user_id }
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, { headers })
            .then(response => {
                let new_project = response.data
                const user_id = this.state.users.filter((item) => item.id ===
                    new_project.user_id)[0]
                new_project.user_id = user_id
                this.setState({ projects: [...this.state.projects, new_project] })
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, { headers })
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }

    createTODO(text, project, user_id) {
        const headers = this.get_headers()
        const data = { text: text, project: project, user: user_id }
        axios.post(`http://127.0.0.1:8000/api/TODO/`, data, { headers })
            .then(response => {
                let new_TODO = response.data
                const user_id = this.state.users.filter((item) => item.id ===
                    new_TODO.user_id)[0]
                new_TODO.user_id = user_id
                this.setState({ todos: [...this.state.todos, new_TODO] })
            }).catch(error => console.log(error))
    }

    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/TODO/${id}/`, { headers })
            .then(response => {
                this.setState({
                    todos: this.state.todos.filter((item) => item.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
    };

    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav ><MenuList menu={this.state.menu} /></nav>
                    <nav>
                        <ul >
                            <li>
                                <Link to='/' >Users</Link>
                            </li>
                            <li>
                                <Link to='/projects' >Projects</Link>
                            </li>
                            <li>
                                <Link to='/TODO' >TODO</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Log out</button> :
                                    <Link to='/login'>Log in</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={() => <UserList users={this.state.users} />} />
                        <Route exact path="/projects" component={() => <ProjectsList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            createProject={(name, repo_link, user) => this.createProject(name, repo_link, user)} />} />
                        <Redirect from="/users" to="/"></Redirect>
                        <Route exact path="/TODO" component={() => <ToDoList todos={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} />
                        <Route exact path='/TODO/create' component={() => <TODOForm
                            createTODO={(text, project, user) => this.createTODO(text, project, user)} />} />
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route component={NotFound404} />
                    </Switch>
                    <nav><FooterList footers={this.state.footer} /></nav>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
