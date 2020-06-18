import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils'
import { Redirect,Route,Switch } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const user = memoryUtils.user
        if (!user._id) {
            //自动给跳转到登录
            return <Redirect to='/login' />
        }
        return (
            <div style={{ height: '100%' }}>
                <Layout style={{ height: '100%' }}>
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{ backgroundColor: '#fff' ,margin:20}}>
                            <Switch>
                               <Route path='/home' component={Home} />
                               <Route path='/category' component={Category} />
                               <Route path='/product' component={Product} />
                               <Route path='/role' component={Role} />
                               <Route path='/user' component={User} />
                               <Route path='/charts/bar' component={Bar} />
                               <Route path='/charts/line' component={Line} />
                               <Route path='/charts/pie' component={Pie} />
                               <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Admin;