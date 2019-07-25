import React from "react";
import {server_url} from '../config'

function PostForm(props) {

  function submitHandler(e) {

    e.preventDefault();
    const data = new URLSearchParams();
    for (const pair of new FormData(e.target)) {
      console.log(pair);
      data.append(pair[0], pair[1]);
    }

    fetch(server_url + props.apiPath, {
      method: "POST",
      credentials: "include",
      body: data
    })

      .then(res => res.json())
      .then(res => {
        if (props.afterPost) props.afterPost(res);

        document.querySelectorAll('input').forEach(input => {
          input.value='';
        })
      });
  }

  return (
    <form id="login-form" onSubmit={submitHandler}>
      <div className="form-holder">
        <div className="login-form">
          {props.inputs.map(e => {
            if (e.type === 'select') {
              return <select name={e.name} className="role-select">
                {e.options.map(option => {
                  return <option value={option} >{option}</option>
                })}
                </select>
            } else {
              return (
                <div className="form-group">
                <input type={e.type} name={e.name} className="form-control" autocomplete="off" required/>
                <label class="form-control-placeholder" for="name">{e.placeholder}</label>
                </div>
              );
            }

          })}
        </div>
        <input type='submit' className="submitButton" value="Login"></input>
      </div>
    </form>
  );
}

export default PostForm;
