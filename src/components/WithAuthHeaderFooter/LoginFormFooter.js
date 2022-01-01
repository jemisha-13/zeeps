import React, { Component } from 'react';

import { 
    Layout
} from 'antd';

import '../css/global.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

const { Content } = Layout;

class LoginFormFooter extends Component {
    state = {  }
  

    render() { 
        return ( 
            <Layout className="login-bg">
               
                <Content className="login-content">
                    <Row className="text-white">
               
                        <Col xs={{ span: 23 }} sm={{ span:7 }} lg={{ span: 7 }} >
                            {window.location.pathname == '/register' ? <Link to="/" className="text-white">Login </Link> : <Link to="/register" className="text-white">Register </Link>}
                            
                        </Col>
                        
                        <Col xs={{ span: 1 }} sm={{ span:8 }} lg={{ span: 1 }} >
                            |
                        </Col>
                        <Col className="text-center" xs={{ span: 24 }} sm={{ span:8 }} lg={{ span: 8 }} >
                            <Link to="/find-password" className="text-white">Find password </Link>
                        </Col>
                        <Col xs={{ span: 1 }} sm={{ span:8 }} lg={{ span: 1 }} >
                            |
                        </Col>
                        <Col className="text-right" xs={{ span: 24 }} sm={{ span:7 }} lg={{ span: 7 }} >
                            <Link to="#" className="text-white">Find email address </Link>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            
        );
    }
}
 
export default LoginFormFooter;