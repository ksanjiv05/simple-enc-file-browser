import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface CustomAlertProp {
    alertTitle: string,
    alertMsg: string,
    icon: JSX.Element

}

const CustomAlert: React.FC<CustomAlertProp> = ({ alertTitle, alertMsg, icon }) => {
    const [show, setShow] = useState(true);

    return (
        <>
            <Alert show={show} variant="success">
                <Alert.Heading>{alertTitle}</Alert.Heading>
                <p>
                    {alertMsg}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me y'all!
                    </Button>
                </div>
            </Alert>
            <button style={{ border: 0 }} onClick={() => setShow(true)}>
                {icon}
            </button>

        </>
    );
}

export default CustomAlert