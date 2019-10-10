// react library
import React, { Component } from 'react'

// third-party react library
import { Form, Input, Button, notification, message } from 'antd'
import FroalaEditor from 'react-froala-wysiwyg';
import axios from 'axios'

// styles
import './create-screen.css';

// markdown
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

class CreatePage extends Component {
	state = {
		model: 'Start typing',
		isLoading: false,
		URL: 'https://detectify-note-app.herokuapp.com/api/user',
		category: '',
		content: '',
		userId: ''
	}
	
	/**
	 * componentDidMount
	 */
	componentDidMount () {
		let userDetails = localStorage.getItem('userDetails')
		this.setState({
			userId: JSON.parse(userDetails).id
		})
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
	 * handleContentChange
	 *
	 * @param content
	 */
	handleModelChange = (content) => {
		this.setState({
			content: content
		});
	}
	
	/**
	 * handleCategoryOnChange
	 *
	 * @param e
	 */
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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
				this.verifyNoteLength()
			}
		});
	}
	
	/**
	 * verifyNoteLength
	 */
	verifyNoteLength = () => {
		const { content, category } = this.state
		if (category.length < 3) {
			this.notification("Error",
				"Your category is too short", "error")
			return
		} else if(content.length < 3) {
			this.notification("Error",
				"Your note is too short", "error")
			return
		}
		this.saveNote()
	}
	
	/**
	 * saveNote
	 */
	saveNote = () => {
		const hide = message.loading('Saving note please wait...', 0);
		const { URL, isLoading, category, content, userId } = this.state
		this.setState({ isLoading: !isLoading })
		
		axios.post(`${URL}/${userId}/notes`,
			{
				category,
				content
			})
			.then((response) => {
				setTimeout(hide, 2500);
				this.setState({ isLoading: false })
				if(response.data.status) {
					this.resetFormValues()
					this.notification("Success!", `${response.data.message}`, "success");
				}
			})
			.catch((error) => {
				setTimeout(hide, 2500);
				this.setState({ isLoading: false })
				this.notification("Sorry :(", error.response.data.message, "error")
			});
	}
	
	/**
	 * resetFormValues
	 */
	resetFormValues = () => {
		this.props.form.resetFields()
		this.setState({ category: '', content: ''})
	}

	render () {
		const { isLoading, category } = this.state
		const { getFieldDecorator } = this.props.form
		
		return (
			<div
				className="CreatePageApp"
			>
				<div
					className="CreatePageApp-content"
				>
					<div
						className="CreatePageApp-body"
					>
						<Form onSubmit={this.handleSubmit} className="note-form">
							<Form.Item
								label="Category"
							>
								{getFieldDecorator('category', {
									initialValue: category,
									rules: [{
										required: true,
										message: 'Please enter note category'
									}, {
										min: 1,
										message: 'Please enter note category'
									}],
								})(
									<Input
										disabled={isLoading}
										name={'category'}
										onChange={this.onChange}
										allowClear
										placeholder="Enter note category"
									/>
									)}
							</Form.Item>
							
							<FroalaEditor
								model={this.state.content}
								onModelChange={this.handleModelChange}
							/>
							
							<Button
								style={{
									backgroundColor: '#0c2136',
									color: '#FFFFFF',
									marginTop: 50
								}}
								block
								size={'large'}
								disabled={isLoading}
								htmlType="submit"
								className="note-form"
							>
								Save
								</Button>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export const CreateScreen = Form.create()(CreatePage);
