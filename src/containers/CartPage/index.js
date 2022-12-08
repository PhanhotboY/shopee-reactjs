import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './index.module.scss';

class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`grid ${style.wrapper}`}>
                <Notification />
            </div>
        );
    }
}

const CartHeaderSelect = () => {
    return {};
};

const Notification = () => {
    return (
        <div className={style.notification}>
            <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/1cdd37339544d858f4d0ade5723cd477.png' />

            <span>
                <FormattedMessage id='cart.notification' />
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
