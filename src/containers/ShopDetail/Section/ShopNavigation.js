import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ShopNavigation.module.scss';
import { FormattedMessage } from 'react-intl';

class ShopDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
        };
    }

    async componentDidMount() {
        const navigators = document.querySelectorAll(`.${style.wrapper} li`);

        navigators.forEach((navigator) => {
            navigator.onclick = () => {
                navigators.forEach((li) => li.classList.add('border-0'));
                navigator.classList.remove('border-0');
            };
        });
    }

    render() {
        const navigators = this.props.navigators || [];

        return (
            <ul className={`${style.wrapper}`}>
                {navigators.map((navigator, index) => (
                    <NavigatorTag
                        key={index}
                        name={navigator.name}
                        link={navigator.link}
                        index={index}
                    />
                ))}
            </ul>
        );
    }
}

const NavigatorTag = ({ name, link, index }) => {
    return (
        <li className={`col-2 ${index ? 'border-0' : ''}`}>
            <a href={link}>
                <span>
                    <FormattedMessage id={name} />
                </span>
            </a>
        </li>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
