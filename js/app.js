// Classes

class Budget {
     constructor(budget) {
          this.budget = Number( budget );
          this.budgetLeft = this.budget;
     }

     // Substrack from the budget
     substractFromBudget(amount) {
          return this.budgetLeft -= amount;
     }
}

class HTML{
     // add budget to html when user submits
     insertBudget(amount) {
          budgetTotal.innerHTML = `${amount}`;
          budgetLeft.innerHTML = `${amount}`;
     }


     // Displays a message (correct or invalid)
     printMessage(message, className) {
          const messageWrapper = document.createElement('div');
          messageWrapper.classList.add('text-center', 'alert', className);
          messageWrapper.appendChild(document.createTextNode(message));

          // add message to the html
          document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);


          // Clear the error
          setTimeout(function() {
               document.querySelector('.primary .alert').remove();
               addExpenseForm.reset();
          }, 3000);

     }
     // Show expenses from the form into the list
     addExpenseToList(name, amount) {
          const expensesList = document.querySelector('#expenses ul');
          const li = document.createElement('li');
          li.className = "list-group-item d-flex justify-content-between align-items-center";
          li.innerHTML = `
               ${name}
               <span class="badge badge-primary badge-pill">$ ${amount}</span>
          `;

          // add to the html
          expensesList.appendChild(li);
     }

     // Subtract expense amount from budget
     trackBudget(amount) {
          const budgetLeftDollars = budget.substractFromBudget(amount);
          budgetLeft.innerHTML = `${budgetLeftDollars}`;

          // Check when 25% is left
          if( (budget.budget / 4 ) > budgetLeftDollars ){
               budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
               budgetLeft.parentElement.parentElement.classList.add('alert-danger');

          } else if( (budget.budget / 2 ) > budgetLeftDollars  ) {
               budgetLeft.parentElement.parentElement.classList.remove('alert-success');
               budgetLeft.parentElement.parentElement.classList.add('alert-warning');

          }
     }
}

const addExpenseForm = document.querySelector('#add-expense'), 
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');


let budget, userBudget;

// instantiate the html class
const html = new HTML();

// Event Listeners
eventListeners();
function eventListeners() {

     document.addEventListener('DOMContentLoaded', function() {
          // Ask what this weeks budget is
          userBudget = prompt(' What\'s your budget for this week? ');
          // validate the userBudget 
          if(userBudget === null || userBudget === '' || userBudget === '0'  ) {
               window.location.reload();
          } else {
               budget = new Budget(userBudget);
               html.insertBudget(budget.budget);
          }
     });

     // When a new expense is added
     addExpenseForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Read the input values
          const expenseName = document.querySelector('#expense').value;
          const amount = document.querySelector('#amount').value;

          if(expenseName === '' || amount === '') {
               console.log(html);
               html.printMessage('There was error, all the fields are mandatory', 'alert-danger');
          } else {
               // Add the Expenses into the list
               html.addExpenseToList(expenseName, amount);
               html.trackBudget(amount);
               html.printMessage('Adding...', 'alert-success');
          }
     });
}
