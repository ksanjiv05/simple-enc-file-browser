import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { toast } from 'react-toastify'
import { IGlobal } from '../../types'
import { GlobalContext } from '../../context'
import Progress from '../../components/progress/Progress'
import { Spinner } from 'react-bootstrap'


interface AddFileProp {
    path: string,
    url: string
}
const AddFile: React.FC<AddFileProp> = ({ path, url }) => {
    const [file, setFile] = React.useState<FileList | null>(null);
    const [loader, setLoader] = React.useState<Boolean>(false)
    const [password, setPassword] = React.useState<string>("");
    const { getFiles } = React.useContext<IGlobal>(GlobalContext)


    const uploadFile = () => {
        if (!file) {
            toast.error("Please choose a file")
            return;
        }
        if (password.length < 6) {
            toast.error("Please enter file password")
            return;
        }
        setLoader(true)
        const formData = new FormData();
        formData.append("path", path)
        formData.append("password", password)
        formData.append("file", file[0])
        fetch(`${url}/api/file`, {
            method: 'POST',
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // },
            body: formData,
        }).then(
            response => response.json()
        ).then(
            success => {
                getFiles(path,true)
                setLoader(false)
                console.log(success);
                toast.success("file successfully uploaded!")
            }
        ).catch(
            error => {
                console.log(error);
                toast.error("unable to upload file!");
                setLoader(false)

            }

        );
        setFile(null)
    }
    return (
        <div>
            <Form>
                <div className="mb-3">
                    <label className="form-label">Enter the File name :</label>
                    <input className="form-control" type="file" onChange={ev => setFile(ev?.target.files)} id="formFile" />
                </div>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter the File Password :</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)} />
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                    <Button variant="dark" onClick={uploadFile}>
                        Upload File {loader ? <Spinner  size="sm" animation="grow" /> : ""}
                    </Button>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* <Progress now={60} /> */}
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default AddFile