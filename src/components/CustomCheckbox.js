import { Component } from 'react';

import style from './CustomCheckbox.module.scss';

class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, checked, onChange } = this.props;

        return (
            <label className={style.custom_checkbox}>
                <input type='checkbox' name={name} checked={checked} onChange={onChange} />

                <div className={style.check_box}></div>
            </label>
        );
    }
}

export default CustomCheckbox;
