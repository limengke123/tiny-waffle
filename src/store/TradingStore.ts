export interface TradeInfoView {
    buyingPrice: number // 买入价格
    buyingQuantity: number // 买入股数
    buyingMoney: number // 买入金额
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
            buyingPrice =
                this.basePrice - (currentGear - 1) * this.amplitudeInterval
            buyingMoney =
                this.investment *
                (1 + (currentGear - 1) * this.amplitudeInterval)
            buyingQuantity = buyingMoney / buyingPrice
            resultList.push({
                buyingPrice,
                buyingMoney,
                buyingQuantity,
                currentGear
            })
            currentGear++
        }
        return resultList
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
