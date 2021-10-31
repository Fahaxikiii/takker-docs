module.exports = {
    title: 'Takker Doc',
    description: '多功能QQ机器人 Takker 的文档',
    host: 'localhost',
    port: '18000',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '插件', link: '/plugins/' },
            { text: "关于", link: '/about/' },
            { text: "Github", link: 'https://github.com/FYWinds/takker' }
        ],
        sidebar: 'auto',
        lastUpdated: '最后更新',
        repo: 'FYWinds/takker',
        repoLabel: '查看源码',
        docsrepo: 'FYWinds/takker-docs',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '帮助我改善此页面',
        smoothScroll: true,
    }
}