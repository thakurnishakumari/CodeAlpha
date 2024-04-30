const form = document.getElementById('expenseForm');
const tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    const expense = {date, name, amount};

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.name}</td>
        <td>${expense.amount}</td>
        <td><button type="button" class="btn btn-sm btn-primary" onclick="editExpense(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td>
    `;

    tableBody.appendChild(row);

    saveExpenses(expense);

    form.reset();
});

function saveExpenses(expense) {
    let expenses = getExpenses();

    expenses.push(expense);

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpenses() {
    const expenses = localStorage.getItem('expenses');

    if (!expenses) {
        return [];
    }

    return JSON.parse(expenses);
}

function editExpense(row) {
    const rowIndex = row.rowIndex - 1;
    const expenses = getExpenses();
    const expense = expenses[rowIndex];

    document.getElementById('date').value = expense.date;
    document.getElementById('name').value = expense.name;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('editIndex').value = rowIndex;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;

        expenses[rowIndex] = {date, name, amount};

        localStorage.setItem('expenses', JSON.stringify(expenses));

        showExpenses();
    });
}

function deleteExpense(row) {
    const rowIndex = row.rowIndex - 1;
    const expenses = getExpenses();

    expenses.splice(rowIndex, 1);

    localStorage.setItem('expenses', JSON.stringify(expenses));

    showExpenses();
}

function showExpenses() {
    const expenses = getExpenses();

    tableBody.innerHTML = '';

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td><button type="button" class="btn btn-sm btn-primary" onclick="editExpense(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }
}

showExpenses();