const details = 'Детали ингредиента';
const ingredient = 'Ингредиент 1';
const addBtn = 'Добавить';

const bun = {
  _id: '1',
  name: 'Ингредиент 1'
};
const main = {
  _id: '3',
  name: 'Ингредиент 3'
};

const souсe = {
  _id: '11',
  name: 'Ингредиент 11'
};

describe('Тесты добавления ингрединтов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Тест добавления булочки и ингридиентов', () => {
    // добавляем булку
    cy.get(`[data-cy=${bun._id}]`).contains(addBtn).click();
    // добавляем котлету
    cy.get(`[data-cy=${main._id}]`).contains(addBtn).click();
    // добавляем соус
    cy.get(`[data-cy=${souсe._id}]`).contains(addBtn).click();
    // проверяем верхнии и нижние булки
    cy.get('[data-cy=constructor-bun-top]')
      .contains(ingredient)
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains(ingredient)
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains(ingredient)
      .should('exist');
  });
});

describe('Тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Тест открытия модального окна и закрытия по клику кнопки', () => {
    cy.contains(details).should('not.exist');
    cy.contains(ingredient).click();
    cy.get('[data-cy="modal"]').as('modal').should('be.visible');
    cy.get('@modal').contains(ingredient);
    // нашли кнопку закрыть модалку и кликнули на нее
    cy.get('[data-cy="modal-close"]').click();
    // проверили что модалка закрылась
    cy.get('modal').should('not.exist');
  });

  it('Тест открытия модального окна и закрытия по клику по оверлею', () => {
    cy.contains(details).should('not.exist');
    cy.contains(ingredient).click();

    // кликаем по оверлею
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    // проверили что модалка закрылась
    cy.get('modal').should('not.exist');
  });
});

describe('Тесты создания заказа и авторизации', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Тест сборки и оформления заказа', () => {
    cy.get(`[data-cy=${bun._id}]`).contains(addBtn).click();
    // добавляем котлету
    cy.get(`[data-cy=${main._id}]`).contains(addBtn).click();
    // добавляем соус
    cy.get(`[data-cy=${souсe._id}]`).contains(addBtn).click();
    // нажимаем кнопку оформления заказа
    cy.get('[data-cy=order-button').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '3', '11', '1']
      });
    //проверяем модалку подтверждения заказа
    cy.get('[data-cy="modal"]').as('modal').should('be.visible');
    // проверяем номер заказа
    cy.get('@modal').contains('101010');

    cy.get('[data-cy=modal-close]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy=burger-constructor]')
      .contains(ingredient)
      .should('not.exist');
  });
});
