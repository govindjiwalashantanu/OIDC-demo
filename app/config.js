angular
.module("WidgetConfig", [])
.constant("CONFIG", {
    options : {
	      baseUrl: "https://shantanu.okta.com",
        clientId: "0oa360fz6nuqAqcLY1t7",
        redirectUri: "https://demo-oidc.herokuapp.com",
        features: {
            rememberMe: true,
            smsRecovery: true,
            selfServiceUnlock: true,
            multiOptionalFactorEnroll: true
          },
        logo: 'images/LOGO.png',
  	    authScheme: "OAUTH2",
  	    authParams: {
                display:"pop",
    	      responseType: ["id_token", "token"],
    	      responseMode: "okta_post_message",
    	      scopes : [
      		      "openid",
      		      "email",
      		      "profile",
      		      "address",
      		      "phone"
    	      ]
  	    }
    }
});