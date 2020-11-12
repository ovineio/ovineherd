export type AppType = 'sys' | 'org'
export type UrlParams = {
  orgId: string
}

export type CustomType = {
  logo: string // 企业标志
  title: string // 企业标题
  slogan: string // 企业标语
  isolation: boolean // 是否独立
}

export type AppInfo = {
  type: AppType
  isOrg: boolean
  isSys: boolean
  orgId?: string
}
