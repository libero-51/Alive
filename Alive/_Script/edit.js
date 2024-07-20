let $Ver="3.0";
let selVrtOpt=0;
let selPntOpt=0;
let fct=[-1,-1]; // cursor facets

function selVertex(v){selVrtOpt=v;} // 0:one,  1:clone,  2:all


function selPoint(v){selPntOpt=v;}  // 0:one,  1:mirrorX


function Edit2dVertex(c,v){
  switch(selPntOpt){                           
    case 0:Edit2V(0,c,v);break;                   // one
    case 1:Edit2V(0,c,v);Edit2V(-1,c,v);break;    // mirrorX
  }
  ConvertUVR();
  bickm(false,false);
}

function Edit2V(b,c,v){
  let sf,i,x,y,vx=v;
  if(b==-1){b=0;vx=-v;                                             // mirrorX
    x=parseInt((Number(edpx.value)-v)*100)/100;
    for(let j=0;j<spp.length;j++){if(spp[j].name==spm[b].value){sf=j;}}
    i=Number(spm[b].value);}  
  else{
    x=parseInt((Number(edpx.value)+v)*100)/100;
    for(let j=0;j<spp.length;j++){if(spp[j].name==spk[b].value){sf=j;}}
    i=Number(spk[b].value);}  
  y=parseInt((Number(edpy.value)+v)*100)/100;

  switch(c){
    case 0:edpx.value=""+x;UVR[i*2  ]+=vx;UVR[i*2  ]=parseInt(UVR[i*2  ]*100)/100;break;  // X
    case 1:edpy.value=""+y;UVR[i*2+1]+=v ;UVR[i*2+1]=parseInt(UVR[i*2+1]*100)/100;break;  // Y
  }
}


function Edit3dVertex_old(c,v){
  switch(selVrtOpt){                           
    case 0:Edit3V(0,c,v);break;                                                // one
    case 1:for(let b=0;b<5;b++){if(spk[b].value!=""){Edit3V(b,c,v)}};break;    // all
    case 2:Edit3V(0,c,v);Edit3V(-1,c,v);                             break;    // mirrorX
  }
}
function Edit3dVertex(c,v){
  switch(selVrtOpt){                           
    case 0:Edit3V(0,0,c,v);break;                                                // one
    case 1:for(let b=0;b<5;b++){if(spk[b].value!=""){Edit3V(0,b,c,v)}};break;    // all
    case 2:for(let b=0;b<5;b++){if(spk[b].value!=""){Edit3V(0,b,c,v)}};          // mirrorX
           for(let b=0;b<5;b++){if(spm[b].value!=""){Edit3V(1,b,c,v)}};break;
  }
}

function Edit3V(m,b,c,v){ // m:   mirror   b: box[]  , c:  0:X   1:Y   2:Z , value 
  let sf,i,x,vx=v,p,q,qx;
  if(m==1){vx=-v;                                             // mirrorX
    x=parseInt((Number(edvx.value)-v)*100)/100;
    for(let j=0;j<spp.length;j++){if(spp[j].name==spm[b].value){sf=j;}}
    i=Number(spm[b].value);}  
  else{
    x=parseInt((Number(edvx.value)+v)*100)/100;
    for(let j=0;j<spp.length;j++){if(spp[j].name==spk[b].value){sf=j;}}
    i=Number(spk[b].value);}  
  let y=parseInt((Number(edvy.value)+v)*100)/100;
  let z=parseInt((Number(edvz.value)+v)*100)/100;
  switch(c){
    case 0:edvx.value=""+x;upd[i*3] +=vx;pos[i*3]  =parseInt(upd[i*3  ]*100)/100;spp[sf].position.x=upd[i*3  ];break;
    case 1:edvy.value=""+y;upd[i*3+1]+=v;pos[i*3+1]=parseInt(upd[i*3+1]*100)/100;spp[sf].position.y=upd[i*3+1];break;
    case 2:edvz.value=""+z;upd[i*3+2]+=v;pos[i*3+2]=parseInt(upd[i*3+2]*100)/100;spp[sf].position.z=upd[i*3+2];break;
  }
}

function GrpEdit(v){
  switch(v){
  case "0" :agr=0;break;
  case "1" :agr=1;break;
  case "2" :agr=2;break;
  case "3" :agr=3;break;
  case "4" :agr=4;break;
  }
  Go(.3) ;
}

function CamEdit(v){
  let d=document.getElementById("ZoomSld");
  switch(v){
  case "0" :camTy=0;d.disabled="";break;
  case "1" :camTy=1;d.disabled="disabled";break;
  }
  //document.getElementById("CamEdit").value="";
  Go(.3) ;
}

function OptEdit(v){
 // rom=Cat.rotation;
  if(v!=""&&v!="Rst"&&v!="Sav"&&v!="WIt"&&v!="EBd"&&v!="Stt"){
    document.getElementById("divBon").style.display="none";
    document.getElementById("divE3d").style.display="none";
    document.getElementById("divE2d").style.display="none";
    document.getElementById("divEFc").style.display="none";
    document.getElementById("divEBd").style.display="none";
    document.getElementById("divStt").style.display="none";
//    document.getElementById("divANm").style.display="none";
  }
  switch(v){
    case "Sav": EncodeDataLS(true);break;
    case "Bon": document.getElementById("divBon").style.display="block";
          document.getElementById("tdEdit").style.backgroundColor="#fa0";
          document.getElementById("sel3d").checked=false;
          document.getElementById("sel2d").checked=false;
          document.getElementById("selbd").checked=true;
          document.getElementById("selfc").checked=false;
          document.getElementById("splsh").style.display="none";
          break;
    case "E3d": document.getElementById("divE3d").style.display="block";
          document.getElementById("tdEdit").style.backgroundColor="#ddd";
          document.getElementById("splsh").style.display="block";break;
    case "E2d": document.getElementById("divE2d").style.display="block";
          document.getElementById("splsh").style.display="block";
          document.getElementById("tdEdit").style.backgroundColor="#ddd";break;
    case "EFc": document.getElementById("divEFc").style.display="block";  // edit faces
          document.getElementById("tdEdit").style.backgroundColor="#ddd";
          document.getElementById("splsh").style.display="block";
          viewTexture();drawTriangle(prt);ViewVertices();
          PickFacets(); 
          ;break;
    case "WIt":LocStoListItems();break;     
    case "Rst":   //alert(Object.keys(localStorage));
    if (confirm('Replace original data from Data.js file of  Babylon->'+Hname+'  ?')){
      localStorage.removeItem("Babylon->"+Hname);Go(.3) ;} break;
    case "Stt":
        if(document.getElementById("divStt").style.display=="block"){
          document.getElementById("divStt").style.display="none";
          document.getElementById("divBon").style.display="block";
        }else{
          document.getElementById("divStt").style.display="block";
          document.getElementById("divBon").style.display="none";}break;  
  }
  document.getElementById("OptEdit").value="";
}


