import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form"
import { toast } from 'react-toastify'
import { GlobalContext } from '../../context'
import { IGlobal } from '../../types'

interface AddFolderProp {
    path: string,
    url: string
}

const AddFolder: React.FC<AddFolderProp> = ({ path, url }) => {
    const [folderName, setFolderName] = React.useState<string>("");
    const { getFiles } = React.useContext<IGlobal>(GlobalContext)


    const addFolder = () => {
        if (folderName === "") {
            toast.error("Please enter file password")
            return;
        }
        fetch(`${url}/api/folder`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ folderName, path })
        }).then(
            response => response.json()
        ).then(
            success => {
                console.log(success);
                toast.info("Folder is created");
                getFiles(path + "/" + folderName)
            }
        ).catch(
            error => console.log(error)
        );
        setFolderName("")
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter the folder name :</Form.Label>
                    <Form.Control type="text" placeholder="Folder name" onChange={ev => setFolderName(ev.target.value)} />
                </Form.Group>
                <Button variant="dark" onClick={addFolder}>
                    Add Folder
                </Button>
            </Form>
        </div>
    )
}

export default AddFolder