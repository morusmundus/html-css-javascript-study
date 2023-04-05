$(document).ready(function () {
  //e.preventDefault();

  // $(document).ajaxStart(function () {
  //   $('.log').append('<p>Start!</p>');
  // });

  // $(document).ajaxSend(function () {
  //   $('.log').append('<p>Request send</p>');
  // });

  $(document).ajaxSuccess(function () {
    $('.log').append('<p>Request successfully completed</p>');
  });

  // $(document).ajaxComplete(function (evt, req, set) {
  //   $('.log').append('<p>Request is finished</p>');
  // });

  // $(document).ajaxStop(function (evt, req, set) {
  //   $('.log').append('<p>No active requests</p>');
  // });

  $(document).ajaxError(function (evt, req, set) {
    $('.log').append('<p>Error!</p>');
  });

  // $(document).bind('ajaxError', function () {
  //   $('.log').append('<div class="error">Error was made!</div>');
  // });


  
  //-----Запросы к .html файлам-----
  $(' #androidButton').click(() => {
    $('#android').load('html-pages/androidOS.html');
  });

  $('#badaButton').click(() => {
    $('#bada').load('html-pages/badaOS.html');
  });

  $('#iphoneButton').click(() => {
    $('#iphone').load('html-pages/iphoneOS.html');
  });

  $('#symbianButton').click(() => {
    $('#symbian').load('html-pages/symbianOS.html');
  });

  $('#resetButton').click(function () {
    window.location.reload();
  });
});


 //-----Запросы к .json файлам-----
$('#androidButton2').click(() => {
  $.getJSON('JSON/androidOS.json', function (data) {
    var items = [];
    $.each(data, function (key, value) {
      items.push(value);
    });
    $('#androidData').append('</br>');
    $('#androidData').append('<p>Developer: ' + items[0]);

    $('#androidData').append('<ul title="Written in: "> Written in:');
    items[1].forEach((item, i, arr) => {
      $('#androidData').append('<li>' + item + '</li>');
    });
    $('#androidData').append('</ul>');

    $('#androidData').append('Working state: ' + items[2] + '</p>');

  });
});

$('#badaButton2').click(() => {
  $.getJSON('JSON/badaOS.json', function (data) {
    var items = [];
    $.each(data, function (key, value) {
      items.push(value);
    });
    $('#badaData').append('</br>');
    $('#badaData').append('<p>Developer: ' + items[0]);
    $('#badaData').append('Written in: ' + items[1]);
    $('#badaData').append('Working state: ' + items[2] + '</p>');
  });
});

$('#symbianButton2').click(() => {
  $.getJSON('JSON/symbianOS.json', function (data) {
    var items = [];
    $.each(data, function (key, value) {
      items.push(value);
    });
    $('#symbianData').append('</br>');
    $('#symbianData').append('<ul title="Developer: "> Developer:');
    items[0].forEach((item, i, arr) => {
      $('#symbianData').append('<li>' + item + '</li>');
    });
    $('#symbianData').append('</ul>');
    $('#symbianData').append('<p>Written in: ' + items[1]);
    $('#symbianData').append('Working state: ' + items[2] + '</p>');
  });
});

$('#iphoneButton2').click(() => {
  $.getJSON('JSON/iphoneOS.json', function (data) {
    var items = [];
    $.each(data, function (key, value) {
      items.push(value);
    });
    $('#iphoneData').append('</br>');
    $('#iphoneData').append('<p>Developer: ' + items[0] );
    $('#iphoneData').append('Written in:');
    items[1].forEach((item, i, arr) => {
      $('#iphoneData').append('<li>' + item + '</li>');
    });
    $('#iphoneData').append('</ul>');

    $('#iphoneData').append('Working state: ' + items[2] + '</p>');
  });
});
 

