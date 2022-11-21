import {axiosClient} from '../untils/axiosClient';
import axios from 'axios';

export const updateCart = async(params, data) => {
  const res = await axiosClient.patch(`carts/${params}`, data);
  return res;
}

export const deleteCart = async(params, data) => {
  const res = await axiosClient.delete(`carts/${params}`, data);
  return res;
}

export const addCart = async(data) => {
  const res = await axiosClient.post('carts', data)
  return res;
}

export const getCarts = async(params) => {
  const res = await axiosClient.get(`carts?${params}`);
  return res;
}

export const addBilling = async(data) => {
  const res = await axiosClient.post('payments', data)
  return res;
}
