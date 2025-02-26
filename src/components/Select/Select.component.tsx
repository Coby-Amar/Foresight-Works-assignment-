import { FC, useCallback, useState } from 'react'

import styles from "./Select.module.css"

export interface Option {
    label: string
    value: number
}

interface SelectProps {
    options: Option[]
    onChange(selectedOptions: number[]): void

    isMulti?: boolean
    placeholder?: string
}

const Select: FC<SelectProps> = ({ options, isMulti = false, placeholder = 'Select...', onChange }) => {
    const [selectedValues, setSelectedValues] = useState<number[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSelect = useCallback((checked: boolean, value: number) => {
        let updatedValues: number[]
        if (isMulti) {
            if (checked) {
                updatedValues = [...selectedValues, value]
            } else {
                updatedValues = selectedValues.filter((val) => val !== value)
            }
        } else {
            if (checked) {
                updatedValues = [value]
            } else {
                updatedValues = []
            }
        }
        setSelectedValues(updatedValues)
        onChange(updatedValues)
    }, [isMulti, onChange, selectedValues])

    const handleSelectAll = useCallback(() => {
        const nextValues = options.map(option => option.value)
        onChange(nextValues)
        setSelectedValues(nextValues)
    }, [onChange, options])

    const handleDeselectAll = useCallback(() => {
        onChange([])
        setSelectedValues([])
    }, [onChange])

    return (
        <div className={styles.selectContainer}>
            <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedValues.length > 0 ? selectedValues.map(value => options.find(o => o.value === value)?.label).join(', ') : placeholder}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <div className={styles.selectDropdown}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.inputText}
                    />
                    {isMulti && (
                        <div className={styles.multiSelectOptionsAll}>
                            <div className={styles.selectOption} onClick={handleSelectAll}>Select All</div>
                            <div className={styles.selectOption} onClick={handleDeselectAll}>Deselect All</div>
                        </div>
                    )}
                    <div className={styles.selectOptionContainer}>
                        {options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))
                            .map(({ label, value }) => (
                                <label key={label + value} className={styles.selectOption}>
                                    <input
                                        type={isMulti ? 'checkbox' : 'radio'}
                                        checked={selectedValues.includes(value)}
                                        onChange={({ currentTarget: { checked } }) => handleSelect(checked, value)}
                                        className={isMulti ? styles.inputCheckbox : styles.inputRadio}
                                    />
                                    {label}
                                </label>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Select
