import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacon } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const data = [
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
  {
    firstName: 'Superlek',
    lastName: 'Kiatmoo3',
    registration: '10/03/2017',
    assurance: true,
  },
]

// function UserCreateModal() {
//   return (
//
//   );
// }

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
            <input type='date'/>
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
  const click = () => {
    fetch('/hello/')
      .then((res) => alert(res))
      .catch((err) => alert(err));
  };

  return (
    <div className='position-relative d-flex flex-column align-items-center'>
      <UserInfoModal />
      <div className='d-flex flex-row justify-content-between align-items-end w-100'>
        <button className='btn btn-success' onClick={() => click()}>Add new student</button>
        <img className='w-25' src='/logo.png'/>
        <button className='btn btn-secondary' type='button' data-bs-toggle='modal' data-bs-target='#user-modal'>Add new student</button>
      </div>
      <table className='table table-striped container-fluid m-3'>
        <thead>
          <tr>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Registration</th>
            <th scope='col'>Assurance</th>
            <th scope='col' style={{width: '5%', textAlign: 'center',}}>Belt</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({firstName, lastName, registration, assurance}) => (
            <tr key={firstName}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{registration}</td>
              <td>{assurance}</td>
              <td className='text-center'>
                <FontAwesomeIcon icon={faBacon}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <h1 className='w-100 h-100 position-absolute top-50 start-50 translate-middle'>Hiiii</h1> */}
    </div>
  )
}

export default App
