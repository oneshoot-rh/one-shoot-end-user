import axios from "axios"
import { useState } from "react"
import { useMutation } from "react-query"

import "./styles/UploadResumes.css"
import { Alert, IconButton } from "@mui/material"




const UploadResumes = () => {
  const [fileList, setFileList] = useState<FileList | null>(null)
  const [resp , setResp] = useState<any>()
  

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files)
    }
  }
  const uploadMutation = useMutation(async (formData : any) => {
      const response = await axios.post('/api/v1/upload', formData)
      return response.data;
  })
  const files = fileList ? [...fileList] : []
  const handleUploadClick = async () => {
    if (files) {
      const formData = new FormData();
      files.forEach((element) => {
        formData.append(`files`, element,element.name);
      });

      try {
        setResp(await uploadMutation.mutateAsync(formData));
      }catch(error){
        console.log(error)
      }
    
    }

  }

  return (
    <div className="upload__resumes">
      <div className="informative">
          <h2>Upload Resumes</h2>
          <Alert variant="outlined" severity="info" >
            Make sure that files uploaded are representing resumes in PDF format.
          </Alert>
          {resp && (
            <div>
              <Alert variant="outlined" severity="success" >
                {resp.uploadedFiles.length} files uploaded successfully
              </Alert>
              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {resp.uploadedFiles.map((file: any) => (
                    <tr key={file.fileName}>
                      <td>{file.fileName}</td>
                      <td>{file.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {uploadMutation.isLoading && <p>Uploading...</p>}
          {uploadMutation.isError && <p>Error uploading file(s)</p>}
      </div>
      <div className="upload__section">
        <input type="file" accept='application/pdf' onChange={handleUpload} multiple className="upload__input" />
        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  )
}



export default UploadResumes