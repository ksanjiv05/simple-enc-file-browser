import React from 'react'
import { Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context'
import { IGlobal } from '../../types'


interface DownloadFileProp {
    name: string,
}

const DownloadFile: React.FC<DownloadFileProp> = ({ name }) => {
    const [password, setPassword] = React.useState<string>("");
    const [loader, setLoader] = React.useState<Boolean>(false)
    const { path, url } = React.useContext<IGlobal>(GlobalContext);

    const downloadFile = () => {
        console.log("request data ", password, path, name)
        if (password === "") {
            toast.error("Please enter file password")
            return;
        }
        fetch(`${url}/api/file`, {
            method: 'PUT',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept': 'application/octet-stream'
            },
            body: JSON.stringify({ password, path, fileName: name })
        }).then(
            response => {
                console.log(response.type);
                response.blob().then(function (myBlob) {
                    var objectURL = URL.createObjectURL(myBlob);
                    const path = objectURL//window.URL.createObjectURL(new Blob([responce.data]));
                    const link = document.createElement('a');
                    link.href = path;
                    link.setAttribute('download', name.slice(0, -4));
                    document.body.appendChild(link);
                    link.click();
                });
                setLoader(false)

            }
        )
            .catch(
                error =>{ console.log(error);
                    toast.error("unable to download file!")
                    setLoader(false)
                
                }
            );
        setPassword("")
    }
    return (
        <div><Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter the file password :</Form.Label>
                <Form.Control type="text" placeholder="password" onChange={ev => setPassword(ev.target.value)} />
            </Form.Group>
            <Button variant="dark" onClick={downloadFile} >
                Download File {!loader ? <Spinner  size="sm" animation="grow" /> : ""}
            </Button>
        </Form></div>
    )
}

export default DownloadFile