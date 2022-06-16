https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

{
"localId": "ZY1rJK0eYLg...",
"email": "[user@example.com]",
"displayName": "",
"idToken": "[ID_TOKEN]",
"registered": true,
"refreshToken": "[REFRESH_TOKEN]",
"expiresIn": "3600"
}

1. User should logout when he manually logged out.
2. Then stored Token and expiration time should be cleared.

3. When user logged in token and expirationTime should stored in the localstorage.
4. When user refreshed the browser login state should not change.
5. User should not able to render(enter url directly on browser) protected pages if not logged in.
6. User should automatically logged out after the expiration time. expiration time is in the token and it is setted 
   in code