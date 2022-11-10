import {axiosClient} from '../untils/axiosClient';

export const getCategories = async(params) => {
  const res = await axiosClient.get(`categories?${params}`);
  return res;
}
