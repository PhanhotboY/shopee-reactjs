import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './MenuOptions.module.scss';

class MenuOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: this.props.menus,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {
        if (this.props.menus !== prevProps.menus) {
            this.setState({ menus: this.props.menus });
        }
    }

    render() {
        return (
            <div className={style.selections}>
                {this.props.menus.map((menu, index) => (
                    <div key={index} className={style.selection}>
                        <label htmlFor={menu.label}>{menu.label}</label>

                        <select
                            id={menu.label}
                            name={menu.name}
                            onChange={(e) => this.props.onChangeHandler(e)}
                        >
                            {menu.menus.map((option, i) => (
                                <option key={i} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuOptions);
