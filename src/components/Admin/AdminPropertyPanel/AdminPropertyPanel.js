import React, { Fragment } from 'react'
import './AdminPropertyPanel.css'

import useFetch from '../../../services/useFetch'
import AdminPropertyCard from './AdminPropertyCard/AdminPropertyCard'

function AdminPanel({user}) {
    const url = process.env.REACT_APP_DEV_URL + "advertisements"
    const { data: advertisements, isPending } = useFetch("http://841b-2405-201-1b-3826-1c0a-5a65-6566-25bc.ngrok.io/advertisements")

    return (
        <div className="admin-property-panel">
            <h1>Approve Advertisements</h1>
            {advertisements && <div className="property-list">
                {advertisements.advertisements.map((property, ) => (
                    <Fragment key={property._id}>
                        <AdminPropertyCard prop={property}/>
                    </Fragment>
                ))}
            </div>}
        </div>
    )
}
export default AdminPanel