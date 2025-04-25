interface SizeSelectorProps {
    onChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ onChange }) => {
    return (
        <select name="size-selector" id="" onChange={(event) => onChange(event.target.value)}>
            <option value="M">Option M</option>
            <option value="L">Option L</option>
            <option value="S">Option S</option>
        </select>
    );
}