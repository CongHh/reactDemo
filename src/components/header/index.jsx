import React, { Component } from 'react';

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'
import { withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import LinkButton from '../link-button';

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        text_day: ''
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }

    getWeather = async () => {
        const dataInfo = await reqWeather()
        const { text_day } = dataInfo.result.forecasts[0]
        console.log(dataInfo.result.forecasts[0]);
        //更新状态
        this.setState({ text_day })
    }

    getTitle = () => {
        //得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }

    logout = () => {
        //显示确认框
        Modal.confirm({
            title: '确认退出吗？',
            onOk: ()=> {
                console.log('OK');
                memoryUtils.user = {}
                storageUtils.removeUser()

                this.props.history.replace('/login')
            }
        })
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }


    render() {

        const { currentTime, text_day } = this.state
        const username = memoryUtils.user.username

        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        {/* <img src="" alt="weather" /> */}
                        <span>{text_day}</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Header)