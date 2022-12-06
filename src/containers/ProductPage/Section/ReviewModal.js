import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ReviewModal.module.scss';

class ReviewModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewingImage: this.props.reviewingImage,
        };
    }

    componentDidMount() {
        const wrapper = document.querySelector(`.${style.wrapper}`);

        wrapper.addEventListener('click', (e) => e.stopPropagation());
    }

    handleSlideImage() {}

    render() {
        const { title, images } = this.props;

        return (
            <div className={style.wrapper}>
                <div className={style.img_container}>
                    <div className={style.dummy}></div>

                    <div
                        className={style.reviewing_img}
                        style={{
                            background: `url('https://cf.shopee.vn/file/${
                                images[this.state.reviewingImage]
                            }') center / cover no-repeat`,
                        }}
                    ></div>
                </div>

                <ul>
                    {images.map((image, index) => (
                        <li key={index}></li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