function OptDownload(v){
  switch(v){
    case "dtjs" : SaveEncodeDataLS();break;
    case "uvvr" : UVVrtx();break;
    case "uvmp" : UVMap();break;
    case "json" : SaveJModel(true);break;        // DataModel.js   potrebbe servire per esportare file .js
    case "baby" : SaveJModel(false);break;       // .babylon  
//    case "fram" : AnimationFrames(true);break;        // frames.js    non serve
    case "gltf" : SaveglTF(Hname);break;
    case "glbb" : SaveGLB(Hname);break;
    case "help" : Help();break;  
  }
  document.getElementById("OptDwn").value="";
}

function Redirect(v){ // non è più necessario reindirizzare  esiste un solo programma....
  let pth="";
  let url=window.location.href.split("/");
  for(let i=0;i<url.length-2;i++){pth+=url[i]+"/";}
  switch(v){
 //   case "Animals" : location=pth+"TwoFoots/TwoFoots.html"  ;break;
 //   case "Humans"  : location=pth+"Lara/Lara.html";break;
 //   case "Fixeds"  : location=pth+"F_Fixeds/F_Fixeds.html";break;
    default        : location=pth+v+"/"+v+".html";
  }
}

function WriteOptions(){
  let EleOpt ="<option id='op"+Hname+"'value= '"+Hname+"' >"+Hname+"</option>";
  EleOpt+="<option id='opAlly'   value= 'Ally'      >Ally</option>";
  EleOpt+="<option id='opLucy'   value= 'Lucy'      >Lucy</option>";
  EleOpt+="<option id='opMaya'   value= 'Maya'      >Maya</option>";
  EleOpt+="<option id='opPenta'  value= 'Penta'     >Penta</option>";
  EleOpt+="<option id='opSpeedy' value= 'Speedy'    >Speedy</option>";
  EleOpt+="<option id='opCow'    value= 'Cow'       >Cow</option>";
  EleOpt+="<option id='opFish'   value= 'Fish'      >Fish</option>";    
  EleOpt+="<option id='opTridy'  value= 'Tridy'     >Tridy</option>";
  EleOpt+="<option id='opTriche' value= 'Triche'    >Triche</option>";
document.write(EleOpt);
}

function WriteBonesPrnt(){ // list of parent
  let s="";
  for(let i=0;i<Bdt.length;i++){
    s+="<option id='op"+Bdt[i][3]+"'value= '"+Bdt[i][5]+"'>"+Bdt[i][3]+"</options>";}
  document.write(s);
}

function rotaPos(a){  // nulla e chiaro
let m;
for(let i=0;i<pos[prt].length/3;i++){ 
  switch(a){
    case 0:   pos[prt][i*3]*=-1;  break;                                                      // X <>-X
    case 1:   m=pos[prt][i*3];  pos[prt][i*3]=pos[prt][i*3+2];   pos[prt][i*3+2]=m;    break; // X <> Z   non e vero
    case 2:   m=pos[prt][i*3];  pos[prt][i*3]=pos[prt][i*3+2];   pos[prt][i*3+2]=-m;   break; // X <> -Z
    case 4:   pos[prt][i*3+2]*=-1;  break;                                                    // Z <> -Z
  }
}
}

function scalPos(a){
for(let i=0;i<pos[prt].length;i++){ 
  pos[prt][i]=parseInt(pos[prt][i]*a*100)/100;
}  
}

function scalPosX(a){
for(let i=0;i<pos[prt].length/3;i++){ 
  pos[prt][i*3]=parseInt(pos[prt][i*3]*a*100)/100;
}  
}

function ReverseY(){                 // capovolge i vertici
let rv=pos[prt].length/3-1;
let pas=pos[prt];pos[prt]=[];
let ups=uvs[prt];uvs[prt]=[]; 
let uqs=UVv[prt];UVv[prt]=[]; 
for(let i=0;i<=rv;i++){ 
  pos[prt][i*3  ]=pas[(rv-i)*3  ];
  pos[prt][i*3+1]=pas[(rv-i)*3+1];
  pos[prt][i*3+2]=pas[(rv-i)*3+2];
  uvs[prt][i*2  ]=ups[(rv-i)*2  ];
  uvs[prt][i*2+1]=ups[(rv-i)*2+1];
  UVv[prt][i*2  ]=uqs[(rv-i)*2  ];
  UVv[prt][i*2+1]=uqs[(rv-i)*2+1];
}
let iv=ind[prt].length;
let inp=ind[prt];ind[prt]=[];
for(let i=0;i<iv;i++){ 
  ind[prt][i]=rv-inp[i];
} 
}

function InverseInd(){
let m;  
for(let i=0;i<ind[prt].length/3;i++){ 
  m=ind[prt][i*3];
  ind[prt][i*3  ]=ind[prt][i*3+1];
  ind[prt][i*3+1]=m;
}}

function ChangePos(x,y,z){
for(let i=0;i<pos[prt].length/3;i++){
  pos[prt][i*3  ]=parseInt((pos[prt][i*3  ]+x)*100)/100;
  pos[prt][i*3+1]=parseInt((pos[prt][i*3+1]+y)*100)/100; 
  pos[prt][i*3+2]=parseInt((pos[prt][i*3+2]+z)*100)/100; 
}}



function SaveBoneData(){

  let nm=document.getElementById("bname").value+"            ";
  Bdt[prt][0]=new BABYLON.Vector3(document.getElementById("edbnx").value,
    document.getElementById("edbny").value,document.getElementById("edbnz").value);
  Bdt[prt][3]=nm.substring(0,13);
  Bdt[prt][4]=document.getElementById("OptBnPrnt").selectedIndex;
  EncodeDataLS(true);
  WriteBonesList();
  
  Go(.3) ;
//  alert(prt);
//  document.getElementById("OptBnPrnt").options[prt].selected=true;
//  document.getElementById("OptBnPrnt").selectedIndex=prt;alert(99);


}


