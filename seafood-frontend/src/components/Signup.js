import { Segment, Form, Button } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import Errors from './Errors'

function Signup({ signup, signupError }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [companies, setCompanies] = useState([])
  const [ errors, setErrors ] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/companies', {
      method: "GET",
      headers: {
        "Content-type":"application/json"
      }
    })
    .then( res => res.json() )
    .then( companies => setCompanies(companies.filter( company => company.name !== 'Seafood Wholesalers')))
  }, [])

  return(
    <Segment>
      { signupError ? <Errors signupError={signupError} /> : null }
      <h1>Sign Up</h1>
      <Form onSubmit={e => signup(e, firstName, lastName, email, password, passwordConf, company)}>
        <Form.Field>
          <input onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <input onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Field>
        <Form.Field>
          <input onChange={e => setPasswordConf(e.target.value)} type="password" placeholder="Confirm Password" />
        </Form.Field>
        <Form.Field>
          <label>Company</label>
          <select onChange={e => setCompany(e.target.value)}>
            <option value="none">Select your company</option>
            {companies.map(company => {
              return <option key={company.id} value={company.name}>{company.name}</option>
            })}
          </select>
        </Form.Field>
        <Button type='submit'>Create Account</Button>
      </Form>
    </Segment>
  )
}

export default Signup