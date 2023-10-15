import { FormEvent, useState } from 'react';

type User = {
  id: number;
  name: string;
};

const dummyUsers: User[] = [
  { id: 1, name: 'anisul Islam' },
  { id: 2, name: 'alex warren' },
];

const Modal = ({ modalText }: { modalText: string }) => {
  return <p>{modalText}</p>;
};

const AppWithoutReducer = () => {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userName, setUserName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newUser = {
      id: Number(new Date().getTime().toString()),
      name: userName,
    };
    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });

    setIsModalOpen(true);
    setModalText('New book is added');

    // reset
    setUserName('');
  };

  const handleDeleteUser = (id: number) => {
    const filterUsers = users.filter((user) => user.id !== id);
    setUsers(filterUsers);
    setIsModalOpen(true);
    setModalText(' user is deleted');
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">User Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          value={userName}
        />
        <button type="submit">Create New User</button>
      </form>

      {isModalOpen && <Modal modalText={modalText} />}

      <h2>List of Users</h2>
      <section>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <article key={user.id}>
                <h3>{user.id}</h3>
                <p>{user.name}</p>
                <button
                  onClick={() => {
                    handleDeleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default AppWithoutReducer;
