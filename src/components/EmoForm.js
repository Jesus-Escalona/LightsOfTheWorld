import React, {Component} from 'react';
import {Button, Divider, Dropdown, Form, Grid, Header, Input, Rating, Segment, Message} from "semantic-ui-react";

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
            <Segment padded='very' compact>
                <Header as='h2'>How are you feeling?</Header>
                <Form onSubmit={this.props.handleSubmit}>
                    <Grid columns={2}>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
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
                            </Grid.Column>
                            <Grid.Column>
                                <div>
                                    <div>Intensity: {this.props.intensity}</div>
                                    <Input name="intensity" type='range' min={0} max={10} value={this.props.intensity} onChange={this.props.handleChange} />
                                    <br />
                                    <Rating icon='heart' rating={this.props.intensity} maxRating={10} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <Button fluid color='teal' icon='save' />
                </Form>
                {this.props.message &&
                <Message
                    success
                    onDismiss={this.props.removeMessage}
                    header={this.props.message}
                    content='Your emotion has been registered'
                />}
            </Segment>

        );
    }
}

export default EmoForm;