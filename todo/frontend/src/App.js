import React from 'react';
import axios from 'axios';

// import logo from './logo.svg';
import './App.css';
import MenuList from './components/Menu.js';
import UserList from './components/User.js';
import FooterList from './components/Footer.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [],
            'users': [],
            'footer': [],
        }
    }

    componentDidMount() {

        // Данные из переменной
        // const users = [
        //     {
        //         'first_name': 'Иван',
        //         'last_name': 'Карасёв',
        //         'email': 'vk@mail.ru'
        //     },
        //     {
        //         'first_name': 'Кирилл',
        //         'last_name': 'Захаренко',
        //         'email': 'fdsatrew@mail.ru'
        //     },
        // ]

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
                // 'users': users,
                'menu': menu,
                'footer': footer,
            }
        )


        // Данные с сервера (не подгружаются, пишет ошибку)
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users,
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <div><MenuList menu={this.state.menu} /></div>
                <hr></hr>
                <div><UserList users={this.state.users} /></div>
                <hr></hr>
                <div><FooterList footers={this.state.footer} /></div>
            </div >
        )
    }
}


export default App;
