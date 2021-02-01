/// <reference types="cypress"/>

describe('Validar formulario', () => {
  it('Submit formulario', () => {
    cy.visit('http://127.0.0.1:5500/52-Testing-Cypress/index.html');

    cy.get('[data-cy="formulario"]').submit();
    cy.get('[data-cy="alerta"]')
      .invoke('text')
      .should('equal', 'Todos los campos son Obligatorios');
    cy.get('[data-cy="alerta"]').should('have.class', 'alert-danger');
  });
});
