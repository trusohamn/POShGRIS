import React from "react";

function PostForm(props) {
  function submitHandler(e) {
    e.preventDefault();
    const data = new URLSearchParams();
    console.log(e.target);
    for (const pair of new FormData(e.target)) {
      console.log(pair[0], pair[1]);
      data.append(pair[0], pair[1]);
    }
    console.log('submitting form');
    console.log(data);
    fetch("http://localhost:8000" + props.apiPath, {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        if (props.afterPost) props.afterPost(res);
        console.log(res)
      });
  }

  return (
    <form id="login-form" onSubmit={submitHandler}>
      {props.inputs.map(e => {
        return (
          <input type={e.type} name={e.name} placeholder={e.placeholder} />
        );
      })}
      <input type='submit'></input>
    </form>
  );
}

export default PostForm;
