var imgname;77
var BFCLL=true;
var Hname;
var speed=10;
let ofx=300; // offset x  : ascissa  asse verticale
let ofy=500; // offset y  
let zox=1.5  ;   // 1.5 zoom orizzontale
let zoy=1  ;   // 1   zoom verticale
var Cat;
let sphd=.3  //  sphere scale
var sph;     //  sphere master
var spp=[];  //  sphere current bone && parent
var spq=[];  //  index vertex parent
var crpos=0; //  red   cursor
var SkeMat;
let gryMat;
let redMat;
let greMat;
let yelMat;
let bluMat;
let whiMat;
let blaMat;
let camera;
let t1,t2,t3,t4;  //cursor colored sphere
let zom=100; //zoom  30
let yom=0;  //cursor Y
let rom=new BABYLON.Vector3(0,0,0);    //memory rotation 

Hname=GetName();


function GetName(){
  let nm=location.pathname.split("/");
  return (nm[nm.length-1].split(".")[0]);
}


function DelVertex(start){   //  del vertex start
  let b;
//--------------------------------------del triangle with start
  for(let i=0;i<ind.length;i++){         // for each bone
    for(let j=0;j<ind[i].length/3;j++){  // for each triangle in bones
      if(ind[i][j*3]==start||ind[i][j*3+1]==start||ind[i][j*3+2]==start){
         ind[i][j*3]=0;ind[i][j*3+1]=0;ind[i][j*3+2]=0; alert(start+"   "+i+"  "+j);    // del triangle
      }
    }
  }
//-----------------------------------del vertex start in pos[]
  pos.splice(start*3,3); // x,y,z
//-----------------------------------del vertex start in UVR[]
  UVR.splice(start*2,2); //  x.y
//-----------------------------------get bone with vertex start
  for(let i=0;i<Bdt.length;i++){if(start>=Bdt[i][1]&&start<=Bdt[i][2]){b=i;break;}} // get bone
//-----------------------------------renum Bdt 
  for(let i=b;i<Bdt.length;i++){  // for each bone  from b to end
    Bdt[i][2]--;                  // renum Bdt[end]
    if(i>b){Bdt[i][1]--;}         // renum Bdt[start]
  }
//-------renum all ind[]
  for(let i=0;i<ind.length;i++){
    for(j=0;j<ind[b].length;j++){
      if(ind[i][j]>=(start)){ind[i][j]--;}
    }
  }
}

function AddVertex(start){   //  add one vertex in start before ?
  let b;
//-----------------------------------add vertex (0,0,0)  in start position
  pos.splice(start*3,0,0); //  x
  pos.splice(start*3,0,0); //  y
  pos.splice(start*3,0,0); //  z
//-----------------------------------add UVR position (0,0) in start position  
  UVR.splice(start*2,0,0); //  x
  UVR.splice(start*2,0,0); //  y
//-----------------------------------renum Bdt,
  for(let i=0;i<Bdt.length;i++){if(start>=Bdt[i][1]&&start<=Bdt[i][2]){b=i;break;}} // get bone
  for(let i=b;i<Bdt.length;i++){
    Bdt[i][2]++;                  // renum Bdt[end]
    if(i>b){Bdt[i][1]++;}         // renum Bdt[start]
    for(j=0;j<ind[b].length;j++){
      if(ind[i][j]>=(start)){ind[i][j]++;}
    }
  }
}  

function UVVrtx(){

  ctt.globalAlpha=1;
  ctt.beginPath();
  ctt.fillStyle = "#ffff";          
  ctt.clearRect(0, 0, canvat.width,canvat.height);
  for(let i=0;i<ind.length;i++){
    drawTriangle(i);  
  }
  ctt.fillStyle="#000f";
  ctt.font='8px serif';
  for(let i=0;i<pos.length/3;i++){
    ctt.fillText(i,auv[i*2],auv[i*2+1]);
  }
  DownloadCanvasAsImage(Hname+".png");
  Part(prt);  
}

function UVMap(){
  ctt.globalAlpha=1;
  ctt.beginPath();
  ctt.fillStyle = "#fff";               //gray 
  ctt.clearRect(0, 0, canvat.width,canvat.height);
  ctt.drawImage(iimg,0,0,600,500); //Sx,Sy,WSx,HSy,Tx,Ty,WTx,HTy   (Source Target Width  Heigth)
  for(let i=0;i<ind.length;i++){
    drawTriangle(i);  
  }
  DownloadCanvasAsImage(Hname+".png");
  Part(0);  
}



function DownloadCanvasAsImage(name){
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', name);
//  let canvas = document.getElementById('myCanvas');
  let dataURL = canvat.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
  downloadLink.setAttribute('href',url);
  downloadLink.click();
}




function saveTxt(cnf,txt,name){  // cloned in DownloadTxt(cnf,txt,name)
if(confirm(cnf) == true) {
  var textFileAsBlob = new Blob([txt], {type:'text/plain'});
  var downloadLink = document.createElement("a");
  downloadLink.download = name;
  window.URL = window.URL || window.webkitURL;
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  document.body.appendChild(downloadLink);
  downloadLink.click();
} 
}

function saveTxt_new(cnf,txt,name){
if(confirm(cnf) == true) {saveFile(txt);}
}

async function saveFile(s) {
var myBlob = new Blob([s], {type: "text/plain"});
const fileHandle = await window.showSaveFilePicker({
  types: [{
    d0escription: "Text file",
    accept: {"text/plain": [".js"]}
  }]
});
const fileStream = await fileHandle.createWritable();
await fileStream.write(myBlob);
await fileStream.close();
}

function Zoom(v){
  document.getElementById("YSld").value=yom;
//  ZoomY(yom);

  document.getElementById("ZoomSld").value=v;
  if(document.getElementById("OptBones").value==-1){
       zske=zom-v;
       if(camTy==0){camera.setPosition(new BABYLON.Vector3(0,1,zske));}
    //   else{        camera.setTarget(BABYLON.Vector3.Zero());}
   }
  else{zmsh=zom-v;zmsh=v/50+.1;
       if(camTy==0){camera.setPosition(new BABYLON.Vector3(0,1,zmsh));}
  //     else{        camera.setTarget(BABYLON.Vector3.Zero());}
  }  
}

function ZoomY(v){
  yom=v;
  document.getElementById("YSld").value=yom;
  v=-Number(v);
  let p=new BABYLON.Vector3(0,0,0);
  let b=true;
/*
  do{p.addInPlace(Bdt[prt][0]);
    if(Bdt[prt][4]==0){b=false;}else{prt=Bdt[prt][4];}} //  if index=0   ????
  while(b); 
 */
  p=new BABYLON.Vector3(parseInt(p.x*100)/100,v+parseInt(p.y*100)/100,parseInt(p.z*100)/100);
  if(camTy==0){camera.setTarget(p);}
}

function Speed(v){speed=v;}

function changeImg(domImg,srcImage){
  var img = new Image();
  img.onload = function()
  {domImg.src = this.src;};
  img.src = srcImage;
}

