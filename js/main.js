(function () {
  var CONFS = [];
  var map;
  var $confsList = $('.confs-list');

  init();
  getData();

  function init () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 3
    });
  }

  function getData () {
    $.ajax({
      url: 'confs.json'
    }).done(function (data) {
      onData(data);
    })
  }

  function onData (confs) {
    createList(confs);
    plotConfs(confs);
    bindEvents();

    map.setCenter({lat: confs[0].lat, lng: confs[0].lng});
  }

  function createList (confs) {
    var template = ''

    confs.forEach(function (conf) {
      template += buildItemTemplate(conf);
    });

    $confsList.html(template);
  }

  function buildItemTemplate (conf) {
    var template = '<li>' + 
      '<div><a href="' + conf.link + '">' + conf.name + '</a></div>' +
      '<div>' + conf.dates[0] + '</div>' + 
      '<div class="address">' + conf.city + ', ' + conf.country + '</div>' + 
      '<div class="text-center">' + 
        '<button data-lat="' + conf.lat + '" data-lng="' + conf.lng + '" class="center-button">Center Map</button>' + 
      '</div>' + 
    '</li>';

    return template;
  }

  function plotConfs (confs) {
    var marker;

    confs.forEach(function (conf) {
      marker = new google.maps.Marker({
        position: {lat: conf.lat, lng: conf.lng},
        map: map
      })
    });
  }

  function centerMap (lat, lng) {
    map.setCenter({lat: lat, lng: lng});
  }

  function bindEvents () {
    var data;

    $confsList.on('click', function (ev) {
      if (ev.target.tagName == 'BUTTON') {
        data = $(ev.target).data();
        centerMap(data.lat, data.lng);
      }
    });
  }

})();
