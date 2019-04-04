class BaseFunction {
    /**
     * @summary 从数组中移除对应索引位置的元素
     * @param data - {array} - 数据源
     * @param index - {number} - 索引值
     * @return {void}
     * */
    static removeItemFromListByIndex(data, index) {
        if (Array.isArray(data)) {
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
    static getIndexFromListById(data, target, keyType = 'id') {
        if (Array.isArray(data)) {
            return data.findIndex(item => item[keyType] === target)
        }
        return -1
    }
}

export { BaseFunction }
