import React from "react";

class Status extends React.Component {
  constructor() {
    super();
    this.state = {
      masked: true
    };
  }

  componentDidMount() {
    const socket = this.props.socket;

    socket.on("infringement", () => this.setState({ masked: false }));
    socket.on("stable", () => this.setState({ masked: true }));
  }

  render() {
    const { masked } = this.state;

    const styles = {
      height: '100vh',
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'background-color': masked ? 'blue' : 'red',
      color: 'white'
    }

    return (
      <div style={styles}><h3>{masked ? 'stable' : 'infringement currently happening'}</h3></div>
    );
  }
}

export default Status;