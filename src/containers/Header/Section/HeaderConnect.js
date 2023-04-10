import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './HeaderConnect.module.scss';

class HeaderConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDownloadPopup: false,
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div className={style.header_navbar_connects}>
                <div>
                    <a className='hover_eff--blur' href='/system'>
                        <FormattedMessage id='header.system' />
                    </a>
                </div>

                <div
                    className={style.navbar_connects_download}
                    onMouseOver={() => this.setState({ isDownloadPopup: true })}
                    onMouseLeave={() => this.setState({ isDownloadPopup: false })}
                >
                    <a className='hover_eff--blur' href='#'>
                        <FormattedMessage id='header.download' />
                    </a>

                    {this.state.isDownloadPopup && <DownloadPopup />}
                </div>

                <div>
                    <FormattedMessage id='header.connect' />
                    <acronym title='Upwork'>
                        <a
                            href='https://www.upwork.com/freelancers/~01d1468ac8390a376e'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img src='/upwork.ico' />
                        </a>
                    </acronym>

                    <acronym title='LinkedIn'>
                        <a
                            href='https://www.linkedin.com/in/phan-nguyen-sn353'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <i className='fa-brands fa-linkedin'></i>
                        </a>
                    </acronym>

                    <acronym title='Github'>
                        <a
                            href='https://github.com/PhanhotboY'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <i className='fa-brands fa-github'></i>
                        </a>
                    </acronym>
                </div>
            </div>
        );
    }
}

const DownloadPopup = (props) => {
    return (
        <div className={style.connects_download_wrapper}>
            <div className={style.connects_download_popover}>
                <img src='/appQRCode.png' alt='qr_thank_you' />

                <div className={style.connects_download_apps}>
                    <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/39f189e19764dab688d3850742f13718.png'
                        alt='download_appStore'
                    />
                    <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/f4f5426ce757aea491dce94201560583.png'
                        alt='download_googlePlay'
                    />
                    <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/1ae215920a31f2fc75b00d4ee9ae8551.png'
                        alt='download_appGallery'
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderConnect);
