import React, {Component} from 'react';
import {Card, Icon, Image} from "semantic-ui-react";

class Profile extends Component {
    render() {
        const { name, email } = this.props.user.data.attributes;
        return (
            <Card>
                <Image src={require('../assets/images/avatar.png')} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in 2019</span>
                        <span className='date'>{email}</span>
                    </Card.Meta>
                    <Card.Description>Hello there</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user' />
                    24 Friends
                </Card.Content>
            </Card>
        );
    }
}

export default Profile;