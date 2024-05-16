import { calculateQ, calculateS } from "../utils/calculates";
import EOQChart from "./Chart";

function Results({ inputs }) {
    const demandas = [100, 200, 300, 400, 500]; // Demandas

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-2xl font-semibold text-center mb-6">Resultados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow-md text-black">
                    <h4 className="text-xl font-semibold mb-4">Cantidad Optima (Q)</h4>
                    <p>{calculateQ(inputs)}</p>
                </div>
                <div className="bg-white p-6 rounded shadow-md text-black">
                    <h4 className="text-xl font-semibold mb-4">Faltante Optimo (S)</h4>
                    <p>{calculateS(inputs)}</p>
                </div>
            </div>

            <EOQChart demandas={demandas} costoAlInventario={inputs.Cmi} />
        </div>
    );
}

export default Results;
