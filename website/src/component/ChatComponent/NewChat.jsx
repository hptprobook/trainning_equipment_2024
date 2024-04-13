import { useEffect, useState } from 'react';
import CardPrompt from '../Card/CardPrompt';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPrompts } from '~/redux/slices/promptsSlice';
import OptionSelect from './../Select/OptionSelect';
import { sortOption } from '~/config/optionConfig';
const NewChat = ({ handleAddPrompt }) => {
	const dispatch = useDispatch();
	const [prompts, setPrompts] = useState([]);
	const data = useSelector((state) => state.prompts.data.prompts);
	const status = useSelector((state) => state.prompts.status);
	useEffect(() => {
		dispatch(getAllPrompts());
	}, [dispatch]);
	useEffect(() => {
		if (status === 'success') {
			setPrompts(data);
		}
	}, [status, data]);
	const handlePrompt = (content) => {
		handleAddPrompt(content);
	};
	const handleSort = (content) => {
		console.log(content);
	};
	return (
		<div>
			<h1>Xin chào!</h1>
			<p>Tôi có thể giúp bạn như thế nào hôm nay?</p>
			<Grid spacing={2} container>
				<Grid item xs={12} md={6} sm={12}>
					<OptionSelect
						label="Sắp xếp"
						name="sort"
						noneValue={false}
						handleGetContent={handleSort}
						option={sortOption}
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
