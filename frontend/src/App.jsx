import { Toaster } from 'sonner'
import { Route, Routes } from "react-router-dom"
import { ProductsProvider } from './context/ProductsContext'

import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import NuevoProducto from './pages/NuevoProducto'
import EoqPage from './pages/EoqPage'
import './App.css'

function App() {

  return (
    <>
      <Toaster />
      <Navbar />
      <ProductsProvider>
        <Routes>
          <Route path='/' element={<ProductsPage />} />
          <Route path='/new-product/:id?' element={<NuevoProducto />} />
          <Route path='/eoq' element={<EoqPage />} />
          <Route path='*' element={<ProductsPage />} />
        </Routes>
      </ProductsProvider>
    </>
  )
}

export default App
