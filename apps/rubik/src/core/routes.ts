const menu = {
  nodePath: '/admin',
  limitLabel: '侧边栏目录',
  label: '',
  children: [
    {
      label: '页面管理',
      nodePath: 'page',
      icon: 'fa fa-window-restore',
    },
    {
      label: '发布应用',
      nodePath: 'publish',
      icon: 'fa fa-rocket',
    },
    {
      label: '应用设置',
      nodePath: 'setting/app',
      icon: 'fa fa-cog',
    },
    {
      label: '登录设置',
      nodePath: 'setting/login',
      icon: 'fa fa-unlock-alt',
    },
    {
      label: '个人中心',
      sideVisible: false,
      nodePath: 'setting/self',
      icon: 'fa fa-user-circle-o',
    },
    {
      label: '个人中心',
      sideVisible: false,
      nodePath: 'design',
      icon: 'fa fa-user-circle-o',
    },
  ],
}

const routes = [menu]

export default routes
