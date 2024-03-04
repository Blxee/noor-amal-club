import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon, faCheck, faCircleUser, faX} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useEffect, useRef } from 'react';

const data = [
  {
    firstName: 'Superlek',
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
        alert('Success: ', res);
        formRef.current.reset();
      } else {
        alert('Error');
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
            <form ref={formRef} id='creationForm' action='/add-user' method='POST' className='w-100 d-flex flex-column gap-3'>
              <input className='form-control' name='firstName' type='text' placeholder='First Name' required />
              <input className='form-control' name='lastName' type='text' placeholder='Last Name' required />
              <div className='input-group d-flex flex-row'>
                <input id='assuranceInput' className='form-check-input' name='assurance' type='checkbox' value='true' />
                <label className='ms-auto form-check-label' htmlFor='assuranceInput'>Assurance</label>
              </div>
              <label className='form-check-label' htmlFor='registerInput'>Registration Date</label>
              <input className='form-control' id='registerInput' name='registration' type='date' />
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

function UserInfoModal() {
  return (
    <div className='modal fade' id='user-modal' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='modalLabel'>Modal title</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form>
              <div>
                <label className='w-50'>First Name</label>
                <label className='w-50'>Last Name</label>
                <input className='w-50 d-inline form-control' type='text' disabled />
                <input className='w-50 d-inline form-control' type='text' disabled />
              </div>
              <input type='date' />
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary'>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {

  return (
    <div className='position-relative d-flex flex-column align-items-center'>
      <UserCreateModal />
      <UserInfoModal />
      <div className='d-flex flex-row justify-content-between align-items-end w-100'>
        <button className='btn btn-secondary' type='button' data-bs-toggle='modal' data-bs-target='#create-modal'>Add new student</button>
        <img className='w-25' src='/logo.png' />
        <button className='btn btn-secondary' type='button' data-bs-toggle='modal' data-bs-target='#user-modal'>student</button>
      </div>
      <table className='table table-striped container-fluid m-3'>
        <thead>
          <tr>
            <th scope='col' className='text-center'>Profile</th>
            <th scope='col' className='text-center'>First Name</th>
            <th scope='col' className='text-center'>Last Name</th>
            <th scope='col' className='text-center'>Payment</th>
            <th scope='col' className='text-center'>Registration</th>
            <th scope='col' className='text-center'>Assurance</th>
            <th scope='col'  className='text-center' style={{ width: '5%', textAlign: 'center', }}>Belt</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ firstName, lastName, registration, lastPaid, assurance, belt }) => (
            <tr key={firstName}>
              <td className='text-center'>
                <FontAwesomeIcon size='xl' icon={faCircleUser} />
              </td>
              <td className='text-center'>{firstName}</td>
              <td className='text-center'>{lastName}</td>
              <td className='text-center'>{
                (registration.getFullYear() * 12 + registration.getMonth()) - (lastPaid.getFullYear() * 12 + lastPaid.getMonth())
              }</td>
              <td className='text-center'>{registration.toDateString()}</td>
              <td className='text-center'>{
                assurance
                ? <FontAwesomeIcon size='xl' color='#7DCE13' icon={faCheck} />
                : <FontAwesomeIcon size='xl' color='#B80000' icon={faX} />
              }</td>
              <td className='text-center'>
                <FontAwesomeIcon style={{color: `var(--belt-${belt})`}} size='xl' icon={faBacon} />
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
