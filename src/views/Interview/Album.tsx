import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Pagination, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";

import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const showConfirm = (
  { id, name }: { id: number; name: string },
  onConfirm: Function
) => {
  confirm({
    title: "确认删除专辑吗?",
    icon: <ExclamationCircleFilled />,
    content: JSON.stringify({ id, name }),
    onOk() {
      console.log("OK");
      onConfirm();
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

interface DataType {
  id: number;
  name: string;
  img: string;
  questions: number;
  company: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 100,
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "专辑名称",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <span
        style={{ fontSize: "1.0rem", fontWeight: 520, fontStyle: "italic" }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "专辑图片",
    dataIndex: "img",
    key: "img",
    render: (text) => <img style={{ width: 100 }} src={text}></img>,
  },
  {
    title: "题目数量",
    dataIndex: "questions",
    key: "questions",
    width: 200,
    align: "center",
  },

  /* 操作按钮组 */
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a
          onClick={(e) => {
            comNavigateTo(`/interview/album/${record.id}`);
          }}
        >
          详情
        </a>

        {/* 编辑信息 */}
        <a
          onClick={(e) => {
            console.log("edit", record);
            comSetOpen(true);
            comSetRecord(record);
          }}
        >
          编辑
        </a>

        {/* 删除 */}
        <a
          onClick={(e) => {
            console.log("delete", record);

            // 弹窗
            showConfirm(record, () => {
              let index = _data.findIndex((item) => item === record);
              _data.splice(index, 1);
              console.log("已删除", index);
              comSetData([..._data]);
            });
          }}
        >
          删除
        </a>
      </Space>
    ),
  },
];

const _data: DataType[] = new Array(25).fill(null).map((item, index) => ({
  id: index + 1,
  name: "滴滴八股文精选",
  img: "https://lekuzhima.club/imgs/dachang-bg.jpg",
  questions: 10,
  company: "滴滴",
}));
// console.log(data);

const pageSize = 5;
let comSetData;
let comSetOpen;
let comSetRecord;
let comNavigateTo;

/* 编辑专辑信息 */
import { Button, Form, Input, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { getAlbums } from "@/api/album";
import { log } from "console";
interface Values {
  title: string;
  description: string;
  modifier: string;
}
interface CollectionCreateFormProps {
  open: boolean;
  initialValues: any;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="专辑编辑"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const App: React.FC = () => {
  // const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<DataType[]>([]);

  useEffect(() => {
    // ok!
    // getAlbums().then(
    //   value => console.log("value=",value)
    // )

    setData(_data);
    comSetData = setData;
  }, []);

  useEffect(() => {
    setPageData(data.slice(pageSize * (page - 1), pageSize * page));
  }, [page]);

  useEffect(() => {
    console.log("set new page data");
    setPageData(data.slice(pageSize * (page - 1), pageSize * page));
  }, [data]);

  /* 编辑相关 */
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<DataType>(data[0]);
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
    // setRecord({...record,...values})

    const index = data.findIndex((item) => item.id === record.id);
    data[index] = { ...record, ...values };
    setData([...data]);
    console.log(index, record, data[index]);
  };

  useEffect(() => {
    comSetOpen = setOpen;
    comSetRecord = setRecord;
  }, []);

  /* 跳转详情页 */
  const navigateTo = useNavigate();
  comNavigateTo = navigateTo;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Table
        bordered={false}
        scroll={{ y: 450 }}
        columns={columns}
        pagination={{ position: [] }}
        dataSource={pageData}
      />
      <Pagination
        style={{ alignSelf: "flex-end" }}
        onChange={(page, pageSize) => {
          console.log(page, pageSize);
          setPage(page);
        }}
        total={data.length}
        pageSize={pageSize}
      />

      <CollectionCreateForm
        open={open}
        initialValues={record}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default App;
