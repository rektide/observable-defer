"use strict"

var
  MostCree8= require( "most-cree8")

function ObservableDefer(){
	var value= this instanceof ObservableDefer? this: {}
	var stream= value.stream= new MostCree8( function( next, complete, error){
		value.next= next
		value.complete= complete
		value.error= error
	})
	Object.defineProperties(value, {
		"onObserved": {
			enumerable, true,
			get: function(){
				return stream.onObserved
			},
			set: function( value){
				stream.onObserved= value
			}
		},
		"observed": {
			enumerable: true,
			get: function(){
				return stream.observed
			}
		}
	})
	return value
}

module.exports= ObservableDefer
module.exports.default= ObservableDefer
module.exports.ObservableDefer= ObservableDefer
