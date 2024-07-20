var st;



function SaveLocStrg(ss){localStorage.setItem("Babylon->"+Hname, ss);}


function LoadLocStrg(){
	let st="",msg;
	let key = "";
	let ii=-1;
//	alert(localStorage.length);
	for (var i = 0; i <= localStorage.length - 1; i++){
		key = localStorage.key(i);
		if(key=="Babylon->"+Hname){
			ii=i;
		}
	}
	if(ii!=-1){
		key = localStorage.key(ii);
	  st=localStorage.getItem("Babylon->"+Hname);
//		saveTxt("Save "+Hname+"--->LocalStorage",st,Hname+"_LocSto.js");  // test
	  DecodeDataLS(st);  // string to Data
		msg="key is OK  Data.length = "+st.length;
	}
	else{msg="key is not ";}
	return msg;
}

function LocStoCanc(){localStorage.clear();} 

function LocStoListItems(){
let s="LocalStorage Items :\n";
  for (var i = 0; i <= localStorage.length - 1; i++){
    s+=(localStorage.key(i)+"\n");
  }
alert(s);
Go();
}   