function DecodeDataLS(s){   // String To data     
//saveTxt("Save localstorage data",s,"LocStoData.js");//------test
  let p,q,r,t,b,a,n,m,nb;
  let gn=Adt[1].length;
  let d=s.split("|");        
//-------------------------load pos
  p=d[1].split("?");
  q=p[1].split(",");
  pos=[];
  for(let i=0;i<q.length;i++){pos.push(Number(q[i]));}
//-------------------------load UVR
  p=d[2].split("?"); 
  q=p[1].split(",");
  UVR=[];
  for(let i=0;i<q.length;i++){UVR.push(Number(q[i]));}
//-------------------------load ind 
  ind=[];  
  for(let i=0;i<d.length-5;i++){                  // 3 :  pos,UVR,Bdt
    p=d[3+i].split("?"); 
    q=p[1].split(",");
    ind[i]=[];
    for(let j=0;j<q.length;j++){ind[i].push(Number(q[j]));}
  }
//-------------------------load Bdt
  p=d[d.length-2].split("?");   // last array
  q=p[1].split("%");
  Bdt=[];
  for(let i=0;i<q.length;i++){ 
    Bdt[i]=[];
    b=q[i].split(",");
    Bdt[i].push(new BABYLON.Vector3(Number(b[0]),Number(b[1]),Number(b[2])));
    Bdt[i].push(Number(b[3]));
    Bdt[i].push(Number(b[4]));
    Bdt[i].push(b[5]);           // name
    Bdt[i].push(Number(b[6]));   // parent
    Bdt[i].push(Number(b[7]));   // index
  }
  //------------------------load Adt
  nb=Bdt.length;                // bones number
  m=0;
  p=d[d.length-1].split("?");   // last array
  q=p[1].split("%");            // q[0]  : data   q[1] :positions,  q[2]:rotations 
  r=q[m].split(",");m++;
  Adt=[];Adt[0]=[];
  Adt[0][0]=Number(r[0]);          // frames/sec    
  Adt[1]=[];
//-----------------------------------------------------
  for(let g=0;g<gn;g++){           //-----------------------------------for each group
    Adt[1][g]=[];
    Adt[1][g][0]=[];
    r=q[m].split(",");m++;                                                            //alert((m-1)+"       "+r);
    Adt[1][g][0][0]=Number(r[0]);       // frame from
    Adt[1][g][0][1]=Number(r[1]);       // frane to
    for(let i=1;i<3;i++){         //-----------------------------------for  position and rotation data
      Adt[1][g][i]=[];
      for(let b=0;b<nb;b++){      //-----------------------------------for each bone
        Adt[1][g][i][b]=[];
        r=q[m].split(",");m++;                                                      // alert((m-1)+" bone :"+b+"   "+r);
        n=0;
        for(let c=0;c<3;c++){      //----------------------------------for x,y,z
          Adt[1][g][i][b][c]=[];
          for(let w=0;w<5;w++){    //----------------------------------for Size, Speed, Phase, Offset, Type 
            Adt[1][g][i][b][c][w]=Number(r[n]);
            n++;
          }
        }
      }
    }
  }
//  saveTxt("Save Adt_0 ?",JSON.stringify(Adt),"Adt_0.txt");//------test
}
// usare questo per formattare i vertici

function SaveEncodeDataLS(){
let k=0,j=3,h,v,u,r;
let gn=(Adt[1].length);  // group number
let sp="                                                                             ";
let s="//------------------SaveData("+Hname+")\n\npos=[";     
r="";
for(let i=0;i<Bdt.length;i++){      // detect last not cloned pos vertex
  if(Bdt[i][6]==-1){u=Bdt[i][2]+1;}
}
//--------------------------------------------------pos
for(let b=0;b<Bdt.length;b++){
  s+=("\n// "+Bdt[b][3]+"\n");//  add bone name
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){
    if(Bdt[b][6]==-1){//-------------------------------esclude i bone cloned
      r+=formatP(pos[i*3],pos[i*3+1],pos[i*3+2]);
      if(i==u-1){r+="];   ";}else{r+=",    ";}
      k++;
      if(k==4){k=0;r+=("// "+i+"\n");
      s+=r;r="";}               // fine riga a 4
      else{if(i==Bdt[b][2]){ s+=(r+"// "+i);r="";}}
      if(i==u-1){s+="\n\n//---------------------------Cloned Bones :\n";}
    }
  }      
}
s+="\n\nUVR=[\n";
//--------------------------------------------------UVR
k=0;j=3;
r="";
for(let b=0;b<Bdt.length;b++){
  s+=("\n// "+Bdt[b][3]+"\n");//  add bone name
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){
    if(Bdt[b][6]==-1){//-------------------------------esclude i bone cloned
      r+=formatU(UVR[i*2],UVR[i*2+1]);
      if(i==u-1){r+="];   ";}else{r+=",    ";}
      k++;
      if(k==5){k=0;r+=("// "+i+"\n");s+=r;r="";}         // 5 points  for row
      else{if(i==Bdt[b][2]){ s+=(r+"// "+i);r="";}} 
      if(i==u-1){s+="\n\n//---------------------------Cloned Bones :\n";}
    }
  }
}
s+="\n\n";//end
//-------------------------------------------------ind
for(let b=0;b<Bdt.length;b++){
  s+="ind["+b+"]=[//---"+Bdt[b][3];  // add bone name
  if(Bdt[b][6]>-1){s+="---------Cloned Bone";}
  s+="\n";
  r="";
  if(ind[b].length>0&&Bdt[b][6]==-1){     // for each bone not cloned
    for(let i=0;i<ind[b].length/3;i++){
      r+=formatI(ind[b][i*3],ind[b][i*3+1],ind[b][i*3+2]);
      if(r.length>100){                  // test fine riga
        if(i<ind[b].length/3-1){r+=",\n";}
        else{r+="];\n";}
        s+=r;r="";  
      }
      else{
        if(i<ind[b].length/3-1){r+=",    ";}
        else{r+="];\n";s+=r;}
      }
    }
  }else{s+="];\n";}
 }
//------------------------------------------------ bones data
s+="\n//----------------------------------------------------------bones data\n"; 
let spa="                       ";
//s+="var Bdt=[ //               position        start   end          name         parent    index\n";
s+="var Bdt=[ //              position.0       start.1  end.2     name.3        parent.4  index.5  cloneX.6\n";
for(let i=0;i<Bdt.length;i++){
  s+="[new BABYLON.Vector3(";
  s+=(spa.substring(0,6-(""+Bdt[i][0].x).length)+Bdt[i][0].x+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].y).length)+Bdt[i][0].y+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].z).length)+Bdt[i][0].z+"),");
  if(Bdt[i][6]==-1){
    s+=(spa.substring(0,6-(""+Bdt[i][1]).length)+Bdt[i][1]+",");
    s+=(spa.substring(0,6-(""+Bdt[i][2]).length)+Bdt[i][2]+",");}
  else{
    s+="     0,";
    s+="     0,";}  
  s+='  "'+(Bdt[i][3]+'"  ,');
  s+=(spa.substring(0,6-(""+Bdt[i][4]).length)+Bdt[i][4]+",");
//  s+=(spa.substring(0,6-(""+Bdt[i][5]).length)+Bdt[i][5]);
  s+=(spa.substring(0,6-(""+Bdt[i][5]).length)+Bdt[i][5]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][6]).length)+Bdt[i][6]);
  if(i<Bdt.length-1){s+=" ],\n";}else{s+=" ]\n"}
}
s+="];\n\n";
//----------------------------------------------Animation data
s+="//-------------------------------------------Animation data\n";
s+="var Adt=[\n";
s+="["+(spa.substring(0,6-(""+Adt[0]).length)+Adt[0]+"], // frames/sec\n");
s+="[// -----------------//groups of animation\n";
for(let g=0;g<gn;g++){                                                        // for each group
  s+="[//---------------------------------------------group "+g+"\n[";
  s+=""+ (spa.substring(0,6-(""+Adt[1][g][0][0]).length)+Adt[1][g][0][0]+",");                      // frame from
  s+=""+ (spa.substring(0,6-(""+Adt[1][g][0][1]).length)+Adt[1][g][0][1]+"], // from      to\n");   // frame to
  s+="// bones\n";
  s+="//                X                               Y                               Z\n";
  s+="[  //Positions----------------------Arch Speed Phase Offset Type\n";
  h=0;
  for(let i=1;i<3;i++){
    for(let j=0;j<Adt[1][g][1].length;j++){   // for each bone
      s+="[";
      for(let k=0;k<3;k++){
        s+="["
        for(let w=0;w<5;w++){
          s+=""+(spa.substring(0,5-(""+Adt[1][g][i][j][k][w]).length)+Adt[1][g][i][j][k][w]); //+",");
          if(w<4){s+=",";}
        }
        if(k<2){s+="],";}
      }
      if(h==(Adt[1][g][1].length)*2-1){
        if(g<gn-1){s+="]]]],//  "+j+"\n\n";}     // end of group 0
        else{s+="]]]]//  "+j+"\n]\n];";}     // end of file
      } 
      else{
        if(h==Adt[1][g][1].length-1){s+="]]],//  "+j+"\n";}else{s+="]], //  "+j+"\n";} // end of Positions
      }
      h++;
    }
    if(h==Adt[1][g][1].length){s+="[  //Rotations----------------------Arch Speed Phase Offset Type\n";}
  }
}
saveTxt("Save "+Hname+"_data  to file Data.js",s,"Data.js");//------test
}



