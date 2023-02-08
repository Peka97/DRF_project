import React from 'react';
import axios from 'react';

// import logo from './logo.svg';
import './App.css';
// import MenuList from './components/Menu';
import UserList from './components/User.js';
// import FooterList from './components/Footer';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        // const menu = [{
        //     'Point1': 1,
        //     'Point2': 2,
        // },]
        // const users = [{
        //     'first_name': 'Иван',
        //     'last_name': 'Карасёв',
        //     'email': 'vk@yandex.ru',
        // },]
        // this.setState(
        //     {
        //         'users': users,
        //         'menu': menu,
        //     }
        // )

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                {/* <MenuList menu={this.state.menu} /> */}
                <UserList users={this.state.users} />
                {/* <FooterList menu={this.state.menu} /> */}
            </div>
        )
    }
}


export default App;
