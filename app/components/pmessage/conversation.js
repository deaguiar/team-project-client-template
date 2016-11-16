import React from 'react';

export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
    }
    render() {
        return(
            <div>TEST</div>
        )
    }
}