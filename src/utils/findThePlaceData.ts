import type {
  AdministrativeNode,
  ContinentNode,
  Difficulty,
  PlaceNode,
} from './findThePlace'
import { flattenPlaceData } from './findThePlace'

function place(
  id: string,
  name: string,
  coordinates: PlaceNode['coordinates'],
  difficulty: Difficulty
): PlaceNode {
  return { type: 'place', id, name, coordinates, difficulty }
}

function administrative(
  name: string,
  children: AdministrativeNode['children']
): AdministrativeNode {
  return { type: 'administrative', name, children }
}

export const FIND_THE_PLACE_DATA = [
  {
    name: 'North America',
    countries: [
      {
        code: 'us',
        name: 'USA',
        children: [
          administrative('Alabama', [
            place(
              'us-birmingham-al',
              'Birmingham',
              [33.515599, -86.809657],
              'Easy'
            ),
            place(
              'us-montgomery-al',
              'Montgomery',
              [32.375167, -86.306603],
              'Easy'
            ),
            place(
              'us-huntsville-al',
              'Huntsville',
              [34.731205, -86.588984],
              'Easy'
            ),
            place('us-mobile-al', 'Mobile', [30.691762, -88.045664], 'Easy'),
            place('us-dothan-al', 'Dothan', [31.223776, -85.393537], 'Medium'),
            place(
              'us-enterprise-al',
              'Enterprise',
              [31.315353, -85.854725],
              'Medium'
            ),
            place(
              'us-tuscaloosa-al',
              'Tuscaloosa',
              [33.199907, -87.564416],
              'Medium'
            ),
            place('us-jackson-al', 'Jackson', [31.51513, -87.894543], 'Hard'),
            place('us-florence-al', 'Florence', [34.79739, -87.674024], 'Hard'),
          ]),
          administrative('Alaska', [
            place(
              'us-anchorage-ak',
              'Anchorage',
              [61.21806, -149.90028],
              'Easy'
            ),
            place(
              'us-fairbanks-ak',
              'Fairbanks',
              [64.83778, -147.71639],
              'Easy'
            ),
            place('us-juneau-ak', 'Juneau', [58.30194, -134.41972], 'Medium'),
            place('us-sitka-ak', 'Sitka', [57.05315, -135.33088], 'Medium'),
            place(
              'us-ketchikan-ak',
              'Ketchikan',
              [55.3418, -131.64757],
              'Medium'
            ),
            place('us-bethel-ak', 'Bethel', [60.79222, -161.75583], 'Hard'),
            place(
              'us-utqiagvik-ak',
              'Utqiagvik',
              [71.29058, -156.78872],
              'Hard'
            ),
          ]),
          administrative('Arizona', [
            place('us-phoenix-az', 'Phoenix', [33.448195, -112.074234], 'Easy'),
            place('us-tucson-az', 'Tucson', [32.220901, -110.979974], 'Easy'),
            place(
              'us-flagstaff-az',
              'Flagstaff',
              [35.198276, -111.65131],
              'Medium'
            ),
            place('us-page-az', 'Page', [36.914842, -111.455705], 'Medium'),
            place(
              'us-tuba-city-az',
              'Tuba City',
              [36.11936, -111.229177],
              'Medium'
            ),
            place('us-yuma-az', 'Yuma', [32.698581, -114.624658], 'Medium'),
            place('us-nogales-az', 'Nogales', [31.334869, -110.943133], 'Hard'),
            place(
              'us-st-johns-az',
              'St Johns',
              [34.506054, -109.361183],
              'Hard'
            ),
          ]),
          administrative('Arkansas', [
            place(
              'us-littlerock-ar',
              'Little Rock',
              [34.739315, -92.276996],
              'Easy'
            ),
            place(
              'us-jonesboro-ar',
              'Jonesboro',
              [35.821367, -90.702607],
              'Medium'
            ),
            place(
              'us-fort-smith-ar',
              'Fort Smith',
              [35.384171, -94.420714],
              'Medium'
            ),
            place('us-conway-ar', 'Conway', [35.091789, -92.436695], 'Medium'),
            place(
              'us-crossett-ar',
              'Crossett',
              [33.135239, -91.961589],
              'Hard'
            ),
            place(
              'us-hot-springs-ar',
              'Hot Springs',
              [34.503667, -93.055373],
              'Hard'
            ),
          ]),
          administrative('California', [
            place(
              'us-los-angeles-ca',
              'Los Angeles',
              [34.05223, -118.24368],
              'Easy'
            ),
            place(
              'us-san-diego-ca',
              'San Diego',
              [32.71571, -117.16472],
              'Easy'
            ),
            place(
              'us-san-francisco-ca',
              'San Francisco',
              [37.77493, -122.41942],
              'Medium'
            ),
            place(
              'us-sacramento-ca',
              'Sacramento',
              [38.58157, -121.4944],
              'Medium'
            ),
            place('us-fresno-ca', 'Fresno', [36.74773, -119.77237], 'Medium'),
            place('us-redding-ca', 'Redding', [40.58654, -122.39168], 'Hard'),
            place(
              'us-palm-springs-ca',
              'Palm Springs',
              [33.8303, -116.54529],
              'Hard'
            ),
          ]),
          administrative('Colorado', [
            place('us-denver-co', 'Denver', [39.73915, -104.9847], 'Easy'),
            place(
              'us-colorado-springs-co',
              'Colorado Springs',
              [38.83388, -104.82136],
              'Easy'
            ),
            place(
              'us-fort-collins-co',
              'Fort Collins',
              [40.58526, -105.08442],
              'Medium'
            ),
            place('us-pueblo-co', 'Pueblo', [38.25445, -104.60914], 'Medium'),
            place(
              'us-grand-junction-co',
              'Grand Junction',
              [39.06387, -108.55065],
              'Medium'
            ),
            place('us-durango-co', 'Durango', [37.27528, -107.88007], 'Hard'),
            place(
              'us-steamboat-springs-co',
              'Steamboat Springs',
              [40.48498, -106.83172],
              'Hard'
            ),
          ]),
          administrative('Connecticut', [
            place('us-hartford-ct', 'Hartford', [41.76371, -72.68509], 'Easy'),
            place(
              'us-bridgeport-ct',
              'Bridgeport',
              [41.17923, -73.18945],
              'Easy'
            ),
            place(
              'us-new-haven-ct',
              'New Haven',
              [41.30815, -72.92816],
              'Medium'
            ),
            place(
              'us-stamford-ct',
              'Stamford',
              [41.05343, -73.53873],
              'Medium'
            ),
            place(
              'us-waterbury-ct',
              'Waterbury',
              [41.55815, -73.0515],
              'Medium'
            ),
            place(
              'us-new-london-ct',
              'New London',
              [41.35565, -72.09952],
              'Hard'
            ),
            place('us-danbury-ct', 'Danbury', [41.39482, -73.45401], 'Hard'),
          ]),
          administrative('Delaware', [
            place(
              'us-wilmington-de',
              'Wilmington',
              [39.74595, -75.54659],
              'Easy'
            ),
            place('us-dover-de', 'Dover', [39.15817, -75.52437], 'Easy'),
            place('us-newark-de', 'Newark', [39.68372, -75.74966], 'Medium'),
            place(
              'us-middletown-de',
              'Middletown',
              [39.44956, -75.71632],
              'Medium'
            ),
            place('us-milford-de', 'Milford', [38.91261, -75.42797], 'Medium'),
            place('us-seaford-de', 'Seaford', [38.64123, -75.61104], 'Hard'),
            place(
              'us-rehoboth-beach-de',
              'Rehoboth Beach',
              [38.72095, -75.07601],
              'Hard'
            ),
          ]),
          administrative('Florida', [
            place('us-miami-fl', 'Miami', [25.77427, -80.19366], 'Easy'),
            place('us-orlando-fl', 'Orlando', [28.53834, -81.37924], 'Easy'),
            place('us-tampa-fl', 'Tampa', [27.94752, -82.45843], 'Medium'),
            place(
              'us-jacksonville-fl',
              'Jacksonville',
              [30.33218, -81.65565],
              'Medium'
            ),
            place(
              'us-tallahassee-fl',
              'Tallahassee',
              [30.43826, -84.28073],
              'Medium'
            ),
            place(
              'us-fort-myers-fl',
              'Fort Myers',
              [26.62168, -81.84059],
              'Hard'
            ),
            place('us-key-west-fl', 'Key West', [24.55524, -81.78163], 'Hard'),
          ]),
          administrative('Georgia', [
            place('us-atlanta-ga', 'Atlanta', [33.749, -84.38798], 'Easy'),
            place('us-savannah-ga', 'Savannah', [32.08354, -81.09983], 'Easy'),
            place('us-augusta-ga', 'Augusta', [33.47097, -81.97484], 'Medium'),
            place(
              'us-columbus-ga',
              'Columbus',
              [32.46098, -84.98771],
              'Medium'
            ),
            place('us-macon-ga', 'Macon', [32.84069, -83.6324], 'Medium'),
            place('us-athens-ga', 'Athens', [33.96095, -83.37794], 'Hard'),
            place('us-valdosta-ga', 'Valdosta', [30.83334, -83.28032], 'Hard'),
          ]),
          administrative('Hawaii', [
            place('us-honolulu-hi', 'Honolulu', [21.30694, -157.85833], 'Easy'),
            place('us-hilo-hi', 'Hilo', [19.72991, -155.09073], 'Easy'),
            place(
              'us-kailua-kona-hi',
              'Kailua-Kona',
              [19.64016, -155.99912],
              'Medium'
            ),
            place('us-kahului-hi', 'Kahului', [20.88933, -156.47293], 'Medium'),
            place('us-lihue-hi', 'Lihue', [21.98121, -159.3721], 'Medium'),
            place('us-waimea-hi', 'Waimea', [20.02323, -155.67288], 'Hard'),
            place('us-kapaa-hi', 'Kapaa', [22.07521, -159.31895], 'Hard'),
          ]),
          administrative('Idaho', [
            place('us-boise-id', 'Boise', [43.6135, -116.20345], 'Easy'),
            place(
              'us-idaho-falls-id',
              'Idaho Falls',
              [43.46658, -112.03414],
              'Easy'
            ),
            place(
              'us-pocatello-id',
              'Pocatello',
              [42.8713, -112.44553],
              'Medium'
            ),
            place(
              'us-coeur-d-alene-id',
              "Coeur d'Alene",
              [47.67768, -116.78047],
              'Medium'
            ),
            place(
              'us-twin-falls-id',
              'Twin Falls',
              [42.56297, -114.46087],
              'Medium'
            ),
            place('us-lewiston-id', 'Lewiston', [46.41655, -117.01766], 'Hard'),
            place(
              'us-sandpoint-id',
              'Sandpoint',
              [48.27659, -116.55325],
              'Hard'
            ),
          ]),
          administrative('Illinois', [
            place('us-chicago-il', 'Chicago', [41.85003, -87.65005], 'Easy'),
            place(
              'us-springfield-il',
              'Springfield',
              [39.80172, -89.64371],
              'Easy'
            ),
            place('us-rockford-il', 'Rockford', [42.27113, -89.094], 'Medium'),
            place('us-peoria-il', 'Peoria', [40.69365, -89.58899], 'Medium'),
            place(
              'us-champaign-il',
              'Champaign',
              [40.11642, -88.24338],
              'Medium'
            ),
            place(
              'us-carbondale-il',
              'Carbondale',
              [37.72727, -89.21675],
              'Hard'
            ),
            place(
              'us-rock-island-il',
              'Rock Island',
              [41.50948, -90.57875],
              'Hard'
            ),
          ]),
          administrative('Indiana', [
            place(
              'us-indianapolis-in',
              'Indianapolis',
              [39.76838, -86.15804],
              'Easy'
            ),
            place(
              'us-fort-wayne-in',
              'Fort Wayne',
              [41.1306, -85.12886],
              'Easy'
            ),
            place(
              'us-evansville-in',
              'Evansville',
              [37.97476, -87.55585],
              'Medium'
            ),
            place(
              'us-south-bend-in',
              'South Bend',
              [41.68338, -86.25001],
              'Medium'
            ),
            place(
              'us-lafayette-in',
              'Lafayette',
              [40.4167, -86.87529],
              'Medium'
            ),
            place(
              'us-terre-haute-in',
              'Terre Haute',
              [39.4667, -87.41391],
              'Hard'
            ),
            place(
              'us-bloomington-in',
              'Bloomington',
              [39.16533, -86.52639],
              'Hard'
            ),
          ]),
          administrative('Iowa', [
            place(
              'us-des-moines-ia',
              'Des Moines',
              [41.60054, -93.60911],
              'Easy'
            ),
            place(
              'us-cedar-rapids-ia',
              'Cedar Rapids',
              [42.00833, -91.64407],
              'Easy'
            ),
            place(
              'us-davenport-ia',
              'Davenport',
              [41.52364, -90.57764],
              'Medium'
            ),
            place(
              'us-sioux-city-ia',
              'Sioux City',
              [42.49999, -96.40031],
              'Medium'
            ),
            place(
              'us-iowa-city-ia',
              'Iowa City',
              [41.66113, -91.53017],
              'Medium'
            ),
            place('us-waterloo-ia', 'Waterloo', [42.49276, -92.34296], 'Hard'),
            place('us-dubuque-ia', 'Dubuque', [42.50056, -90.66457], 'Hard'),
          ]),
          administrative('Kansas', [
            place(
              'us-dodge-city-ks',
              'Dodge City',
              [37.7528, -100.0171],
              'Hard'
            ),
            place('us-wichita-ks', 'Wichita', [37.69224, -97.33754], 'Easy'),
            place('us-topeka-ks', 'Topeka', [39.04833, -95.67804], 'Easy'),
            place(
              'us-lawrence-ks',
              'Lawrence',
              [38.97167, -95.23525],
              'Medium'
            ),
            place('us-salina-ks', 'Salina', [38.84028, -97.61142], 'Medium'),
            place('us-hays-ks', 'Hays', [38.87918, -99.32677], 'Medium'),
            place(
              'us-garden-city-ks',
              'Garden City',
              [37.97169, -100.87266],
              'Hard'
            ),
          ]),
          administrative('Kentucky', [
            place(
              'us-louisville-ky',
              'Louisville',
              [38.25424, -85.75941],
              'Easy'
            ),
            place(
              'us-lexington-ky',
              'Lexington',
              [37.98869, -84.47772],
              'Easy'
            ),
            place(
              'us-bowling-green-ky',
              'Bowling Green',
              [36.99032, -86.4436],
              'Medium'
            ),
            place(
              'us-owensboro-ky',
              'Owensboro',
              [37.77422, -87.11333],
              'Medium'
            ),
            place('us-paducah-ky', 'Paducah', [37.08339, -88.60005], 'Medium'),
            place(
              'us-pikeville-ky',
              'Pikeville',
              [37.47927, -82.51876],
              'Hard'
            ),
            place('us-somerset-ky', 'Somerset', [37.09202, -84.60411], 'Hard'),
          ]),
          administrative('Louisiana', [
            place(
              'us-new-orleans-la',
              'New Orleans',
              [29.95465, -90.07507],
              'Easy'
            ),
            place(
              'us-baton-rouge-la',
              'Baton Rouge',
              [30.44332, -91.18747],
              'Easy'
            ),
            place(
              'us-shreveport-la',
              'Shreveport',
              [32.52515, -93.75018],
              'Medium'
            ),
            place(
              'us-lafayette-la',
              'Lafayette',
              [30.22409, -92.01984],
              'Medium'
            ),
            place(
              'us-lake-charles-la',
              'Lake Charles',
              [30.21309, -93.2044],
              'Medium'
            ),
            place('us-monroe-la', 'Monroe', [32.50931, -92.1193], 'Hard'),
            place(
              'us-alexandria-la',
              'Alexandria',
              [31.31129, -92.44514],
              'Hard'
            ),
          ]),
          administrative('Maine', [
            place('us-bangor-me', 'Bangor', [44.8016, -68.7712], 'Easy'),
            place('us-portland-me', 'Portland', [43.65737, -70.2589], 'Easy'),
            place('us-augusta-me', 'Augusta', [44.31062, -69.77949], 'Easy'),
            place(
              'us-lewiston-me',
              'Lewiston',
              [44.10035, -70.21478],
              'Medium'
            ),
            place(
              'us-presque-isle-me',
              'Presque Isle',
              [46.68115, -68.01586],
              'Medium'
            ),
            place(
              'us-rockland-me',
              'Rockland',
              [44.10369, -69.10893],
              'Medium'
            ),
            place('us-calais-me', 'Calais', [45.18376, -67.27662], 'Hard'),
          ]),
          administrative('Maryland', [
            place(
              'us-baltimore-md',
              'Baltimore',
              [39.29038, -76.61219],
              'Easy'
            ),
            place(
              'us-annapolis-md',
              'Annapolis',
              [38.97859, -76.49184],
              'Easy'
            ),
            place(
              'us-frederick-md',
              'Frederick',
              [39.41427, -77.41054],
              'Medium'
            ),
            place(
              'us-hagerstown-md',
              'Hagerstown',
              [39.64176, -77.71999],
              'Medium'
            ),
            place(
              'us-salisbury-md',
              'Salisbury',
              [38.36067, -75.59937],
              'Medium'
            ),
            place(
              'us-cumberland-md',
              'Cumberland',
              [39.65287, -78.76252],
              'Hard'
            ),
            place(
              'us-ocean-city-md',
              'Ocean City',
              [38.3365, -75.08491],
              'Hard'
            ),
          ]),
          administrative('Massachusetts', [
            place('us-boston-ma', 'Boston', [42.35843, -71.05977], 'Easy'),
            place(
              'us-worcester-ma',
              'Worcester',
              [42.26259, -71.80229],
              'Easy'
            ),
            place(
              'us-springfield-ma',
              'Springfield',
              [42.10148, -72.58981],
              'Medium'
            ),
            place('us-lowell-ma', 'Lowell', [42.63342, -71.31617], 'Medium'),
            place(
              'us-new-bedford-ma',
              'New Bedford',
              [41.63526, -70.92701],
              'Medium'
            ),
            place(
              'us-pittsfield-ma',
              'Pittsfield',
              [42.45008, -73.24538],
              'Hard'
            ),
            place(
              'us-provincetown-ma',
              'Provincetown',
              [42.05295, -70.1864],
              'Hard'
            ),
          ]),
          administrative('Michigan', [
            place('us-detroit-mi', 'Detroit', [42.33143, -83.04575], 'Easy'),
            place(
              'us-grand-rapids-mi',
              'Grand Rapids',
              [42.96336, -85.66809],
              'Easy'
            ),
            place('us-lansing-mi', 'Lansing', [42.73253, -84.55553], 'Medium'),
            place(
              'us-ann-arbor-mi',
              'Ann Arbor',
              [42.27756, -83.74088],
              'Medium'
            ),
            place('us-flint-mi', 'Flint', [43.01253, -83.68746], 'Medium'),
            place(
              'us-marquette-mi',
              'Marquette',
              [46.54354, -87.39542],
              'Hard'
            ),
            place(
              'us-traverse-city-mi',
              'Traverse City',
              [44.76306, -85.62063],
              'Hard'
            ),
          ]),
          administrative('Minnesota', [
            place(
              'us-minneapolis-mn',
              'Minneapolis',
              [44.97997, -93.26384],
              'Easy'
            ),
            place(
              'us-saint-paul-mn',
              'Saint Paul',
              [44.94441, -93.09327],
              'Easy'
            ),
            place('us-duluth-mn', 'Duluth', [46.78327, -92.10658], 'Medium'),
            place(
              'us-rochester-mn',
              'Rochester',
              [44.02163, -92.4699],
              'Medium'
            ),
            place(
              'us-st-cloud-mn',
              'St. Cloud',
              [45.526658, -94.171007],
              'Medium'
            ),
            place('us-bemidji-mn', 'Bemidji', [47.47356, -94.88028], 'Hard'),
            place('us-mankato-mn', 'Mankato', [44.15906, -94.00915], 'Hard'),
          ]),
          administrative('Mississippi', [
            place('us-jackson-ms', 'Jackson', [32.2988, -90.1848], 'Easy'),
            place('us-gulfport-ms', 'Gulfport', [30.36742, -89.09282], 'Easy'),
            place(
              'us-hattiesburg-ms',
              'Hattiesburg',
              [31.32712, -89.29034],
              'Easy'
            ),
            place('us-tupelo-ms', 'Tupelo', [34.25807, -88.70464], 'Medium'),
            place(
              'us-meridian-ms',
              'Meridian',
              [32.36431, -88.70366],
              'Medium'
            ),
            place(
              'us-greenville-ms',
              'Greenville',
              [33.40898, -91.05978],
              'Medium'
            ),
            place('us-biloxi-ms', 'Biloxi', [30.39603, -88.88531], 'Hard'),
          ]),
          administrative('Missouri', [
            place('us-st-louis-mo', 'St. Louis', [38.62727, -90.19789], 'Easy'),
            place(
              'us-kansas-city-mo',
              'Kansas City',
              [39.09973, -94.57857],
              'Easy'
            ),
            place(
              'us-springfield-mo',
              'Springfield',
              [37.21533, -93.29824],
              'Medium'
            ),
            place(
              'us-columbia-mo',
              'Columbia',
              [38.95171, -92.33407],
              'Medium'
            ),
            place('us-joplin-mo', 'Joplin', [37.08423, -94.51328], 'Medium'),
            place(
              'us-cape-girardeau-mo',
              'Cape Girardeau',
              [37.30588, -89.51815],
              'Hard'
            ),
            place(
              'us-st-joseph-mo',
              'St. Joseph',
              [39.75946, -94.821143],
              'Hard'
            ),
          ]),
          administrative('Montana', [
            place('us-billings-mt', 'Billings', [45.78329, -108.50069], 'Easy'),
            place('us-missoula-mt', 'Missoula', [46.87215, -113.994], 'Easy'),
            place(
              'us-great-falls-mt',
              'Great Falls',
              [47.50024, -111.30081],
              'Medium'
            ),
            place('us-bozeman-mt', 'Bozeman', [45.67965, -111.03856], 'Medium'),
            place('us-helena-mt', 'Helena', [46.59271, -112.03611], 'Medium'),
            place(
              'us-kalispell-mt',
              'Kalispell',
              [48.19579, -114.31291],
              'Hard'
            ),
            place(
              'us-miles-city-mt',
              'Miles City',
              [46.40834, -105.84056],
              'Hard'
            ),
          ]),
          administrative('Nebraska', [
            place('us-omaha-ne', 'Omaha', [41.25626, -95.94043], 'Easy'),
            place('us-lincoln-ne', 'Lincoln', [40.8, -96.66696], 'Easy'),
            place(
              'us-grand-island-ne',
              'Grand Island',
              [40.92501, -98.34201],
              'Medium'
            ),
            place('us-kearney-ne', 'Kearney', [40.69946, -99.08148], 'Medium'),
            place(
              'us-north-platte-ne',
              'North Platte',
              [41.12389, -100.76542],
              'Medium'
            ),
            place(
              'us-scottsbluff-ne',
              'Scottsbluff',
              [41.86663, -103.66717],
              'Hard'
            ),
            place('us-norfolk-ne', 'Norfolk', [42.02834, -97.417], 'Hard'),
          ]),
          administrative('Nevada', [
            place('us-ely-nv', 'Ely', [39.2474, -114.8881], 'Hard'),
            place(
              'us-las-vegas-nv',
              'Las Vegas',
              [36.17497, -115.13722],
              'Easy'
            ),
            place('us-reno-nv', 'Reno', [39.52963, -119.8138], 'Easy'),
            place(
              'us-carson-city-nv',
              'Carson City',
              [39.1638, -119.7674],
              'Medium'
            ),
            place(
              'us-winnemucca-nv',
              'Winnemucca',
              [40.97296, -117.73568],
              'Medium'
            ),
            place('us-tonopah-nv', 'Tonopah', [38.06716, -117.23008], 'Medium'),
            place('us-elko-nv', 'Elko', [40.83242, -115.76312], 'Hard'),
          ]),
          administrative('New Hampshire', [
            place(
              'us-manchester-nh',
              'Manchester',
              [42.99564, -71.45479],
              'Easy'
            ),
            place('us-nashua-nh', 'Nashua', [42.76537, -71.46757], 'Easy'),
            place('us-concord-nh', 'Concord', [43.20814, -71.53757], 'Medium'),
            place(
              'us-portsmouth-nh',
              'Portsmouth',
              [43.07704, -70.75766],
              'Medium'
            ),
            place('us-keene-nh', 'Keene', [42.93369, -72.27814], 'Medium'),
            place('us-berlin-nh', 'Berlin', [44.46867, -71.18508], 'Hard'),
            place(
              'us-littleton-nh',
              'Littleton',
              [44.30617, -71.77009],
              'Hard'
            ),
          ]),
          administrative('New Jersey', [
            place('us-newark-nj', 'Newark', [40.73566, -74.17237], 'Easy'),
            place(
              'us-jersey-city-nj',
              'Jersey City',
              [40.72816, -74.07764],
              'Easy'
            ),
            place('us-trenton-nj', 'Trenton', [40.21705, -74.74294], 'Medium'),
            place(
              'us-atlantic-city-nj',
              'Atlantic City',
              [39.36415, -74.42306],
              'Medium'
            ),
            place('us-camden-nj', 'Camden', [39.92595, -75.11962], 'Medium'),
            place('us-paterson-nj', 'Paterson', [40.91677, -74.17181], 'Hard'),
            place('us-cape-may-nj', 'Cape May', [38.93511, -74.90601], 'Hard'),
          ]),
          administrative('New Mexico', [
            place(
              'us-albuquerque-nm',
              'Albuquerque',
              [35.08449, -106.65114],
              'Easy'
            ),
            place('us-santa-fe-nm', 'Santa Fe', [35.68698, -105.9378], 'Easy'),
            place(
              'us-las-cruces-nm',
              'Las Cruces',
              [32.31232, -106.77834],
              'Medium'
            ),
            place('us-roswell-nm', 'Roswell', [33.39437, -104.52491], 'Medium'),
            place(
              'us-farmington-nm',
              'Farmington',
              [36.72806, -108.21869],
              'Medium'
            ),
            place('us-gallup-nm', 'Gallup', [35.52808, -108.74258], 'Hard'),
            place('us-carlsbad-nm', 'Carlsbad', [32.42067, -104.22884], 'Hard'),
          ]),
          administrative('New York', [
            place(
              'us-new-york-city-ny',
              'New York City',
              [40.71427, -74.00597],
              'Easy'
            ),
            place('us-buffalo-ny', 'Buffalo', [42.88645, -78.87837], 'Easy'),
            place(
              'us-rochester-ny',
              'Rochester',
              [43.15478, -77.61556],
              'Medium'
            ),
            place(
              'us-syracuse-ny',
              'Syracuse',
              [43.04812, -76.14742],
              'Medium'
            ),
            place('us-albany-ny', 'Albany', [42.65258, -73.75623], 'Medium'),
            place(
              'us-binghamton-ny',
              'Binghamton',
              [42.09869, -75.91797],
              'Hard'
            ),
            place(
              'us-plattsburgh-ny',
              'Plattsburgh',
              [44.69949, -73.45291],
              'Hard'
            ),
          ]),
          administrative('North Carolina', [
            place(
              'us-charlotte-nc',
              'Charlotte',
              [35.22709, -80.84313],
              'Easy'
            ),
            place('us-raleigh-nc', 'Raleigh', [35.7721, -78.63861], 'Easy'),
            place(
              'us-greensboro-nc',
              'Greensboro',
              [36.07264, -79.79198],
              'Medium'
            ),
            place(
              'us-asheville-nc',
              'Asheville',
              [35.60095, -82.55402],
              'Medium'
            ),
            place(
              'us-wilmington-nc',
              'Wilmington',
              [34.23556, -77.94604],
              'Medium'
            ),
            place(
              'us-fayetteville-nc',
              'Fayetteville',
              [35.05266, -78.87836],
              'Hard'
            ),
            place('us-boone-nc', 'Boone', [36.21679, -81.67455], 'Hard'),
          ]),
          administrative('North Dakota', [
            place('us-fargo-nd', 'Fargo', [46.87719, -96.7898], 'Easy'),
            place('us-bismarck-nd', 'Bismarck', [46.80833, -100.78374], 'Easy'),
            place(
              'us-grand-forks-nd',
              'Grand Forks',
              [47.92526, -97.03285],
              'Medium'
            ),
            place('us-minot-nd', 'Minot', [48.23251, -101.29627], 'Medium'),
            place(
              'us-williston-nd',
              'Williston',
              [48.14697, -103.61797],
              'Medium'
            ),
            place(
              'us-dickinson-nd',
              'Dickinson',
              [46.87918, -102.78962],
              'Hard'
            ),
            place(
              'us-jamestown-nd',
              'Jamestown',
              [46.91054, -98.70844],
              'Hard'
            ),
          ]),
          administrative('Ohio', [
            place('us-columbus-oh', 'Columbus', [39.96118, -82.99879], 'Easy'),
            place('us-cleveland-oh', 'Cleveland', [41.4995, -81.69541], 'Easy'),
            place(
              'us-cincinnati-oh',
              'Cincinnati',
              [39.12711, -84.51439],
              'Medium'
            ),
            place('us-toledo-oh', 'Toledo', [41.66394, -83.55521], 'Medium'),
            place('us-akron-oh', 'Akron', [41.08144, -81.51901], 'Medium'),
            place('us-dayton-oh', 'Dayton', [39.75895, -84.19161], 'Hard'),
            place('us-marietta-oh', 'Marietta', [39.41535, -81.45484], 'Hard'),
          ]),
          administrative('Oklahoma', [
            place(
              'us-oklahoma-city-ok',
              'Oklahoma City',
              [35.46756, -97.51643],
              'Easy'
            ),
            place('us-tulsa-ok', 'Tulsa', [36.15398, -95.99277], 'Easy'),
            place('us-norman-ok', 'Norman', [35.22257, -97.43948], 'Medium'),
            place('us-lawton-ok', 'Lawton', [34.60869, -98.39033], 'Medium'),
            place('us-enid-ok', 'Enid', [36.39559, -97.87839], 'Medium'),
            place(
              'us-stillwater-ok',
              'Stillwater',
              [36.11561, -97.05837],
              'Hard'
            ),
            place(
              'us-mcalester-ok',
              'McAlester',
              [34.93343, -95.76971],
              'Hard'
            ),
          ]),
          administrative('Oregon', [
            place('us-astoria-or', 'Astoria', [46.1879, -123.8313], 'Medium'),
            place('us-portland-or', 'Portland', [45.52345, -122.67621], 'Easy'),
            place('us-eugene-or', 'Eugene', [44.05207, -123.08675], 'Easy'),
            place('us-bend-or', 'Bend', [44.05817, -121.31531], 'Medium'),
            place('us-medford-or', 'Medford', [42.32652, -122.87559], 'Medium'),
            place(
              'us-pendleton-or',
              'Pendleton',
              [45.67207, -118.7886],
              'Medium'
            ),
            place(
              'us-klamath-falls-or',
              'Klamath Falls',
              [42.22487, -121.78167],
              'Hard'
            ),
          ]),
          administrative('Pennsylvania', [
            place(
              'us-philadelphia-pa',
              'Philadelphia',
              [39.95238, -75.16362],
              'Easy'
            ),
            place(
              'us-pittsburgh-pa',
              'Pittsburgh',
              [40.44062, -79.99589],
              'Easy'
            ),
            place('us-erie-pa', 'Erie', [42.12922, -80.08506], 'Medium'),
            place('us-scranton-pa', 'Scranton', [41.40916, -75.6649], 'Medium'),
            place(
              'us-harrisburg-pa',
              'Harrisburg',
              [40.2737, -76.88442],
              'Medium'
            ),
            place(
              'us-lancaster-pa',
              'Lancaster',
              [40.03788, -76.30551],
              'Hard'
            ),
            place(
              'us-state-college-pa',
              'State College',
              [40.79339, -77.86],
              'Hard'
            ),
          ]),
          administrative('Rhode Island', [
            place(
              'us-providence-ri',
              'Providence',
              [41.82399, -71.41283],
              'Easy'
            ),
            place('us-newport-ri', 'Newport', [41.4901, -71.31283], 'Easy'),
            place('us-warwick-ri', 'Warwick', [41.7001, -71.41617], 'Medium'),
            place('us-westerly-ri', 'Westerly', [41.3776, -71.82729], 'Medium'),
            place(
              'us-woonsocket-ri',
              'Woonsocket',
              [42.00288, -71.51478],
              'Medium'
            ),
            place(
              'us-pawtucket-ri',
              'Pawtucket',
              [41.87871, -71.38256],
              'Hard'
            ),
            place(
              'us-narragansett-ri',
              'Narragansett',
              [41.4501, -71.4495],
              'Hard'
            ),
          ]),
          administrative('South Carolina', [
            place('us-columbia-sc', 'Columbia', [34.00071, -81.03481], 'Easy'),
            place(
              'us-charleston-sc',
              'Charleston',
              [32.77632, -79.93275],
              'Easy'
            ),
            place(
              'us-greenville-sc',
              'Greenville',
              [34.85262, -82.39401],
              'Medium'
            ),
            place(
              'us-myrtle-beach-sc',
              'Myrtle Beach',
              [33.68906, -78.88669],
              'Medium'
            ),
            place(
              'us-florence-sc',
              'Florence',
              [34.19543, -79.76256],
              'Medium'
            ),
            place(
              'us-spartanburg-sc',
              'Spartanburg',
              [34.94957, -81.93205],
              'Hard'
            ),
            place('us-beaufort-sc', 'Beaufort', [32.4317, -80.66993], 'Hard'),
          ]),
          administrative('South Dakota', [
            place(
              'us-sioux-falls-sd',
              'Sioux Falls',
              [43.54369, -96.72796],
              'Easy'
            ),
            place(
              'us-rapid-city-sd',
              'Rapid City',
              [44.08054, -103.23101],
              'Easy'
            ),
            place('us-aberdeen-sd', 'Aberdeen', [45.4647, -98.48648], 'Medium'),
            place('us-pierre-sd', 'Pierre', [44.36832, -100.35097], 'Medium'),
            place(
              'us-brookings-sd',
              'Brookings',
              [44.31136, -96.79839],
              'Medium'
            ),
            place('us-mitchell-sd', 'Mitchell', [43.70943, -98.0298], 'Hard'),
            place('us-yankton-sd', 'Yankton', [42.87111, -97.39728], 'Hard'),
          ]),
          administrative('Tennessee', [
            place(
              'us-nashville-tn',
              'Nashville',
              [36.16589, -86.78444],
              'Easy'
            ),
            place('us-memphis-tn', 'Memphis', [35.14953, -90.04898], 'Easy'),
            place(
              'us-knoxville-tn',
              'Knoxville',
              [35.96064, -83.92074],
              'Medium'
            ),
            place(
              'us-chattanooga-tn',
              'Chattanooga',
              [35.04563, -85.30968],
              'Medium'
            ),
            place(
              'us-clarksville-tn',
              'Clarksville',
              [36.52977, -87.35945],
              'Medium'
            ),
            place('us-jackson-tn', 'Jackson', [35.61452, -88.81395], 'Hard'),
            place(
              'us-johnson-city-tn',
              'Johnson City',
              [36.31344, -82.35347],
              'Hard'
            ),
          ]),
          administrative('Texas', [
            place('us-marfa-tx', 'Marfa', [30.3095, -104.0206], 'Medium'),
            place('us-houston-tx', 'Houston', [29.76328, -95.36327], 'Easy'),
            place('us-dallas-tx', 'Dallas', [32.78306, -96.80667], 'Easy'),
            place(
              'us-san-antonio-tx',
              'San Antonio',
              [29.42412, -98.49363],
              'Medium'
            ),
            place('us-austin-tx', 'Austin', [30.26715, -97.74306], 'Medium'),
            place('us-el-paso-tx', 'El Paso', [31.75872, -106.48693], 'Medium'),
            place('us-amarillo-tx', 'Amarillo', [35.222, -101.8313], 'Hard'),
            place('us-lubbock-tx', 'Lubbock', [33.57786, -101.85517], 'Hard'),
          ]),
          administrative('Utah', [
            place(
              'us-salt-lake-city-ut',
              'Salt Lake City',
              [40.76078, -111.89105],
              'Easy'
            ),
            place('us-provo-ut', 'Provo', [40.23384, -111.65853], 'Easy'),
            place('us-ogden-ut', 'Ogden', [41.223, -111.97383], 'Medium'),
            place(
              'us-st-george-ut',
              'St. George',
              [37.077006, -113.576534],
              'Medium'
            ),
            place('us-moab-ut', 'Moab', [38.57332, -109.54984], 'Medium'),
            place('us-logan-ut', 'Logan', [41.73549, -111.83439], 'Hard'),
            place('us-vernal-ut', 'Vernal', [40.45552, -109.52875], 'Hard'),
          ]),
          administrative('Vermont', [
            place(
              'us-burlington-vt',
              'Burlington',
              [44.47588, -73.21207],
              'Easy'
            ),
            place(
              'us-montpelier-vt',
              'Montpelier',
              [44.26006, -72.57539],
              'Easy'
            ),
            place('us-rutland-vt', 'Rutland', [43.61062, -72.97261], 'Medium'),
            place(
              'us-bennington-vt',
              'Bennington',
              [42.87813, -73.19677],
              'Medium'
            ),
            place(
              'us-brattleboro-vt',
              'Brattleboro',
              [42.85092, -72.55787],
              'Medium'
            ),
            place(
              'us-st-johnsbury-vt',
              'St. Johnsbury',
              [44.42526, -72.01512],
              'Hard'
            ),
            place('us-newport-vt', 'Newport', [44.93644, -72.2051], 'Hard'),
          ]),
          administrative('Virginia', [
            place(
              'us-virginia-beach-va',
              'Virginia Beach',
              [36.85293, -75.97799],
              'Easy'
            ),
            place('us-richmond-va', 'Richmond', [37.55376, -77.46026], 'Easy'),
            place('us-norfolk-va', 'Norfolk', [36.84681, -76.28522], 'Medium'),
            place('us-roanoke-va', 'Roanoke', [37.27097, -79.94143], 'Medium'),
            place(
              'us-charlottesville-va',
              'Charlottesville',
              [38.02931, -78.47668],
              'Medium'
            ),
            place(
              'us-lynchburg-va',
              'Lynchburg',
              [37.41375, -79.14225],
              'Hard'
            ),
            place('us-bristol-va', 'Bristol', [36.59649, -82.18847], 'Hard'),
          ]),
          administrative('Washington', [
            place('us-seattle-wa', 'Seattle', [47.60621, -122.33207], 'Easy'),
            place('us-spokane-wa', 'Spokane', [47.65966, -117.42908], 'Easy'),
            place('us-tacoma-wa', 'Tacoma', [47.25288, -122.44429], 'Medium'),
            place(
              'us-vancouver-wa',
              'Vancouver',
              [45.63873, -122.66149],
              'Medium'
            ),
            place('us-yakima-wa', 'Yakima', [46.60207, -120.5059], 'Medium'),
            place(
              'us-bellingham-wa',
              'Bellingham',
              [48.75955, -122.48822],
              'Hard'
            ),
            place(
              'us-walla-walla-wa',
              'Walla Walla',
              [46.06458, -118.34302],
              'Hard'
            ),
          ]),
          administrative('West Virginia', [
            place(
              'us-charleston-wv',
              'Charleston',
              [38.34982, -81.63262],
              'Easy'
            ),
            place(
              'us-huntington-wv',
              'Huntington',
              [38.41925, -82.44515],
              'Easy'
            ),
            place(
              'us-morgantown-wv',
              'Morgantown',
              [39.62953, -79.9559],
              'Medium'
            ),
            place(
              'us-parkersburg-wv',
              'Parkersburg',
              [39.26674, -81.56151],
              'Medium'
            ),
            place(
              'us-wheeling-wv',
              'Wheeling',
              [40.06396, -80.72091],
              'Medium'
            ),
            place('us-beckley-wv', 'Beckley', [37.77817, -81.18816], 'Hard'),
            place(
              'us-martinsburg-wv',
              'Martinsburg',
              [39.45621, -77.96389],
              'Hard'
            ),
          ]),
          administrative('Wisconsin', [
            place('us-milwaukee-wi', 'Milwaukee', [43.0389, -87.90647], 'Easy'),
            place('us-madison-wi', 'Madison', [43.07305, -89.40123], 'Easy'),
            place(
              'us-green-bay-wi',
              'Green Bay',
              [44.51916, -88.01983],
              'Medium'
            ),
            place(
              'us-eau-claire-wi',
              'Eau Claire',
              [44.81135, -91.49849],
              'Medium'
            ),
            place(
              'us-la-crosse-wi',
              'La Crosse',
              [43.80136, -91.23958],
              'Medium'
            ),
            place('us-wausau-wi', 'Wausau', [44.95914, -89.63012], 'Hard'),
            place('us-superior-wi', 'Superior', [46.72077, -92.10408], 'Hard'),
          ]),
          administrative('Wyoming', [
            place('us-cheyenne-wy', 'Cheyenne', [41.13998, -104.82025], 'Easy'),
            place('us-casper-wy', 'Casper', [42.86663, -106.31308], 'Easy'),
            place('us-laramie-wy', 'Laramie', [41.31137, -105.5911], 'Medium'),
            place(
              'us-gillette-wy',
              'Gillette',
              [44.29109, -105.50222],
              'Medium'
            ),
            place(
              'us-rock-springs-wy',
              'Rock Springs',
              [41.58746, -109.2029],
              'Medium'
            ),
            place('us-jackson-wy', 'Jackson', [43.47993, -110.76243], 'Hard'),
            place('us-cody-wy', 'Cody', [44.52634, -109.05653], 'Hard'),
          ]),
        ],
      },
    ],
  },
  {
    name: 'South America',
    countries: [
      {
        code: 'br',
        name: 'Brazil',
        children: [
          administrative('Paraná', [
            place('br-londrina-pr', 'Londrina', [-23.3045, -51.1696], 'Easy'),
          ]),
          administrative('Pará', [
            place('br-santarem-pa', 'Santarém', [-2.4385, -54.6996], 'Hard'),
          ]),
          administrative('Bahia', [
            place(
              'br-feira-de-santana-ba',
              'Feira de Santana',
              [-12.2664, -38.9663],
              'Medium'
            ),
          ]),
          administrative('Minas Gerais', [
            place(
              'br-uberlandia-mg',
              'Uberlândia',
              [-18.9186, -48.2772],
              'Easy'
            ),
          ]),
          administrative('Rio Grande do Sul', [
            place('br-pelotas-rs', 'Pelotas', [-31.7654, -52.3376], 'Medium'),
          ]),
          administrative('Roraima', [
            place('br-boa-vista-rr', 'Boa Vista', [2.8235, -60.6758], 'Hard'),
          ]),
        ],
      },
    ],
  },
  {
    name: 'Europe',
    countries: [
      {
        code: 'fr',
        name: 'France',
        children: [
          administrative('Île-de-France', [
            administrative('Paris', [
              place('fr-paris', 'Paris', [48.8566, 2.3522], 'Easy'),
            ]),
          ]),
          administrative('Auvergne-Rhône-Alpes', [
            administrative('Rhône', [
              place('fr-lyon', 'Lyon', [45.764, 4.8357], 'Easy'),
            ]),
            administrative('Cantal', [
              place('fr-saint-flour', 'Saint-Flour', [45.0344, 3.092], 'Hard'),
            ]),
          ]),
          administrative('Brittany', [
            administrative('Finistère', [
              place('fr-quimper', 'Quimper', [47.996, -4.1025], 'Medium'),
            ]),
          ]),
          administrative("Provence-Alpes-Côte d'Azur", [
            administrative('Alpes-Maritimes', [
              place('fr-menton', 'Menton', [43.7745, 7.4975], 'Medium'),
            ]),
          ]),
          administrative('Bourgogne-Franche-Comté', [
            administrative('Nièvre', [
              place('fr-nevers', 'Nevers', [46.9896, 3.159], 'Hard'),
            ]),
          ]),
        ],
      },
    ],
  },
  {
    name: 'Asia',
    countries: [
      {
        code: 'jp',
        name: 'Japan',
        children: [
          administrative('Hokkaido', [
            place('jp-sapporo', 'Sapporo', [43.0618, 141.3545], 'Easy'),
          ]),
          administrative('Nagano', [
            place('jp-matsumoto', 'Matsumoto', [36.238, 137.972], 'Medium'),
          ]),
          administrative('Ishikawa', [
            place('jp-kanazawa', 'Kanazawa', [36.5613, 136.6562], 'Easy'),
          ]),
          administrative('Kōchi', [
            place('jp-kochi', 'Kōchi', [33.5597, 133.5311], 'Medium'),
          ]),
          administrative('Miyazaki', [
            place('jp-miyazaki', 'Miyazaki', [31.9077, 131.4202], 'Hard'),
          ]),
          administrative('Aomori', [
            place('jp-hirosaki', 'Hirosaki', [40.6031, 140.4638], 'Hard'),
          ]),
        ],
      },
    ],
  },
] as const satisfies readonly ContinentNode[]

export const FIND_THE_PLACE_PLACES = flattenPlaceData(FIND_THE_PLACE_DATA)

export const FIND_THE_PLACE_COUNTRY_DIVISIONS = Object.fromEntries(
  FIND_THE_PLACE_DATA.map((continent) => [
    continent.name,
    continent.countries.map((country) => country.name),
  ])
)

export const FIND_THE_PLACE_COUNTRY_CODES = Object.fromEntries(
  FIND_THE_PLACE_DATA.flatMap((continent) =>
    continent.countries.map((country) => [country.name, country.code])
  )
)
