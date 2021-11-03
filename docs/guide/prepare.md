# 准备

__本段内容包括:__

:heavy_check_mark: Windows下部署 Takker 需要的准备工作  
:heavy_check_mark: Linux下部署 Takker 需要的准备工作(以 `Ubuntu LTS 20.04` 为例)  
:x: Macos下部署 Takker 需要的准备工作(有钱了一定写)  

## Windows

### 下载与配置go-cqhttp

#### 下载
[:link:__go-cqhttp仓库地址__](https://github.com/Mrs4s/go-cqhttp/)  
[:link:__下载页面__](https://github.com/Mrs4s/go-cqhttp/releases) (需要魔法工具)  
[:link:__下载地址 大陆加速镜像__](https://download.fastgit.org/Mrs4s/go-cqhttp/releases/download/v1.0.0-beta7-fix2/go-cqhttp_windows_amd64.exe)
(v1.0.0-beta7-fix2 [fastgit.org](https://doc.fastgit.org/))

<h5>关于下载文件版本的说明</h5>

* 如果你是 `Windows 64位系统`, 请选择以 __windows_amd64__.exe 结尾的文件
* 如果你是 `Windows 32位系统`, 请选择以 __windows_386__.exe 结尾的文件
* 如果你非常特殊，使用的处理器指令集为arm，比如 `Windows S`，则应该选择以 __windows_arm64__.exe (64位arm) 或 __windows_armv7__.exe (32位arm) 结尾的文件

#### 配置

`文件结构示例`
```
go-cqhttp
├── go-cqhttp.exe
└── config.yaml     # 若无此文件，手动创建一个即可
```

`config.yaml示例`

```yaml{2,3,23,68,81}
account:
  uin: 1234567890987654321 # QQ账号
  password: '' # 密码为空时使用扫码登录，强烈建议扫码登录以免环境问题
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
  relogin: # 重连设置
    delay: 3   # 首次重连延迟, 单位秒
    interval: 3   # 重连间隔
    max-times: 0  # 最大重连次数, 0为无限制

  # 是否使用服务器下发的新地址进行重连
  # 注意, 此设置可能导致在海外服务器上连接情况更差
  use-sso-address: true

heartbeat:
  # 心跳频率, 单位秒
  # -1 为关闭心跳
  interval: 5

message:
  # 上报数据类型
  # 可选: string,array
  post-format: array
  # 是否忽略无效的CQ码, 如果为假将原样发送
  ignore-invalid-cqcode: false
  # 是否强制分片发送消息
  # 分片发送将会带来更快的速度
  # 但是兼容性会有些问题
  force-fragment: false
  # 是否将url分片发送
  fix-url: false
  # 下载图片等请求网络代理
  proxy-rewrite: ''
  # 是否上报自身消息
  report-self-message: false
  # 移除服务端的Reply附带的At
  remove-reply-at: false
  # 为Reply附加更多信息
  extra-reply-data: false

output:
  # 日志等级 trace,debug,info,warn,error
  log-level: info
  # 是否启用 DEBUG
  debug: false # 开启调试模式

# 默认中间件锚点
default-middlewares: &default
  # 访问密钥, 强烈推荐在公网的服务器设置
  access-token: ''
  # 事件过滤器文件目录
  filter: ''
  # API限速设置
  # 该设置为全局生效
  # 原 cqhttp 虽然启用了 rate_limit 后缀, 但是基本没插件适配
  # 目前该限速设置为令牌桶算法, 请参考:
  # https://baike.baidu.com/item/%E4%BB%A4%E7%89%8C%E6%A1%B6%E7%AE%97%E6%B3%95/6597000?fr=aladdin
  rate-limit:
    enabled: false # 是否启用限速
    frequency: 1  # 令牌回复频率, 单位秒
    bucket: 1     # 令牌桶大小

database: # 数据库相关设置
  leveldb:
    # 是否启用内置leveldb数据库
    # 启用将会增加10-20MB的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: true

# 连接服务列表
servers:
  # 添加方式，同一连接方式可添加多个，具体配置说明请查看文档
  #- http: # http 通信
  #- ws:   # 正向 Websocket
  #- ws-reverse: # 反向 Websocket
  #- pprof: #性能分析服务器
  # 反向WS设置
  - ws-reverse:
      # 反向WS Universal 地址
      # 注意 设置了此项地址后下面两项将会被忽略
      universal: "ws://127.0.0.1:18080/cqhttp/ws"
      # 反向WS API 地址
      api: 
      # 反向WS Event 地址
      event: 
      # 重连间隔 单位毫秒
      reconnect-interval: 3000
      middlewares:
        <<: *default # 引用默认中间件
```


### 安装并配置Python环境

此部分为纯新手向内容，有基础的可以不看

#### 下载

[:link:__Windows64位__](https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe)  
[:link:__Windows32位__](https://www.python.org/ftp/python/3.9.7/python-3.9.7.exe)

下载后，双击下载包，进入 Python 安装向导，安装非常简单，你只需要使用默认的设置一直点击"下一步"直到安装完成即可。

#### 配置环境变量

`Win+R`输入`control`打开`控制面板`  
搜索`path`  
选择`编辑系统环境变量`  

__在系统环境变量的PATH中加入:__
* Python安装目录/
* Python安装目录/Scripts/

### 虚拟环境与包管理工具Poetry的使用

官方脚本 (需要魔法工具)

```powershell
(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
# 此处 python 可以使用任意版本，因为Poetry会自动检测已安装的python版本
```

大陆镜像加速脚本 ([fastgit.org](https://doc.fastgit.org/))

```powershell
(Invoke-WebRequest -Uri https://raw.fastgit.org/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
```


## Linux

### 下载与配置go-cqhttp

#### 下载
[:link:__go-cqhttp仓库地址__](https://github.com/Mrs4s/go-cqhttp/)  
[:link:__下载页面__](https://github.com/Mrs4s/go-cqhttp/releases) (需要魔法工具)  
[:link:__下载地址 大陆加速镜像__](https://download.fastgit.org/Mrs4s/go-cqhttp/releases/download/v1.0.0-beta7-fix2/go-cqhttp_linux_amd64.tar.gz)
(v1.0.0-beta7-fix2 [fastgit.org](https://doc.fastgit.org/))

<h5>关于下载文件版本的说明</h5>

* 如果你是 `64位系统`, 请选择以 __linux_amd64__.tar.gz 结尾的文件
* 如果你是 `32位系统`, 请选择以 __linux_386__.tar.gz 结尾的文件
* 如果你非常特殊，使用的处理器指令集为arm，比如树莓派，则应该选择以 __linux_arm64__.tar.gz (64位arm) 或 __linux_armv7__.tar.gz (32位arm) 结尾的文件

#### 配置

在终端中输入如下命令

```bash
mkdir go-cqhttp && cd go-cqhttp # 在当前目录下创建go-cqhttp文件夹并进入
 # 此处以64位linux v1.0.0-beta7-fix2 为例
wget https://github.com/Mrs4s/go-cqhttp/releases/download/v1.0.0-beta7-fix2/go-cqhttp_linux_amd64.tar.gz
tar -zxvf go-cqhttp_linux_amd64.tar.gz # 解压
touch config.yaml # 创建config.yaml文件
```

`文件结构示例`
```
go-cqhttp
├── go-cqhttp
├── LICENSE
├── README.md
└── config.yaml     # 若无此文件，手动创建一个即可
```

`config.yaml示例`

```bash
vi config.yaml # 按 i 进入编辑，编辑完后按 ESC 后输入 :wq 保存并退出
```

```yaml{2,3,23,68,81}
account:
  uin: 1234567890987654321 # QQ账号
  password: '' # 密码为空时使用扫码登录，强烈建议扫码登录以免环境问题
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
  relogin: # 重连设置
    delay: 3   # 首次重连延迟, 单位秒
    interval: 3   # 重连间隔
    max-times: 0  # 最大重连次数, 0为无限制

  # 是否使用服务器下发的新地址进行重连
  # 注意, 此设置可能导致在海外服务器上连接情况更差
  use-sso-address: true

heartbeat:
  # 心跳频率, 单位秒
  # -1 为关闭心跳
  interval: 5

message:
  # 上报数据类型
  # 可选: string,array
  post-format: array
  # 是否忽略无效的CQ码, 如果为假将原样发送
  ignore-invalid-cqcode: false
  # 是否强制分片发送消息
  # 分片发送将会带来更快的速度
  # 但是兼容性会有些问题
  force-fragment: false
  # 是否将url分片发送
  fix-url: false
  # 下载图片等请求网络代理
  proxy-rewrite: ''
  # 是否上报自身消息
  report-self-message: false
  # 移除服务端的Reply附带的At
  remove-reply-at: false
  # 为Reply附加更多信息
  extra-reply-data: false

output:
  # 日志等级 trace,debug,info,warn,error
  log-level: info
  # 是否启用 DEBUG
  debug: false # 开启调试模式

# 默认中间件锚点
default-middlewares: &default
  # 访问密钥, 强烈推荐在公网的服务器设置
  access-token: ''
  # 事件过滤器文件目录
  filter: ''
  # API限速设置
  # 该设置为全局生效
  # 原 cqhttp 虽然启用了 rate_limit 后缀, 但是基本没插件适配
  # 目前该限速设置为令牌桶算法, 请参考:
  # https://baike.baidu.com/item/%E4%BB%A4%E7%89%8C%E6%A1%B6%E7%AE%97%E6%B3%95/6597000?fr=aladdin
  rate-limit:
    enabled: false # 是否启用限速
    frequency: 1  # 令牌回复频率, 单位秒
    bucket: 1     # 令牌桶大小

database: # 数据库相关设置
  leveldb:
    # 是否启用内置leveldb数据库
    # 启用将会增加10-20MB的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: true

# 连接服务列表
servers:
  # 添加方式，同一连接方式可添加多个，具体配置说明请查看文档
  #- http: # http 通信
  #- ws:   # 正向 Websocket
  #- ws-reverse: # 反向 Websocket
  #- pprof: #性能分析服务器
  # 反向WS设置
  - ws-reverse:
      # 反向WS Universal 地址
      # 注意 设置了此项地址后下面两项将会被忽略
      universal: "ws://127.0.0.1:18080/cqhttp/ws"
      # 反向WS API 地址
      api: 
      # 反向WS Event 地址
      event: 
      # 重连间隔 单位毫秒
      reconnect-interval: 3000
      middlewares:
        <<: *default # 引用默认中间件
```


### 安装并配置Python环境

安装前置
```bash
sudo apt update
sudo apt install -y software-properties-common
```

添加源
```bash
sudo add-apt-repository ppa:deadsnakes/ppa
```

安装python
```bash
sudo apt install sqlite python3.9 lib-python3.9
```

### 虚拟环境与包管理工具Poetry的使用

官方脚本 (需要魔法工具)

```bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3.9 -
# 此处 python 默认为按照上文步骤安装
```

大陆镜像加速脚本 ([fastgit.org](https://doc.fastgit.org/))

```bash
curl -sSL https://raw.fastgit.org/python-poetry/poetry/master/get-poetry.py | python3.9 -
```