import { createContext, useContext, useState } from "react";
import { toast } from 'sonner'
import {
    getProductsRequest,
    getProductByIdRequest,
    createProductRequest,
    editProductRequest,
    deleteProductRequest
} from "../api/products.api";

export const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider")
    } else {
        return context;
    }
}

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState();

    const getProducts = async () => {
        try {
            const response = await getProductsRequest();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getProductById = async (id) => {
        try {
            const response = await getProductByIdRequest(id);
            return response.data;
        } catch (error) {
            toast.warning('Hubo un problema al encontrar el producto');
            console.error(error);
        }
    }

    const createProduct = async (data) => {
        try {
            const response = await createProductRequest(data);
            toast.success('Producto creado con exito');
            return response.data;
        } catch (error) {
            toast.warning('Hubo un problema al tratar de crear el producto');
            console.error(error);
        }
    }

    const editProduct = async (id, data) => {
        try {
            const response = await editProductRequest(id, data);
            toast.success('Producto editado exitosamente')
            return response.data;
        } catch (error) {
            toast.warning('Hubo un problema al tratar de editar el producto')
            console.error(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await deleteProductRequest(id);
            getProducts();
            toast.success('Producto eliminado exitosamente');
            return response.data;
        } catch (error) {
            toast.warning('Hubo un error al intentar de eliminar al producto');
            console.error(error);
        }
    }

    return (
        <ProductsContext.Provider value={{
            products,
            getProducts,
            getProductById,
            createProduct,
            editProduct,
            deleteProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}