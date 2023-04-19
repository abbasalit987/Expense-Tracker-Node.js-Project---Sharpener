const link = 'http://localhost:7000';
const token = localStorage.getItem('token');
// Get the expenses from the server
axios.get(`${link}/expense/get-expenses`,{headers : {'Authorization' : token}})
  .then((response) => {
    // If the request is successful, populate the table with expenses
    // console.log(response);
    const expenses = response.data.expense;
    populateTable(expenses);
  })
  .catch(function (error) {
    console.log(error);
  });

// Handle the form submission
const form = document.getElementById('expense-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const amount = document.getElementById('expense-amount').value;
  const description = document.getElementById('expense-desc').value;
  const category = document.getElementById('expense-cat');
  const selectedOption = category.options[category.selectedIndex].value;
  // const userId = localStorage.getItem('token').userId;

  // Send the expense data to the server
  axios.post(`${link}/expense/add-expenses`, {
    category: selectedOption,
    description: description,
    amount: amount
  },{headers : {'Authorization' : token}})
  .then((response) =>  {
    // If the request is successful, add the new expense to the table
    // console.log(response);
    const newExpense = response.data.expense;
    addExpenseToTable(newExpense);

    // Reset the form
    form.reset();
  })
  .catch(err => console.log(err));
});

function populateTable(expenses) {
  const tableBody = document.getElementById('expense-table-body');
  let rows = '';
  // console.log(expenses);

  // Loop through the expenses and create a row for each one
  expenses.forEach(function(expense) {
    rows += `
      <tr id='row-${expense.id}'>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td><button onclick = 'deleteExpense(${expense.id})' class="delete-btn">Delete</button></td>
        
      </tr>
    `;
  });

  // Add the rows to the table body
  tableBody.innerHTML = rows;
}

function addExpenseToTable(expense) {
  const tableBody = document.getElementById('expense-table-body');

  // Create a row for the new expense
  const newRow = document.createElement('tr');
  newRow.id = 'row-${expense.id}';
  newRow.innerHTML = `
    <td>${expense.category}</td>
    <td>${expense.description}</td>
    <td>${expense.amount}</td>
    <td><button onclick = 'deleteExpense(${expense.id})' class="delete-btn">Delete</button></td>
  `;

  // Add the row to the table body
  tableBody.appendChild(newRow);
}

deleteExpense = (id) => {
   axios.delete(`${link}/expense/delete-expense/${id}`,{headers : {'Authorization' : token}})
  .then(() => {
    const expenseElemId = `row-${id}`;
    document.getElementById(expenseElemId).remove();
  })
  .catch(err => console.log(err));
};
