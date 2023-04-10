import { Component } from 'react';

import { ElementsConsumer } from '@stripe/react-stripe-js';
import PaymentMethodForm from './Section/PaymentMethodForm';

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ElementsConsumer>
                {({ stripe, elements }) => (
                    <PaymentMethodForm
                        stripe={stripe}
                        elements={elements}
                        isRedirectedFromCart={this.props.isRedirectedFromCart}
                    />
                )}
            </ElementsConsumer>
        );
    }
}

export default PaymentMethod;
