import { sendEmail } from "./mail";

const sendBtn = document.querySelector('#form-send-button');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    if(!validateForm()) return
    sendEmail()
  })
}

function validateForm() {
  const form = $('#info-form').parsley();
  
  if(!form.validate()) return false
  return true
}