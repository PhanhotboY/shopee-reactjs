import React, { Component } from 'react';
import { connect } from 'react-redux';

import carouselButtonsHandler from './lib/CarouselButtonsHandler';
import style from './Carousel.module.scss';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHover: false,
        };
    }

    componentDidMount() {
        const wrapper = document.querySelector(`.${this.props.wrapper} .${style.wrapper} ul`);
        const nextBtn = document.querySelector(`.${this.props.wrapper}  .${style.button_next}`);
        const backBtn = document.querySelector(`.${this.props.wrapper}  .${style.button_back}`);

        carouselButtonsHandler(
            wrapper,
            nextBtn,
            backBtn,
            Math.ceil(
                (this.props.length || this.props.catList.length) / this.props.verticalDisplay
            ),
            this.props.horizontalDisplay
        );
    }

    render() {
        const { children, catList, length, col, horizontalDisplay, verticalDisplay, height } =
            this.props;

        return (
            <div
                className={`${style.wrapper} col-${col}`}
                onMouseOver={() => this.setState({ isHover: true })}
                onMouseLeave={() => this.setState({ isHover: false })}
                style={{ height }}
            >
                <div className={style.carousel}>
                    <CarouselContainer
                        catList={catList}
                        length={length}
                        horizontalDisplay={horizontalDisplay}
                        verticalDisplay={verticalDisplay}
                        children={children}
                    />
                </div>

                <CarouselButton direction='back' isHover={this.state.isHover} />
                <CarouselButton direction='next' isHover={this.state.isHover} />
            </div>
        );
    }
}

const CarouselContainer = ({ catList, length, horizontalDisplay, verticalDisplay, children }) => {
    const child = Array.isArray(children) ? children[0] : children;

    return (
        <ul
            style={{
                width: `${
                    Math.ceil((length || catList.length) / verticalDisplay) *
                    (100 / horizontalDisplay)
                }%`,
            }}
        >
            {catList.map((cat, index) => (
                <li
                    key={index}
                    style={{
                        width: `${100 / Math.ceil((length || catList.length) / verticalDisplay)}%`,
                        height: `${100 / verticalDisplay}%`,
                    }}
                >
                    {React.cloneElement(child, {
                        data: cat,
                    })}
                </li>
            ))}

            {Array.isArray(children) && [...children].splice(1)}
        </ul>
    );
};

const CarouselButton = ({ direction, isHover }) => {
    return (
        <button
            className={`${style['button_' + direction]} ${style.carousel_buttons} ${
                style[`buttons--${isHover ? 'active' : 'hint'}`]
            }`}
            type='button'
        >
            <i className={`fa-solid fa-chevron-${direction === 'next' ? 'right' : 'left'}`}></i>
        </button>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
