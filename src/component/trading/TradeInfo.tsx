import React from 'react'
import { Badge, Descriptions } from 'antd'
import NP from 'number-precision'
import { TradingStore } from '../../store/TradingStore'

const { plus, times, minus } = NP

const { Item } = Descriptions

function processDataToPercent(data: number): string {
    return `${times(data, 100)}%`
}

export function TradeInfo(props: { store: TradingStore }) {
    const { store } = props
    const amplitudeInterval = store.getAmplitudeInterval()
    const basePrice = store.getBasePrice()
    const investment = store.getInvestment()
    const maxGear = store.getMaxGear()
    const maxDrop = times(minus(maxGear, 1), amplitudeInterval)
    const maxRequireMoney = store
        .getBuyTradingList()
        .reduce((accumulation, item) => plus(accumulation, item.buyingMoney), 0)
    return (
        <Descriptions bordered>
            <Item label="基金基准价格">{basePrice}</Item>
            <Item label="买入基准价格">{investment}</Item>
            <Item label="网格大小">
                {processDataToPercent(amplitudeInterval)}
            </Item>
            <Item label="极限档位">{maxGear}</Item>
            <Item label="极限跌幅">
                <Badge status="warning" text={processDataToPercent(maxDrop)} />
            </Item>
            <Item label="极限资金">
                <Badge status="processing" text={maxRequireMoney} />
            </Item>
        </Descriptions>
    )
}
