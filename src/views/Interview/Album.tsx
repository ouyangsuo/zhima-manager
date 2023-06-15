import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: number;
  name: string;
  img: string;
  questions: number;
  company: string
}

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: '专辑名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span style={{ fontSize: "1.0rem", fontWeight: 520, fontStyle: "italic" }}>{text}</span>,
  },
  {
    title: '专辑图片',
    dataIndex: 'img',
    key: 'img',
    render: (text) => <img style={{ width: 100 }} src={text}></img>,
  },
  {
    title: '题目数量',
    dataIndex: 'questions',
    key: 'questions',
    width: 200,
    align: "center",
  },

  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>详情</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

/* 
  {
    id: '1',
    name: '滴滴八股文精选',
    img: "https://lekuzhima.club/imgs/dachang-bg.jpg",
    questions: 10,
    company: '滴滴',
  },
*/
const data: DataType[] = new Array(25).fill(null).map(
  (item, index) => ({
    id: index + 1,
    name: '滴滴八股文精选',
    img: "https://lekuzhima.club/imgs/dachang-bg.jpg",
    questions: 10,
    company: '滴滴',
  })
)
console.log(data);


const pageSize = 5

const App: React.FC = () => {
  // const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState<DataType[]>([])

  useEffect(() => {
    setPageData(data.slice(pageSize * (page - 1), pageSize * page))
  }, [page])


  return (
    <div style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
      <Table bordered={false} scroll={{ y: 450 }} columns={columns} pagination={{ position: [] }} dataSource={pageData} />
      <Pagination style={{ alignSelf: "flex-end" }} onChange={(page, pageSize) => {
        console.log(page, pageSize);
        setPage(page)
      }} total={data.length} />
    </div>
  );
};

export default App;