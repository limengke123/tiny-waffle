import React, { useMemo } from 'react'
import styles from '../../style/component/markdown/mardown-input.module.scss'

export interface MarkdownInputProps {
    text: string
    changeText: (text: string) => void
}

export const MarkDownInput: React.FunctionComponent<MarkdownInputProps> = function({
    text,
    changeText
}) {
    const textProps = useMemo(() => text, [text])
    return (
        <div className={styles.container}>
            <textarea
                value={textProps}
                onChange={e => changeText(e.target.value)}
                cols={30}
                rows={10}
            />
        </div>
    )
}
