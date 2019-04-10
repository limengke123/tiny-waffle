import React from 'react'
import { render, mount, shallow } from 'enzyme'
import Counter from '../counter'

describe('Count', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockImplementation(() => 0.5)

    afterAll(() => {
        randomSpy.mockRestore()
    })

    it('should render correctly', () => {
        const wrapper = render(<Counter />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should handle change step correctly', () => {
        const wrapper = shallow(<Counter />)
        const instance = wrapper.instance()
        instance.changeStep()
        expect(instance.state).toMatchObject({
            count: {
                modifyInfo: {
                    step: 6
                }
            }
        })
    })

    it('should handle increase correctly', () => {
        const wrapper = shallow(<Counter />)
        const instance = wrapper.instance()
        instance.increase()
        expect(instance.state).toMatchObject({
            count: {
                number: 1,
                modifyInfo: {
                    type: 'Addition'
                }
            }
        })

        instance.state.count.modifyInfo.step = 3
        instance.state.count.number = 4
        instance.increase()
        expect(instance.state).toMatchObject({
            count: {
                number: 7,
                modifyInfo: {
                    type: 'Addition'
                }
            }
        })
    })

    it('should handle decrease correctly', () => {
        const wrapper = shallow(<Counter />)
        const instance = wrapper.instance()
        instance.decrease()
        expect(instance.state).toMatchObject({
            count: {
                number: -1,
                modifyInfo: {
                    type: 'Subtraction'
                }
            }
        })

        instance.state.count.modifyInfo.step = 4
        instance.state.count.number = 8
        instance.decrease()
        expect(instance.state).toMatchObject({
            count: {
                number: 4,
                modifyInfo: {
                    type: 'Subtraction'
                }
            }
        })
    })
})
