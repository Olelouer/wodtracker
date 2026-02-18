const ExerciseTypeFilter = ({ label, value, isActive, OnClick }: { label: string , value: string, isActive: boolean, OnClick: (val: string) => void }) => {
    return (
        <li>
            <button 
                type="button" 
                className={`text-xs font-bold px-2 py-0.5 inline-flex items-center justify-center rounded-md ${isActive ? 'text-white bg-black' : 'hover:cursor-pointer hover:text-black '}`} 
                onClick={() => OnClick(value)}
                disabled={isActive}
            >
                {label}
            </button>
        </li>
    )
}
export default ExerciseTypeFilter;