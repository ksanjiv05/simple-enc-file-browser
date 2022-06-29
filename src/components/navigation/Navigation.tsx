import React, { useContext } from 'react'
import { GlobalContext } from '../../context'
import { IGlobal, IPath } from '../../types'



const Navigation: React.FC = () => {
    const { paths,getFiles } = useContext<IGlobal>(GlobalContext)
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {
                    paths && paths.map((pathObj: IPath,i) => {
                        if(i===0) return<li key={"home"+i} className="breadcrumb-item active" aria-current="page" style={{textTransform:"capitalize",cursor:"pointer"}} onClick={()=>getFiles(pathObj.path)}>Home</li>
                        return <li key={pathObj.path+""+i} className="breadcrumb-item active" aria-current="page" style={{textTransform:"capitalize",cursor:"pointer"}} onClick={()=>getFiles(pathObj.path)}>{pathObj.path.split("/").pop()}</li>
                    })
                }
            </ol>
        </nav>
    )
}

export default Navigation