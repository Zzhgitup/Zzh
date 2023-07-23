// 导入需要的模块和类型
import { App, PageOptions, PluginFunction } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import { BackgroundOptions, CanvasPluginType } from "./type";

// 获取当前文件所在目录的绝对路径
const __dirname = getDirname(import.meta.url);

// 定义插件函数，接受一个可选的 options 参数，并返回一个插件函数
const canvasPlugin = (options?: BackgroundOptions): PluginFunction => {
  // 返回一个对象，包含插件的名称、定义的选项和客户端配置文件的路径
  return (app) => {
    return {
      // 插件的名称
      name: "vuepress-plugin-canvas",
      // 定义的选项
      define: {
        backgroundOptions: options,
      },
      // 是否允许多个实例同时存在
      multiple: false,
      // 客户端配置文件的路径
      clientConfigFile: path.resolve(
        __dirname,
        "./client/canvas-client-config.ts"
      ),
    };
  };
};

// 导出插件函数和相关类型
export { canvasPlugin, CanvasPluginType };
