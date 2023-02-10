<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-11 15:34:30
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 13:12:14
-->
# vue3-ts-template说明文档


### 框架说明
该框架是采用vue3（v3.2.4）+typescript（v4.3.5）+Prettier的移动端H5框架
### 目录结构说明
+ src
  + assets
    + css
      + baseLess.less------（公共css）
      + variable.less------（全局less变量）
    + img------------------（图片资源文件）
    + fonts
  + base-ui-------------（非业务组件）
    + form
      + src
        + form.vue
      + types-----------（类型定义）
      + index.ts--------（组件入口文件）
  + components--------（可复用组件）
    + nav-bar
      + src
        + NavBar.vue
      + types-----------（类型定义）
      + index.ts--------（组件入口文件）
  + hooks---------------（功能抽离，类似vue2 mixins）
    + use-page-search.ts
  + layout--------------（系统布局文件，系统入口路径'/'）
  + register-------------（全局注册）
    + index.ts
    + register-api.ts----（全局api,vue3访问挂载到原型的对象过于麻烦，故可不适用这种方式）
    + register-cpns.ts------（注册全局组件）
    + register-uicpn.ts------(element-plus/antd需要在此文件注册要用的组件，vant通过其按需加载配置，则不需要引入注册)
  + service------------------（axio网络请求相关）
    + modules--------（组件api）
      + login
        + login.ts----(api)
        + types.ts----(参数类型)
    + request--------（封装request）
      + config.ts----（网络请求配置）
      + index.ts-----（封装request类）
      + types.ts-----（类型）
    + index.js---------（request实例）
  + icon
    + svg--------------（svg资源文件）
    + index.ts---------（加载所有svg资源文件）
  + router
    + modules----------（路由模块文件，同/views页面文件划分一致）
    + index.ts
  + store
    + modules----------（状态管理模块文件，同/views页面文件划分一致）
    + index.ts---------（入口文件）
    + types.ts---------（类型定义）
  + utils--------------（工具方法）
    + map-menus.ts---------------（解析路由文件，根据菜单鉴权生成路由）
    + global-constant.ts---------（全局常量定义）
    + cache.ts-------------------（缓存工具方法）
    + utils.ts-------------------（工具方法）
  + views
    + org-admin
      + cpns-----------------------（页面组件）
      + index.vue 
+ types----------------------------（全局类型声明）
  + request.d.ts
### 文件格式及命名规范
  + 文件夹/ts文件
  > 英文小写+ ‘-’横杠连接 例：org-admin
  + vue文件
  > 除了index.vue外其他均大驼峰命名（PascalCase） 例：LoginPanel.vue
  + hooks文件
  > 以use开头横杠连接 例：use-page-search.ts
  + 类型文件
  > 相应模块内部的类型：types.ts  全局类型声明：request.d.ts

### 模块划分规范
> router\store\views 的modules文件划分保持一致
### 引用组件顺序
+ 先引用第三方组件库，引用当前项目组件, 然后是 utils 里的公共函数库, 最后是 css 样式，建议隔行分块
```
import { vue } from 'vue';
import { Dropdown, Menu, Icon } from 'antd';
import Header from './Header';
import LocalCache from 'utils';
import './base.less';

```
### 网络请求api
+ api不进行全局挂载到vue原型
```
//挂载
app.config.globalProperties.$axios = axios;
//使用
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
console.log(proxy.$axios)
```
> 因为使用繁琐,因此使用api时采用局部按需引入
```
import { accountLoginRequest } from "@/service/modules/public/public";

```
+ 拦截器调整
> 系统内要增加的拦截器特性只能加到request实例的拦截器上，即@/service/index.ts文件

### 路由router
> 路由拦截器跳转不使用用next,使用return undefined
> 路由模块文件格式
```
const ClassManageIndex = () => import("@/views/personal-center/components/ClassManageIndex.vue");
export default {
    path: "/ClassManageIndex",
    name: "ClassManageIndex",
    component: ClassManageIndex,
    children: [],
    meta: {
        title:'课表管理',
        isHideRoute: true,//非菜单路由
        parentSpyCode: "zxb_01",//处理非菜单路由选中效果selectedKeys
    },
};
```
### vue3的css新特性补充
##ts规范

+ 命名规范
> 函数、属性使用 camelCase 命名

> 类型名使用PascalCase，

> 枚举对象本身和枚举成员都使用 PascalCase 命名

> 接口前不要加I

> 不要为私有属性名添加_前缀，使用private修辞符
+ 类型声明规范

> 在每个文件中，类型定义应该放在最前面

> 尽量减少使用any作为类型，类型应尽量详细（建议）

> 在进行类型声明时应尽量依靠 TS 的自动类型推断功能，如果能够推断出正确类型尽量不要再手动声明

+ interface声明顺序
> 只读参数放第一位，必选参数第二位，可选参数次之，不确定参数放最后
```
interface Props {
  readonly x: number;
  readonly y: number;
  name: string;
  age: number;
  height?: number;
  [propName: string]: any;
}

```
+ 回调函数
> 为返回值会被忽略的回调函数设置返回值类型void
> 不要在回调函数里使用可选参数
```
// Good
interface Fetcher {
    getObject(done: (data: any, elapsedTime: number) => void): void;
}
```
+ 函数重载
注：在函数的重载中，实现函数不能直接被调用，需要有对应的声明函数
> 不要把模糊的重载放在具体的重载前面,应该把具体的排在模糊的之前：
```
// Good
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string

```
+ 类
> 类成员声明时除了public成员，其余成员都应该显式加上作用域修辞符。
```
// Good
class Foo {
    private foo = 'foo'
    bar = 'bar'
    getFoo() {
        return this.foo
    }
}
const foo = new Foo()
foo.getFoo()
foo.bar

```
+ 定义文件（.d.ts）书写规范
> 全局类型/变量统一写在xx.d.ts文件中
+ 项目中定义网络请求api
> 必须定义api的请求参数和返回参数类型
```
//index.ts
export function accountLoginRequest(data: ILoginReq) {
  return jfRequest.post<IResultType<ILoginResult>>({
    url: "/public/login",
    data,
  });
}
//types.ts
export interface ILoginReq {
  type: string;
  token?: string;
  orgCode?: string|number;
}
export interface ILoginResult {
  grade: string;
  username: string;
  showType: string;
}

```
+ ts工具泛型推荐

Record<string,any> 用这个来声明对象结构的类型
```
用于定义一个javascript的对象，key是字符串，value是任意类型
const people:Record<string,any> = {
    name: 'chengfeng',
    age: 10
}
```
Partial 作用是将传入的属性变为可选项
```
interface iPeople {
    title: string;
    name: string;
}

const people: Partial<iPeople> = {
    title: 'Delete inactive users',
};
定义的结构可以是接口iPeople的任意key

```

Required 的作用是将传入的属性变为必选项
```
interface iPeople {
    title?: string;
    name?: string;
}

const people1: Props = { title: 'ts' }; // OK

const people22: Required<iPeople> = { title: 'ts' }; // Error: property 'name' missing

```
参考：
https://juejin.cn/post/7047843645273145358#heading-21
https://juejin.cn/post/6844903849166110728#heading-16

