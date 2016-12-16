
/**
* Converts Unix time (in ms since Jan 1 1970 UTC) to a
* string in the local time zone.
*/

export function unixTimeToString(time)
{
  return new Date(time).toLocaleString();
}


export function createMapURL(lat, long)
{
  var res = "http://maps.googleapis.com/maps/api/staticmap?center=";
  res = res + lat + "+";
  res = res + long;
  res = res + "&zoom=13&scale=1&size=200x200&maptype=roadmap&key=AIzaSyDGuGiLXDNcw84JU6I7ldZF63sxBLP6z7s&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C";
  res = res + lat + "," + long;
  res = res + " alt=\"Google Map of ";
  res = res + lat + "," + long;
  // for multiple markers in the future we can loop over this
  res = res + "&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C" + lat + ",+" + long;
  return res;
}
/**
 * If shouldHide is true, returns a CSS class that hides the element.
 */
export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}


export function initMapReact(google, mapElement, coord_list) 
{
  var amherst = {lat: 42.3732,lng: 72.5199};
  
  var map = new google.maps.Map(mapElement, {
    zoom: 4,
    center: amherst
  });
  var infowindow = new google.maps.InfoWindow({
    content: "Placeholder text..."
  });
  for (var p in coord_list)
  {
    var temp = {lat: coord_list[p].lat,lng: coord_list[p].long};

    var marker = new google.maps.Marker({
      position: temp,
      map: map,
      title: coord_list[p].postText,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function (e) {
      infowindow.setContent(this.title);
      infowindow.open(map, this);
    });
    
    marker.setMap(map);
    map.panTo(marker.getPosition());
  }
  map.setZoom(7); 
}
