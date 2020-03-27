import NP from 'number-precision'

const { times, minus, plus, divide } = NP
NP.enableBoundaryChecking(false)

export interface TradeInfoView {
    buyingPrice: number // 买入价格
    buyingPriceString: string // 买入价格的字符串，方便显示小数点
    buyingMoney: number // 买入金额
    buyingMoneyString: string // 买入金额的字符串
    buyingQuantity: number // 买入股数
    currentGear: number // 档位
}

export interface TradingStoreProps {
    basePrice: number
    amplitudeInterval: number
    investment: number
    maxGear: number
}

export class TradingStore {
    private basePrice: number = 1 // 基础价位

    private amplitudeInterval: number = 0.05 // 网格大小 默认 5%

    private investment: number = 500 // 初始买入价格 默认 500

    private gear: number = 1 // 当前档位

    private maxGear: number = 6 //最低极限档位 默认 6档

    public getTradingList(): TradeInfoView[] {
        const resultList: TradeInfoView[] = []
        let buyingPrice: number = this.basePrice
        let buyingMoney: number = this.investment
        let buyingQuantity: number = 0
        let currentGear: number = this.gear
        while (currentGear <= this.maxGear) {
            buyingPrice = times(
                this.basePrice,
                minus(1, times(minus(currentGear, 1), this.amplitudeInterval))
            )
            const expectedBuyingMoney = times(
                this.investment,
                plus(1, times(minus(currentGear, 1), this.amplitudeInterval))
            )
            buyingQuantity = TradingStore.computedRealBuyingQuantity(
                divide(expectedBuyingMoney, buyingPrice)
            )
            buyingMoney = times(buyingQuantity, buyingPrice)
            resultList.push({
                buyingPrice: TradingStore.contractData(buyingPrice),
                buyingPriceString: TradingStore.contractData(
                    buyingPrice,
                    3,
                    true
                ),
                buyingMoney: TradingStore.contractData(buyingMoney, 2),
                buyingMoneyString: TradingStore.contractData(
                    buyingMoney,
                    2,
                    true
                ),
                buyingQuantity,
                currentGear
            })
            currentGear++
        }
        return resultList
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
            this.basePrice = props.basePrice
            this.amplitudeInterval = props.amplitudeInterval
            this.investment = props.investment
            this.maxGear = props.maxGear
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
}
