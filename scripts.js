$(document).ready(function() {
  var form = $('form'),
      button = form.find('input[type=submit]');

  form.submit(submitCallback);

  function submitCallback(e) {
    e.preventDefault();

    button.addClass('disabled');
    button.text('Enviando...');
  }

  function successCallback() {
    button.addClass('success').removeClass('disabled');
    button.text('Email enviado!');
  }
});
