angular
.module("WidgetConfig", [])
.constant("CONFIG", {
    options : {
	      baseUrl: "https://shantanu.okta.com",
        clientId: "0oa360fz6nuqAqcLY1t7",
        redirectUri: "http://localhost:3000",
        features: {
            rememberMe: true,
            smsRecovery: true,
            selfServiceUnlock: true,
            multiOptionalFactorEnroll: true
          },
        logo: 'images/LOGO.png',
  	    authScheme: "OAUTH2",
  	    authParams: {
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