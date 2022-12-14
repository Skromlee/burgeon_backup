import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    logout,
    getUserDetails,
    updateUserDetails,
} from "../../features/auth/authSlice";
import EditDialog from "../../components/user/EditDialog";
import Spinner from "../../components/common/Spinner";

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    const [visibility, setVisibility] = useState(false);

    const [formDetails, setFormDetails] = useState({
        _id: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
        dob: "",
    });

    // const { firstname, citizen } = user;

    useEffect(() => {
        if (isError) {
        }

        if (user && user.citizen && !user.firstname) {
            setFormDetails({
                ...formDetails,
                _id: user._id,
                email: user.email,
                citizen: user.citizen,
            });
            setVisibility(true);
        } else {
            setVisibility(false);
        }

        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate, isError, message, dispatch]);

    const onLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const isEditing = () => {
        setVisibility((prev) => !prev);
        dispatch(getUserDetails());
    };
    const editingHandler = () => {};
    const exitHandler = () => {};
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(formDetails));
    };
    const onChange = (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <>
            {visibility && (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    exitHandler={exitHandler}
                    submitHandler={submitHandler}
                    emp={formDetails}
                    onChange={onChange}
                />
            )}

            <div className="flex flex-col items-center h-screen justify-center space-y-10">
                <h1 className="text-7xl">Welcome to BURGEON SYSTEM ...</h1>
                <div>
                    <button onClick={onLogout}>Log Out</button>
                </div>
            </div>
        </>
    );
};
export default User;
