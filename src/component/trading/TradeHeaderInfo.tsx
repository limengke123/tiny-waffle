import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import '../../style/component/trading/TradeHeaderInfo.scss'

export function TradeHeaderInfo() {
    const [valuationVisible, setValuationVisible] = useState(false)
    const [priceVisible, setPriceVisible] = useState(false)
    const handleValuationClick = function() {
        setValuationVisible(true)
    }
    const handlePriceClick = function() {
        setPriceVisible(true)
    }
    const onValuationClose = function() {
        setValuationVisible(false)
    }
    const onPriceClose = function() {
        setPriceVisible(false)
    }
    return (
        <div className="trade-header-info">
            <Button onClick={handleValuationClick}>查看估值</Button>
            <Button onClick={handlePriceClick}>查看qdii溢折价</Button>
            <Drawer
                title="折溢价查看"
                placement="right"
                width={1300}
                closable={false}
                visible={priceVisible}
                onClose={onPriceClose}
            >
                <div className="iframe-container">
                    <iframe
                        className="iframe"
                        title="jisilu"
                        src="https://www.jisilu.cn/data/qdii/#qdii"
                    />
                </div>
            </Drawer>
            <Drawer
                title="估值查看"
                placement="right"
                width={700}
                closable={false}
                visible={valuationVisible}
                onClose={onValuationClose}
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
