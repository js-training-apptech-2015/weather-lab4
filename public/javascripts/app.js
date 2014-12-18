(function ($, Backbone, Marionette, Hogan) {
    "use strict";

    function renderer(templateName, data) {
      var templateContent = $('#' + templateName).text();
      var template = Hogan.compile(templateContent);
      return template.render(data);
    }

    var LocationCollection = Backbone.Collection.extend({
        url: 'fake/location.json'
    });
    var ForecastCollection = Backbone.Collection.extend({
        url: function () {
            return 'fake/' + this.location.name.toLowerCase() + '_forecast.json';
        }
    });
    var Location = Backbone.Model;


    var LocationView = Marionette.ItemView.extend({
        template: "locations",
        initialize: function (options) {
            this.locations = options.locations;
        },
        serializeData: function () {
            var data = Marionette.ItemView.prototype.serializeData.apply(this, arguments);
            data.locations = this.locations.toJSON();
            return data;
        },
        events: {
            "change select": "onLocationChange"
        },
        onLocationChange: function () {
            var cityName = this.$("select").val();
            var newCity = this.locations.where({
                name: cityName
            });
            this.model.set(newCity[0].toJSON());
        }
    });

    var ForecastItemView = Marionette.ItemView.extend({
        template: "forecast-item"
    });

    var ForecastView = Marionette.CollectionView.extend({
        childView: ForecastItemView
    });


    var MainView = Marionette.LayoutView.extend({
        template: "layout",
        regions: {
            locationRegion: '#location',
            forecastRegion: '#forecast'
        },
        initialize: function () {
            var self = this;
            this.selectedLocation = new Location();
            this.locations = new LocationCollection();
            this.fetchLocations();
        },
        fetchLocations: function () {
            var self = this;
            return this.locations.fetch()
                .then(function () {
                    self.showLocationView();
                    self.buildForecast();
                });
        },
        showLocationView: function () {
            var locationView = new LocationView({
                model: this.selectedLocation,
                locations: this.locations
            });
            this.locationRegion.show(locationView);
        },
        buildForecast: function () {
            var self = this;
            var forecast = new ForecastCollection();
            var forecastView = new ForecastView({
                collection: forecast
            });
            this.forecastRegion.show(forecastView);
            this.selectedLocation.on('change', function () {
                forecast.location = this.selectedLocation.toJSON();
                forecast.fetch();
            }, this);
        }
    });

    $(function () {
        var app = new Marionette.Application();
        app.addRegions({
            mainRegion: '#container'
        });

        app.addInitializer(function () {
            var mainView = new MainView();
            app.mainRegion.show(mainView);
        });
        Marionette.Renderer.render = renderer;
        app.start();
    });
})(jQuery, Backbone, Marionette, Hogan);