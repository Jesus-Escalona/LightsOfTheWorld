import {Menu, Button, Container, Responsive, Segment, Visibility, Image, Form, Header, Modal, Icon, Label} from "semantic-ui-react";
import React, {Component} from "react";
import Login from '../components/Login'
import Signup from '../components/Signup'

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


export default class DesktopContainer extends Component {

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
    let username = userObj.username;
    let password = userObj.password;
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({ user: { username: username, password: password } })
    })
      .then(resp => resp.json())
      .then(data => console.log("login response data", data))
    }


    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 100, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item as='a'>
                                    <Image src={require('../assets/images/logo.png')} size='mini'/>
                                </Menu.Item>
                                <Menu.Item as='h2' active>
                                    Emotional State
                                </Menu.Item>
  {/*----------------------------LOGIN and SIGNUP HERE----------------------------------- */}
                                <Menu.Item position='right'>
                                <Login submitHandler={this.loginUser}/>
                                </Menu.Item><Menu.Item>
                                <Signup submitHandler={this.createUser} />
                                </Menu.Item>

                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}
