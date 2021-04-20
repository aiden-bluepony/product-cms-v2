# Queries
### all products
{
  products{
    id
    name
    price
  }
}
### single product
{
  product(id: "606ba54484c09462d0bc8ebf"){
    id
    name
    price
  }
}

# Mutations
### add product
mutation{
  addProduct(product: {name: "burger" price: 50}){
    id
    name
    price
  }
}
### update product
mutation{
  updateProduct(product: {id: "606bae437fccfb61583a12c6" price: 3}){
    id
    name
    price
  }
}
### delete product
mutation{
  deleteProduct(product: {id:"606bae437fccfb61583a12c6"}){
    id
    name
    price
  }
}