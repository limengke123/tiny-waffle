import React, { useState } from 'react'
import { Layout } from 'antd'
import NP from 'number-precision'
import { TradingStore } from '../store/TradingStore'
import { TradeForm } from '../component/trading/TradeForm'
import { TradeTable } from '../component/trading/TradeTable'
import { TradeInfo } from '../component/trading/TradeInfo'
import { TradeHeaderInfo } from '../component/trading/TradeHeaderInfo'

const { divide } = NP

const { Sider, Header, Content, Footer } = Layout

export default function Trading() {
    const [basePrice, setPrice] = useState(TradingStore.defaultBasePrice)
    const [amplitudeInterval, setAmplitudeInterval] = useState(
        TradingStore.defaultAmplitudeInterval
    )
    const [investment, setInvestment] = useState(TradingStore.defaultInvestment)
    const [maxGear, setMaxGear] = useState(TradingStore.defaultMaxGear)
    const [store, setStore] = useState(new TradingStore())
    const handleChange = function(type: string, value: number | undefined) {
        if (value) {
            switch (type) {
                case 'basePrice':
                    setPrice(value)
                    break
                case 'investment':
                    setInvestment(value)
                    break
                case 'amplitudeInterval':
                    setAmplitudeInterval(divide(value, 100))
                    break
                case 'maxGear':
                    setMaxGear(value)
                    break
                default:
                    break
            }
        }
    }
    const handleGenerate = function() {
        const newStore = new TradingStore({
            amplitudeInterval,
            basePrice,
            investment,
            maxGear
        })
        setStore(newStore)
    }
    return (
        <Layout>
            <Sider>侧边内容</Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '10px 16px' }}>
                    <TradeHeaderInfo />
                </Header>
                <Content
                    style={{
                        background: '#fff',
                        padding: '10px 16px',
                        margin: '10px 0'
                    }}
                >
                    <TradeForm
                        amplitudeInterval={amplitudeInterval}
                        basePrice={basePrice}
                        investment={investment}
                        maxGear={maxGear}
                        handleChange={handleChange}
                        handleGenerate={handleGenerate}
                    />
                    <TradeTable store={store} />
                    <TradeInfo store={store} />
                </Content>
                <Footer style={{ background: '#fff', padding: '10px 16px' }}>
                    不构成投资建议
                </Footer>
            </Layout>
        </Layout>
    )
}
