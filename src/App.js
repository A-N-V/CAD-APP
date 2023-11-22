import React, { useState } from 'react';
import styles from './App.module.css';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Fieldset } from 'primereact/fieldset';
        
        

export default function App() {
  const [fileFormat, setFileFormat] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleDownload = () => {
    if (fileFormat && fileContent) {
      const fileName = `file.${fileFormat}`;
      const fileData = `${fileContent}`;

      const element = document.createElement('a');
      const file = new Blob([fileData], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleFormatChange = (event) => {
    setFileFormat(event.target.value);
  };

  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  return (
    <main className={styles.main}>
      <Fieldset legend="Principle of operation" className={styles.item1}>
          <p className="m-0">
            Select the file format you need, 
            then fill in the contents and save.
          </p>
      </Fieldset>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ENTER FILE FORMAT</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="ENTER FILE FORMAT"
          value={fileFormat}
          onChange={handleFormatChange}
          className={styles.item2}
        >
          <MenuItem value="dwg">DWG</MenuItem>
          <MenuItem value="dxf">DXF</MenuItem>
          <MenuItem value="step">STEP</MenuItem>
          <MenuItem value="iges">IGES</MenuItem>
          <MenuItem value="stl">STL</MenuItem>
        </Select>
        <div className={styles.item3}>
          <Button variant="contained" endIcon={<FileDownloadIcon />} onClick={handleDownload}>
            Download
          </Button>
        </div>
        <TextField
          id="outlined-basic"
          label="ENTER FILE CONTENTS"
          variant="outlined"
          value={fileContent}
          onChange={handleContentChange}
          multiline
        />
      </FormControl>
    </main>
  );
}