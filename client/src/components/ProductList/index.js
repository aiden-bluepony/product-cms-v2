import React, { useState } from 'react'
import './ProductList.css';
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useMutation,
  gql
} from '@apollo/client';
import { GrEdit } from 'react-icons/gr';
import { GiCancel } from 'react-icons/gi';
import {BiTrash} from 'react-icons/bi';

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
`;
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
`;

function Product({ product }) {
  const [currEdit, setCurrEdit] = useState(null);
  const [input, setInput] = useState({})
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)

  let inEditMode
  if (currEdit === product.id) { inEditMode = true }
  if (currEdit === !product.id) { inEditMode = false }

  const toggleEdit = (curr) => {
    if (curr === currEdit) {
      setCurrEdit(null)
      return
    }
    setCurrEdit(curr)
  }
  const onInput = (e) => {
    return setInput({
      ...product,
      ...input, // ---------------------- drawing from empty state
      [e.target.name]: e.target.value
    })
  }
  function onSubmit(e) {
    e.preventDefault();
    updateProduct({
      variables: {
        id: product.id,
        name: input.name,
        price: parseFloat(input.price)
      }
    }).then(() => {
      setInput({})
      toggleEdit()
    }).catch(err => console.log(err))
  }

  function onDelete(e){
    e.preventDefault();
    deleteProduct({
      variables: {
        id: product.id
      }
    }).then(() => {
      toggleEdit();
    }).catch(err => console.log(err))
  }

  return (
    <form onSubmit={onSubmit}>
      {inEditMode ? <h4>{product.name}</h4> : null}
      {inEditMode ? <input placeholder={product.name} name='name' onChange={onInput}/> : <h1>{product.name}</h1>}
      {inEditMode ? <input placeholder={product.price} name='price' onChange={onInput}/> : <p>{product.price}</p>}
      {inEditMode ?
        <div>
          <button onClick={() => toggleEdit(product.id)}><GiCancel /> cancel</button>
          <button type="submit">submit</button>
          <button onClick={onDelete}><BiTrash/> delete</button>
        </div> :
        <button onClick={() => toggleEdit(product.id)}>Edit <GrEdit /></button>

      }
      <hr />
    </form>
  );
}

function ProductList() {
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    pollInterval: 500,
  })
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...¯\_(ツ)_/¯</p>
  return (
    <div className='ProductList'>
      {data.products.map(product => {
        return <Product product={product} key={product.id} />
      })}
    </div>
  )
}

export default ProductList;