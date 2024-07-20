let Anmt,AM,agr=0,camTy=0,stpa=0,rend=0; 


function AnimDataType(v){
  let coo,pr; //pr: position;0  rotations:1 
  let bn=document.getElementById("OptBones2").value;
  if(document.getElementById("selPos").checked){pr=1;}else{pr=2;} // positions:0  rotations:1
  if(document.getElementById("selX").checked){coo=0;}
  if(document.getElementById("selY").checked){coo=1;}
  if(document.getElementById("selZ").checked){coo=2;}
  Adt[pr][bn][coo][4]=v;
}


function AnimData(t,v){ //t -> 0:Size, 1:Speed, 2:Phase, 3: Offset  4:Type
  let coo,pr;
  let bn=document.getElementById("OptBones2").value;
  if(document.getElementById("selPos").checked){pr=1;}else{pr=2;} //pr: (data:0  positions:1  rotations:2)
  if(document.getElementById("selX").checked){coo=0;}
  if(document.getElementById("selY").checked){coo=1;}
  if(document.getElementById("selZ").checked){coo=2;}
  switch(t){
    case 0: case 1: case 2: case 3: case 4:
      Adt[1][agr][pr][bn][coo][t]=v;// update
      EncodeDataLS(false);
      Go(.3);return;break;
    case -2: Adt[1][agr][0][0]=v;                       // frame from
      EncodeDataLS(false);Go(.3);return;break;
    case -3: Adt[0]=v;                                  // frames/sec 
      EncodeDataLS(false);Go(.3);return;break;
    case -4: Adt[1][agr][0][1]=v;                       // frame to
      EncodeDataLS(false);Go(.3);return;break;
    case -1:
      document.getElementById("Nfrs").value=Adt[0];                       // frames/sec
      document.getElementById("Nfrm").value=Adt[1][agr][0][0];            // frame from
      document.getElementById("Nfto").value=Adt[1][agr][0][1];            // frame to
      document.getElementById("Asiz").value=Adt[1][agr][pr][bn][coo][0];  // Size
      document.getElementById("Aspd").value=Adt[1][agr][pr][bn][coo][1];  // Speed
      document.getElementById("Aphs").value=Adt[1][agr][pr][bn][coo][2];  // Phase
      document.getElementById("Aofs").value=Adt[1][agr][pr][bn][coo][3];  // Offset
      document.getElementById("Atyp").value=Adt[1][agr][pr][bn][coo][4];  // Function Type      

      if(document.getElementById("Atyp").value>2){
    //    document.getElementById('Anm2').disabled=true;
    //    document.getElementById('Aphs').disabled=true;
        document.getElementById('Anm1').disabled=true;
        document.getElementById('Aspd').disabled=true;}
      else{
    //    document.getElementById('Anm2').disabled=false;
    //    document.getElementById('Aphs').disabled=false;
        document.getElementById('Anm1').disabled=false;
        document.getElementById('Aspd').disabled=false;}

      document.getElementById("Anm0").value=document.getElementById("Asiz").value
      document.getElementById("Anm1").value=document.getElementById("Aspd").value
      document.getElementById("Anm2").value=document.getElementById("Aphs").value
      document.getElementById("Anm3").value=document.getElementById("Aofs").value
      WriteAnim(true,bn,pr);break
  }
}

