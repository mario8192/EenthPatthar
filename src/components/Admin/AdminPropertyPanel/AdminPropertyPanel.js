import React, { Fragment } from 'react'
import { useState } from 'react'
import './AdminPropertyPanel.css'
import useFetch from '../../../services/useFetch'
import AdminPropertyCard from './AdminPropertyCard/AdminPropertyCard'
import approveAll from '../../../services/approvalService'

function AdminPanel({user}) {
    const url = process.env.REACT_APP_SERVER_URL + "/advertisements"

    const [Search, setSearch] = useState("")
    const { data: advertisements, isPending } = useFetch(process.env.REACT_APP_SERVER_URL + "/advertisements")

    const searchHandler = (event) => {
        setSearch(event.target.value);
      };

   

    return (
        <div className="admin-property-panel">
            <h1>Approve Advertisements</h1>
            <div className="admin-functions">
              <div className="mt-3">
                  <form>
                      <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Search property as per type, city, BHKs"
                          style={{ width: "780px", borderRadius: "25px" }}
                          value={Search}
                          onChange={searchHandler}
                      />
                  </form>
              </div>
              <button className="btn btn-outline-primary ml-5" onClick={() => approveAll(advertisements)}>Approve All Ads</button>
            </div>
            {advertisements && <div className="property-list">
                {advertisements.advertisements.filter((val) => {
                      if (Search === "") {
                        return val;
                      } else if (
                        val.address.city.toLowerCase().includes(Search.toLowerCase())
                      ) {
                        return val;
                      } else if (
                        val.author_details.fullname.toLowerCase().includes(Search.toLowerCase())
                      ) {
                        return val
                      }
                }).map((property, ) => (
                    <Fragment key={property._id}>
                        <AdminPropertyCard prop={property}/>
                    </Fragment>
                ))}
            </div>}
      </div>)}

export default AdminPanel;
