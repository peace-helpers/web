// $extendPeace() -> Function -> If it does not already exist, creates $peace, adds serviceConfig to $peace, what is on $peace already takes precedence
$extendPeace = (serviceConfig) => {
  if (typeof $peace !== 'object' || Array.isArray($peace) || $peace === null) { // if $peace is not an object -> initalize as an object
    $peace = {}
  }

  if (typeof serviceConfig === 'object' && !Array.isArray(serviceConfig) && serviceConfig !== null) { // if service config is an object
    for (let key of Object.keys(serviceConfig)) {
      $peace[key] = Object.assign({}, serviceConfig[key], $peace[key]) // what is already defined @ $peace[key] takes precedence
    }
  }

  $peace.GIT_URL = 'https://github.com/peace-helpers/web/'
}
