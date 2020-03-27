import { ColumnProps } from 'antd/es/table'
import { Table } from 'antd'
import React from 'react'
import { TradeInfoView, TradingStore } from '../../store/TradingStore'

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

export function TradeTable(props: { store: TradingStore }) {
    const { store } = props
    return (
        <Table<TradeInfoView>
            rowKey="buyingPrice"
            dataSource={store.getTradingList()}
            columns={columns}
        />
    )
}
