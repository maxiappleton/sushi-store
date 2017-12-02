var CartItems = Backbone.Collection.extend({
  readStorage: function() {
    var storedCart = JSON.parse(localStorage.getItem('cart'));
    this.reset(storedCart);
  },

  updateStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },

  addItem: function(item) {
    var existing = this.get(item.get('id'));

    if (existing) {
      existing.set('quantity', existing.get('quantity') + 1);
    } else {
      existing = item.clone();
      existing.set('quantity', 1);
      this.add(existing);
    }
    this.update();
  },

  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0);

    return this;
  },

  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this;
  },

  minusQuantity: function(id) {
    var cartItem = this.get(id);
    var quantity = cartItem.get('quantity');

    if (quantity === 1) {
      this.destroy(id);
    } else {
      cartItem.set('quantity', quantity - 1);
      this.update();
    }
  },

  addQuantity: function(id) {
    var cartItem = this.get(id);
    var quantity = cartItem.get('quantity');

    cartItem.set('quantity', quantity + 1);
    this.update();
  },

  destroy: function(id) {
    this.remove(id);
    this.update();
  },

  destroyAll: function() {
    this.reset();
    this.update();
  },

  update: function() {
    this.setTotal().setQuantity();
    this.updateStorage();
    this.trigger('update');
  },

  initialize: function() {
    this.readStorage();
    this.update();
  }

});