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
    previousArrow.on('click', showPreviousTestemonial);
  }

  function showNextTestemonial() {
    showTestemonial(nextTestemonial());
  }

  function showPreviousTestemonial() {
    showTestemonial(previousTestemonial());
  }

  function showTestemonial(newTestemonial) {
    var _currentTestemonial = currentTestemonial(),
        currentPersonName = _currentTestemonial.attr('data-person-name'),
        newPersonName = newTestemonial.attr('data-person-name'),
        currentPerson = personByName(currentPersonName),
        newPerson = personByName(newPersonName);

    _currentTestemonial.addClass('hidden');
    newTestemonial.removeClass('hidden');

    currentPerson.addClass('hidden');
    newPerson.removeClass('hidden');
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

  function previousTestemonial() {
    var _currentTestemonial = currentTestemonial(),
        _previousTestemonial = _currentTestemonial.prev();

    if (_previousTestemonial.length === 0) {
      var lastTestemonial = _currentTestemonial.parent().children().last();
      _previousTestemonial = lastTestemonial;
    }

    return _previousTestemonial;
  }

  function personByName(name) {
    return $('.testimonials .people .person[data-name=' + name + ']');
  }
});
