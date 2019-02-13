import React, {Component, Fragment} from 'react'
import {Button, Container, Dropdown, Form, Header, Input, Rating} from "semantic-ui-react";
import Plot from 'react-plotly.js';
import EmoForm from "./EmoForm";

class Home extends Component {

    state = {
        intensity: '',
        emotion: '',
        message: ''
    }

    handleChange = (e, d) => {
        this.setState({
            [d.name]: d.value
        })
    }

    showMessage = (data) => {
        if (data.message) {
            this.setState({message: data.message})
        }
    }

    removeMessage = () => {
        this.setState({message: ''})
    }

    handleSubmit =  (e) => {
        e.preventDefault()
        const {intensity, emotion} = this.state
        if (intensity !=='' && emotion !=='') {
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
                .then(this.showMessage)
        }
    }

    render() {
        return (
            <Container fluid align="center">
                {this.props.userExists && <EmoForm removeMessage={this.removeMessage} message={this.state.message} emotion={this.state.emotion} intensity={this.state.intensity} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>}
                {this.props.mapData.locations.length &&
                <Fragment>
                    <Header as='h1'>World Happiness Data</Header>
                    <Plot
                        data={[this.props.mapData]}
                        layout={this.props.layout}
                        //useResizeHandler
                        style={{
                            width: '1000px',
                            height: '600px',
                        }}
                        config={{
                            displaylogo: false
                        }}
                    />
                </Fragment>
                    }
            </Container>
        );
    }
}


export default Home;

