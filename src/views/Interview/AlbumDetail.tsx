import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAlbumDetail } from '@/api/album';


import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
}

interface ExpandedDataType {
    key: React.Key;
    title:string,
    // date: string;
    // name: string;
    // upgradeNum: string;
}

const App: React.FC = () => {
    const params = useParams();

    const [data, setData] = useState<DataType[]>()

    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: '选项', dataIndex: 'title', key: 'title' },
        ];

        const data: any[] = [];
        for (let i = 0; i < 5; ++i) {
            data.push({
                key: i.toString(),
                title:"这是选项",
                // date: '2014-12-24 23:12:00',
                // name: 'This is production name',
                // upgradeNum: 'Upgraded: 56',
            });
        }

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns: TableColumnsType<DataType> = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '标题', dataIndex: 'title', key: 'title' },
        { title: '公司', dataIndex: 'comid', key: 'comid' },
        { title: '类型', dataIndex: 'typeid', key: 'typeid' },
        { title: '难度', key: 'difficulty', render: () => <a>简单</a> },
    ];

    // const data: DataType[] = [];
    // for (let i = 0; i < 3; ++i) {
    //     data.push({
    //         key: i.toString(),
    //         name: 'Screen',
    //         platform: 'iOS',
    //         version: '10.3.4.5654',
    //         upgradeNum: 500,
    //         creator: 'Jack',
    //         createdAt: '2014-12-24 23:12:00',
    //     });
    // }

    useEffect(
        () => {
            console.log("component did mount");

            getAlbumDetail(params.aid as string)
                .then(
                    result => {
                        console.log("album detail=", result)
                        setData(result as any)
                    }
                )
        },
        []
    )

    return (
        <>
            {/* <div>AlbumDetail:{params.aid}</div> */}

            <Table
                columns={columns}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
                size="small"
            />
        </>
    );
};

export default App;
