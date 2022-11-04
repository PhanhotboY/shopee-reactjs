import interval from '../../Slider/library/interval';

const countDownHandler = (hourSelector, minuteSelector, secondSelector, duration) => {
    let timeLenght = duration;
    let hour = Math.floor(timeLenght / 3600);
    let minute = Math.floor((timeLenght % 3600) / 60);
    let second = Math.floor((timeLenght % 3600) % 60);

    const slider10Hour = document.querySelector(`.${hourSelector} > div:first-child`);
    const slider10Minute = document.querySelector(`.${minuteSelector} > div:first-child`);
    const slider10Second = document.querySelector(`.${secondSelector} > div:first-child`);

    const slider1Hour = document.querySelector(`.${hourSelector} > div:last-child`);
    const slider1Minute = document.querySelector(`.${minuteSelector} > div:last-child`);
    const slider1Second = document.querySelector(`.${secondSelector} > div:last-child`);

    const setTime = (slider10, slider1, time) => {
        const slide1Space = 100 / 11;
        const slide10Space = 100 / 7;
        let timeInteger = time < 9 ? 0 : 6 - Math.floor(time / 10);
        let timeRemainder = 10 - Math.floor(time % 10);

        slider1.style = `transform: translateY(-${timeRemainder * slide1Space}%)`;

        slider10.style = `transform: translateY(-${timeInteger * slide10Space}%)`;

        if (timeRemainder > 9) {
            timeRemainder = 0;

            setTimeout(() => {
                new Promise((resolve, reject) => {
                    slider1.style = 'transition-duration: 0ms';

                    resolve();
                    reject(new Error());
                })
                    .then(() => (slider1.style.transform = `translateY(0)`))
                    .catch((err) => console.debug(err));
            }, 500);
        }

        if (timeInteger > 5) {
            timeInteger = 0;

            setTimeout(() => {
                slider10.style = 'transition-duration: 0ms';

                slider10.style.transform = `translateY(0)`;
            }, 500);
        }
    };

    setTime(slider10Hour, slider1Hour, hour);
    setTime(slider10Minute, slider1Minute, minute);
    setTime(slider10Second, slider1Second, second);

    const handleTime = (countdownInterval) => {
        if (timeLenght < 0) {
            countdownInterval.stop();
            return;
        }

        second--;

        if (second < 0) {
            second = 59;
            minute--;

            if (minute < 0) {
                if (hour > 0) {
                    minute = 59;
                    hour--;
                    setTime(slider10Hour, slider1Hour, hour);
                } else minute = 0;
            }

            setTime(slider10Minute, slider1Minute, minute);
        }
        setTime(slider10Second, slider1Second, second);
    };

    const countdownInterval = interval(() => {
        timeLenght--;
        handleTime(countdownInterval);
    }, 1000);
};

export default countDownHandler;
