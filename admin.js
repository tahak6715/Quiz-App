 // Import the functions you need from the SDKs you need

 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

 import { getDatabase,ref,get, set, push,child, onChildAdded,remove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


 // TODO: Add SDKs for Firebase products that you want to use

 // https://firebase.google.com/docs/web/setup#available-libraries


 // Your web app's Firebase configuration

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional

 const firebaseConfig = {

   apiKey: "AIzaSyCADzEs7gJW-nOwxgVnjwkEepGYaqCEA30",

   authDomain: "quiz-software-5a6da.firebaseapp.com",

   projectId: "quiz-software-5a6da",

   storageBucket: "quiz-software-5a6da.appspot.com",

   messagingSenderId: "79713589277",

   appId: "1:79713589277:web:0e6b076abeaaba11250ef4",

   measurementId: "G-1HXWNSVMJD"

 };


 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 const database = getDatabase();



 var question = document.getElementById("question")
 var option1=document.getElementById("option1")
 var option2=document.getElementById("option2")
 var option3=document.getElementById("option3")
 var option4=document.getElementById("option4")
 var amswer=document.getElementById("answer")

 var main = document.getElementById("tasklist")
var editid;

window.des =function(){

   // console.log(option1.value)
   var obj
   let taskreference;
   if(editid){
       obj ={    
           question:question.value,
           option:[
               option1.value,
               option2.value,
               option3.value,
               option4.value,
           ],
           correctanswer:amswer.value,
           id:editid
              };
              console.log(obj)
taskreference = ref(database, `taska/${editid}`)
editid="";
   }else{
obj ={    
question:question.value,
option:[
   option1.value,
   option2.value,
   option3.value,
   option4.value,
],
correctanswer:amswer.value
  };
  console.log(obj)

  const keyref = ref(database,`taska/`)
  obj.id=push(keyref).key

 taskreference = ref(database, `taska/${obj.id}`)
}
  set(taskreference,obj);
  question.value = ""
  option1.value = ""
  option2.value =""
  option3.value = ""
  option4.value = ""
  amswer.value =""
  main.innerHTML = "" ;
     takedata();

}
var arr = []

window.takedata=function(){
   arr = []  
     const taskreference = ref(database, `taska/`)
   
     onChildAdded(taskreference,function(data){
       //   console.log(data.val())
         arr.push(data.val())
       renderData()
       })            
   
         
   console.log(arr)
    
   }
   

   window.renderData = function(){

       main.innerHTML = "" ;
       for(var i=0 ; i < arr.length ; i++){
         main.innerHTML += `  <ul > 
         <li class="text-center" li id="option ">${arr[i].question}</li>
         <li class="lis">${arr[i].option[0]}</li>
         <li class="lis">${arr[i].option[1]}</li>
         <li class="lis">${arr[i].option[2]}</li>
         <li class="lis">${arr[i].option[3]}</li>
         <li class="lis1">${arr[i].correctanswer}</li>
         <button class="btn_edit" onclick="edit('${arr[i].question}','${arr[i].option[0]}','${arr[i].option[1]}','${arr[i].option[2]}','${arr[i].option[3]}','${arr[i].correctanswer}','${arr[i].id}')">EDIT</button>
         <button class="btn_edit" onclick="dele('${arr[i].id}')">DELETE</button>
         </ul>
     `
       }
       }
       


         
 window.dele=function(id){
   // console.log(id)
   const taskreference = ref(database,`taska/${id}`)
   remove(taskreference)
   .then(function(e){
     console.log(e)
     main.innerHTML=""
     takedata();
   })
 .catch(function(er){
   console.log(er)
 })
 }


window.edit=function(question_1,option_1,option_2,option_3,option_4,answer_1,id){
   // console.log(task)
   console.log(id)
   question.value = question_1;
   option1.value = option_1
   option2.value = option_2
   option3.value = option_3
   option4.value = option_4
   amswer.value = answer_1
   editid = id;
   
     }
   window.mainpg=function(){
     window.location.replace('index.html')
   }