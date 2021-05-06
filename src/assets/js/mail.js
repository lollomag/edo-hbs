import emailjs from 'emailjs-com';

export default class Mail {
  load() {
    this.init();
  }
  init() {
    // const sendBtn = document.querySelector('#form-send-button');

    // if(sendBtn) {
    //   sendBtn.addEventListener('click', () => {
    //     this.mail();
    //   })
    // }

  }

  mail() {
    emailjs.init("user_z3RyQJDmg35SxTcFSRJiO");

    const btn = document.querySelector('#form-send-button');

    const form = document.querySelector('#info-form');

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const object = form.querySelector('#object').value;
    const message = form.querySelector('#message').value;


    let templateParams = {
      object,
      name,
      message,
      email
    };
    

    btn.classList.add('loading')
    const serviceID = 'service_h9shcxh'
    const templateID = "template_fliqvno";

    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {

        if (response.status === 200) {
          $('#modal-email').modal('show')
          btn.classList.remove('loading');
          this.cleanForm()
        }
      }, (error) => {});
  }

  cleanForm() {
    const form = document.querySelector('#info-form');

    form.querySelector('#name').value = ""
    form.querySelector('#email').value = ""
    form.querySelector('#object').value = ""
    form.querySelector('#message').value = ""
  }
}