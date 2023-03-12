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


class App extends React.Component {
    constructor(props) {
        super(props);
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
        headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:3000'

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
            'Content-Type': 'application/json'
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
                        <Route exact path="/projects" component={() => <ProjectsList projects={this.state.projects} />} />
                        <Redirect from="/users" to="/"></Redirect>
                        <Route exact path="/TODO" component={() => <ToDoList todos={this.state.todos} />} />
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
