<template>
  <div class>
    <el-menu :collapse="$store.state.menuCollapsed" router>
      <template v-for="(item,index) in menuList">
        <el-submenu v-if="item.children" :key="index" :index="`${item.path}`">
           
          <template slot="title">
             <i :class="item.meta.icon"></i>
            &nbsp;
           <span slot="title"> {{item.meta.title}}</span>
          </template>
          <template v-for="(subItem,key) in item.children">
            <el-menu-item
              :key="key"
              :index="`/${item.path}/${subItem.path}`"
              v-if="!subItem.meta.notMenu"
            >
              <i :class="subItem.meta.icon"></i>&nbsp;{{subItem.meta.title}}
              <!-- <span slot="title"></span> -->
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :key="index" v-else :index="`/${item.path}`">
          <template v-if="!item.meta.notMenu">
            <i :class="item.meta.icon"></i>
            &nbsp;
            <span slot="title">{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
 
<script>
import { basicRoutes } from '@/router.js'
export default {
  name: 'Menu',
  data() {
    return {
      defaultActive: '/articles',
      menuList: Object.freeze(basicRoutes)
    }
  }
}
</script>
 