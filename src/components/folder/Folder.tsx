import React, { useContext } from 'react'
import { IFile, IGlobal } from '../../types'
import { FaFolder } from 'react-icons/fa';
import { GlobalContext } from '../../context';

const Folder: React.FC<IFile> = ({ isDirectory, name, size, path, birthtime }) => {
    const { getFiles } = useContext<IGlobal>(GlobalContext)
    return (
        <div className="d-flex bd-highlight" style={{cursor:"pointer"}} onClick={()=>getFiles(path)}>
            <div className="p-2 bd-highlight">{<FaFolder />}</div>
            <div className="p-2 flex-grow-1 bd-highlight">{name}</div>
            <div className="p-2 bd-highlight">{new Date(birthtime).toLocaleDateString()}</div>
            <div className="p-2 bd-highlight">{size}</div>
        </div>
    )
}

export default Folder