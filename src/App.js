import React from 'react';
import Switch from "react-switch";
import './App.css';
import * as firebase from 'firebase/app'
require('firebase/database');

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      light: false
    }
  }

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAKI2kYW0patts6MCv5Eo1_uA27IH_g6yQ",
      authDomain: "nightlight-cb29c.firebaseapp.com",
      databaseURL: "https://nightlight-cb29c.firebaseio.com",
      projectId: "nightlight-cb29c",
      storageBucket: "nightlight-cb29c.appspot.com",
      messagingSenderId: "1038752337142",
      appId: "1:1038752337142:web:b8ab7d84f91518584770d7"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('light').on('value', snap => {
      this.setState({light: snap.val()})
    })
  }

  async toggleLight() {
    await this.setState({light: !this.state.light})
    firebase.database().ref('light').set(this.state.light)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center>
            <p>Light is {this.state.light ? 'ON' : 'OFF'}</p>
            <Switch onChange={() => this.toggleLight()} checked={this.state.light} />
          </center>
        </header>
      </div>
    );
  }
}
