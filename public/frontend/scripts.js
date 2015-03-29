$(document).ready(function() {

  setupForm();
  setupTestimonials();

  function setupForm() {
    var form = $('form');

    form.submit(submitCallback);
  }

  function submitCallback(e) {
    e.preventDefault();

    var button = submitButton();

    button.attr('disabled', 'disabled').removeClass('success error');
    button.val('Enviando...');

    $.post('http://emailapi.ieducativa.com.br/email_api.php', submitData(), 'json').done(successCallback).fail(errorCallback);
  }

  function submitButton() {
    return $('form').find('input[type=submit]');
  }

  function submitData() {
    var form = $('form'),
        nameInput = form.find('input[name=name]'),
        emailInput = form.find('input[name=email]'),
        name = nameInput.val(),
        email = emailInput.val(),
        subject = '[roda-empreendedores] ' + name + ' quer se juntar a roda :)',
        message = 'Oi!\n\n' + name + ' quer se juntar a roda.\n\nemail: ' + email;

    var data = {
      'token': 'foo',
      'to' : 'lucas@lucasdavi.la',
      'subject' : subject,
      'message' : message
    };

    return data;
  }

  function successCallback(data) {
    if (! data || ! data.sent) {
      errorCallback.apply(this, arguments);
      return;
    }

    var button = submitButton();

    button.addClass('success').removeAttr('disabled').removeClass('error');
    button.val('Email enviado!');
  }

  function errorCallback() {
    var button = submitButton();

    if (console && console.log) { console.log(arguments); }

    button.addClass('error').removeAttr('disabled').removeClass('success');
    button.val(':( tente novamente!');
  }

  function setupTestimonials() {
    var previousArrow = $('.testimonials .left.arrow'),
        nextArrow = $('.testimonials .right.arrow');

    nextArrow.on('click', showNextTestimonial);
    previousArrow.on('click', showPreviousTestimonial);
  }

  function showNextTestimonial() {
    showTestimonial(nextTestimonial());
  }

  function showPreviousTestimonial() {
    showTestimonial(previousTestimonial());
  }

  function showTestimonial(newTestimonial) {
    var _currentTestimonial = currentTestimonial(),
        currentPersonName = _currentTestimonial.attr('data-person-name'),
        newPersonName = newTestimonial.attr('data-person-name'),
        currentPerson = personByName(currentPersonName),
        newPerson = personByName(newPersonName);

    _currentTestimonial.addClass('hidden');
    newTestimonial.removeClass('hidden');

    currentPerson.addClass('hidden');
    newPerson.removeClass('hidden');
  }

  function currentTestimonial() {
    return $('.testimonials .testimonial:not(.hidden)');
  }

  function nextTestimonial() {
    var _currentTestimonial = currentTestimonial(),
        _nextTestimonial = _currentTestimonial.next();

    if (_nextTestimonial.length === 0) {
      var firstTestimonial = _currentTestimonial.parent().children().first();
      _nextTestimonial = firstTestimonial;
    }

    return _nextTestimonial;
  }

  function previousTestimonial() {
    var _currentTestimonial = currentTestimonial(),
        _previousTestimonial = _currentTestimonial.prev();

    if (_previousTestimonial.length === 0) {
      var lastTestimonial = _currentTestimonial.parent().children().last();
      _previousTestimonial = lastTestimonial;
    }

    return _previousTestimonial;
  }

  function personByName(name) {
    return $('.testimonials .people .person[data-name=' + name + ']');
  }
});
