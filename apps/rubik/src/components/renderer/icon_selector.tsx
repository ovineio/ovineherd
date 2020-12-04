import * as React from 'react'
import { OptionsControl } from 'amis'
import TextControl from 'amis/lib/renderers/Form/Text'

import { faArr, iconArr } from '~/assets/fa'
import styled from 'styled-components'

const iconConfig = [
  // 只有CXD 主题才有这些图标
  {
    prefix: 'iconfont icon-',
    icons: iconArr,
  },
  {
    prefix: 'fa fa-',
    icons: faArr,
  },
]

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
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
    transition: transform 100ms ease-in;
    &:hover {
      background-color: #ddd;
      transform: scale(2.5);
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      cursor: pointer;
    }
  }
  .active {
    background-color: rgb(187 225 255);
  }
`

class IconSelector extends React.Component<any, any> {
  render() {
    const { value, onChange, ...reset } = this.props

    const onIconClick = (icon: string) => {
      reset.store.closeDrawer()
      onChange(icon)
    }

    const renderIcons = (option, index) => {
      const { icons, prefix } = option

      return (
        <>
          <ul key={index}>
            {icons.map((ic) => {
              const icon = `${prefix}${ic}`
              return (
                <li className={value === icon ? 'active' : ''} onClick={() => onIconClick(icon)}>
                  <i className={`${icon}`} />
                </li>
              )
            })}
          </ul>
          {index !== iconConfig.length - 1 && (
            <div className="cxd-Divider cxd-Divider--dashed"></div>
          )}
        </>
      )
    }

    const renderIconList = () => {
      return <StyledIconItems>{iconConfig.map(renderIcons)}</StyledIconItems>
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
          size: 'md',
          actions: [],
          body: {
            component: renderIconList,
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
