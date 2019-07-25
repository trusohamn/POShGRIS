import React, {
  useContext,
  useState,
  useEffect
} from "react";
import RndTable from '../components/RndTable';
import {
  AppContext,
  getFetch
} from "../context/AppContext";
import {
  AuthContext
} from "../context/AuthContext";
import {
  server_url
} from '../config'
import { useInterval } from '../utils';

function RestaurantLayout(props) {
  const context = useContext(AppContext);
  const auth = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  function refresh() {
    if (editMode) return;

    getFetch("/api/tickets", (err, tickets) => {
      fetch(server_url + '/api/bord', {
        method: "GET",
        credentials: "include"
      })
        .then(res => res.json())
        .then(res => {
          context.setTablesCoords(res.results.map((table) => {
            const ticketForTable = tickets.results.find(ticket => {
              return (ticket.table_id == table.table_id);
            });
            return {
              ...table,
              hasTicket: !!ticketForTable
            };
          }));
        })
        .catch(err => { throw (new Error()) });
    })
  }

  useInterval(() => {
    refresh();
  }, 3000);

  useEffect(() => {
    refresh();
  }, []);

  const createNewTable = (e) => {
    const data_name = new URLSearchParams();
    data_name.append('table_name', JSON.stringify(context.nextTicketName));

    fetch(server_url + '/api/bord', {
      method: "POST",
      credentials: "include",
      body: data_name
    })
      .then(res => res.json())
      .then(res => {

        context.setTablesCoords([...context.tablesCoords, {
          table_id: res.table_id,
          x: res.x,
          y: res.y,
          table_name: context.nextTicketName,
        }]);
        context.incrementNextTicketName();
      });
  }
  const saveLayout = (e) => {
    const data = new URLSearchParams();
    data.append('bords', JSON.stringify(context.tablesCoords));
    fetch(server_url + '/api/bord', {
      method: "PUT",
      credentials: "include",
      body: data
    })
      .then(res => res.json())
      .then(res => {
        setEditMode(false);
      });
  }

  const createTicket = (e) => {
    if (editMode) return;
    const table_id = context.tablesCoords.find(table => table.table_name == e.target.innerHTML);
    context.setActiveTable(table_id);
    props.history.push('/order');
  }

  return (<div className="layout-parent" >

    {
      auth.role == 'admin' ?
        !editMode ?
          <div className="btn-container" >
            <button className="layout-btn"
              onClick={
                () => setEditMode(true)
              } > Edit Layout </button> </div> :
          <div className="btn-container" >
            <button className="layout-btn"
              onClick={
                createNewTable
              } > Add Table </button> <button className="layout-btn"
                onClick={
                  saveLayout
                } > Save Layout </button> </div> :
        <div> </div>
    }

    <div className="layout-container"
      id="layoutContainer" >
      {
        context.tablesCoords.map((res) => {
          return <RndTable key={
            res.table_id
          }
            table_id={
              res.table_id
            }
            draggable={
              !editMode
            }
            createTicket={
              createTicket
            }
          />
        })
      }

    </div>

  </div>
  )
}



export default RestaurantLayout;