function chageImg(domImg,srcImage){    // aggiornare ed eliminare
  var img = new Image();
  img.onload = function()
  {domImg.src = this.src;};
  img.src = srcImage;
}

function drawTriangle(b){
  //-----------------------------------draw triangle
  ctt.strokeStyle="#000";
  for(let i=0;i<ind[b].length/3;i++){
    ctt.beginPath();
    ctt.moveTo(auv[ind[b][i*3  ]*2],auv[ind[b][i*3  ]*2+1]+4);
    ctt.lineTo(auv[ind[b][i*3+1]*2],auv[ind[b][i*3+1]*2+1]+4);
    ctt.lineTo(auv[ind[b][i*3+2]*2],auv[ind[b][i*3+2]*2+1]+4);
    ctt.lineTo(auv[ind[b][i*3  ]*2],auv[ind[b][i*3  ]*2+1]+4);
    ctt.stroke();
  }
}


function selwfr(){SkeMat.wireframe=!SkeMat.wireframe;}

function Db2(v){return parseInt(v*100)/100;}

function selpnt(){pnt=!pnt;sph.setEnabled(pnt);
  for(var i=0;i<spp.length;i++){
    spp[i].setEnabled(pnt);}
}    

//function (filename,ske){
  let objectUrl;

function SaveSkelBabylon(filename, scene) {
  if (objectUrl) {window.URL.revokeObjectURL(objectUrl);}
  const serializedScene = BABYLON.SceneSerializer.Serialize(scene);
  const strScene = JSON.stringify(serializedScene);
  if (filename.toLowerCase().lastIndexOf(".babylon") !== filename.length - 8 || filename.length < 9) {
    filename += ".babylon";}
  const blob = new Blob([strScene], { type: "octet/stream" });
  objectUrl = (window.webkitURL || window.URL).createObjectURL(blob);
  const link = window.document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  const click = document.createEvent("MouseEvents");
  click.initEvent("click", true, false);
  link.dispatchEvent(click);
}


function selSph(w){          // set red cursor
  crpos+=w;
  if(crpos<=Bdt[prt][1]){crpos=Bdt[prt][1];}                  // bottom limit in to current bone
  if(crpos>=Bdt[prt][2]){crpos=Bdt[prt][2];}                  // top    limit in to current bone
  bickm(false,true);
//vrtx.style.backgroundColor="#faa";                          // casella 3d positions
//vrtx.value=pos[crpos*3]+" , "+pos[crpos*3+1]+" , "+pos[crpos*3+2];
}


function pickm(){
  let n;
  let pickInfo = scene.pick(scene.pointerX,scene.pointerY);
  try{
  n=Number(pickInfo.pickedMesh.name);
  crpos=n;//alert(pickInfo.pickedMesh.name);
  if(crpos){document.getElementById('svt1').value=crpos;}
  bickm(true,true); 
  }catch{};
  
}

function viewTexture(){
  ctt.beginPath();
  ctt.fillStyle = "#ccc";               //gray 
  ctt.strokeStyle = "#000";
  ctt.clearRect(0, 0, canvat.width,canvat.height);
  ctt.rect(0, 0, canvat.width, canvat.height);
  ctt.fill();
  ctt.globalAlpha = 0.4;
  ctt.drawImage(iimg,0,0,600,500); //Sx,Sy,WSx,HSy,Tx,Ty,WTx,HTy   (Source Target Width  Heigth)
  ctt.globalAlpha = 1;
}

