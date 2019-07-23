import React from "react";

function PostForm(props) {

  function submitHandler(e) {

    e.preventDefault();
    const data = new URLSearchParams();
    for (const pair of new FormData(e.target)) {
      console.log(pair);
      data.append(pair[0], pair[1]);
    }

    fetch("http://localhost:8000" + props.apiPath, {
      method: "POST",
      credentials: "include",
      body: data
    })

      .then(res => res.json())
      .then(res => {
        if (props.afterPost) props.afterPost(res);
      });
  }

  return (
    <form id="login-form" onSubmit={submitHandler}>
      <div className="form-holder">
      <div className="login-form">
      {props.inputs.map(e => {
        return (
          <input type={e.type} name={e.name} placeholder={e.placeholder} />
          );
        })}
      </div>
      <input type='submit' className="submitButton"></input>
      </div>
    </form>
  );
}

export default PostForm;
