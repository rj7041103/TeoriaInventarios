function InputGroup({ onChange, userInput }) {
    return (
        <div className="flex justify-center items-center ">
            <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="tasaDeDemanda" className="block text-sm font-medium text-gray-700">Tasa de demanda anual <strong>UND</strong> (D)</label>
                    <input
                        type="number"
                        id="tasaDeDemanda"
                        value={userInput["D"]}
                        onChange={(event) => onChange("D", event.target.valueAsNumber)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="costoDePedido" className="block text-sm font-medium text-gray-700">Costo de emitir pedido <strong>$</strong> (Cp)</label>
                    <input
                        type="number"
                        id="costoDePedido"
                        value={userInput["Cp"]}
                        onChange={(event) => onChange("Cp", event.target.valueAsNumber)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="costoAlFaltante" className="block text-sm font-medium text-gray-700">Costo debido al faltante <strong>$</strong> (Cf)</label>
                    <input
                        type="number"
                        id="costoAlFaltante"
                        value={userInput["Cf"]}
                        onChange={(event) => onChange("Cf", event.target.valueAsNumber)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="constoAlInventario" className="block text-sm font-medium text-gray-700">Costo de mantener un producto en el inventario <strong>$</strong> (Cmi)</label>
                    <input
                        type="number"
                        id="constoAlInventario"
                        value={userInput["Cmi"]}
                        onChange={(event) => onChange("Cmi", event.target.valueAsNumber)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
        </div>
    )
}

export default InputGroup