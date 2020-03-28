import { ColumnProps } from 'antd/es/table'
import { Table } from 'antd'
import React from 'react'
import NP from 'number-precision'
import {
    intervalEnum,
    intervalSizeMap,
    TradeInfoView,
    TradingStore
} from '../../store/TradingStore'
import { compose } from '../../util/rambda'
import '../../style/component/trading/TradeTable.scss'

const { times, plus, minus } = NP

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

interface ComposeTradeInfoView extends TradeInfoView, TradeInfoUIView {}

const classNameByIntervalSize: { [k in intervalEnum]: string } = {
    [intervalEnum.small]: '',
    [intervalEnum.middle]: 'middle',
    [intervalEnum.large]: 'large'
}

const getRender = function<
    T extends ComposeTradeInfoView,
    K extends keyof ComposeTradeInfoView,
    K1 extends keyof TradeInfoUIView
>(
    callback?: (data: T[K], record: T) => React.ReactNode,
    key?: K1,
    mergeRows: boolean = true
) {
    return function(data: T[K], record: T) {
        const node: {
            children: React.ReactNode
            props: { rowSpan?: number; className?: string }
        } = {
            children: callback ? callback(data, record) : data,
            props: { className: classNameByIntervalSize[record.intervalSize] }
        }
        if (mergeRows && key) {
            node.props.rowSpan = record[key]
        }
        return node
    }
}

const columns: ColumnProps<ComposeTradeInfoView>[] = [
    {
        title: '档位',
        dataIndex: 'currentGear',
        render: getRender(
            (_, record) => {
                return `${times(record.rate, 100)}%`
            },
            'currentGearRowSpan',
            true
        )
    },
    {
        key: 'intervalSize',
        title: '网格大小',
        render: getRender(
            (_, record) => intervalSizeMap.get(record.intervalSize) || '未知',
            'intervalSizeRowSpan',
            false
        )
    },
    {
        title: '买入操作',
        children: [
            {
                title: '触发买入价格',
                key: 'buyingTriggerPrice',
                render: getRender(
                    (_, record) => {
                        return `<= ${plus(record.buyingPrice, 0.001)}`
                    },
                    'buyingPriceRowSpan',
                    false
                )
            },
            {
                title: '买入价格',
                dataIndex: 'buyingPrice',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '买入股数',
                dataIndex: 'buyingQuantity',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '买入金额',
                dataIndex: 'buyingMoney',
                render: getRender(undefined, undefined, false)
            }
        ]
    },
    {
        title: '卖出操作',
        children: [
            {
                title: '卖出触发价格',
                key: 'sellTriggerPrice',
                render: getRender(
                    (_, record) => {
                        return `>= ${minus(record.sellPrice, 0.001)}`
                    },
                    'buyingPriceRowSpan',
                    false
                )
            },
            {
                title: '卖出价格',
                dataIndex: 'sellPrice',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '卖出股数股数',
                dataIndex: 'sellQuantity',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '卖出金额',
                dataIndex: 'sellMoney',
                render: getRender(undefined, undefined, false)
            }
        ]
    },
    {
        title: '操作利润',
        children: [
            {
                title: '本金入袋盈亏',
                dataIndex: 'netProfit',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '获得的股数',
                dataIndex: 'stockNumCollect',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '额外股数对应金额',
                dataIndex: 'extraStockMoney',
                render: getRender(undefined, undefined, false)
            },
            {
                title: '合计收益',
                key: 'total',
                render: getRender((_, record) =>
                    plus(record.extraStockMoney, record.netProfit)
                )
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
    data: TradeInfoView[]
): ComposeTradeInfoView[] {
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
    return composedProcess(preProcessList)
}

export function TradeTable(props: { store: TradingStore }) {
    const { store } = props
    const rawDataList = store.getBuyTradingList()
    return (
        <Table<ComposeTradeInfoView>
            className="trade-table"
            rowKey={record => `${record.buyingPrice}|${record.intervalSize}`}
            bordered
            dataSource={injectUIDataIntoRawData(rawDataList)}
            columns={columns}
            pagination={{ pageSize: 20 }}
        />
    )
}
