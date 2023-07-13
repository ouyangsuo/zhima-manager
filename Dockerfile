# 设置基础镜像
# FROM node:14-alpine
FROM nginx

# 给容器起个名字
LABEL name="zhima-manager"
LABEL version="1.0"

# 注入环境变量
# ENV NODE_ENV=production

# 设置工作目录
# WORKDIR /app

# 将项目依赖文件复制到工作目录
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# COPY package.json ./

# 安装项目依赖
# RUN npm install --production --silent && mv node_modules ../
# RUN npm install

# 将整个项目复制到工作目录
# COPY . .
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d

# 向宿主机暴露端口
EXPOSE 80

# 构建前端项目
# RUN chown -R node /usr/src/app
# USER node
# RUN npm run build

# 设置容器启动命令
# CMD ["npm", "start"]
