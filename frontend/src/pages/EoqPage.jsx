import { useState } from "react";
import Results from "../components/Results";
import InputGroup from "../components/InputGroup";

function EoqPage() {
    const [userInput, setUserInput] = useState({
        D: 1000, //Demanda/year
        Cp: 10, //Costo de emitir un pedido
        Cf: 2, //Costo debido al faltante
        Cmi: 2.5 //Costo asociado a mantener un producto en el inventario
    })

    const handleChange = (inputIndentifier, newValue) => {
        setUserInput(prevUserInput => {
            return {
                ...prevUserInput,
                [inputIndentifier]: newValue
            }
        })
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-center mt-6 mb-4">Cantidad Económica de Pedido (EOQ)</h2>
            <InputGroup onChange={handleChange} userInput={userInput} />
            <div className="flex justify-center py-3">
                <Results inputs={userInput} />
            </div>
        </>
    );
}

export default EoqPage;
