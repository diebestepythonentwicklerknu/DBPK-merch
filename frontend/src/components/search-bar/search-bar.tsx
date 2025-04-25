import './searchbar.scss';

interface SearchBarProps {
    onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <input type="text" className="search-bar" onChange={(event) => onChange(event.target.value)}/>
    );
}