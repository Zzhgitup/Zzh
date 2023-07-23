// 导入需要的模块和类型
import { defineClientConfig, usePageData, useSiteData } from "@vuepress/client";
import { onMounted } from "vue";
import ribbon from "../components/ribbon";
import figure from "../components/figure";
import codestroll from "../components/codestroll";
import { BackgroundOptions } from "../type";
// 声明来自插件定义的选项
declare const backgroundOptions: BackgroundOptions;
// 定义客户端配置
export default defineClientConfig({
  // enhance 方法用于增强 VuePress 应用
  enhance({ app, router, siteData }) {
    // 在路由导航触发前执行的回调函数
    router.beforeEach((to, from) => {});
    // 在路由导航完成后执行的回调函数
    router.afterEach((to, from) => {
      // console.log("after navigation" + to.path);
    });
  },
  // setup 方法用于在组件挂载后执行的回调函数
  setup() {
    onMounted(() => {
      // 根据插件定义的选项执行相应的背景动画
      switch (backgroundOptions.type) {
        case "figure":
          figure();
          break;
        case "ribbon":
          ribbon(
            backgroundOptions.ribbonOption?.zIndex,
            backgroundOptions.ribbonOption?.alpha,
            backgroundOptions.ribbonOption?.size
          );
          break;
        case "codestroll":
          codestroll();
          break;
        default:
          break;
      }
    });
  },
  layouts: {},
  rootComponents: [],
});
