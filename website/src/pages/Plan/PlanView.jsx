import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import CardPlan from '~/component/Card/CardPlane';
import VnpayService from '~/services/vnpay.service';
const PlanView = () => {
  const CustomGrid = ({ backgroundColor, children }) => (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 0',
      }}
    >
      {children}
    </Grid>
  );
  const handleGetContent = async (content) => {
    const { price } = content;
    const code = Math.random().toString(36).slice(2, 10);
    const data = await VnpayService.getLink({ orderId: code, amount: price });
    if (data) {
      window.location.assign(data);
    }
  };
  useEffect(() => {
    const run = async () => {
      const sreach = window.location.search;
      if (sreach) {
        const returnData = await VnpayService.return(sreach);
        console.log(returnData);
      }
    };
    run();
  }, []);

  return (
    <Grid container sx={{ height: '100vh', margin: 0, overflow: 'auto' }}>
      <CustomGrid backgroundColor="rgb(10,82,160)">
        <CardPlan
          label={'1 tháng'}
          price={100000}
          planDate={30}
          description={'well meaning and kindly. "a benevolent smile"'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
      <CustomGrid backgroundColor="rgb(240,110,40)">
        <CardPlan
          label={'6 tháng'}
          price={500000}
          planDate={180}
          description={'well meaning and kindly. "a benevolent smile"'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
      <CustomGrid backgroundColor="rgb(80,185,70)">
        <CardPlan
          label={'1 năm'}
          price={1000000}
          planDate={365}
          description={'well meaning and kindly. "a benevolent smile"'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
    </Grid>
  );
};

export default PlanView;
