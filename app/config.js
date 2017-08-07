// angular
// .module("WidgetConfig", [])
// .constant("CONFIG", {
//     options : {
// 	      baseUrl: "https://shantanu.okta.com",
//         clientId: "0oa360fz6nuqAqcLY1t7",
//         redirectUri: "https://demo-oidc.herokuapp.com",
//         features: {
//             rememberMe: true,
//             smsRecovery: true,
//             selfServiceUnlock: true,
//             multiOptionalFactorEnroll: true
//           },
//         logo: 'images/LOGO.png',
//   	    authScheme: "OAUTH2",
//   	    authParams: {
//     	      responseType: ["id_token", "token"],
//     	      responseMode: "okta_post_message",
//     	      scopes : [
//       		      "openid",
//       		      "email",
//       		      "profile",
//       		      "address",
//       		      "phone"
//     	      ]
//   	    },
//         idps: [
//           {
//             type: 'FACEBOOK',
//             id: '0oa374zfljip7G3uR1t7'
//           }
//         ]
//     }
// });



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
            issuer : "https://shantanu.okta.com/oauth2/aus3ak3ftuFimxJCt1t7",
            authorizeUrl : "https://shantanu.okta.com/oauth2/aus3ak3ftuFimxJCt1t7/v1/authorize",
            display : "popup",
            responseType: ["id_token", "token"],
            responseMode: "okta_post_message",
            scopes : [
                "openid",
                "email",
                "profile",
                "address",
                "phone",
                "admin"
            ]
        },
        idps: [
          {
            type: 'FACEBOOK',
            id: '0oa374zfljip7G3uR1t7'
          }
        ]
    }
});