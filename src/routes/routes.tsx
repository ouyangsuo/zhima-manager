// config/router.config.jsx
import React, { Component, Suspense, lazy } from 'react';

import BaseLayout from '@/views/BaseLayout';

/* 一级页面 */
import Dashboard from "@/views/Dashboard/Dashboard"
import Interview from "@/views/Interview"
import Library from "@/views/Library"
import Mine from "@/views/Mine"
import NotFound from "@/views/Notfound/NotFound";

/* 题库二级页面 */
import Module from "@/views/Library/Module";
import Question from "@/views/Library/Question";
import Blog from "@/views/Library/Blog";
import Video from "@/views/Library/Video";

/* 模面二级页面 */
import Company from '@/views/Interview/Company';
import Album from '@/views/Interview/Album';
// import AlbumDetail from '@/views/Interview/AlbumDetail';
// const AlbumDetail = lazy(() => import('@/views/Interview/AlbumDetail'))

import Option from '@/views/Interview/Option';
import Keyword from '@/views/Interview/Keyword';

/* 我的二级页面 */
import User from '@/views/Mine/User';
import Collection from '@/views/Mine/Collection';
import InterHistory from '@/views/Mine/InterHistory';
import Order from '@/views/Mine/Order';
import Danger from '@/views/Mine/Danger';
import History from '@/views/Mine/History';



const lazyLoad = src => <Suspense fallback={<>...</>}>{React.createElement(lazy(src))}</Suspense>;

const routes = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [

            /* 数据看板 */
            {
                path: 'dashboard',
                element: <Dashboard />
            },

            /* 题库 */
            {
                path: 'library',
                element: <Library />,
                children: [
                    {
                        index: true,
                        element: <Module />
                    },
                    {
                        path: 'module',
                        element: <Module />
                    },
                    {
                        path: 'question',
                        element: <Question />
                    },
                    {
                        path: 'blog',
                        element: <Blog />
                    },
                    {
                        path: 'video',
                        element: <Video />
                    }
                ]
            },

            /* 模面 */
            {
                path: 'interview',
                element: <Interview />,
                children: [
                    {
                        index: true,
                        element: <Company />
                    },
                    {
                        path: 'company',
                        element: <Company />
                    },
                    {
                        path: 'album',
                        element: <Album />
                    },
                    {
                        path: 'album/:aid',
                        // element: <AlbumDetail />
                        element: lazyLoad(() => import('@/views/Interview/AlbumDetail'))
                    },
                    {
                        path: 'option',
                        element: <Option />
                    },
                    {
                        path: 'keyword',
                        element: <Keyword />
                    }
                ]
            },

            /* 我的 */
            {
                path: 'mine',
                element: <Mine />,
                children: [
                    {
                        path: 'user',
                        element: <User />
                    },
                    {
                        path: 'collection',
                        element: <Collection />
                    },
                    {
                        path: 'interHistory',
                        element: <InterHistory />
                    },
                    {
                        path: 'order',
                        element: <Order />
                    },
                    {
                        path: 'history',
                        element: <History />
                    },
                    {
                        path: 'danger',
                        element: <Danger />
                    }
                ]
            },
        ]
    },

    /* 404 */
    {
        path: '*',
        element: <NotFound />
    }
];

export default routes;