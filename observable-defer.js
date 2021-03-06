"use strict"

var
  MostCree8= require( "most-cree8")

function ObservableDefer(){
	var value= this instanceof ObservableDefer? this: {}
	var stream= value.stream= new MostCree8( function( next, complete, error){
		value.next= next
		value.complete= complete
		value.error= error
		return function(){
			if( value.onunsubscribe){
				value.onunsubscribe()
			}
		}
	})
	Object.defineProperties(value, {
		"onsubscribe": {
			enumerable: true,
			get: function(){
				return stream.onsubscribe
			},
			set: function( value){
				stream.onsubscribe= value
			}
		},
		"subscribed": {
			enumerable: true,
			get: function(){
				return !!stream._sink
			}
		}
	})
	return value
}

module.exports= ObservableDefer
module.exports.default= ObservableDefer
module.exports.ObservableDefer= ObservableDefer