function WriteAnim(b,bn,pr){
let zm; 
let coo;  
let tp=document.getElementById("Atyp").value; 
let nf=document.getElementById("Nfto").value-document.getElementById("Nfrm").value+1;
if(pr==1){zm=40;}else{zm=120}; // positions   rotations zoom
let y0=153;
let f=1;  
let p,ang;  
ctn.beginPath();
if(pr==2){ctn.fillStyle = "#aaa";}else{{ctn.fillStyle = "#daa";}}
ctn.clearRect(0, 0, canvan.width,canvan.height);
ctn.rect(0, 0, canvan.width, canvan.height);
ctn.fill();
ctn.fillStyle= "#000";
ctn.strokeStyle = "#000";     
ctn.moveTo(0,y0);
ctn.lineTo(545,y0);
ctn.stroke();
if(!b){return;}
//-----------------------------------------------------------------  0:Size, 1:Speed, 2:Phase, 3:Offset,  4:Type
for(let j=0;j<3;j++){                     //       for x,y,z
  ctn.moveTo(0,y0-Adt[1][agr][pr][bn][j][1]*zm);                     
  for(let i=0;i<nf;i++){                  //       for each frame  
    switch(j){
      case 0:ctn.fillStyle="#000";break;
      case 1:ctn.fillStyle="#f00";break;
      case 2:ctn.fillStyle="#00f";break;
    }
    ang=i*2*Math.PI/nf;
    ctn.beginPath();
      ctn.arc(i*542/nf,y0-TypeFunct(Adt[1][agr][pr][bn][j],ang,1)*zm,3, 0, 2 * Math.PI);
    ctn.fill();
    //-------------------------cursor
    if(document.getElementById("fnvl").value==i){
      if(document.getElementById("selX").checked){ctn.fillStyle="#0007";coo=0;}
      if(document.getElementById("selY").checked){ctn.fillStyle="#f007";coo=1;}
      if(document.getElementById("selZ").checked){ctn.fillStyle="#00f7";coo=2;}
      if(coo==j){
        ctn.beginPath();
        ctn.arc(i*542/nf,y0-TypeFunct(Adt[1][agr][pr][bn][j],ang,1)*zm,10, 0, 2 * Math.PI);
        ctn.rect(i*542/nf-3,y0-150,6,300);  
        ctn.fill();
      }
    }
  }
}
}

function TypeFunct(D,ang,of){
  let fv;
  let Siz=D[0];                 // Size
  let Spd=D[1];                 // Speed
  let Phs=D[2]*Math.PI/180;     // Phase
  let Ofs=D[3]*Math.PI/180*of;  // Offset
  let Typ=D[4];                 // Type function
   //   if(ang>Number(dat1.innerHTML)){dat1.innerHTML=ang;}

  switch(Typ){
    //---Sin
    case 0: return parseInt((Ofs+(Siz*Math.sin((ang+Phs)*Spd)))*1000)/1000;break;
    //---Trap
    case 1:
      fv=Math.sin((ang+Phs)*Spd);  
      if(fv> .3){fv= .3;}
      if(fv<-.3){fv=-.3;}
      return  parseInt(2.5*(Ofs+(Siz*fv))*1000)/1000;break;
    //---Round
    case 2:
      fv=ang*Spd*Siz;
      fv=40*Math.atan2(Math.sin(fv), Math.cos(fv));   //normalize
      return parseInt(fv*1000)/1000;break;
    //---Move 
    case 3: 
      return parseInt((Ofs+(Siz*Math.sin((Phs+ang/2))))*1000)/1000;break;
    //---MoveB 
    case 4: 
      if(Phs==0){return Ofs+parseInt(Siz*(10*(10.5/(.4+ ang)))*5)/1000;}
      else      {return Ofs-parseInt(Siz*(10*(10.5/( ang)))*5)/1000;}

      break; 
    //---MoveE 
    case 5: 
     // if(ang>Number(dat1.innerHTML)){dat1.innerHTML=ang;}
      if(Phs==0){return Ofs+parseInt(Siz*(10*(10.5/(6.8-ang)))*1)/1000;}
      else      {return Ofs+parseInt(Siz*(10*(10.5/(6.8+ang)))*1)/1000;} 

      break;
  }
}

