import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Storage } from './storage';

function App() {
  new Storage();
  return (
    <div className='position-relative d-flex flex-column align-items-center'>
      <img className='w-25' src='/logo.png'/>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Registration</th>
            <th scope='col'>Assurance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nam2 bla</td>
            <td>10-09-2022</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>nam2 bla</td>
            <td>10-09-2022</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>nam2 bla</td>
            <td>10-09-2022</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>nam2 bla</td>
            <td>10-09-2022</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>

      <h1 className='w-100 h-100 position-absolute top-50 start-50 translate-middle'>Hiiii</h1>
    </div>
  )
}

export default App
