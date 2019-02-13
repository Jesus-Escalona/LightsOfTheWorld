import React, { Fragment } from 'react'
import {Button, Container, Image, Label, Segment, Menu} from "semantic-ui-react";
import Login from '../components/Login'
import Signup from '../components/Signup'
import {NavLink} from "react-router-dom";

class NavBar extends React.Component {

    state = {

    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { fixed } = this.state
        const userExists = Object.keys(this.props.user).length > 0

        return (
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
                        {
                            userExists ?
                                <Menu.Item position='right'>
                                    <Label
                                        color='black'
                                        size='big'
                                        content={<NavLink to="/profile">{`Welcome back, ${this.props.user.data.attributes.name}`}</NavLink>}
                                        image={{avatar: true, spaced: 'right', src: require('../assets/images/avatar.png')}}
                                    />
                                    <Button icon='sign-out' floated='right' label='Logout' labelPosition='left' onClick={this.props.logout} />
                                </Menu.Item>
                                :
                                <Fragment>
                                    <Menu.Item position='right'>
                                        <Login message={this.props.message} submitHandler={this.props.loginUser}/>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Signup message={this.props.message} submitHandler={this.props.createUser} />
                                    </Menu.Item>
                                </Fragment>
                        }

                    </Container>
                </Menu>
            </Segment>
        )
    }
}

export default NavBar
