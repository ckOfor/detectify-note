// react library
import React, { Component } from 'react'

// third-party react library
import axios from 'axios';
import { Form } from 'antd';

// styles
import './landing-screen.css';


class LandingPage extends Component {
	render () {
		return (
			<div>
				<h1>Landing</h1>
			</div>
		)
	}
}

export const LandingScreen = Form.create()(LandingPage);
