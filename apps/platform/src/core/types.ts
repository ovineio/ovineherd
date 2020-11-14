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

export enum ApiType {
  user = 'user',
  product = 'product',
  authorization = 'authorization',
  category = 'category',
  config = 'config',
}

export enum ApiName {
  login = 'login',
  list = 'list',
  one = 'one',
  add = 'add',
  edit = 'edit',
  del = 'del',
}

export type UserInfo = {
  avatar: string // 头像
  nickname: string // 昵称
  // eslint-disable-next-line
  real_name: string // 真实名字
  username: string // 登录账号
  type: string
}
