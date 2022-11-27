import { connect } from 'react-redux';
import { Component } from 'react';

import ShopHeader from './ShopHeader';
import ShopBody from './ShopBody';

class ShopDetail extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const header = document.querySelector('header');
        header.style.position = 'relative';
    }

    componentWillUnmount() {
        const header = document.querySelector('header');
        header.style.position = '';
    }

    render() {
        return (
            <>
                <ShopHeader />

                <ShopBody />
            </>
        );
    }
}

const catList = [
    { name: 'discount' },
    { name: 'discount' },
    { name: 'discount' },
    { name: 'discount' },
    { name: 'discount' },
    { name: 'discount' },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
