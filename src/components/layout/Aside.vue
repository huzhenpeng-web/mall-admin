<template>
  <div class="Aside">
    <el-menu router :default-active="activeIndex" background-color="#333744" :unique-opened="true" text-color="#fff">
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
import { mapState } from 'vuex'
import { pathMap } from '@/utils/index'
export default {
  name: 'Aside',
  data () {
    return {
      // 侧边栏数据
      asideData: [
        {
          name: '统计分析',
          icon: 'icon-fenxi',
          path: '1',
          arr: [{ name: pathMap.dashboard, icon: 'icon-shujukanban', path: '/dashboard' }]
        },
        {
          name: '首页配置',
          icon: 'icon-setting',
          path: '2',
          arr: [
            { name: pathMap.swiper, icon: 'icon-lunbotu_fuzhi', path: '/swiper' },
            { name: pathMap.hot, icon: 'icon-rexiaochanpin', path: '/hot' },
            { name: pathMap.new, icon: 'icon-xinpin', path: '/new' },
            { name: pathMap.recommend, icon: 'icon-tuijian', path: '/recommend' }
          ]
        },
        {
          name: '模块管理',
          icon: 'icon-setting',
          path: '3',
          arr: [
            { name: pathMap.category, icon: 'icon-fenlei1', path: '/category' },
            { name: pathMap.good, icon: 'icon-31quanbushangpin', path: '/good' },
            { name: pathMap.guest, icon: 'icon-a-VIPhuiyuanhuiyuanka', path: '/guest' },
            { name: pathMap.order, icon: 'icon-shouye', path: '/order' }
          ]
        },
        {
          name: '系统管理',
          icon: 'icon-setting',
          path: '4',
          arr: [{ name: pathMap.account, icon: 'icon-mima', path: '/account' }]
        }
      ]
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
    height: 60px;
    line-height: 60px;
    color: #fff;
  }
}
</style>
