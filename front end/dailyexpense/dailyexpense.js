// Get the expenses from the server
axios.get('/api/expenses')
  .then((response) => {
    // If the request is successful, populate the table with expenses
    const expenses = response.data.expenses;
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
  const description = document.getElementById('expense-description').value;
  const category = document.getElementById('expense-category').value;

  // Send the expense data to the server
  axios.post('/api/expenses', {
    amount: amount,
    description: description,
    category: category
  })
  .then(function (response) {
    // If the request is successful, add the new expense to the table
    const newExpense = response.data.expense;
    addExpenseToTable(newExpense);

    // Reset the form
    form.reset();
  })
  .catch(function (error) {
    console.log(error);
  });
});

function populateTable(expenses) {
  const tableBody = document.getElementById('expenses-table-body');
  let rows = '';

  // Loop through the expenses and create a row for each one
  expenses.forEach(function(expense) {
    rows += `
      <tr>
        <td>${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
      </tr>
    `;
  });

  // Add the rows to the table body
  tableBody.innerHTML = rows;
}

function addExpenseToTable(expense) {
  const tableBody = document.getElementById('expenses-table-body');

  // Create a row for the new expense
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
  `;

  // Add the row to the table body
  tableBody.appendChild(newRow);
}
