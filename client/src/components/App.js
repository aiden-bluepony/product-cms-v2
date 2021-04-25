import React, {useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useMutation,
  gql
} from '@apollo/client';
import './App.css'
import AddProduct from './AddProduct'
import ProductList from './ProductList'

const PRODUCT_QUERY = gql` 
query allProducts{
  products{
    id
    name
    price
  }
}
`;
const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $name: String, $price: Float){
    updateProduct(product: {
      id: $id
      name: $name
      price: $price
    }){
      id
      name
      price
    }
  }
`
const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!){
    deleteProduct(product:{
      id: $id
    }){
      id
      name
      price
    }
  }
`

function App() {
  const {loading, error, data} = useQuery(PRODUCT_QUERY)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...¯\_(ツ)_/¯</p>
  return (
    <div className='App'>
      <AddProduct/>
      <ProductList data={data}/>
    </div>
  )
}

export default App;