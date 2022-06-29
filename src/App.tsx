import React from 'react';
import './App.css';
import { GlobalContext } from './context';
import { IPath } from './types';
import Index from './views/Index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [path, setPath] = React.useState<string>("");
  const [trigger, setTrigger] = React.useState<Boolean>(false);
  const [paths, setPaths] = React.useState<IPath[]>([{ path: "/", index: 0 }]);

  const getFiles = (_path: string, _trigger: Boolean = false) => {
    if (_trigger) {
      console.log("file trigger ");
      setTrigger(!trigger)
      return
    }
    setPath(_path);
    const length = _path === "/" ? 1 : _path.split("/").length;
    if (length < paths.length) {
      const _paths = paths.filter((pathObj: IPath) => pathObj.index < length);
      setPaths(_paths)
    } else {
      setPaths([...paths, { path: _path, index: paths.length }])
    }
  }

  const uploadFile = () => {

  }

  return (
    <div className='root_container'>
      <ToastContainer position="top-center" />
      <GlobalContext.Provider value={{
        getFiles,
        paths,
        path,
        url: "http://localhost:4000"
      }}>

        <Index url='http://localhost:4000' path={path} trigger={trigger}/>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