//---------------------------------non definisce la struttura dell'animazione... la calcola
function Animation(){

  let b,s,d=[],pro,bon;
  let bn=Adt[1][agr][1].length;
  let ang=0,stp;
  let g,sp="      ";

  scene.registerBeforeRender(function() { //----------------  0:Size, 1:Speed, 2:Phase, 3:Offset,   4:Type
    s=speed/100;
    //-------------------------------------positions             a=s*(ofs+(Siz*Funct((ang+phs)*spd)))
    for(let i=0;i<bn;i++){   //bone
      d[0]=0;d[1]=0;d[2]=0;
      if(Adt[1][agr][1][i][0][0]+Adt[1][agr][1][i][1][0]+Adt[1][agr][1][i][2][0]>0){ // if Arch: X,Y,Z >0  
        if(Adt[1][agr][1][i][0][4]==3||Adt[1][agr][1][i][1][4]==3||Adt[1][agr][1][i][2][4]==3){
          d=AnimCalc(1,i,-3.14+ang/2,1,2);}
        else{d=AnimCalc(1,i,ang,1,1);}
      bone[i].position=new BABYLON.Vector3(d[0],d[1],d[2]);
      }
    } 
    //-------------------------------------rotations             a=s * (ofs+(Siz*Funct((ang+phs)*spd)))
    for(let i=0;i<bn;i++){   //bone
      d[0]=0;d[1]=0;d[2]=0;
      if(Adt[1][agr][2][i][0][0]+Adt[1][agr][2][i][1][0]+Adt[1][agr][2][i][2][0]>0){
        if(Adt[1][agr][2][i][0][4]==3||Adt[1][agr][2][i][1][4]==3||Adt[1][agr][2][i][2][4]==3){
             d=AnimCalc(2,i,-3.14+ang/2,1,2);}
        else{d=AnimCalc(2,i,ang,1,1);} 
        bone[i].rotation=new BABYLON.Vector3(d[0],d[1],d[2]);
      }
    }

  //------------------------------stp  :  angular step for one frame
  switch(agr){
  case 0:stp=2*Math.PI/(1+Adt[1][agr][0][1]);break;
  case 1:stp=2*Math.PI/(Adt[1][agr][0][1]-Adt[1][0][0][1]);break;  
  case 2:stp=2*Math.PI/(Adt[1][agr][0][1]-Adt[1][1][0][1]);break;  
  case 3:stp=2*Math.PI/(Adt[1][agr][0][1]-Adt[1][2][0][1]);break;  
  case 4:stp=2*Math.PI/(Adt[1][agr][0][1]-Adt[1][3][0][1]);break;  
  }

  //  1+Adt[1][0][0][1];                   //frames  : frame to  of animation group 0
  //  1+Adt[1][1][0][1];                   //frames  : frame to  of animation group 1

  rend++;

  if(rend>100/speed){
    document.getElementById("fnvl").value=parseInt(ang/stp-1); // reference
//------------cursor
    if(document.getElementById("selPos").checked){pro=1;}else{pro=2;} //pr: (data:0  positions:1  rotations:2)
    bon=document.getElementById("OptBones2").value;
    WriteAnim(true,bon,pro);
//--------------------
      switch(stpa){
      case -1: ang-=stp;if(ang<1){ang+=2*Math.PI;} stpa=-2;break;
      case  0: ang+=stp;rend=0;break;
      case  1: ang+=stp;stpa=-2;break;
    }
    if(ang>2*Math.PI){ang-=(2*Math.PI)};
  }
  });
}

//          pr:(1:positions  2;rotations)  bn: bone  ang: progressive angle  of: offset
function AnimCalc(pr,bn,ang,of,m){
let c=[];
ang+=Math.PI;if(ang>2*Math.PI){ang-=2*Math.PI;} // rifasa animazione
c[0]=m*TypeFunct(Adt[1][agr][pr][bn][0],ang,of); //X
c[1]=m*TypeFunct(Adt[1][agr][pr][bn][1],ang,of); //Y
c[2]=m*TypeFunct(Adt[1][agr][pr][bn][2],ang,of); //Z
return c;
}


function GrRd(a){return a*Math.PI/180;}


