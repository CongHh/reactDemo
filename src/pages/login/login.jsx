import React, { Component } from 'react';
import { Icon, Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button,message } from 'antd';

import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err,values) => {
            if(!err){
                console.log('Received values of form: ', values);
                const {username,password} = values
              
                const result =await reqLogin(username,password);  
                console.log(result);
                if(result.status === 0){
                    message.success('登陆成功')
                    const user = result.data
                    memoryUtils.user = user //保存到内存中
                    storageUtils.saveUser(user) //保存到local中
                    //跳转到管理页面
                    this.props.history.replace('/')
                }else {
                    message.error(result.msg);
                }
               
            }else {
                console.log("校验失败！");
            }
        })
    }

    render() {
        //如果用户已经登录，自动跳转到管理页面
        //storageUtils.removeUser()
        const user = memoryUtils.user
        if(user._id){
            return <Redirect to='/' />
        }


        const form = this.props.form

        const { getFieldDecorator } = form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>某某后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace:true,message: 'Please input your username!' },
                                    { min: 4, message: '用户名最少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文数字下划线' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Please input your Password!' },
                                    { min: 4, message: '用户名最少4位' },
                                    { max: 12, message: '用户名最多12位' }
                                 ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
          </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const WrapLogin = Form.create()(Login)

export default WrapLogin;

/**
 * async 和 await 
1.作用？
    简化promise对象的使用：不用再使用then()来指定成功失败的回调函数
    以同步编码方式实现异步流程
2.哪里写await？
    在返回promise的表达式左侧写await
3.哪里写async？
    await所在函数最近的定义的左侧
 */
