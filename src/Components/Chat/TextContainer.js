import React from 'react'

import onlineIcon from '../../assets/onlineIcon.png'

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1 className="h1message">
        Connect Chat Application{' '}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2 className="h1message">
        Created for Developers
        <span role="img" aria-label="emoji">
          💻
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1 className="peoplechatting">People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img
                  alt="Online Icon"
                  src={onlineIcon}
                  className="icononline"
                />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default TextContainer
