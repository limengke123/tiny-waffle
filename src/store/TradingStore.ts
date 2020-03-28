import NP from 'number-precision'

const { times, minus, plus, divide, strip } = NP
NP.enableBoundaryChecking(false)

interface BuyTradeInfoView {
    buyingPrice: number // 买入价格
    buyingMoney: number // 买入金额
    buyingQuantity: number // 买入股数
}
interface SellTradeInfoView {
    sellPrice: number // 卖出价格
    sellMoney: number // 卖出金额
    sellQuantity: number // 卖出股数
}
interface InterestTradeInfoView {
    netProfit: number
    stockNumCollect: number
    extraStockMoney: number
}

interface BaseTradeInfoView {
    currentGear: number // 档位
    rate: number // 对应下降的比例
    intervalSize: intervalEnum // 网格大小
}
export interface TradeInfoView
    extends BuyTradeInfoView,
        SellTradeInfoView,
        InterestTradeInfoView,
        BaseTradeInfoView {}

export enum intervalEnum {
    small = 1,
    middle = 2,
    large = 3
}

export const intervalSizeMap = new Map<intervalEnum, string>([
    [intervalEnum.small, '小网'],
    [intervalEnum.middle, '中网'],
    [intervalEnum.large, '大网']
])

export interface TradingStoreProps {
    basePrice?: number
    amplitudeInterval?: number
    investment?: number
    maxGear?: number
}

export class TradingStore {
    static defaultBasePrice = 1
    static defaultAmplitudeInterval = 0.05
    static defaultInvestment = 1000
    static defaultAdditionalRate = 0.05
    static defaultMaxGear = 9
    static defaultMiddleAmplitudeInterval = 0.15
    static defaultLargeAmplitudeInterval = 0.3

    private basePrice: number = TradingStore.defaultBasePrice // 基础价位
    private amplitudeInterval: number = TradingStore.defaultAmplitudeInterval // 网格大小 默认 5%
    private investment: number = TradingStore.defaultInvestment // 初始买入价格 默认 500
    private maxGear: number = TradingStore.defaultMaxGear //最低极限档位 默认 6档

    private gear: number = 1 // 当前档位 这个字段暂时无用
    private additionalRate: number = TradingStore.defaultAdditionalRate // 每下降一个档位，增加投入的金额比例 不支持配置
    private middleAmplitudeInterval: number =
        TradingStore.defaultMiddleAmplitudeInterval
    private largeAmplitudeInterval: number =
        TradingStore.defaultLargeAmplitudeInterval

    public getBuyTradingList(): TradeInfoView[] {
        const resultList: TradeInfoView[] = []
        let currentGear: number = this.gear
        while (currentGear <= this.maxGear) {
            resultList.push(...this.getTradeInfoByGear(currentGear))
            currentGear++
        }
        return resultList
    }

