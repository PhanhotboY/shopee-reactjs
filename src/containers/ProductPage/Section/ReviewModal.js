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
        // const wrapper = document.querySelector(`.${style.wrapper}`);
        // wrapper.onclick = (e) => e.stopPropagation();
    }

    handleSlideImage(direction) {
        let reviewingImage = this.state.reviewingImage;
        const length = this.props.images.length;

        if (direction === 'next') reviewingImage = ++reviewingImage * (reviewingImage !== length);

        if (direction === 'back') reviewingImage = !reviewingImage * length + --reviewingImage;

        this.setState({ reviewingImage });
    }

    render() {
        const { title, images } = this.props;

        return (
            <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
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

                    <button type='button' onClick={() => this.handleSlideImage('back')}>
                        <i className='fa-solid fa-chevron-left'></i>
                    </button>
                    <button type='button' onClick={() => this.handleSlideImage('next')}>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </div>

                <div className={style.thumbnail_container}>
                    <span className={style.title}>{title}</span>

                    <ul className='row'>
                        {images.map((image, index) => (
                            <li key={index}>
                                <div onClick={() => this.setState({ reviewingImage: index })}>
                                    <div className={style.dummy}></div>

                                    {this.state.reviewingImage === index && (
                                        <div className={style.border}></div>
                                    )}

                                    <div
                                        className={style.thumbnail}
                                        style={{
                                            background: `url('https://cf.shopee.vn/file/${image}') center / cover no-repeat`,
                                        }}
                                    ></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
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
