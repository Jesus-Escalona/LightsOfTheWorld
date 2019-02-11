import {Menu, Button, Container, Responsive, Segment, Visibility, Image, Form, Header, Modal, Icon, Label, Input} from "semantic-ui-react";
import React, {Component} from "react";


class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(e, this.state);
    console.log(this.state);
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {

    return (

      <Modal size="small" trigger={<Button inverted>Log in</Button>} centered={false}>
        <Modal.Header>User Log in</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.submitHandler}>
              <Label pointing="below">Username:</Label>
            <Form.Input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.changeHandler}
              /> 


      <Label pointing="below">Password:</Label>
            <Form.Input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.changeHandler}
              />
              <br></br><br></br>

              <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              <Icon name='checkmark' /> Log in
              </Button>
            </Modal.Actions>
            </Form>


      </Modal.Content>
    </Modal>
    )
  }
}

export default Login
