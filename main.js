const readline = require("readline");
const { quicksort } = require("./quicksort");

// Crear interfaz de lectura
const rdln = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función para verificar la validez de las coordenadas
const ValidCoord = (lat, lon) => {
  if (
    /[^0-9.\-]/.test(lat) ||
    /[^0-9.\-]/.test(lon) ||
    lat.includes(",") ||
    lon.includes(",")
  ) {
    return false;
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  return (
    !isNaN(latNum) &&
    !isNaN(lonNum) &&
    latNum >= -90 &&
    latNum <= 90 &&
    lonNum >= -180 &&
    lonNum <= 180
  );
};

// Función para solicitar la latitud y la longitud
const askCoordinates = (point, callback) => {
  let lat, lon;

  const Lat = () => {
    rdln.question(`Ingrese la latitud para el punto ${point}: `, (inputLat) => {
      if (ValidCoord(inputLat, "0")) {
        lat = inputLat;
        Lon();
      } else {
        console.log(
          `La latitud (${inputLat}) no es válida. Por favor, inténtelo de nuevo.`
        );
        Lat();
      }
    });
  };

  const Lon = () => {
    rdln.question(
      `Ingrese la longitud para el punto ${point}: `,
      (inputLon) => {
        if (ValidCoord(lat, inputLon)) {
          lon = inputLon;
          callback(parseFloat(lat), parseFloat(lon));
        } else {
          console.log(
            `La longitud (${inputLon}) no es válida. Por favor, inténtelo de nuevo.`
          );
          Lon();
        }
      }
    );
  };
  Lat();
};

// Función para ordenar y mostrar las coordenadas
const sortAndPrintCoordinates = (coordinates, key) => {
  const sortedAsc = quicksort([...coordinates], key);

  console.log(`Coordenadas ordenadas por ${key} (ascendente):`, sortedAsc);
};

// Función principal para obtener y validar las coordenadas
const getValidCoordinates = () => {
  let coordinates = [];

  const getCoord = () => {
    if (coordinates.length < 5) {
      askCoordinates(coordinates.length + 1, (lat, lon) => {
        coordinates.push({ lat, lon });
        getCoord();
      });
    } else {
      console.log("Coordenadas ingresadas:", coordinates);
      sortAndPrintCoordinates(coordinates, "lat");
      rdln.close();
    }
  };

  getCoord();
};

// Iniciar la solicitud de coordenadas
getValidCoordinates();
