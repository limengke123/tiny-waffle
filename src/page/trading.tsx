import React, { useState } from 'react'
import { Layout } from 'antd'
import NP from 'number-precision'
import { TradingStore } from '../store/TradingStore'
import { TradeForm } from '../component/trading/TradeForm'
import { TradeTable } from '../component/trading/TradeTable'
import { TradeInfo } from '../component/trading/TradeInfo'

const { divide } = NP

const { Sider, Header, Content, Footer } = Layout

export default function Trading() {
    const [basePrice, setPrice] = useState(1)
    const [amplitudeInterval, setAmplitudeInterval] = useState(0.05)
    const [investment, setInvestment] = useState(500)
    const [maxGear, setMaxGear] = useState(6)
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
        const newStore = new TradingStore()
        newStore.setAmplitudeInterval(amplitudeInterval)
        newStore.setBasePrice(basePrice)
        newStore.setInvestment(investment)
        newStore.setMaxGear(maxGear)
        setStore(newStore)
    }
    return (
        <Layout>
            <Sider>侧边内容</Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: '10px 16px' }}>
                    <TradeForm
                        amplitudeInterval={amplitudeInterval}
                        basePrice={basePrice}
                        investment={investment}
                        maxGear={maxGear}
                        handleChange={handleChange}
                        handleGenerate={handleGenerate}
                    />
                </Header>
                <Content
                    style={{
                        background: '#fff',
                        padding: '10px 16px',
                        margin: '10px 0'
                    }}
                >
                    <TradeTable store={store} />
                </Content>
                <Footer style={{ background: '#fff', padding: '10px 16px' }}>
                    <TradeInfo store={store} />
                </Footer>
            </Layout>
        </Layout>
    )
}
