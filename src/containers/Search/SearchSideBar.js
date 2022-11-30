import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './SearchSideBar.module.scss';
import PriceRangeInput from './Section/PriceRangeInput';
import CustomButton from 'components/CustomButton';
import RatingOptions from './Section/RatingOptions';

class SearchSideBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const optionContainers = document.querySelectorAll(`.${style.category} .${style.options}`);

        optionContainers.forEach((optionContainer) => {
            const options = optionContainer.querySelectorAll(`:scope > *`);

            if (options.length > 4) {
                for (let i = 4; i < options.length; i++) {
                    options[i].classList.add('d-none');
                }

                const dropDownBtn = optionContainer.nextElementSibling;
                dropDownBtn.classList.add('d-block');
                dropDownBtn.onclick = () => {
                    options.forEach((option) => {
                        option.classList.remove('d-none');
                        dropDownBtn.classList.remove('d-block');
                    });
                };
            }
        });
    }

    render() {
        return (
            <div className={`${style.wrapper}`}>
                <div className={style.header}>
                    <i className='fa-solid fa-filter'></i>
                    <span>
                        <FormattedMessage id='search.search-filter' />
                    </span>
                </div>

                <div className={style.body}>
                    <Category name='search.by-category' options={this.props.categoryOptions} />

                    <Category name='search.shipped-from' options={this.props.addressOptions} />

                    <Category name='search.brands' options={this.props.brandOptions} />

                    <Category name='search.price-range'>
                        <PriceRangeInput />
                    </Category>

                    <Category name='search.shop-type' options={this.props.shopTypeOptions} />

                    <Category name='search.rating'>
                        <RatingOptions />
                    </Category>

                    <CustomButton action='search.clear-all' />
                </div>
            </div>
        );
    }
}

const Category = ({ name, options = [], children }) => {
    return (
        <div className={style.category}>
            <span>
                <FormattedMessage id={name} />
            </span>

            <div className={style.options}>
                {options.map((option, index) => (
                    <label key={index}>
                        <input type='checkbox' />
                        <span>{option}</span>
                    </label>
                ))}

                {children}
            </div>

            <DropDownBtn />
        </div>
    );
};

const DropDownBtn = ({}) => {
    return (
        <div className={style.dropdown}>
            <span>
                <FormattedMessage id='search.more' />
            </span>
            <i className='fa-solid fa-chevron-down'></i>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSideBar);
