export interface TradingStoreBaseInfoProps {
    name?: string
    code?: string
}
export class TradingStoreBaseInfo {
    private name: string = ''
    private code: string = ''

    constructor(props?: TradingStoreBaseInfoProps) {
        if (props) {
            props.name && (this.name = props.name)
            props.code && (this.code = props.code)
        }
    }

    public getName() {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }
    public getCode() {
        return this.code
    }
    public setCode(code: string) {
        this.code = code
    }
}
