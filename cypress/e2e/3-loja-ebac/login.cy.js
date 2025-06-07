/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')   
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('Deve fazer login com sucesso' , () => {
        cy.get('#username').type('tatiana_any@hotmail.com')
        cy.get('#password').type('#Lcconta1802')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, tatiana_any (não é tatiana_any? Sair)')
    })


    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {

        cy.get('#username').type('usuario_teste@hotmail.com')
        cy.get('#password').type('#Lcconta1802')
        cy.get('.woocommerce-form > .button').click()
       // cy.get('.woocommerce-error').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')

    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
       cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('tatiana_any@hotmail.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail tatiana_any@hotmail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist') 
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuário)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, tatiana_any (não é tatiana_any? Sair)')
    });

    it.only('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuário , { log: false })
            cy.get('#password').type(dados.senha , { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, tatiana_any (não é tatiana_any? Sair)')
        })

    });

})