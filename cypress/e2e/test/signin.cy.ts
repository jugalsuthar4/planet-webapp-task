const client = 'http://localhost:3000';
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(`${client}/signin`);
  });

  it('should render the login page with the correct elements', () => {
    cy.get('h2').contains('Login');
    cy.get('p').contains('Login to access your vault account');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
    cy.get('a').contains('Sign Up').should('be.visible');
    cy.get('p').contains('Forgot Password ?').should('be.visible');
    cy.get('span').contains('or login with').should('be.visible');
  });
});

describe('Login Form Validation', () => {
  beforeEach(() => {
    cy.visit(`${client}/signin`);
  });

  it('should display error when username is missing', () => {
    cy.get('input[name="password"]').type('emilyspass');
    cy.get('button').contains('Login').click();
    cy.get('p').contains('please enter the username').should('be.visible');
  });

  it('should display error when password is missing', () => {
    cy.get('input[name="username"]').type('emilys');
    cy.get('button').contains('Login').click();
    cy.get('p').contains('please enter the password').should('be.visible');
  });
});

describe('Login Success', () => {
  beforeEach(() => {
    cy.visit(`${client}/signin`);
  });

  it('should redirect to /edit-profile on successful login', () => {
    cy.get('input[name="username"]').type('emilys');
    cy.get('input[name="password"]').type('emilyspass');
    cy.get('button').contains('Login').click();

    cy.url().should('include', '/edit-profile');
  });
});
