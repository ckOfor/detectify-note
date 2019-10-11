// react library
import React, { Component } from 'react'

// third-party library
import {
  Layout, Menu, Icon, notification
} from 'antd';

const {
  Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export default class SideMenu extends Component {
  state={
    collapsed: false
  }
  
  onCollapse = (collapsed) => {
    const { isCollapsed } = this.props
    this.setState({ collapsed },
      () => isCollapsed(this.state.collapsed));
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
  
  logout = async () => {
	  try {
		  await localStorage.removeItem('userDetails')
		  this.props.history.push("/")
		  this.notification("Success", `User logged out successfully`, "success");
	  } catch (error) {
		  this.notification("Error", `User cannot be logged out at this time`, "error");
	  }
  }
  
  render () {
    const { handleSideMenuSelection } = this.props
    
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['create']} mode="inline">
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon
                  type="global"
                />
                <span>
                  Notes
                </span>
              </span>
            }
          >
            <Menu.Item
              onClick={handleSideMenuSelection}
              key="create"
            >
              Create
            </Menu.Item>
            <Menu.Item
              onClick={handleSideMenuSelection}
              key="manage"
            >
              Manage
            </Menu.Item>
          </SubMenu>
	
	        <SubMenu
		        key="sub2"
		        title={
			        <span>
                <Icon
	                type="user"
                />
                <span>
                  Profile
                </span>
              </span>
		        }
	        >
		        <Menu.Item
			        onClick={this.logout}
			        key="logout"
		        >
			        Logout
		        </Menu.Item>
	        </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
