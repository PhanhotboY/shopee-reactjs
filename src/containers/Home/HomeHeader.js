import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import style from './HomeHeader.module.scss';

class HomeHeader extends Component {
    render() {
        return (
            <div className={style['header_search']}>
                <div className={`grid ${style['header_wrapper']} d-flex`}>
                    <div className={style['header_search_cart']}>
                        <div className={style['search_cart_wrapper']}>
                            <a href='#'>
                                <svg viewBox='0 0 26.6 25.6'>
                                    <polyline
                                        fill='none'
                                        points='2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                        strokeWidth={2.5}
                                    ></polyline>
                                    <circle cx='10.7' cy='23' r='2.2' stroke='none'></circle>
                                    <circle cx='19.7' cy='23' r='2.2' stroke='none'></circle>
                                </svg>
                            </a>

                            <div className={style['search_cart_popover']}>
                                <div className={style['popover_anchor']}></div>

                                <div className={style['cart_popover_wrapper']}>
                                    <div className={style['cart_popover_content']}>
                                        <img
                                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
                                            alt='empty_cart_icon'
                                        />
                                        <span>Chưa Có Sản Phẩm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