function AnimationFrames(bool){     // compile  frames for SaveJModel  or save
  let gn,bn,fs,nf,nft,nfp,stp,a,s,t,v,sg,m=5,sn,agrm;
  let sp="             ";
  Anmt=[];
  bn=Bdt.length;                             //bones
  fs=Adt[0][0];                              //frames/sec 
  gn=Adt[1].length;                          //group number
  nft=1+Adt[1][0][0][1];                     //total frames 
  agrm=agr; //save
  for(let b=0;b<bn;b++){//------------------------------------------------for each bone
    nfp=0;                                   // progressive frame in all group
    Anmt[b]=[];
    for(let g=0;g<gn;g++){//-----------------------------------------------for each group 
      a=Math.PI;                             // phase of ini frame of group
      agr=g;
      nf=1+Adt[1][g][0][1]-Adt[1][g][0][0];  //frame of group g
      stp=2*Math.PI/nf;                      //angular step for each frame 
      for(let f=0;f<nf;f++){//--------------------------------------------for each frame
        Anmt[b][nfp+f]=[];
        Anmt[b][nfp+f][1]=AnimCalc(1,b,a,-1,1);  //1:   positions

/*  line 165...in  function Animation(){}

        if(Adt[1][agr][2][i][0][4]==3||Adt[1][agr][2][i][1][4]==3||Adt[1][agr][2][i][2][4]==3){
             d=AnimCalc(2,i,-3.14+ang/2,1,2);}
        else{d=AnimCalc(2,i,ang,1,1);} 
*/

        if(Adt[1][agr][2][b][0][4]==3||Adt[1][agr][2][b][1][4]==3||Adt[1][agr][2][b][2][4]==3){
 //            Anmt[b][nfp+f][2]=AnimCalc(2,b,3.14+a/2,-1,2);}  // 0  voto 4
 //            Anmt[b][nfp+f][2]=AnimCalc(2,b,-3.14+a/2,-1,2);} // 1       2
 //            Anmt[b][nfp+f][2]=AnimCalc(2,b,3.14+a/2,-1,1);}  // 2       5+
 //            Anmt[b][nfp+f][2]=AnimCalc(2,b,-3.14+a/2,-1,1);} // 3       3
             Anmt[b][nfp+f][2]=AnimCalc(2,b,3.14+a/2,-1,1);} // il più simile ...per tentetivi ???
        else{Anmt[b][nfp+f][2]=AnimCalc(2,b,a,-1,1);} 



 //       Anmt[b][nfp+f][2]=AnimCalc(2,b,a,-1,1);  //2:   rotations   -1


        a+=stp;
      }
      nfp+=nf;
    }
  }
  agr=agrm;//restore
//---------------------------------format bone.frames string
  AM=[];t="";
  for(let b=0;b<bn;b++){       //for each bone
    s="";
    s+='{"name":"'+Bdt[b][3]+'","index":'+Bdt[b][5]+',\n';
    s+='"matrix":[  1, 0, 0, 0,    0, 1, 0, 0,    0, 0, 1, 0,    ';
    s+=(""+Bdt[b][0].x+", "+Bdt[b][0].y+", "+Bdt[b][0].z+", 1],\n");   // position
    s+='"parentBoneIndex":'+Bdt[b][4]+',\n"animation":\n';
    s+='{"name":"anim","property":"_matrix","dataType":3,"framePerSecond":'+Adt[0][0];
    s+=',"loopBehavior":1,\n"keys":[\n'; //  (0 = relative, 1 = cycle, 2 = constant)
    for(let f=0;f<nft;f++){     //for each frame
      sn=""+f;//f.toString();
      sn=(sp.substring(0,3-sn.length)+sn);
      s+=('{"frame":'+sn+',"values":[');            //   occorre modificare Anmt
//-----------------------------------------------------------------------------------------------------------
      v=parseInt(Math.cos(Anmt[b][f][2][1])*Math.cos(Anmt[b][f][2][2])*100)/100;           //cosB cosG
      if(v>=0){sg=' ';}else{sg='-';};v=sg+Math.abs(v).toString();
      s+=(sp.substring(0,m-v.length)+v+",");              //  0,
      v=Math.sin(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][1])*Math.cos(Anmt[b][f][2][2]);  //sinA sinB cosG
      v=parseInt((v-Math.cos(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][2]))*100)/100        //   -cosA sinG  
      if(v>=0){sg=' ';}else{sg='-';};v=sg+Math.abs(v).toString();
      s+=(sp.substring(0,m-v.length)+v+",");               //  1,
      v=Math.cos(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][1])*Math.cos(Anmt[b][f][2][2]);  //cosA sinB cosG
      v=parseInt((v+Math.sin(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][2]))*100)/100        //   +sinA sinG  
      if(v>=0){sg=' ';}else{sg='-';};v=sg+Math.abs(v).toString();
      s+=(sp.substring(0,m-v.length)+v+",0,");             //  2,3,   
