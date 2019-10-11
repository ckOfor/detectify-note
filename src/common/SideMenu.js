// react library
import React, { Component } from 'react'

// third-party library
import {
  Layout, Menu, Icon
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
          
          <Menu.Item
            onClick={handleSideMenuSelection}
            key="profile"
          >
            <Icon
              type="user"
            />
            <span>
              Profile
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
