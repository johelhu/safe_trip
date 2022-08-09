let map;
let marker;
let marker2;
function initMap() {
    const crCoords = { lat: 9.748917, lng: -83.753428 };
    map = new google.maps.Map(mapDiv,{
        zoom: 8,
        center: crCoords,
    });
    marker = new google.maps.Marker({
        position: { lat: 9.748917, lng: -83.753428 },
        map,
    });
    const image = {
        url: "https://i.pinimg.com/originals/df/21/12/df211265dd0dbd0d39221a8cb57a40a0.png",
        size: new google.maps.Size(120, 140),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12),
        scaledSize: new google.maps.Size(25, 25),
      };
    
    marker2 = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map,
        icon: image,
    });
    const autocomplete = new google.maps.places.Autocomplete(place_input, {
        // strictBounds: true, 
    });
    //autocomplete.bindTe("bounds", map);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const {geometry} = place;
        const {viewport, location} = geometry;

        map.setCenter(location);
        map.setZoom(10);
       
        marker.setPosition(location);
        //map.finBounds(viewport);
    });
    button.addEventListener("click",() =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                ({coords: {latitude, longitude}}) => {
                    const coords = {
                        lat: latitude,
                        lng: longitude,
                    };
                    map.setCenter(coords);
                    map.setZoom(10);
                    marker.setPosition(coords);
            },
             () =>{
                alert("Ocurrio un error")
            })
        } else {
            alert("Tu navegador no dispone de la geolocalizcion");
        }
    });

      const flightPath = new google.maps.Polyline({
        path: shape.map(c => { return {lat: c[0], lng: c[1]} }),
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
    
      flightPath.setMap(map);
    //console.log(shape);     




};