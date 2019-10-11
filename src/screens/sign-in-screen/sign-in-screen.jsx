// react library
import React, { Component } from 'react'

// third-party react library
import axios from 'axios';
import {
	Form, Input, Checkbox, Icon, Button, message, notification
} from 'antd';

// styles
import './sign-in-screen.css';

const BUTTON = {
	marginLeft: 40,
	backgroundColor: '#0c2136',
	color: '#FFFFFF',
}

class SignInPage extends Component {
	state={
		isLoading: false,
		email: '',
		password: '',
		URL: 'https://detectify-note-app.herokuapp.com/api/user/create',
		// URL: 'http://localhost:8000/api/user/create',
	}
	
	/**
	 * componentDidMount
	 */
	componentDidMount () {
		let userDetails = localStorage.getItem('userDetails')
		if(userDetails !== null)
		return Object.keys(userDetails).length > 1 && this.props.history.push("/landing")
	}
	
	/**
	 * handleSubmit
	 *
	 * @param e
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.handleSignIn(values)
				
			}
		});
	}
	
	/**
	 * notification
	 *
	 * @param heading
	 * @param message
	 * @param type
	 */
	notification = (heading, message, type) => {
		notification[`${type}`]({
			message: `${heading}`,
			description: `${message}`,
			style: {
				width: 600,
				marginLeft: 335 - 600,
			},
		});
	};
	
	/**
	 * saveUser
	 *
	 * @param userDetails
	 */
	saveUser = (userDetails) => {
		this.props.form.resetFields()
		localStorage.setItem('userDetails', JSON.stringify(userDetails))
		this.props.history.push("/landing")
	}
	
	/**
	 * handleSignIn
	 *
	 * @param { email, password } - user's email and password
	 */
	handleSignIn = ({ email, password }) => {
		const hide = message.loading('Wait while we verify your details...', 0);
		const { URL, isLoading } = this.state
		this.setState({ isLoading: !isLoading })
		
		axios.post(`${URL}`,
			{
				email,
				password
			})
			.then((response) => {
				setTimeout(hide, 2500);
				this.setState({ isLoading: false })
				if(response.data.status) {
					this.notification("Success!", `${response.data.message}`, "success");
					this.saveUser(response.data.data)
				}
			})
			.catch((error) => {
				setTimeout(hide, 2500);
				this.setState({ isLoading: false })
				this.notification("Sorry :(", error.response.data.message, "error")
			});
	}
	
	render () {
		const { isLoading } = this.state
		const { getFieldDecorator } = this.props.form;
		
		return(
			<div
				className={"signPageApp"}
			>
				<div
					className="signPageApp-content"
				>
					<div className="signPageApp-body">
						<h1
							style={{
								color: '#0c2136'
							}}
						>
							Notify
						</h1>
						
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item>
								{getFieldDecorator('email', {
									rules: [{
										type: 'email', message: 'The input is not valid E-mail!',
									}, {
										required: true, message: 'Please input your E-mail!',
									}],
								})(
									<Input
										name={'email'}
										onChange={this.onChange}
										prefix={
											<Icon
												type="user"
												style={{ color: 'rgba(0,0,0,.25)' }}
											/>
										}
										allowClear
										placeholder="Email" />
								)}
							</Form.Item>
							
							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Please input your Password!' }],
								})(
									<Input.Password
										name={'password'}
										onChange={this.onChange}
										prefix={
											<Icon
												type="lock"
												style={{ color: 'rgba(0,0,0,.25)' }}
											/>
										}
										allowClear
										type="password"
										placeholder="Password"
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
								})(
									<Checkbox>Remember me</Checkbox>
								)}
							</Form.Item>
							
							<Form.Item>
								<Button
									style={BUTTON}
									size={'large'}
									disabled={isLoading}
									htmlType="submit"
									className="login-form-button"
								>
									Sign in / Sign up
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export const SignInScreen = Form.create()(SignInPage);
