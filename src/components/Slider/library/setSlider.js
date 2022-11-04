import interval from './interval.js';

const setSlider = function (element, slideCount, currentSlide, slideTime) {
    let n = currentSlide;

    const sliderHandler = {};

    sliderHandler.currentSlide = n;

    sliderHandler.handleSlider = () => {
        element.style.transform = `translateX(
            -${n * (100 / slideCount)}%
        ) translateX(0px)`;

        if (n > slideCount - 2 || n < 1) {
            n = n > slideCount - 2 ? 1 : slideCount - 2;

            setTimeout(() => {
                element.style.transitionDuration = '10ms';
                element.style.transform = `translateX(-${n * (100 / slideCount)}%) translateX(0px)`;
            }, 500);
        }
        element.style.transitionDuration = null;

        sliderHandler.currentSlide = n;
    };

    const sliderInterval = interval(() => {
        n++;
        sliderHandler.handleSlider();
    }, slideTime);

    sliderHandler.next = () => {
        n++;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    sliderHandler.back = () => {
        n--;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    sliderHandler.moveto = (position) => {
        n = position;
        sliderHandler.handleSlider();

        sliderInterval.restart();
    };

    return sliderHandler;
};

export default setSlider;
