var Matrix = function () {};

Matrix.prototype.perspective = function (f) {
  var transformMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1/f, 0]];
   return transformMatrix;
}


Matrix.prototype.identity = function () {
  var transformMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  return transformMatrix;
}

Matrix.prototype.translate = function (x) {
  var transformMatrix = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for ( i = 0; i < 3; i ++) {
    transformMatrix[i][3] = x;
  }  
  return transformMatrix;
}

Matrix.prototype.rotateX = function (theta) {
  var y = Math.cos(theta* Math.PI / 180);
  var z = Math.sin(theta* Math.PI / 180);
  var transformMatrix = [[1, 0, 0, 0], [0, y, -z, 0], [0, z, y, 0], [0, 0, 0, 1]];

  return  transformMatrix;
}

Matrix.prototype.rotateY = function (theta) {
  var x = Math.cos(theta* Math.PI / 180);
  var z = Math.sin(theta* Math.PI / 180);
  var transformMatrix = [[x, 0, z, 0], [0, 1, 0, 0], [-z, 0, x, 0], [0, 0, 0, 1]];
  return transformMatrix;
}

Matrix.prototype.rotateZ = function (theta) {
  var x = Math.cos(theta* Math.PI / 180);
  var y = Math.sin(theta* Math.PI / 180);
  var transformMatrix = [[x, -y, 0, 0], [y, x, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

  return transformMatrix;
}

Matrix.prototype.scale = function (x, y, z) {
  var transformMatrix = [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
  return transformMatrix;
}

function  apply (matrix, origin)  {
  var Point = [0, 0, 0, 1];
  for (var i = 0; i < 4; i ++) {
    for (var j = 0; j < 4; j ++){
          Point[i] = Point[i] + matrix[i][j] * origin[j];
      }
  }
  return Point;
}

function simpleInvert(src, dst) {

      // INITIALIZE DESTINATION TO IDENTITY MATRIX

      for (var i = 0 ; i < 4 ; i++)
      for (var j = 0 ; j < 4 ; j++)
         dst[i+4*j] = i==j ? 1 : 0;

      // COMPUTE ADJOINT COFACTOR MATRIX FOR THE ROTATION+SCALE 3x3

      for (var i = 0 ; i < 3 ; i++)
      for (var j = 0 ; j < 3 ; j++) {
         var i0 = (i+1) % 3;
         var i1 = (i+2) % 3;
         var j0 = (j+1) % 3;
         var j1 = (j+2) % 3;
         dst[j+4*i] = src[i0+4*j0] * src[i1+4*j1] - src[i0+4*j1] * src[i1+4*j0];
      }

      // RENORMALIZE BY DETERMINANT TO GET ROTATION+SCALE 3x3 INVERSE

      var determinant = src[0+4*0] * dst[0+4*0]
                      + src[1+4*0] * dst[0+4*1]
                      + src[2+4*0] * dst[0+4*2] ;
      for (var i = 0 ; i < 3 ; i++)
      for (var j = 0 ; j < 3 ; j++)
         dst[i+4*j] /= determinant;

      // COMPUTE INVERSE TRANSLATION

      for (var i = 0 ; i < 3 ; i++)
         dst[i+4*3] = - dst[i+4*0] * src[0+4*3]
                      - dst[i+4*1] * src[1+4*3]
                      - dst[i+4*2] * src[2+4*3] ;
};

