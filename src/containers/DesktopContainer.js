import {Menu, Button, Container, Responsive, Segment, Visibility, Image, Form, Header, Modal, Icon, Label} from "semantic-ui-react";
import React, {Component, Fragment} from "react";
import Login from '../components/Login'
import Signup from '../components/Signup'

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


export default class DesktopContainer extends Component {

    state = {

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
                                {
                                    Object.keys(this.props.user).length === 0 ?
                                        <Fragment>
                                            <Menu.Item position='right'>
                                                <Login message={this.props.message} submitHandler={this.props.loginUser}/>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Signup message={this.props.message} submitHandler={this.props.createUser} />
                                            </Menu.Item>
                                        </Fragment>
                            :   <Menu.Item position='right'>
                                            <Button onClick={this.props.logoutUser}>Logout</Button>
                                </Menu.Item>
                            }

                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}
