async function loadUsers(numberOfUsers){
    const url = `https://randomuser.me/api/?results=${numberOfUsers}`;
    const response = await fetch(url);
    const data = await response.json();
 
    displayUsers(data.results);
}

function displayUsers(allUsers){
    allUsers.forEach(user => {
        const userName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        const userLocation = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}-${user.location.postcode}, ${user.location.country}`;

        const newUser = document.createElement('div');
        newUser.classList.add('card');
        newUser.innerHTML = `
        <div class="user-pic">
            <img src="${user.picture.large}" alt="User Pic">
        </div>
        <div class="user-info">
            <h2>${userName}</h2>
            <p>${user.gender}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Date of Birth:</strong> ${user.dob.date.split('T')[0]}</p>
            <p><strong>Age:</strong> ${user.dob.age}</p>
            <p><strong>Phone Number:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${userLocation}</p>
            <p><strong>Time zone:</strong> GMT${user.location.timezone.offset} (${user.location.timezone.description})</p>
        </div>
        `;

        allUsersContainer.appendChild(newUser);
    });
}

const allUsersContainer = document.getElementById('all-users');

document.getElementById('submit').addEventListener('click', fromSubmitted);

const userNumberInput = document.getElementById('number-user');
userNumberInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        fromSubmitted();
    }
});

function fromSubmitted(){
    const numberOfUsers = userNumberInput.value;
    userNumberInput.value = '';
    allUsersContainer.innerHTML = '';
    loadUsers(numberOfUsers);
}



