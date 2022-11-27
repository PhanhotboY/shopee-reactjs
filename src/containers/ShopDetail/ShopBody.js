import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ShopBody.module.scss';
import Carousel from 'components/Carousel';
import HeaderTitle from 'containers/HomeContent/Section/HeaderTitle';
import { FormattedMessage } from 'react-intl';

class ShopDetail extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {}

    render() {
        return (
            <div className={`grid ${style.body}`}>
                <div className={style.vouchers}>
                    <HeaderTitle title={<FormattedMessage id='shop.shop-vouchers' />} border={0} />

                    <Carousel
                        wrapper={style.body}
                        col='12'
                        catList={catList}
                        horizontalDisplay={3}
                        verticalDisplay={1}
                        height={121}
                    >
                        <VoucherTag />
                    </Carousel>
                </div>

                <div id='product-list'>product listS</div>
            </div>
        );
    }
}

const VoucherTag = ({ data }) => {
    return (
        <div className={style.voucher_tag}>
            <div className={style.voucher_info}>
                <span>{data.name}</span>

                <span>Min. Spend 0d</span>

                <span>Specific Product(s)</span>

                <div className={style.total}>
                    <div className={style.process}></div>
                </div>

                <div>
                    <span>64% used</span>
                    <span>Valid Till: 30.11.2022</span>
                </div>
            </div>

            <div className={style.voucher_claim}>
                <button>
                    <FormattedMessage id='shop.claim' />
                </button>
            </div>
        </div>
    );
};

const catList = [
    { name: 'discount 1' },
    { name: 'discount 12' },
    { name: 'discount 123' },
    { name: 'discount 1234' },
    { name: 'discount 12345' },
    { name: 'discount 123456' },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
