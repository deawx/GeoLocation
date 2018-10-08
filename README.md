# WORKING WITH GOOGLE MAPS

---

##### A small hackathon project which involves working with google maps API.

- First we get the current position of the user if he allowed permission, performs `Reverse Geocoding`(converts lat, lang to readable address format) on fetched latitude and longitude co-ordinates and populates the source input.
- User can able to enter his destination in provided input, then by using `directionsService` API we display the route on map.
