export const Hint = ({content, onClick}: {content: string, onClick: (hint: string) => void}) => {
    return (
        <div onClick={() => onClick(content)}>{content}</div>
    )
}