function bickm(b,bb){
  let vrtp,vrtq,mirx;
  let npt=0;
  let npm=0;
  let q=crpos*3;
  let p=crpos*2;
  vrtx.style.backgroundColor="#faa";                            // casella 3d positions
  vrtx.value=pos[q]+" , "+pos[q+1]+" , "+pos[q+2];
  vrtm.value="";
  edvx.value=Number(pos[q]);
  edvy.value=Number(pos[q+1]);
  edvz.value=Number(pos[q+2]);
  edpx.value=Number(UVR[p]);
  edpy.value=Number(UVR[p+1]);
  let x1,y1,x,y,z,sx,newmesh=[]; 

  viewTexture();


  drawTriangle(prt);


  for(let i=1;i<5;i++){
    spk[i].value="";spk[i].style.backgroundColor="#fff";
    spm[i].value="";spm[i].style.backgroundColor="#fff";
  }
  vrtm.style.backgroundColor="#fff";
  spm[0].value="";spm[0].style.backgroundColor="#fff";

if(b){ // pick
  vrtp=new BABYLON.Vector3(pos[crpos*3],pos[crpos*3+1],pos[crpos*3+2]);  // absolute bone vertex (pos)
  if(vrtp.equals(new BABYLON.Vector3(0,0,0))){
    spk[0].style.backgroundColor="#f0f"; // (0,0,0)
    spk[0].value="";
    vrtx.style.backgroundColor="#f0f";
    vrtx.value=sph.position.x+" , "+sph.position.y+" , "+sph.position.z;
    return;
  }
//--------------------------------------cursor red
  x1=ofx+UVR[crpos*2]*zox;                // ofx=300    ofy=500    zox=1.5   zoy=1
  y1=ofy-UVR[crpos*2+1]*zoy;
  ctt.fillStyle="#a00";
  ctt.beginPath();
  ctt.arc(x1,y1,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke(); 
//------------------------------------------------------   
  spk[0].style.backgroundColor="#faa"; // (0,0,0)
  spk[0].value=crpos;
  spkE.value=crpos;
  vrtx.style.backgroundColor="#faa";
  vrtx.value=vrtp.x+" , "+vrtp.y+" , "+vrtp.z;
  edvx.value=vrtp.x;
  edvy.value=vrtp.y;
  edvz.value=vrtp.z;
 //----------------------------------
  for(let i=0;i<spp.length;i++){
    spp[i].material=gryMat;                            // all current bone  gray
    for(let j=0;j<spq.length;j++){
      if(spq[j]==spp[i].name){spp[i].material=whiMat;} // all    linked    white
    }
  }
// alert(Bdt[prt][1]); // 161  : Bone data head start
//      spp[crpos-Bdt[prt][1]].material=bluMat;   // set cursor blue
//      spp[crpos-Bdt[prt][1]].material=greMat;   // set cursor green
//      spp[crpos-Bdt[prt][1]].material=redMat;   // set cursor red

  //--------------------------------------------------------------------------------- 
  if(crpos>=Bdt[prt][1]){
    //--------------------------------------------search seams vertex in current bone
    spp[crpos-Bdt[prt][1]].material=redMat;
    for(let i=0;i<spp.length;i++){
      if(spp[i].material==gryMat){
        if(spp[i].position.equals(spp[crpos-Bdt[prt][1]].position)){
          vrtx.style.backgroundColor="#aaf";
          if(npt<4){npt++;}
          spk[npt].value=i+Bdt[prt][1];
          spp[i].material=redMat;            // seams
          spk[npt].style.backgroundColor="#aaf";
          //----2d
          x1=ofx+UVR[(i+Bdt[prt][1])*2]*zox;              
          y1=ofy-UVR[(i+Bdt[prt][1])*2+1]*zoy;
          ctt.fillStyle="#00a";
          ctt.beginPath();
          ctt.arc(x1,y1,6, 0, 2 * Math.PI);
          ctt.fill();
          ctt.stroke();
        }     
      }
      //-------------------------------------search mirror x 
      if(spp[i].position.x!=0){
        mirx=new BABYLON.Vector3(-spp[i].position.x,spp[i].position.y,spp[i].position.z);
        if(mirx.equals(spp[crpos-Bdt[prt][1]].position)){
          spm[npm].value=i+Bdt[prt][1];
          spm[npm].style.backgroundColor="#afa";
          vrtm.style.backgroundColor="#afa";
          for(let m=0;m<spp.length;m++){
            if(spp[m].name==spm[npm].value){spp[m].material=greMat;}
          }
          if(npm<4){npm++;}
          vrtm.value=-pos[q]+" , "+pos[q+1]+" , "+pos[q+2];
          //----2d
          x1=ofx+UVR[(i+Bdt[prt][1])*2]*zox;              
          y1=ofy-UVR[(i+Bdt[prt][1])*2+1]*zoy;
          ctt.fillStyle="#0a0";
          ctt.beginPath();
          ctt.arc(x1,y1,6, 0, 2 * Math.PI);
          ctt.fill();
          ctt.stroke();
        }
      }
    }
  }
  else{
  //--------------------------------------------search seams vertex in parent
    npt=0;      // alert(spq);
    for(let i=0;i<spq.length;i++){
      vrtq=new BABYLON.Vector3(pos[spq[i]*3],pos[spq[i]*3+1],pos[spq[i]*3+2]);
      if(vrtq.equals(vrtp)){
        spk[npt].value=spq[i];
        if(npt==0){spk[npt].style.backgroundColor="#faa";}
        else{      spk[npt].style.backgroundColor="#aaf";}
        for(let j=0;j<spp.length;j++){
          if(spp[j].name==spq[i]){spp[j].material=redMat;}  
        }
        if(npt>0){ // 2d
          x1=ofx+UVR[spq[i]*2]*zox;              
          y1=ofy-UVR[spq[i]*2+1]*zoy;
          ctt.fillStyle="#00a";
          ctt.beginPath();
          ctt.arc(x1,y1,6, 0, 2 * Math.PI);
          ctt.fill();
          ctt.stroke();
        }
        npt++; 
      }     
    
    }

  }  
}
else{ // selSph()  not pick
  //--------------------------------------cursor red
  x1=ofx+UVR[crpos*2]*zox;                // ofx=300    ofy=400    zox=4   zoy=3
  y1=ofy-UVR[crpos*2+1]*zoy;
  ctt.fillStyle="#a00";                
  ctt.beginPath();
  ctt.arc(x1,y1,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke();
//---------------------------------------------set edit current vertex index
  spk[0].style.backgroundColor="#faa"; 
  spk[0].value=crpos;
  spkE.value=crpos;
  vrtx.style.backgroundColor="#faa";
  vrtx.value=pos[crpos*3]+" , "+pos[crpos*3+1]+" , "+pos[crpos*3+2];
  for(let i=0;i<spp.length;i++){
    if(spp[i].material!=whiMat&&spp[i].material!=cyaMat){spp[i].material=gryMat;}
    for(let j=0;j<spq.length;j++){
      if(spq[j]==spp[i].name){spp[i].material=whiMat;} // all    linked    white
    }
  }
  spp[crpos-Bdt[prt][1]].material=redMat; 
  //--------------------------------------------search seems clone vertex 
  for(let i=0;i<spp.length;i++){
    if(spp[i].material==gryMat){
      if(spp[i].position.equals(spp[crpos-Bdt[prt][1]].position)){
      vrtx.style.backgroundColor="#aaf";
      if(npt<4){npt++;}
        spk[npt].value=i+Bdt[prt][1];
        spp[i].material=redMat;            // seems
        spk[npt].style.backgroundColor="#aaf";
        //----2d
        x1=ofx+UVR[(i+Bdt[prt][1])*2]*zox;              
        y1=ofy-UVR[(i+Bdt[prt][1])*2+1]*zoy;
        ctt.fillStyle="#00a";
        ctt.beginPath();
        ctt.arc(x1,y1,6, 0, 2 * Math.PI);
        ctt.fill();
        ctt.stroke();
      }  
      //-------------------------------------search mirror x 
      if(spp[i].position.x!=0){
        mirx=new BABYLON.Vector3(-spp[i].position.x,spp[i].position.y,spp[i].position.z);
        if(mirx.equals(spp[crpos-Bdt[prt][1]].position)){
          spm[npm].value=i+Bdt[prt][1];
          spm[npm].style.backgroundColor="#afa";
          vrtm.style.backgroundColor="#afa";
          for(let m=0;m<spp.length;m++){
            if(spp[m].name==spm[npm].value){spp[m].material=greMat;}
          }
          if(npm<4){npm++;}
          vrtm.value=-pos[q]+" , "+pos[q+1]+" , "+pos[q+2];
          //----2d
          x1=ofx+UVR[(i+Bdt[prt][1])*2]*zox;              
          y1=ofy-UVR[(i+Bdt[prt][1])*2+1]*zoy;
          ctt.fillStyle="#0a0";
          ctt.beginPath();
          ctt.arc(x1,y1,6, 0, 2 * Math.PI);
          ctt.fill();
          ctt.stroke();
        }
      }
    }
  }
}
if(bb){
// select edit type
  if(vrtm.style.backgroundColor=="rgb(170, 255, 170)")  {                    //morrorX
        document.getElementById("selpy1").checked=true;
        document.getElementById("selty2").checked=true;selVertex(2);selPoint(1);}
  else{ document.getElementById("selpy0").checked=true;
    if(vrtx.style.backgroundColor=="rgb(170, 170, 255)"){
        document.getElementById("selty1").checked=true;selVertex(1);}
    else{document.getElementById("selty0").checked=true;selVertex(0);selPoint(0);}
  }
}
}


function Txtr(){
  let x,y,z,r=2,j;
  let x1,y1,z1,rn,an;
  ctt.fillStyle = "#ccc";
  ctt.strokeStyle = "#0c0";
  ctt.clearRect(0, 0, canvat.width,canvat.height);
  ctt.rect(0, 0, canvat.width, canvat.height);
  ctt.fill();
  ctt.moveTo(ofx,0);
  ctt.lineTo(ofx,600);
  ctt.stroke();
//--------;-----------------------------------------------------------
  ctt.fillStyle="#000";
  for(var i=0;i<spp.length;i++){
    x1=ofx+UVR[i*2]*zox;                  // ofx=300    ofy=400   zox=4    zoy=3
    y1=ofy-UVR[i*2+1]*zoy;   
    ctt.beginPath();
    ctt.moveTo(x1,y1);
    ctt.arc(x1,y1,r, 0, 2 * Math.PI);
    ctt.fill();
  }
  drawTriangle(prt);
}


var createScene = function () {
let k,kk,q;  
var scene = new BABYLON.Scene(engine);
//scene.clearColor = new BABYLON.Color4(255, 255, 255, 0);
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-1,1,0), scene);
camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
camera.setPosition(new BABYLON.Vector3(0,8 , zmsh )); // 8: control zoom bones
//camera.setTarget(BABYLON.Vector3.Zero());
camera.attachControl(canvas, true); 
//camera.target=Bdt[prt][0];
SkeMat = new BABYLON.StandardMaterial("", scene);
SkeMat.diffuseTexture = new BABYLON.Texture(inilnk, scene);
SkeMat.diffuseTexture.hasAlpha = true;
SkeMat.backFaceCulling=true;
SkeMat.specularColor=new BABYLON.Color3(0,0,0); 
SkeMat.emissiveColor=new BABYLON.Color3(1,1,1); 
SkeMat.wireframe=false;
//-----------------------------------------mouse pointer mesh
scene.onPointerDown=(e,pickInfo)=>{if(pickInfo.hit){pickm();}}
//-------------------materials
gryMat= new BABYLON.StandardMaterial("gryMat", scene);
gryMat.diffuseColor = new BABYLON.Color3(.5,.5,.5);
redMat= new BABYLON.StandardMaterial("redMat", scene);
redMat.diffuseColor = new BABYLON.Color3(.6,0,0);
greMat= new BABYLON.StandardMaterial("greMat", scene);
greMat.diffuseColor = new BABYLON.Color3(0,1,0);
bluMat= new BABYLON.StandardMaterial("bluMat", scene);
bluMat.diffuseColor = new BABYLON.Color3(0,0,1);
yelMat= new BABYLON.StandardMaterial("yelMat", scene);
yelMat.diffuseColor = new BABYLON.Color3(1,1,0);
cyaMat= new BABYLON.StandardMaterial("cyaMat", scene);
cyaMat.diffuseColor = new BABYLON.Color3(1,0,1);
oraMat= new BABYLON.StandardMaterial("oraMat", scene);
oraMat.diffuseColor = new BABYLON.Color3(1,.5,0);
blaMat= new BABYLON.StandardMaterial("blaMat", scene);
blaMat.diffuseColor = new BABYLON.Color3(0,0,0);
whiMat= new BABYLON.StandardMaterial("whiMat", scene);
whiMat.diffuseTexture= new BABYLON.Texture("../_Script/black&white.png", scene);
rdwMat= new BABYLON.StandardMaterial("rdwMat", scene);
rdwMat.diffuseTexture= new BABYLON.Texture("../_Script/red&white.png", scene);
grwMat= new BABYLON.StandardMaterial("grvMat", scene);
grwMat.diffuseTexture= new BABYLON.Texture("../_Script/green&white.png", scene);
blwMat= new BABYLON.StandardMaterial("blwMat", scene);
blwMat.diffuseTexture= new BABYLON.Texture("../_Script/blue&white.png", scene);
orwMat= new BABYLON.StandardMaterial("orwMat", scene);
orwMat.diffuseTexture= new BABYLON.Texture("../_Script/orange&white.png", scene);
//whiMat.diffuseColor = new BABYLON.Color3(1,1,1);

  sph = BABYLON.MeshBuilder.CreateSphere("sph",{segments:1}, scene);         
  sph.scaling=new BABYLON.Vector3(sphd,sphd,sphd);    // dimensione sfere
//------------compile current bone vertex (gray) 
  let ss="";
  spp=[];                                                       
  k=0;

  for(var i=Bdt[prt][1];i<=Bdt[prt][2];i++){  
    spp[k]=sph.clone();
    spp[k].name=i;
    spp[k].position=new BABYLON.Vector3(pos[i*3],pos[i*3+1],pos[i*3+2]);
    spp[k].material=gryMat;
    k++;
    ss+=(i+",");
  }
//-----------compile current bone vertex linked to skeleton (yellow)
  ss+="\n";
  spq=[];q=0;
  for(let i=0; i<ind[prt].length;i++){ // for each vertex in triangles  in current bone
    kk=ind[prt][i];                    // current vertex 
    if(kk<Bdt[prt][1]){                // if in bones precedent
      dp=false;
      for(let j=0;j<spq.length;j++){if(spq[j]==kk){dp=true;}}  // exclude duplicate
      if(!dp){                         // if is not duplicate
        spp[k]=sph.clone();
        spp[k].name=kk;  
        spp[k].position=new BABYLON.Vector3(pos[kk*3],pos[kk*3+1],pos[kk*3+2]);
        spp[k].material=whiMat;
        spq.push(kk);
        ss+=(kk+",")
        k++;
      }
    }
  }

  //---------set center current bone rotation 
  let f=Bdt[prt][1]*3;
  sph.name="center";
  sph.material=cyaMat;
  sph.scaling=new BABYLON.Vector3(sphd,sphd,sphd);



  Txtr();
  

 //---------------------------------------------------------segnalibri 
  let r=0;
//-----------------------------------------------------------------------------------------------------
let nor=[];
BABYLON.VertexData.ComputeNormals(pos, ind[prt], nor);
var vertexData = new BABYLON.VertexData();
vertexData.positions = pos; 
vertexData.indices = ind[prt];
vertexData.normals = nor;
vertexData.uvs = uvs;
Cat = new BABYLON.Mesh(imgname, scene);
vertexData.applyToMesh(Cat,true);
Cat.material=SkeMat;
//-----------------------------------------------------------Edit
for(var i=0;i<spp.length;i++){spp[i].parent=Cat;}
vrtx.style.backgroundColor="#faa";                          // casella 3d positions
vrtx.value=pos[crpos*3]+" , "+pos[crpos*3+1]+" , "+pos[crpos*3+2];
scene.clearColor = new BABYLON.Color4(.8,.8,.8, 1);

return scene;
};



