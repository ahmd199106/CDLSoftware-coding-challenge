describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
  });
  it('records a  page load ', () => {
    cy.get('.header').contains('Shopping');
  });
  it('records that when we  add  an apple we get its price added to the total cost', () => {
    cy.get('#addAppleButton').click();

    cy.get('.price').contains('50');
  });
  it('records that when we  add  an apple 3 times  we get its price added to the total cost and the apple discount of 20 is displayed', () => {
    cy.get('#addAppleButton').click();
    cy.get('#addAppleButton').click();
    cy.get('.price').contains('130');
    cy.get('.appleDiscount').contains('20');
  });
});

export {};
