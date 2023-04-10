import { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { Country, State, City } from 'country-state-city';
import { CardElement } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import { appService, userService } from 'services';
import style from './PaymentMethodForm.module.scss';
import { userUpdateSuccess } from 'store/actions';
import CustomButton from 'components/CustomButton';

class PaymentMethodForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardInfo: {
                name: '',
                expiry: '',
                number: '',
                address: {
                    line: '',
                    postalCode: '',
                },
            },
            selectedLocation: { country: {}, city: {}, state: {} },
            locations: { countries: '', states: '', cities: '' },
        };
    }

    componentDidMount() {
        const countries = this.parseForSelect(Country.getAllCountries());

        this.setState((state) => ({ ...state, locations: { ...state.locations, countries } }));
    }

    handleChangeAddressLine(e) {
        const { value } = e.target;

        this.setState((state) => ({
            ...state,
            cardInfo: { ...state.cardInfo, address: { ...state.cardInfo.address, line: value } },
        }));
    }

    handleChangeName(e) {
        const { value } = e.target;

        this.setState((state) => ({ ...state, cardInfo: { ...state.cardInfo, name: value } }));
    }

    parseForSelect(arr) {
        return arr.map((item) => ({
            label: item.name,
            value: item.isoCode ? item.isoCode : item.name,
        }));
    }

    handleSelectCountry(country) {
        const states = this.parseForSelect(State.getStatesOfCountry(country.value));

        this.setState((state) => ({
            ...state,
            selectedLocation: { ...state.selectedLocation, country },
        }));
        this.setState((state) => ({ ...state, locations: { ...state.locations, states } }));
    }

    handleSelectState(state) {
        const cities = this.parseForSelect(
            City.getCitiesOfState(this.state.selectedLocation.country.value, state.value)
        );

        this.setState((currState) => ({
            ...currState,
            selectedLocation: { ...currState.selectedLocation, state },
        }));
        this.setState((state) => ({ ...state, locations: { ...state.locations, cities } }));
    }

    handleSelectCity(city) {
        this.setState((state) => ({
            ...state,
            selectedLocation: { ...state.selectedLocation, city },
        }));
    }

    handleSubmit(e) {
        e.preventDefault();

        const { cardInfo, selectedLocation } = this.state;
        const { stripe, elements } = this.props;

        const address = { ...cardInfo.address, ...selectedLocation };
        const billingDetails = {
            name: cardInfo.name,
            address: {
                country: address.country.value,
                state: address.state.value,
                city: address.city.value,
                line1: address.line,
            },
        };

        try {
            stripe
                .createPaymentMethod({
                    type: 'card',
                    billing_details: billingDetails,
                    card: elements.getElement(CardElement),
                })
                .then((resp) => {
                    appService
                        .attachPaymentMethod({ paymentMethod: resp.paymentMethod })
                        .then(async (resp) => {
                            toast.success(resp.message);

                            const { userInfo } = await userService.getCurrentUser();
                            await this.props.userUpdateSuccess(userInfo);

                            this.props.isRedirectedFromCart
                                ? this.redirectToCartPage({ isRedirectedFromAddPayMethod: true })
                                : this.redirectToHomePage();
                        })
                        .catch((err) => {
                            toast.warn(err.message);
                        });
                });
        } catch (err) {
            toast.warn(err.message);
        }
    }

    redirectToCartPage(state) {
        const { navigate } = this.props;
        const path = '/cart';
        return navigate(path, state);
    }

    redirectToHomePage() {
        const { navigate } = this.props;
        const path = '/';
        return navigate(path);
    }

    render() {
        const { locations, selectedLocation } = this.state;

        return (
            <div className={style.wrapper}>
                <div className={style.innerWrapper}>
                    <div className={style.title}>Add Payment Method</div>
                    <div className={style.row}>
                        <label>Cardholder Name</label>
                        <input
                            onChange={this.handleChangeName.bind(this)}
                            type='text'
                            name='name'
                            placeholder='Enter card holder name'
                        />
                    </div>
                    <div className={style.rowPaymentInput}>
                        <CardElement />
                    </div>

                    <div className={style.addressWrapper}>
                        <div className={style.row}>
                            <label>Address</label>
                            <input
                                onChange={this.handleChangeAddressLine.bind(this)}
                                type='text'
                                name='address'
                                placeholder='Enter Full Address'
                            />
                        </div>
                        <div className={style.rowSelect}>
                            <div>
                                <label>Country</label>
                                <Select
                                    isClearable={true}
                                    isSearchable={true}
                                    name='country'
                                    value={selectedLocation.country}
                                    options={locations.countries}
                                    onChange={this.handleSelectCountry.bind(this)}
                                />
                            </div>

                            <div>
                                <label>State</label>
                                <Select
                                    isClearable={true}
                                    isSearchable={true}
                                    name='state'
                                    value={selectedLocation.state}
                                    options={locations.states}
                                    onChange={this.handleSelectState.bind(this)}
                                />
                            </div>
                        </div>
                        <div className={style.rowSelect}>
                            <div>
                                <label>City</label>
                                <Select
                                    isClearable={true}
                                    isSearchable={true}
                                    name='city'
                                    value={selectedLocation.city}
                                    options={locations.cities}
                                    onChange={this.handleSelectCity.bind(this)}
                                />
                            </div>
                        </div>

                        <div className={style.btnContainer}>
                            <CustomButton
                                onClick={this.handleSubmit.bind(this)}
                                action='checkout.add-method'
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path, state) => dispatch(push(path, state)),
    userUpdateSuccess: (userInfo) => dispatch(actions.userUpdateSuccess(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodForm);
