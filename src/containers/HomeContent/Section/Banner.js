import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './Banner.module.scss';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const { linkList, image } = this.props;
        return (
            <div
                className={`content_wrapper ${style.banner}`}
                style={{
                    background: `url('https://cf.shopee.vn/file/${image}') center/cover`,
                }}
            >
                <LinkList linkList={linkList} />
            </div>
        );
    }
}

const LinkList = ({ linkList }) => {
    return linkList.map((link, index) => <LinkBanner key={index} link={link} />);
};

const LinkBanner = ({ link }) => {
    return <a href={link}></a>;
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
