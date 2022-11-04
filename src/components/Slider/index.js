import React, { Component } from 'react';
import { connect } from 'react-redux';

import setSlider from './library/setSlider';
import style from './Slider.module.scss';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDisplayButton: false,
            currentSlide: 1,
            isDisabledButtons: false,
        };
    }

    componentDidMount() {
        const carousel = document.querySelector(`.${this.props.wrapper} .${style.wrapper} ul`);

        this.slider = setSlider(
            carousel,
            this.props.images.length + 2,
            this.state.currentSlide,
            4000
        );
    }

    goBack = () => {
        this.setState({ isDisabledButtons: true });
        this.slider.back();
    };

    goAhead = () => {
        this.setState({ isDisabledButtons: true });
        this.slider.next();
    };

    goTo = (position) => {
        this.setState({ isDisabledButtons: true });
        this.slider.moveto(position);

        setTimeout(() => {
            this.setState({ isDisabledButtons: false });
        }, 500);
    };

    render() {
        const { images, height, col } = this.props;

        return (
            <div
                className={`${style.wrapper} col-${col}`}
                style={{ height }}
                onMouseOver={() => this.setState({ isDisplayButton: true })}
                onMouseLeave={() => this.setState({ isDisplayButton: false })}
                onTransitionEnd={() =>
                    this.setState({
                        currentSlide: this.slider.currentSlide,
                        isDisabledButtons: false,
                    })
                }
            >
                <Carousel images={images} height={height} />
                {this.state.isDisplayButton && (
                    <>
                        <SliderButton
                            direction='back'
                            goBack={this.goBack}
                            isDisabledButtons={this.state.isDisabledButtons}
                        />
                        <SliderButton
                            direction='next'
                            goAhead={this.goAhead}
                            isDisabledButtons={this.state.isDisabledButtons}
                        />
                    </>
                )}
                <StardustsRow
                    amount={images.length}
                    currentSlide={this.state.currentSlide}
                    goTo={this.goTo}
                />
            </div>
        );
    }
}

const Carousel = ({ images, height }) => {
    return (
        <ul
            style={{
                width: `${(images.length + 2) * 100}%`,
                transform: `translateX(${100 / -(images.length + 2)}%) translateX(0px)`,
            }}
        >
            <SlideImage
                key={images.length}
                image={images.at(-1)}
                width={`${100 / (images.length + 2)}%`}
                height={height}
            />

            {images.map((image, index) => (
                <SlideImage
                    key={index}
                    image={image}
                    width={`${100 / (images.length + 2)}%`}
                    height={height}
                />
            ))}

            <SlideImage
                key={-1}
                image={images[0]}
                width={`${100 / (images.length + 2)}%`}
                height={height}
            />
        </ul>
    );
};

const SlideImage = ({ image, width, height }) => {
    return (
        <li style={{ width }}>
            <a href='#'>
                <div
                    className={style.content_image}
                    style={{
                        background: `url('https://cf.shopee.vn/file/${image}') center top / 100% no-repeat`,
                        paddingTop: height,
                    }}
                ></div>
            </a>
        </li>
    );
};

const SliderButton = ({ direction, goBack, goAhead, isDisabledButtons }) => {
    return (
        <button
            className={`${style.slider_button} ${style[`slider_button_${direction}`]}`}
            disabled={isDisabledButtons}
            onClick={goBack || goAhead}
        >
            <i className={`fa-solid fa-chevron-${direction === 'next' ? 'right' : 'left'}`}></i>
        </button>
    );
};

const StardustsRow = ({ amount, currentSlide, goTo }) => {
    const stardusts = [];
    for (let count = 0; count < amount; count++)
        stardusts.push(
            <Stardust
                key={count}
                isActive={currentSlide === count + 1}
                goTo={goTo}
                position={count + 1}
            />
        );

    return <div className={style.stardusts_container}>{stardusts}</div>;
};

const Stardust = ({ isActive, goTo, position }) => {
    return (
        <div
            className={`${style.stardust} ${isActive && style['stardust--active']}`}
            onClick={() => goTo(position)}
        ></div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
