import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form } from '@ant-design/compatible';
import { Input } from 'antd';



const Item = Form.Item

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount() {
        //将form对象通过setForm()传递父组件
        this.props.setForm(this.props.form)
    }

    state = {}
    render() {
        const { categoryName} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                {
                        getFieldDecorator('categoryName',{
                            initialValue: categoryName,
                            rules: [
                                {required: true,message: '请输入内容'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称' />
                        )
                    }                  
                </Item>

            </Form>
        );
    }
}

export default Form.create()(UpdateForm);