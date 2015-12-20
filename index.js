var assert = require('assert-plus');
var crypto = require('crypto');

var hashAuthToken = function(sharedSecret) {
	assert.string(sharedSecret, 'sharedSecret');
	this.sharedSecret = sharedSecret;
}

hashAuthToken.prototype.generate = function(userObj, validS) {
	assert.object(userObj, 'userObj');
	validS = validS || '3600';
	userObj.validTo = Date.now() + validS*1000;
	var userObjJSON = new Buffer(JSON.stringify(userObj));
	var signature = crypto.createHmac('sha256', this.sharedSecret).update(userObjJSON).digest('base64');
	return userObjJSON.toString('base64')+':'+signature;
}

hashAuthToken.prototype.verify = function(token) {
	assert.string(token, 'token');
	var parts = token.split(':');

	var userObjJSON = new Buffer(parts[0], 'base64').toString('ascii');
	var signature = parts[1];
	var checkSignature = crypto.createHmac('sha256', this.sharedSecret).update(userObjJSON).digest('base64');

	if(signature == checkSignature) {
		var userObj = JSON.parse(userObjJSON);
		if(Date.now() < userObj.validTo) {
			return userObj;
		}
		else {
			throw new Error('Token expired');
		}
	}
	else {
		throw new Error('Signature incorrect');
	}
}

module.exports = function(sharedSecret) {
	return new hashAuthToken(sharedSecret);
};
