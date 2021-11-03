import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";

export default defineUserConfig<DefaultThemeOptions>({
    title: 'Takker Doc',
    description: '多功能QQ机器人 Takker 的文档',
    host: 'localhost',
    port: 12080,
    themeConfig: {
        navbar: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: '插件', link: '/plugins/' },
            { text: "关于", link: '/about/' },
        ],
        sidebarDepth: 2,
        sidebar: {
            '/guide/': [
                {
                    text: '指南',
                    children: [
                        '/guide/README.md',
                        '/guide/prepare.md',
                        '/guide/install.md',
                        '/guide/run.md'
                    ]
                }
            ],
            '/plugins/': [
                {
                    text: '插件',
                    children: [
                        'README.md',
                        'perm.md',
                        'plugin_manager.md'
                    ]
                }
            ]
        },
        logo: '/images/logo.png',
        icon: '/images/icons/favicon-32x32.png',
        lastUpdatedText: '最后更新',
        repo: 'FYWinds/takker',
        repoLabel: 'Github',
        docsRepo: 'FYWinds/takker-docs',
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
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `/images/icons/favicon-16x16.png`,
            },
        ],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `/images/icons/favicon-32x32.png`,
            },
        ],
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#436161' }],
    ]
});