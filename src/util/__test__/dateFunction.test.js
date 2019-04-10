import { DateFunction } from '../dateFunction'

describe('DateFunction', () => {
    describe('currentTime', () => {
        it('should return formatted time string', () => {
            expect(DateFunction.currentTime).toMatch(
                // /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/
                /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1,2]\d|3[0, 1])\s([0, 1]\d|2[0-3]):([0-5]\d):([0-5]\d)/
            )
        })
    })

    describe('padWithZero', () => {
        it('should return string pad with zero', () => {
            expect(DateFunction.padWithZero('2')).toBe('02')
        })

        it('should handle number correctly like string', () => {
            expect(DateFunction.padWithZero(2)).toBe('02')
        })

        it('do nothing when string length is more than 2', () => {
            expect(DateFunction.padWithZero('12')).toBe('12')
        })

        it('do nothing when pass a number that more than 9', () => {
            expect(DateFunction.padWithZero(123)).toBe('123')
        })
    })
})
