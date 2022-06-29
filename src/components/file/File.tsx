import React from 'react'
import { IFile } from '../../types'
import { FaFile, FaTrash, FaFileDownload } from 'react-icons/fa';
import Model from '../model/Model';
import DownloadFile from '../../views/file/DownloadFile';


const File: React.FC<IFile> = ({ isDirectory, name, size, path, birthtime }) => {
    return (
        <div className="d-flex bd-highlight" style={{ cursor: "pointer" }}>
            <div className="p-2 bd-highlight">{<FaFile />}</div>
            <div className="p-2 flex-grow-1 bd-highlight">{name}</div>
            <div className="p-2 bd-highlight">{new Date(birthtime).toLocaleDateString()}</div>
            <div className="p-2 bd-highlight">{size}</div>
            {/* <div className="p-2 bd-highlight">{<CustomAlert alertTitle='Download File' alertMsg='You want to download file ?' icon={<FaFileDownload />} />}</div> */}
            <div className="p-2 bd-highlight">
                <Model path={path} btnTitle="Add" title='Add Folder' icon={<FaFileDownload  />} >
                    <DownloadFile  name={name}  />
                </Model>
            </div>
            <div className="p-2 bd-highlight">{<FaTrash />}</div>
        </div>
    )
}

export default File