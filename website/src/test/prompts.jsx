import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const GetPrompts = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Initialize page state variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.maxai.me/prompt/search_prompt', {
          page: page,
          page_size: 5,
          category: "Software Engineering"
        });

        // Map over the data and return a new object that excludes the id property
        const filteredData = await Promise.all(response.data.data.map(async ({ id, teaser, ...item }) => {
          // Translate teaser to Vietnamese
          const translatedTeaser = await translateTeaser(teaser);
          return { ...item, teaser: translatedTeaser };
        }));

        setData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [page]);

  const translateTeaser = async (teaser) => {
    // Comment out the translation logic
    /*
    try {
      let YOUR_GOOGLE_API_KEY = 'AIzaSyBYUWbnrdG_Sy-GSAG1TksUE9n6VPoT8VI';
      const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${YOUR_GOOGLE_API_KEY}`, {
        q: teaser,
        source: 'en',
        target: 'vi',
        format: 'text'
      });
  
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error(`Translation Error: ${error}`);
    }
    */
    // Return the original teaser
    return teaser;
  };

  const addPrompt = async () => {
    try {
      await axios.post('http://localhost:8000/api/prompt/addPrompt', data);
      alert('Prompt added successfully');
    } catch (error) {
      console.error('Error adding prompt: ', error);
      alert('Error from react: ',error);
    }
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1); // Increase page by 1
  };
  const handlePreviousPage = () => {
    setPage(prevPage => prevPage - 1); // Increase page by 1
  };

  return (
    <>
    
    <Button variant="contained" color="primary" onClick={addPrompt}>Add Prompt</Button>
      <TableContainer style={{
        maxHeight: '500px',
        overflow: 'auto',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Prompt template</TableCell>
              <TableCell>Prompt title</TableCell>
              <TableCell>Use case </TableCell>
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
                          <li><b>Name:</b> {variable.name}</li>
                          <li><b>Hint:</b> {variable.hint}</li>
                          <li><b>Type:</b> {variable.type}</li>
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
      <Button variant="contained" color="secondary" onClick={handleNextPage}>Next Page</Button>

    </>
  );
};

export default GetPrompts;