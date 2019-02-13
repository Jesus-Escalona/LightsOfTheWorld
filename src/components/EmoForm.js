import React, {Component} from 'react';
import {Button, Dropdown, Form, Input, Rating} from "semantic-ui-react";

const getNames = (array, key1, key2) => array.map(obj => {
    return {
        key: obj[key1].id,
        value: obj[key1].id,
        text: obj[key1][key2].charAt(0).toUpperCase() + obj[key1][key2].slice(1)
    }
});

class EmoForm extends Component {
    state = {
        emotions: []
    }


    componentDidMount() {
        fetch('http://localhost:3000/api/v1/emotions')
            .then(res => res.json())
            .then(data => {
                let emotions = getNames(data.emotions.data, 'attributes', 'feeling_type')
                this.setState({emotions})
            })
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Dropdown
                    onChange={this.props.handleChange}
                    name="emotion"
                    button
                    className="icon"
                    floating
                    labeled
                    icon='flask'
                    placeholder='Select Emotion'
                    selection
                    options={this.state.emotions}
                />
                <div>
                    <div>Rating: {this.props.intensity}</div>
                    <Input name="intensity" type='range' min={0} max={10} value={this.props.intensity} onChange={this.props.handleChange} />
                    <br />
                    <Rating rating={this.props.intensity} maxRating={10} />
                </div>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default EmoForm;