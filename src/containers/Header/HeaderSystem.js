import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'store/actions';
import { LANGUAGES } from 'utils';
import Navigator from 'components/Navigator';
import * as menus from 'containers/Menu';
import style from './HeaderSystem.module.scss';

class HeaderSystem extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className={style.system_header}>
                <Navigator menus={menus.adminMenu} />

                <div className={style.actions}>
                    <div className={style.change_language}>
                        <span
                            style={{
                                ...(this.props.language === LANGUAGES.VI
                                    ? { color: '#f00', fontWeight: 600 }
                                    : {}),
                            }}
                            onClick={() => this.props.changeLanguage(LANGUAGES.VI)}
                        >
                            {LANGUAGES.VI}
                        </span>
                        <span
                            style={{
                                ...(this.props.language === LANGUAGES.EN
                                    ? { color: '#B937FF', fontWeight: 600 }
                                    : {}),
                            }}
                            onClick={() => this.props.changeLanguage(LANGUAGES.EN)}
                        >
                            {LANGUAGES.EN}
                        </span>
                    </div>

                    <Link className={style.home} to='/'>
                        <i className='fa-solid fa-house'></i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSystem);
