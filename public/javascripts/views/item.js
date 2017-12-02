var ItemView = Backbone.View.extend({
  template: App.templates.item,
  el: '#content',

  events: {
    "click div.prev": "prevItem",
    "click div.next": "nextItem",
    "click #item_details a.add-cart": "addToCartClick"
  },

  prevItem: function() {
    var prevID = this.item.get('id') - 1;
    if (prevID > 0) {
      App.router.navigate('menu/' + prevID, {trigger: true});
    }
  },

  nextItem: function() {
    var nextID = this.item.get('id') + 1;
    if (nextID < 20) {
      App.router.navigate('menu/' + nextID, {trigger: true});
    }
  },

  addToCartClick: function(e) {
    e.preventDefault();
    var id = this.item.get('id');
    this.trigger('addToCartClick', id);
  },

  render: function(id) {
    this.item = this.collection.get(id);
    this.$el.html(this.template(this.item.toJSON()));
  }
});