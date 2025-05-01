import './service.scss'

export const NotFoundPage = () => {
    return (
        <div className="service">
            <img
                src="/icons/not_found.svg"
                alt="not found"
                className="service__image"
            />
            <div className="service__text-block">
                <h2 className="service__headline">
                    404! Idk what this page is ❔
                </h2>
                <p className="service__text">
                    The page you are looking for does not exist.
                </p>
            </div>
        </div>
    )
}
