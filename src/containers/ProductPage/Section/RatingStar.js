import style from './RatingStar.module.scss';

const RatingStar = ({ rating }) => {
    const evenStar = [];
    for (let i = 0; i < Math.floor(rating); i++) {
        evenStar.push(<i className='fa-solid fa-star'></i>);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.star_container}>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </div>

            <div className={style.star_container} style={{ width: (100 * rating) / 5 + '%' }}>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
            </div>
        </div>
    );
};

export default RatingStar;
