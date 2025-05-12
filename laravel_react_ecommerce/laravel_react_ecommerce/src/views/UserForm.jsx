import React, { useEffect,useState,useRef } from "react";
import axiosClient from "../axiosClient";
import {useParams,useNavigate} from 'react-router-dom';
function UserForm() {
    const {id} = useParams();

    const [user,setUser] = useState({
        id: null,
        name : '',
        email: '',
        password: '',

});
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState();
    const navigate = useNavigate();


    useEffect(() => {
           if(id) {
               setLoading(true);
               axiosClient.get(`users/${id}`)
                   .then((response) => {
                       const {data} = response;
                       console.log("Got response");
                       setUser(data[0]);
                       setLoading(false);

                   }).catch((error) => {

               });
           }
        },[id]);


    const onSubmit = (e) => {
        e.preventDefault();
        if(!user.id){
            console.log(user);
            axiosClient.post('/users',user).then(() => {
                navigate("/users");

            }).catch((error) => {
                console.log(error);
            });

        }else{
            axiosClient.put(`/users/${user.id}`,user).then(() => {
                navigate("/users");
            }).catch((error) => {
                console.log(error);
            });
        }
    }



    return (
        <>

            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                        <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
                        <button className="btn">Save</button>
                    </form>

                )}
            </div>

        </>
    );



}

export default UserForm;