var createSkeletonViewer = function(skeleton, mesh, thickness, color, scene) {
  var viewer = new BABYLON.Debug.SkeletonViewer(skeleton, mesh, scene, false, 1, {
    displayMode: BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERE_AND_SPURS,
    returnToRest: false
  });
  viewer.changeDisplayOptions('midStepFactor', thickness);
  viewer.debugMesh.material = new BABYLON.StandardMaterial('skeleton', scene);
  if (color) {viewer.debugMesh.material.diffuseColor = color;}
  return viewer;
}


function ShowInspector(){ 
  scene.debugLayer.show({
      embedMode: true,
  });
}


function SelectFace(evt){   //  canvat 2D
}


function GetOneFace(){//  t1  t2  t3
let x1,y1,z1,x2,y2,z2,x3,y3,z3;
let m,n;
let p1=[],p2=[],p3=[]; 
let t=[]; 
  //alert(t1+"   "+t2+"   "+t3+"   "+t4);
  x1=pos[t1*3];y1=pos[t1*3+1];z1=pos[t1*3+2]; 
  x2=pos[t2*3];y2=pos[t2*3+1];z2=pos[t2*3+2];
  x3=pos[t3*3];y3=pos[t3*3+1];z3=pos[t3*3+2];
  // compile list of clone  p1  &&  clone p2 
  for(let i=0;i<ind[prt].length/3;i++){       // for each face
    for(let k=0;k<3;k++){                     // foe each vertex in face
      m=ind[prt][i*3+k];
      if(x1==pos[m*3]&&y1==pos[m*3+1]&&z1==pos[m*3+2]){p1.push(i);}// detect faces  <--p1 
      if(x2==pos[m*3]&&y2==pos[m*3+1]&&z2==pos[m*3+2]){p2.push(i);}// detect faces  <--p2
      if(x3==pos[m*3]&&y3==pos[m*3+1]&&z3==pos[m*3+2]){p3.push(i);}// detect faces  <--p3
    }
  }
  //  alert(t1+"  "+t2+"  "+t3+"\n"+p1+"\n"+p2+"\n"+p3);
  t=-1; // not found
  // detect face
  for(let i=0;i<p1.length;i++){
    for(let k=0;k<p2.length;k++){
      for(let h=0;h<p3.length;h++){
        if(p1[i]==p2[k]&&p1[i]==p3[h]){t=p3[h];break} // find !!
      }
    }
  }
return t;  
}


