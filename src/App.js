import React, { Component } from 'react';

// this will run as soon as the component is mounted
const ws = new WebSocket('ws://echo.websocket.org');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wsState: false,
        };
        this.showMeItsOpen = this.showMeItsOpen.bind(this);
        this.sendMeAMessage = this.sendMeAMessage.bind(this);
        this.iReceivedSomething = this.iReceivedSomething.bind(this);
    }

    componentDidMount() {
        // listeners for the socket once mount is done
        ws.onopen = () => {  this.showMeItsOpen(() => this.sendMeAMessage('your account balance is')) };
        ws.onmessage = (evt) => this.iReceivedSomething(evt);
    }

    showMeItsOpen(callback) {
        // set the state and run callback
        this.setState({ wsState: 'were now connected to the socket' });
        callback();
    }

    sendMeAMessage(msg) {
        // sent the message to socket with random num every half a second
        setInterval(() => {
            ws.send(`${msg} ${Math.floor((Math.random() * 10) + 1)}`);
        }, 500);
    }

    iReceivedSomething(evt) {
        // when we set state and we reference that state in render, react forces a re-render
        this.setState({ wsState: `we recieved ::: ${evt.data}` });
    }

    render() {
        // this will run on mount as default state
        if (!this.state.wsState) {
            return <span>loading...</span>
        }
        // here we print out whatever we set so state var wsState
        return <span>{this.state.wsState}</span>;
    }

}

export default App;
