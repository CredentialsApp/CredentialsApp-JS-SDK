<button id="trust_id_auth">Verify via TrustID</button> 
  <script>

  var auth_button = document.getElementById(trust_id_auth);
  var auth_params = {
    license_id:        XXXXXX, // place your business license here
    scope:         {data: [{"one_of":["of_age","given_name","address"],selfie:true}], version: 1},
    callback_url:  'https://example.com/callback/' // place callback url here
  };
  auth_button.addEventListener('click', function() {
      kycAuth(auth_params);
  }, false);

  function kycAuth(options) {
	
    var is_android = /android/i.test(UA);
    var url = (is_android ? 'trustid:' : 'trustid://') + 'resolve?domain=kycVerification'
            + '&license_id=' + encodeURIComponent(options.bot_id)
            + '&scope=' + encodeURIComponent(packScope(options.scope))
    if (options.callback_url) {
      url += '&callback_url=' + encodeURIComponent(options.callback_url);
    }
    openDeepLink(url);
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

  </script>
