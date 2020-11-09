import React from 'react'

import { Amis } from '@core/components/amis/schema'
import { useImmer } from '@core/utils/hooks'
import { choice } from '@core/utils/tool'

import * as S from './styled'

const testImgs = [
  'https://striker.teambition.net/thumbnail/110icf34e88844ff7d5a862d8373b2a7f2e6/w/600/h/300',
  'https://tcs-ga.teambition.net/thumbnail/110z3251840899548ed5f8779ecc5d4afe64/w/600/h/300',
  'https://tcs-ga.teambition.net/thumbnail/111t8347eb9f695618c61aa97eff2b5318a1/w/600/h/300',
]

const icoImg = 'https://cp.greennode.info/favicon.ico'

type ItemProps = {
  // info: any
  toggleDialog: () => void
}
const CardItem = (props: ItemProps) => {
  const { toggleDialog } = props

  const itemBgStyle = {
    backgroundImage: `url(${choice(testImgs)})`,
  }
  const icoImgStyle = {
    backgroundImage: `url(${icoImg})`,
  }

  return (
    <S.StyledCardItem className="col-lg-3" onClick={toggleDialog}>
      <div className="item-content">
        <div className="item-cover" style={itemBgStyle} />
        <div className="item-mask" />
        <ul className="item-actions">
          <li className="fa fa-cog" data-tooltip="编辑" data-position="bottom" />
          <li className="fa fa-trash-o" data-tooltip="删除  " data-position="bottom" />
        </ul>
        <div className="item-info">
          <h6 className="item-title">
            <i style={icoImgStyle} />
            <span>项目名称好牛逼</span>
          </h6>
          <p>
            一大堆描述文案。，一大堆描述文案一大堆描述文案一大堆描述文案大堆描述文案一大堆描述文案一大堆描述文案大堆描述文案一大堆描述文案一大堆描述文案大堆描述文案一大堆描述文案一大堆描述文案
          </p>
        </div>
      </div>
    </S.StyledCardItem>
  )
}

type State = {
  showUpdateDialog: boolean
  activeItemInfo: any
}

const initState = {
  showUpdateDialog: false,
  activeItemInfo: {},
}

export default () => {
  const [state, setState] = useImmer<State>(initState)

  const { showUpdateDialog, activeItemInfo } = state

  const toggleDialog = (toggle, info = {}) => {
    setState((d) => {
      d.showUpdateDialog = typeof toggle === 'boolean' ? toggle : !d.showUpdateDialog
      d.activeItemInfo = info
    })
  }

  const updateDialogSchema = {
    type: 'dialog',
    show: showUpdateDialog,
    onClose: toggleDialog,
    title: '创建一个新应用',
    data: activeItemInfo,
    bodyClassName: 'p-b-none',
    body: {
      type: 'form',
      controls: [
        {
          type: 'text',
          name: 'name',
          label: '名称',
          placeholder: '请填写应用名称',
          required: true,
        },
        {
          type: 'text',
          name: 'path',
          label: '短路径',
          placeholder: '不填将自动生成',
          description: '后续将不能修改',
        },
        {
          type: 'textarea',
          name: 'remark',
          label: '应用描述',
          placeholder: '请填写应用描述',
        },
        {
          type: 'divider',
        },
        {
          type: 'group',
          label: ' ',
          controls: [
            {
              type: 'image',
              name: 'logo',
              mode: 'nomral',
              label: '上传LOGO',
            },
            {
              type: 'image',
              name: 'bg_img',
              mode: 'nomral',
              labelClassName: 'text-right',
              label: '背景图片',
            },
          ],
        },
      ],
    },
  }

  return (
    <S.StyledAppCards className="container">
      <h5 className="m-b-md">我的应用</h5>
      <div className="row no-gutters items-grid">
        <div className="col-lg-3">
          <div className="new-item" onClick={toggleDialog}>
            <i className="iconfont icon-plus m-b-sm" />
            <span>添加一个新应用</span>
          </div>
        </div>
        <CardItem toggleDialog={() => toggleDialog(true, {})} />
        <CardItem toggleDialog={() => toggleDialog(true, {})} />
        <CardItem toggleDialog={() => toggleDialog(true, {})} />
      </div>
      <Amis schema={updateDialogSchema} />
    </S.StyledAppCards>
  )
}
