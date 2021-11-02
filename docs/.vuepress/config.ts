import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
    title: 'Takker Doc',
    description: '多功能QQ机器人 Takker 的文档',
    host: 'localhost',
    port: 18000,
    themeConfig: {
        navbar: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '插件', link: '/plugins/' },
            { text: "关于", link: '/about/' },
            // { text: "Github", link: 'https://github.com/FYWinds/takker' }
        ],
        sidebar: 'auto',
        logo: '/images/logo.png',
        icon: '/images/icons/favicon-32x32.png',
        lastUpdatedText: '最后更新',
        repo: 'FYWinds/takker',
        repoLabel: 'Github',
        docsrepo: 'FYWinds/takker-docs',
        docsBranch: 'master',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '帮助我改善此页面',
        smoothScroll: true,
        tip: '提醒',
        warning: '警告',
        danger: '危险',
        backToHome: '返回首页',
        footer: 'Copyright © 2021-present Takker',
    },
    plugins: [
        ['@vuepress/plugin-search', {
            locales: [
                {
                    '/': {
                        placeholder: '搜索...',
                    },
                    searchMaxSuggestions: 10
                }]
        }],
        ['@vuepress/pwa', {
            skipWaiting: true,
        }],
        ['@vuepress/plugin-pwa-popup', {
            locales: {
                '/': {
                    message: '发现新内容可用',
                    buttonText: '刷新',
                }
            }
        }],
        ['@vuepress/plugin-shiki', {
            theme: 'one-dark-pro',
        }]
    ],
    head: [
        ['link', { rel: 'icon', href: '/images/favicon-32x32.png' }],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ]
});