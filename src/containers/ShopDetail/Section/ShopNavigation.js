import { connect } from 'react-redux';
import { Component } from 'react';

import { history } from '../../../redux';
import style from './ShopNavigation.module.scss';
import { FormattedMessage } from 'react-intl';

class ShopDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: '#',
        };
    }

    async componentDidMount() {
        this.unlisten = history.listen((location, action) => {
            this.setState({ currPage: location.hash || '#' });
        });
    }

    componentWillUnmount() {
        this.unlisten();
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
                        currPage={this.state.currPage}
                    />
                ))}
            </ul>
        );
    }
}

const NavigatorTag = ({ name, link, currPage }) => {
    return (
        <li className={`col-2 ${currPage === link ? '' : 'border-0'}`}>
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
