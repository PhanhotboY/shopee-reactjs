import React, { Component } from 'react';

import style from '../UserManage.module.scss';

class GoToTopBtn extends Component {
    componentDidMount() {
        window.addEventListener('scroll', handleToggleScrollTop);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', handleToggleScrollTop);
    }

    render() {
        return (
            <div className={style.gototop_btn} onClick={goToTopHandler}>
                <i className='fa-solid fa-chevron-up'></i>
            </div>
        );
    }
}

const handleToggleScrollTop = (event) => {
    if (window.scrollY >= 300) {
        event.target.querySelector(`.${style.gototop_btn}`).style.display = 'block';
    } else event.target.querySelector(`.${style.gototop_btn}`).style = '';
};

const goToTopHandler = () => {
    window.scrollTo(0, 0);
};

export default GoToTopBtn;
