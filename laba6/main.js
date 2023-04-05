$(document).ready(function () {
    $('button:first').click(function () {
      $("p.p2, p.p4, p.p6").fadeToggle(3000);
      $('*[id*=1]:visible').css('border', '3px solid #F1E9E3');
    });
  
    $('button:last').click(function () {
      $('#firstButton').fadeToggle(3000);
      $('p:contains(Aristotle)').text((i, t) => t.replace('Aristotle', 'Plato'));
      $("p.p1, p.p3, p.p5").append("<input type=\"text\" id=\"idNEW\" />");
    });
  });