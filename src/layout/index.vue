<template>
  <el-container class="index" ref="index">
    <el-header class="index-h">
      <div>
        <div class="fr">
          <el-button size="small" @click="logout" round>退出登录</el-button>
        </div>
        <img src="../assets/vue.png" alt="Alternate Text" />
        结算系统后台
      </div>
    </el-header>

    <el-container class="index-cnt">
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        class="index-cnt-aside"
        :class="{ open: !isCollapse }"
      >
        <el-aside class="index-aside" :class="{ open: !isCollapse }">
          <!--导航菜单-->
          <el-menu :default-active="$route.path" :collapse="isCollapse" router>
            <el-submenu
              v-for="(item, index) in activePaths"
              :index="index++ + ''"
              :key="index"
            >
              <template slot="title"
                ><i :class="item.meta && item.meta.icon"></i>
                <span slot="title">{{ item.meta && item.meta.ttl }} </span>
              </template>
              <el-menu-item-group>
                <router-link
                  :index="index + '-' + index2"
                  class="el-menu-item"
                  :to="child.path ? item.path + '/' + child.path : item.path"
                  active-class="is-active"
                  v-for="(child, index2) in item.children"
                  :key="child.path"
                  tag="li"
                  exact
                  :hidden="child.hidden"
                >
                  {{ child.meta && child.meta.ttl }}
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-scrollbar>

      <div class="index-main">
        <el-main class="column">
        
          <!-- 导航条 -->
          <ul class="index-main-nav">
            <li>
              <i
                class="index-h-icon"
                @click="isCollapse = !isCollapse"
                :class="isCollapse ? 'el-icon-s-unfold ' : 'el-icon-s-fold'"
              ></i>
            </li>
            <router-link
              class="li-link"
              tag="li"
              v-for="(item, index) in navbars"
              :key="index"
              :to="'' + item.path"
              >{{ item.meta.ttl }}</router-link
            >
          </ul>

          <!-- 路由页 -->
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>

          <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            size="small"
          >
            <span>确定退出登录?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logout">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      admin: "admin",
      centerDialogVisible: false,
      isCollapse: false,
      navbars: [],
    };
  },
  methods: {
    logout() {
      this.$confirm(" 是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push("/login");
      });
    },
    // 设置动态导航条
    getnavbars() {
      this.navbars = this.$route.matched.filter(
        (item) => item.meta && item.meta.ttl
      );
    },
  },
  computed: {
    activePaths() {
      return this.$router.options.routes.filter((item) => !item.hidden);
    },
  },
  watch: {
    $route() {
      this.getnavbars();
    },
  },
  created() {
    this.getnavbars();
  },
  mounted() {
    // 设置 iframe 高度
    var $el = document.querySelector(".index");
    resetWidth();
    window.onresize = function () {
      resetWidth();
    };
    function resetWidth() {
      var win_h = $el.offsetHeight;
      var h_w = $el.querySelector(".index-h").offsetHeight;
      document.querySelector(".index-cnt").style.height = win_h - h_w + "px";
    }
  },
};
</script>

<style lang="scss" scoped></style>