function SaveEncodeDataLS_err(){
let k=0,j=3,h,v,u,r;
let gn=(Adt[1].length);  // group number
let sp="                                                                             ";
let s="//------------------SaveData("+Hname+")\n\npos=[";     
r="";
for(let i=0;i<Bdt.length;i++){      // detect last not cloned pos vertex
  if(Bdt[i][6]==-1){u=Bdt[i][2]+1;}
}
//u=pos.length/3;u=310;
//--------------------------------------------------pos
for(let b=0;b<Bdt.length;b++){
  s+=("\n// "+Bdt[b][3]+"\n");//  add bone name
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){
    if(Bdt[b][6]==-1){//-------------------------------esclude i bone cloned
      r+=formatP(pos[i*3],pos[i*3+1],pos[i*3+2]);
      if(i==u-1){r+="];   ";}else{r+=",    ";}
      k++;
      if(k==4){k=0;r+=("// "+i+"\n");s+=r;r="";}               // fine riga a 4
      else{if(i==Bdt[b][2]){ s+=(r+"// "+i);r="";}}}
  }      
}
s+="\n\nUVR=[\n";
//--------------------------------------------------UVR
k=0;j=3;
r="";
//u=UVR.length/2;
for(let b=0;b<Bdt.length;b++){
  s+=("\n// "+Bdt[b][3]+"\n");//  add bone name
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){
    if(Bdt[b][6]==-1){//-------------------------------esclude i bone cloned
      r+=formatU(UVR[i*2],UVR[i*2+1]);
      if(i==u-1){r+="];   ";}else{r+=",    ";}
      k++;
      if(k==5){k=0;r+=("// "+i+"\n");s+=r;r="";}         // 5 points  for row
      else{if(i==Bdt[b][2]){ s+=(r+"// "+i);r="";}} 
    }
  }
}
s+="\n\n";//end
//-------------------------------------------------ind
for(let b=0;b<Bdt.length;b++){
  s+="ind["+b+"]=[//---"+Bdt[b][3]+"\n";  // add bone name
  r="";
  if(ind[b].length>0&&Bdt[b][6]==-1){
    for(let i=0;i<ind[b].length/3;i++){
      r+=formatI(ind[b][i*3],ind[b][i*3+1],ind[b][i*3+2]);
      if(r.length>100){                  // test fine riga
        if(i<ind[b].length/3-1){r+=",\n";}
        else{r+="];\n";}
        s+=r;r="";  
      }
      else{
        if(i<ind[b].length/3-1){r+=",    ";}
        else{r+="];\n";s+=r;}
      }
    }
  }else{s+="];\n";}
 }
//------------------------------------------------ bones data
s+="\n//----------------------------------------------------------bones data\n"; 
let spa="                       ";
s+="var Bdt=[ //              position.0       start.1  end.2     name.3        parent.4  index.5  cloneX.6\n";
for(let i=0;i<Bdt.length;i++){
  s+="[new BABYLON.Vector3(";
  s+=(spa.substring(0,6-(""+Bdt[i][0].x).length)+Bdt[i][0].x+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].y).length)+Bdt[i][0].y+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].z).length)+Bdt[i][0].z+"),");
  s+=(spa.substring(0,6-(""+Bdt[i][1]).length)+Bdt[i][1]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][2]).length)+Bdt[i][2]+",");
  s+='  "'+(Bdt[i][3]+'"  ,');
  s+=(spa.substring(0,6-(""+Bdt[i][4]).length)+Bdt[i][4]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][5]).length)+Bdt[i][5]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][6]).length)+Bdt[i][6]);
  if(i<Bdt.length-1){s+=" ],// "+i+"\n";}else{s+=" ] // "+i+"\n"}
}
s+="];\n\n";
//----------------------------------------------Animation data
s+="//-------------------------------------------Animation data\n";
s+="var Adt=[\n";
s+="["+(spa.substring(0,6-(""+Adt[0]).length)+Adt[0]+"], // frames/sec\n");
s+="[// -----------------//groups of animation\n";



for(let g=0;g<gn;g++){//---------------------------------------------------- for each group
  s+="[//---------------------------------------------group "+g+"\n[";
  s+=""+ (spa.substring(0,6-(""+Adt[1][g][0][0]).length)+Adt[1][g][0][0]+",");                      // frame from
  s+=""+ (spa.substring(0,6-(""+Adt[1][g][0][1]).length)+Adt[1][g][0][1]+"], // from      to\n");   // frame to
  s+="// bones\n";
  s+="//                X                               Y                               Z\n";
  s+="[  //Positions----------------------Arch Speed Phase Offset Type\n";
  s+="[";
  h=0;

  //       0    1           0        1        2                      0   1   2    0     1    2     3      4
  //Adt[frames-data] [group] [from/to-positions-rotations] [bones] [ x - y - z] [Arch Speed Phase Offset Type ]
  //      Adt[1][0][2][1][2][3] :  data,group 0,rotations,bone 1,z, Offset 
  //alert(Adt[1][0][2][1][2][3]);

  for(let i=1;i<3;i++){              // for (2)   ; positions rotations  ???
    for(let j=0;j<Bdt.length;j++){   // for each bone
      for(let k=0;k<3;k++){          // for (3)           :  x,y,z
        s+="["
        for(let w=0;w<5;w++){        // for (5) each data : Arch Speed Phase Offset Type 

     //     s+=""+(spa.substring(0,5-(""+Adt[1][g][i][j][k][w]).length)+Adt[1][g][i][j][k][w]); //+",");
        s+="q";
          if(w<4){s+=",";}
        }
        if(k<2){s+="],";}
      }
      if(h==(Adt[1][g][1].length)*2-1){
        if(g<gn-1){s+="]]]],//  "+j+"\n\n";}     // end of group 0
        else{s+="]]]]//  "+j+"\n]\n];";}     // end of file
      } 
      else{
        if(h==Adt[1][g][1].length-1){s+="]]],//  "+j+"\n";}else{s+="]], //  "+j+"\n";} // end of Positions
      }
      h++;
    }
    if(h==Adt[1][g][1].length){s+="[  //Rotations----------------------Arch Speed Phase Offset Type\n";}
  }
}
saveTxt("Save "+Hname+"_data  to file Data.js",s,"Data.js");//------test
}


