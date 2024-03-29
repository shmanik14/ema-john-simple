import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import './Shipment.css'
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } =useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
        {errors.name && <span className="error">This field is required</span>}
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
        {errors.email && <span className="error">This field is required</span>}
        <input name="address" ref={register({ required: true })} placeholder="Your Address"/>
        {errors.address && <span className="error">This field is required</span>}
        <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number"/>
        {errors.phone && <span className="error">This field is required</span>}
        
        <input type="submit" />
        </form>
    );
};

export default Shipment;