<template>
  <el-container style="height:100%;">
    <!--头部 -------- -->
    <el-header>
      <div class="topheader">
        <h2>656565656</h2>
        <div class="name">
          <el-avatar icon="el-icon-user-solid" class="Headportrait"></el-avatar>
          <el-dropdown class="eldropdown">
            <span class="el-dropdown-link" style="font-size: 18px; font-weight:800;">
              张三
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <!-- 容器------------------- -->

    <el-container>
      <!--左边导航 ------------- -->
      <el-aside width="200px">
        <el-col :span="24" style="height: 100%;">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height:100%;border:none;text-align:left;"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index">选项1</el-menu-item>
                <el-menu-item index="/index2">选项2</el-menu-item>
                <el-menu-item index="/index3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-3">
                <template slot="title">选项4</template>
                <el-menu-item index="1-3-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="/index4">
              <i class="el-icon-menu"></i>
              <span slot="title">导航4</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <!--右边 Main------------- -->
      <el-main style="padding:0px">
        <div class="right_top">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
html,
body {
  height: 100%;
}
.topheader {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
}

.Headportrait{
    width: 30px;
    height: 30px;
    line-height: 30px;
}
.name{
    display: flex;
}
.eldropdown {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.right_top {
  height: 56px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
