// react library
import React, { Component } from 'react'

// third-party library
import { Layout } from 'antd';

const { Header } = Layout;

export default class HeaderPage extends Component {
  state={
    companyDetails: [],
    collapsed: false
  }
  
  render () {
    return (
      <Header>
        <div className="logo" />
        <div>
          <h3
            style={{
              color: '#FFFFFF'
            }}>Notify
          </h3>
        </div>
      </Header>
    )
  }
}
