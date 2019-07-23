import React, { useEffect, useState, useContext } from "react";
import { AppContext, getFetch } from "../context/AppContext";
import PostForm from "../components/PostForm";

function Employees() {
  const [users, setUsers] = useState(null)
  useEffect(() => {
      
      getFetch('/api/users', (err, res) => {
        if(err) console.log(err);
        setUsers(res.results);
        console.log(res.results);
      })
    
  }, [])

  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "text", name: "role", placeholder: "Role" },
  ];

  return (
    <div>
      {users && 
        <div>
          <table className="ticket-table">
            <tr className="ticket-tr">
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
            <tbody>
              {users.map(x => {
                return (<tr>
                  <td>{x.id}</td>
                  <td>$ {x.username}</td>
                  <td>{x.role}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      }
      <div>
        <PostForm apiPath="/api/users" inputs={inputs} />
      </div>
    </div>
  );
}

export default Employees;
