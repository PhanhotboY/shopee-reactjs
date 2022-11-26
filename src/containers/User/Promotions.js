import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notifications from './Section/Notifications';

class Promotions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationArr: [
                {
                    thumbnail: 'c16ec92f482a3e22088c8b56a4dec9be',
                    title: '"siêu ưu đãi" đến 50%',
                    content:
                        'Áo khoác, giá treo màn hình, loa Bluetooth,... Thêm Voucher Freeship 10K đơn 0Đ. Gì cũng rẻ, mua là Freeship',
                },
                {
                    thumbnail: 'c1937d9c106cdcf17e6e525117195086',
                    title: 'voucher 1.5 triệu săn đồ điện tử',
                    content:
                        'Apple Ipad Gen 9th chỉ với 7tr990.Điện thoại, gia dụng, chuột máy tính,... Hàng loạt Deal giảm sâu đến 50%. Yêu đồ công nghệ - Sao nỡ bỏ qua!',
                },
            ],
        };
    }

    async componentDidMount() {}

    render() {
        return (
            <Notifications
                isViewDetail={true}
                notificationArr={this.state.notificationArr}
                page='promotions'
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
