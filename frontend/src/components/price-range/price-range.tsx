interface PriceRangeProps {
    onChange: (price: number) => void;
}

export const PriceRange: React.FC<PriceRangeProps> = ({ onChange }) => {
    return (
        <input type="range" defaultValue={2500} min={0} max={5000} step={100} onChange={(event) => {
            onChange(+event.target.value);
        }}/>
    );
}