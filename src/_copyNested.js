export default (obj) => {

  return JSON.parse(JSON.stringify(obj));

//  let data;
//  if (obj) {
//    if (typeof obj === "string") {
//      data = obj;
//    } else {
//      data = Object.assign({}, obj);
//      Object.keys(obj).forEach((id) => {
//        if (typeof obj[id] === "string") {
//          data[id] = obj[id];
//        } else {
//          data[id] = Object.assign({}, obj[id]);
//          Object.keys(obj[id]).forEach((prop) => {
//            if (typeof obj[id][prop] === "string") {
//              data[id][prop] = obj[id][prop];
//            } else {
//              data[id][prop] = Object.assign({}, obj[id][prop]);
//              Object.keys(obj[id][prop]).forEach((attr) => {
//                if (typeof obj[id][prop][attr] === "string") {
//                  data[id][prop][attr] = obj[id][prop][attr];
//                } else {
//                  data[id][prop][attr] = Object.assign({}, obj[id][prop][attr]);
//                  Object.keys(obj[id][prop][attr]).forEach((field) => {
//                    if (typeof obj[id][prop][attr][field] === "string") {
//                      data[id][prop][attr][field] = obj[id][prop][attr][field];
//                    } else {
//                      data[id][prop][attr][field] = Object.assign({}, obj[id][prop][attr][field]);
//                    }
//                  });
//                }
//              });
//            }
//          });
//        }
//      });
//    }
//  }
//  return data;

};
