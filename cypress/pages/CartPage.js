class CartPage {
  cartRows = 'tr.cart-item';

  parsePrice(text) {
    return Number(text.replace(/[^0-9.]/g, ''));
  }

  validateProductPrices(products) {
    products.forEach(product => {
      const productName = product.Product;
      const expectedPrice = Number(product.Price);

      cy.get(this.cartRows)
        .contains('td', productName)
        .parents('tr.cart-item')
        .within(() => {
          cy.get('td').eq(1)
            .invoke('text')
            .then(text => {
              const actualPrice = this.parsePrice(text);
              expect(actualPrice).to.eq(expectedPrice);
            });
        });
    });
  }

  validateProductSubtotals(products) {
    products.forEach(product => {
      const productName = product.Product;
      const expectedSubtotal = Number(product.Subtotal);

      cy.get(this.cartRows)
        .contains('td', productName)
        .parents('tr.cart-item')
        .within(() => {
          cy.get('td').eq(3)
            .invoke('text')
            .then(text => {
              const actualSubtotal = this.parsePrice(text);
              expect(actualSubtotal).to.eq(expectedSubtotal);
            });
        });
    });
  }

  validateTotal(totalSelector) {
    cy.get(this.cartRows)
      .then($rows => {
        let sum = 0;

        Cypress.$($rows).each((index, row) => {
          const text = row.querySelectorAll('td')[3].innerText;
          sum += this.parsePrice(text);
        });

        return sum;
      })
      .then(sum => {
        cy.get(totalSelector)
          .invoke('text')
          .then(totalText => {
            const totalValue = this.parsePrice(totalText);
            expect(totalValue).to.eq(sum);
          });
      });
  }

  validateCart(products, totalSelector) {
    cy.get(this.cartRows)
      .then($rows => {
        let sum = 0;

        Cypress.$($rows).each((index, row) => {
          const cells = row.querySelectorAll('td');

          const name = cells[0].innerText.trim();
          const price = this.parsePrice(cells[1].innerText);
          const subtotal = this.parsePrice(cells[3].innerText);

          const product = products.find(p => p.Product === name);

          expect(product, `Product ${name} exists in data table`).to.exist;
          expect(price).to.eq(Number(product.Price));
          expect(subtotal).to.eq(Number(product.Subtotal));

          sum += subtotal;
        });

        return sum;
      })
      .then(sum => {
        cy.get(totalSelector)
          .invoke('text')
          .then(totalText => {
            const totalValue = this.parsePrice(totalText);
            expect(totalValue).to.eq(sum);
          });
      });
  }
}

export default new CartPage();