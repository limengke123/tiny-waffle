import NP from 'number-precision'

const { times, minus, plus, divide, strip } = NP
NP.enableBoundaryChecking(false)

export interface BuyTradeInfoView {
    buyingPrice: number // 买入价格
    // buyingPriceString: string // 买入价格的字符串，方便显示小数点
    buyingMoney: number // 买入金额
    // buyingMoneyString: string // 买入金额的字符串
    buyingQuantity: number // 买入股数
    currentGear: number // 档位
    rate: number // 对应下降的比例

    intervalSize: intervalEnum // 网格大小
    // smallIntervalRowSpan: number
}

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

export interface SellTradeInfoView {
    sellPrice: number // 卖出价格
    sellPriceString: string // 卖出价格的字符串
    sellMoney: number // 卖出金额
    sellMoneyString: string // 卖出金额字符串
    sellQuantity: number // 卖出股数
    currentGear: number // 档位
}

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

    public getBuyTradingList(): BuyTradeInfoView[] {
        const resultList: BuyTradeInfoView[] = []
        let currentGear: number = this.gear
        while (currentGear <= this.maxGear) {
            resultList.push(...this.getTradeInfoByGear(currentGear))
            currentGear++
        }
        return resultList
    }

    private getTradeInfoByGear(currentGear: number): BuyTradeInfoView[] {
        const resultList: BuyTradeInfoView[] = []
        const rate = strip(1 - (currentGear - 1) * this.amplitudeInterval)
        const buyingPrice = strip(this.basePrice * rate)
        const expectedBuyingMoney = strip(
            this.investment * (1 + this.additionalRate * (currentGear - 1))
        )
        const buyingQuantity = TradingStore.computedRealBuyingQuantity(
            divide(expectedBuyingMoney, buyingPrice)
        )
        const buyingMoney = times(buyingQuantity, buyingPrice)
        const data: BuyTradeInfoView = {
            buyingPrice: TradingStore.contractData(buyingPrice),
            buyingMoney: TradingStore.contractData(buyingMoney, 2),
            buyingQuantity,
            currentGear,
            rate,
            intervalSize: intervalEnum.small
        }
        resultList.push(data)
        if (
            TradingStore.checkIntervalByRate(rate, this.middleAmplitudeInterval)
        ) {
            resultList.push({
                ...data,
                intervalSize: intervalEnum.middle
            })
        }
        if (
            TradingStore.checkIntervalByRate(rate, this.largeAmplitudeInterval)
        ) {
            resultList.push({
                ...data,
                intervalSize: intervalEnum.large
            })
        }
        return resultList
    }

    static checkIntervalByRate(rate: number, interval: number): boolean {
        const diff = minus(1, rate)
        if (diff !== 0) {
            if (times(diff, 100) % times(interval, 100) === 0) {
                return true
            }
        }
        return false
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
