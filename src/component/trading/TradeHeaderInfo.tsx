import React, { useState } from 'react'
import { Button, Drawer, Input } from 'antd'
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
            <div className="header-container">
                <Input
                    className="custom-input-name"
                    placeholder="输入网格名称"
                />
                <Input
                    className="custom-input-code"
                    placeholder="输入基金代码"
                />
                <Button type="primary" onClick={handleValuationClick}>
                    估值查看
                </Button>
                {/*<Button onClick={handlePriceClick}>查看qdii溢折价</Button>*/}
            </div>

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
