import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className='position-relative d-flex flex-column align-items-center'>
      <h1>Hello World</h1>
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

      <h1 className='position-absolute top-50 start-50 translate-middle'>Hiiii</h1>
    </div>
  )
}

export default App
