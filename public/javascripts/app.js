(function ($, Backbone) {
    "use strict";
    var IndexView = Backbone.View.extend({
        template: "<h1>Searching {{search}}...</h1> <form><input name='search' /></form>",
        render: function () {
            var output = this._template.render(this.model.toJSON());
            this.$el.html(output);
            return this;
        },
        initialize: function () {
            this._template = Hogan.compile(this.template);
            this.render();
            this.model.on('change', this.render, this);
        },
        events: {
            "submit form": "onSearch"
        },
        onSearch: function (e) {
            var query = this.$("input").val();
            this.model.set({
                search: query
            });
            return false;
        }
    });

    var App = Backbone.Router.extend({
        initialize: function (options) {
            this.container = options.container;
        },
        routes: {
            '': "index"
        },
        index: function () {
            var search = new Backbone.Model();
            var indexView = new IndexView({
                el: this.container,
                model: search
            });
        }
    });

    $(function () {
        var app = new App({
            container: $('#container')
        });
        Backbone.history.start({
            pushState: false
        });
    });
})(jQuery, Backbone);