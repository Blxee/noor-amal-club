import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faCheck, faCircleUser, faCoins, faMoneyBill, faMoneyBillWave, faMoneyBills, faPen, faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useEffect, useRef, useState } from 'react';

const belts = {
  white: '#FFFFEC',
  green: '#0D9276',
  blue: '#3468C0',
  brown: '#76453B',
  black: '#000000',
};

const data = [
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
  {
    firstName: 'blaaaaaa',
    lastName: 'Kiatmoo3',
    registration: new Date('2017-01-20'),
    assurance: true,
    lastPaid: new Date('2017-03-20'),
    belt: 'black',
  },
]

function UserCreateModal() {
  const formRef = useRef();

  useEffect(() => {
    const registerDate = document.querySelector('#registerInput');
    registerDate.value = new Date().toISOString().slice(0, 10);
  }, []);

  const createUser = () => {
    const form = new FormData(formRef.current);

    const obj = {
      belt: 'white',
      assurance: false,
    };

    form.forEach((val, key) => {
      obj[key] = val;
    });
    obj.lastPaid = obj.registration;
    if (obj.assurance)
      obj.assurance = true;

    fetch('/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        // alert('Success: ', res.body);
        formRef.current.reset();
      } else {
        alert('Error: could not connect to backend');
      }
    }).catch((err) => {
      alert('Error: ', err.message);
    });

    alert(JSON.stringify(obj).replace(',', '\n'));
  };

  return (
    <div className='modal fade' id='create-modal' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='modalLabel'>Modal title</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form ref={formRef} id='creationForm' className='w-100 d-flex flex-column gap-3'>
              <input className='form-control' name='firstName' type='text' placeholder='First Name' required />
              <input className='form-control' name='lastName' type='text' placeholder='Last Name' required />
              <div className='input-group d-flex flex-row'>
                <input id='assuranceInput' className='form-check-input' name='assurance' type='checkbox' value='true' />
                <label className='ms-auto form-check-label' htmlFor='assuranceInput'>Assurance</label>
              </div>
              <label className='form-check-label' htmlFor='registerInput'>Registration Date</label>
              <input className='form-control' id='registerInput' name='registration' type='date' />
              <label>Phone Number</label>
              <input className='form-control' name='phoneNumber' type='tel' />
              <label>Belt</label>
              <select className='form-select' name='belt'>
                {Object.entries(belts).map(([key, val]) =>
                  <option key={key} style={{ color: val }} value={key} selected={key === 'white'}>{key}</option>
                )}
              </select>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary' onClick={createUser}>Create User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserInfoModal({ user }) {
  const [edit, setEdit] = useState(false);
  const formRef = useRef();

  const toggleEdit = () => {
    if (edit) {
      const form = new FormData(formRef.current);

      const obj = { ...user };

      form.forEach((val, key) => {
        obj[key] = val;
      });
      delete obj.lastPaid;
      obj.assurance = obj.assurance == undefined;

      fetch(`/update-user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.ok) {
          // alert('Success: ', res.body);
          this.forceUpdate();
        } else {
          alert('Error: could not connect to backend');
        }
      }).catch((err) => {
        alert('Error: ', err.message);
      });
    }
    setEdit((val) => !val);
  };

  const payMonth = () => {
    fetch(`/pay-month/${user.id}`, {method: 'PUT'})
      .then((res) => {
        if (res.ok) {
          // alert('Success: ', res.body);
          this.forceUpdate();
        } else {
          res.text().then((body) => alert('Error: ' + body))
        }
      }).catch((err) => {
        alert('Error: ', err.message);
      });
  };

  const deleteUser = () => {
    fetch(`/delete-user/${user.id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        // alert('Success: ', res.body);
        // formRef.current.reset();
      } else {
        res.text().then((body) => alert('Error: ' + body))
      }
    }).catch((err) => {
      alert('Error: ', err.message);
    });
    setEdit(false);
  };

  return (
    <div className='modal fade' id='user-modal' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='modalLabel'>{user.firstName} {user.lastName}</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form ref={formRef} id='updateForm' className='w-100 d-flex flex-column gap-3'>
              <div>
                <label className='w-50'>First Name</label>
                <label className='w-50'>Last Name</label>
                <input className='w-50 d-inline form-control' type='text' name='firstName' defaultValue={user.firstName} disabled={!edit} />
                <input className='w-50 d-inline form-control' type='text' name='lastName' defaultValue={user.lastName} disabled={!edit} />
              </div>
              <div className='input-group d-flex flex-row'>
                <input id='assuranceInput' className='form-check-input' name='assurance' type='checkbox' defaultChecked={user.assurance} disabled={!edit} />
                <label className='ms-auto form-check-label' htmlFor='assuranceInput'>Assurance</label>
              </div>
              <label className='form-check-label' htmlFor='registerInput'>Registration Date</label>
              <input className='form-control' id='registerInput' name='registration' type='date' defaultValue={user.registration?.toISOString().split('T')[0]} disabled={!edit} />
              <label>Phone Number</label>
              <input className='form-control' name='phoneNumber' type='tel' defaultValue={user.phoneNumber} disabled={!edit} />
              <label>Belt</label>
              <select className='form-select' name='belt' disabled={!edit}>
                {Object.entries(belts).map(([key, val]) =>
                  <option key={key} style={{ color: val }} value={key} selected={key === user.belt}>{key}</option>
                )}
              </select>
            </form>
          </div>
          <div className='modal-footer'>
            <botton className='btn btn-danger me-auto' onClick={deleteUser}>
              <FontAwesomeIcon icon={faTrash} />
            </botton>
            <button type='button' onClick={toggleEdit} className='btn btn-primary'>
              {edit
                ? <FontAwesomeIcon className='me-2' icon={faCheck} />
                : <FontAwesomeIcon className='me-2' icon={faPen} />
              }
              {edit
                ? 'Save changes'
                : 'Edit user'
              }
            </button>
            <botton className='btn btn-primary' onClick={payMonth}>
              <FontAwesomeIcon className='me-2' icon={faCoins} />
              {'Pay Month'}
            </botton>
            <button type='button' className='btn btn-secondary' onClick={() => setEdit(false)} data-bs-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState(data);

  useEffect(() => {
    fetch('/get-all')
      .then((res) => res.json())
      .then((res) => {
        for (const user of res) {
          user.registration = new Date(user.registration);
          user.lastPaid = new Date(user.lastPaid);
        }
        setUsers(res);
      })
      .catch((err) => alert('Error: ' + err.message));
    setTimeout(1000, () => alert(JSON.stringify(users)))
  });

  return (
    <div className='d-flex flex-column align-items-center'>
      <UserCreateModal />
      <UserInfoModal user={currentUser} />
      <img className='w-25' src='/logo.png' />
      <button className='btn btn-secondary position-fixed bottom-0 end-0 rounded-circle m-2' type='button' data-bs-toggle='modal' data-bs-target='#create-modal'>
        <FontAwesomeIcon size='2x' icon={faPlus} />
      </button>
      <table style={{ marginBottom: '5rem' }} className='table table-striped container-fluid'>
        <thead>
          <tr>
            <th scope='col' className='text-center'>Profile</th>
            <th scope='col' className='text-center'>First Name</th>
            <th scope='col' className='text-center'>Last Name</th>
            <th scope='col' className='text-center'>Payment</th>
            <th scope='col' className='text-center'>Registration</th>
            <th scope='col' className='text-center'>Assurance</th>
            <th scope='col' className='text-center' style={{ width: '5%', textAlign: 'center', }}>Belt</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} onClick={() => setCurrentUser(user)} data-bs-toggle='modal' data-bs-target='#user-modal'>
              <td className='text-center'>
                <FontAwesomeIcon size='xl' icon={faCircleUser} />
              </td>
              <td className='text-center'>{user.firstName}</td>
              <td className='text-center'>{user.lastName}</td>
              <td className='text-center'>{
                (user.registration.getFullYear() * 12 + user.registration.getMonth()) - (user.lastPaid.getFullYear() * 12 + user.lastPaid.getMonth())
              }</td>
              <td className='text-center'>{user.registration.toDateString()}</td>
              <td className='text-center'>{
                user.assurance
                  ? <FontAwesomeIcon size='xl' color='#7DCE13' icon={faCheck} />
                  : <FontAwesomeIcon size='xl' color='#B80000' icon={faX} />
              }</td>
              <td className='text-center'>
                <FontAwesomeIcon style={{ color: `var(--belt-${user.belt})` }} size='xl' icon={faBacon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <input type='button' onClick={() => {dialog.showOpenDialog({properties: 'openFile'})}} /> */}
      {/* <h1 className='w-100 h-100 position-absolute top-50 start-50 translate-middle'>Hiiii</h1> */}
    </div>
  )
}

export default App
