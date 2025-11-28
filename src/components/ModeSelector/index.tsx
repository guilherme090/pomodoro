import './mode-selector.style.css'

type modeSelectorProps = {
    value: string, 
    options: string[], 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function ModeSelector({value, options, onChange}: modeSelectorProps) {
    return (
        <>
            <label htmlFor="mode-selector" className="mode-label"> Mode: </label>
            <select id="mode-selector" value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
            </select>
        </>
    );
}