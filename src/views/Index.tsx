import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import File from '../components/file/File'
import Folder from '../components/folder/Folder'
import Model from '../components/model/Model'
import Navigation from '../components/navigation/Navigation'
import useFetch from '../hooks/useFetch'
import { IFile } from '../types'
import AddFolder from './folder/AddFolder'
import { FaFileUpload, FaFolderPlus } from 'react-icons/fa';
import AddFile from './file/AddFile';
import { Spinner } from 'react-bootstrap';
import errorsvg from "./cloud-error-svgrepo-com.svg" 


interface IndexProp {
  url: string
  path: string
  trigger:Boolean
}

const Index: React.FC<IndexProp> = ({ url, path,trigger }) => {
  const [responce, error, isLoading] = useFetch<IFile[]>(`${url}/api/files?path=${path}`,trigger);

  if (error) {
    console.log("error", error)
    return<div className='fa_container'
    style={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column"
    }}
  >
    <img src={errorsvg} width={250} height={100} alt="404 error" />
    <div style={{  height: 25 }}>
        <p>server is down</p>
      </div>
  </div>
  }

  if (isLoading)
    return <div className='fa_container'
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
      }}
    >
      <Spinner animation="grow" />
      <div style={{ marginLeft: 10, height: 25 }}>
        <p>Loading...</p>

      </div>
    </div>

  return (
    <div className='fa_container' >
      <Row>
        <Col sm={9}><Navigation /></Col>
        <Col sm={3} className=" ms-auto">
          <div style={{ float: "right" }}>
            <Model path={path} btnTitle="Add" title='Upload File' icon={<FaFileUpload size={25} />} >
              <AddFile path={path} url={url} />
            </Model>
            <Model path={path} btnTitle="Add" title='Add Folder' icon={<FaFolderPlus size={25} />} >
              <AddFolder path={path} url={url} />
            </Model>
          </div>
        </Col>
      </Row>

      {
        responce && responce.sort((fileA: IFile, fileB: IFile) => Number(fileB.isDirectory) - Number(fileA.isDirectory)).map((file: IFile) => {
          if (file.isDirectory)
            return <Folder {...file} key={file.birthtime.toString()} />
          return <File {...file} key={file.birthtime.toString()} />
        })
      }

    </div>
  )
}

export default Index