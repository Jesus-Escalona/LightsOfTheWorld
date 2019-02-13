import React, { Component } from 'react'
import {Button, Container, Dropdown, Form, Input, Rating} from "semantic-ui-react";
import Plot from 'react-plotly.js';
import EmoForm from "./EmoForm";

class Home extends Component {

    state = {
        intensity: '',
        emotion: ''
    }

    handleChange = (e, d) => {
        this.setState({
            [d.name]: d.value
        })
    }

    handleSubmit =  (e) => {
        e.preventDefault()
        const {intensity, emotion} = this.state
        fetch('http://localhost:3000/api/v1/user_emotions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({intensity, emotion})
        })
            .then(res => res.json())
            .then(data => console.log("success"))
    }

    render() {
        return (
            <Container fluid align="center">
                {this.props.userExists && <EmoForm emotion={this.state.emotion} intensity={this.state.intensity} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>}
                {this.props.mapData.locations.length &&
                <Plot
                      data={[this.props.mapData]}
                      layout={this.props.layout}
                    //useResizeHandler
                      style={{
                          width: '1000px',
                          height: '600px'
                      }}
                      config={{
                          displaylogo: false
                      }}
                />}
            </Container>
        );
    }
}


export default Home;

