import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="bg-stone-950 text-white p-4 flex justify-between items-center">
            <Link
                to="/"
                className="text-white text-lg hover:text-gray-300"
            >
                Inventario
            </Link>

            <ul className="flex gap-x-2 text-slate-800">
                <li>
                    <Link to="/eoq" className="text-white hover:text-gray-300 px-2">
                        EOQ
                    </Link>
                </li>
                <li>
                    <Link to="/new-product" className="text-white hover:text-gray-300 px-2">
                        Comprar
                    </Link>
                </li>
            </ul>
        </div>
    );
}