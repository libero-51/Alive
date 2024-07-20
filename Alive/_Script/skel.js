var pos=[],UVR=[],ind=[],uvs=[],nor=[],upd,uuv,auv,HBln,Ske,Mske;
var Gid=[];bone=[];
var skIn=[];
var skWe=[];
//var anm;
//   ini             scaling                     position                      rotation
var SkeV=[new BABYLON.Vector3(1,1,1),new BABYLON.Vector3(0,3.4,0),new BABYLON.Vector3(0,1.57,0)];
var zmsh=3; //zoom bone mesh
var zske=20;//zoom skeleton




function DoSke(){
  // fusion of all submesh-----------------------
  let s="";
  let pl=pos.length; //3
  let i=0;
  Gid=[];
//--------------------------Do SkeData
  for(let i=0;i<Bdt.length;i++){
    for(let k=0;k<=(Bdt[i][2]-Bdt[i][1]);k++){
      skIn.push(i);skIn.push(0);skIn.push(0);skIn.push(0);     
      skWe.push(1);        skWe.push(0);skWe.push(0);skWe.push(0);
    }  
  }
  for(let i=0;i<ind.length;i++){                              //      do Gid   Global ind
    for(let k=0;k<ind[i].length/3;k++){
      Gid.push(ind[i][k*3]);Gid.push(ind[i][k*3+1]);Gid.push(ind[i][k*3+2]);    //}  
    } 
  }
  //-----------------------------Ske---------------------- 

  Ske = new BABYLON.Skeleton("Ske", "SkeID", scene);
  Ske.needInitialSkinMatrix = false;
  
  //-----------------------------bones--------------------
  bone=[];
  for(let i=0;i<Bdt.length;i++){
    bone[i]=new BABYLON.Bone("bone"+i,Ske,bone[Bdt[i][4]],BABYLON.Matrix.Compose(new BABYLON.Vector3(1,1,1),
    new BABYLON.Quaternion(0,0,0,1),Bdt[i][0]));
  }

  //Compose:  Creates a new matrix composed by merging scale (vector3),
  // rotation (quaternion) and translation (vector3)
 

  Mske = new BABYLON.Mesh("MyFirstSke",scene);
  BABYLON.VertexData.ComputeNormals(pos,Gid,nor);
  var vData = new BABYLON.VertexData();  
  vData.positions       = pos;
  vData.indices         = Gid;
  vData.normals         = nor;
  vData.uvs             = uvs;   
  vData.matricesIndices = skIn;
  vData.matricesWeights = skWe;
  vData.applyToMesh(Mske);
  Mske.material = SkeMat;

//  try{Mske.convertToFlatShadedMesh();}catch(e){alert(e.message);} // converte normals to flat face

  Mske.skeleton = Ske;
  Mske.scaling  =SkeV[0];
  Mske.position =SkeV[1];
  Mske.rotation =SkeV[2];
}

// -------Intercept  errors
window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = "script error";
  if (string.indexOf(substring) > -1){
    alert('Script Error: See Browser Console for Detail');
  } else {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ].join(' - ');
    alert(message);
  }
  return false;
};

function SaveglTF(name){
if (confirm('Do you want to download glTF files?')){
  BABYLON.GLTF2Export.GLTFAsync(scene, "name").then((gltf) => {
    gltf.downloadFiles();
  });
}
}

function SaveGLB(name){
  if (confirm('Do you want to download that GLB file?')){
    Go(0);
    BABYLON.GLTF2Export.GLBAsync(scene,name).then((glb) => {glb.downloadFiles();  Go(.3);});
  }
}


function SaveBabylonnnnn(){
  if (confirm('Do you want to download that scene?')){Babylon_Download(Hname+".babylon");}
}  


