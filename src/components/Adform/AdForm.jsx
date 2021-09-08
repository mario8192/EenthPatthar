import React, { useState, useEffect } from 'react'
import { tokenHeader } from '../../services/HeaderService'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router'
import ImageInput from '../Navbar/SignupModal/ImageInput/ImageInput'
import UploadImage from '../../services/ImageUploadService'
export default function AdForm() {
    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [desc, setDesc] = useState('')
    const [bhk, setBhk] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [price, setPrice] = useState('')
    const [Image, setImage] = useState('')
    const history = useHistory()
    const location = useLocation()
    const titleHandler = (event) => {
        setTitle(event.target.value)
    }
    const typeHandler = (event) => {
        setType(event.target.value)
    }
    const descHandler = (event) => {
        setDesc(event.target.value)
    }
    const bhkHandler = (event) => {
        setBhk(event.target.value)
    }
    const areaHandler = (event) => {
        setArea(event.target.value)
    }
    const cityHandler = (event) => {
        setCity(event.target.value)
    }
    const priceHandler = (event) => {
        setPrice(event.target.value)
    }
    useEffect(() => {
        if (location.state !== undefined) {
            setId(location.state.p_id)
            setTitle(location.state.p_title);
            setType(location.state.p_type);
            setDesc(location.state.p_desc);
            setBhk(location.state.p_bhk);
            setArea(location.state.p_area);
            setCity(location.state.p_city)
            setPrice(location.state.p_price);
            setImage(location.state.p_images)
        }
    }, [location.state])

    const getuploadedUrl = async () =>{
        let imageURL;
            try {
              imageURL = await UploadImage(Image, "property");
            } catch (err) {
              console.log(err);
              imageURL = "https://cdn5.vectorstock.com/i/1000x1000/86/54/houses-real-estate-vector-738654.jpg";
            }
            return imageURL
    }
    const createAd = async (e) => {
        e.preventDefault();
        let reqData = {
            "property_details": {
                "property_title": title,
                "property_type": type,
                "description": desc,
                "n_bhk": bhk

            },
            "address": {
                "city": city,
                "area_details": area
            },
            "quoted_price": price,
            "images":[getuploadedUrl()]
        }
        let structure = {
            'method': 'post',
            'url': process.env.REACT_APP_SERVER_URL + '/advertisement',
            'headers': tokenHeader(),
            'data': reqData
        }
        try {
            const res = await axios(structure)
            console.log(res)
            alert('Advertisement Published')
            setTitle('')
            setType('')
            setDesc('')
            setBhk('')
            setArea('')
            setCity('')
            setPrice('')
            history.push("/myprofile")
        }
        catch (err) {
            alert(err.message)
        }
    }


    const updateAd = async (e) => {
        e.preventDefault();
        let reqData = {
            '_id': id,
            "property_details": {
                "property_title": title,
                "property_type": type,
                "description": desc,
                "n_bhk": bhk

            },
            "address": {
                "city": city,
                "area_details": area
            },
            "quoted_price": price
        }
        let structure = {
            'method': 'put',
            'url': process.env.REACT_APP_SERVER_URL + '/advertisement',
            'headers': tokenHeader(),
            'data': reqData
        }
        try {
            const res = await axios(structure)
            console.log(res)
            alert("Advertisement Updated!")
            setTitle('')
            setType('')
            setDesc('')
            setBhk('')
            setArea('')
            setCity('')
            setPrice('')
            setImage('')
            history.push("/myprofile")

        }
        catch (err) {
            alert(err.message)
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = !id ? await createAd(e) : await updateAd(e)
        console.log(response)
    }
    return (
        <div>
            <div className="container mt-5">
                <div>
                    <form onSubmit={submitHandler}>
                        <div>
                            <h2 style={{ textAlign: "center" }}> {!id ? `Post` : `Update`} your Advertisement!</h2>
                        </div>
                        <div>
                            <label className="form-label">Property Details</label>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <input className="form-control" type="text" placeholder="Property Title" onChange={titleHandler} value={title} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="text" placeholder="Property Type" onChange={typeHandler} value={type} required></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <textarea className="form-control" type="text" placeholder="Property Description" onChange={descHandler} value={desc} required></textarea>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="number" placeholder="Number of BHKs" onChange={bhkHandler} value={bhk} required></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Location Details</label>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <input className="form-control" type="text" placeholder="Address - Area details" onChange={areaHandler} value={area} required></input>
                                </div>
                                <div className="col-sm-6">
                                    <input className="form-control" type="text" placeholder="City" onChange={cityHandler} value={city} required></input>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <input className="form-control" type="number" placeholder="Quoted Price" onChange={priceHandler} value={price} required></input>
                                </div>
                                <div className="col-sm-6">
                                    {/* <input className="form-control-file" type="file" placeholder="Upload images of the property"></input> */}
                                    <div className="input-label">Profile image</div>
                                    <ImageInput
                                        Image={Image}
                                        setImage={setImage}
                                        placeholder={null}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }} className="mt-4">
                            <button type="submit" className="btn btn-outline-primary">Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