    private getTradeInfoByGear(currentGear: number): TradeInfoView[] {
        const resultList: TradeInfoView[] = []
        const rate = strip(1 - (currentGear - 1) * this.amplitudeInterval)
        const sellRate = strip(1 - (currentGear - 2) * this.amplitudeInterval)
        let buyingPrice = strip(this.basePrice * rate)
        const expectedBuyingMoney = strip(
            this.investment * (1 + this.additionalRate * (currentGear - 1))
        )
        const buyingQuantity = TradingStore.computedRealBuyingQuantity(
            expectedBuyingMoney / buyingPrice
        )
        let buyingMoney = times(buyingQuantity, buyingPrice)
        let sellPrice = strip(this.basePrice * sellRate)
        // 小网格保留 10%，其中 5%是利润，5%是本金
        const sellQuantity = ~~((buyingQuantity * 0.9) / 100) * 100
        let sellMoney = times(sellPrice, sellQuantity)
        const middleRateDiff = TradingStore.getRateDiffByRate(
            rate,
            this.middleAmplitudeInterval
        )
        const largeRateDiff = TradingStore.getRateDiffByRate(
            rate,
            this.largeAmplitudeInterval
        )
        buyingPrice = TradingStore.contractData(buyingPrice, 3, false)
        sellPrice = TradingStore.contractData(sellPrice, 3, false)
        buyingMoney = TradingStore.contractData(buyingMoney, 2)
        sellMoney = TradingStore.contractData(sellMoney, 2)
        const stockNumCollect = minus(buyingQuantity, sellQuantity)
        const data: TradeInfoView = {
            buyingPrice,
            buyingMoney,
            buyingQuantity,

            sellQuantity,
            sellPrice,
            sellMoney,

            netProfit: minus(sellMoney, buyingMoney),
            stockNumCollect,
            extraStockMoney: times(stockNumCollect, sellPrice),

            currentGear,
            rate,
            intervalSize: intervalEnum.small
        }
        resultList.push(data)
        if (middleRateDiff) {
            const middleSellPrice = strip(
                (rate + this.middleAmplitudeInterval) * this.basePrice
            )
            // 中网保留 5%，是利润，本金全部赎回
            const middleSellQuantity = ~~((buyingQuantity * 0.95) / 100) * 100
            const middleSellMoney = times(middleSellQuantity, middleSellPrice)
            const middleStockNumCollect = minus(
                buyingQuantity,
                middleSellQuantity
            )
            resultList.push({
                ...data,
                intervalSize: intervalEnum.middle,
                sellPrice: middleSellPrice,
                sellQuantity: middleSellQuantity,
                sellMoney: middleSellMoney,
                netProfit: minus(middleSellMoney, buyingMoney),
                stockNumCollect: middleStockNumCollect,
                extraStockMoney: times(middleStockNumCollect, middleSellPrice)
            })
        }
        if (largeRateDiff) {
            const largeSellPrice = strip(
                (rate + this.largeAmplitudeInterval) * this.basePrice
            )
            // 大网全部卖出，获取全部利润和本金
            const largeSellQuantity = buyingQuantity
            const largeSellMoney = times(largeSellQuantity, largeSellPrice)
            const largeStockNumCollect = minus(
                buyingQuantity,
                largeSellQuantity
            )
            resultList.push({
                ...data,
                intervalSize: intervalEnum.large,
                sellPrice: largeSellPrice,
                sellQuantity: largeSellQuantity,
                sellMoney: largeSellMoney,
                netProfit: minus(largeSellMoney, buyingMoney),
                stockNumCollect: largeStockNumCollect,
                extraStockMoney: times(largeStockNumCollect, largeSellPrice)
            })
        }
        return resultList
    }

    static getRateDiffByRate(rate: number, interval: number): number {
        const diff = minus(1, rate)
        if (diff !== 0) {
            if (times(diff, 100) % times(interval, 100) === 0) {
                return strip(diff / interval)
            }
        }
        return 0
    }

    static computedRealBuyingQuantity(expectedQuantity: number): number {
        // 由于股票买入必须是 100 的整数倍，这里传入的预期买入股票数量不一定是 100 整数, 这里需要偏差处理一下，获得最终的买入股数
        const baseQuantity = times(~~(expectedQuantity / 100), 100)
        const diff = minus(expectedQuantity, baseQuantity)
        if (diff >= 50) {
            return plus(baseQuantity, 100)
        }
        return baseQuantity
    }

    static contractData(data: number): number
    static contractData(data: number, fractionDigits: number): number
    static contractData<T = string | number>(
        data: number,
        fractionDigits: number,
        returnString: boolean
    ): T

    static contractData(
        data: number,
        fractionDigits: number = 3,
        returnString: boolean = true
    ) {
        // 默认数据保留三位小数
        const result = data.toFixed(fractionDigits)
        if (returnString) {
            return result
        }
        return parseFloat(result)
    }

    constructor(props?: TradingStoreProps) {
        if (props) {
            props.basePrice !== undefined && (this.basePrice = props.basePrice)
            props.amplitudeInterval !== undefined &&
                (this.amplitudeInterval = props.amplitudeInterval)
            props.investment !== undefined &&
                (this.investment = props.investment)
            props.maxGear !== undefined && (this.maxGear = props.maxGear)
        }
    }

    public setBasePrice(price: number) {
        this.basePrice = price
    }

    public getBasePrice() {
        return this.basePrice
    }

    public setAmplitudeInterval(interval: number) {
        this.amplitudeInterval = interval
    }

    public getAmplitudeInterval() {
        return this.amplitudeInterval
    }

    public setInvestment(investment: number) {
        this.investment = investment
    }

    public getInvestment() {
        return this.investment
    }

    public getGear() {
        return this.gear
    }

    public setMaxGear(minGear: number) {
        this.maxGear = minGear
    }

    public getMaxGear() {
        return this.maxGear
    }

    public getMiddleAmplitudeInterval() {
        return this.middleAmplitudeInterval
    }

    public getLargeAmplitudeInterval() {
        return this.largeAmplitudeInterval
    }
}
