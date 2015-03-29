$(document).ready(function() {

  setupForm();
  setupTestimonials();

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
