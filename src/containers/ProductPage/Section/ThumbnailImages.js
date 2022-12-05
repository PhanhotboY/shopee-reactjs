import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ThumbnailImages.module.scss';

class ThumbnailImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
        };
    }

    render() {
        const { images, reviewingImage, hoverHandler, overlay } = this.props;

        return (
            <div className={`row ${style.thumbnail_wrapper}`}>
                <ul className={`row ${style.thumbnail_container}`}>
                    {images.map((image, index) => (
                        <li key={index} className='col-20pc'>
                            <div
                                style={{
                                    background: `url('https://cf.shopee.vn/file/${image}') center / contain no-repeat`,
                                    borderColor:
                                        reviewingImage !== index ? 'transparent' : undefined,
                                }}
                                onMouseOver={() => hoverHandler(index)}
                            >
                                {index === 0 && (
                                    <div
                                        className={style.overlay}
                                        style={{
                                            background: `url('https://cf.shopee.vn/file/${overlay}') center / contain no-repeat`,
                                        }}
                                    ></div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <button type='button' onClick={() => handleSlide('left', images.length)}>
                    <i className='fa-solid fa-chevron-left'></i>
                </button>
                <button type='button' onClick={() => handleSlide('right', images.length)}>
                    <i className='fa-solid fa-chevron-right'></i>
                </button>
            </div>
        );
    }
}

const handleSlide = (direction, length) => {
    const container = document.querySelector(`.${style.thumbnail_container}`);
    const step = 100 / 5;
    const breakPoint = -step * (length - 5);

    let left =
        Number(container.style.left.slice(0, -1) || 0) + (direction === 'right' ? -step : step);

    if (left < breakPoint) left = breakPoint;

    if (left > 0) left = 0;

    container.style.left = left + '%';
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailImages);
