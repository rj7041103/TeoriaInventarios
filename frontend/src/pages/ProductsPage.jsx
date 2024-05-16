import { useEffect } from "react";
import Table from "../components/Datatable";
import { useProducts } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
    const { products, getProducts, deleteProduct } = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    // Estructura de la tabla
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nameProduct
        },
        {
            name: 'Cantidad',
            selector: row => row.cantProduct,
            sortable: true
        },
        {
            name: 'Precio $',
            selector: row => row.unitPrice,
            sortable: true
        },
        {
            name: 'Ruta',
            selector: row => row.routes
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="flex items-center">
                    <button className='px-1 py-1 rounded-md hover:text-red-600' onClick={() => navigate(`/new-product/${row.id}`)}>
                        Editar
                    </button>
                    <button className='px-1 py-1 rounded-md hover:text-red-600' onClick={() => deleteProduct(row.id)}>
                        Borrar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    return (
        <div className="mx-auto max-w-screen-lg px-6">
            <h1 className="text-3xl font-semibold text-center py-4">Productos</h1>
            {Array.isArray(products) && products.length > 0 ? (
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <Table
                        columns={columns}
                        data={products}
                    />
                </div>
            ) : (
                <p className="text-center mt-8">No hay productos.</p>
            )}
        </div>
    );
}

export default ProductsPage;
