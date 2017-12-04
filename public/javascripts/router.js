var Router = Backbone.Router.extend({
  routes: {
    '': 'menu',
    'menu': 'menu',
    "menu/:id": "itemDetail",
    "checkout": "checkout"
  },

  menu: function() {
    App.renderMenu();  
  },

  itemDetail: function(id) {
    App.renderItemDetail(id);
  },

  checkout: function() {
    App.renderCheckout();
  }
});

// Remove forward slash at front of URL on link clicks
$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  App.router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});

// Initialize Backbone history
Backbone.history.start({
  pushState: true
});

