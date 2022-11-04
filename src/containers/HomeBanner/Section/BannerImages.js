import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './BannerImages.module.scss';
import Slider from 'components/Slider';

class BannerImages extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className={`${style.wrapper}`}>
                <Slider
                    wrapper={style.wrapper}
                    images={[
                        '5b5de1582d99cbbe75a8f9a5c4dae1c2',
                        '74f991c5cebc1d54e93fdb85ca188aea',
                        '4600d65dfd84ba6ae747e392aee155db',
                        '5b8231ada25a0d6fe4ef77323c56b6b5',
                        '075da2106175e19fc56f6245cc3c0bc9',
                        'e40132c92106ab36637d0719f6ae4e7c',
                        '50e4e9c88778ce7f8d68f7a352434363',
                        '34843e423a9c44a53b1e67c624bcefab',
                        '73884abf37fdf0ef7c2ce8542d43f3d0',
                        '60f850eecc8c37eacf21fc829bee24bc',
                        'df9a6232c5e22a9bf2b2e06a7ba58caf',
                    ]}
                    height={235}
                    col={8}
                />
                <BannerImage
                    images={[
                        '8334d71ea5f0a74738cdf3e6101abc94',
                        'a13461ed5331c2c7bebac3ce70497f9d',
                    ]}
                />
            </div>
        );
    }
}

const BannerImage = ({ images }) => {
    return (
        <div className={`${style.banner_right} col-4`}>
            {images.map((image, index) => (
                <a href='#' key={index}>
                    <div
                        className={style.banner_image}
                        style={{
                            background: `url('https://cf.shopee.vn/file/${image}') center top / 100% no-repeat`,
                        }}
                    ></div>
                </a>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerImages);
