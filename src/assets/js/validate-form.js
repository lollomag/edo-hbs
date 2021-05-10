import { sendEmail } from "./mail";


const sendBtn = document.querySelector('#form-send-button');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    console.log('daje');
    validateForm()
  })
}

function validateForm() {
  // let x= false
  $('#info-form').parsley()
    // .on('form:validated', function () {
    //   console.log('entra al validate', this);
    //   if (this.validationResult) {
    //     x = true
    //   }
    // })
    .on('form:success', function () {
      // console.log('non ci arriva qua si');
      return false; // Don't submit form for this demo
      // console.log('non ci arriva qua');

    });
}