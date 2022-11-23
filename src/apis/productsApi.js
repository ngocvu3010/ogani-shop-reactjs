import {axiosClient} from '../untils/axiosClient';

export const getProducts = async(params) => {
  const res = await axiosClient.get(`products?${params}`);
  return res;
}

export const getDetailProduct = async(params) => {
  const res = await axiosClient.get(`products/${params}`);
  return res;
}

export const createProduct = async(data) => {
  const res = await axiosClient.post("products", data);
  return res;
}
