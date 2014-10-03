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

var roles = Object.freeze({
    patient: 0,
    doctor: 1,
    admin: 2
});





exports.roles = roles;
exports.yesOrNo = yesOrNo;
exports.worstThing = worstThing;