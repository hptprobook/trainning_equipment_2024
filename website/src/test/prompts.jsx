import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const GetPrompts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Initialize page state variable
  const [pageSize, setPageSize] = useState(12);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.maxai.me/prompt/search_prompt', {
          page: page,
          page_size: 5,
          category: "Software Engineering"
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [page]); // Add page as a dependency


  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1); // Increase page by 1
  };
  const handlePreviousPage = () => {
    setPage(prevPage => prevPage - 1); // Increase page by 1
  };


  return (
    <>
      <TableContainer style={{
        maxHeight: '500px',
        overflow: 'auto',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Prompt template</TableCell>
              <TableCell>Prompt template</TableCell>
              <TableCell>Prompt title</TableCell>
              <TableCell>Variable </TableCell>
              <TableCell>Variable type </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((prompt, index) => (
                <TableRow key={index}>
                  <TableCell>{prompt.category}</TableCell>
                  <TableCell>{prompt.prompt_template}</TableCell>
                  <TableCell>{prompt.prompt_title}</TableCell>
                  <TableCell>{prompt.use_case}</TableCell>
                  <TableCell>
                    {
                      prompt.variables.map((variable, variableIndex) => (
                        <ul key={variableIndex}>
                          <li>Name: {variable.name}</li>
                          <li>Hint: {variable.hint}</li>
                          <li>Type: {variable.type}</li>
                        </ul>
                      ))
                    }
                  </TableCell>
                  <TableCell>
                    {
                      prompt.variable_types.map((type, typeIndex) => (
                        <div key={typeIndex}>{type}</div>
                      ))
                    }
                  </TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handlePreviousPage}>Previous Page</Button>
      <Button variant="contained" color="primary" onClick={handleNextPage}>Next Page</Button>

    </>
  );
};

export default GetPrompts;