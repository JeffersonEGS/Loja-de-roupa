 /*finalizar compras*/

 document.addEventListener('DOMContentLoaded', () => {
  const Recipiente = document.getElementById('roupas-container');
  const botaoFinalizarCompra = document.getElementById('finalizar-compra');
  let totalpreco = 0;

  document.querySelectorAll('#add-carrinho').forEach(button => {
    button.addEventListener('click', (event) => {
      const secaoProduto = event.target.closest('section');
      const nomeProduto = secaoProduto.querySelector('span').innerText;
      const precoProduto = parseFloat(secaoProduto.querySelector('.preco').innerText.replace('R$', '').replace(',', '.'));
      const imagemProduto = secaoProduto.querySelector('img').src;

      addItemCarrinho(nomeProduto, precoProduto, imagemProduto);
    });
  });
  
  function addItemCarrinho(name, preco, imageUrl) {
    const ItemCarrinho = document.createElement('div');
    ItemCarrinho.classList.add('item-carrinho');

    let tamanho = '';
    if (name.includes("Tênis") || name.includes("Bota")) {
        // Adiciona opções de tamanho para tênis e botas
        tamanho = `
            <select class="selecaoTamanho">
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
            </select>`;
    } else {
        // Adiciona opções de tamanho padrão para outras roupas
        tamanho = `
            <select class="selecaoTamanho">
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
            </select>`;
    }

    ItemCarrinho.innerHTML = `
        <img src="${imageUrl}" width="60px" height="60px">
        <span>${name}</span>
        ${tamanho}
        <button class="botao-diminuir">-</button>
        <span class="quantidade">1</span>
        <button class="botao-aumentar">+</button>
        <span class="preco">R$${preco.toFixed(2)}</span>
        <button class="remove-btn">Remover</button>
    `;
    Recipiente.appendChild(ItemCarrinho);

    totalpreco += preco;
    atualizarPreco();

    // Adiciona event listeners para os botões de aumentar, diminuir e remover
    ItemCarrinho.querySelector('.botao-aumentar').addEventListener('click', () => {
        atualizarQuantidade(ItemCarrinho, preco, 1);
    });
    ItemCarrinho.querySelector('.botao-diminuir').addEventListener('click', () => {
        atualizarQuantidade(ItemCarrinho, preco, -1);
    });
    ItemCarrinho.querySelector('.remove-btn').addEventListener('click', () => {
        removeItem(ItemCarrinho, preco);
    });
}


  function atualizarQuantidade(ItemCarrinho, preco, delta) {
    const quantidadeElemento = ItemCarrinho.querySelector('.quantidade');
    let quantidade = parseInt(quantidadeElemento.innerText);
    quantidade = Math.max(1, quantidade + delta);
    quantidadeElemento.innerText = quantidade;

    const precoAntigo = parseFloat(ItemCarrinho.querySelector('.preco').innerText.replace('R$', '').replace(',', '.')); // Obtém o preço antigo do item
    const precoNovo = preco * quantidade; // Calcula o novo preço baseado na quantidade atualizada
    ItemCarrinho.querySelector('.preco').innerText = `R$${precoNovo.toFixed(2)}`; // Atualiza o preço exibido do item

    totalpreco += precoNovo - precoAntigo; // Atualiza o preço total pela diferença entre os preços novo e antigo
    atualizarPreco();
  }

  function removeItem(ItemCarrinho, preco) {
    const itempreco = parseFloat(ItemCarrinho.querySelector('.preco').innerText.replace('R$', '').replace(',', '.')); // Obtém o preço do item a ser removido
    ItemCarrinho.remove();
    totalpreco -= itempreco;
    atualizarPreco();
  }

  function atualizarPreco() {
    if (totalpreco < 0) totalpreco = 0; // Garante que o total não seja negativo
    const totalPrecoItem = document.getElementById('total-preco');
    totalPrecoItem.innerText = `Total: R$${totalpreco.toFixed(2)}`;
  }

  botaoFinalizarCompra.addEventListener('click', () => {
    alert('Compra finalizada!');
    Recipiente.innerHTML = '';
    totalpreco = 0;
    atualizarPreco();
  });
});

/*Menu navagação*/ 


function alterarMenu(menuId) {
  var menu = document.getElementById(menuId);
  var todosMenu = document.querySelectorAll('.submenu');

  todosMenu.forEach(function(submenu) {
      if (submenu.id !== menuId) {
          submenu.style.display = 'none';
      }
  });

  if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
  } else {
      menu.style.display = "none";
  }
}

document.addEventListener('click', function(event) {
  var clicarMenuInterno = event.target.closest('.menu-item');

  if (!clicarMenuInterno) {
      var todosMenu = document.querySelectorAll('.submenu');
      todosMenu.forEach(function(menu) {
          menu.style.display = 'none';
      });
  }
});
  
