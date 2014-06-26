L.Illustrate.Create = L.Illustrate.Create || {};

L.Illustrate.Create.Textbox = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'textbox'
	},

	options: {
		shapeOptions: {
			color: '#000000'
		}
	},

	_drawShape: function(latlng) {
		var bounds = new L.LatLngBounds(this._startLatLng, latlng),
			anchor = bounds.getCenter(),
			upperLeft = this._map.latLngToLayerPoint(bounds.getSouthWest()).round(),
			lowerRight = this._map.latLngToLayerPoint(bounds.getNorthEast()).round(),
			height = upperLeft.y - lowerRight.y,
			width = lowerRight.x - upperLeft.x;

		if (!this._shape) {
			this._shape = new L.Illustrate.Textbox(anchor, this.options.shapeOptions);
			this._map.addLayer(this._shape);
		}

		this._shape.setSize(new L.Point(width, height));
	},

	_fireCreatedEvent: function() {
		var textbox = new L.Illustrate.Textbox(this._shape.getLatLng(), this.options.shapeOptions);
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, textbox);
	}
});