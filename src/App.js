import React from "react";
import Switch from "react-switch";
import "./App.css";
import * as firebase from "firebase/app";
require("firebase/database");

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			light: false,
			playing: false,
			paused: true,
		};
	}

	componentDidMount() {
		const firebaseConfig = {
			apiKey: "AIzaSyC-mpPq9iYl7l8qm63odw-Jxnm2LTavvKY",
			authDomain: "nightlight-f0b70.firebaseapp.com",
			databaseURL: "https://nightlight-f0b70-default-rtdb.firebaseio.com",
			projectId: "nightlight-f0b70",
			storageBucket: "nightlight-f0b70.appspot.com",
			messagingSenderId: "1056029575292",
			appId: "1:1056029575292:web:c4bdfe375253211e76a1f9",
			measurementId: "G-DJJQ62GH11",
		};
		firebase.initializeApp(firebaseConfig);
		firebase
			.database()
			.ref("light")
			.on("value", (snap) => {
				this.setState({ light: snap.val() });
			});
		firebase
			.database()
			.ref("playing")
			.on("value", (snap) => {
				this.setState({ playing: snap.val() });
			});
		firebase
			.database()
			.ref("paused")
			.on("value", (snap) => {
				this.setState({ paused: snap.val() });
			});
	}

	async toggleLight() {
		await this.setState({ light: !this.state.light });
		firebase.database().ref("light").set(this.state.light);
	}

	async pausePlay() {
		firebase.database().ref("paused").set(!this.state.paused);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<center>
						<p>Light is {this.state.light ? "ON" : "OFF"}</p>
						<Switch
							onChange={() => this.toggleLight()}
							checked={this.state.light}
						/>
						<br />
						{this.state.playing && (
							<button onClick={() => this.pausePlay()} className="button">
								{this.state.paused ? "Play" : "Pause"}
							</button>
						)}
					</center>
				</header>
			</div>
		);
	}
}
