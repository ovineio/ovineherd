import React, { useEffect, useMemo } from 'react'

import { getUrlParams } from '@core/utils/tool'
import Editor from '@ovine/editor/lib'

import { stashLayoutCtrl } from '~/components/layout/schema'

import getDesignPageApi from './api'

const defaultSchema = {
  type: 'page',
  title: '加载中...',
}

export default (props: any) => {
  const { computedMatch, location } = props
  const { pageId = '' } = computedMatch.params
  const label = getUrlParams('label', location.search) || '编辑页面'

  const apis = useMemo(() => {
    return getDesignPageApi(pageId)
  }, [pageId])

  useEffect(() => {
    const { title } = document
    document.title = '正在编辑...'
    return () => {
      document.title = title
      stashLayoutCtrl('set', true)
    }
  }, [])

  const editorOption = {
    schema: defaultSchema,
    breadcrumb: label,
    initApi: apis.getPage,
    saveApi: apis.savePage,
  }

  return <Editor {...editorOption} />
}
