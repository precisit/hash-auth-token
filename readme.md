# Generate and verify authorization tokens

Simple node module to generate secure hash tokens containing user data. Useful in HTTP requests over https. 

## Generate token

Generate will create a new token, default is 1 hour expire time.

	var hashAuthToken = require('hash-auth-token')('super-secret-random-string');

	var token = hashAuthToken.generate({username: 'hello'}, 3600);

## Verify token

Verify token. Method will return the user object, or throw error if signature does not match, or token is expired. 

	var hashAuthToken = require('hash-auth-token')('super-secret-random-string');

	var userObj = hashAuthToken.verify('Some token');
