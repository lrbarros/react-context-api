import { useContext, useEffect, useMemo } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import {
  ADD_PRODUTO,
  REMOVE_PRODUTO,
  UPDATE_QUANTIDADE,
} from "../reducers/carrinhoReducer";

const adicionarProdutoAction = (novoProduto)=>({
  type:ADD_PRODUTO,
  payload:novoProduto
})

const removeProdutoAction = (produtoId)=>({
  type:REMOVE_PRODUTO,
  payload:produtoId
})


const updateProdutoAction = (produtoId,quantidade)=>({
  type:UPDATE_QUANTIDADE,
  payload:{produtoId,quantidade}
})


export const useCarrinhoContext = () => {
  const { carrinho, dispatch, quantidade, valorTotal } =
    useContext(CarrinhoContext);

 
  function adicionarProduto(novoProduto) {
    dispatch(adicionarProdutoAction(novoProduto))
  }

  function removerProduto(id) {
    //Essa função deve verificar se o produto está no carrinho;
    const produto = carrinho.find((itemDoCarrinho) => {
      return itemDoCarrinho.id === id;
    });
    if(produto && produto.quantidade >1){
      dispatch(updateProdutoAction(id,produto.quantidade -1))
    }else{
      dispatch(removeProdutoAction(produto))
 
    }
  }
  function removerProdutoCarrinho(id) {
    dispatch(removeProdutoAction(id))
  }

 
  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade,
  };
};
