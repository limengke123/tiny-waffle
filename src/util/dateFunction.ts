class DateFunction {
    static get currentTime(): string {
        const date = new Date()
        const [year, month, day, hours, minutes, seconds] = [
            date.getFullYear(),
            DateFunction.padWithZero(date.getMonth() + 1),
            DateFunction.padWithZero(date.getDate()),
            DateFunction.padWithZero(date.getHours()),
            DateFunction.padWithZero(date.getMinutes()),
            DateFunction.padWithZero(date.getSeconds())
        ]
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    /**
     * @summary 当时间字符串是一位数字的时候，给字符串补齐0
     * @example 9 -> 09
     * @param data - {string} - 原始数据
     * @return {string}
     * */
    static padWithZero(data: any) {
        const stringData = typeof data !== 'string' ? data.toString() : data
        return stringData.padStart(2, '0')
    }
}

export { DateFunction }