//-----------------------------------------------------------------------------------------------------------
      v=parseInt(Math.cos(Anmt[b][f][2][1])*Math.sin(Anmt[b][f][2][2])*100)/100;           //cosB sinG
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v).toString();
      s+=(sp.substring(0,m-v.length)+v+",");               // 4,
      v=Math.sin(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][1])*Math.sin(Anmt[b][f][2][2]);  //sinA sinB sinG
      v=parseInt((v+Math.cos(Anmt[b][f][2][0])*Math.cos(Anmt[b][f][2][2]))*100)/100        //   +cosA cosG  
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v);
      s+=(sp.substring(0,m-v.length)+v+",");            //  5,
      v=Math.cos(Anmt[b][f][2][0])*Math.sin(Anmt[b][f][2][1])*Math.sin(Anmt[b][f][2][2]);  //cosA sinB sinG
      v=parseInt((v-Math.sin(Anmt[b][f][2][0])*Math.cos(Anmt[b][f][2][2]))*100)/100        //   -sinA cosG  
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v).toString();
      s+=(sp.substring(0,m-v.length)+v+",0,");             //  6,7,   
//-----------------------------------------------------------------------------------------------------------
      v=parseInt(-Math.sin(Anmt[b][f][2][1])*100)/100;                                     //-sinB
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v).toString();
      s+=sp.substring(0,m-v.length)+v+",";               // 8,
      v=parseInt(Math.sin(Anmt[b][f][2][0])*Math.cos(Anmt[b][f][2][1])*100)/100;           //sinA cosB
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v).toString();
      s+=sp.substring(0,m-v.length)+v+",";               // 9,
      v=parseInt(Math.cos(Anmt[b][f][2][0])*Math.cos(Anmt[b][f][2][1])*100)/100;           //cosA cosB
      if(v>=0){sg=' ';}else{sg='-';} v=sg+Math.abs(v).toString();
      s+=sp.substring(0,m-v.length)+v+",0,";             //10,11
//-----------------------------------------------------------------------------------------------------------
      s+=("   "+(Bdt[b][0].x-Anmt[b][f][1][0])+", "+     // last test  - - - ok 
                (Bdt[b][0].y-Anmt[b][f][1][1])+", "+
                (Bdt[b][0].z-Anmt[b][f][1][2])+", 1");   // position
//-----------------------------------------------------------------------------------------------------------
      if(f<nft-1){s+="]},\n";}else{s+="]}\n";}
    }
    if(b<bn-1){s+=']}},\n\n'}
    else{s+=']}}\n],\n\n';
      s+='"ranges":[{"name":"ArmatureAction","from":0,"to":'+(nft-1)+'}]}],\n';
    }  
    AM[b]=s;
    t+=(s+"\n");
  }
  if(bool){
//  saveTxt("Save frames ?",t,"frames");}     // Save in format .txt
  Download_Txt("Download ?",t,"frames.js");}  // Save in format .js 
  else{return t;}
}  


//    _                                                                                             _
//   |  cosB cosG        sinA sinB cosG  - cosA sinG       cosA sinB cosG  +  sinA sinG        0     |   
//   |  cosB sinG        sinA sinB sinG  + cosA cosG       cosA sinB sinG  -  sinA cosG        0     |
//   |    -sinB                   sinA cosB                         cosA  cosB                 0     |
//   |_     X                         Y                                  Z                     1    _|


