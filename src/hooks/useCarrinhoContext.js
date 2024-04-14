import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho } = useContext(CarrinhoContext);
    
    function alterarQuantidade(id,qtd){
        return carrinho.map((itemDoCarrinho)=>{
            if(itemDoCarrinho.id === id){
                 itemDoCarrinho.quantidade += qtd
            }
            return itemDoCarrinho
        })
    }

    function adicionarProduto(novoProduto) {
      const temProduto = carrinho.some(
        (itemDoCarrinho) =>   itemDoCarrinho.id === novoProduto.id
    );
      
      if (!temProduto) {
        novoProduto.quantidade = 1;
        return setCarrinho((carrinhoAnterior) => [
          ...carrinhoAnterior,
          novoProduto,
        ]);
      }
      const carrinhoAtualizado = alterarQuantidade(novoProduto.id,1)
      return setCarrinho([...carrinhoAtualizado]);
    }

    function removerProduto(id){
       //Essa função deve verificar se o produto está no carrinho;
        const produto = carrinho.find( (itemDoCarrinho)=>{return itemDoCarrinho.id === id})
        // Verifique se o produto é o último do tipo dele no
        const ehOUltimo = produto.quantidade === 1;
        // Se ele não for o último produto do carrinho, diminua a quantidade dele no carrinho.
        if(!ehOUltimo){
            const carrinhoAtualizado = alterarQuantidade(produto.id,-1)
            return setCarrinho([...carrinhoAtualizado]);
        }
        //se for o ultimo remove
        return removerProdutoCarrinho(id)
        
    }
    function removerProdutoCarrinho(id){
        const carrinhoComProdRemovido = carrinho.filter((itemDoCarrinho)=>{return itemDoCarrinho.id !== id})
        setCarrinho(carrinhoComProdRemovido)
    }   

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho
    }
};
