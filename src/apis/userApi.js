import {axiosClient} from '../untils/axiosClient';

export const getUser = async(params) => {
  const res = await axiosClient.get(`users/${params}`);
  return res;
}
