import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import MenuList from './components/Menu.js';
import UserList from './components/User.js';
import ProjectsList from './components/Projects';
import ToDoList from './components/TODO';
import FooterList from './components/Footer.js';
import NotFound404 from './components/PageNotFound404';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [],
            'users': [],
            'projects': [],
            'todos': [],
            'footer': [],
        }
    }

    componentDidMount() {
        const menu = [{
            'main': 'Главное',
            'contacts': 'Контакты',
        }]

        const footer = [{
            'for_users': 'Для пользователей',
            'about': 'О нас',
        }]

        this.setState(
            {
                'menu': menu,
                'footer': footer,
            }
        )


        axios.get('http://127.0.0.1:8000/api/users/', {
            headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' }
        }).then(response => {
            this.setState({ 'users': response.data.results })
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/projects/', {
            headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' }
        }).then(response => {
            this.setState({ 'projects': response.data.results })
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/TODO/', {
            headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' }
        }).then(response => {
            this.setState({ 'todos': response.data.results })
        }).catch(error => console.log(error))
    }


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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={() => <UserList users={this.state.users} />} />
                        <Route exact path="/projects" component={() => <ProjectsList projects={this.state.projects} />} />
                        <Redirect from="/users" to="/"></Redirect>
                        <Route exact path="/TODO" component={() => <ToDoList todos={this.state.todos} />} />
                        <Route component={NotFound404} />
                    </Switch>
                    <nav><FooterList footers={this.state.footer} /></nav>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
