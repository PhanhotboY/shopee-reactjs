import { Component } from 'react';

import { toast } from 'react-toastify';
import { appService } from 'services';
import { connect } from 'react-redux';
import MethodList from './Section/MethodList';
import { push } from 'connected-react-router';

class SelectPaymentMethod extends Component {
    constructor(props) {
        super(props);

        this.state = {
            methods: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await appService.getPaymentMethods();

            if (res && !res.errType) return this.setState({ methods: res.payload });

            toast.warn(`${res.errType}: ${res.message}`);
        } catch (err) {
            toast.warn(err.message);
            console.log(err);
        }
    }

    render() {
        const methods = this.state.methods;

        return methods.length && <MethodList methods={methods} />;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectPaymentMethod);
