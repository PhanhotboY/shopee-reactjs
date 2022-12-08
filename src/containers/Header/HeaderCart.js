import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './HeaderCart.module.scss';
import HeaderNavbar from './HeaderNavbar';
import HeaderLogo from './Section/HeaderLogo';
import { Link } from 'react-router-dom';
import SearchBox, { SearchInput } from './Section/SearchBox';

class HeaderCart extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <>
                <HeaderNavbar />

                <div className={`${style.wrapper}`}>
                    <div className='grid'>
                        <div className={style.logo}>
                            <HeaderLogo />

                            <Link to='/'>
                                <span>
                                    <FormattedMessage id='cart.header' />
                                </span>
                            </Link>
                        </div>

                        <div className={style.search_box}>
                            <SearchBox hiddenSubInfo={true} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);
