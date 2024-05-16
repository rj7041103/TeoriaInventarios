from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from uuid import uuid4

app = FastAPI()
db = []

from uuid import uuid4

# Creacion de la clase Products
class Product(BaseModel):
    id: Optional[str] = None
    nameProduct: str
    cantProduct: int
    unitPrice: float
    routes: str

    def dict(self, *args, **kwargs):
        data = super().dict(*args, **kwargs)
        if self.id is None:
            self.id = str(uuid4())
        return data

# Configurar CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get all products
@app.get("/products")
def getProducts():
    if len(db) == 0:
        return {"message": "DB is empty"}
    else:
        return db

# Create product
@app.post("/products", response_model=Product)
def postProducts(product: Product):
    product.id = str(uuid4())
    db.append(product.dict())
    return product

# Update product
@app.put("/products/{post_id}", response_model=Product)
def updateProducts(post_id: str,product: Product):
    for pod in db:
        if pod["id"] == post_id:
            pod["nameProduct"] = product.nameProduct
            pod["cantProduct"] = product.cantProduct
            pod["unitPrice"] = product.unitPrice
            pod["routes"] = product.routes
            return product
    raise HTTPException(status_code=404, detail="Product not found")

# Delete product
@app.delete("/products/{id}")
def deleteProducts(id: str):
    for pod in db:
        if pod["id"] == id:
            db.remove(pod)
            return {"detail": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")

# Get product by ID
@app.get("/products/{product_id}")
def getProduct(product_id: str):
    for prod in db:
        if prod["id"] == product_id:
            return prod
    raise HTTPException(status_code=404, detail="Product not found")