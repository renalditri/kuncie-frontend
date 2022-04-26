import { shallowMount } from '@vue/test-utils'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/Detail.vue'

describe('Home.vue', () => {
  const mockRouter = {
    push: jest.fn()
  }
  const wrapper = shallowMount(Home, {
    props: {
      classes: [{ id: 1, name: "contoh" }, { id: 2, name: "example" }],
      classesFilter: [{ id: 1, name: "contoh" }, { id: 2, name: "example" }],
    },
    global: {
      mocks: {
        $router: mockRouter
      }
    }
  })
  it('renders classes from prop classesFilter', () => {
    for ((item) in wrapper.props().classesFilter) {
      expect(wrapper.text()).toContain(item.name)
    }
  })

  it('links available', async () => {
    expect(wrapper.html()).toContain('to="/detail/1"')
  })

  it('input search changes prop classesFilter', async () => {
    const input = wrapper.find('#search');
    await input.setValue('cont')
    expect(wrapper.text()).toContain('cont')
  })

  it('search will show nothing if word doesnt exists', async () => {
    const input = wrapper.find('#search');
    await input.setValue('avcads')
    expect(wrapper.text()).not.toContain('avcads')
  })
})

describe('Detail.vue', () => {
  const wrapper = shallowMount(Detail, {
    props: {
      class_data: { mentors: [{ id: 1, name: "asd" }] },
    },
    global: {
      mocks: {
        $route: {
          params: {
            id: 1
          }
        }
      }
    }
  })

  it('renders classes from prop classesFilter', () => {
    for ((item) in wrapper.props().class_data) {
      expect(wrapper.text()).toContain(item.name)
    }
  })

  it('join class', async () => {
    await wrapper.find('#name_input').setValue('John');
    await wrapper.find('#email_input').setValue('john@mail.com');
    expect(wrapper.props().attendeeFullName == 'John');
    expect(wrapper.props().attendeeEmail == 'john@mail.com');
    await wrapper.find('#form_submit').trigger('click');
  })
})