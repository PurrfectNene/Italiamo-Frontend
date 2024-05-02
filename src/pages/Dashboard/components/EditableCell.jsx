import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  //   const inputNode = dataIndex === "imageUrl" ? <div>img upload</div> : <TextArea rows={3} />;
  const inputNode = <TextArea rows={3} />;

  if (!record) {
    return <td {...restProps}>{children}</td>;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        <p className="clamp-3" style={{ margin: 0 }}>
          {children}
        </p>
      )}
    </td>
  );
};

export default EditableCell;
