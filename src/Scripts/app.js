const addBtn = document.querySelector('button');
const taskDiv = document.querySelectorAll('div.row')[3];
taskDiv.innerHTML = localStorage.getItem('tasks');
const taskDescription = document.querySelector('#task');
const assigneeName = document.querySelector('#assigneeName');
const assigneeEmail = document.querySelector('#assigneeEmail');
const dueDate = document.querySelector('#dueDate');

addBtn.addEventListener('click', () => {
     let div = document.createElement('div');
     div.className = 'col-12 col-sm-4 mt-1';

     let card = document.createElement('div');
     card.className = 'card';

     let cardHead = document.createElement('div');
     cardHead.className = 'card-header';

     let cardBody = document.createElement('div');
     cardBody.className = 'card-body';

     let cardFoot = document.createElement('div');
     cardFoot.className = 'card-footer';

     card.appendChild(cardHead);
     card.appendChild(cardBody);
     card.appendChild(cardFoot);

     let name = document.createElement('h2');
     name.className = 'name';

     let datee = document.createElement('h3');
     datee = dueDate.value;

     name.innerHTML = assigneeName.value + '<small class="text-danger pl-1">Due: ' + datee + '</small>';

     cardHead.appendChild(name);

     let desc = document.createElement('p');
     desc.textContent = taskDescription.value;

     cardBody.appendChild(desc);

     let sendBtn = document.createElement('button');
     sendBtn.className = 'btn btn-info';
     sendBtn.textContent = 'Send Mail';
     sendBtn.setAttribute('data-email', assigneeEmail.value);

     cardFoot.appendChild(sendBtn);
     div.appendChild(card);
     taskDiv.appendChild(div);

     //store to local storage
     localStorage.setItem('tasks', taskDiv.innerHTML);
});

taskDiv.addEventListener('click', () => {
     if (event.target.tagName == 'BUTTON') {
          let p = event.target.parentElement.parentElement;
          console.log(p);
          let n = p.firstElementChild.textContent;
          console.log(n);
          let nm = n.substr(0,n.indexOf('Due:'));
          console.log(nm);
          let t = p.children[1].firstElementChild.textContent;
          console.log(t);

          var templateParams = {
               email: event.target.getAttribute('data-email'),
               name: nm,
               task: t
          };

          emailjs.send('default_service','task',templateParams);
     }
});
