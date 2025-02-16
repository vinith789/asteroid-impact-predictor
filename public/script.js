document.getElementById("fetchData").addEventListener("click", async () => {
  try {
      const response = await fetch("http://localhost:5000/asteroids");
      const data = await response.json();
      const nearObjects = data.near_earth_objects;
      let output = "";

      for (const date in nearObjects) {
          nearObjects[date].forEach(asteroid => {
              const nasaLink = asteroid.nasa_jpl_url || "#";

              // Check if the asteroid is hazardous
              const isHazardous = asteroid.is_potentially_hazardous_asteroid
                  ? '<span class="dangerous">⚠️ Yes (Potentially Dangerous)</span>'
                  : '<span class="safe">✅ No (Safe)</span>';

              // Get diameter range
              const diameterMin = asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(2);
              const diameterMax = asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2);

              output += `
                  <div class="asteroid-card">
                      <h3>${asteroid.name}</h3>
                      <p><strong>Size:</strong> ${diameterMin} - ${diameterMax} meters</p>
                      <p><strong>Speed:</strong> ${parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
                      <p><strong>Distance:</strong> ${parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(2)} km</p>
                      <p><strong>Orbiting:</strong> ${asteroid.close_approach_data[0].orbiting_body}</p>
                      <p><strong>Closest Approach:</strong> ${asteroid.close_approach_data[0].close_approach_date_full}</p>
                      <p><strong>Absolute Magnitude (Hₒ):</strong> ${asteroid.absolute_magnitude_h}</p>
                      <p><strong>Potentially Hazardous:</strong> ${isHazardous}</p>
                      <a href="${nasaLink}" target="_blank">More Info</a>
                  </div>
              `;
          });
      }

      document.getElementById("results").innerHTML = output;
  } catch (error) {
      console.error("Error fetching asteroid data", error);
  }
});