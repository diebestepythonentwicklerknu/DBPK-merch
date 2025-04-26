import './searchbar.scss'

interface SearchBarProps {
    onChange: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <label htmlFor="search" className="search-bar">
            Search
            <div className="search-bar__wrapper">
                <img
                    src="/icons/search.svg"
                    alt="search icon"
                    className="search-bar__icon"
                />
                <input
                    name="search"
                    type="text"
                    className="search-bar__input"
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </label>
    )
}
