export type SiteEnvType = 'dev' | 'pre' | 'prd'
export type UrlParams = {
  orgId: string
}

export type CustomType = {
  desc: string
  enable_register_org: '0' | '1'
  favicon: string
  login_bg_img: string
  login_intro_img: string
  login_logo: string
  login_title: string
  logo: string // 导航LOGO
  name: string // 用于 浏览器标题展示
  slogan: string // 用于 浏览器标题展示
  title: string // 导航L标题
  type: string // 类型
  isolation: boolean // 是否独立
}

export type AppInfo = {
  type: AppType
  isOrg: boolean
  isSys: boolean
  isSysAdmLogin: boolean
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
  id: string
  avatar: string // 头像
  nickname: string // 昵称
  real_name: string // 真实名字
  username: string // 登录账号
  type: string
}
