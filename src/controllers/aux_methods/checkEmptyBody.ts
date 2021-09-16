

export function isBodyEmpty(body: Object){ 
  
  return (body.constructor === Object && Object.keys(body).length === 0) 
}