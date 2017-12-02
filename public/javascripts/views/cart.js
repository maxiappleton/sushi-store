var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: '#cart',

  events: {
    "click a.empty_cart": "emptyCart"
  },

  emptyCart: function() {
    this.collection.destroyAll();
  },

  render: function() {
    if (this.collection.length > 0) {
      this.$el.html(this.template({
        item: this.collection.toJSON(),
        total: this.collection.total
      }));
      this.$el.slideDown();
    } else {
      this.$el.slideUp();
    }
  },

  refresh: function() {
    if (Backbone.history.getFragment() !== "checkout") {
      this.render();
    }
  },

  initialize: function() {
    this.listenTo(this.collection, 'update', this.refresh);
  }
});