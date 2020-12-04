export const sysAdmRoutes = [
  {
    nodePath: '/admin',
    limitLabel: '系统管理员',
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
        nodePath: 'self',
        icon: 'fa fa-user-circle-o',
      },
    ],
  },
]

export const userAdmRoutes = [
  {
    nodePath: '/admin',
    limitLabel: '普通管理员',
    label: '系统管理',
    icon: 'fa fa-windows',
    children: [
      {
        label: '用户列表',
        nodePath: 'user',
        // pathToComponent: 'admin/sys/page',
      },
      {
        label: '角色列表',
        nodePath: 'role',
        // pathToComponent: 'admin/sys/page',
      },
      {
        label: '个人中心',
        sideVisible: false,
        nodePath: 'self',
      },
    ],
  },
]
