function get4LetterYear(twoLetterYear) {
  var firstTwoDigits = parseInt(new Date().getFullYear().toString().substring(0, 2));
  return parseInt(firstTwoDigits.toString() + twoLetterYear.toString());
}


jQuery( document ).ready(function() {
  var initialized = false;
  // var place_order = jQuery('#place_order');
  // place_order.on('click', function() {
  //   console.log('place_order click');
  // });

  // place_order.after(jQuery(place_order).clone());
  var form = jQuery('form.checkout');

  // form.on('submit', function(e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log('form.checkout submit', e);
  //
  //
  //   Panda.init('pk_test_E9RJ8dLcZeqHynfUkmHrvQ', 'panda_cc_form');
  //   Panda.on('success', function(cardToken) {
  //     console.log(cardToken);
  //   });
  //
  //   Panda.on('error', function(errors) {
  //     console.log(errors);
  //   });
  //   panda_form.submit();
  // });

  var panda_form = jQuery('<form id="panda_cc_form">' +
    '<input type="text" data-panda="first_name" value="'+jQuery('#billing_first_name').val()+'">' +
    '<input type="text" data-panda="last_name" value="'+jQuery('#billing_last_name').val()+'">' +
    '<input type="text" data-panda="credit_card" value="'+jQuery('#pandapay-card-number').val()+'">' +
    '<input type="text" data-panda="expiration" value="'+jQuery('#pandapay-card-expiry').val()+'">' +
    '<input type="text" data-panda="cvv" value="'+jQuery('#pandapay-card-cvc').val()+'">' +
    '<button type="submit">Tokenize!</button>' +
    '</form>');
  jQuery('body').append(panda_form);

  form.on( 'input validate change', 'input', function() {
    if (!initialized) {
      initialized = Panda.init('pk_test_E9RJ8dLcZeqHynfUkmHrvQ', 'panda_cc_form');
    }
    jQuery('[data-panda="first_name"]').val(jQuery('#billing_first_name').val());
    jQuery('[data-panda="last_name"]').val(jQuery('#billing_last_name').val());
    jQuery('[data-panda="credit_card"]').val(jQuery('#pandapay-card-number').val());
    jQuery('[data-panda="expiration"]').val(jQuery('#pandapay-card-expiry').val());
    jQuery('[data-panda="cvv"]').val(jQuery('#pandapay-card-cvc').val());
  });

  panda_form.on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('panda_form submit', e);
  });

  // setTimeout(function() {
  //   var panda_init_2 = Panda.init('pk_test_E9RJ8dLcZeqHynfUkmHrvQ', 'panda_cc_form');
  //   console.log('Panda.init #2', panda_init_2, jQuery('#panda_cc_form'));
  // }, 5000);
  //
  // var panda_init = Panda.init('pk_test_E9RJ8dLcZeqHynfUkmHrvQ', 'panda_cc_form');
  // console.log('panda_init', panda_init, jQuery('#panda_cc_form'));
  // console.log('panda_cc_form', jQuery('#panda_cc_form'));
  Panda.on('success', function(cardToken) {
    console.log('success');
    console.log(cardToken);
  });

  Panda.on('error', function(errors) {
    console.log('error');
    console.log(errors);
  });

  // }, 100);

  // panda_form.submit();

  // jQuery('#billing_first_name').change(function() {
  //   console.log('#billing_first_name has changed');
  //   jQuery('[data-panda="first_name"]').val(jQuery('#billing_first_name').val());
  // });
  // jQuery('#billing_last_name').change(function() {
  //   console.log('#billing_last_name has changed');
  //   jQuery('[data-panda="last_name"]').val(jQuery('#billing_last_name').val());
  // });
  // jQuery('#pandapay-card-number').change(function() {
  //   console.log('#pandapay-card-number has changed');
  //   jQuery('[data-panda="credit_card"]').val(jQuery('#pandapay-card-number').val());
  // });
  // jQuery('#pandapay-card-expiry').change(function() {
  //   console.log('#pandapay-card-expiry has changed');
  //   jQuery('[data-panda="expiration"]').val(jQuery('#pandapay-card-expiry').val());
  // });
  // jQuery('#pandapay-card-cvc').change(function() {
  //   console.log('#pandapay-card-cvc has changed');
  //   jQuery('[data-panda="cvv"]').val(jQuery('#pandapay-card-cvc').val());
  // });

  console.log( "ready!" );

  //
  // form.attr('id', 'panda_cc_form');
  // jQuery('#billing_first_name').attr('data-panda','first_name');
  // jQuery('#billing_last_name').attr('data-panda','last_name');
  // jQuery('#pandapay-card-number').attr('data-panda','credit_card');
  // jQuery('#pandapay-card-expiry').attr('data-panda','expiration');
  // jQuery('#pandapay-card-cvc').attr('data-panda','cvv');
  // console.log( "ready!" );
  // Panda.init('pk_test_E9RJ8dLcZeqHynfUkmHrvQ', 'panda_cc_form');
  // Panda.on('success', function(cardToken) {
  //   console.log(cardToken);
  // });
  //
  // Panda.on('error', function(errors) {
  //   console.log(errors);
  // });
});
