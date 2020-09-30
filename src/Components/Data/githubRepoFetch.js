import React from 'react'

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

    setIsLoading(true)

    // make API calls
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
        <input
          type="text"
          name="query"
          className="github_search_input"
          placeholder="Search Github Repositories"
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
