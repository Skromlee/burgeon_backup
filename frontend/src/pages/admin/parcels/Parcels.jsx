import { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../components/common/Spinner";
import Table from "../../../components/admin/parcels/TableParcel";
import EditDialog from "./EditDialog";
import { toast } from "react-toastify";

import {
    parcelRegister,
    reset,
    getParcels,
    parcelUpdate,
    deleteParcel,
    getParcelById,
} from "../../../features/parcel/parcelSlice";
import DeleteDialog from "../../../components/admin/users/employees/DeleteDialog";
import CreateDialog from "./CreateDialog";

const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { parcels, parcelbyid, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        dispatch(getParcels());

        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch]);

    const initialFormDetails = {
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
    };

    const initialParcelFormDetails = {
        weight: "",
        typeofshipment: "Normal",
        typeofstuff: "Normal",
        boxsize: "A4",
    };

    const [receiverFormDetails, setReceiverFormDetails] =
        useState(initialFormDetails);
    const [senderFormDetails, setSenderFormDetails] =
        useState(initialFormDetails);
    const [parcelFormDetails, setParcelFormDetails] = useState(
        initialParcelFormDetails
    );

    const [visibility, setVisibility] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [EditVisibility, setEditVisibility] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [targetId, setTargetId] = useState("");

    const onSenderChange = (e) => {
        setSenderFormDetails({
            ...senderFormDetails,
            [e.target.name]: e.target.value,
        });
    };
    const onReceiverChange = (e) => {
        setReceiverFormDetails({
            ...receiverFormDetails,
            [e.target.name]: e.target.value,
        });
    };
    const onParcelChange = (e) => {
        setParcelFormDetails({
            ...parcelFormDetails,
            [e.target.name]: e.target.value,
        });
    };

    const onExitHandler = (e) => {
        setParcelFormDetails(initialParcelFormDetails);
        setSenderFormDetails(initialFormDetails);
        setReceiverFormDetails(initialFormDetails);
        setVisibility(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const parcelData = {
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
        };
        dispatch(parcelRegister(parcelData));
        setVisibility(false);
        setSenderFormDetails(initialFormDetails);
        setReceiverFormDetails(initialFormDetails);
        setParcelFormDetails(initialParcelFormDetails);
    };

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        const updatedParcelData = {
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
        };
        dispatch(parcelUpdate(updatedParcelData));
    };

    const onEditHandler = (id) => {
        prepareFormForDetail(id);
        setEditVisibility(true);
        setIsEditing(true);
    };

    const editingHandler = () => {
        setIsEditing((prev) => !prev);
    };

    const onDetailHandler = (id) => {
        prepareFormForDetail(id);
        setEditVisibility(true);
        setIsEditing(false);
    };

    const prepareFormForDetail = (id) => {
        const targetParcel = findParcelById(id);
        const {
            sender,
            receiver,
            boxsize,
            typeofshipment,
            weight,
            typeofstuff,
            _id,
        } = targetParcel[0];
        setParcelFormDetails({
            boxsize,
            typeofshipment,
            weight,
            typeofstuff,
            _id,
        });
        setSenderFormDetails({
            ...sender,
        });
        setReceiverFormDetails({
            ...receiver,
        });
    };

    const onEditCloseHandler = () => {
        setEditVisibility(false);
    };

    const onDeleteHandler = (id) => {
        setTargetId(id);
        setOnDelete(true);
    };

    const exitDeleteHandler = () => {
        setOnDelete(false);
        setTargetId("");
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteParcel(targetId));
        setTargetId("");
        setOnDelete(false);
    };

    const findParcelById = (targetId) => {
        const targetParcel = parcels.filter((Each) => {
            return Each._id === targetId;
        });
        return targetParcel;
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {onDelete && (
                <DeleteDialog
                    exitHandler={exitDeleteHandler}
                    confirmHandler={confirmDeleteHandler}
                    id={targetId}
                />
            )}

            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Parcels Manager</h1>
                    <button
                        onClick={() => setVisibility((prev) => !prev)}
                        className={
                            visibility
                                ? `bg-slate-600 p-2 px-4 rounded-full text-white transition`
                                : `bg-brightRed p-2 px-4 rounded-full hover:bg-brightRedLight text-white transition`
                        }
                        disabled={visibility ? true : false}
                    >
                        Create New Parcels
                    </button>
                </div>
                {parcels.length > 0 ? (
                    <div className=" table">
                        <div className=" container mx-auto ">
                            <Table
                                data={parcels}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={visibility}
                                EditVisibility={EditVisibility}
                            />
                        </div>
                    </div>
                ) : (
                    <h3>You have not create any Parcels</h3>
                )}
            </div>

            {visibility && (
                <CreateDialog
                    onExitHandler={onExitHandler}
                    senderFormDetails={senderFormDetails}
                    onSubmit={onSubmit}
                    onSenderChange={onSenderChange}
                    receiverFormDetails={receiverFormDetails}
                    onReceiverChange={onReceiverChange}
                    parcelFormDetails={parcelFormDetails}
                    onParcelChange={onParcelChange}
                />
            )}

            {EditVisibility && (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    onExitHandler={onEditCloseHandler}
                    senderFormDetails={senderFormDetails}
                    onSubmit={onUpdateSubmit}
                    onSenderChange={onSenderChange}
                    receiverFormDetails={receiverFormDetails}
                    onReceiverChange={onReceiverChange}
                    parcelFormDetails={parcelFormDetails}
                    onParcelChange={onParcelChange}
                />
            )}
        </>
    );
};
export default Parcels;
