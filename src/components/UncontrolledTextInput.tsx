export const UncontrolledTextInput = ({onChange, ref}: {onChange: (value: string) => void, ref: React.RefObject<HTMLInputElement> | null}) => {
    return (
        <input type="text" ref={ref} onChange={(e) => onChange(e.target.value)} />
    )
}