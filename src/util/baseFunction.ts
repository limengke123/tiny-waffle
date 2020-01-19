class BaseFunction {
    /**
     * @summary 从数组中移除对应索引位置的元素
     * @param data - {array} - 数据源
     * @param index - {number} - 索引值
     * @return {void}
     * */
    static removeItemFromListByIndex(data: any[], index: number | string) {
        if (typeof index !== 'number') {
            index = parseInt(index, 10)
        }
        if (Array.isArray(data) && index >= 0 && index < data.length) {
            data.splice(index, 1)
        }
    }

    /**
     * @summary 依据id获取元素在数组的索引
     * @param data - {array} - 数据源
     * @param target - {any} - 目标值
     * @param keyType - {string} - 依据的key类型 - id
     * @return {number} index
     * */
    static getIndexFromListById<T extends any, S extends any>(
        data: S[],
        target: T,
        keyType: keyof S = 'id'
    ): number {
        if (Array.isArray(data)) {
            return data.findIndex((item: S) => item[keyType] === target)
        }
        return -1
    }
}

export { BaseFunction }
