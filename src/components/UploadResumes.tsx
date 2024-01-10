import axios from "axios"
import { useState } from "react"
import { useMutation } from "react-query"




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
    <>
      <h6>Upload Resumes</h6>
      {resp && (
        <div>
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
      <input type="file" accept='application/pdf' onChange={handleUpload} multiple />
      <button onClick={handleUploadClick}>Upload</button>
    </>
  )
}



export default UploadResumes