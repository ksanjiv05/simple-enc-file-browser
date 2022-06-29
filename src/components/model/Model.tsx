import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"


interface ModelProp {
    path: string,
    children: JSX.Element,
    btnTitle: string,
    title: string,
    icon:JSX.Element
}

const Model: React.FC<ModelProp> = ({ path, children, btnTitle, title,icon }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {

        setShow(true)
    };




    return (
        <>
            <button style={{border:0}} onClick={handleShow}>
                {icon}
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {btnTitle}
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default Model