import { mount } from '@vue/test-utils'
import ListResults from '@/components/ListResults.vue'
import ListItem from '@/components/ListItem.vue'

describe('ListResults.vue', () => {
  it('component mount with array as prop', () => {
    const teamsToRender = new Array
    const wraper = mount(ListResults, {
      props: {
        teamsToRender: Array
      },
      children: [ListItem]
    })

    expect(wraper.is(ListResults)).toBe(true)

  })
})
