const userForm = document.getElementById('user-form');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('users-table');
let users = loadUsersData() || {};


// Call the build function on the stored users
buildTable(users);

addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(userForm);
    const newUser = Object.fromEntries(formData.entries());

    if (users[newUser.id]) {
        alert('User ID already exists!');
        return;
    }
    else if (userIsValid(newUser)) {
        users[newUser.id] = newUser;
        saveUsersData(users);
        addUser(newUser);
        userForm.reset();
    } else {
        alert('Please Enter a Valide Data!');
    }
});

// Build Table
function buildTable(users) {
    for (const user of Object.values(users)) {
        addUser(user);
    }
};

// Add User to table
function addUser(user) {
    const userRow = document.createElement('tr');
    userRow.id = `user-${user.id}`;

    const idCell = document.createElement('th');
    idCell.className = 'id-cell';
    idCell.innerHTML = user.id;
    userRow.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.className = 'name-cell';
    nameCell.innerHTML = user.name;
    userRow.appendChild(nameCell);

    const ageCell = document.createElement('td');
    ageCell.className = 'age-cell';
    ageCell.innerHTML = user.age;
    userRow.appendChild(ageCell);

    const editCell = document.createElement('td');
    editCell.className = 'edit-Cell';
    editCell.innerHTML = '<button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i> Edit</button>';
    editCell.firstChild.addEventListener('click', () => editUser(user));
    userRow.appendChild(editCell);

    const deletCell = document.createElement('td');
    deletCell.className = 'edit-Cell';
    deletCell.innerHTML = '<button class="btn btn-danger btn-sm"><i class="bi bi-x-lg"></i> Delete</button>';
    deletCell.firstChild.addEventListener('click', () => deleteUser(user));
    userRow.appendChild(deletCell);

    tableBody.appendChild(userRow);
}

// Delete a User
function deleteUser(user) {
    document.getElementById(`user-${user.id}`).remove();
    delete users[user.id];
    saveUsersData(users);
}

// Edit User
function editUser(user) {
    const userRow = document.getElementById(`user-${user.id}`);
    const userId = userRow.children[0];
    const userName = userRow.children[1];
    const userAge = userRow.children[2];
    const saveCell = userRow.children[3];
    const cancelCell = userRow.children[4];

    userId.innerHTML = `<input type="number" class="form-control" value="${user.id}" aria-label="modify Id" id="modified-id">`;
    userName.innerHTML = `<input type="text" class="form-control" value="${user.name}" aria-label="modify Name" id="modified-name">`;
    userAge.innerHTML = `<input type="number" class="form-control" value="${user.age}" aria-label="modify Age" id="modified-age">`;
    saveCell.innerHTML = '<button class="btn btn-primary btn-sm"><i class="bi bi-check-lg"></i> Save</button>';
    cancelCell.innerHTML = '<button class="btn btn-secondary btn-sm"><i class="bi bi-x-lg"></i> Cancel</button>';

    saveCell.firstElementChild.addEventListener('click', () => saveEdit(user));
    cancelCell.firstElementChild.addEventListener('click', () => cancelEdit(user));
}

function cancelEdit(user) {
    const userRow = document.getElementById(`user-${user.id}`);
    userRow.innerHTML = `
    <th class="id-cell">${user.id}</th>
    <td class="name-cell">${user.name}</td>
    <td class="age-cell">${user.age}</td>
    <td class="edit-Cell">
        <button class="btn btn-secondary btn-sm">
        <i class="bi bi-pencil"></i> Edit
        </button>
    </td>
    <td class="edit-Cell">
        <button class="btn btn-danger btn-sm">
        <i class="bi bi-x-lg"></i> Delete
        </button>
    </td>`;

    const editBtn = userRow.children[3].firstElementChild;
    const deleteBtn = userRow.children[4].firstElementChild;

    editBtn.addEventListener('click', () => editUser(user));
    deleteBtn.addEventListener('click', () => deleteUser(user));
}

function saveEdit(user) {
    const modifiedUser = {};
    modifiedUser.id = document.getElementById('modified-id').valueAsNumber;
    modifiedUser.name = document.getElementById('modified-name').value;
    modifiedUser.age = document.getElementById('modified-age').valueAsNumber;

    if (userIsValid(modifiedUser)) {
        const userRow = document.getElementById(`user-${user.id}`);
        userRow.innerHTML = `
        <th class="id-cell">${modifiedUser.id}</th>
        <td class="name-cell">${modifiedUser.name}</td>
        <td class="age-cell">${modifiedUser.age}</td>
        <td class="edit-Cell">
            <button class="btn btn-secondary btn-sm">
            <i class="bi bi-pencil"></i> Edit
            </button></td>
        <td class="edit-Cell">
            <button class="btn btn-danger btn-sm">
            <i class="bi bi-x-lg"></i> Delete
        </button>
        </td>`;

        const editBtn = userRow.children[3].firstElementChild;
        const deleteBtn = userRow.children[4].firstElementChild;
        
        editBtn.addEventListener('click', () => editUser(modifiedUser));
        deleteBtn.addEventListener('click', () => deleteUser(modifiedUser));
        
        users[user.id] = modifiedUser;
        saveUsersData(users);
    } else {
        alert('Please Enter a Valid Data!');
    }
}

// Validate User input
function userIsValid(newUser) {
    return (
        newUser.name.trim() !== '' &&
        !isNaN(newUser.id) && newUser.id > 0 &&
        !isNaN(newUser.age) && newUser.age >= 0
    );
}

// Save users data to local storage
function saveUsersData(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Load users data from the local storage
function loadUsersData() {
    return JSON.parse(localStorage.getItem('users'));
}