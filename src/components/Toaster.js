import React, { useEffect } from 'react'
import { Toast, ToastHeader, ToastBody, ToastContainer } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { posttoast } from '../redux/Actions/actions'


function Toaster() {
    const toast = useSelector((state) => state.toast)
    const dispatch = useDispatch();
    useEffect(() => {
        if (toast.text !== "") {
            setTimeout(() => {
                dispatch(posttoast({ toast: { state: '', text: '', show: false } }))
            }, 5000);
        }

    }, [toast, dispatch]);
    const handleClose = e => {
        e.preventDefault();
        dispatch(posttoast({ toast: { state: '', text: '', show: false } }))
    }

    return (
        <ToastContainer className="toastter" style={{ backgroundColor:"green", marginTop: "-30px", position: "sticky", width: "300px", left: "30px", bottom: "10px" }}>

            <Toast show={toast.show} onClose={handleClose} >
                <ToastHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Success
                </ToastHeader>
                <ToastBody variant="primary">
                    <span styles={{ fontSize: "12px", color: "green"}}>
                        {toast.text}
                    </span>
                </ToastBody>
            </Toast>

        </ToastContainer>
    )
}

export default Toaster
