import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Popconfirm,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import EditableCell from "../components/EditableCell";
import RegionsCreateModal from "../components/RegionsCreateForm";

export default function RegionsPage() {
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  // edit row form
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      description: "",
      imageUrl: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      const storedToken = localStorage.getItem("authToken");

      // Send post request to save in backend
      await axios
        .put(`${import.meta.env.VITE_API_URL}/api/regions/${key}`, row, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey("");
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey("");
          }
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const deleteRow = async (row) => {
    const { key } = row;
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      const storedToken = localStorage.getItem("authToken");

      // Send post request to save in backend
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/api/regions/${key}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          if (index > -1) {
            newData.splice(index, 1);
            setData(newData);
            setEditingKey("");
          }
        });
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      showSorterTooltip: { target: "full-header" },
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      showSorterTooltip: { target: "full-header" },
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      width: "20%",
      key: "imageUrl",
      ...getColumnSearchProps("imageUrl"),
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.imageUrl.localeCompare(b.imageUrl),
      sortDirections: ["descend", "ascend"],
      editable: true,
    },
    {
      title: "Actions",
      width: "20%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Typography.Link onClick={() => save(record.key)}>
              Save
            </Typography.Link>
            <Typography.Link onClick={() => cancel()}>Cancel</Typography.Link>
          </span>
        ) : (
          <span style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to Delete?"
              onConfirm={() => deleteRow(record)}
              disabled={editingKey !== ""}
            >
              <Typography.Link disabled={editingKey !== ""}>
                Delete
              </Typography.Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setData(
          res.data.map((x) => {
            x.key = x._id;
            return x;
          })
        );
      });
  }, []);

  if (data === null) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <Flex vertical gap="1rem">
      <RegionsCreateModal state={[isModalOpen, setIsModalOpen]} />

      <Flex>
        <h1 style={{ margin: 0 }}>Regions</h1>{" "}
        <Button
          style={{ marginLeft: "auto" }}
          type="primary"
          onClick={showModal}
        >
          Create
        </Button>
      </Flex>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={data}
          rowClassName="editable-row"
          pagination={{ pageSize: 8, onChange: cancel }}
        />
      </Form>
    </Flex>
  );
}
