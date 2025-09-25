/* 
  This dataset represents approximate economic and demographic indicators 
  for select countries (United States, Mexico, Japan, Canada, Nigeria, Brazil, Iceland). 
  The values are illustrative, not official, and are designed for use in a demo web app project. 
  
  Each attribute reflects conditions in the 2020–2025 timeframe, based on general trends:
  - population_growth: annual % growth
  - middle_class_growth: annual % expansion of middle class / consumption
  - urbanization_rate: % of population living in cities
  - education_index: proxy score (0–100) based on attainment & quality
  - economic_openness: proxy score (0–100) based on trade/FDI
*/


//will add country either flag or map image later
const countries = [
  {
    name: "United States",
    population_growth: 0.5,
    middle_class_growth: 1.5,
    urbanization_rate: 82,
    education_index: 90,
    economic_openness: 78,
  },
  {
    name: "Mexico",
    population_growth: 1.0,
    middle_class_growth: 2.5,
    urbanization_rate: 80,
    education_index: 70,
    economic_openness: 65,
  },
  {
    name: "Japan",
    population_growth: -0.3,
    middle_class_growth: 0.2,
    urbanization_rate: 92,
    education_index: 95,
    economic_openness: 75,
  },
  {
    name: "Canada",
    population_growth: 1.2,
    middle_class_growth: 1.0,
    urbanization_rate: 81,
    education_index: 92,
    economic_openness: 80,
  },
  {
    name: "Nigeria",
    population_growth: 2.5,
    middle_class_growth: 3.0,
    urbanization_rate: 52,
    education_index: 55,
    economic_openness: 60,
  },
  {
    name: "Brazil",
    population_growth: 0.7,
    middle_class_growth: 1.2,
    urbanization_rate: 87,
    education_index: 72,
    economic_openness: 68,
  },
  {
    name: "Iceland",
    population_growth: 0.6,
    middle_class_growth: 1.0,
    urbanization_rate: 94,
    education_index: 96,
    economic_openness: 82,
  },
];

// Export for use in your project (Node.js or modern frontend bundlers)
export default countries;