function GetTwoFaces(){ //  t1  t2
let x1,y1,z1,x2,y2,z2;
let m,n;
let p1=[],p2=[]; 
let t=[]; 
  //alert(t1+"   "+t2+"   "+t3+"   "+t4);
  x1=pos[t1*3];y1=pos[t1*3+1];z1=pos[t1*3+2]; 
  x2=pos[t2*3];y2=pos[t2*3+1];z2=pos[t2*3+2];
  // compile list of clone  p1  &&  clone p2 
  for(let i=0;i<ind[prt].length/3;i++){       // for each face
    for(let k=0;k<3;k++){                     // foe each vertex in face
      m=ind[prt][i*3+k];
      if(x1==pos[m*3]&&y1==pos[m*3+1]&&z1==pos[m*3+2]){p1.push(i);}// detect vertex <--p1 
      if(x2==pos[m*3]&&y2==pos[m*3+1]&&z2==pos[m*3+2]){p2.push(i);}// detect vertex <--p2
    }
  }
  // detect couple of contigue face
  for(let i=0;i<p1.length;i++){
    for(let k=0;k<p2.length;k++){
      if(p1[i]==p2[k]){t.push(p1[i]);} // add triangle detected by p1&&p2
    }
  }
  document.getElementById('svt5').value=t[0];
  document.getElementById('svt6').value=t[1];
//  alert(t);

/*

  // detect lateral vertex --> t3, t4
  for(let i=0;i<3;i++){
    if(ind[prt][t[0]*3+i]==t1){m=i;}
    if(ind[prt][t[0]*3+i]==t2){n=i;}
  }

/*
  // ascending order
  if(t[1]<t[0]){m=t[1];t[1]=t[0];t[0]=m;}// swap
  // delete contiguous faces
  ind[prt].splice(t[0]*3,3);     // I,II,III
  ind[prt].splice((t[1]-1)*3,3); // I,II,III
  alert(ind[prt]);
/*  
  ind[prt].splice(t[1]*3,3); // I,II,III
  Part(prt);OptEdit('EFc');ViewVertices();
*/
}
  
function DelFace(){ //---------------------del face  ok:3.0
  let FaceFnd=document.getElementById('svq1').value;
//  if(confirm("Delete this Face ?")){
    ind[prt].splice(FaceFnd*3,3);
    fct=[-1,-1]; // reset 
//  }
  Part(prt);OptEdit('EFc');ViewVertices();
}

function RevFace(){ //---------------------reverse normal ok:3.0
  let FaceFnd=document.getElementById('svq1').value;
  let m=ind[prt][FaceFnd*3];
  ind[prt][FaceFnd*3]=ind[prt][FaceFnd*3+1];
  ind[prt][FaceFnd*3+1]=m;
  Part(prt);OptEdit('EFc');ViewVertices();
}

function AddCent(){
let p,x,y,z,u,v; 
// renum current bone vertice index end
Bdt[Number(prt)][2]++;
p=Bdt[Number(prt)][2];  // new vertex
// renum start and end of bone vertices indexes
for(let i=Number(prt)+1;i<Bdt.length;i++){
  Bdt[i][1]++;Bdt[i][2]++;
  // renum all vertex in next bones indices over or equal to p
  for(let k=0;k<ind[i].length;k++){
    if(ind[i][k]>=p){ind[i][k]++;}
  }
}
let t=document.getElementById('svq1').value;   // first facet
let t1=document.getElementById('svt2').value;
let t2=document.getElementById('svt3').value;
let t3=document.getElementById('svt4').value;
let f=[],s=[],t4;                                       
f[0]=t1;f[1]=t2;f[2]=t3;                       // cloned t1,t2,t3 for detect t4 
let q=document.getElementById('svq2').value;   // second near facet
s[0]=document.getElementById('svt5').value;
s[1]=document.getElementById('svt6').value;
s[2]=document.getElementById('svt7').value;
for(k=0;k<3;k++){
//alert(f+"    "+s[k]+"    "+f.includes(s[k]));

if(!f.includes(s[k])){t4=s[k];break;}}          // detect t4



  alert(t1+"  "+t2+"  "+t3+"  "+t4);  
x=parseInt((pos[t1*3  ]+pos[t2*3  ]+pos[t3*3  ]+pos[t4*3  ])/4*100)/100;
y=parseInt((pos[t1*3+1]+pos[t2*3+1]+pos[t3*3+1]+pos[t4*3+1])/4*100)/100;
z=parseInt((pos[t1*3+2]+pos[t2*3+2]+pos[t3*3+2]+pos[t4*3+2])/4*100)/100;
u=parseInt((UVR[t1*2  ]+UVR[t2*2  ]+UVR[t3*2  ]+UVR[t4*2  ])/4*100)/100;
v=parseInt((UVR[t1*2+1]+UVR[t2*2+1]+UVR[t3*2+1]+UVR[t4*2+1])/4*100)/100;
// add new vertice p
pos.splice(p*3,0,x,y,z);
UVR.splice(p*2,0,u,v); 

alert(p+"  "+t1+"  "+t2+"  "+t3+"  "+t4);

ind[prt][t*3]=t1;ind[prt][t*3+1]=t2;ind[prt][t*3+2]= p;//---------update I  facet t :  p,t1,t2
ind[prt][q*3]= p;ind[prt][q*3+1]=t2;ind[prt][q*3+2]=t3;//---------update II facet q : t2,t3, p
ind[prt].push(t3);ind[prt].push(t4);ind[prt].push( p);  //---------new       facet   : t4,t1, p
ind[prt].push( p); ind[prt].push(t4);ind[prt].push(t1); //---------new       facet   :  p,t3,t4 
/*
ind[prt][t*3]=p ;ind[prt][t*3+1]=t4;ind[prt][t*3+2]=t3;//---------update I  facet t :  p,t1,t2
ind[prt][q*3]=t3;ind[prt][q*3+1]=t1;ind[prt][q*3+2]=p ;//---------update II facet q : t2,t3, p
ind[prt].push( p);ind[prt].push(t1);ind[prt].push(t2);  //---------new       facet   : t4,t1, p
ind[prt].push(t2); ind[prt].push(t4);ind[prt].push( p); //---------new       facet   :  p,t3,t4 
*/
//-------------------------refresh
Go(.3) ;Part(prt);OptEdit('EFc');//ViewVertices();
}


