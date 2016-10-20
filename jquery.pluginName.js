;(function($, window, document, undefined) {

	var pluginName = 'pluginName';
	var defaults = {
		target: '.js_pluginName'
	};

	// The actual plugin constructor
	function Plugin(element, options) {
		this.options = $.extend( {}, defaults, options );

		this.$el = $(element);
		this.$target = this.$el.find(options && options.target || defaults.target);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function() {
			this.bindEvents();
		},

		// Remove plugin instance completely
		destroy: function() {
			// The destroy method unbinds all events for the specific instance
			// of the plugin, then removes all plugin data that was stored in
			// the plugin instance using jQuery's .removeData method.
			//
			// Since we store data for each instance of the plugin in its
			// instantiating element using the $.data method (as explained
			// in the plugin wrapper below), we can call methods directly on
			// the instance outside of the plugin initalization, ie:
			// $('selector').data('plugin_myPluginName').someOtherFunction();
			//
			// Consequently, the destroy method can be called using:
			// $('selector').data('plugin_myPluginName').destroy();


			this.unbindEvents();

			this.$el.off('.' + pluginName);
			this.$el.find('*').off('.' + pluginName);

			this.$el.removeData(pluginName);
			this.$el = null;
		},

		bindEvents: function() {
			// Always use event delefation! https://learn.jquery.com/events/event-delegation/
			// $('#list a').on('click', function(event) {
			// 	event.preventDefault();
			// 	console.log($(this).text());
			// });
		},

		// Unbind events that trigger methods
		unbindEvents: function() {
			// Unbind all events in our plugin's namespace that are attached
			// to "this.$element".
			// this.$element.off('.'+this._name);
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});

		return this;
	};

})(jQuery, window, document);
