export default function AccountTab( {label, children, onClick } ){
    return (
        <div>
            <div data-label={label} onClick={onClick}>
                {children}
            </div>
        </div>
    )
}