function EncodeDataLS(b){  //Data to string    to save localstorage
return;                    // localstotage disabled for now  

let k=0,j=3,v,u,r;
let gn=(Adt[1].length);  // group number

let sp="                                                                             ";
let s="Babylon->"+Hname+"|\npos?\n";
r="";
u=pos.length/3;
for(let b=0;b<Bdt.length;b++){
  for(let i=Bdt[b][1];i<=Bdt[b][2];i++){
    r+=formatP(pos[i*3],pos[i*3+1],pos[i*3+2]);
    if(i==u-1){r+="     ";}else{r+=",    ";}   
    k++;if(k==5){k=0;r+=("\n");}               // fine riga a 4
    s+=r;r="";
  }      
}

s=s.slice(0,-5);  //  del last  ",     "
s+="|\n";//end
s+="UVR?\n";//------------------------------------------UVR
k=0;j=3;
u=UVR.length/2;
for(let i=0;i<u;i++){
  s+=formatU(UVR[i*2],UVR[i*2+1]);s+="       ";
  if(i==u-1){s+="    ";}else{s+=",   ";}
  k++;if(k==5){k=0;s+="\n";}
}
s=s.slice(0,-4);  //  del last ",   "
s+="|\n";//end
//--------------------------------------------------------------ind[]
for(let b=0;b<Bdt.length;b++){
  s+="ind["+b+"]?\n";
  r="";
  for(let i=0;i<ind[b].length/3;i++){
    r+=formatI(ind[b][i*3],ind[b][i*3+1],ind[b][i*3+2]);
    if(r.length>100){                  // test fine riga
      if(i<ind[b].length/3-1){r+=",\n";}
      else{r+="|\n";}
      s+=r;r="";  
    }
    else{
      if(i<ind[b].length/3-1){r+=",    ";}
      else{r+="|\n";s+=r;}
    }            
  }
 }
//----------------------------------------------------------------bones data
let spa="                       ";
s+="Bdt?\n";
for(let i=0;i<Bdt.length;i++){
  s+=(spa.substring(0,6-(""+Bdt[i][0].x).length)+Bdt[i][0].x+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].y).length)+Bdt[i][0].y+",");
  s+=(spa.substring(0,6-(""+Bdt[i][0].z).length)+Bdt[i][0].z+",");
  s+=(spa.substring(0,6-(""+Bdt[i][1]).length)+Bdt[i][1]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][2]).length)+Bdt[i][2]+",");
  s+=(Bdt[i][3]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][4]).length)+Bdt[i][4]+",");
  s+=(spa.substring(0,6-(""+Bdt[i][5]).length)+Bdt[i][5]);
  if(i<Bdt.length-1){s+="  %\n";}else{s+=" |\n"}
}

s+="Adt?\n";
s+=""+(spa.substring(0,6-(""+Adt[0].length))+Adt[0]+" %\n\n");         // frames/sec
for(let g=0;g<gn;g++){
  s+=""+(spa.substring(0,6-(""+Adt[1][g][0][0]).length)+Adt[1][g][0][0]+",");       // frame from
  s+=""+(spa.substring(0,6-(""+Adt[1][g][0][1]).length)+Adt[1][g][0][1]+" %\n");    // frame to
  //---------------------------------------bones
  for(let i=1;i<3;i++){
    for(let j=0;j<Bdt.length;j++){   // for each bone
      for(let k=0;k<3;k++){
        for(let w=0;w<gn;w++){
   //       s+=""+(spa.substring(0,6-(""+Adt[1][g][i][j][k][w]).length)+Adt[1][g][i][j][k][w]);
          if(!(k==2&&w==4)){s+=",";}
        }
      }
      s+=" %\n";
    }
    s+="\n";
  }
}
s=s.substring(s,s.length-4);//     // end of file
//-------------------Save
//saveTxt("Save localstorage data",s,"LocStoData.js");//------test
SaveLocStrg(s);
if(b){
  SaveEncodeDataLS(); // Save to file
//  Go(.3) ;
//  OptEdit("Bon");
} 

}


function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


function formatB(p,q,r){
  let d=3;
  let pf="",qf="";rf="";
  let sp="             ";
  p=""+p;q=""+q;r=""+r;
  pf+=p;pf+=(sp.substring(0,d-pf.length)+",");
  qf+=q;qf+=(sp.substring(0,d-qf.length)+",");
  rf+=("'"+r+"',");
  return (pf+qf+rf);
  }




function formatI(p,q,r){
  let d=3;
  let pf="",qf="";rf="";
  let sp="             ";
  p=""+p;q=""+q;r=""+r;
  pf+=p;pf+=(sp.substring(0,d-pf.length)+",");
  qf+=q;qf+=(sp.substring(0,d-qf.length)+",");
  rf+=r;rf+=(sp.substring(0,d-rf.length)+"");
  return (pf+qf+rf);
}

function formatU(x,y){
  let d=4;
  let xf="",yf="";
  let sp="             ";
  x=parseInt(x);y=parseInt(y);
  if(x<0){x=""+x;}else{x=" "+x;}
  y=" "+y;
  xf+=x;xf+=(sp.substring(0,d-xf.length)+",");
  yf+=y;yf+=(sp.substring(0,d-yf.length));
  return (xf+yf);
}

function formatPL(d,x,y,z){
  let xf="",yf="",zf="";
  let xs=" ";if(x<0){xs="-";}
  let ys=" ";if(y<0){ys="-";}
  let zs=" ";if(z<0){zs="-";}
  let sp="             ";
  x=Math.abs(x).toString();
  y=Math.abs(y).toString();
  z=Math.abs(z).toString();
  xf=sp.substring(0,d-x.length)+xs+x+',';
  yf=sp.substring(0,d-y.length)+ys+y+',';
  zf=sp.substring(0,d-z.length)+zs+z;
  return (xf+yf+zf);
}

function formatP(x,y,z){
  let m=x;
  let d=5; // space interval
  let xf="",yf="",zf="";
  let xs=" ";if(x<0){xs="-";}
  let ys=" ";if(y<0){ys="-";}
  let zs=" ";if(z<0){zs="-";}
  let sp="             ";
  x=""+parseInt(Math.abs(x)*100)/100;
  y=""+parseInt(Math.abs(y)*100)/100;
  z=""+parseInt(Math.abs(z)*100)/100;
  xf+=(xs+x);xf+=(sp.substring(0,d-xf.length)+",");
  yf+=(ys+y);yf+=(sp.substring(0,d-yf.length)+",");
  zf+=(zs+z);zf+=(sp.substring(0,d-zf.length));
/*              
  if(xf.substring(0,2)=="-0"){xf=" -"+xf.substring(2);}
  if(zf.substring(0,2)=="-0"){zf=" -"+zf.substring(2);}
  if(xf.substring(0,3)==" 0."){xf="  "+xf.substring(2);}
  if(zf.substring(0,3)==" 0."){zf="  "+zf.substring(2);}
*/  
//  alert(x+"  "+y+"  "+z+"\n"+xf+"  "+yf+"  "+zf);
  return (xf+yf+zf);
}

