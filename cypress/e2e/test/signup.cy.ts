describe('Signup Form E2E Test', () => {
  beforeEach(() => {
    cy.visit(`localhost:3000/signup`);
    cy.intercept('POST', '*').as('createUser');
  });

  it('should display the signup form', () => {
    cy.get('h2').contains('Signup').should('be.visible');
    cy.get('form').should('exist');
  });

  it('should display error when username is missing', () => {
    cy.get('input[name="password"]').type('ValidPass123!');
    cy.get('input[name="firstName"]').type('Emily');
    cy.get('input[name="email"]').type('emily@example.com');
    cy.get('input[name="birthDate"]').type('1990-01-01');
    cy.get('select[name="gender"]').select('Female');
    cy.get('button').contains('signup').click();

    cy.get('input[name="username"]').focus().blur();
    cy.get('p').contains('please enter the username').should('be.visible');
  });

  it('should display error when password does not meet requirements', () => {
    cy.get('input[name="username"]').type('emily');
    cy.get('input[name="password"]').type('short');
    cy.get('input[name="firstName"]').type('Emily');
    cy.get('input[name="email"]').type('emily@example.com');
    cy.get('input[name="birthDate"]').type('1990-01-01');
    cy.get('select[name="gender"]').select('Female');
    cy.get('button').contains('signup').click();

    cy.get('input[name="password"]').focus().blur();
    cy.get('p').contains('Password:').should('exist');
    cy.get('span.text-red-500').should('exist');
  });
});
