import { ColumnProps } from 'antd/es/table'
import { Table } from 'antd'
import React from 'react'
import NP from 'number-precision'
import {
    BuyTradeInfoView,
    intervalSizeMap,
    TradingStore
} from '../../store/TradingStore'
import { compose } from '../../util/rambda'

const { times } = NP

interface TradeInfoUIView {
    intervalSizeRowSpan: number
    currentGearRowSpan: number
    buyingPriceRowSpan: number
    buyingQuantityRowSpan: number
    buyingMoneyRowSpan: number
}

const defaultTradeInfoUIView: TradeInfoUIView = {
    intervalSizeRowSpan: 1,
    currentGearRowSpan: 1,
    buyingMoneyRowSpan: 1,
    buyingPriceRowSpan: 1,
    buyingQuantityRowSpan: 1
}

interface ComposeTradeInfoView extends BuyTradeInfoView, TradeInfoUIView {}

const getRender = function<
    T extends ComposeTradeInfoView,
    K extends keyof ComposeTradeInfoView,
    K1 extends keyof TradeInfoUIView
>(
    key: K1,
    mergeRows: boolean = true,
    callback?: (data: T[K], record: T) => React.ReactNode
) {
    return function(data: T[K], record: T) {
        const node: {
            children: React.ReactNode
            props: { rowSpan?: number }
        } = {
            children: callback ? callback(data, record) : data,
            props: {}
        }
        if (mergeRows) {
            node.props.rowSpan = record[key]
        }
        return node
    }
}

const columns: ColumnProps<ComposeTradeInfoView>[] = [
    {
        title: '档位',
        dataIndex: 'currentGear',
        render: getRender('currentGearRowSpan', true, (_, record) => {
            return `${times(record.rate, 100)}%`
        }),
        width: 80
    },
    {
        key: 'intervalSize',
        title: '网格大小',
        render: getRender(
            'intervalSizeRowSpan',
            false,
            (_, record) => intervalSizeMap.get(record.intervalSize) || '未知'
        ),
        width: 100
    },
    {
        title: '买入操作',
        children: [
            {
                title: '触发买入价格',
                key: 'buyingTriggerPrice',
                render: getRender('buyingPriceRowSpan', false, (_, record) => {
                    return record.buyingPrice
                })
            },
            {
                title: '买入价格',
                dataIndex: 'buyingPrice',
                render: getRender('buyingPriceRowSpan', false)
            },
            {
                title: '买入股数',
                dataIndex: 'buyingQuantity',
                render: getRender('buyingQuantityRowSpan', false)
            },
            {
                title: '买入金额(¥)',
                dataIndex: 'buyingMoney',
                render: getRender('buyingMoneyRowSpan', false)
            }
        ]
    }
]

/**
 * 数据分组，根据 key 找到相同的数据 给新的 key 赋值
 * 第一项赋值为相同的个数，后面项均设置为 0
 * */
const groupDataByKey = function<
    K1 extends keyof ComposeTradeInfoView,
    K2 extends keyof TradeInfoUIView
>(list: ComposeTradeInfoView[], key: K1, newKey: K2): ComposeTradeInfoView[] {
    const resultList: ComposeTradeInfoView[] = []
    let num = 0
    // let firstData: ComposeTradeInfoView[K1] | undefined
    // const firstIndex: {index: number, rowSpan: number}[] = []
    for (let i = list.length - 1; i >= 0; i--) {
        const item = list[i]
        const nextItem = list[i - 1] ? list[i - 1] : null
        if (nextItem && nextItem[key] === item[key]) {
            num++
            resultList.unshift({
                ...item,
                [newKey]: 0
            })
        } else {
            num++
            resultList.unshift({
                ...item,
                [newKey]: num
            })
            num = 0
        }
    }
    return resultList
}

const curringGroupDataByKey = function<
    K1 extends keyof ComposeTradeInfoView,
    K2 extends keyof TradeInfoUIView
>(
    key: K1,
    newKey: K2
): (list: ComposeTradeInfoView[]) => ComposeTradeInfoView[] {
    return function(list: ComposeTradeInfoView[]) {
        return groupDataByKey(list, key, newKey)
    }
}

const injectUIDataIntoRawData = function(
    data: BuyTradeInfoView[]
): ComposeTradeInfoView[] {
    console.log(data)
    const preProcessList = data.map<ComposeTradeInfoView>(item => ({
        ...item,
        ...defaultTradeInfoUIView
    }))
    const composedProcess = compose(
        curringGroupDataByKey('intervalSize', 'intervalSizeRowSpan'),
        curringGroupDataByKey('currentGear', 'currentGearRowSpan'),
        curringGroupDataByKey('buyingPrice', 'buyingPriceRowSpan'),
        curringGroupDataByKey('buyingQuantity', 'buyingQuantityRowSpan'),
        curringGroupDataByKey('buyingMoney', 'buyingMoneyRowSpan')
    )
    console.log(composedProcess(preProcessList))
    return composedProcess(preProcessList)
}

export function TradeTable(props: { store: TradingStore }) {
    const { store } = props
    const rawDataList = store.getBuyTradingList()
    return (
        <Table<ComposeTradeInfoView>
            rowKey={record => `${record.buyingPrice}|${record.intervalSize}`}
            bordered
            dataSource={injectUIDataIntoRawData(rawDataList)}
            columns={columns}
            pagination={{ pageSize: 20 }}
        />
    )
}
