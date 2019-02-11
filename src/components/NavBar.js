import React from 'react'
import DesktopContainer from '../containers/DesktopContainer'
import MobileContainer from "../containers/MobileContainer";

class NavBar extends React.Component {

    state ={
        user: {}
    }

    createUser = (e, userObj) => {
        let username = userObj.username;
        let password = userObj.password;
        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ user: { username: username, password: password } })
        })
            .then(resp => resp.json())
            .then(data => console.log("create user", data))
    };


    loginUser = userObj => {
        const { email, password } = userObj
        console.log(userObj)
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ user: { email, password } })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({user: data.user});
                localStorage.setItem('jwt', data.jwt);
            })
    };

    render() {
        return (
            <div>
                <DesktopContainer createUser={this.createUser} loginUser={this.loginUser}>{this.props.children}</DesktopContainer>
                <MobileContainer createUser={this.createUser} loginUser={this.loginUser}>{this.props.children}</MobileContainer>
            </div>
        )
    }
}

export default NavBar