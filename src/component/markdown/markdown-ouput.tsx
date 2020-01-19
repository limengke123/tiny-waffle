import React, { useMemo } from 'react'
import styles from '../../style/component/markdown/markdown-output.module.scss'

export interface MarkdownOutputProps {
    text: string
}

export const MarkDownOutput: React.FunctionComponent<MarkdownOutputProps> = function({
    text
}) {
    const textProps = useMemo(() => text, [text])
    return <div className={styles.container}>{textProps}</div>
}
