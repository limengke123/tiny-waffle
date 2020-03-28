export const compose = function<P>(
    ...fn: ((data: P) => P)[]
): (params: P) => P {
    return function(params: P): P {
        return fn.reduce((accumulation, item) => item(accumulation), params)
    }
}
