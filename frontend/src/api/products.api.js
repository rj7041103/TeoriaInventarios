import axios from 'axios'

const url = 'http://localhost:8000/products';

export const getProductsRequest = async () =>
    await axios.get(url)

export const getProductByIdRequest = async (id) =>
    await axios.get(`${url}/${id}`)

export const createProductRequest = async (data) =>
    await axios.post(url, data)

export const editProductRequest = async (id, data) =>
    await axios.put(`${url}/${id}`, data)

export const deleteProductRequest = async (id) =>
    await axios.delete(`${url}/${id}`)
