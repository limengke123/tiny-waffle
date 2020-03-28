import React from 'react'
import { Button, Form, InputNumber } from 'antd'
import NP from 'number-precision'

const { times } = NP

export function TradeForm(props: {
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
    return (
        <Form layout="inline">
            <Form.Item label="基准基金价格">
                <InputNumber
                    value={basePrice}
                    onChange={value => handleChange('basePrice', value)}
                    placeholder="输入基准基金价格"
                />
            </Form.Item>
            <Form.Item label="基准买入价格">
                <InputNumber
                    value={investment}
                    onChange={value => handleChange('investment', value)}
                    placeholder="输入基准买入价格"
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
                    placeholder="输入网格大小"
                />
            </Form.Item>
            <Form.Item label="极限档位">
                <InputNumber
                    value={maxGear}
                    onChange={value => handleChange('maxGear', value)}
                    placeholder="输入极限档位"
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={handleGenerate} type="primary">
                    生成
                </Button>
            </Form.Item>
        </Form>
    )
}
