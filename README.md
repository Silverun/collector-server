Server collector

For production:

- Change access token lifetime to 5 min
- Check env files and config files
- Check cookie options (secure same site etc)
- Check refresh token options in model user
- Check refresh token default value of "none" in userController
- Check with credentials - true for cookies with every request on axios config
- Check where we need to REFRESH access token manually with /refresh. By default its only on login.
- Db gets new refresh token only on login now and not

FRONTEND:

- Add validation to create collection form
