(function ($, Backbone, Marionette, Hogan) {
    "use strict";
    function renderer (templateContent, data) {
        var template = Hogan.compile(templateContent);
        return template.render(data);
    }

    var User = Backbone.Model.extend({
        urlRoot: '/users'
    });

    var UserCollection = Backbone.Collection.extend({
        url: '/users'
    });

    var UserView = Marionette.ItemView.extend({
        tagName: 'li',
        template: "{{name}} ({{score}})"
    });

    var LoadingView = Marionette.ItemView.extend({
        template: "loading..."
    });

    var UserListView = Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: UserView,
        emptyView: LoadingView
    });

    $(function () {
        var app = new Marionette.Application();
        app.addRegions({
            main: '#container'
        });
        app.addInitializer(function() {
            var userCollection = new UserCollection();
            userCollection.fetch();
            var userListView = new UserListView({
                collection: userCollection
            });
            app.main.show(userListView);
        });
        Marionette.Renderer.render = renderer;
        app.start();
    });
})(jQuery, Backbone, Marionette, Hogan);