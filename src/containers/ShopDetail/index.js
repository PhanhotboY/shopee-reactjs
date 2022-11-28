import { connect } from 'react-redux';
import { Component } from 'react';

import userService from 'services/userService';
import ShopHeader from './ShopHeader';
import ShopBody from './ShopBody';

class ShopDetail extends Component {
    constructor(props) {
        super(props);

        this.state = { userInfo: {} };
    }

    async componentDidMount() {
        const userId = window.location.pathname.substring(7);

        try {
            const res = await userService.handleGetUser(userId);

            if (res && !res.errType) {
                this.setState({ userInfo: res.userInfo });
            } else {
                console.log('>>>>Shop does not exist!');
                window.history.back();
            }
        } catch (err) {
            console.log('>>>Error: ', err);
            window.history.back();
        }

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
                <ShopHeader userInfo={this.state.userInfo} />

                <ShopBody userInfo={this.state.userInfo} />
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
