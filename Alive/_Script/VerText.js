var VerText=
"---The sources data of skeletons are in  Data.js files--- \n\n"+
"This program is a little help to ease the manual editing\n"+
"of the Data.js files and has been put online for educational comparison.\n"+
"Notes:-----------------\n"+
"The few vertices of the skeleton often give rise to the fort\n"+
"non-planarity of 4 contiguous vertices. For this reason, the formation \n"+
"of the two relative triangles must be carefully examined.\n"+
"-----------------------\n"+
"Ver 1.1: add data saving in localstorage.\n"+
"Ver 1.2: add 2d UV point editing.\n"+
"Ver 1.3: add skeleton export in <.babylon> format.\n"+
"Ver 1.4: add skeleton viewer, add vertices & faces edit command\n"+
"Ver 1.5: 07/2022 add Edit Animations.\n\n"+
"         Alpha Version...work in progress...";

var HelpText0=
"---Help-->Skeleton----------------------\n"+
"This program is suitable for building small skeletons with few vertices and triangles.\n"+
"All source data are in  relative file  jscss/Data.js:\n\n"+
"pos[]   contains for each bone and for each 3d vertex the X,Y,Z value.\n"+
"UVR[]   contains the relative 2d vertex in pixels\n"+
"                 relative to X=0 center of image texture.\n"+
"ind[]   contains for each bone the triangles indices.\n"+
"Bdt[]   contains the data bones.\n"+
"Adt[]   contains the frames and the frames/sec,\n"+
"                 for each bone, for position and rotation the animations data:\n"+
"                 Size, Speed, Phase, Offset, Type.\n\n"+
"---Help-->Edit Animations----------------\n"+
"For each skeleton  you can edit  the frame  and the frame/sec\n"+
"For each bone , for position or rotation,  for  X(black) or Y(red) or Z(blue)\n"+
"you can edit:\n"+
"Function Type  :  Sin,  Trap,  Pulse,  Rebound,  Round\n"+
"Size           :  the value  from 0 to 1\n"+
"Speed          :  the value  from 0 to 8\n"+
"Phase          :  the value  from -180 to 180 degrees\n"+
"Offset         :  the value  from -180 to 180 degrees\n\n"+
"---Help-->Options----------------------\n"+
"Save :   Save  all data in localstorage\n"+
"Reset:   Reset data in localstorage with  jscss/Data.js file.\n\n"+
"---Help-->Files------------------------\n"+
"Data.js :  Export new Data.js file.\n"+
"UVMap   :  Export image texture.\n"+
".babylon  &&  Json  are incomplete....";

var HelpText1=
"---Help-->Bones";
var HelpText2=
"---Help-->Bone";
var HelpText3=
"---Help-->3d";
var HelpText4=
"---Help-->2d";
var HelpText5=
"---Help-->\u0394.";


