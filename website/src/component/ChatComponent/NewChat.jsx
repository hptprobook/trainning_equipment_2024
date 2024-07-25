import { useEffect, useState } from 'react';
import CardPrompt from '../Card/CardPrompt';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrompts } from '~/redux/slices/promptsSlice';
import OptionSelect from './../Select/OptionSelect';


const NewChat = ({ handleAddPrompt }) => {
  const dispatch = useDispatch();
  const [prompts, setPrompts] = useState([]);
  const [useCaseOption, setUseCaseOption] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  const data = useSelector((state) => state.prompts.data);
  const status = useSelector((state) => state.prompts.status);
  useEffect(() => {
    dispatch(getAllPrompts());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      setPrompts(data.prompts);
      setUseCaseOption(data.useCase);
      setCategoryOption(data.category);
    }
  }, [status, data]);

  const handlePrompt = (content) => {
    handleAddPrompt(content);
  };
  const handleSortUseCase = (content) => {
    if (content === '') {
      setPrompts(data.prompts);
      return;
    }
    const newPompts = data.prompts.filter((item) => item.use_case === content);
    setPrompts(newPompts);
  };
  const handleSortCategory = (content) => {
    if (content === '') {
      setPrompts(data.prompts);
      return;
    }
    const newPompts = data.prompts.filter((item) => item.category === content);
    setPrompts(newPompts);
  };

  return (
    <div>
      <h1>Xin chào!</h1>
      <p>Tôi có thể giúp bạn như thế nào hôm nay?</p>
      <Grid spacing={2} container>
        <Grid item xs={12} md={12} sm={12}>
          <OptionSelect
            label="Ngôn ngữ"
            name="sort"
            handleGetContent={handleSortUseCase}
            option={useCaseOption}
          />
          <OptionSelect
            label="Phân loại"
            name="sort"
            handleGetContent={handleSortCategory}
            option={categoryOption}
          />
        </Grid>
        {prompts.map((item, index) => (
          <CardPrompt
            key={index}
            template={item.prompt_template}
            title={item.prompt_title}
            content={item.teaser}
            handleClick={handlePrompt}
          />
        ))}
      </Grid>
    </div>
  );
};

export default NewChat;
