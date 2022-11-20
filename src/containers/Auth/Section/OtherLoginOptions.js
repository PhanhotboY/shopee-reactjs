import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './OtherLoginOptions.module.scss';

class OtherLoginOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = [
            {
                name: 'Facebook',
                link: '#',
                bgSize: '325% 287.5%',
                bgPosition: '5.55556% 62.666667%',
            },
            {
                name: 'Google',
                link: '#',
                bgSize: '722.22222% 638.88889%',
                bgPosition: '83.92857% 5.15464%',
            },
        ];

        return (
            <div className={style.wrapper}>
                {options.map((option, index) => (
                    <a key={index} href={option.link}>
                        <div
                            className={style.icon}
                            style={{
                                backgroundSize: option.bgSize,
                                backgroundPosition: option.bgPosition,
                            }}
                        ></div>
                        <span>{option.name}</span>
                    </a>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherLoginOptions);
