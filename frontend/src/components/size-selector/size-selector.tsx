import classNames from 'classnames'
import './size-selector.scss'
import { useState } from 'react'
import { Sizes } from '../../types/products'

interface SizeSelectorProps {
    onChange: (size: string) => void
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <label htmlFor="size-selector" className="size-selector">
            Size
            <div className="size-selector__wrapper">
                <img
                    src="/icons/caret.svg"
                    alt="caret"
                    className={classNames('size-selector__icon', {
                        open: isOpen,
                    })}
                />
                <select
                    onClick={() => setIsOpen((prev) => !prev)}
                    onBlur={() => setIsOpen(false)}
                    className="size-selector__input"
                    name="size-selector"
                    defaultValue={Sizes.ALL}
                    onChange={(event) => onChange(event.target.value)}
                >
                    {Object.keys(Sizes).map((size) => (
                        <option
                            value={Sizes[size as keyof typeof Sizes]}
                            key={`size_${size}`}
                        >
                            {Sizes[size as keyof typeof Sizes]}
                        </option>
                    ))}
                </select>
            </div>
        </label>
    )
}
