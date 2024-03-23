import { useRef, useState } from 'react';
import Papa from 'papaparse';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import axios from 'axios';

const Excel = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const fileInput = useRef(null);

  const processData = (results) => {
    const updatedData = results.data.map(row => {
      if (row['Note+']) {
        row['Note'] = row['Note+'];
        delete row['Note+'];
      }
      return row;
    });
    setData(updatedData);
    alert('Data imported successfully');
  };

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
  
      // Parse the file with Papa.parse
      Papa.parse(file, {
        header: true,
        complete: processData
      });
  
      // Create a FormData instance
      const formData = new FormData();
  
      // Append the file to the 'file' field
      formData.append('file', file);
  
      // Send a POST request to your server with the FormData instance
      const res = await axios.post('http://localhost:8000/api/excel/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <input type="file" ref={fileInput} onChange={handleFileUpload} style={{ display: 'none' }} />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Excel</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ordinal Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Input</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Description}</TableCell>
                <TableCell>{row.Input}</TableCell>
                <TableCell>{row.Note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Excel;