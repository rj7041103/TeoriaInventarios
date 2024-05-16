import DataTable from 'react-data-table-component';
import { useState } from 'react';

function Table({ columns, data }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value || '';
        setSearchText(value);
    };

    const filteredData = data.filter(item =>
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Buscar..."
                    className="border border-gray-300 rounded-md py-1 px-4 mb-4"
                    style={{ width: '100%', maxWidth: '200px' }} // Ajusta el ancho según sea necesario
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
            />
        </div>
    );
}

export default Table;