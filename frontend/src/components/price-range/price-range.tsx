import './price-range.scss'
import { Slider } from '@chakra-ui/react'
interface PriceRangeProps {
    onChange: (price: number) => void
}

export const PriceRange: React.FC<PriceRangeProps> = ({ onChange }) => {
    return (
        <label htmlFor="price-range" className="price-range">
            <Slider.Root
                width="320px"
                defaultValue={[2500]}
                max={5000}
                min={0}
                step={100}
                onValueChange={(details) => {
                    onChange(details.value[0])
                }}
            >
                <span className="price-range__label">
                    Price Range
                    <span className="price-range__current-value">
                        $ <Slider.ValueText color={'#a09eab'} />
                    </span>
                </span>

                <Slider.Control>
                    <Slider.Track
                        bg={'#252828'}
                        border={'none'}
                        height={'24px'}
                    >
                        <Slider.Range bg={'#ffffff'} border={'none'} />
                    </Slider.Track>
                    <Slider.Thumbs
                        bg={'#252828'}
                        width={'23px'}
                        height={'23px'}
                        border={'3px solid #ffffff'}
                    />
                </Slider.Control>
            </Slider.Root>
        </label>
    )
}
