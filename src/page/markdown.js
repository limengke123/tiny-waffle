import React, { useState } from 'react'
import MarkDownInput from '../component/markdown/markdown-input'
import MarkDownOutput from '../component/markdown/markdown-ouput'
import styles from '../style/page/markdown.module.scss'

function MarkDown() {
    const [text, setText] = useState('123')
    console.log(text)
    return (
        <div className={styles.container}>
            <MarkDownInput text={text} changeText={setText} />
            <MarkDownOutput text={text} />
        </div>
    )
}

export default MarkDown
