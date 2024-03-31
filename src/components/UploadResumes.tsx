import axios from "axios"
import { Fragment, useState } from "react"
import { useMutation } from "react-query"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import "./styles/UploadResumes.css"
import { Alert, IconButton } from "@mui/material"
import {  GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedSteppers from "./CustomizedStepper";
import AddSelectionFilter from "./AddSelectionFilter";
import AxiosInstance from "./api/AxiosInstance";
import RecommendationLoader from "./RecommendationLoader";
import ViewResumeAnalysisResult from "./ViewResumeAnalysisResult";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const UploadResumes = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [processedData, setProcessedData] = useState<[]>();
  const [deleteUploadedFromServerDialogShown, setDeleteUploadedFromServerDialogShown] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null)
  const [resp, setResp] = useState<any>()
  const [recommendationLabel, setRecommendationLabel] = useState<string>("Process Recommendation...")
  const [showUploadSection, setShowUploadSection] = useState(true)
  const columns = [
    { field: 'fileName', headerName: 'File Name', width: 200 },
    { field: 'uploaded', headerName: 'Uploaded', width: 200 },
    { field: 'processed', headerName: 'Processed', width: 200 },
  ];
  

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files)
    }
  }
  const uploadMutation = useMutation(async (formData: any) => {
    const response = await AxiosInstance.post('/onboarding/api/upload', formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data;
  })
  const someUploadSuccess = (uploadedFiles: any[]): boolean => {
    return uploadedFiles.some((file: any) => file.isUploaded === true)
  }
  const handleDeleteUploadedFilesToServer = () => {
    setDeleteUploadedFromServerDialogShown(true);
    console.log('request to delete specified files from server');
  };
  const handleClose = () => {
    setDeleteUploadedFromServerDialogShown(false);
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleSubmitFilters = (data:any) => {
    data.candidateData = JSON.parse(localStorage.getItem("candidateData"));
    console.log("submitted ",data)
    AxiosInstance.post('/onboarding/api/v1/filtering', data).then((res) => {
      console.log(res.data)
      setProcessedData(res.data)
      handleNext()
      // simulate time taken to process recommendation
      setTimeout(() => {
        handleNext()
      }, 5000);
      setTimeout(() => {
        setRecommendationLabel("Ready!")
      }, 3500);
    }).catch((err) => {
      console.log(err)
      toast.error('Something went wrong! Please try again.')
    })
    
  }

  const files = fileList ? [...fileList] : []
  const handleUploadClick = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((element) => {
        formData.append(`files`, element, element.name);
      });

      try {
        await uploadMutation.mutateAsync(formData)
          .then((data) => {
            console.log(data);
            console.log("setting data to local storage");
            localStorage.setItem('candidateData', JSON.stringify(data.candidateData))
            console.log(localStorage.getItem('candidateData'));
            setResp(data)
            if (someUploadSuccess(data.uploadedFiles)) {
              setShowUploadSection(false)
            }
          })
      } catch (error) {
        console.log(error)
        toast.error('Somthing went wrong! '+ error +' Please try again.');
      }
    
    }
  }
  const rows = resp ? resp.uploadedFiles.map((file: any) => (
    {
      id: file.fileName,
      fileName: file.fileName,
      processed: file.isProcessed === true ? 'Yes ✅' : 'No ❌',
      uploaded: file.isUploaded === true ? 'Yes ✅' : 'No ❌'
    })) : []

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <IconButton
        color="primary"
        aria-label="Delete"
        size="small"
        onClick={handleDeleteUploadedFilesToServer}
      >
        <DeleteIcon />
      </IconButton>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
  const steps = [
    'Upload Resumes',
    'Add Selection Filter',
    'Process Recommendation',
    'View Results'
  ]


  const UploadResumeSection = () => (
    <div className="upload__resumes">
      <div className="informative">
          <h2>Upload Resumes</h2>
          <Alert variant="outlined" severity="info" >
          Make sure that files uploaded are representing resumes in PDF format. <br />
          Loaded files will be processed and saved in the database. <br />
          If you request to delete uploaded files from the server, they will be deleted permanently. <br />
          </Alert>
          {resp  &&  (
          <div>
            {someUploadSuccess(resp.uploadedFiles) && (
              <Alert variant="outlined" severity="success" >
                {resp.uploadedFiles.length} files uploaded successfully
            </Alert>
            )}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, resp.uploadedFiles.length]}
                checkboxSelection
                components={{
                  Toolbar: CustomToolbar
              }}
                className="upload__resumes__table"
            />
            <div className="upload__resumes__table__footer">
              {
                someUploadSuccess(resp.uploadedFiles) && (
                  <button  onClick={handleNext} className="active__button">
                    Proceed
                  </button>
                )
              }
             <Fragment>
                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={deleteUploadedFromServerDialogShown}
                >
                  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Deleted Selected Files from Server
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      I am aware that this action will delete all uploaded files from the server.
                    </Typography>
                    <Typography gutterBottom>
                      This action cannot be undone.
                    </Typography>
                    <Typography gutterBottom>
                      for more information please contact the administrator.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Delete
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </Fragment>
            </div>
          </div>
        )}
           <Button  onClick={handleNext} size="small">
                    Proceed Test
           </Button>
          {uploadMutation.isLoading && <p>Uploading...</p>}
          {uploadMutation.isError && <p>Error uploading file(s)</p>}
      </div>
      {showUploadSection && (
          <div className="upload__section">
          <input type="file" accept='application/pdf' onChange={handleUpload} multiple className="upload__input" />
          <button onClick={handleUploadClick} disabled={files.length==0}>Upload</button>
        </div>
      )
      }
      </div>
  )

  const stepsComponents = [
    UploadResumeSection(),
    <>
      <AddSelectionFilter onSelectionFilterSubmitted={handleSubmitFilters} />
    </>,
    <>
      <RecommendationLoader label={recommendationLabel} />
      <button onClick={handleNext}>Next</button>
    </>,
     <>
      <ViewResumeAnalysisResult rows={processedData} />
      <button onClick={handleNext}>Next</button>
    </>
  ]
  return (
    <>
      <ToastContainer position="top-right" />
      <CustomizedSteppers steps={steps} stepsComponents={stepsComponents} handleNext={handleNext} activeStep={activeStep} />
    </>
  )
}






export default UploadResumes