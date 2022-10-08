<template>
  <div class="Aside">
    <el-menu @select="handleSelect" router :default-active="activeIndex" background-color="#333744" :unique-opened="true" text-color="#fff">
      <p>后台管理端</p>
      <el-submenu v-for="(item,index) in asideData" :key="index" :index="item.path">
        <template slot="title">
          <svg class="icon" aria-hidden="true" style="padding-right:5px;">
            <use :xlink:href="'#'+ item.icon"></use>
          </svg>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item2,index2) in item.arr" :key="index2" :index="item2.path">
            <template slot="title">
              <svg class="icon" aria-hidden="true" style="padding-right:5px;">
                <use :xlink:href="'#'+ item2.icon"></use>
              </svg>
              <span>{{item2.name}}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {
      // 侧边栏数据
      asideData: [
        {
          name: '统计分析',
          icon: 'icon-fenxi',
          path: '1',
          arr: [{ name: '数据分析', icon: 'icon-shujukanban', path: '/dashboard' }]
        },
        {
          name: '首页配置',
          icon: 'icon-setting',
          path: '2',
          arr: [
            { name: '轮播图配置', icon: 'icon-lunbotu_fuzhi', path: '/swiper' },
            { name: '热销商品配置', icon: 'icon-rexiaochanpin', path: '/hot' },
            { name: '新品上线配置', icon: 'icon-xinpin', path: '/new' },
            { name: '为您推荐配置', icon: 'icon-tuijian', path: '/recommend' }
          ]
        },
        {
          name: '模块管理',
          icon: 'icon-setting',
          path: '3',
          arr: [
            { name: '分类管理', icon: 'icon-fenlei1', path: '/category' },
            { name: '商品管理', icon: 'icon-31quanbushangpin', path: '/good' },
            { name: '会员管理', icon: 'icon-a-VIPhuiyuanhuiyuanka', path: '/guest' },
            { name: '订单管理', icon: 'icon-shouye', path: '/order' }
          ]
        },
        {
          name: '系统管理',
          icon: 'icon-setting',
          path: '4',
          arr: [{ name: '修改账户', icon: 'icon-mima', path: '/account' }]
        }
      ]
    }
  },
  methods: {
    ...mapMutations({ saveActivePath: 'SET_ACTIVEPATH' }),
    handleSelect(e) {
      this.saveActivePath(e)
    }
  },
  computed: {
    ...mapState(['activeIndex'])
  }
}
</script>

<style lang="less" scoped>
.Aside {
  height: 100%;
}

.el-menu {
  height: 100%;
  p {
    font-size: 20px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
}
</style>
