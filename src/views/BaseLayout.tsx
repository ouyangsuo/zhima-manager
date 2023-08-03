import React, { useEffect, useState } from 'react';

/* icons */
import { WindowsFilled } from '@ant-design/icons';
import { UserOutlined, PieChartOutlined, WindowsOutlined, SendOutlined } from '@ant-design/icons';
import { SettingFilled, QuestionCircleFilled, YoutubeFilled, SnippetsFilled } from '@ant-design/icons';
import { AppleFilled, CheckSquareFilled, FireFilled, FolderOpenFilled } from '@ant-design/icons';
import { GithubFilled, AliwangwangFilled, DiffFilled, HeartFilled, AlipaySquareFilled } from '@ant-design/icons';

/* antd */
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

/* router */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* scss */
import style from './BaseLayout.module.scss'

const { Header, Content, Sider } = Layout;

const menu = [
    {
        label: "数据看板",
        key: "/dashboard"
    },
    {
        label: "题库板块",
        key: "/library",
        submenu: [
            { key: "/module", icon: SettingFilled, label: "模块管理" },
            { key: "/question", icon: QuestionCircleFilled, label: "问题管理" },
            { key: "/blog", icon: SnippetsFilled, label: "博文管理" },
            { key: "/video", icon: YoutubeFilled, label: "视频管理" },
        ],
    },
    {
        label: "模面板块",
        key: "/interview",
        submenu: [
            { key: "/company", icon: AppleFilled, label: "公司管理" },
            { key: "/album", icon: FolderOpenFilled, label: "套装管理" },
            { key: "/option", icon: CheckSquareFilled, label: "选项管理" },
            { key: "/keyword", icon: FireFilled, label: "关键词管理" },
        ],
    },
    {
        label: "我的板块",
        key: "/mine",
        submenu: [
            { key: "/user", icon: GithubFilled, label: "用户管理" },
            { key: "/collection", icon: HeartFilled, label: "收藏管理" },
            { key: "/order", icon: AlipaySquareFilled, label: "订单管理" },
            { key: "/history", icon: AliwangwangFilled, label: "模面管理" },
            { key: "/danger", icon: DiffFilled, label: "错题管理" },
        ],
    }
];

const items2: MenuProps['items'] = [PieChartOutlined, WindowsOutlined, SendOutlined, UserOutlined,].map(
    (icon, index) => {
        return {
            key: menu[index].key,
            icon: React.createElement(icon),
            label: menu[index].label,
            // children: new Array(4).fill(null).map((_, j) => {
            //     const subKey = index * 4 + j + 1;
            //     return {
            //         key: subKey,
            //         icon: React.createElement(icon),
            //         label: `option${subKey}`,
            //     };
            // }),
            children: menu[index].submenu?.map(
                ({ key, icon, label }) => ({
                    key,
                    label,
                    icon: React.createElement(icon),
                })
            )
        };

    },
);

const BaseLayout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigateTo = useNavigate()

    const [currentMenuGroup, setCurrentMenuGroup] = useState("/library")
    const [currentMenuItem, setCurrentMenuItem] = useState("/module")

    const location = useLocation();
    useEffect(() => {
        console.log('当前页面地址：', location.pathname);

        let start = location.pathname.indexOf("/")
        let end = location.pathname.lastIndexOf("/")
        let menuGroup = location.pathname.slice(start, end)
        let menuItem = location.pathname.slice(end)

        if (currentMenuGroup !== menuGroup) setCurrentMenuGroup(menuGroup)
        if (currentMenuItem !== menuItem) setCurrentMenuItem(menuItem)

    }, [location]);

    return (

        <Layout>
            <Header className={style.header} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#002b80' }}>
                <WindowsFilled className={style.logo} />
                <span className={style.title}>LEKUZHIMA.CLUB 1831</span>

                <div className={style.userInfo}>
                    <img className={style.avatar} src='https://lekuzhima.club/imgs/avatar.jpeg' />
                    <Button size="small" className={style.btnLogout} type="primary" ghost>
                        LOG OUT
                    </Button>
                </div>
            </Header>

            <Layout>

                {/* 菜单 */}
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        theme='light'
                        inlineIndent={12}

                        defaultSelectedKeys={['/dashboard']}
                        defaultOpenKeys={['/library']}
                        selectedKeys={[currentMenuItem]}
                        openKeys={[currentMenuGroup]}

                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}

                        onClick={({ key, keyPath }) => {
                            // console.log("item=", item);
                            // console.log("domEvent=", domEvent);
                            console.log("key=", key);
                            console.log("keyPath=", keyPath);

                            setCurrentMenuItem(keyPath[0])
                            keyPath.length > 1 && setCurrentMenuGroup(keyPath[1])

                            const targetRoute = keyPath.reduceRight((pv, cv) => pv + cv)
                            console.log("targetRoute=", targetRoute);

                            navigateTo(targetRoute)
                        }}

                        onOpenChange={openKeys => {
                            console.log("onOpenChange:openKeys=", openKeys);
                            setCurrentMenuGroup(openKeys[openKeys.length - 1])
                        }}
                    />
                </Sider>

                {/* 内容 */}
                <Layout style={{ padding: '0 10px 16px 10px' }}>

                    <Breadcrumb style={{ margin: '10px 0 10px 0' }}>
                        <Breadcrumb.Item>{currentMenuGroup.slice(1)}</Breadcrumb.Item>
                        <Breadcrumb.Item>{currentMenuItem.slice(1)}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        style={{
                            padding: 16,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>

            </Layout>

        </Layout>

    );
};

export default BaseLayout;