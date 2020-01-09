<template>
  <div style="height:100%;">
    <div v-if="CreateID" style="height:100%;">
      <el-container style="height:100%;">
        <!--头部 -------- -->
        <el-header>
          <div class="topheader">
            <div class="topheader-left">
              <h2>后台管理系统</h2>
              <div @click="changeStatus">
                <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                <i class="el-icon-s-fold" v-else></i>
              </div>
            </div>

            <div class="topheader-right">
              <div style="margin-right:40px">
                <el-badge :value="10" :max="99" class="item">
                  <i class="el-icon-bell"></i>
                </el-badge>
              </div>

              <div style="margin-right:30px">
                <el-popover placement="top" width="350" v-model="visible">
                  <el-input type="textarea" v-model="data" v-if="isedit"></el-input>
                  <p v-else>{{data}}</p>
                  <div style="text-align:right; margin: 0">
                    <el-button size="mini" type="text" @click="isedit=true" v-show="!isedit">编辑</el-button>
                    <el-button size="mini" type="text" @click="isedit=false" v-show="isedit">取消编辑</el-button>
                    <el-button type="text" size="mini" @click="visible = false" v-show="isedit">保存</el-button>
                  </div>
                  <i class="el-icon-s-flag" slot="reference"></i>
                </el-popover>
              </div>
              <el-avatar icon="el-icon-user-solid" class="Headportrait"></el-avatar>
              <el-dropdown class="eldropdown" @command="logOut">
                <span class="el-dropdown-link" style="font-size: 18px; font-weight:800;">
                  张三
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人中心</el-dropdown-item>
                  <el-dropdown-item command="b">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <!-- 容器------------------- -->
        <el-container>
          <!--左边导航 ------------- -->
          <el-aside width="200px" id="leftelaside">
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
                    <i class="el-icon-s-home"></i>
                    <span>主页</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/index">选项1</el-menu-item>
                    <el-menu-item index="/index2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-3">
                    <template slot="title">选项3</template>
                    <el-menu-item index="/index3">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="/index4">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航4</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>

          <!--右边 Main------------- -->
          <el-main style="padding:0px">
            <div>
              <el-tabs
                v-model="editableTabsValue"
                type="border-card"
                closable
                @tab-click="clickTab"
                @tab-remove="removeTab"
              >
                <el-tab-pane
                  v-for="(item) in editableTabs"
                  :key="item.id"
                  :label="item.title"
                  :name="item.name"
                >
                  <router-view />
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div v-else>
      <home-login></home-login>
    </div>
  </div>
</template>

<script>
import homeLogin from "@/view/login";
export default {
  name: "App",
  data() {
    return {
      isCollapse: false, //
      CreateID: 0,
      visible: false, //是否显示便签
      data:
        "便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录",
      isedit: false, ////是否编辑便签

      editableTabsValue: "/index2",
      editableTabs: [
        {
          id: "0",
          title: "首页",
          name: "/index"
        },
        {
          id: "2",
          title: "选项2",
          name: "/index2"
        },
        {
          id: "3",
          title: "选项3",
          name: "/index3"
        }
      ],
      tabIndex: 2
    };
  },

  created() {
    setTimeout(() => {
      document.getElementById("tab-/index").innerHTML = "首页";
    }, 0);
    console.log("app.vue created");
    this.CreateID = localStorage.getItem("CreateID");
    console.log(this.CreateID);
    if (!this.CreateID) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  components: {
    homeLogin
  },
  methods: {
    addTab(targetName) {
      console.log(1111111);
      let array = this.editableTabs;
      var falg = true;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (targetName.path == element.name) {
          falg = false;
          break;
        }
      }
      this.tabIndex = this.tabIndex + 1;
      if (falg) {
        this.editableTabs.push({
          id: this.tabIndex,
          title: targetName.name,
          name: targetName.path
        });
        this.editableTabsValue = targetName.path;
      }
    },

    clickTab(targetName) {
      console.log(targetName);
      this.$router.push({
        path: targetName.name
      });
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.editableTabsValue = activeName;
              this.$router.push({
                path: activeName
              });
            }
          }
        });
      }

      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    changeStatus() {
      this.isCollapse = this.isCollapse ? false : true;
      if (this.isCollapse) {
        document.getElementById("leftelaside").style.width = "auto";
      } else {
        document.getElementById("leftelaside").style.width = "200px";
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goBack() {
      this.$router.go(-1);
    },
    logOut(command) {
      console.log("command", command);
      //command等于b说明点的是退出
      if (command == "b") {
        this.$confirm("此操作将退出账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            /**
             * 备注：回到登录页面的逻辑梳理
             * 1、点击退出登录按钮;
             * 逻辑处理1：（1）app vue中CreateID设置为0；（2）清除CreateID字段的缓存，但是不清除其他字段的缓存（比如：记住密码）；
             * 2、用户手动输入login或者"/"进入登陆页面；
             * 逻辑处理2：（1）app vue中CreateID设置为0；（2）清除CreateID字段的缓存，但是不清除其他字段的缓存（比如：记住密码）；
             */
            this.CreateID = 0;
            localStorage.setItem("CreateID", "");
            console.log("跳转到登录界面");
            this.$router.push({
              path: "/login"
            });
          })
          .catch(() => {});
      } else {
        this.$message("暂无个人中心页面");
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
      this.editableTabsValue = to.path;
      this.addTab(to);
      this.currentRouteName = to.meta.title;
      if (to.name == "login") {
        this.CreateID = 0;
        localStorage.setItem("CreateID", "");
      }
    },
    visible: function(newval, oldval) {
      console.log(newval, oldval);
      if (!newval) {
        this.isedit = false;
      }
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
.topheader i {
  font-size: 22px;
}
.topheader-left {
  display: flex;
  align-items: center;
}
.topheader-left h2 {
  width: 180px;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
}

.Headportrait {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.topheader-right {
  display: flex;
  align-items: center;
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
