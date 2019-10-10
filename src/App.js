import React, { Component }  from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

// screens
import { SignInScreen } from "./screens/sign-in-screen";
import { LandingScreen } from "./screens/landing-screen";

class App extends Component {
	
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={SignInScreen} />
					<Route exact path="/landing" component={LandingScreen} />
				</div>
			</Router>
		);
	}
}

export default App;
