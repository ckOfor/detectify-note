// react library
import React, { Component } from 'react'

// third-party react library
import { Form, Layout, Breadcrumb } from 'antd';

// screens
import { CreateScreen } from '../create-screen'

// common
import HeaderPage from '../../common/HeaderPage'
import SideMenu from '../../common/SideMenu'
import { ManageScreen } from '../manage-screen'

const { Content, Footer } = Layout;

const ROOT = {
	height: '100%',
	width:  '100%',
	position: 'absolute',
	top: 0,
	left: 0
}

const LAYOUT = {
	minHeight: '100vh'
}

const CONTENT_ONE = {
	margin: '0 16px'
}

const CONTENT_TWO = {
	margin: '0 16px'
}

const BREADCRUMB = {
	margin: '16px 0'
}

class LandingPage extends Component {
	state={
		selectedView: 'create',
	}
	
	
	/**
	 * componentDidMount
	 */
	componentDidMount () {
		let userDetails = localStorage.getItem('userDetails')
		return userDetails === null && this.props.history.push("/")
	}
	
	/**
	 * handleSideMenuSelection
	 *
	 * @param item
	 * @param key
	 * @param keyPath
	 */
	handleSideMenuSelection = ({ item, key, keyPath }) => {
		this.setState({
			selectedView: key
		})
	}
	
	/**
	 * handleCollapsed
	 *
	 * @param isCollapsed
	 */
	handleCollapsed = (isCollapsed) => {
		this.setState({ isCollapsed })
	}
	
	render () {
		const { selectedView, isCollapsed } = this.state
		
		return (
			<div
				style={ROOT}
			>
				<HeaderPage />
				<Layout
					style={LAYOUT}
				>
					<SideMenu
						history={this.props.history}
						handleSideMenuSelection={this.handleSideMenuSelection}
						isCollapsed={this.handleCollapsed}
					/>
					<Content
						style={CONTENT_ONE}
					>
						<Content style={CONTENT_TWO}>
							<Breadcrumb
								style={BREADCRUMB}
							/>
							{
								selectedView === 'create' && (
									<CreateScreen
										history={this.props.history}
									/>
								)
							}
							{
								selectedView === 'manage' && (
									<ManageScreen
										isCollapsed={isCollapsed}
										history={this.props.history}
									/>
								)
							}
							<Footer style={{ textAlign: 'center' }}>
								Notify by Ofor Chinedu ©2019
							</Footer>
						</Content>
					</Content>
				</Layout>
			</div>
		)
	}
}

export const LandingScreen = Form.create()(LandingPage);
