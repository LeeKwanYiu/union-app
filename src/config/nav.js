export const navList = [
  {
    key: 'home',
    title: '首页',
    path: '/',
  },
  {
    key: 'union',
    title: '项目管理',
    path: '/union',
  },
  {
    key: 'myunion',
    title: '我的社团',
    path: '/myunion',
  }
]

export const adminNav = [
  {
    key: 'application',
    title: '申请列表',
    path: '/application',
  },
  {
    key: 'userlist',
    title: '用户列表',
    path: '/userlist'
  },
  {
    key: 'unionlist',
    title: '社团列表',
    path: '/unionlist'
  }
]

export const unionNavList = params => [
  {
    key: 'introduction',
    title: '简介',
    path: `/myunion/${params}/introduction`
  },
  {
    key: 'users',
    title: '成员管理',
    path: `/myunion/${params}/users`
  },
  {
    key: 'project',
    title: '项目管理',
    path: `/myunion/${params}/projects`
  },
  {
    key: 'applycationList',
    title: '申请列表',
    path: `/myunion/${params}/applications`
  }
]