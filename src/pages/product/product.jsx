import React, { Component } from 'react';

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import { Route, Switch, Redirect } from 'react-router-dom';

class Product extends Component {
    state = {  }
    render() {
        return (
           <Switch>
               <Route path='/product' component={ProductHome} exact></Route>
               <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
               <Route path='/product/detail' component={ProductDetail}></Route>

               <Redirect to='/product' />
           </Switch>
        );
    }
}

export default Product;