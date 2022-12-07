import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './Description.module.scss';
import BreadCrumbs from 'components/BreadCrumbs';

class Description extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const product = this.props.product;

        return (
            <div className={style.wrapper}>
                <Specification product={product} />

                <div className={style.description}>
                    <div className={style.header}>
                        <span>
                            <FormattedMessage id='product.description' />
                        </span>
                    </div>

                    <div className={style.body}>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const Specification = ({ product }) => {
    const breadcrumbs = [
        { name: 'home', link: '/' },
        { name: product.category, link: `/search?keyword=${product.category}` },
    ];

    return (
        <div className={style.specification}>
            <div className={style.header}>
                <span>
                    <FormattedMessage id='product.specifications' />
                </span>
            </div>

            <div className={style.body}>
                <div>
                    <span className={style.name}>
                        <FormattedMessage id='product.category' />
                    </span>

                    <BreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div>
                    <span className={style.name}>
                        <FormattedMessage id='product.stock' />
                    </span>

                    <span>{product.totalRemainder}</span>
                </div>

                <div>
                    <span className={style.name}>
                        <FormattedMessage id='product.ships-from' />
                    </span>

                    <span>{product.address}</span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
