import { Component } from 'react';
import { connect } from 'react-redux';
import { CommonUtils, PATH } from 'utils';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';

import { appService } from 'services';
import { toast } from 'react-toastify';
import style from './CartFooter.module.scss';
import CustomButton from 'components/CustomButton';
import CustomCheckbox from 'components/CustomCheckbox';

class CartFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectAll: false,
            isRedirectedFromAddPayMethod: props.isRedirectedFromAddPayMethod,
        };
    }

    componentDidMount() {
        this.state.isRedirectedFromAddPayMethod && this.checkoutHandler();
    }

    async checkoutHandler() {
        if (!this.props.userInfo.isAttachedPaymentMethod)
            return this.redirectToAddPaymentMethodPage({ isRedirectedFromCart: true });

        this.setState({ isRedirectedFromAddPayMethod: false });

        return this.redirectToSelectPaymentMethodPage();
    }

    selectAllHandle() {
        this.setState({ isSelectAll: !this.state.isSelectAll });
    }

    redirectToCheckoutPage(state) {
        const { navigate } = this.props;
        navigate(PATH.CHECKOUT, state);
    }

    redirectToAddPaymentMethodPage(state) {
        const { navigate } = this.props;
        navigate(PATH.CHECKOUT + PATH.PAYMENT + '/add', state);
    }

    redirectToSelectPaymentMethodPage() {
        const { navigate } = this.props;
        navigate(PATH.CHECKOUT + PATH.PAYMENT + '/select');
    }

    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.actions}>
                    <CustomCheckbox
                        id='select_all'
                        name='selectAll'
                        checked={this.state.isSelectAll}
                        onChange={this.selectAllHandle.bind(this)}
                    />

                    <label className={style.select_all} htmlFor='select_all'>
                        <FormattedMessage id='cart.select-all' values={{ quantity: 21 }} />
                    </label>

                    <span>
                        <FormattedMessage id='cart.delete' />
                    </span>

                    <span>
                        <FormattedMessage id='cart.remove-inactive' />
                    </span>

                    <span>
                        <FormattedMessage id='cart.move-to-my-likes' />
                    </span>
                </div>

                <div className={style.closing}>
                    <span>
                        <FormattedMessage id='cart.total' values={{ quantity: 22 }} />
                    </span>

                    <span className={style.total_price}>
                        {CommonUtils.toCurrencyString(1234123123)}
                    </span>

                    <CustomButton
                        disabled={!this.state.isSelectAll}
                        onClick={this.checkoutHandler.bind(this)}
                        action='cart.check-out'
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path, state) => dispatch(push(path, state)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartFooter);
