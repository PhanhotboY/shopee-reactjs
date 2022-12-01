import { connect } from 'react-redux';
import { Component } from 'react';

import './index.scss';
import { history } from '../../redux';
import { CommonUtils } from 'utils';
import SearchSideBar from './SearchSideBar';
import GoToTopBtn from 'containers/System/Section/GoToTopBtn';
import SearchContent from './SearchContent';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            queryObj: CommonUtils.splitQueryIntoObj(history.location.search),
        };
    }

    async componentDidMount() {
        this.unlisten = history.listen((location) => {
            this.setState({ queryObj: CommonUtils.splitQueryIntoObj(location.search) });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <div className='row'>
                <div className='col-2'>
                    <SearchSideBar
                        categoryOptions={categoryOptions}
                        addressOptions={addressOptions}
                        brandOptions={brandOptions}
                        shopTypeOptions={shopTypeOptions}
                        queryObj={this.state.queryObj}
                    />
                </div>

                <SearchContent products={products} queryObj={this.state.queryObj} />

                <GoToTopBtn />
            </div>
        );
    }
}

const categoryOptions = [
    'Cây cảnh và hạt giống (18k+)',
    'Chậu & dụng cụ trồng cây (6k+)',
    'Hạt & củ giống (4k+)',
];

const addressOptions = [
    'Ho Chi Minh',
    'Ha Noi',
    'Da Lat',
    'District 1',
    'Binh Thuan',
    'Xuan An',
    'Cho Lau',
];

const brandOptions = ['Mercedes', 'Porsche', 'Lamborghini', 'Ferrari'];

const shopTypeOptions = ['Preferred Shop', 'Preferred Shop +', 'Shop Mall'];

const products = [
    {
        id: 1,
        title: 'Sen đá sỏi hường SONDA GARDEN size mini 2.5-4cm, cây cảnh trang trí nhà cửa, lỗi 1 đổi 1',
        originPrice: 15000,
        discount: 33,
        sold: 2403,
        images: ['5af81d807bdf38c386c8507248ef68b3'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
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
    },
    {
        id: 3,
        title: 'Sen đá kim cương tím Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
        originPrice: 13000,
        discount: 33,
        sold: 619,
        images: ['49d948af70514597ff4648e70e249de8'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
    {
        id: 4,
        title: 'Sen đá dù hồng Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
        originPrice: 10000,
        discount: 10,
        sold: 312,
        images: ['ee5dddd0bfa4044e7ed7ca7a3f37f18a'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
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
    },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
