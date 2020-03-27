import React, { useState } from 'react'
import { Table, Form, InputNumber, Layout, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'
import NP from 'number-precision'
import { TradeInfoView, TradingStore } from '../store/TradingStore'

const { divide, times } = NP

const { Sider, Header, Content } = Layout

const columns: ColumnProps<TradeInfoView>[] = [
    {
        key: 'currentGear',
        title: '档位',
        dataIndex: 'currentGear'
    },
    {
        key: 'buyingPriceString',
        title: '买入价格',
        dataIndex: 'buyingPriceString'
    },
    {
        key: 'buyingQuantity',
        title: '买入股数',
        dataIndex: 'buyingQuantity'
    },
    {
        key: 'buyingMoneyString',
        title: '买入金额',
        dataIndex: 'buyingMoneyString'
    }
]

function TradeTable(props: { store: TradingStore }) {
    const { store } = props
    return (
        <Table<TradeInfoView>
            rowKey="buyingPrice"
            dataSource={store.getTradingList()}
            columns={columns}
        />
    )
}

function TradeForm(props: {
    basePrice: number
    amplitudeInterval: number
    investment: number
    maxGear: number
    handleChange: (type: string, value: number | undefined) => void
    handleGenerate: () => void
}) {
    const {
        basePrice,
        maxGear,
        investment,
        amplitudeInterval,
        handleChange,
        handleGenerate
    } = props
    const handleGenerateData: React.MouseEventHandler<HTMLElement> = function(
        e
    ) {
        handleGenerate()
    }
    return (
        <Form layout="inline">
            <Form.Item label="初始基金价格">
                <InputNumber
                    value={basePrice}
                    onChange={value => handleChange('basePrice', value)}
                    placeholder="input placeholder"
                />
            </Form.Item>
            <Form.Item label="初始买入价格">
                <InputNumber
                    value={investment}
                    onChange={value => handleChange('investment', value)}
                    placeholder="input placeholder"
                />
            </Form.Item>
            <Form.Item label="网格大小">
                <InputNumber
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => (value ? value.replace('%', '') : 0)}
                    value={times(amplitudeInterval, 100)}
                    onChange={value => handleChange('amplitudeInterval', value)}
                    placeholder="input placeholder"
                />
            </Form.Item>
            <Form.Item label="极限档位">
                <InputNumber
                    value={maxGear}
                    onChange={value => handleChange('maxGear', value)}
                    placeholder="input placeholder"
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={handleGenerateData} type="primary">
                    生成
                </Button>
            </Form.Item>
        </Form>
    )
}

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
                <Content style={{ background: '#fff', padding: '0 16px' }}>
                    <TradeTable store={store} />
                </Content>
            </Layout>
        </Layout>
    )
}
