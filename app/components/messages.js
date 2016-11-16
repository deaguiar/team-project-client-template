import React from 'react';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.chatUser = props.chatUser;
    }
    render() {
        return(
            <div>{this.state.chatUser.fullName}</div>
        )
    }
}