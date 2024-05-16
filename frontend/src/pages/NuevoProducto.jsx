import * as Yup from 'yup';
import { Formik, Form } from 'formik'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

function NuevoProducto() {
    const { createProduct, getProductById, editProduct } = useProducts();
    const { id } = useParams();
    const navigate = useNavigate();

    // Valores iniciales del formulario
    const [product, setProduct] = useState({
        nameProduct: '',
        cantProduct: '',
        unitPrice: '',
        routes: '',
    });

    // Funcion encargada se verficar si hay parametros
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const productData = await getProductById(id);
                    if (productData) {
                        setProduct(productData);
                    } else {
                        navigate('/');
                        console.error('ID dado no existe.');
                    }
                }
            } catch (error) {
                navigate('/')
                console.error('Error al obtener los datos del producto:', error);
            }
        };

        fetchData();
    }, []);

    // Definir el esquema de validación usando Yup
    const validationSchema = Yup.object().shape({
        nameProduct: Yup.string().required('El nombre es requerido'),
        cantProduct: Yup.string().required('La cantidad es requerida'),
        unitPrice: Yup.string().required('El precio es requerido'),
        routes: Yup.string().required('La dirección es requerida')
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async (values) => {
        // Si existe un ID, edita el producto; de lo contrario, crea uno nuevo
        if (id) {
            await editProduct(id, values);
        } else {
            await createProduct(values);
        }

        // Limpiar los campos del formulario después de enviar
        setProduct({
            nameProduct: '',
            cantProduct: '',
            unitPrice: '',
            routes: ''
        });
    };

    const title = id ? "Editar Producto" : "Nuevo Producto";

    return (
        <div>
            <Formik
                initialValues={product}
                enableReinitialize={true}
                validationSchema={validationSchema}

                onSubmit={async (values, { resetForm }) => {
                    // Enviar los datos al servidor
                    await handleSubmit(values);
                    resetForm();
                    navigate('/');
                }}
            >
                {({ handleChange, handleSubmit, isSubmitting, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-6 border border-gray-300 rounded-md bg-white shadow-md">
                        <h1 className="text-2xl font-semibold uppercase text-center mb-6 text-black">{title}</h1>

                        {/* Nombre */}
                        <div className="mb-4">
                            <label htmlFor="nameProduct" className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                            <input
                                id="nameProduct"
                                type="text"
                                name="nameProduct"
                                placeholder="Escriba el nombre acá"
                                onChange={handleChange}
                                value={values.nameProduct}
                                className={`mt-1 p-2 block w-full border ${errors.nameProduct && touched.nameProduct ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.nameProduct && touched.nameProduct && <div className="text-red-500 text-sm mt-1">{errors.nameProduct}</div>}
                        </div>

                        {/* Cantidad */}
                        <div className="mb-4">
                            <label htmlFor="cantProduct" className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                id="cantProduct"
                                type="number"
                                name="cantProduct"
                                placeholder="Escriba la cantidad acá"
                                onChange={handleChange}
                                value={values.cantProduct}
                                className={`mt-1 p-2 block w-full border ${errors.cantProduct && touched.cantProduct ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.cantProduct && touched.cantProduct && <div className="text-red-500 text-sm mt-1">{errors.cantProduct}</div>}
                        </div>

                        {/* Precio */}
                        <div className="mb-4">
                            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Precio $</label>
                            <input
                                id="unitPrice"
                                type="number"
                                name="unitPrice"
                                placeholder="Escriba el precio acá"
                                onChange={handleChange}
                                value={values.unitPrice}
                                className={`mt-1 p-2 block w-full border ${errors.unitPrice && touched.unitPrice ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.unitPrice && touched.unitPrice && <div className="text-red-500 text-sm mt-1">{errors.unitPrice}</div>}
                        </div>

                        {/* Dirección */}
                        <div className="mb-4">
                            <label htmlFor="routes" className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                id="routes"
                                type="text"
                                name="routes"
                                placeholder="Escriba la dirección acá"
                                onChange={handleChange}
                                value={values.routes}
                                className={`mt-1 p-2 block w-full border ${errors.routes && touched.routes ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.routes && touched.routes && <div className="text-red-500 text-sm mt-1">{errors.routes}</div>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 w-full rounded-md transition-colors duration-200">
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NuevoProducto;