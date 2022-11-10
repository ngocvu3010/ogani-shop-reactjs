import {axiosClient} from '../untils/axiosClient';

export const getProducts = async(params) => {
  const res = await axiosClient.get(`products?${params}`);
  return res;
}

export const getDetailProduct = async(params) => {
  const res = await axiosClient.get(`products/${params}`);
  return res;
}
