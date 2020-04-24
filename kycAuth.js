<button id="trust_id_auth">Verify via TrustID</button> 
  <script>

  var auth_button = document.getElementById(trust_id_auth);
  var auth_params = {
    license_id:        'XXXXX-XXXXX-XXXXX-XXXXX', // place your business license here
    scope:         {biometrics: ["given_name","nationality","gender","document_number"], version: 1},
    callback_url:  'https://example.com/callback/' // place callback url here
  };

  auth_button.addEventListener('click', function() {
      kycAuth(auth_params);
  }, false);

  function kycAuth(options) {
	
    var dynamic_link = 'https://trustid.page.link/?link=https://trust-id.co/resolve/'
            + '&license_id=' + encodeURIComponent(options.bot_id)
            + '&scope=' + encodeURIComponent(packScope(options.scope))


            + '&apn=com.gatepay.trustid&efr=1&ibi=com.gatepay.trustid&isi=MV47TP9PRQ'
    
    openDeepLink(dynamic_link);
  }
    
  function openDeepLink(url) {
	  
    var is_ios       = /ios|iphone os|iphone|ipod|ipad/i.test(UA);
    var is_firefox   = /firefox/i.test(UA);
    var use_iframe   = (is_ios || is_firefox);
    var use_once     = (!is_ios && is_firefox);
    var timeOpen;
    var ttNeedHide   = false;
    var pageShown    = true;
    var onPageHide   = function() {
      pageShown = false;
    };

    if (use_iframe) {
      var iframeEl = document.createElement('iframe');
      iframeEl.style.position = 'absolute';
      iframeEl.style.left = '-10000px';
      iframeEl.style.top = '-10000px';
      document.body.appendChild(iframeEl);
      if (iframeEl !== null) {
        timeOpen = +(new Date);
        iframeEl.src = url;
      }
      if (!use_once) {
        setTimeout(function() {
          if (pageShown) {
            timeOpen = +(new Date);
            window.location = url;
          }
        }, 2000);
      }
    }
	
    else {
      setTimeout(function() {
        timeOpen = +(new Date);
        window.location = url;
      }, 100);
    }
	
  }

function packScope(scope) {
    if (scope.data) {
      scope.d = scope.data;
      delete scope.data;
    }
    if (!scope.d) {
      throw new Error('scope data is required');
    }
    if (!scope.v) {
      throw new Error('scope version is required');
    }
    for (var i = 0; i < scope.d.length; i++) {
      scope.d[i] = packScopeField(scope.d[i]);
    }
    return JSON.stringify(scope);
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

  </script>
