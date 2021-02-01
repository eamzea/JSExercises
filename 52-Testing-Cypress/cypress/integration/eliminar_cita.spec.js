/// <reference types="cypress"/>

describe('Eliminar cita', () => {
  it('Creación de cita', () => {
    cy.visit('/index.html');
    cy.get('[data-cy="name-mascota"]').type('Gyda');
    cy.get('[data-cy="propietario-mascota"]').type('Edgar');
    cy.get('[data-cy="tel-mascota"]').type('5535057614');
    cy.get('[data-cy="date-mascota"]').type('2021-03-21');
    cy.get('[data-cy="time-mascota"]').type('12:00');
    cy.get('[data-cy="sintomas-mascota"]').type('Vomito');
    cy.get('[data-cy="submit-btn"]').click();

    cy.get('[data-cy="citas-heading"]')
      .invoke('text')
      .should('equal', 'Administra tus Citas');

    cy.get('[data-cy="alerta"]')
      .invoke('text')
      .should('equal', 'Se agregó correctamente');
    cy.get('[data-cy="alerta"]').should('have.class', 'alert-success');
  });

  it('Eliminar cita', () => {
    cy.get('[data-cy="eliminar-btn"]').click();
    cy.get('[data-cy="citas-heading"]')
      .invoke('text')
      .should('equal', 'No hay Citas, comienza creando una');
  });
});
