

interface CheckboxListProps {
    items: string[];
    selected: string[];
    onToggle: (value: string) => void;
}

export default function CheckboxList ({items, selected, onToggle}: CheckboxListProps) {

    return (
        <div className="flex justify-around">
            {items.map(item => (
                <label key={item} className="flex gap-2 items-center">
                    <span>{item}</span>
                    <input 
                        type="checkbox"
                        checked={selected.includes(item)}
                        onChange={() => onToggle(item)}
                        className="checkbox checkbox-md" />
                </label>    
            ))}


        </div>
    )

}