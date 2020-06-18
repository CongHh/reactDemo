import React, { Component } from 'react';
import { Card, Table, Button, message } from 'antd';
import { Icon } from '@ant-design/compatible';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api'


class Category extends Component {
    state = {
        loading: false,
        categorys: [], //一级分类列表
    }
    /**
     * 初始化列表所有列的数组
     */
    initColumns  = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width:  300,
                render: () => (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )

            },
        ];
    }

    /**
     * 异步获取一级分类列表显示
     */
    getCategorys = async () => {
        //在发请求前
        this.setState({loading:true})

        const result = await reqCategorys('0')
        this.setState({loading:false})
        if(result.status === 0){
            const categorys =  result.data
            this.setState({
                categorys
            })
        }else {
            message.error('获取列表失败')
        }
        
    }

    /**
     * 为第一次render()准备数据
     */
    UNSAFE_componentWillMount() {
         this.initColumns()

    }
    /**
     * 执行异步任务：发异步ajax请求
     */
    componentDidMount () {
        this.getCategorys()
    }
    render() {
        //读取状态数据
        const {categorys,loading} = this.state

        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                添加
            </Button>

        )
        return (
            <Card title="一级分类列表" extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading = {loading}
                    dataSource={categorys}
                    columns={this.columns} 
                    pagination={{defaultPageSize: 5,showQuickJumper:true}} />
            </Card>
        );
    }
}

export default Category;