import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserDeleted from '../containers/System/UserDeleted';
import UserUpdate from '../containers/System/UserUpdate';
import ProductManage from '../containers/System/ProductManage';
import UserCreate from 'containers/System/UserCreate';

class System extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className='system-container'>
                <Switch>
                    <Route path='/system/manage-user/update' component={UserUpdate} />
                    <Route path='/system/manage-user/deleted-user' component={UserDeleted} />
                    <Route path='/system/manage-user/create' component={UserCreate} />

                    <Route path='/system/manage-user' component={UserManage} />
                    <Route path='/system/manage-seller' component={UserManage} />
                    <Route path='/system/manage-shipper' component={UserManage} />

                    <Route path='/system/manage-product' component={ProductManage} />

                    <Route path='/system/manage-order' component={ProductManage} />

                    <Route path='/system/manage-flashsale' component={ProductManage} />

                    <Route path='/system/manage-shop' component={ProductManage} />

                    <Route
                        component={() => {
                            return <Redirect to={systemMenuPath} />;
                        }}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
