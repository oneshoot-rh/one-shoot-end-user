import { Alert, AlertTitle, Box, Checkbox, FormControlLabel, FormGroup, IconButton, ListItemText, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import "./styles/AddSelectionFilter.css"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const JOB_DESCRIPTION_LENGTH_OBLIGATION = 100

const AddSelectionFilter = (props:any) => {


    const [selectionVariables , setSelectionVariables] = useState<SelectionVariable[]>([
        {
            "name": "title",
            "value": ""
        },
        {
            "name": "experience",
            "value": "",
            "selectRange": {
                "unit": "years",
                "min": 0,
                "max": 30
            }
        },
        {
            "name": "location",
            "value": "",
            "select": {
                "type": "multiple",
                "options": ["Morocco","France","USA"]
            }
        },
        {
            "name": "salary",
            "value": "",
            "selectRange": {
                "unit": "MAD/Month",
                "min": 0,
                "max": 100000,
            }
        },
        {
            "name": "contractType",
            "value": "",
            "select": {
                "type": "multiple",
                "options": ["Full Time","Part Time","Internship","Contract","Freelance"]
            }
        },
        {
            "name": "industry",
            "value": "",
            "select": {
                "type": "multiple",
                "options": ["IT","Finance","Marketing"]
            }
        },
        {
            "name": "skills",
            "value": "",   // comma separated list
            "select": {
                "type": "multiple",
                "options": ["Java","Spring Boot","React","NodeJS","Express","MongoDB"]
            }
        },
        {
            "name": "degreeRequired",
            "value": "",
            "select": {
                "type": "single",
                "options": ["None","Bachelor","Master","PhD"]
            }
        },
        {
            "name": "tools",
            "value": "",   // comma separated list
            "select": {
                "type": "multiple",
                "options": ["Git","Jira","Docker","Kubernetes","Jenkins","AWS"]
            }
        }
    ])
    const [activeSelectionVariable, setActiveSelectionVariable] = useState<string>("")
    const [jobDescription, setJobDescription] = useState<string>("")
    const [activeSelectionVariableValue, setActiveSelectionVariableValue] = useState<any>([])
    const [selectionVariablesList, setSelectionVariablesList] = useState<SelectionVariable[]>([])
    const [useBothFilter, setUseBothFilter] = useState<boolean>(false)
    const handleChange = (event: SelectChangeEvent) => {
          setActiveSelectionVariable(event.target.value);
          console.log(event.target.value);
    };
    const changeActiveSelectionVariableValue = (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string>) => {
        setActiveSelectionVariableValue(event.target.value as string[])
    }
    const changeActiveSelectionVariableValueFromSelect = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        if (activeSelectionVariableValue.length === 0) {
            setActiveSelectionVariableValue(value);
        } else if (value.every((val) => activeSelectionVariableValue.includes(val))) {
            // Deselect all if all are already selected
            setActiveSelectionVariableValue([]);
        } else {
            // Toggle the selected value
            setActiveSelectionVariableValue((prevValue:any) => {
                const newValues = [...prevValue];
                value.forEach((val) => {
                    if (newValues.includes(val)) {
                        // what does the next line do?
                        //newValues.splice(newValues.indexOf(val), 1);
                    } else {
                        newValues.push(val);
                    }
                });
                return newValues;
            });
        }
    };
    const handleNextVariable = () => {
        let newSelectionVariables = [...selectionVariables]
        newSelectionVariables = newSelectionVariables.filter((selectionVariable: SelectionVariable) => selectionVariable.name !== activeSelectionVariable)
        setSelectionVariables(newSelectionVariables)
        setSelectionVariablesList([...selectionVariablesList, {name: activeSelectionVariable, value: activeSelectionVariableValue}])
        setActiveSelectionVariable("")
        setActiveSelectionVariableValue("")
        console.log(selectionVariablesList);
    }
    const filterOptionFilled = () => {
        return selectionVariablesList.length >= selectionVariables.length ||
            jobDescription.length > JOB_DESCRIPTION_LENGTH_OBLIGATION; // 100 character 
    }
    const handleDeletFilter = (selectionVariable: SelectionVariable) => () => {       
        // TODO: fix bug later
        let newSelectionVariablesList = [...selectionVariablesList]
        newSelectionVariablesList = newSelectionVariablesList.filter((selectionVariableItem: SelectionVariable) => selectionVariableItem.name !== selectionVariable.name)
        setSelectionVariablesList(newSelectionVariablesList)
        setSelectionVariables([...selectionVariables, selectionVariable])
    }

    const renderSelectionVariableInput = () => {
        const selectedVariable = selectionVariables.find((selectionVariable: SelectionVariable) => selectionVariable.name === activeSelectionVariable)
        if (!selectedVariable) return null;
        else if (selectedVariable.select) {
            if (selectedVariable.select.type === "multiple") {
                return (
                    <FormControl sx={{ m: 1, minWidth: "50%" ,mt: 3,mb:3 , flex:1}} >
                        <InputLabel id="demo-multiple-checkbox-label">{activeSelectionVariable}</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={activeSelectionVariableValue || []}
                            multiple
                            defaultValue={[]}
                            onChange={changeActiveSelectionVariableValueFromSelect}
                            input={<OutlinedInput label={activeSelectionVariable} />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            error={activeSelectionVariableValue.length == 0}
                            required
                        >
                            {selectedVariable.select.options.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={activeSelectionVariableValue.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            } else if (selectedVariable.select.type === "single") {
                return (
                    <FormControl sx={{ m: 1, minWidth: "50%" ,mt: 3,mb:3 , flex:1}} >
                        <InputLabel id="demo-simple-select-label">{activeSelectionVariable}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={activeSelectionVariableValue}
                            label={activeSelectionVariable}
                            onChange={changeActiveSelectionVariableValue}
                            error={activeSelectionVariableValue.length == 0}
                            required
                        >
                            {
                                selectedVariable.select.options.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                )
            }
        }
        else return <TextField
                               
                                id="outlined-multiline-static"
                                label={activeSelectionVariable}
                                defaultValue=""
                                variant="outlined"
                                type={selectedVariable.selectRange != null ? "number" : "text"}
                                placeholder={selectedVariable.selectRange?.unit != null ? selectedVariable.selectRange.unit : ""}
                                InputProps={{
                                    inputProps: {
                                        min: selectedVariable.selectRange?.min,
                                        max: selectedVariable.selectRange?.max
                                    }
                                }}
                                error={activeSelectionVariableValue.length == 0 || (selectedVariable.selectRange != null && (activeSelectionVariableValue < selectedVariable.selectRange.min || activeSelectionVariableValue > selectedVariable.selectRange.max))}
                                onChange={changeActiveSelectionVariableValue}
                                sx={{ m: 1, minWidth: "50%", mt: 3, mb: 3 }}
                                required
        />
    }
    

    
    return (
        <>
        <Box sx={{ display: "flex", justifyContent:"space-between" }}>
            <div className="selection__variables">
                <h3>Add Selection Filter</h3>
                <Box sx={{display: "flex"}} component="form" noValidate>
                    <FormControl sx={{ m: 1, minWidth: "50%" ,mt: 3,mb:3}} >
                        <InputLabel id="demo-select-small-label">Filter</InputLabel>
                            <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={activeSelectionVariable}
                            label={ activeSelectionVariable }
                            onChange={handleChange}
                            error={selectionVariablesList.length === 0 && useBothFilter}
                               
                        >
                            <MenuItem value="" disabled>
                            <em>None</em>
                            </MenuItem>
                            {
                                selectionVariables.map((selectionVariable: SelectionVariable) => (
                                    <MenuItem key={selectionVariable.name} value={selectionVariable.name}>{selectionVariable.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {
                        activeSelectionVariable && (
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                            }} >
                                {
                                    renderSelectionVariableInput()
                                }
                                <div className="doneIcon" >
                                    <IconButton aria-label="delete" size="small" color="success" onClick={handleNextVariable} disabled={activeSelectionVariableValue.length==0}>
                                        <CheckCircleIcon />
                                    </IconButton>
                                </div>
                            </Box>
                            
                        )
                    }
                </Box>
                   {
                selectionVariablesList.length > 0 && (
                    <div className="selection__variables__list">
                            {
                                selectionVariablesList.map((selectionVariable: SelectionVariable,index) => (
                                    //    material ui chip
                                    <div className="selection__variable__chip" key={index}>
                                        <span>{selectionVariable.name}</span>
                                        <span style={{fontWeight:'500'}}>{Array.isArray(selectionVariable.value) ? selectionVariable.value.join(", ") : (selectionVariable.selectRange!=null  ? selectionVariable.value+ " "+selectionVariable.selectRange.unit : selectionVariable.value)}</span>
                                         <IconButton aria-label="delete" size="small" color="error" onClick={handleDeletFilter(selectionVariable)} >
                                        <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </div>
                                ))
                            }
                    </div>
                )
                    }   
                    {/* {
                        selectionVariablesList.length === 0 && useBothFilter && (
                            <Alert severity="warning" sx={{marginTop:"3rem"}}>
                                <AlertTitle>Warning</AlertTitle>
                                You have selected to use both custom filter and job description but you have not selected any custom filter yet.
                            </Alert>
                        )
                    } */}
                
            </div>
            <Box sx={{width:"50%",paddingInline:"2rem"}}>
                    <h3>Put Job Description</h3>
                    <span style={{fontSize:"small"}}>
                       <InfoIcon style={{fontSize:"small" , alignSelf:"center"}} /> Make sure to put a detailed job description in english language to get the best results.
                    </span>
                <TextField
                    id="outlined-multiline-static"
                    label="Job Description"
                    multiline
                    rows={8}    
                    variant="outlined"
                    sx={{ minWidth: "100%", mt: 3, mb: 3 }}
                    value={jobDescription}
                    onChange={(e)=> setJobDescription(e.target.value)}
                    required={useBothFilter}
                    error={jobDescription.length < JOB_DESCRIPTION_LENGTH_OBLIGATION && useBothFilter}
                />
            </Box>
            </Box>
            <FormGroup>
                <Alert severity="info" sx={{marginTop:"3rem"}}>
                <AlertTitle>Info</AlertTitle>
                    Job description content will be processed using NLP and ML algorithms to extract the required information.
                    <br /> the recommandation model will take into consideration both the job description and the custom filters if selected.
                </Alert>
                <FormControlLabel
                    control={<Checkbox checked={useBothFilter} onChange={()=> setUseBothFilter(!useBothFilter)} />}
                    label="Use both custom filter and job description"
                />
                </FormGroup>
            <button onClick={props.handleNext} disabled={!filterOptionFilled()}>Next</button>
            </>
    )
}


export default AddSelectionFilter;