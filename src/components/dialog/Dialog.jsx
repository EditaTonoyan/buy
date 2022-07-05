import './Dialog.scss'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useRef, useState} from "react";

function AlertDialog({open, handleClose, handleAgree, message, rejectMessage, type}) {

    const dialogValue = useRef({message: '', type: ''});
    const [rejectMessageData, setRejectMessageData] = useState({message: '', type: ''})

    //
    useEffect(() => {
        if (rejectMessageData.message !== '') {
            dialogValue.current.message = rejectMessageData.message;
            dialogValue.current.type = rejectMessageData.type;
        }
    }, [rejectMessageData])

    // const handleChange = (e, data) => {
    //     setRejectMessageData(data)
    // }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {message}
            </DialogTitle>
            {rejectMessage &&
            <DialogContent>
                <div className="alert-message-checkbox-wrapper">
                    <input id='notAvailable' type="radio" className="alert-message-checkbox" name={'radio'}
                           onChange={(e) => setRejectMessageData({
                               message: 'Product no longer available!',
                               type: 'not available'
                           })}/>
                    <label htmlFor="notAvailable" className="alert-message-checkbox-label">
                        Product no longer available!
                    </label>
                </div>
                <div className="alert-message-checkbox-wrapper">
                    <input id='notPossible' type="radio" className="alert-message-checkbox" name={'radio'}
                           onChange={(e) => setRejectMessageData({
                               message: 'Unable to make purchases from this site',
                               type: 'not possible'
                           })}/>
                    <label htmlFor="notPossible" className="alert-message-checkbox-label">
                        Unable to make purchases from this site
                    </label>
                </div>
                <div className="alert-message-checkbox-wrapper other-wrapper">
                    <label htmlFor="other" className="alert-message-checkbox-label other-label">
                        Other
                    </label>
                    <textarea id='other' cols={40} rows={6} className="alert-message-checkbox"
                              onChange={(e) => setRejectMessageData({message: e.target.value, type: 'other'})}
                    />
                </div>
            </DialogContent>
            }
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={(e) => handleAgree(dialogValue.current, type)}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog
