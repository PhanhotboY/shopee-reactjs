import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './index.module.scss';
import CustomCheckbox from 'components/CustomCheckbox';
import CartTag from './Section/CartTag';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [
                [
                    {
                        id: 1,
                        title: 'Sen đá sỏi hường SONDA GARDEN size mini 2.5-4cm, cây cảnh trang trí nhà cửa, lỗi 1 đổi 1',
                        originPrice: 15000,
                        discount: 33,
                        sold: 2403,
                        images: ['5af81d807bdf38c386c8507248ef68b3'],
                        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                        flag: 'db89dfecef669d7a42af1a6be6783789',
                        address: 'Ho Chi Minh',
                        userId: 3,
                        quantity: 1,
                    },
                    {
                        id: 2,
                        title: 'Sen đá bắp cải aurora purple Đà Lạt size bé cây cảnh trang trí nhà cửa Lolita garden',
                        originPrice: 25000,
                        discount: 24,
                        sold: 798,
                        images: ['c6c46b364a61740a5f03c99a1dbaa846'],
                        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                        flag: 'db89dfecef669d7a42af1a6be6783789',
                        address: 'Ho Chi Minh',
                        userId: 3,
                        quantity: 2,
                    },
                ],
                [
                    {
                        id: 3,
                        title: 'Sen đá kim cương tím Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
                        originPrice: 13000,
                        discount: 33,
                        sold: 619,
                        images: ['49d948af70514597ff4648e70e249de8'],
                        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                        flag: 'db89dfecef669d7a42af1a6be6783789',
                        address: 'Ho Chi Minh',
                        userId: 1,
                        quantity: 4,
                    },
                ],
                [
                    {
                        id: 4,
                        title: 'Sen đá dù hồng Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
                        originPrice: 10000,
                        discount: 10,
                        sold: 312,
                        images: ['ee5dddd0bfa4044e7ed7ca7a3f37f18a'],
                        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                        flag: 'db89dfecef669d7a42af1a6be6783789',
                        address: 'Ho Chi Minh',
                        userId: 6,
                        quantity: 2,
                    },
                    {
                        id: 5,
                        title: 'Sen đá sedum huyết rồng Đà Lạt size mini cây cảnh trang trí nhà cửa Toro garden',
                        originPrice: 10000,
                        discount: 10,
                        sold: 641,
                        images: ['e056ac7d016a7478d43994aa95849b1f'],
                        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                        flag: 'db89dfecef669d7a42af1a6be6783789',
                        address: 'Ho Chi Minh',
                        userId: 9,
                        quantity: 1,
                    },
                ],
                [
                    {
                        id: 6,
                        title: 'Sen đá kim cương tím bụi nhiều đầu 9-10cm, Hàng Đà Lạt, Lỗi 1 đổi 1',
                        originPrice: 150000,
                        discount: 0,
                        sold: 51,
                        images: ['bc77b8af10947265603fe3be21b3dd40'],
                        overlay: '3266b2eebb590e79bd377b8e75181914',
                        address: 'Ho Chi Minh',
                        flag: '',
                        userId: 12,
                        quantity: 1,
                    },
                ],
            ],
            isCheckedAll: false,
            selectedCarts: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCarts.length !== prevState.selectedCarts.length) {
            const { cart, selectedCarts } = this.state;

            if (selectedCarts.length === cart.length) {
                this.setState({ isCheckedAll: true });
            } else {
                this.setState({ isCheckedAll: false });
            }
        }
    }

    handleOnChangeAll(e) {
        const isCheckedAll = e.target.checked;
        let { selectedCarts, cart } = this.state;

        if (isCheckedAll) {
            selectedCarts = cart.reduce((prevArr, currArr) => {
                prevArr.push(currArr[0].userId);
                return prevArr;
            }, []);
        } else {
            selectedCarts = [];
        }

        this.setState({ isCheckedAll, selectedCarts: [...selectedCarts] });
    }

    handleOnChangeCart(checked, id) {
        const selectedCarts = [...this.state.selectedCarts];

        if (checked && selectedCarts.indexOf(id) === -1) selectedCarts.push(id);

        if (!checked && selectedCarts.indexOf(id) !== -1)
            selectedCarts.splice(selectedCarts.indexOf(id), 1);

        this.setState({ selectedCarts });
    }

    render() {
        const { isCheckedAll } = this.state;

        return (
            <div className={`grid ${style.wrapper}`}>
                <Tips />

                <BodyHeader
                    isCheckedAll={isCheckedAll}
                    onChangeHandler={this.handleOnChangeAll.bind(this)}
                />

                {this.state.cart.map((products, index) => (
                    <CartTag
                        key={index}
                        products={products}
                        isCheckedAll={isCheckedAll}
                        onChangeHandler={this.handleOnChangeCart.bind(this)}
                    />
                ))}
            </div>
        );
    }
}

const BodyHeader = ({ isCheckedAll, onChangeHandler }) => {
    return (
        <div className={style.body_header}>
            <div className={style.select_all}>
                <CustomCheckbox checked={isCheckedAll} onChange={onChangeHandler} />

                <span>
                    <FormattedMessage id='cart.product' />
                </span>
            </div>

            <ProductAttributes />
        </div>
    );
};

const ProductAttributes = () => {
    return (
        <div className={style.attributes}>
            <span>
                <FormattedMessage id='cart.unit-price' />
            </span>

            <span>
                <FormattedMessage id='cart.quantity' />
            </span>

            <span>
                <FormattedMessage id='cart.total-price' />
            </span>

            <span>
                <FormattedMessage id='cart.actions' />
            </span>
        </div>
    );
};

const Tips = () => {
    return (
        <div className={style.notification}>
            <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/1cdd37339544d858f4d0ade5723cd477.png' />

            <span>
                <FormattedMessage id='cart.notification' />
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
