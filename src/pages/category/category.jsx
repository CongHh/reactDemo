import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { Icon } from '@ant-design/compatible';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './addForm';
import UpdateForm from './updateForm';


class Category extends Component {
    state = {
        loading: false,
        categorys: [], //一级分类列表
        subCategorys: [], //二级分类列表
        parentId: '0', //当前需要显示的分类列表的父分类ID
        parentName: '', //当前需要显示的分类列表的父分类名称
        showStatus: 0, //标识添加/更新的确认框是否显示， 0：都不显示，1：显示添加，2：显示更新
    }
    /**
     * 初始化列表所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => { this.showUpdate(category) }}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton>
                            : null}

                    </span>
                )

            },
        ];
    }

    /**
     * 异步获取一级分类列表显示
     */
    getCategorys = async (parentId) => {
        //在发请求前
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId
        const result = await reqCategorys(parentId)

        this.setState({ loading: false })
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                this.setState({
                    categorys
                })
            } else {
                this.setState({
                    subCategorys: categorys
                })
            }
        } else {
            message.error('获取列表失败')
        }

    }


    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: [],
        })
    }

    /**
     * 显示指定一级分类对象的二级列表
     */

    showSubCategorys = (category) => {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => { //在状态更新且重新render()后执行
            console.log('parentId', this.state.parentId);
            this.getCategorys()
        })

        //setState()不能立即获取最新的状态：因为setState()是异步更新状态的

    }

    /**
     * 响应点击取消：隐藏确定框
     */

    handleCancel = () => {

        this.form.resetFields()

        this.setState({
            showStatus: 0
        })
    }

    /**
     * 添加分类
     */

    addCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    showStatus: 0
                })

                //收集数据，并提交添加分类的请求
                const { parentId, categoryName } = values

                this.form.resetFields()

                const result = await reqAddCategory(categoryName, parentId)
                if (result.status === 0) {
                    //添加的分类就是当前分类列表下的分类
                    if (parentId === this.state.parentId) {
                        this.getCategorys()
                    } else if (parentId === '0') { //在二级分类列表下添加一级分类，重新获取一级分类列表，但不需要显示一级列表
                        this.getCategorys('0')
                    }
                }
            }


        })

    }

    /**
     * 更新分类
     */
    updateCategory = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //隐藏确定框
                this.setState({
                    showStatus: 0
                })

                //准备数据
                const categoryId = this.category._id
                const { categoryName } = values

                //清除输入数据
                this.form.resetFields()

                //发送请求更新分类
                const result = await reqUpdateCategory({ categoryId, categoryName })
                if (result.status === 0) {
                    this.getCategorys()
                }
            }
        })

    }

    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    showUpdate = (category) => {
        this.category = category

        this.setState({
            showStatus: 2
        })
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
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        //读取状态数据
        const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state
        const category = this.category || {}
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type='plus' />
                添加
            </Button>

        )

        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
                <span>{parentName}</span>
            </span>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} />

                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form) => { this.form = form }
                        } />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name}
                        setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        );
    }
}

export default Category;