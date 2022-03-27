import React, { useEffect } from 'react'
import { Toast } from 'react-bootstrap';
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
    
    return (
        <div style={{backgroundColor : "green" , width : "300px", margin: "auto", position: "absolute", top: 70, right: 410 }}>
            {toast.show &&
                <Toast>
                    <Toast.Body>{toast.text}</Toast.Body>
                </Toast>
            }
        </div>
    )
}

export default Toaster
