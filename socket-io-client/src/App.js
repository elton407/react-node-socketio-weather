import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      response2:false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    //when the react component gets mounted
    //socket creates a new connection 
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on("FromAPIDewPoint", data => this.setState({response2: data}));
  }
  render() {
    const { response } = this.state;
    const { response2 } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Florence is: {response} °F
              The DewPoint in Florence is: {response2}
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;

