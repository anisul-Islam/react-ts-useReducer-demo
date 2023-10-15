import { FormEvent, useEffect, useReducer, useState } from 'react';

type User = {
  id: number;
  name: string;
};

type AppActionType =
  | { type: 'ADD_USER'; user: User }
  | { type: 'DELETE_USER'; id: number }
  | { type: 'UPDATE_USER'; id: number; newName: string }
  | { type: 'SHOW_MODAL'; text: string }
  | { type: 'HIDE_MODAL' }
  | { type: 'CLEAR_MODAL_TEXT' };

type AppStateType = {
  users: User[];
  modalText: string;
  isModalOpen: boolean;
};

// initialState does not need any typing as we are initializing values and later on we could use typeof initalState
const initialState: AppStateType = {
  users: [
    { id: 1, name: 'anisul Islam' },
    { id: 2, name: 'alex warren' },
  ] as User[],
  isModalOpen: false,
  modalText: '',
};

const reducer = (state: AppStateType, action: AppActionType) => {
  let filteredUsers, updatedUsers;
  // action object has action.type and action.payload
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.user],
        isModalOpen: true,
        modalText: 'new user is added',
      };
    case 'DELETE_USER':
      filteredUsers = state.users.filter((user) => user.id !== action.id);
      alert(typeof action.id);
      return {
        ...state,
        users: filteredUsers,
        isModalOpen: true,
        modalText: 'book is deleted',
      };
    case 'UPDATE_USER':
      updatedUsers = state.users.map((user) => {
        if (user.id === action.id) {
          return { ...user, name: action.newName };
        }
        return user;
      });
      console.log(action);
      return {
        ...state,
        users: updatedUsers,
        isModalOpen: true,
        modalText: 'user is updated',
      };
    case 'SHOW_MODAL':
      return { ...state, isModalOpen: true, modalText: action.text };
    case 'HIDE_MODAL':
      return { ...state, isModalOpen: false };
    case 'CLEAR_MODAL_TEXT':
      return { ...state, modalText: '' };

    default:
      return state;
  }
};

const Modal = ({ modalText }: { modalText: string }) => {
  return <p style={{ color: 'green' }}>{modalText}</p>;
};

const App = () => {
  const [userState, dispatch] = useReducer(reducer, initialState);

  const [userName, setUserName] = useState('');
  const [updateUserId, setUpdateUserId] = useState(0);

  useEffect(() => {
    if (userState.isModalOpen) {
      // Set a timeout to hide the modal after 2 seconds
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'HIDE_MODAL' });
        dispatch({ type: 'CLEAR_MODAL_TEXT' });
      }, 1000);

      return () => {
        clearTimeout(timeoutId); // Cleanup the timeout
      };
    }
  }, [userState.isModalOpen]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (updateUserId === 0) {
      const newUser = {
        id: Number(new Date().getTime()),
        name: userName,
      };
      dispatch({ type: 'ADD_USER', user: newUser });
    } else {
      dispatch({
        type: 'UPDATE_USER',
        id: updateUserId,
        newName: userName,
      });
    }

    setUserName('');
    setUpdateUserId(0);
  };

  const handleEditUser = (user: User) => {
    setUpdateUserId(user.id);
    setUserName(user.name);
  };

  const handleDeleteUser = (id: number) => {
    dispatch({ type: 'DELETE_USER', id: id });
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
        <button type="submit">
          {updateUserId === 0 ? 'Create New User' : 'Update User'}
        </button>
      </form>

      {userState.isModalOpen && <Modal modalText={userState.modalText} />}

      <h2>List of Users</h2>
      <section>
        {userState.users.length > 0 &&
          userState.users.map((user) => {
            return (
              <article key={user.id}>
                <h3>{user.id}</h3>
                <p>{user.name}</p>
                <button
                  onClick={() => {
                    handleEditUser(user);
                  }}
                >
                  Edit
                </button>
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

export default App;