function DiagoSwap(){   //              Counterclockwise ?   ok:3.0  
let t=document.getElementById('svq1').value;   // first facet
let t1=document.getElementById('svt2').value;
let t2=document.getElementById('svt3').value;
let t3=document.getElementById('svt4').value;
let f=[],s=[],t4;                                       
f[0]=t1;f[1]=t2;f[2]=t3;                       // cloned t1,t2,t3 for detect t4 
let u=document.getElementById('svq2').value;   // second near facet
s[1]=document.getElementById('svt5').value;
s[2]=document.getElementById('svt6').value;
s[3]=document.getElementById('svt7').value;
for(k=0;k<3;k++){if(!f.includes(s[k])){t4=s[k];}}          // detect t4

//ind[prt][t*3]=t2;ind[prt][t*3+1]=t3;ind[prt][t*3+2]=t4;
//ind[prt][u*3]=t4;ind[prt][u*3+1]=t1;ind[prt][u*3+2]=t2;
ind[prt][t*3]=t1;ind[prt][t*3+1]=t2;ind[prt][t*3+2]=t4;
ind[prt][u*3]=t4;ind[prt][u*3+1]=t3;ind[prt][u*3+2]=t1;

//-------------------------refresh
Go(.3) ;Part(prt);OptEdit('EFc');ViewVertices();
}


function TriFace(){ //---------------------add new vertex in baricenter ok 3.0
let p,x,y,z,x2,y2;
let v,t,t1,t2,t3;
// renum current bone vertice index end
Bdt[Number(prt)][2]++;
p=Bdt[Number(prt)][2];  // new vertex
// renum start and end of bone vertices indexes
for(let i=Number(prt)+1;i<Bdt.length;i++){
  Bdt[i][1]++;Bdt[i][2]++;
  // renum all vertex in next bones indices over or equal to p
  for(let k=0;k<ind[i].length;k++){
    if(ind[i][k]>=p){ind[i][k]++;}
  }
}
t1=document.getElementById('svt2').value; 
t2=document.getElementById('svt3').value;
t3=document.getElementById('svt4').value;
//-----set baricenter
x=parseInt((pos[t1*3  ]+pos[t2*3  ]+pos[t3*3  ])/3*100)/100;
y=parseInt((pos[t1*3+1]+pos[t2*3+1]+pos[t3*3+1])/3*100)/100;
z=parseInt((pos[t1*3+2]+pos[t2*3+2]+pos[t3*3+2])/3*100)/100;
//-----UVR
x2=parseInt((UVR[t1*2]+UVR[t2*2]+UVR[t3*2])/3);
y2=parseInt((UVR[t1*2+1]+UVR[t2*2+1]+UVR[t3*2+1])/3);
//--------------------add vertices
pos.splice(p*3,0,x,y,z);
UVR.splice(p*2,0,x2,y2);
//-------------------get face t1,t2,t3
for(let i=0;i<ind[prt].length/3;i++){
  v=0;
  if(ind[prt][i*3]==t1||ind[prt][i*3+1]==t1||ind[prt][i*3+2]==t1){v=1;}
  if(ind[prt][i*3]==t2||ind[prt][i*3+1]==t2||ind[prt][i*3+2]==t2){v+=2;}
  if(ind[prt][i*3]==t3||ind[prt][i*3+1]==t3||ind[prt][i*3+2]==t3){v+=4;}
  if(v==7){t=i;break;} 
}
ind[prt][t*3]=p;ind[prt][t*3+1]=t1;ind[prt][t*3+2]=t2;//------------------update face p,t1,t2
ind[prt].push(p);ind[prt].push(t2);ind[prt].push(t3); //------------------new    face p,t2,t3
ind[prt].push(p);ind[prt].push(t3);ind[prt].push(t1); //------------------new    face p,t3,t1 
//-------------------------refresh
Go(.3) ;Part(prt);OptEdit('EFc');//ViewVertices();
//ViewVertices();
}


function AddFace(){ //----------------------add face in last position of ind[prt]
  if(confirm("Add this Face ?")){
    ind[prt].push(document.getElementById('svt1').value);
    ind[prt].push(document.getElementById('svt2').value);
    ind[prt].push(document.getElementById('svt3').value);
  }
  //rom=Cat.rotation;
  Part(prt);

  OptEdit('EFc');ViewVertices();
}

function getDist2(x,y,m,n){return ((x-m)*(x-m)+(y-n)*(y-n));}

