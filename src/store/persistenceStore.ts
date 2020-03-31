/**
 * 本地持久化存储设置
 * */
import { v4 as uuidv4 } from 'uuid'
import { TradingStoreProps } from './TradingStore'

export interface PersistenceStoreProps {
    storage?: Storage
    persistenceKey?: string
}

export interface PersistenceDataView<T> {
    // 持久化的保存数据格式
    id: string
    date: string
    data: T
}

export interface responseData<T, E = Error> {
    success: boolean
    error?: E
    data?: T
}

class PersistenceStore<K> {
    storage: Storage = localStorage // 存储引擎，默认用 localStorage，备选可以有 sessionStorage

    private persistenceKey = 'trade_list'

    constructor(props: PersistenceStoreProps) {
        props.storage && (this.storage = props.storage)
        props.persistenceKey && (this.persistenceKey = props.persistenceKey)
    }

    static generateKey(): string {
        return uuidv4()
    }

    static generateDate() {
        return new Date().toLocaleString()
    }

    public getPersistenceView(): responseData<K> {
        try {
            const data = this.storage.getItem(this.persistenceKey)
            if (data) {
                return {
                    success: true,
                    data: JSON.parse(data)
                }
            }
            return {
                success: true,
                data: undefined
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    public savePersistenceView(data: K): responseData<K> {
        try {
            const dataString = JSON.stringify(data)
            this.storage.setItem(this.persistenceKey, dataString)
            return {
                success: true,
                data
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    public setStorage(storage: Storage) {
        this.storage = storage
    }
    public getStorage() {
        return this.storage
    }
    public getPersistenceKey() {
        return this.persistenceKey
    }
    public setPersistence(key: string) {
        this.persistenceKey = key
    }
}

export class TradeInfoViewPersistence<
    T extends PersistenceDataView<TradingStoreProps>[]
> extends PersistenceStore<T> {
    public addData(dataParams: TradingStoreProps): responseData<T> {
        const id = PersistenceStore.generateKey()
        const data = {
            id,
            date: PersistenceStore.generateDate(),
            data: dataParams
        }
        try {
            const getResponse = this.getPersistenceView()
            if (getResponse.success && getResponse.data) {
                getResponse.data.push(data)
                const saveResponse = this.savePersistenceView(getResponse.data)
                if (saveResponse.success) {
                    return {
                        success: true,
                        data: saveResponse.data
                    }
                }
                throw saveResponse.error
            }
            throw getResponse.error
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }

    public removeDataById(id: string): responseData<string> {
        try {
            const getResponse = this.getPersistenceView()
            if (getResponse.success && getResponse.data) {
                const index = getResponse.data.findIndex(item => item.id === id)
                const list = getResponse.data
                list.splice(index, 1)
                this.savePersistenceView(list)
                return {
                    success: true,
                    data: id
                }
            }
            return {
                success: true,
                data: id
            }
        } catch (e) {
            return {
                success: false
            }
        }
    }
}
