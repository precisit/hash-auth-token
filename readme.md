# Generate and verify authorization tokens

Simple node module to generate secure hash tokens containing user data. Useful in HTTP requests over https. 

## Generate token

Generate will create a new ticket, default is 1 hour expire time.

	var hashAuthToken = require('hash-auth-token')('super-secret-random-string');

	var token = hashAuthToken.generate({username: 'hello'}, 3600);

## Verify token

Verify will return the user object, or throw error if signature does not match, or token is expired. 

	var hashAuthToken = require('hash-auth-token')('super-secret-random-string');

	var token = hashAuthToken.verify('Some token');
