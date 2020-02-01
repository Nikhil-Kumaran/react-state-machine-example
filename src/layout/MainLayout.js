import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
import "./MainLayout.less";

export default class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          {this.state.collapsed ? (
            <div className="logo">S M</div>
          ) : (
            <div className="logo">State Machine</div>
          )}
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to={"/"}>
                <Icon type="dollar" />
                <span className="menu-item-link">Payment</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> */}
          {this.props.children}
          {/* </div> */}
        </Layout>
      </Layout>
    );
  }
}
