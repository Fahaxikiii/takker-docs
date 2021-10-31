## 项目结构

    configs/                    # Takker配置文件存储位置
        config.example.py       # 机器人范例配置
        config.py               # 机器人配置，需手动依据 `config.example.py` 修改生成
        path_config.py          # 资源文件路径配置
    data/                       # 数据存储目录，可在 `path_config.py` 中修改
        data.db                 # 主数据库，机器人首次启动自动生成
        illust.db               # Pixiv美图数据库
    log                         # 日志目录
    plugins                     # 插件目录
    resources                   # 资源文件目录，可在 `path_config.py` 中修改
    service
    utils
    .env                        # 环境配置文件
    bot.py                      # 机器人启动文件