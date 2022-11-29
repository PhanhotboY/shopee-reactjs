import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './UserList.module.scss';
import { ROLES, GENDERS } from 'utils/constant';
import * as menus from 'containers/Menu';
import MenuOptions from './MenuOptions';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userArray: this.props.userArray || [],
            filter: {},
            order: 'asc',
            attribute: 'id',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.userArray !== prevProps.userArray) {
            await this.setState({
                userArray: this.props.userArray,
            });
        }
    }

    handleOnChange(e) {
        this.setState({
            filter: { ...this.state.filter, [e.target.name]: e.target.value },
        });
    }

    handleToggleBtn() {
        this.setState({ order: this.state.order === 'desc' ? 'asc' : 'desc' });
    }

    render() {
        const filteredUserArr = filteringArr(this.state.userArray, this.state.filter);
        const orderedUserArr = orderingArr(filteredUserArr, this.state.attribute, this.state.order);

        return (
            <>
                <div className={style.filter_wrapper}>
                    <MenuOptions
                        menus={menus.userFilterMenu}
                        onChangeHandler={this.handleOnChange.bind(this)}
                    />

                    <div className={style.sort_by}>
                        <label htmlFor='filterSortBy'>
                            <FormattedMessage id='common.sort-by' />
                            <select
                                className='mx-2'
                                id='filterSortBy'
                                onChange={(e) => this.setState({ attribute: e.target.value })}
                            >
                                {getKeyOptions(this.props.userInfo)}
                            </select>
                        </label>

                        <button onClick={this.handleToggleBtn.bind(this)}>
                            {this.state.order === 'desc' && (
                                <div>
                                    <i className='fa-solid fa-arrow-down-wide-short'></i>
                                </div>
                            )}
                            {this.state.order === 'asc' && (
                                <div>
                                    <i className='fa-solid fa-arrow-up-wide-short'></i>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {React.cloneElement(this.props.children, { userArray: orderedUserArr })}
            </>
        );
    }
}

const filteringArr = (userArr, filterObj) => {
    let filteredUserArr = [];

    if (!filterObj || Object.keys(filterObj).length === 0) {
        filteredUserArr = [...userArr];
        return filteredUserArr;
    }

    userArr.forEach((user) => {
        if (
            filterObj.gender &&
            filterObj.gender !== 'all' &&
            user.gender !== GENDERS[filterObj.gender.toUpperCase()]
        )
            return;

        if (
            filterObj.role &&
            filterObj.role !== 'all' &&
            user.roleId !== ROLES[filterObj.role.toUpperCase()]
        )
            return;

        filteredUserArr.push(user);
    });

    return filteredUserArr;
};

const orderingArr = (userArr, attribute, order) => {
    const orderedArr = userArr.sort((a, b) => {
        if (a[attribute] > b[attribute]) {
            return 1;
        }
        if (a[attribute] < b[attribute]) {
            return -1;
        }
        return 0;
    });

    if (order === 'desc') orderedArr.reverse();

    return orderedArr;
};

const getKeyOptions = (obj) => {
    const options = [];

    for (let key of Object.keys(obj)) {
        options.push(
            <option key={key} value={key}>
                {key}
            </option>
        );
    }

    return options;
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
