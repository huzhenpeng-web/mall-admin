const state = {
  // 当前激活的地址
  activeIndex: '/dashboard',
  // 选择的页面名称 默认为大盘数据
  activeName: '大盘数据',
  // 管理员信息
  user: JSON.parse(localStorage.getItem('admin')) || {},
  token: '' || localStorage.getItem('token')
}

export default state
