var HeaderView = Backbone.View.extend({
  template: App.templates.header,
  el: "header",

  render: function() {
    this.$el.html(this.template({
      quantity: this.collection.quantity
    }));
  },

  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
  },
});