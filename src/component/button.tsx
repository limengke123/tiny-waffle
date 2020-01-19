import React from 'react'

export interface ButtonProps {
    text: string
    onClick: () => void
}

export const Button: React.FunctionComponent<ButtonProps> = function({
    text,
    onClick
}) {
    return (
        <button type="button" onClick={onClick}>
            {text}
        </button>
    )
}

const MemoButton = React.memo(Button)

export { MemoButton }
