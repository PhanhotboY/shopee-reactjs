import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './ConfirmForm.module.scss';
import getCardImage from 'utils/getCardImage';
import CustomButton from 'components/CustomButton';
import { CardCvcElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { appService } from 'services';
import { push } from 'connected-react-router';

class ConfirmForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCvcEmpty: true,
            isCvcComplete: false,
            cvcError: null,
        };
    }

    componentDidMount() {
        const cardCvcElement = this.props.elements.getElement(CardCvcElement);
        cardCvcElement.on('change', this.handleOnChangeCVC.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { stripe, elements, method, intent } = this.props;

        try {
            const cvcToken = await stripe.createToken(
                'cvc_update',
                elements.getElement(CardCvcElement)
            );

            if (cvcToken.error) {
                return this.setState({ cvcError: cvcToken.error });
            }

            const resp = await appService.confirmPaymentIntent(intent.id, method.id);

            if (resp.errType) throw new Error(resp.message);

            this.handleServerResponse(resp.payload);
        } catch (err) {
            toast.warn(err.message);
        }
    }

    handleServerResponse(confirm) {
        if (confirm.error) {
            console.log(confirm.error);
            return toast.warn(confirm.error);
        } else if (confirm.next_action) {
            this.handleAction(confirm);
        } else {
            toast.success('Your order is being placed successfully!');
            this.redirectToOrderPage();
        }
    }

    async handleAction(response) {
        const { stripe, intent, method } = this.props;

        try {
            const result = await stripe.handleCardAction(response.client_secret);

            if (result.error) {
                console.log(result.error);
                return toast.warn(result.error);
            }

            const resp = await appService.confirmPaymentIntent(intent.id, method.id);

            if (resp.errType) throw new Error(resp.message);

            this.handleServerResponse(resp.payload);
        } catch (err) {
            console.log(err);
            toast.warn(err.message);
        }
    }

    handleOnChangeCVC(e) {
        this.setState({ isCvcComplete: e.complete, cvcError: e.error, isCvcEmpty: e.empty });
    }

    redirectToOrderPage() {
        const { navigate } = this.props;
        const path = '/user/purchase';
        navigate(path);
    }

    render() {
        const { card, billing_details } = this.props.method;
        const { isCvcComplete, cvcError, isCvcEmpty } = this.state;

        return (
            <div className={`grid ${style.wrapper}`}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className={style.card}>
                        <div className={style.icon}>
                            <img src={getCardImage(card.brand)} alt='' />
                        </div>

                        <div className={style.row}>
                            <label>
                                <FormattedMessage id='checkout.cardholder-name' />
                            </label>

                            <p>{billing_details.name}</p>
                        </div>

                        <div className={`${style.row} ${style.col}`}>
                            <div className={style.cardNumber}>
                                <label>Card Number</label>

                                <p>{`**** **** **** ${card.last4}`}</p>
                            </div>

                            <div className={style.expiry}>
                                <label>Card Expiry</label>

                                <p>{`${card.exp_month}/${card.exp_year}`}</p>
                            </div>
                        </div>

                        <div className={style.row}>
                            <label>Enter CVC/CVV </label>

                            <div className={style.cvcInput}>
                                <CardCvcElement />
                            </div>

                            <p className={style.cvcError}>{this.state.cvcError}</p>
                        </div>
                    </div>

                    <CustomButton
                        type='submit'
                        action='checkout.place-order'
                        disabled={!isCvcComplete || cvcError || isCvcEmpty}
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmForm);
