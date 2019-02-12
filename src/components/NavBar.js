import React from 'react'
import DesktopContainer from '../containers/DesktopContainer'
import MobileContainer from "../containers/MobileContainer";

class NavBar extends React.Component {

    state ={
        user: {},
        countryCode: {},
        message: ''
    };


    componentDidMount() {
      let token = localStorage.getItem("jwt");
      if (token) {
        fetch("http://localhost:3000/api/v1/profile", {
          headers: {
            "content-type": "application/json",
            'Accepts': "application/json",
            'Authorization': `Bearer ${token}`
     }
   })
        .then(resp => resp.json())
        .then(data =>
          data.message ? alert(`Must Log In`) : this.setState({ user: data.user })
        );
      }

        fetch('https://geoip-db.com/json/')
            .then(res => res.json())
            .then(data => this.setState({countryCode: data.country_code}))
    }

    createUser = (e, userObj) => {
        const { name, email, password } = userObj
        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ name, email, password, country_code: this.state.countryCode })
        })
            .then(resp => resp.json())
            .then(this.setUserData)
    };

    setUserData = (data) => {
        if(data.message) {
            this.setState({message: data.message})
        } else {
            this.setState({user: data.user, message: ''});
            localStorage.setItem('jwt', data.jwt);
        }
    }

    loginUser = userObj => {
        const { email, password } = userObj
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({ user: { email, password } })
        })
            .then(resp => resp.json())
            .then(this.setUserData)
    };

    logout = () => {
        localStorage.removeItem('jwt')
        this.setState({user: {}})
    }

    render() {
        return (
            <div>
                <DesktopContainer message={this.state.message} user={this.state.user} createUser={this.createUser} loginUser={this.loginUser} logoutUser={this.logout}>{this.props.children}</DesktopContainer>
                <MobileContainer message={this.state.message} user={this.state.user} createUser={this.createUser} loginUser={this.loginUser} logoutUser={this.logout}>{this.props.children}</MobileContainer>
            </div>
        )
    }
}

export default NavBar
