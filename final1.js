// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDOLRTtaHbM9GV2MoK2k8nlXRmN4q18tI",
    authDomain: "graphicalpasswordvcet.firebaseapp.com",
    projectId: "graphicalpasswordvcet",
    storageBucket: "graphicalpasswordvcet.appspot.com",
    messagingSenderId: "6701771027",
    appId: "1:6701771027:web:6faee0ad0586f363d752e6"
  };

// initialize firebase so that it runs on the given configs 
firebase.initializeApp(firebaseConfig);

// loginForm
// gives auth all the firebase auth methods
const auth = firebase.auth();
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];            

function random() {
    //shuffle images
    for(let i=array.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
    //changes the images based on the radio button clicked through selected
    const radioButtons = document.querySelectorAll('input[name="option"]');
    let selected;
    for(const radioButton of radioButtons) {
        if(radioButton.checked) {
            selected = radioButton.value;
                break;
        }
    }
    //runs fill so as u click button the pass is written in the password box
    for(let i=0; i<9; i++) {
        document.getElementById(`a${i}`).innerHTML=`
        <button onclick="fill()"><img src="${selected}/${array[i]}.jpg" id="${array[i]}" style="height: 100px; width: 100px;"></button>
    `;
    }
}
    // fills the passsword with image id       
function fill(e) {
    var cur = document.getElementById('password').value;
    e = e || window.event;
    e = e.target || e.srcElement;
    cur += e.id;
    document.querySelector("#password").value=cur;
}

function checkUserFirstName(){
    var firstName = document.getElementById("firstname").value;
    var flag = false;
    if(firstName === ""){
        flag = true;
    }
    if(flag){
        alert("First Name Can't be Empty!");
    }
}

function checkUserLastName(){
    var lastName = document.getElementById("lastname").value;
    var flag = false;
    if(lastName === ""){
        flag = true;
    }
    if(flag){
        alert("Last Name Can't be Empty!");
    }
}

function checkUserEmail(){
    var userEmail = document.getElementById("email");
    //regrex patten to validate email
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        alert("Invalid Email Entered!");
    }
}

function reset() {
    const pass=document.getElementById("password");
    pass.value = "";
    random();
}

//signup function
function signUp() {
    checkUserFirstName();
    checkUserLastName();
    checkUserEmail();
    var email = document.getElementById("email").value;
    const pas=document.getElementById("password").value;
    //promise to send the email and password to firebase
    const promise = auth.createUserWithEmailAndPassword(email, pas);
    promise.catch(e => alert(e.message));
    reset();
    activeUser();
}

//signin function
function signIn() {
    checkUserEmail();
    var email = document.getElementById("email");
    const pas=document.getElementById("password").value;
    //promise to check wheather the email and password  is correct or not
    const promise = auth.signInWithEmailAndPassword(email.value, pas);
    promise.catch(e => alert(e.message));
    reset();
    activeUser();
}

//sing out
function signOut() {
    auth.signOut();
    window.location.href = "home.html";
}

// active user to homepage
function activeUser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var email = user.email;
            alert("Active user " + email);
            window.location.href="detail.html";
        }
    // else {
    //     alert("No Active user Found");
    // }
    })
}

//call random() while reload page
window.onload = random;
