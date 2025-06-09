/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";


describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Beaumont Summit Kit')
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')
    });
    
    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Zeppelin Yoga Pant'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Zeppelin-Yoga-Pant')
        cy.get('.product_title').should('contain', 'Zeppelin Yoga Pant')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('S', 'Green', qtd)
    });

    it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[2].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[2].tamanho, 
                dados[2].cor, 
                dados[2].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
        })


    });
});