function formatP_old(x,y,z){
  let m=x;
  let d=5; // space interval
  let xf="",yf="",zf="";
  let xs=" ";if(x<0){xs="-";}
  let ys=" ";if(y<0){ys="-";}
  let zs=" ";if(z<0){zs="-";}
  let sp="             ";
  x=""+parseInt(Math.abs(x)*100)/100;
  y=""+parseInt(Math.abs(y)*100)/100;
  z=""+parseInt(Math.abs(z)*100)/100;
  xf+=(xs+x);xf+=(sp.substring(0,d-xf.length)+",");
  yf+=(ys+y);yf+=(sp.substring(0,d-yf.length)+",");
  zf+=(zs+z);zf+=(sp.substring(0,d-zf.length));
  if(xf.substring(0,2)=="-0"){xf=" -"+xf.substring(2);}
  if(zf.substring(0,2)=="-0"){zf=" -"+zf.substring(2);}
  if(xf.substring(0,3)==" 0."){xf="  "+xf.substring(2);}
  if(zf.substring(0,3)==" 0."){zf="  "+zf.substring(2);}
  return (xf+yf+zf);
}

function formatBV3(b){
  let d=5;
  let sp="             ";
  let s="new BABYLON.Vector3("+
    sp.substring(0,d-(""+b.x).length)+b.x+","+
    sp.substring(0,d-(""+b.y).length)+b.y+","+
    sp.substring(0,d-(""+b.z).length)+b.z+")";
  return s;
}

function Help(){
  if(document.getElementById("OptBones").value==-1){DivVer(1);} // skeleton view
  else{
    if(document.getElementById("divBon").style.display=="block"){DivVer(2);}
    else{
      if(document.getElementById("selbd").checked){DivVer(3);}
      if(document.getElementById("sel3d").checked){DivVer(4);}
      if(document.getElementById("sel2d").checked){DivVer(5);}
      if(document.getElementById("selfc").checked){DivVer(6);}
    }
  }
}

function DivVer(v){
  let op=document.getElementById('OptBones').value;//   -1 : skeleton
  let df=document.getElementById('divFrames');
  let dc=document.getElementById('divCanvat');
  let dv=document.getElementById('divVers');
  switch(v){
    case 0:document.getElementById("Textarea").innerHTML=VerText;break;    //version
    case 1:document.getElementById("Textarea").innerHTML=HelpText0;break;  //skeleton
    case 2:document.getElementById("Textarea").innerHTML=HelpText1;break;  //bones
    case 3:document.getElementById("Textarea").innerHTML=HelpText2;break;  //bone
    case 4:document.getElementById("Textarea").innerHTML=HelpText3;break;  //3d
    case 5:document.getElementById("Textarea").innerHTML=HelpText4;break;  //2d
    case 6:document.getElementById("Textarea").innerHTML=HelpText5;break;  //faces
  }
  if(dv.style.display=="none"){dv.style.display="block";df.style.display="none";dc.style.display="none";}
  else{dv.style.display="none";
    if(op==-1){df.style.display="block";dc.style.display="none" ;}
    else{      df.style.display="none"; dc.style.display="block";}
  }
}

function DelVert(){
let n=Number(addv.value);
  if (confirm('Do you want delete '+n+' vertices after '+crpos +'index and all relative faces ?')){
    for(let i=0;i<n;i++){DelVertOne();}
    EncodeDataLS(true);
  }  
}

function DelVertOne(){ // ---------sembra funziona
  let after=crpos+1;
  let prn=Number(prt); 
  let sp=spp[crpos-Bdt[prn][1]].position;   // cursor red sphere position
  pos.splice(after*3,3);
  UVR.splice(after*2,2);
  uvs.splice(after*2,2);
  // remove all faces with after index vertice
  for(let i=0;i<ind.length;i++){             // for each bone
    for(let k=0;k<ind[i].length/3;k++){      // for each face in i.bone
      for(let h=0;h<3;h++){                  // for each vertice in face
        if(ind[i][k*3+h]==after){            // if found
          ind[i].splice(k*3,3);              // remove face
        }
      }
    }
  }
  // renum all faces vertices after sp in ind[[]]
  for(let i=0;i<Bdt.length;i++){            // for each bone
    for(let j=0;j<ind[i].length;j++){       // for each vertice in bone 
      if(ind[i][j]>=after){ind[i][j]--;}    // renum  if >=after
    }
  }
  Bdt[prn][2]--;                            // updat end of current bone vertice index 
  prn++;                                    // next bone
  for(let i=prn;i<Bdt.length;i++){          // update start and end of bone vertices indexes
    Bdt[i][1]--;Bdt[i][2]--; 
  }
}


function AddVert(){
let n=Number(addv.value);
  if (confirm('Do you want add '+n+' vertices (0,0,0) after '+crpos+' index ?')){
    for(let i=0;i<n;i++){AddVertOne();}
    EncodeDataLS(true);
  }  
}

function AddVertOne(){  //  add to start bone
  //-----the cursor sphere are indexed  to relative bone index
  // crpos        : absolute vertex index of cursor red sphere set
  // Bdt[prt][1]) : start current bone vertex index
  let after=crpos+1;
  let prn=Number(prt); 
  let sp=spp[after-Bdt[prn][1]].position;   // cursor red sphere position
//  let x=UVR[crpos*2];
//  let y=UVR[crpos*2+1];
  pos.splice(after*3,0,0,0,0);
  UVR.splice(after*2,0,0,0);
  uvs.splice(after*2,0,0,0);
  // renum all faces vertices after sp in ind[[]]
  for(let i=0;i<Bdt.length;i++){            // for each bone
    for(let j=0;j<ind[i].length;j++){       // for each vertice in bone 
      if(ind[i][j]>=after){ind[i][j]++;}    // renum  if >=after
    }
  }
  Bdt[prn][2]++;                            // updat end of current bone vertice index 
  prn++;                                    // next bone
  for(let i=prn;i<Bdt.length;i++){          // update start and end of bone vertices indexes
    Bdt[i][1]++;Bdt[i][2]++; 
  }
}



function AddTwoVert(){ // disattivo
  let p=Bdt[prt][2]+1;                                        // start bone vertex
  let sp=spp[crpos-Bdt[prt][1]].position;                     // cursor red sphere position
  if (confirm('Do you want add two mirror vertices ?')){
    // add 2 vertices 3d at end at current bone vertices (left and right shifted  x+=1)
    if(sp.x>=0){
      pos.splice(p*3,0, sp.x+.5,sp.y,sp.z); 
      pos.splice(p*3,0,-sp.x-.5,sp.y,sp.z);}
    else{
      pos.splice(p*3,0, sp.x-.5,sp.y,sp.z); 
      pos.splice(p*3,0,-sp.x+.5,sp.y,sp.z);
    } 
    // add 2 vertices 2d at end at current bone vertices (left and right of center texture)
    UVR.splice(p*2,0,0, 250);
    UVR.splice(p*2,0,0,-250);
    uvs.splice(p*2,0,.5,.5);
    uvs.splice(p*2,0,.5,.5);
    // renum all faces vertices after p   in ind[[]]
    for(let i=0;i<Bdt.length;i++){            // for each bone
      for(let j=0;j<ind[i].length;j++){       // for each vertice in bone 
        if(ind[i][j]>=p){ind[i][j]+=2;}       // renum  if >=p
      }
    }
    // renum current bone end vertice index  in Bdt[[]]
    Bdt[prt][2]+=2;                        // update end of bone vertice indexes                                    
    if(prt<Bdt.length-1){                  // if not last bone
      for(let i=Number(prt+1);i<Bdt.length;i++){  // update start and end of bone vertices indexes
        Bdt[i][1]+=2;Bdt[i][2]+=2; 
      }
    }
    EncodeDataLS(true);
  }
}


