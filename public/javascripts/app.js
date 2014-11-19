(function ($, Backbone) {
    "use strict";
    $(function () {
        var View = Backbone.View.extend({
            render: function () {
                this.$el.html('<h1>Hello world</h1>');
            }
        });
        var view = new View({
            el: $('#container')
        });
        view.render();
    });
})(jQuery, Backbone);