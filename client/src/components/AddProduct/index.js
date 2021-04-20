import React, { useState } from 'react';
import './AddProduct.css'
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useMutation,
  gql
} from '@apollo/client';


// apollo-client schema?
const ADD_PRODUCT = gql`
  mutation addProduct($name: String!, $price: Float!) {
    addProduct(product: {
      name: $name 
      price: $price
    }){
      id
      name
      price
    }
  }
`

function AddProduct() {

  const [input, setInput] = useState({})
  const [addProduct, {data}] = useMutation(ADD_PRODUCT);


  function onInput(e) {
    return setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  function onSubmit(e) {
    e.preventDefault();
    addProduct({
      variables:{
        name: input.name,
        price: parseFloat(input.price)
      }
    }).then(() => {
      setInput({})
    }).catch(err => console.log(err))
  }

  return (
    <form className="AddProduct" onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="name" onChange={onInput} value={input.name || ''} />
      <input type="text" name="price" placeholder="price" onChange={onInput} value={input.price || ''} />
      <button>submit</button>
      <br/>
      <br/>
      <hr/>
    </form>
  )
}

export default AddProduct;