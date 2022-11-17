import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserDeleted from '../containers/System/UserDeleted';
import UserUpdate from '../containers/System/UserUpdate';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

class System extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className='system-container'>
                <div className='system-list'>
                    <Switch>
                        <Route path='/system/manage-user/update' component={UserUpdate} />
                        <Route path='/system/manage-user/deleted-user' component={UserDeleted} />

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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isAdmin: state.user.isAdmin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
