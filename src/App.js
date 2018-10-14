import React, { Component } from 'react'
import gql from 'graphql-tag'
import GqlClient from './GqlClient'
import Dropzone from "react-dropzone"

const token = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhjSEJKYm1adklqcDdJbTVoYldVaU9pSm1jbTl1ZEdWdVpFRndjRlIzYnlJc0luUjVjR1VpT2lKemRHRjBhV01pZlN3aWFXRjBJam94TlRNeE1UVXhOelF3TENKbGVIQWlPakU0TkRZM01qYzNOREI5LkxENEJyLXMtRXQ5TzVZckVKNmVjY0pVQ3k5V3V4X205STFFVm41NGNUWG86OmV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVNXNW1ieUk2ZXlKcFpDSTZJbU5xYWpCNmNIbGliekF3TURBeFpqQmphMnM1ZW5Kd2VISWlMQ0oxYzJWeWJtRnRaU0k2SW01aGJXRnViWFZyZFc1a0luMHNJbWxoZENJNk1UVXpPREk1TWpZNU1Dd2laWGh3SWpveE5UWTVPRFV3TWprd2ZRLk9LWnZhaDRUZXdyWUU0c0Q2eXYyam85aWpPblhZbTVCZ0NMR3RWdDlIUWc='
const client = new GqlClient(
  'https://tekie-server.herokuapp.com/graphql/core', {
    headers: {
      authorization: token
    }
  }
)
const TOPICS_QUERY = gql`
{
  topics {
    learningObjectives {
      id
      title
    }
  }
}`

const UPLOAD_FILE = gql`
  mutation($file: FileInput!) {
    uploadFile(file: $file){
      id
    }
  }
`

class App extends Component {
  async componentDidMount() {
    const data = await client.query(TOPICS_QUERY)
    console.log(data)
  }

  onDrop = async ([file]) => {
    const data = await client.query(UPLOAD_FILE, { file, 'fileKind': 'content' })
    console.log(data)
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    )
  }
}

export default App
