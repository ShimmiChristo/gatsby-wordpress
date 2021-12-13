import React, { useState } from 'react';

function ClickLikeButton() {
  const [count, setCount] = useState(0);
  const [serverResponse, setServerResponse] = useState(0);

  function handleChange() {
    setServerResponse(``);
    setCount(count + 1);
    // setCount({'clicks': `${count + 1}`})
  }


  async function updateCounter(e) {
    e.preventDefault();
    handleChange();

    const response = await window
      .fetch(`/api/click`, {
        method: `POST`,
        // headers: {
        //   'content-type': 'application/json',
        // },
        body: count + 1,
      })
      .then((res) => res.json());

    setServerResponse(response);
  }

  return (
    <div>
      <div>Server response: {serverResponse}</div>

      <p>You clicked {count} times</p>
      <button onClick={updateCounter}>Click me</button>
    </div>
  );
}
export default ClickLikeButton;
