import './service.scss'

export const CatalogEmptyPage = () => {
    return (
        <div className="service">
            <img
                src="/icons/empty_cart.svg"
                alt="empty cart"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">
                    Srr, we have nothing like that 🤷‍♂️
                </h2>
                <p className="service__text">
                    Try another set of filters or reload the page
                </p>
            </div>
        </div>
    )
}
