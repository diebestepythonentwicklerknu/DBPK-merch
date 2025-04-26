import './service.scss'

export const ErrorPage = () => {
    return (
        <div className="service">
            <img
                src="/icons/error.svg"
                alt="empty cart"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">
                    O-ops! Something went wrong! ❌
                </h2>
                <p className="service__text">Try to refresh the page</p>
            </div>
        </div>
    )
}
