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
					{/*<Route exact path="/home" component={Landing} />*/}
					{/*<Route exact path="/create" component={Create} />*/}
					{/*<Route exact path="/tandc" component={TermsAndConditions} />*/}
					{/*<Route exact path="/LandingPage" component={LandingPage} />*/}
				</div>
			</Router>
		);
	}
}

export default App;
