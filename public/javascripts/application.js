App = {
  templates: JST,

  createCollections: function() {
    this.cartCollection = new CartItems();
    this.allItemsCollection = new AllItems(MENU_ITEMS);
  },

  createViews: function() {
    this.headerView = new HeaderView({ collection: this.cartCollection });
    this.cartView = new CartView({ collection: this.cartCollection });
    this.allItemsView = new AllItemsView({ collection: this.allItemsCollection });
    this.itemView = new ItemView({ collection: this.allItemsCollection });
    this.checkoutView = new CheckoutView({ collection: this.cartCollection });
  },

  renderMenu: function() {
    this.headerView.render();
    this.cartView.render();
    this.allItemsView.render();
  },

  renderItemDetail: function(id) {
    this.itemView.render(id);
  },

  renderCheckout: function() {
    $('#cart').slideUp();
    this.checkoutView.render();
  },

  bindListeners: function() {
    _.extend(this, Backbone.Events);

    // Router events to listen for
    this.listenTo(this.router, 'navigateToMenu', this.renderMenu);
    this.listenTo(this.router, 'navigateToItemDetail', this.renderItemDetail);
    this.listenTo(this.router, 'navigateToCheckout', this.renderCheckout);

    // Cart events to listen for
    this.listenTo(this.allItemsView, 'addToCartClick', this.addToCart);
    this.listenTo(this.itemView, 'addToCartClick', this.addToCart);
    this.listenTo(this.checkoutView, 'minusQuantityClick', this.cartCollection.minusQuantity.bind(this.cartCollection));
    this.listenTo(this.checkoutView, 'addQuantityClick', this.cartCollection.addQuantity.bind(this.cartCollection));
  },

  addToCart: function(id) {
    this.cartCollection.addItem(this.allItemsCollection.get(id));
  },

  init: function() {
    this.router = new Router();
    this.createCollections();
    this.createViews();
    this.renderMenu();
    this.bindListeners();
  }
};

// Handlebars Helpers

Handlebars.registerHelper("formatPrice", function(price) {
  return (+price).toFixed(2);
});
