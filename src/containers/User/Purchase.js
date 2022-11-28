import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './Purchase.module.scss';
import PurchaseHeader from './Section/PurchaseHeader';
import ReceiptProductTag from './Section/ReceiptProductTag';
import Receipt from './Section/Receipt';

class Purchase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: '0',
            isFocus: false,
        };
    }

    async componentDidMount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.remove('bg-white');
        wrapper.style.boxShadow = 'none';

        const links = document.querySelectorAll(`.${style.header} a`);
        links.forEach((link) => {
            link.onclick = () => {
                this.setState({ currPage: link.getAttribute('href').slice(-1) });
            };
        });
    }

    async componentWillUnmount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.add('bg-white');
        wrapper.style.boxShadow = '';
    }

    handleFocus() {
        this.setState({ isFocus: true });
    }

    handleBlur() {
        this.setState({ isFocus: false });
    }

    render() {
        return (
            <div className={style.wrapper}>
                <PurchaseHeader currPage={this.state.currPage} />

                {this.state.currPage == 0 && (
                    <PurchaseSearch
                        isFocus={this.state.isFocus}
                        focusHandler={this.handleFocus.bind(this)}
                        blurHandler={this.handleBlur.bind(this)}
                    />
                )}

                <div className={`${style.body}`}>
                    {receipts.map((receipt, index) => (
                        <Receipt key={index} receipt={receipt} />
                    ))}
                </div>
            </div>
        );
    }
}

const PurchaseSearch = ({ isFocus, focusHandler, blurHandler }) => {
    return (
        <div className={`${style.search}  ${isFocus ? style.focusing : ''}`}>
            <i className='fa-solid fa-magnifying-glass'></i>
            <input
                type='text'
                onFocus={focusHandler}
                onBlur={blurHandler}
                placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
            />
        </div>
    );
};

const receipts = [1, 2, 4];

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

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
