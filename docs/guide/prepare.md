# 准备

本段内容包括

:heavy_check_mark: Windows下部署 Takker 需要的准备工作  
:heavy_check_mark: Linux下部署 Takker 需要的准备工作(以 `CentOS 8 Stream` / `Ubuntu LTS 20.04` 为例)  
:x: Macos下部署 Takker 需要的准备工作(有钱了一定写)  

## Windows

### 下载与配置go-cqhttp

#### 下载
[:link:go-cqhttp仓库地址](https://github.com/Mrs4s/go-cqhttp/)  
[:link:下载页面](https://github.com/Mrs4s/go-cqhttp/releases) (需要魔法工具)  
[:link:下载地址 大陆加速镜像（v1.0.0-beta7-fix2、cnpmjs.org）](https://github.com.cnpmjs.org/Mrs4s/go-cqhttp/releases/download/v1.0.0-beta7-fix2/go-cqhttp_windows_amd64.exe) (无需魔法工具)

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

```yaml{3-5,16,39,52}
# go-cqhttp 配置文件

account: # 账号相关
  uin: 1234567890987654321 # QQ账号
  password: '' # 密码为空时使用扫码登录，强烈建议扫码登录以免环境问题
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
  relogin: # 重连设置
    delay: 3   # 首次重连延迟, 单位秒
    interval: 3   # 重连间隔
    max-times: 0  # 最大重连次数, 0为无限制

message:
  # 上报数据类型
  # 可选: string,array
  post-format: array
  # 是否忽略无效的CQ码, 如果为false将原样发送
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


### 虚拟环境与包管理工具Poetry的使用



## Linux

### 下载与配置go-cqhttp


### 安装并配置Python环境


### 虚拟环境与包管理工具Poetry的使用