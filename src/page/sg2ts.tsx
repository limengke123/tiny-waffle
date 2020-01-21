import React, { useState, useMemo } from 'react'
import { sg2ts } from 'sg2ts'
import { Controlled } from 'react-codemirror2'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import { copy } from '../util'
import styles from '../style/page/sg2ts.module.scss'

const getResult = (value: string) => {
    return sg2ts(value, {
        space: 4
    })
}

export default function Sg2ts() {
    const [value, setValue] = useState('')
    const handleCopy = () => {
        const result = getResult(value)
        const { error } = copy(result)
        if (error) {
            message.error(error)
        } else {
            message.success('复制成功')
        }
    }
    const handleClear = () => {
        if (value !== '') {
            setValue('')
            message.success('清除成功')
        }
    }
    const handleChange = (editor: any, data: any, codeValue: string) => {
        if (value !== codeValue) {
            setValue(codeValue)
        }
    }
    const target = useMemo(() => getResult(value), [value])
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                swagger 数据格式转换成 typescript 格式
            </h1>
            <main className={styles.body}>
                <div className={styles.code}>
                    <div className={styles['sub-title-container']}>
                        <span className={styles['sub-title']}>
                            输入swagger数据
                        </span>
                        <Button
                            size="small"
                            type="primary"
                            onClick={handleClear}
                        >
                            清除
                        </Button>
                    </div>
                    <Controlled
                        value={value}
                        options={{
                            mode: 'text/javascript',
                            theme: 'material',
                            lineNumbers: true,
                            lineWrapping: true
                        }}
                        onBeforeChange={handleChange}
                    />
                </div>
                <div className={styles.result}>
                    <div className={styles['sub-title-container']}>
                        <span className={styles['sub-title']}>
                            生成的typescript数据
                        </span>
                        <Button
                            size="small"
                            type="primary"
                            onClick={handleCopy}
                        >
                            复制
                        </Button>
                    </div>
                    <Controlled
                        onBeforeChange={() => {}}
                        value={target}
                        options={{
                            mode: 'text/typescript',
                            lineNumbers: true,
                            theme: 'material',
                            readOnly: true,
                            lineWrapping: true
                        }}
                    />
                </div>
            </main>
        </div>
    )
}
