import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { history } from '../../redux';
import style from './Purchase.module.scss';
import PurchaseHeader from './Section/PurchaseHeader';
import Receipt from './Section/Receipt';
import GoToTopBtn from 'containers/System/Section/GoToTopBtn';
import { FormattedMessage } from 'react-intl';

class Purchase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: '0',
            isFocus: false,
            receipts: [],
        };
    }

    async componentDidMount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.remove('bg-white');
        wrapper.style.boxShadow = 'none';

        const links = document.querySelectorAll(`.${style.header} a`);
        await links.forEach((link) => {
            link.onclick = () => {
                this.setState({ currPage: link.getAttribute('href').slice(-1) });
            };
        });

        const startedIndex = (window.location.search && window.location.search.slice(6)) || 0;
        this.setState({ receipts: receiptOfEachType[startedIndex] });

        this.unlisten = history.listen((location, action) => {
            const index = (location.search && location.search.slice(6)) || 0;
            this.setState({ receipts: receiptOfEachType[index] });
        });
    }

    async componentWillUnmount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.add('bg-white');
        wrapper.style.boxShadow = '';

        if (this.unlisten) this.unlisten();
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
                    {this.state.receipts.length === 0 ? (
                        <PurchaseEmpty currPage={this.state.currPage} />
                    ) : (
                        this.state.receipts.map((receipt, index) => (
                            <Receipt key={index} receipt={receipt} />
                        ))
                    )}
                </div>

                <GoToTopBtn />
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

const PurchaseEmpty = ({ currPage }) => {
    return (
        <div className={style.purchase_empty}>
            <div
                style={{
                    background: `url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b96488590b8f781f.png') center / cover no-repeat`,
                }}
            ></div>

            <span>
                <FormattedMessage
                    id={`user.purchase.${currPage != 6 ? 'order' : 'return'}-empty`}
                />
            </span>
        </div>
    );
};

const receiptOfEachType = [[1, 2, 4], [], [1], [], [], [], []];

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
