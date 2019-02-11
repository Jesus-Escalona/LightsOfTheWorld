import {Menu, Button, Container, Responsive, Segment, Visibility, Image, Form, Header, Modal, Icon, Label, Divider} from "semantic-ui-react";
import React, {Component} from "react";


class Signup extends Component {

  state = {
    username: "",
    email: "",
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
    this.setState({
      username: "",
      email: "",
      password: ""
    })
  }

  render() {
      const { fixed } = this.state
    return (

      <Modal size="small" trigger={<Button inverted={!fixed}>Sign Up</Button>} centered={false}>
        <Modal.Header>User Sign Up</Modal.Header>
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
          <Label pointing="below">Email:</Label>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
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
            </Form>
            <br></br><br></br>
          <Modal.Actions>
        <Button color='green' onClick={this.handleClose} inverted center>
          <Icon name='checkmark' /> Log in
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
    )
  }
}

export default Signup
