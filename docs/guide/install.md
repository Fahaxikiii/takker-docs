# 安装

## 下载

[:link:__Takker仓库地址__](https://github.com/FYWinds/takker/)  
[:link:__下载页面__](https://github.com/FYWinds/takker/releases) (需要魔法工具)  
[:link:__下载地址 大陆加速镜像__](https://download.fastgit.org/FYWinds/takker/releases/download/v1.3.0/takker-v1.3.0.zip)
(v1.3.0 [fastgit.org](https://doc.fastgit.org/))

下载完成后解压即可

目录结构参考
```
bot
├── go-cqhttp
└── takker
```

## 安装依赖

使用Poetry创建虚拟环境并安装依赖
```bash{4}
# 此条可自行选择是否执行，执行效果为将虚拟环境的安装目录设定为当前目录的.venv文件夹，默认则是poetry的缓存目录
poetry config virtualenvs.in-project true --local

poetry install --no-dev
```