function ViewVertices(){// alert("ViewVertices") ;        //alert(t1+"  "+t2+"  "+t3+"   "+t4);
  ctt.beginPath();
  ctt.fillStyle="#a00";
  ctt.arc(uvs[t1*2]*600,500-uvs[t1*2+1]*500,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke();
  ctt.beginPath();
  ctt.fillStyle="#0a0";
  ctt.arc(uvs[t2*2]*600,500-uvs[t2*2+1]*500,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke();
  ctt.beginPath();
  ctt.fillStyle="#00a";
  ctt.arc(uvs[t3*2]*600,500-uvs[t3*2+1]*500,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke();
  ctt.beginPath();
  ctt.fillStyle="#fa0";
  ctt.arc(uvs[t4*2]*600,500-uvs[t4*2+1]*500,6, 0, 2 * Math.PI);
  ctt.fill();
  ctt.stroke();
  // reset default ball color;
  for(let i=0;i<spp.length;i++){
    spp[i].material=gryMat;                            // all current bone  gray
    for(let j=0;j<spq.length;j++){
      if(spq[j]==spp[i].name){
        spp[i].material=whiMat;                       // all    linked     white
        switch(spq[j]){                                // cursor in linked  vertex
          case t1: spp[i].material=rdwMat;break;           
          case t2: spp[i].material=grwMat;break;
          case t3: spp[i].material=blwMat;break;
          case t4: spp[i].material=orwMat;break;
        }
      }
    }
  }
  try{                                                 // cursor in bone vertex
  if(t1>0){spp[t1-Bdt[prt][1]].material=rdwMat;} 
  if(t2>0){spp[t2-Bdt[prt][1]].material=grwMat;}
  if(t3>0){spp[t3-Bdt[prt][1]].material=blwMat;}
  if(t4>0){spp[t4-Bdt[prt][1]].material=orwMat;}
  }catch(e){}


}


function SaveJModel(b){;
let k,r,j,f,q,s;
//let url='"http://localhost:8080/Babylon-3/Animation/'+Hname+'/textures/texture.png",\n';   //url localhost
let url='"textures/texture.png",\n';  
let sp="                                              ";
let nb=Ske.bones.length; //bones  number
let nf =document.getElementById("Nfrm").value;        //frames
let nfs=document.getElementById("Nfrs").value;        //frames/sec 
if(b){s='var modelData={\n\n'}else{s="";}             // for esporting file .js
s+=   
'{"materials":[{"diffuseTexture":{\n'+
'"url ":'+url+
'"name":'+url+
'"hasAlpha":true},"ambient":[0,0,0],"diffuse":[1,1,1],"specular":[0,0,0],"emissive":[1,1,1],'+
'"id":"materialID"}],\n\n'+

'"skeletons":[{"name":"Armature","id":0,\n'+
'"bones":[\n\n';

f= AnimationFrames(false); // frames
s+=f;

s+='"meshes":[{\n'+
'"materialId":"materialID","billboardMode":0,"position":[0,0,0],"rotation":[0,0,0],\n'+
'"scaling":[1,1,1],"isEnabled":true,"isVisible":true,"skeletonId":0,"numBoneInfluencers":1,\n\n'+
'"positions":[\n';//-------------------------------------------------------------------
for(let b=0;b<Bdt.length;b++){                                     // for each bone
  r="";k=0;
//-----------------------------------------------------
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){                           // for each vertex in current bone   
    r+=formatP(pos[i*3],pos[i*3+1],pos[i*3+2]);k++;
    if(i*3==pos.length-3){                                         // if last global vertex
      r+=("],\n\n");                                               // end  
      s+=r;r="";
    }
    else{
      if(k==4){                                                    // if row  end
        r+=(",\n");                                                // continue in next row
        k=0;s+=r;r="";}                      
      else{
        if(i==Bdt[b][2]){                                          // if last vertex in current bone
          r+=",\n";
          k=0;s+=r;r="";}
        else{r+=",       ";}  
      }                                              
    }
  }
}
s+='"normals":[\n';//-----------------------------------------------------------------
j=0;
for(let i=0;i<nor.length;i++){
  r=""+parseInt(nor[i]*1000)/1000;
  s+=(r+sp.substring(0,8-r.length));
  if(i<nor.length-1){s+=',';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='],\n';
s+='\n"uvs":[\n';   //-----------------------------------------------------------------
j=0;
for(let i=0;i<uvs.length;i++){
  r=""+parseInt(uvs[i]*1000)/1000;
  s+=(r+sp.substring(0,8-r.length));
  if(i<uvs.length-1){s+=',';}else{s+='],\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='\n"indices":[\n';   //-----------------------------------------------------------------
j=0;
for(let i=0;i<Gid.length;i++){
  r=""+Gid[i];
  s+=(r+sp.substring(0,8-r.length));
  if(i<Gid.length-1){s+=',';}else{s+='],\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='\n"matricesWeights":[\n';//------------------------------------------------------------
j=0;
q=0;
for(let i=0;i<skWe.length;i++){
  r=""+skWe[i];
  s+=(r+sp.substring(0,2-r.length));
  if(i<skWe.length-1){s+=',';}else{s+='],\n';}
  j++;q++;
  if(q==4){s+="        ";q=0;}
  if(j==16){j=0;s+='\n';}
}

s+='"matricesIndices":[\n';//------------------------------------------------------------
j=0;
for(let i=0;i<skIn.length/4;i++){
  r=""+skIn[i*4];
  s+=(r+sp.substring(0,19-r.length));
  if(i<skIn.length/4-1){s+=',';}else{s+=']\n';}
  j++;
  if(j==4){j=0;s+='\n';}
}
s+='}]\n';
s+='}\n';

if(b){Download_Txt("Save DataModel.js (for exporting js.file) ?",s,"DataModel.js");}
else{
//----------------------------------new file babylon 
  try{scene.dispose();}catch{}
  //-----------------------------------------create scene 
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(.8,.8,.8, 1);
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,100,0), scene);
  camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 4, 0), scene);
  let Mes,Ske;
  
//  BABYLON.SceneLoader.ImportMesh("", "", 'data:' + JSON.stringify(modelData), scene,
  BABYLON.SceneLoader.ImportMesh("", "", 'data:' + s, scene,
    function (meshes, particleSystems, skeletons) {Mes=meshes[0];Ske=skeletons[0];  
  });

  if (confirm('Do you want to download '+Hname+'.babylon')){SaveSkelBabylon(Hname, scene);}
  Go(.3); // return to editor
}
}



function SaveJModel_old(){
let k,r,j;
let sp="             ";
let nb=Ske.bones.length; //bones  number
let nf=Anmt[2];          //frames number
let s='var modelData={\n\n'+  
'"materials":[{"diffuseTexture":{\n'+
'"url":"textures/texture.png",\n'+
'"name":"textures/texture.png",\n'+
'"hasAlpha":true},"ambient":[0,0,0],"diffuse":[1,1,1],"specular":[0,0,0],"emissive":[1,1,1],'+
'"id":"materialID"}],\n\n'+

'"skeletons":[{"name":"Armature","id":0,\n'+
'"bones":[\n\n';

for(let i=0;i<nb;i++){
  s+='{"name":"'+Bdt[i][3]+'","index":'+i+',\n'+
  '"matrix":[   1,   0,   0,   0,         0,   1,   0,   0,         0,   0,   1,   0,       '+
  formatPL(4,Bdt[i][0].x,Bdt[i][0].y,Bdt[i][0].z)+',    1],\n'+
  '"parentBoneIndex":'+Bdt[i][4]+',\n'+
  '"animation":\n'+
  '{"name":"anim","property":"_matrix","dataType":3,"framePerSecond":'+nfs+',"loopBehavior":1,\n'+
  '"keys":[\n';
  if(i==0){s+=''+
    '{"frame": 0,"values":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},\n'+
    '{"frame":'+(Anmt[2]-1)+',"values":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}\n';
  }
  s+=']}}';
  if(i<nb-1){s+=',\n';}else{s+='\n';}
  s+='\n';
}  
s+='],\n"ranges":[{"name":"ArmatureAction","from":0,"to":'+(Anmt[2]-1)+'}]}],\n\n';

s+='"meshes":[{\n'+
'"materialId":"materialID","billboardMode":0,"position":[0,0,0],"rotation":[0,0,0],\n'+
'"scaling":[1,1,1],"isEnabled":true,"isVisible":true,"skeletonId":0,"numBoneInfluencers":1,\n\n'+
'"positions":[\n';//-------------------------------------------------------------------
for(let b=0;b<Bdt.length;b++){                                     // for each bone
  r="";k=0;
//-----------------------------------------------------
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){                           // for each vertex in current bone   
    r+=formatP(pos[i*3],pos[i*3+1],pos[i*3+2]);k++;
    if(i*3==pos.length-3){                                         // if last global vertex
      r+=("],\n\n");                                               // end  
      s+=r;r="";
    }
    else{
      if(k==4){                                                    // if row  end
        r+=(",\n");                                                // continue in next row
        k=0;s+=r;r="";}                      
      else{
        if(i==Bdt[b][2]){                                          // if last vertex in current bone
          r+=",\n";
          k=0;s+=r;r="";}
        else{r+=",       ";}  
      }                                              
    }
  }
}
s+='"normals":[\n';//-----------------------------------------------------------------
j=0;
for(let i=0;i<nor.length;i++){
  r=""+parseInt(nor[i]*1000)/1000;
  s+=(r+sp.substring(0,8-r.length));
  if(i<nor.length-1){s+=',';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='],\n';
s+='"uvs":[\n';   //-----------------------------------------------------------------
j=0;
for(let i=0;i<uvs.length;i++){
  r=""+parseInt(uvs[i]*1000)/1000;
  s+=(r+sp.substring(0,8-r.length));
  if(i<uvs.length-1){s+=',';}else{s+='],\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='"indices":[\n';   //-----------------------------------------------------------------
j=0;
for(let i=0;i<Gid.length;i++){
  r=""+Gid[i];
  s+=(r+sp.substring(0,8-r.length));
  if(i<Gid.length-1){s+=',';}else{s+='],\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='"matricesWeights":[\n';//------------------------------------------------------------
j=0;
for(let i=0;i<skWe.length;i++){
  r=""+skWe[i];
  s+=(r+sp.substring(0,8-r.length));
  if(i<skWe.length-1){s+=',';}else{s+='],\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}s+='"matricesIndices":[\n';//------------------------------------------------------------
j=0;
for(let i=0;i<skIn.length/4;i++){
  r=""+skIn[i*4];
  s+=(r+sp.substring(0,8-r.length));
  if(i<skIn.length/4-1){s+=',';}else{s+=']\n';}
  j++;
  if(j==10){j=0;s+='\n';}
}
s+='}]\n';
s+='}\n';

Download_Txt("Download ?",s,"DataModel.js");
}


function Download_Txt(cnf,txt,name){
if(confirm(cnf) == true) {
  var textFileAsBlob = new Blob([txt], {type:'text/plain'});
  var downloadLink = document.createElement("a");
  downloadLink.download = name;
  window.URL = window.URL || window.webkitURL;
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  document.body.appendChild(downloadLink);
  downloadLink.click();
} 
}

function SetBall(v){
  document.getElementById("inpb").value=v;
  sphd=Number(v)/100;}

function CloneBonesMirrorX(){
  //alert(pos.length/3+"  "+UVR.length/2);
  let n,m,p,q,r,t,u,v;
  r=pos.length/3-1; 
  //alert(r);     // vertex number ini
  for(let i=0;i<Bdt.length;i++){
    if(Bdt[i][6]>=0){  // bone target
      t=Bdt[i][6];     // bone source
      p=Bdt[t][1];     // vertex ini 
      q=Bdt[t][2];     // vertex end
      n=q-p;           // vertex number
 //     alert(i+"  "+p+"  "+q);
      for(let k=p;k<=q;k++){
      //---------------------add pos
        pos.push(-pos[k*3]  );  // mirrorX
        pos.push( pos[k*3+1]);  // y
        pos.push( pos[k*3+2]);  // z
      //---------------------add UVR
        UVR.push(-UVR[k*2]  );   // X
        UVR.push( UVR[k*2+1]);   // y 
      }
       //---------------------compile Bdt
      v=Bdt[t][1];             // source vertex ini 
      u=r+1;                   // target vertex ini
      Bdt[i][1]=u;           
      r+=(n+1);
      Bdt[i][2]=r;             // target vertex end
    //---------------------add Ind
      m=ind[t].length/3;          // source bone faces indices number
      u=u-v;
      for(let h=0;h<m;h++){
        ind[i].push(ind[t][h*3]+u);
        ind[i].push(ind[t][h*3+2]+u);  // reverse mirror face
        ind[i].push(ind[t][h*3+1]+u);
      }
    }
  }
 }


//--------------------------------------------------trasformazioni
function accorciaavanbraccio(){
  for(let i=347;i<397;i++){pos[i*3+1]+=.8;}

}


function riducitesta(){
  let k=.9;
  let y1,x,y,z;
  y1=pos[134*3+1];
  for(let i=134;i<247;i++){
    x=parseInt(pos[i*3]*k*100)/100;             pos[i*3  ]=x;
    z=parseInt(pos[i*3+2]*k*100)/100;           pos[i*3+2]=z;
    y=y1+parseInt((pos[i*3+1]-y1)*k*100)/100;   pos[i*3+1]=y
  }
}

function avanzatesta(){
  for(let i=111;i<247;i++){pos[i*3+2]-=.3;}
}


function abbassacollo(){
  let a;
  for(let i=0;i<pos.length/3;i++){
    if(pos[i*3+1]>5.6){pos[i*3+1]-=.3}
  }
  for(let i=0;i<pos.length/3;i++){
    if(pos[i*3+1]>6.1){pos[i*3+1]-=.2}
  }
} 

function resizeAll(){
  let a;
  for(let i=0;i<pos.length;i++){
    a=parseInt(pos[i]*.2*100)/100;
    pos[i]=a;}
}

function abbassabraccio(){
  for(let i=325;i<397;i++){pos[i*3+1]-=.3;}
}

function avvicinabraccio(){
  for(let i=325;i<397;i++){pos[i*3]-=.3;}
}


function accorciabusto(){
  for(let i=0;i<397;i++){
    if(pos[i*3+1]>2){
       pos[i*3+1]-=.3;
       if(pos[i*3+1]>3){
         pos[i*3+1]-=.5;
       }
    }
  }
  alert("accociabusto");
}

function allungalagamba(){
  for(let i=250;i<310;i++){
   pos[i*3+1]-=.5;
   if(i>266){pos[i*3+1]-=.5;}
  }
}

function ruotapolpaccioXY(){
  let alfa=-.1  ,a=.88,b=-2.4,x1,y1,z1,x2,y2,z2; // a,b  punto di rotazione xy
  for(let i=267;i<310;i++){
    x1=pos[i*3];y1=pos[i*3+1];z1=pos[i*3+2];
    x2=parseInt(( (x1-a)*Math.cos(alfa)+(y1-b)*Math.sin(alfa)+a)*100)/100;
    y2=parseInt((-(x1-a)*Math.sin(alfa)+(y1-b)*Math.cos(alfa)+b)*100)/100;
    z2=z1;
    pos[i*3]=x2;pos[i*3+1]=y2;pos[i*3+2]=z2;
  }
}

function ruotapiedeXZ(){
  let alfa=-.3  ,a=1.15,b=.36,x1,y1,z1,x2,y2,z2; // a,b  punto di rotazione xz 
  for(let i=274;i<310;i++){
    x1=pos[i*3];y1=pos[i*3+1];z1=pos[i*3+2];
    x2=parseInt(( (x1-a)*Math.cos(alfa)+(z1-b)*Math.sin(alfa)+a)*100)/100;
    y2=y1;
    z2=parseInt((-(x1-a)*Math.sin(alfa)+(z1-b)*Math.cos(alfa)+b)*100)/100;
    pos[i*3]=x2;pos[i*3+1]=y2;pos[i*3+2]=z2;
  }
}

function abbassaUVocchi(){
  let a=[173,178,174,177,175,176,180,183,169,179,184,181,182,164,165,166,172];
  for(let i=0;i<a.length;i++){
    UVR[a[i]*2+1]-=7;
  }
}  

function ingrassa(k){
  for(let i=0;i<pos.length/3;i++){
    if(Math.abs(pos[i*3])>.11){pos[i*3]*=k;}
    pos[i*3+2]*=(k+.05);
  }
}