function DoFrames(f,m,ao,opt,bx,fr){ //frames ,  module ,angular offset,  options, bone index , frequence
let sta=2*Math.PI/f;       //angular step
let sp="           ";
let sn,snn,cs,ss,a=0;
let s='/* Name:'+Hname+'  module: '+m+'   angular offset: '+ao+'   options: '+opt+
'  frames: '+f+'  bone index: '+bx+'  frequence : '+fr+'\n';
setTimeout(function() {
  for(let i=0;i<f;i++){
    a=m*Math.sin(sta*i*fr);
    ss=''
    sn=(parseInt(Math.sin(a)*100)/100);if(sn>=0){ss=' ';}
    sn=ss+sn.toString(); sn=sn+sp.substring(0,5-sn.length);
    ss=''
    snn=(parseInt(-Math.sin(a)*100)/100);if(snn>=0){ss=' ';}
    snn=ss+snn.toString(); snn=snn+sp.substring(0,5-snn.length);
    ss=''
    cs=(parseInt(Math.cos(a)*100)/100);if(cs>=0){ss=' ';}
    cs=ss+cs.toString(); cs=cs+sp.substring(0,5-cs.length);
    switch(opt){
      case "XY":
        if(i<10){s+='{"frame": '+i+',"values":[';}else{s+='{"frame":'+i+',"values":[';}
        s+=cs+','+snn+',  0,  0,'+sn+','+cs+',  0,  0,    0,    0,    1,    0,    ';
        s+=formatPL(4,Bdt[bx][0].x,Bdt[bx][0].y,Bdt[bx][0].z)+',    1]}';
        if(i<f-1){s+=',\n';}else{s+='\n'};break;
      case "XZ":
        if(i<10){s+='{"frame": '+i+',"values":[';}else{s+='{"frame":'+i+',"values":[';}
        s+=cs+',  0,'+sn+',  0,  0,  1,  0,  0,'+snn+',   0,'+cs+',  0,    ';
        s+=formatPL(4,Bdt[bx][0].x,Bdt[bx][0].y,Bdt[bx][0].z)+',    1]}';
        if(i<f-1){s+=',\n';}else{s+='\n'};break;
      case "YZ":
        if(i<10){s+='{"frame": '+i+',"values":[';}else{s+='{"frame":'+i+',"values":[';}
        s+='  1,  0,  0,  0,  0,'+cs+','+snn+',  0,  0,'+sn+','+cs+',   0,   ';
        s+=formatPL(4,Bdt[bx][0].x,Bdt[bx][0].y,Bdt[bx][0].z)+',    1]}';
        if(i<f-1){s+=',\n';}else{s+='\n'};break;
    }
  }
  s+='*/';
  Download_Txt("Download ?",s,"anim.js") 
},1000)
}

function StopA(v){stpa=v;}

//  Matrix of rotation fi  around the Z axis  -- XY
//    _                                 _
//   |  cos(fi)     -sin(fi)      0     0  |
//   |  sin(fi)      cos(fi)      0     0  |
//   |    0            0          1     0  |
//   |_   0            0          0     1 _|     (bone position)  x,y,z,   1

//  Matrix of rotation fi  around the Y axis  -- XZ
//    _                                 _
//   |  cos(fi)        0       sin(fi)  0  |
//   |    0            1          0     0  |
//   | -sin(fi)        0       cos(fi)  0  |
//   |_   0            0          0     1 _|     (bone position)  x,y,z,   1

//  Matrix of rotation fi  around the X axis  -- YZ
//    _                                 _
//   |    1            0          0     0  |
//   |    0          cos(fi)   -sin(fi) 0  |
//   |    0          sin(fi)   cos(fi)  0  |
//   |_   0            0          0     1 _|     (bone position)  x,y,z,   1

//  Matrix of rotation  A B G  and traslation  X Y Z
//    _                                                                                             _
//   |  cosB cosG        sinA sinB cosG  - cosA sinG       cosA sinB cosG  +  sinA sinG        0     |   
//   |  cosB sinG        sinA sinB sinG  + cosA cosG       cosA sinB sinG  -  sinA cosG        0     |
//   |    -sinB                   sinA cosB                         cosA  cosB                 0     |
//   |_     X                         Y                                  Z                     1    _|
