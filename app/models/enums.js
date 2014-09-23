/**
 * New node file
 */
"use strict";

var Enum = require('enum');

var yesOrNo = new Enum({
	'yes' : 'Yes',
	'no' : 'No'
});

var worstThing = new Enum({
	'pain' : 'Smärta',
	'nausea' : 'Illamående',
	'immobility' : 'Orörlighet',
	'insomnia' : 'Sömnbesvär',
	'fever' : 'Feber',
	'noSymptoms' : 'Inget',
});

exports.yesOrNo = yesOrNo;
exports.worstThing = worstThing;