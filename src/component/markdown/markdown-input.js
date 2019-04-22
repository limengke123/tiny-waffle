import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from '../../style/component/markdown/mardown-input.module.scss'

function MarkDownInput({ text, changeText }) {
    const textProps = useMemo(() => text, [text])
    return (
        <div className={styles.container}>
            <textarea
                value={textProps}
                onChange={e => changeText(e.target.value)}
                cols="30"
                rows="10"
            />
        </div>
    )
}

MarkDownInput.propTypes = {
    text: PropTypes.string,
    changeText: PropTypes.func
}

MarkDownInput.defaultProps = {
    text: '',
    changeText() {}
}

export default MarkDownInput
