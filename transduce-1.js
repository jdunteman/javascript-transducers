// Generate large dataset
const configurations = []
for(let i=0; i<6_000_000; i++) {
  configurations.push({
      name: `C-1${i}1`,
      size: ~~(Math.random() * 10) + 1,
      status: Math.round(Math.random()) 
  })
}
// Implement array reducer
const arrayReducer = (accumulator, currrent) => {
  accumulator.push(currrent)
  return accumulator
} 
// Implement transducer filter from reduce
const tFilter = predicate               => 
                reducer                 => 
                (accumulator, currrent) => 
                predicate(currrent) ? 
                  reducer(accumulator, currrent) :
                  accumulator
// Implement transducer map from reduce
const tMap =  transform               =>  
              reducer                 => 
              (accumulator, currrent) => 
                    reducer(accumulator, transform(currrent))
  
const isLarge                = obj => obj.size > 4  
const toUpperCase            = obj => obj.toUpperCase()
const getConfigurationStatus = obj => obj.status ? 
                                        `${obj.name} is built` :
                                        `${obj.name} is initiated`
const largeConfigurationTransducer  = tFilter(isLarge) 
const configurationStatusTransducer = tMap(getConfigurationStatus)
const upperCaseTransducer           = tMap(toUpperCase)

// Transduced filter map map - Avg execution time: 2.9 sec
configurations.reduce(
  largeConfigurationTransducer(
    configurationStatusTransducer(
      upperCaseTransducer(arrayReducer))), []) //?.

// Standard .chain filter map map - Avg execution time: 6.5 seconds
configurations
    .filter(isLarge)
    .map(getConfigurationStatus)
    .map(toUpperCase) //?.
