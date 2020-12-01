const menu = {
  nodePath: '/admin',
  limitLabel: '侧边栏目录',
  // component: () => 123,
  label: '',
  children: [
    {
      label: '页面管理',
      nodePath: 'sys/page',
      pathToComponent: 'admin/sys/page',
      icon: 'fa fa-window-restore',
    },
    {
      label: '发布应用',
      nodePath: 'sys/publish',
      icon: 'fa fa-rocket',
    },
    {
      label: '应用设置',
      nodePath: 'sys/setting/app',
      icon: 'fa fa-cog',
    },
    {
      label: '登录设置',
      nodePath: 'sys/setting/login',
      icon: 'fa fa-unlock-alt',
    },
    {
      label: '个人中心',
      sideVisible: false,
      nodePath: 'admin/self',
      icon: 'fa fa-user-circle-o',
    },
  ],
}

const routes = [menu]

export default routes
