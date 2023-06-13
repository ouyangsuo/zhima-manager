import React from 'react';

/* icons */
import { UserOutlined, PieChartOutlined, WindowsOutlined, SendOutlined } from '@ant-design/icons';
import { SettingFilled, QuestionCircleFilled, YoutubeFilled, SnippetsFilled } from '@ant-design/icons';
import { AppleFilled, CheckSquareFilled, FireFilled, FolderOpenFilled } from '@ant-design/icons';
import { GithubFilled, AliwangwangFilled, DiffFilled, HeartFilled, AlipaySquareFilled } from '@ant-design/icons';

/* antd */
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

/* router */
import { Outlet, useNavigate } from 'react-router-dom';

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

    return (

        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>

            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        onClick={({ item, key, keyPath, domEvent }) => {
                            // console.log("item=", item);
                            // console.log("domEvent=", domEvent);
                            console.log("key=", key);
                            console.log("keyPath=", keyPath);

                            const targetRoute = keyPath.reduceRight((pv, cv) => pv + cv)
                            console.log("targetRoute=", targetRoute);

                            navigateTo(targetRoute)
                        }}
                    />
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
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