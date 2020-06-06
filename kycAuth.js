<button id="trust_id_auth">Verify via TrustID</button> 
  <script>

  var auth_button = document.getElementById("trust_id_auth");

  var auth_params = {
    license_key:   'XXXXX-XXXXX-XXXXX-XXXXX', // place your business license here
    scope:         {biometrics: ["given_name","nationality","gender","document_number"], version: 1},
    signing_hash:  generateRandomHash(64),
    callback_url:  'https://example.com/callback/' // place callback url here
  };

  auth_button.addEventListener('click', function() {
      authReq(auth_params);
  }, false);

  function authReq(options) {
	
    var dynamic_link = 'https://credentials.page.link/?link=https://credentials.app/resolve/'
    
            + stringToHex('?license_key=' + options.license_key)
            + stringToHex('&scope=' + options.scope.biometrics)
            + stringToHex('&signing_hash=' + options.signing_hash)
            + stringToHex('&callback_url=' + options.callback_url)

            + '&apn=com.gatepay.trustid&efr=1&ibi=com.gatepay.trustid&isi=MV47TP9PRQ'
    
    window.location = dynamic_link;
  }

function stringToHex (tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;
 
    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += c.toString(16);
    }
    return str;
}

function generateRandomHash(length) {
   var result           = '';
   var characters       = 'abcdef0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  </script>
