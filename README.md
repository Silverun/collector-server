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
- Reformat all incoming images to 80 px
- Check axiosPrivate instances are using useAxios hook
- Check all id on forms that are not the same
- when you delete collection u ALSO delete all items inside it
- validate delete collection

https://imagekit.io/

React Tag Autocomplete
https://github.com/i-like-robots/react-tag-autocomplete#ariaErrorMessage-optional
