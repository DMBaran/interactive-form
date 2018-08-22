document.addEventListener('DOMContentLoaded', () => {
  
  // variables used to capture elements from index.html //
  document.querySelector(".is-hidden").style.display = "none";
  const title = document.getElementById('title');
  const other = title.lastElementChild.value;
  const design = document.getElementById('design');
  const color = document.getElementById('color');
  const colorChoices = color.children;
  const activities = document.querySelector('.activities');
  const activityChoices = activities.children;
  const payment = document.getElementById('payment');
  payment.children[0].className = "credit_card";
  const paragraph = document.getElementsByTagName('p');
  paragraph[0].style.display = 'none';
  paragraph[1].style.display = 'none';
  const creditCard = document.getElementById('credit-card');
  const submitButton = document.getElementById('submit');
  const name = document.getElementById('name');
  const mail = document.getElementById('mail');
  const ccNum = document.getElementById('cc-num');
  const zip = document.getElementById('zip');
  const cvv = document.getElementById('cvv');
  document.getElementById('colors-js-puns').style.display = 'none';
  const totalCost = document.getElementById('total-cost');
  let amountOwed = 0;
  const invalidName = document.querySelector('.invalidName');
  const invalidEmail = document.querySelector('.invalidEmail');
  const invalidCardNumber = document.querySelector('.invalidCardNumber');
  const invalidZipCode = document.querySelector('.invalidZipCode');
  const invalidCVV = document.querySelector('.invalidCVV');
  const noProgramSelected = document.querySelector('.noProgramChecked');
  
  // Event listener used to display input field for job selection "other" //
  title.addEventListener('change', (event) => {
    if (event.target.value === other) {
      document.querySelector(".is-hidden").style.display = "block";
    } else if (event.target.value != other) {
      document.querySelector(".is-hidden").style.display = "none";
    }
  });

  // Event listener used to hide and display the color for the designs on t-shirts //
  design.addEventListener('change', (event) => {
    
    if (event.target.value === 'js puns') {
      color.selectedIndex = 0;
      document.getElementById("colors-js-puns").style.display = "block";
      colorChoices[0].style.display = 'block';
      colorChoices[1].style.display = 'block';
      colorChoices[2].style.display = 'block';
      colorChoices[3].style.display = 'none';
      colorChoices[4].style.display = 'none';
      colorChoices[5].style.display = 'none';
    } else if (event.target.value === 'heart js') {
      color.selectedIndex = 3;
      document.getElementById("colors-js-puns").style.display = "block";
      colorChoices[0].style.display = "none";
      colorChoices[1].style.display = "none";
      colorChoices[2].style.display = "none";
      colorChoices[3].style.display = "block";
      colorChoices[4].style.display = "block";
      colorChoices[5].style.display = "block";
    } else if (event.target.value != "js puns" || "heart js") {
      document.getElementById("colors-js-puns").style.display = "none";
    }
  });

  /*--------------------------------------------------
    Event listener used to check and uncheck programs, 
    disabling programs with conflicting time schedules,
    and add the total cost of the programs selected.
  --------------------------------------------------*/
  activities.addEventListener('change', (event) => {

    const checkBox = event.target;
    const checked = event.target.checked;
      
    if (checked) {  
      if (checkBox.parentNode === activityChoices[1]) {
        amountOwed += 200;
      } else if (checkBox.parentNode === activityChoices[2]) {
        activityChoices[4].childNodes[0].setAttribute('disabled', true);
        activityChoices[4].className = 'grey';
        amountOwed += 100;
      } else if (checkBox.parentNode === activityChoices[3]) {
        activityChoices[5].childNodes[0].setAttribute("disabled", true);
        activityChoices[5].className = "grey";
        amountOwed += 100;
      } else if (checkBox.parentNode === activityChoices[4]) {
        activityChoices[2].childNodes[0].setAttribute("disabled", true);
        activityChoices[2].className = "grey";
        amountOwed += 100;
      } else if (checkBox.parentNode === activityChoices[5]) {
        activityChoices[3].childNodes[0].setAttribute("disabled", true);
        activityChoices[3].className = "grey";
        amountOwed += 100;
      } else if (checkBox.parentNode === activityChoices[6]) {
        amountOwed += 100;
      } else if (checkBox.parentNode === activityChoices[7]) {
        amountOwed += 100;
      }
    }
    if (checked === false) {
      if (checkBox.parentNode === activityChoices[1]) {
        amountOwed -= 200;
      } else if(checkBox.parentNode === activityChoices[2]) {
        activityChoices[4].childNodes[0].removeAttribute("disabled", true);
        activityChoices[4].classList.remove("grey");
        amountOwed -= 100;
      } else if (checkBox.parentNode === activityChoices[3]) {
        activityChoices[5].childNodes[0].removeAttribute("disabled", true);
        activityChoices[5].classList.remove("grey");
        amountOwed -= 100;
      } else if (checkBox.parentNode === activityChoices[4]) {
        activityChoices[2].childNodes[0].removeAttribute("disabled", true);
        activityChoices[2].classList.remove("grey");
        amountOwed -= 100;
      } else if (checkBox.parentNode === activityChoices[5]) {
        activityChoices[3].childNodes[0].removeAttribute("disabled", true);
        activityChoices[3].classList.remove("grey");
        amountOwed -= 100;
      } else if (checkBox.parentNode === activityChoices[6]) {
        amountOwed -= 100;
      } else if (checkBox.parentNode === activityChoices[7]) {
        amountOwed -= 100;
      } 
    }
    totalCost.innerHTML = '<h3 style="color: darkGreen">Total amount $' + amountOwed + '.00</h3>';
  });

  /*----------------------------------------------- 
    Event Listener used to hide and display different 
    forms of payment depending on the payment method
    they choose.
  ------------------------------------------------*/
  payment.addEventListener('change', (event) => {

    if (event.target.value === "credit card") {
      creditCard.style.display = "block";
      paragraph[0].style.display = 'none';
      paragraph[1].style.display = 'none';
      payment.children[0].className = "credit_card";
    } else if (event.target.value === "paypal") {
      paragraph[0].style.display = "block";
      paragraph[1].style.display = "none";
      creditCard.style.display = "none";
      payment.children[0].classList.remove('credit_card');
    } else if (event.target.value === "bitcoin") {
      paragraph[0].style.display = "none";
      paragraph[1].style.display = "block";
      creditCard.style.display = "none";
      payment.children[0].classList.remove("credit_card");
    }
  });

  /*-----------------------------------------------
    When the enter key or register button is clicked
    a series of if statements are triggered checking 
    to make sure all of the required fields are 
    filled out.
  ------------------------------------------------*/
  submitButton.addEventListener('click', (event) => {
 
    if (name.value === '') {
      event.preventDefault();
      name.className = 'redBorder';
      invalidName.className = 'red';
      invalidName.innerHTML = '<h3>You must enter your name for submission.</h3>';
    } 
    if (payment.children[0].className === 'credit_card') {

      if (ccNum.value.length > 16 || ccNum.value.length < 13 || isNaN(ccNum.value)) {
        event.preventDefault();
        ccNum.className = "redBorder";
        invalidCardNumber.className = "red";
        invalidCardNumber.innerHTML = "<h3>Must have a valid credit card number.</h3>";
      } 
      if (zip.value.length != 5 || isNaN(zip.value)) {
        event.preventDefault();
        zip.className = "redBorder";
        invalidZipCode.className = "red";
        invalidZipCode.innerHTML = "<h3>Invalid zip code.</h3>";
      } 
      if (cvv.value.length != 3 || isNaN(cvv.value)) {
        event.preventDefault();
        cvv.className = "redBorder";
        invalidCVV.className = "red";
        invalidCVV.innerHTML = "<h3>Invalid cvv number.</h3>";
      }  
    } 
    if (activityChoices[1].children[0].checked === false && 
      activityChoices[2].children[0].checked === false && 
      activityChoices[3].children[0].checked === false && 
      activityChoices[4].children[0].checked === false && 
      activityChoices[5].children[0].checked === false && 
      activityChoices[6].children[0].checked === false && 
      activityChoices[7].children[0].checked === false) {
      event.preventDefault();
      noProgramSelected.className = "red";
      noProgramSelected.innerHTML = "<h3>You must select at least one program.</h3>";
    } 
    if (mail.validity.typeMismatch || mail.value === '') {
      event.preventDefault();
      mail.className = "redBorder";
      invalidEmail.className = "red";
      invalidEmail.innerHTML = "<h3>Must have a valid email address.</h3>";
    }
  });
});