import {axiosClient} from '../untils/axiosClient';

export const getCategories = async(params) => {
  const res = await axiosClient.get(`categories?${params}`);
  return res;
}

export const getDetailCategory = async(id) => {
  const res = await axiosClient.get(`categories/${id}`);
  return res;
}
