import { useNavigate } from 'react-router-dom'
import './landing.scss'

export const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className="landing page">
            <div className="page__container">
                <div className="landing__info">
                    <div className="landing__slogan-block">
                        <p className="landing__subtitle">#Official merch</p>
                        <h1 className="landing__slogan">
                            BE THE
                            {/* <span className="outline">BE THE</span> */}
                            <span className="big">FIRST</span>
                        </h1>
                    </div>
                    <p className="landing__text">
                        Gear Up, Code On. Limited-edition, ultra-comfortable
                        IT-themed hats and tees designed by the best Python
                        programmers ever. Grab yours before they're gone!
                    </p>
                    <button
                        className="button"
                        onClick={() => navigate('/store')}
                    >
                        GO FOR YOUR FUTURE{' '}
                        <img
                            src="/icons/arrow.svg"
                            alt="arrow"
                            className="button__icon"
                        />
                    </button>
                </div>
                <div className="landing__graphics">
                    <img
                        src="/icons/star_1.svg"
                        alt="spark"
                        className="landing__spark spark spark--1"
                    />
                    <img
                        src="/icons/star_2.svg"
                        alt="spark"
                        className="landing__spark spark spark--2"
                    />
                    <div className="landing__man">
                        <div className="landing__discount">
                            <p className="landing__discount-text">30% OFF</p>
                            <div className="landing__star-group">
                                <img
                                    src="/icons/star_filled.svg"
                                    alt="star"
                                    className="landing__star star"
                                />
                                <img
                                    src="/icons/star_outline.svg"
                                    alt="star_outline"
                                    className="landing__star star star--outline"
                                />
                            </div>
                        </div>
                        <img
                            src="/images/dbpk_cap.png"
                            alt="man"
                            className="landing__man-image"
                        />
                    </div>
                </div>
            </div>
            <div className="landing__block">
                Design provided by Anna Androschuk
                <br />
                Produced just for fun by some funny guys
            </div>
        </div>
    )
}
