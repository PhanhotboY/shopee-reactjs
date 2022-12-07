import style from './RatingStar.module.scss';

const RatingStar = ({ rating = 0, height }) => {
    return (
        <div className={style.wrapper} style={height ? { height: height, width: height * 5 } : {}}>
            <div className={style.star_container}>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
            </div>

            <div style={{ width: (100 * rating) / 5 + '%' }}>
                <div className={style.star_container}>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                    <i className='fa-solid fa-star'></i>
                </div>
            </div>
        </div>
    );
};

export default RatingStar;
