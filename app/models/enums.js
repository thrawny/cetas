/**
 * New node file
 */
"use strict";

var Enum = require('enum');

var yesOrNo = new Enum({
	'yes' : 'Yes',
	'no' : 'No'
});

var pain = new Enum({
	'1' : 'Ingen smärta',
	'2' : 'Neutral',
	'3' : 'Värsta tänkbara'
});

var nausea = new Enum({
	'1' : 'Inget',
	'2' : 'Netrul',
	'3' : 'Flertal kräkningar'
});

var narcosis = new Enum({
	'1' : 'Inte alls på verkad',
	'2' : 'Neutral',
	'3' : 'Kraftigt påverkad'
});