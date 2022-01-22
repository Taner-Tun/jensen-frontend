const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});
      return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    },
};

const storage = cookieStorage;
const consentForm = 'user_consent';

const popup = () => !storage.getItem(consentForm);
const saveToStorage = () => storage.setItem(consentForm, true);

window.onload = () => {  //set up some behaviour
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');

    const acceptFn = event => {   //accept button clicked
        saveToStorage(storage);
        consentPopup.classList.add('hidden');
    };

    acceptBtn.addEventListener('click', acceptFn);


   if(popup(storage)) {
     consentPopup.classList.remove('hidden');
   }
};


document.addEventListener("submit" , (event)=>{
    console.log("Validating")
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/authorize");
    //request.send(new FormData(formElement));
    console.log("Validated")

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`user=${user}&password=${password}`);

    event.preventDefault()
})