export default function findPath (a, obj) {
  for(var key in obj) {                                         
      if(obj.hasOwnProperty(key)) {                            
          if(a === obj[key]) return key;                        
          else if(obj[key] && typeof obj[key] === "object") {   
              var path = findPath(a, obj[key]);                 
              if(path) return key + "." + path;                 
          }
      }
  }
}