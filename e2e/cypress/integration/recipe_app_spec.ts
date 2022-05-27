describe("Recipe tests", () => {
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
    cy.visit('http://localhost:3000/add-recipe')
    const name = "Champ";
    const ingredients = "Potatoes, Pint Milk, Butter, Salt, White Pepper and finely chopped spring onions";
    const measurements = "1.35kg/3lb potatoes, well scrubbed and left whole in their jackets, 290ml/½ pint milk, 85g/3oz butter, salt and white pepper, 1 large bunch spring onions, finely chopped";
    const cooking_method = "Boil the potatoes in salted water until soft. Drain and remove from the pan. Leave until just cool enough to peel. Mash thoroughly. Boil the milk and add to the potato, together with the spring onions. Season and stir well. Pile into a serving dish. Make a well in the centre and add the butter. Serve immediately.";
    cy.get('.save-form')
      .get('.recipe-name').type(name).should('have.value', name)
      .get('.recipe-ingre').type(ingredients).should('have.value', ingredients)
      .get('.recipe-measure').type(measurements).should('have.value', measurements)
      .get('.recipe-cooking').type(cooking_method).should('have.value', cooking_method)
      .get('.save-btn').click();
    cy.contains('You succesfully added a Recipe.')
      .should('be.visible')
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    cy.visit('http://localhost:3000/search-recipe')
    const byName = "Champ";
    cy.get('.form-search-recipe')
      .get('select').select('0')
      .get('.form-control')
      .type(byName)
      .should('have.value', byName)
      .get('.search-btn')
      .click()
      .get('table').contains('td', byName);
  });

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
        cy.visit('http://localhost:3000/search-recipe')
        const byIngredient = "Potatoes";
        cy.get('.form-search-recipe')
          .get('select').select('1')
          .get('.form-control')
          .type(byIngredient)
          .should('have.value', byIngredient)
          .get('.search-btn')
          .click()
          .get('table').contains('td', byIngredient);
  });
});