function Show_pos(){
  let s="";
  for(let i=0;i<pos.length/3;i++){
    s+=i+" : "+pos[i*3]+","+pos[i*3+1]+","+pos[i*3+2]+"\n";
  }saveFile(s);
}

function Show_UVR(){
  let s="";
  for(let i=0;i<UVR.length/2;i++){
    s+=i+" : "+UVR[i*2]+","+UVR[i*2+1]+"\n";
  }saveFile(s);
}



function DelOneVerttttt(){
  let tmp,tm,b;
  p=document.getElementById("spkE").value;
  if (confirm('Remove this vertice and all faces that contain it ?')){
    DelVertice(p);
  }
  Go(.3) ;Part(prt);OptEdit('EFc');ViewVertices();
}

function DelClonesVert(){
  //alert(JSON.stringify(spk));return;
  if (confirm('Remove all vertice clones and all faces that contain it ?')){
    for(let i=0;i<5;i++){if(spk[i].value!=""){DelVertice(spk[i].value);}
    }
  }
}

function DelAllVerttttt(){
  if (confirm('Remove all vertice and all faces that contain it ?')){
    for(let i=0;i<5;i++){if(spk[i].value!=""){DelVertice(spk[i].value);}}
    for(let i=0;i<5;i++){if(spm[i].value!=""){DelVertice(spm[i].value);}}
  }
}

function DelVerticeeeee(p){  // babylon4 ok 

//---remove faces extracting in tmp valid faces without p
  for(let i=0;i<ind.length;i++){ 
    tmp=[];
    for(let k=0;k<ind[i].length/3;k++){
      b=true;
      for(let j=0;j<3;j++){if(ind[i][k*3+j]==p){b=false;}}                              
      if(b){
        tm=ind[i][k*3]  ;if(tm>p){tm--;}tmp.push(tm);
        tm=ind[i][k*3+1];if(tm>p){tm--;}tmp.push(tm);
        tm=ind[i][k*3+2];if(tm>p){tm--;}tmp.push(tm);
      }
    }
    ind[i]=tmp;
  }
  //------------------remove vertices
  pos.splice(p*3,3); // removed x,y,z of p n ok
  UVR.splice(p*2,2);
  uvs.splice(p*2,2);

  // renum current bone vertice index end
  Bdt[Number(prt)][2]--;
  // renum start and end of bone vertices indexes
  for(let i=Number(prt)+1;i<Bdt.length;i++){
    Bdt[i][1]--;Bdt[i][2]--; 
  }
}

function EditBonePosition(c,v){
  v*=1.001;
  switch(c){
    case 0: Bdt[prt][0].x+=v;Bdt[prt][0].x=parseInt(Bdt[prt][0].x*100)/100;
      document.getElementById("edbnx").value=Bdt[prt][0].x;break;
    case 1: Bdt[prt][0].y+=v;Bdt[prt][0].y=parseInt(Bdt[prt][0].y*100)/100;
      document.getElementById("edbny").value=Bdt[prt][0].y;break;
    case 2: Bdt[prt][0].z+=v;Bdt[prt][0].z=parseInt(Bdt[prt][0].z*100)/100;
      document.getElementById("edbnz").value=Bdt[prt][0].z;break;
  }
  Ske.bones[prt].setPosition(Bdt[prt][0],Mske);
}

function BoneCmd(v){
  let np,ap=[],op=[],orig;
  let px=Bdt[prt][0].x;
  let py=Bdt[prt][0].y;
  let pz=Bdt[prt][0].z;
  switch(v){
    case 0:if(confirm("Remove this bone ?")){DelBone();}break;
    case 1:if(confirm("Add bone base with 2 point ?")){
      ap.push(px-.5);ap.push(py);ap.push(pz); 
      ap.push(px+.5);ap.push(py);ap.push(pz);
      orig=Bdt[prt][0];AddBone(orig,ap);}break;
    case 2:if(confirm("Add clone of this bone ?")){
      for(let i=Bdt[prt][1];i<=Bdt[prt][2];i++){
        ap.push(pos[i*3]);ap.push(pos[i*3+1]);ap.push(pos[i*3+2]);}
      orig=Bdt[prt][0];AddBone(orig,ap);}break;
    case 3:if(confirm("Add mirror(X) of this bone ?")){
      for(let i=Bdt[prt][1];i<=Bdt[prt][2];i++){
        ap.push(-pos[i*3]);ap.push(pos[i*3+1]);ap.push(pos[i*3+2]);
      }orig=new BABYLON.Vector3(-Bdt[prt][0].x,Bdt[prt][0].y,Bdt[prt][0].z);AddBone(orig,ap);}break;
    case 4:
      break;  
  }
}


function DelBone(){
  if(prt==0){alert("the first bone cannot be removed");return;}
  let pr=prt;               // bone index to delete
  let ini=Bdt[prt][1];      // first point index start to del
  let end=Bdt[prt][2];      // last  point index end to delete
  let np=end-ini+1;         // number of point to delete
  //-------------------------Delete bone data in Bdt
  for(let i=pr;i<Bdt.length;i++){
   Bdt[i][1]-=np;Bdt[i][2]-=np;    // subtract np vertices for all next bones data
  }
  Bdt.splice(pr,1);                // delete bone data
  //-----------------------Delete bone face void in ind[]
  ind.splice(pr,1);
  //------------------------renum  all faces vertices after pd
  for(let i=0;i<Bdt.length;i++){                            // for each bone
    for(let j=0;j<ind[i].length;j++){                       // for each vertice in ind[i]
      if(ind[i][j]>end){ind[i][j]-=np;}    
    }
  }
  //-------------------------Delete  points
  for(let i=0;i<np;i++){
    UVR.splice(ini*2,2);    //Add in UVR
    pos.splice(ini*3,3);    //Add in pos
  }
  //-------------------------Delete animation
  /*
  for(let i=0;i<Anmt[1].length/11;i++){
    if(Anmt[1][i*11]==prt){Anmt[1].splice(i*11,11);}
  }
  */

  prt--;
  EncodeDataLS(true);   // Save
  WriteBonesList();
}


