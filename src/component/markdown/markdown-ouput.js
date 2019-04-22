import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from '../../style/component/markdown/markdown-output.module.scss'

function MarkDownOutput({ text }) {
    const textProps = useMemo(() => text, [text])
    return <div className={styles.container}>{textProps}</div>
}

MarkDownOutput.propTypes = {
    text: PropTypes.string
}

MarkDownOutput.defaultProps = {
    text: ''
}

export default MarkDownOutput
