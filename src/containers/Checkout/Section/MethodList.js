import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PATH } from 'utils';
import { appService } from 'services';
import style from './MethodList.module.scss';
import getCardImage from 'utils/getCardImage';
import { toast } from 'react-toastify';

class MethodList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            methods: props.methods,
            order: { ...props.order },
        };
    }

    async onClickHandler(method) {
        const order = {
            amount: 100000,
            currency: 'vnd',
            paymentMethodId: method.id,
        };

        try {
            const res = await appService.createPaymentIntent({ order });

            if (res && !res.errType)
                return this.redirectToCheckoutPage({ order, method, intent: res.payload });

            toast.warn(`${res.errType}: ${res.message}`);
        } catch (err) {
            toast.warn(err.message);
            console.log(err);
        }
    }

    redirectToCheckoutPage(state) {
        const { navigate } = this.props;
        const path = PATH.CHECKOUT;
        navigate(path, state);
    }

    render() {
        return (
            <div className={`grid ${style.wrapper}`}>
                {this.state.methods.map((method, index) => {
                    const { card } = method;

                    return (
                        <div
                            key={index}
                            className={style.card_wrapper}
                            onClick={() => this.onClickHandler(method)}
                        >
                            <div>
                                <div
                                    className={style.logo}
                                    style={{
                                        background: `url('${getCardImage(card.brand)}') 
                                                    center center / contain no-repeat`,
                                    }}
                                />

                                <div className={style.card_info}>
                                    <span>{`${card.brand} *** ${card.last4}`}</span>

                                    <span className={style.name}>
                                        {method.billing_details.name}
                                    </span>
                                </div>
                            </div>

                            <span>{`Expires: ${card.exp_month}/${card.exp_year}`}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path, state) => dispatch(push(path, state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MethodList);
