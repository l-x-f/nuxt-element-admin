# nuxt-element-admin

基于 nuxt 和 element 的 后台 admin,支持国际化，动态路由，svg 图标等。

## 运行环境

```sh
   git:  ^1.7.1
   node: 12.18.3
   npm: 6.14.6
   yarn: 1.22.5
   nginx: 1.16.1
   pm2: 4.4.0
```

## 页面目录介绍

```sh

├── api                #页面请求
├── assets             #静态文件
├── components         #组件
├── routers            #路由配置，仅用于面包屑和侧边栏的生成
├── globalComponents   #全局组件
├── layouts            #页面基本布局
├── locales            #国际化配置
│   ├── en-US
│   └── zh-CN
├── middleware         #中间件
├── mixins             #混入
├── pages              #页面
│   └── home
├── plugins            #插件
├── static
├── store              #数据仓库
├── styles             #全局样式和样式变量
├── test
└── utils              #工具

```

## 启动

```bash
 yarn install &&  yarn dev
```

## 提交代码

```sh
./update.sh
```

## 服务器环境搭建 和 项目部署

1. 服务器环境搭建

   安装下面软件

   ```bash
   git:  ^1.7.1
   node: 12.18.3
   npm: 6.14.6
   yarn: 1.22.5
   nginx: 1.16.1
   pm2: 4.4.0
   ```

2. 项目部署（第一次初始化项目）

   1. 进入目录

      ```bash
      cd ~
      ```

   2. 拉取代码

      ```bash
      git  clone http://xx.xxx.git
      ```

   3. 安装依赖

      ```bash
        yarn
      ```

   4. 打包

      **生产环境**

      ```bash
        yarn build:prod
      ```

   5. 部署

      ```bash
      pm2 start npm --name "nuxt-element-admin" -- run start
      ```

   6. nginx 配置

      **生产环境**

      `/etc/nginx/conf.d/web.conf`

      ```nginx
      server {

        listen 8080; #监听端口
        server_name xx.xx.xx.xx;  #域名或本地服务器ip
          location / {
            proxy_pass http://127.0.0.1:8368;
          }

        }
      ```

3. **常用** 项目部署（初始化后）

   **生产环境**

   ```sh
   cd   ~/nuxt-element-admin
   ```

   ```sh
    pm2 restart "nuxt-element-admin"
   ```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
