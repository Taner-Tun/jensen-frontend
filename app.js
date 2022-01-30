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

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {  //set up some behaviour
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');

    const acceptFn = event => {   //accept button clicked
        saveToStorage(storageType);
        consentPopup.classList.add('hidden');
    };
        acceptBtn.addEventListener('click', acceptFn);
        
   if(shouldShowPopup(storageType)) {
    setTimeout(() => {
     
       consentPopup.classList.remove('hidden');
    },2000);
    
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