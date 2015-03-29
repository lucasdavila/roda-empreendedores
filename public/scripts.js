$(document).ready(function() {

  setupForm();
  setupTestemonials();

  function setupForm() {
    var form = $('form'),
        button = form.find('input[type=submit]');

    form.submit(submitCallback);
  }

  function submitCallback(e) {
    e.preventDefault();

    button.addClass('disabled');
    button.text('Enviando...');
  }

  function successCallback() {
    button.addClass('success').removeClass('disabled');
    button.text('Email enviado!');
  }

  function setupTestemonials() {
    var previousArrow = $('.testimonials .left.arrow'),
        nextArrow = $('.testimonials .right.arrow');

    nextArrow.on('click', showNextTestemonial);
  }

  function showNextTestemonial() {
    var _currentTestemonial = currentTestemonial(),
        _nextTestemonial = nextTestemonial(),
        currentPersonName = _currentTestemonial.attr('data-person-name'),
        nextPersonName = _nextTestemonial.attr('data-person-name'),
        currentPerson = personByName(currentPersonName),
        nextPerson = personByName(nextPersonName);

        _currentTestemonial.addClass('hidden');
        _nextTestemonial.removeClass('hidden');

        currentPerson.addClass('hidden');
        nextPerson.removeClass('hidden');
  }

  function currentTestemonial() {
    return $('.testemonials .testemonial:not(.hidden)');
  }

  function nextTestemonial() {
    var _currentTestemonial = currentTestemonial(),
        _nextTestemonial = _currentTestemonial.next();

    if (_nextTestemonial.length === 0) {
      var firstTestemonial = _currentTestemonial.parent().children().first();
      _nextTestemonial = firstTestemonial;
    }

    return _nextTestemonial;
  }

  function personByName(name) {
    return $('.testimonials .people .person[data-name=' + name + ']');
  }
});
