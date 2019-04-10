import React from 'react'
import { render } from 'enzyme'
import { Count } from '../count'

describe('count', () => {
    it('should render correctly', () => {
        const wrapper = render(<Count />)
        expect(wrapper).toMatchSnapshot()

        const countInfo = {
            number: 5,
            modifyInfo: {
                time: '2019-2-12 12:24:39',
                type: 'Addition',
                step: 2
            }
        }
        const wrapper1 = render(<Count countInfo={countInfo} />)
        expect(wrapper1).toMatchSnapshot()
    })
})
