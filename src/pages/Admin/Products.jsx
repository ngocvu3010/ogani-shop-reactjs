import {Table, Image, Select, Button, Row, Col} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHomeProducts} from '../../redux/actions';
import {selectFeatureProductSelector} from "../../redux/selector";
import {COLORS, SIZES, ADMIN_PER_PAGE} from "../../constants";
import {Link} from "react-router-dom";

const colorOptions = COLORS.map(color => ({label: color, value: color}));
const sizeOptions = SIZES.map(size => ({label: size, value: size}));
const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image"
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size"
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color"
    }
  ];

function AdminProducts() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const totalProduct = useSelector((state) => state.productReducer.totalProduct)
  const totalPage = Math.ceil(parseInt(totalProduct) / ADMIN_PER_PAGE);
   const [page, setPage] = useState("1");
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  let params =`&_page=${page}&_limit=4`;

  useEffect(() => {
    search();
  }, []);

  const products = useSelector(selectFeatureProductSelector);

  const dataSource = products.map((product, index) => (
    {
      key: index + 1,
      image:  (<Image width={200} src={product.img[0]}/>),
      name: product.name,
      price: product.newPrice,
      size: product.size,
      color: product.color
    }
  ));

  const handleChangeColor = (value) => {
    setSelectedColor(value);
  };

  const handleChangeSize = (value) => {
    setSelectedSize(value);
  };

  const search = () => {
    selectedSize.forEach(function(size) {
      params += `&size=${size}`;
    });

    selectedColor.forEach(function(color) {
      params += `&color=${color}`;
    });

    if (name) {
      params +=`&name_like=${name}`;
    }

    dispatch(getHomeProducts(params));
  };

  return(
    <>
    <h2>Product List</h2>
    <Row>
      <Col className="form-group" span={12}>
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          id="name"
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
        />
      </Col>


      <Col className="form-group" span={12}>
        <label htmlFor="name">Color</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={COLORS}
          onChange={handleChangeColor}
          options={colorOptions}
        />
      </Col>

      <Col className="form-group" span={12}>
        <label htmlFor="name">Size</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={SIZES}
          onChange={handleChangeSize}
          options={sizeOptions}
        />
      </Col>
      <Col span={15}>

       <Button type="primary" icon={<SearchOutlined />} onClick={() => search()}>
        Search
      </Button>
      </Col>
      <Col span={9} style={{"textAlign": "right"}}>
        <Link to="/admin/create_product">
          <Button type="primary">
            Add new product
          </Button>
        </Link>
      </Col>
    </Row>

    <Table dataSource={dataSource} columns={columns}  pagination={false}/>
    <div className="product__pagination">
        {pageNumbers.map((page, index) => (
          <a href="#" key={index} onClick={() => setPage(page)}>{page}</a>
        ))}
        <a href="#">
          <i className="fa fa-long-arrow-right" />
        </a>
      </div>
  </>
  );
}

export default AdminProducts;
