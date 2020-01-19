import React from 'react'
import { sg2ts } from 'sg2ts'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import { copy } from '../util'
import styles from '../style/page/sg2ts.module.scss'

export interface Sg2tsState {
    value: string
}

export default class Sg2ts extends React.Component<{}, Sg2tsState> {
    state = {
        value: ''
    }

    handleChange = (editor: any, data: any, codeValue: string) => {
        const {
            state: { value }
        } = this
        if (value !== codeValue) {
            this.setState({
                value: codeValue
            })
        }
    }

    handleCopy = () => {
        const result = this.getResult()
        const { error } = copy(result)
        if (error) {
            message.error(error)
        } else {
            message.success('复制成功')
        }
    }

    handleClear = () => {
        const { value } = this.state
        if (value !== '') {
            this.setState(
                {
                    value: ''
                },
                () => {
                    message.success('清除成功')
                }
            )
        }
    }

    getResult = () => {
        const { value } = this.state
        return sg2ts(value, {
            space: 4
        })
    }

    render() {
        const target = this.getResult()
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
                                onClick={this.handleClear}
                            >
                                清除
                            </Button>
                        </div>
                        <CodeMirror
                            options={{
                                mode: 'text/javascript',
                                theme: 'material',
                                lineNumbers: true,
                                matchBrackets: true,
                                lineWrapping: true,
                                styleActiveLine: true
                            }}
                            onChange={this.handleChange}
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
                                onClick={this.handleCopy}
                            >
                                复制
                            </Button>
                        </div>
                        <CodeMirror
                            value={target}
                            options={{
                                mode: 'text/typescript',
                                lineNumbers: true,
                                theme: 'material',
                                readOnly: true,
                                lineWrapping: true,
                                styleActiveLine: true,
                                matchBrackets: true
                            }}
                        />
                    </div>
                </main>
            </div>
        )
    }
}
