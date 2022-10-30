import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      });
    // setUsers(user);
    e.target.reset();
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input name='name' type="text" /> <br />
        <input name='email' type="text" /> <br />
        <button>Add user</button>
      </form>

      <h2>Users: {users.length}</h2>
      {
        users.map(usr => <p key={usr._id}>{usr.name} {usr.email}</p>)
      }
    </div>
  );
}

export default App;
