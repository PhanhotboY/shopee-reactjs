import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './HeaderSign.module.scss';
import HeaderLogo from './Section/HeaderLogo';

class HeaderSign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: window.location.pathname.slice(1),
        };
    }

    componentDidMount() {
        const targetNode = document.querySelector('.content-container');
        const config = { childList: true, subtree: true };

        const callback = (mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    this.setState({
                        currentPage: window.location.pathname.slice(1),
                    });
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    render() {
        return (
            <div className={`${style.header}`}>
                <HeaderLogo />

                <div className={style.header_title}>
                    <FormattedMessage id={`header.${this.state.currentPage}`} />
                </div>

                <a className={style.header_help} href='#'>
                    <FormattedMessage id='header.need-help' />
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSign);
