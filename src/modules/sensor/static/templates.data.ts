export default [
  {
    id: 0,
    type: "CO2",
    threshold: 700,
    min: 0,
    max: 2000,
  },
  {
    id: 1,
    type: "GAS",
    threshold: undefined,
    min: 0,
    max: 1,
  },
  {
    id: 2,
    type: "MOTION",
    threshold: 0,
    min: 0,
    max: 1,
  },
  {
    id: 3,
    type: "TEMPERATURE",
    threshold: 24, 
    min: -50,
    max: 50,
  },
  {
    id: 4,
    type: "PRESSURE",
    threshold: 1013,
    min: 800,
    max: 1200,
  },
  {
    id: 5,
    type: "SMOKE",
    threshold: 1, 
    min: 0,
    max: 10,
  }
]