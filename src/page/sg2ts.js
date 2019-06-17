import React from 'react'
import { sg2ts } from 'sg2ts'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import styles from '../style/page/sg2ts.module.scss'

export default class Sg2ts extends React.Component {
    state = {
        value: ''
    }

    handleChange = (editor, data, codeValue) => {
        this.setState({
            value: codeValue
        })
    }

    render() {
        const { value } = this.state
        const target = sg2ts(value, {
            space: 4
        })
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>
                    swagger 数据格式转换成 typescript 格式
                </h1>
                <main className={styles.body}>
                    <div className={styles.code}>
                        <h2 className="center">输入swagger数据</h2>
                        <CodeMirror
                            value={value}
                            // options={options}
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
                        <h2 className="center">生成的typescript数据</h2>
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
