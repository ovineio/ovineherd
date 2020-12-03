import * as React from 'react'
import { OptionsControl } from 'amis'
import TextControl from 'amis/lib/renderers/Form/Text'

import { faArr } from '~/assets/fa'
import styled from 'styled-components'

// TODO: 1. 添加搜索功能 2. 添加分类 3. 添加更多 优秀的图标

const StyledIconItems = styled.div`
  padding: 0 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
    &:hover {
      background-color: #ddd;
    }
  }
  .active {
    background-color: #128cee;
  }
`

class IconSelector extends React.Component<any, any> {
  render() {
    const { value, onChange, ...reset } = this.props

    const onIconClick = (icon: string) => {
      reset.store.closeDrawer()
      onChange(icon)
    }

    const renderIcons = () => {
      return (
        <StyledIconItems>
          <ul>
            {faArr.map((fa) => {
              const icon = `fa fa-${fa}`
              return (
                <li onClick={() => onIconClick(icon)}>
                  <i className={`${icon} ${value === icon ? 'active' : ''}`} />
                </li>
              )
            })}
          </ul>
        </StyledIconItems>
      )
    }

    const props: any = {
      ...reset,
      value,
      onChange,
      addOn: {
        icon: value ? `${value} pull-left` : undefined,
        label: '选择图标',
        type: 'action',
        actionType: 'drawer',
        drawer: {
          title: '选择图标',
          position: 'top',
          closeOnOutside: true,
          size: 'sm',
          actions: [],
          body: {
            component: renderIcons,
          },
        },
      },
    }

    return <TextControl {...props} />
  }
}

export default OptionsControl({
  type: 'app-icon-selector',
})(IconSelector as any)
