/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {
    
    it('Deve fazer login com sucesso' , () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('tatiana_any@hotmail.com')
        cy.get('#password').type('#Lcconta1802')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, tatiana_any (não é tatiana_any? Sair)')
    })
})