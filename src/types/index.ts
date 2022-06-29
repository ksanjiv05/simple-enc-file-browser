export interface IFile {
  name: string;
  size: number;
  birthtime: Date;
  isDirectory: Boolean;
  path: string;
}
export interface IPath{
  path:string,
  index:number
}
export interface IGlobal {
  getFiles:(_path: string,_trigger?:Boolean)=>void,
  paths: IPath[],
  path:string,
  url:string
}

// export type { IFile };
