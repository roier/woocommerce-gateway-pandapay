var algoliaApiKey = null,
    algoliaApplicationId = null,
    destinationEIN = null, destinationEINDescription = null;

var disableEIN = function() {
  destinationEIN.attr('disabled','disabled');
  destinationEINDescription.hide();
}

var enableEIN = function() {
  destinationEIN.removeAttr('disabled');
  destinationEINDescription.show();
}

var request = function(url, type, headers) {
  var xhr = new XMLHttpRequest();
  headers = headers || [];
  type = type || 'GET';
  return new Promise(function(resolve, reject) {
    xhr.open(type, url);
    headers.forEach(function(header) {
      xhr.setRequestHeader(header.name, header.value);
    });
    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };
    xhr.send();
  });
}

var checkDestinationEIN = function() {
  disableEIN();
  destinationEINDescription.text('Checking...');
  if (destinationEIN.val()) {
    var destination_ein = destinationEIN.val();
    if (destination_ein.match(/\d{2}\-\d{7}/)) {
      if (algoliaApiKey.val() && algoliaApplicationId.val()) {
        var url = "https://"+algoliaApplicationId.val()+"-dsn.algolia.net/1/indexes/PandaSearch/?query="+destination_ein;
        request(url, 'GET', [
          {name: 'X-Algolia-API-Key', value: algoliaApiKey.val()},
          {name: 'X-Algolia-Application-Id', value: algoliaApplicationId.val()}
        ])
        .then(function(response) {
          if (response.nbHits > 0) {
            if (response.hits.length > 0) {
              destinationEINDescription.text('EIN valid ('+response.hits[0].name+').');
            } else {
              destinationEINDescription.text('EIN valid.');
            }
          } else {
            destinationEINDescription.text('EIN not valid.');
          }
          enableEIN();
        });
      } else {
        console.error('There\'s no Algolia API Key or Algolia Application ID.');
      }
    } else {
      console.log('Destination EIN doesn\'t have the correct format.');
    }
  } else {
    console.log('There\'s no Destination EIN');
  }
}

var toggleDestinationEIN = function() {
  if (algoliaApiKey.val() && algoliaApplicationId.val()) {
    enableEIN();
  } else {
    disableEIN();
  }
}

jQuery( document ).ready(function() {
  var form = jQuery('#mainform');

  algoliaApiKey = jQuery('#woocommerce_pandapay_algolia_api_key');
  algoliaApplicationId = jQuery('#woocommerce_pandapay_algolia_application_id');
  destinationEIN = jQuery('#woocommerce_pandapay_destination_ein');
  destinationEINDescription = jQuery('<p class="description"></p>');
  destinationEIN.after(destinationEINDescription);

  checkDestinationEIN();
  form.on('input validate change', '#woocommerce_pandapay_destination_ein', checkDestinationEIN);
  form.on('input validate change', '#woocommerce_pandapay_algolia_api_key, #woocommerce_pandapay_algolia_application_id', toggleDestinationEIN);

});
