import { Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload} from "antd";
import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { PlusOutlined, InboxOutlined, UploadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {COLORS, SIZES, ADMIN_PER_PAGE} from "../../constants";
import {createProductAction} from "../../redux/actions";
import {getCategory} from '../../redux/actions';
import {selectCategorySelector} from '../../redux/selector';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

function CreateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector(selectCategorySelector);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const onFinish = (values) => {
    dispatch(createProductAction(values));
    history.push("/admin");
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
      min: '${label} must be between <= ${min}',
      max: '${label} must be between >= ${max}'
    },
  };

  const categoryData = () => {
    return categories.map((category) => {
      let childData = [];
      if (category?.sub?.length > 0) {
        childData = category.sub.map(child => ({title: child.name, value: child.id}));
      }
      const data = {
        title: category.name,
        value: category.id,
        children: childData
      }
      return data;
    })
  }

  return(
    <>
    <h3>Create Product</h3>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="newPrice"
        rules={[{ required: true, type: "number", min: 0, max: 999999999999999 }]}>
        <InputNumber min={0} max={999999999999999}/>
      </Form.Item>
      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true}]}
      >
        <Select placeholder="Please select color">
          {COLORS.map((color, index) => (<Option value={color} key={color}>{color}</Option>))}
        </Select>
      </Form.Item>
      <Form.Item
        name="size"
        label="Size"
        rules={[{ required: true}]}
      >
        <Select placeholder="Please select size">
          {SIZES.map((size, index) => (<Option value={size} key={size}>{size}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item label="Category" name="categoryId">
        <TreeSelect
          treeData={categoryData()}
        />
      </Form.Item>
      <Form.Item label="Img">
      <Form.List
        name="img"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 img'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(formItemLayout)}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input img's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="img url" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}

export default CreateProduct;
