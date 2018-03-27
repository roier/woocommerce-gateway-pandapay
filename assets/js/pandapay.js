var pandaCardToken = '',
    pandaForm = null;

function get4LetterYear(twoLetterYear) {
  var firstTwoDigits = parseInt(new Date().getFullYear().toString().substring(0, 2));
  return parseInt(firstTwoDigits.toString() + twoLetterYear.toString());
}

var validPandaFields = function() {
  return (jQuery('#billing_first_name').val().length >= 0
  && jQuery('#billing_last_name').val().length >= 0
  && jQuery('#pandapay-card-number').val().length >= 16
  && jQuery('#pandapay-card-expiry').val().length >= 4
  && jQuery('#pandapay-card-cvc').val().length == 3);
}

var setToken = function() {
  if (validPandaFields()) {
    jQuery('#token-input').val(pandaCardToken);
  }
}

var updatePandaFields = function() {
  jQuery('[data-panda="first_name"]').val(jQuery('#billing_first_name').val());
  jQuery('[data-panda="last_name"]').val(jQuery('#billing_last_name').val());
  jQuery('[data-panda="credit_card"]').val(jQuery('#pandapay-card-number').val());
  jQuery('[data-panda="expiration"]').val(jQuery('#pandapay-card-expiry').val());
  jQuery('[data-panda="cvv"]').val(jQuery('#pandapay-card-cvc').val());
}

var submitPandaForm = function() {
  if (validPandaFields()) {
    jQuery('#panda-submit').click();
  }
}


jQuery( document ).ready(function() {
  var initialized = false;
  var form = jQuery('form.checkout');
  var tokenInput = jQuery('#pandapay-card-cvc').clone();

  tokenInput.attr('disabled','disabled');
  tokenInput.attr('id','token-input');

  pandaForm = jQuery('<form id="panda_cc_form" style="display:none;">' +
    '<input type="text" data-panda="first_name" value="'+jQuery('#billing_first_name').val()+'">' +
    '<input type="text" data-panda="last_name" value="'+jQuery('#billing_last_name').val()+'">' +
    '<input type="text" data-panda="credit_card" value="'+jQuery('#pandapay-card-number').val()+'">' +
    '<input type="text" data-panda="expiration" value="'+jQuery('#pandapay-card-expiry').val()+'">' +
    '<input type="text" data-panda="cvv" value="'+jQuery('#pandapay-card-cvc').val()+'">' +
    '<button id="panda-submit" type="submit">Tokenize!</button>' +
    '</form>');
  jQuery('body').append(pandaForm);

  form.on('input validate change', 'input', function() {
    if (!initialized) {
      initialized = Panda.init(wc_pandapay_params.key, 'panda_cc_form');
    }

    updatePandaFields();
    submitPandaForm();

  });

  pandaForm.on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  Panda.on('success', function(cardToken) {
    console.log('Panda success', cardToken);
    pandaCardToken = cardToken;
    setToken();
  });

  Panda.on('error', function(errors) {
    console.log('error', errors);
  });

});
