import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import '../../style/component/trading/TradeHeaderInfo.scss'

export function TradeHeaderInfo() {
    const [visible, setVisible] = useState(false)
    const handleClick = function() {
        setVisible(true)
    }
    const onClose = function() {
        setVisible(false)
    }
    return (
        <div className="trade-header-info">
            <Button onClick={handleClick}>查看估值</Button>
            <Drawer
                title="估值查看"
                placement="right"
                width={520}
                closable={false}
                visible={visible}
                onClose={onClose}
            >
                <div className="iframe-container">
                    <iframe
                        className="iframe"
                        title="danjuan"
                        src="https://danjuanapp.com/djmodule/value-center?channel=1300100141"
                    />
                </div>
            </Drawer>
        </div>
    )
}
