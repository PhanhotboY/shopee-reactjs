import { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmForm from './Section/ConfirmForm';
import { ElementsConsumer } from '@stripe/react-stripe-js';

class Checkout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ElementsConsumer>
                {({ stripe, elements }) => (
                    <ConfirmForm stripe={stripe} elements={elements} {...this.props} />
                )}
            </ElementsConsumer>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
