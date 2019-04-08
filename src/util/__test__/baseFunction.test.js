import { BaseFunction } from '../baseFunction'

describe('BaseFunction', () => {
    describe('removeItemFromListByIndex', () => {
        let fakeData = [1, 2, 3, 4]

        beforeEach(() => {
            fakeData = [1, 2, 3, 4]
        })

        it('could remove element by index', () => {
            const index = 2
            BaseFunction.removeItemFromListByIndex(fakeData, index)
            expect(fakeData).toEqual([1, 2, 4])
        })

        it('do nothing with invalid index', () => {
            const index = -2
            BaseFunction.removeItemFromListByIndex(fakeData, index)
            expect(fakeData).toEqual([1, 2, 3, 4])
        })

        it('works well as pass string index into', () => {
            const index = '1'
            BaseFunction.removeItemFromListByIndex(fakeData, index)
            expect(fakeData).toEqual([1, 3, 4])
        })
    })

    describe('getIndexFromListById', () => {
        const fakeData = [
            { name: 'li', id: 'li' },
            { name: 'li2', id: 'li2' },
            { name: 'li3', id: 'li3' },
            { name: 'li4', id: 'li4' },
            { name: 'li5', id: 'li5' }
        ]

        it('could get index by id by default', () => {
            expect(BaseFunction.getIndexFromListById(fakeData, 'li3')).toBe(2)
            expect(BaseFunction.getIndexFromListById(fakeData, 'li5')).toBe(4)
        })

        it('could get index by name', () => {
            expect(
                BaseFunction.getIndexFromListById(fakeData, 'li2', 'name')
            ).toBe(1)
            expect(
                BaseFunction.getIndexFromListById(fakeData, 'li4', 'name')
            ).toBe(3)
        })

        it('return -1 when not found result', () => {
            expect(BaseFunction.getIndexFromListById(fakeData, 'wang')).toBe(-1)
            expect(
                BaseFunction.getIndexFromListById(fakeData, 'wang', 'name')
            ).toBe(-1)
            expect(
                BaseFunction.getIndexFromListById(fakeData, 'li3', 'FAKE_FIELD')
            ).toBe(-1)
        })

        it('return -1 when data passed into is not an object-array', () => {
            const isNotAnObjectArray = [1, 2, 3, 4]
            expect(
                BaseFunction.getIndexFromListById(isNotAnObjectArray, 'li1')
            ).toBe(-1)
            expect(BaseFunction.getIndexFromListById([], '12')).toBe(-1)
            expect(BaseFunction.getIndexFromListById(undefined, '123')).toBe(-1)
        })
    })
})
