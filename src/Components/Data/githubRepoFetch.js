import React from 'react'
import TextField from '@material-ui/core/TextField'
import { createMuiTheme } from '@material-ui/core/styles'
import white from '@material-ui/core/colors/purple'
import { useAuth0 } from '@auth0/auth0-react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Transform } from '@material-ui/icons'

// https://api.github.com/search/repositories?q=html
function App() {
  const [inputValue, setInputValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [repos, setRepos] = React.useState([])

  React.useEffect(() => {
    if (!inputValue) {
      return
    }

    createMuiTheme({
      palette: {
        primary: white,
      },
    })
    setIsLoading(true)

    // const { user } = useAuth0()
    // make API calls
    // fetch('https://api.github.com/search/repositories?q=' + inputValue)
    // fetch(
    //   'https://api.github.com/search/users?q=`${user.nickname}`+repos:%3E42+followers:%3E1000' +
    //     inputValue
    // )
    fetch('https://api.github.com/search/repositories?q=' + inputValue)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setIsLoading(false)
        setRepos(data.items)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(true)
        console.error(err)
      })
  }, [inputValue])

  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          setInputValue(evt.target.elements.query.value)
        }}
      >
        {/* <input
          type="text"
          name="query"
          className="github_search_input"
          placeholder="Search Github Repositories"
        /> */}

        <TextField
          className="github_search_input"
          name="query"
          type="text"
          color="bg-light"
          placeholder="Search Input"
          label="Github Repositories"
          margin="normal"
          variant="filled"
          InputProps={{ type: 'search' }}
          style={{ flex: 1, margin: '0 20px 0 0', color: 'white' }}
        />
      </form>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Unexpected Error Occurred fetching data. Please try again later!
        </div>
      )}
      <ul className="repo_list">
        {repos.map((repo) => {
          return (
            <di key={repo.id} className="repo_item">
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
              <p>{repo.description}</p>
            </di>
          )
        })}
      </ul>
    </div>
  )
}

export default App
