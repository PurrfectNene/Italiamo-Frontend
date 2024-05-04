import { Button, Flex, Form, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CitiesCreateModal from "../components/CitiesCreateForm";
import EditableCell from "../components/EditableCell";
import useCitiesTable from "../components/useCitiesTable";

export default function CitiesPage() {
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  // table state
  const [data, setData] = useState(null);
  const [regionsList, setRegionsList] = useState(null);
  const { cancel, columns, form } = useCitiesTable([data, setData]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/cities`, {
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

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setRegionsList(res.data);
      });
  }, []);

  if (data === null || regionsList === null) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Spin />
      </Flex>
    );
  }

  return (
    <Flex vertical>
      <CitiesCreateModal
        state={[isModalOpen, setIsModalOpen]}
        regionsList={regionsList}
      />

      <Flex>
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Cities</h1>
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
          columns={columns}
          dataSource={data}
          rowClassName="editable-row"
          pagination={{ pageSize: 8, onChange: cancel }}
        />
      </Form>
    </Flex>
  );
}