function AddBone(orig,ap){
  //-------------------------Add bone in Bdt 
  let np=ap.length/3;   // number of point to add
  let pr=Number(prt)+1; // bone after prt
  let pd=Bdt[prt][2]+1; // point index start to add
  let ini=Bdt[prt][2]+1; 
  let end=ini+np-1;
  let a=[orig,ini,end,"new          ",0];  //name length 13 for align
  //-------------------------Add bone data in Bdt
  Bdt.splice(pr,0,a);
  for(let i=pr+1;i<Bdt.length;i++){
   Bdt[i][1]+=np;Bdt[i][2]+=np;          // adding np vertices for all next bones
  }
  //-------------------------Add bone face void in ind[]
  ind.splice(pr,0,[0,0,0]);
  //------------------------renum  all faces vertices after pd
  for(let i=0;i<Bdt.length;i++){            // for each bone
    for(let j=0;j<ind[i].length;j++){       // for each vertice in ind[i]
      if(ind[i][j]>=pd){ind[i][j]+=np;}
    }
  }
  //-------------------------Add points
  for(let i=0;i<np;i++){
    UVR.splice(pd*2,0, 0,0);                           //Add in UVR
    pos.splice(pd*3,0,ap[i*3],ap[i*3+1],ap[i*3+2]);    //Add in pos
  }
  
  EncodeDataLS(true);   // Save
  WriteBonesList();
}

function WriteBonesList(){ // update list of bones
  let s,op;
  let dop=document.getElementById("OptBones");
  while (dop.options.length > 0) {dop.remove(0);} // delete all options
  dop.add(new Option("skeleton",-1));             // add skeleton option 
  for(let i=0;i<Bdt.length;i++){                    
    dop.add(new Option(Bdt[i][3],i))      // add all bones options
  }
  //compile group select list
  s="";
  for (let i=0;i<Adt[1].length;i++){s+="<option value="+i+">"+i+"</option>";}
    document.getElementById("GrpEdit").innerHTML=s;
} 

function PickFacets(){
  let selected
  scene.onPointerObservable.add((e) => {
    if (e.type === BABYLON.PointerEventTypes.POINTERDOWN && e.pickInfo.hit) {
      if (selected) selected.dispose()
        selected = pickF(e.pickInfo, scene)  
      }
    });
}

function pickF(pickInfo, scene) {
  let x,y;
  let sq1=document.getElementById('svq1');// facet first
  let st2=document.getElementById('svt2');
  let st3=document.getElementById('svt3');
  let st4=document.getElementById('svt4');
  let sq2=document.getElementById('svq2');// facet second
  let st5=document.getElementById('svt5');
  let st6=document.getElementById('svt6');
  let st7=document.getElementById('svt7');
  let btR=document.getElementById('btRevF');
  let btS=document.getElementById('btDelF');
  let btT=document.getElementById('btTrip');
  let btD=document.getElementById('btDiag');
  let btC=document.getElementById('btAddC');
  let cn=0;
  let { pickedMesh, faceId } = pickInfo;
  if(pickedMesh.name!=undefined){
    sq1.value="";st2.value="";st3.value="";st4.value="";
    sq2.value="";st5.value="";st6.value="";svt7.value="";
    btR.disabled="disabled";btS.disabled="disabled";btT.disabled="disabled";btD.disabled="disabled";
    btC.disabled="disabled";fct=[-1,-1];
  return;} //  vertex picked  
  let indices = pickedMesh.getIndices();
  if(fct[0]==-1){fct[0]=faceId;}                         // la prima volta
  else{ //              is near ? 
    for(k=0;k<3;k++){
      for(j=0;j<3;j++){
        if(indices[faceId*3+k]==indices[fct[0]*3+j]){cn++;}
      }
    }
  }
  if(cn==2){fct[1]=faceId;}   // 2:  is near   : found near
  if(cn==3){fct=[-1,-1];}     // 3:  is equal  : reset
  btR.disabled="disabled";btS.disabled="disabled";btT.disabled="disabled";btD.disabled="disabled";
  btC.disabled="disabled";
  if(fct[0]!=-1){
    sq1.value=fct[0];st2.value=indices[fct[0]*3];st3.value=indices[fct[0]*3+1];
    st4.value=indices[fct[0]*3+2];btR.disabled="";btS.disabled="";btT.disabled="";}
  else{
    sq1.value="";st2.value="";st3.value="";st4.value="";
  }
  if(fct[1]!=-1){
    sq2.value=fct[1];st5.value=indices[fct[1]*3];st6.value=indices[fct[1]*3+1];svt7.value=indices[fct[1]*3+2];
    btR.disabled="disabled";btS.disabled="disabled";btT.disabled="disabled";btD.disabled="";btC.disabled="";}
  else{
    sq2.value="";st5.value="";st6.value="";svt7.value="";btD.disabled="disabled";btC.disabled="disabled";
}
  //------------set facet cursor in 2D div
  ctt.beginPath();
  ctt.fillStyle = "#44f5";
  x=ofx+UVR[st2.value*2]*zox;y=ofy-UVR[st2.value*2+1]*zoy;ctt.moveTo(x,y);
  x=ofx+UVR[st3.value*2]*zox;y=ofy-UVR[st3.value*2+1]*zoy;ctt.lineTo(x,y);
  x=ofx+UVR[st4.value*2]*zox;y=ofy-UVR[st4.value*2+1]*zoy;ctt.lineTo(x,y);
  x=ofx+UVR[st2.value*2]*zox;y=ofy-UVR[st2.value*2+1]*zoy;ctt.lineTo(x,y);
  x=ofx+UVR[st5.value*2]*zox;y=ofy-UVR[st5.value*2+1]*zoy;ctt.moveTo(x,y);
  x=ofx+UVR[st6.value*2]*zox;y=ofy-UVR[st6.value*2+1]*zoy;ctt.lineTo(x,y);
  x=ofx+UVR[st7.value*2]*zox;y=ofy-UVR[st7.value*2+1]*zoy;ctt.lineTo(x,y);
  x=ofx+UVR[st5.value*2]*zox;y=ofy-UVR[st5.value*2+1]*zoy;ctt.lineTo(x,y);
  ctt.fill();
  return createPickFaceMesh(fct, pickedMesh);
 }

 function createPickFaceMesh(faces, pickedMesh) { // facet cursor
  let newIndices = []
  let indices = pickedMesh.getIndices();
  for(k=0;k<fct.length;k++){
    newIndices.push(indices[fct[k]*3], indices[fct[k]*3+1], indices[fct[k]*3+2]);}
  if (pickedMesh instanceof BABYLON.Mesh) {
    let clone = pickedMesh.clone();
    let geo = pickedMesh.geometry.copy(scene.getUniqueId());
    geo.setIndices(newIndices);
    geo.applyToMesh(clone);
    clone.overlayColor=new BABYLON.Color3.Blue();
    clone.renderOverlay = true;
    clone.isPickable = false;
    return clone;
  }
}
 
/* 
// stringe la testa  se sporge lateralmente oltre il naso
    if(b==2&&Math.abs(pos[i*3])>.1){r+=formatP(pos[i*3]*.83,pos[i*3+1],pos[i*3+2]);}
    else{                           r+=formatP(pos[i*3]   ,pos[i*3+1],pos[i*3+2]);}

    if(b==2){r+=formatP(pos[i*3]*1   ,-.2+pos[i*3+1]*1   ,pos[i*3+2]);}
    else{    r+=formatP(pos[i*3]    ,pos[i*3+1]    ,pos[i*3+2]);}
/*
   if(b==2){r+=formatP(pos[i*3],pos[i*3+1]-.4,pos[i*3+2]);}
  else{    r+=formatP(pos[i*3]    ,pos[i*3+1]    ,pos[i*3+2]);}
*/
