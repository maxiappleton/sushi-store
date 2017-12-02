var AllItemsView = Backbone.View.extend({
  template: App.templates.items,
  el: '#content',

  events: {
    "click #items footer": "addToCartClick"
  },

  addToCartClick: function(e) {
    e.preventDefault();
    var id = $(e.target).closest('li').attr('data-id');
    this.trigger('addToCartClick', id);
  },

  render: function() {
    this.$el.html(this.template({ item: this.collection.toJSON() }));
  }
});