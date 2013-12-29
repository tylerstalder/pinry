/*global document, clearInterval */

/**
 * Bookmarklet for Pinry
 * Descrip: This is trying to be as standalone a script as possible hence
 *          why it has built in helpers and such when the rest of the
 *          scripts make use of helpers.js. In the future i want to remove
 *          all dependencies on jQuery.
 * Authors: Pinry Contributors
 * Updated: Mar 4th, 2013
 * Require: None (dynamically loads jQuery if needed)
 */

(function() {
  var container = document.createElement('div');

  // Start Helper Functions
  function getFormUrl() {
    var hostUrl = document.getElementById('pinry-bookmarklet').src.split('/')[2];
    var formUrl = '/pins/pin-form/?pin-image-url=';
    return 'http://'+hostUrl+formUrl;
  }

  function getSourceUrl() {
    var sourceUrl = window.location.href;
    return '&pin-source-url=' + sourceUrl;
  }

  function normalizeImageUrl(imageUrl) {
    var protocol = imageUrl.split(':')[0];
    if (protocol != 'http' && protocol != 'https') {
      if (imageUrl[1] != '/')
        imageUrl = 'http://'+window.location.host+imageUrl;
    }
    return imageUrl;
  }
  // End Helper Functions


  // Start View Functions
  function pageView() {
    var pinryImages = container;
    pinryImages.id = 'pinry-images';

    pinryImages.style.position = 'absolute';
    pinryImages.style.zindex = '9001';
    pinryImages.style.background = 'rgba(0, 0, 0, 0.7)';
    pinryImages.style.paddingTop = '70px';
    pinryImages.style.top = '0';
    pinryImages.style.left = '0';
    pinryImages.style.right = '0';
    pinryImages.style.height = document.body.clientHeight;
    pinryImages.style.textAlign = 'center';
    pinryImages.style.width = '100%';

    var pinryBar = document.createElement('div');
    pinryBar.id = 'pinry-bar';
    pinryBar.innerHTML = 'Pinry Bookmarklet';

    pinryBar.style.background = 'black';
    pinryBar.style.padding = '15px';
    pinryBar.style.position = 'absolute';
    pinryBar.style.zindex = '9002';
    pinryBar.style.width = '100%';
    pinryBar.style.top = '0';
    pinryBar.style.borderBottom = '1px solid #555';
    pinryBar.style.color = 'white';
    pinryBar.style.textAlign = 'center';
    pinryBar.style.fontSize = '22px';

    pinryImages.appendChild(pinryBar);
    document.body.appendChild(pinryImages);
    window.scrollTop = 0;
  }

  function imageView(imageUrl) {
    // Requires that pageView has been created already
    imageUrl = normalizeImageUrl(imageUrl);
    var image = document.createElement('div');

    image.style.backgroundImage = 'url(' + imageUrl + ')';
    image.style.backgroundPosition = 'center center';
    image.style.backgroundRepeat = 'no-repeat';
    image.style.backgroundSize = '200px 200px';
    image.style.display = 'inline-block';
    image.style.margin = '15px';
    image.style.cursor = 'pointer';
    image.style.border = '1px solid #555';
    image.style.width = '200px';
    image.style.height = '200px';

    image.addEventListener('click', function() {
      var popUrl = getFormUrl()+imageUrl+getSourceUrl();
      window.open(popUrl);
      document.body.removeChild(container);
    }, false);

    container.appendChild(image);
  }
  // End View Functions


  // Start Active Functions
  function addAllImagesToPageView() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
      var el = images[i];
      var style = window.getComputedStyle(el, null);
      var width = style.getPropertyValue("height").replace('px','');
      var height = style.getPropertyValue("height").replace('px','');

      if (width > 200 && height > 200) {
        imageView(el.src);
      }
    }
    return images;
  }
  // End Active Functions


  // Start Init
  pageView(); // Build page before we insert images
  addAllImagesToPageView(); // Add all images on page to our new pageView
  // End Init

})();
