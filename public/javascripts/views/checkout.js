var CheckoutView = Backbone.View.extend({
  template: App.templates.checkout,
  el: '#content',

  events: {
    "click .fa-minus": "minusQuantityClick",
    "click .fa-plus": "addQuantityClick"
  },

  minusQuantityClick: function(e) {
    var itemID = $(e.target).closest('tr').attr('data-id');
    this.trigger('minusQuantityClick', itemID);
  },

  addQuantityClick: function(e) {
    var itemID = $(e.target).closest('tr').attr('data-id');
    this.trigger('addQuantityClick', itemID);
  },

  render: function() {
    this.$el.html(this.template({
      item: this.collection.toJSON(),
      totalPrice: this.collection.total
    }));
  },

  refresh: function() {
    if (Backbone.history.getFragment() === "checkout") {
      this.render();
    }
  },

  initialize: function() {
    this.listenTo(this.collection, 'update', this.refresh);
  }
});