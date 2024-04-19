import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardPlan from '~/component/Card/CardPlane';
import VnpayService from '~/services/vnpay.service';
import { toast } from 'react-toastify';
import { trio } from 'ldrs';

// Default values shown

const PlanView = () => {
  trio.register();
  const navigate = useNavigate();
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
        padding: '40px 0',
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
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const run = async () => {
      const sreach = window.location.search;
      if (sreach) {
        setisLoading(true);
        const returnData = await VnpayService.return(sreach);
        if (returnData.success) {
          setisLoading(false);
          toast.success('Nâng cấp tài khoản thành công');
          navigate('/chat');
        } else {
          setisLoading(false);
          toast.warning('Nâng cấp tài khoản thất bại');
        }
      }
    };
    run();
  }, []);
  return (
    <Grid container sx={{ height: '100vh', margin: 0, overflow: 'auto' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(240,240,240,.8)',
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <span style={{ fontSize: '1.45rem' }}>
            <l-trio size="52" speed="1.3" color="rgb(240, 110, 40)"></l-trio>
          </span>
        </div>
      )}
      <Link
        to={'/chat'}
        style={{
          position: 'absolute',
          padding: 20,
          textDecoration: 'none',
          fontSize: '1.5rem',
          color: 'black',
        }}
        className="cartBuyTitle"
      >
        <img src="./logo/fpt.png" height={40} alt="" />
      </Link>
      <CustomGrid backgroundColor="rgb(240,240,240)">
        <CardPlan
          label={'1 tháng'}
          price={100000}
          planDate={30}
          description={'✅ Số lượng câu hỏi với chat không giới hạn'}
          description2={'✅ Hỗ trợ 24/7'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
      <CustomGrid backgroundColor="rgb(240,240,240)">
        <CardPlan
          label={'6 tháng'}
          price={500000}
          planDate={180}
          description={'✅ Số lượng câu hỏi với chat không giới hạn'}
          description2={'✅ Hỗ trợ 24/7'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
      <CustomGrid backgroundColor="rgb(240,240,240)">
        <CardPlan
          label={'1 năm'}
          price={1000000}
          planDate={365}
          description={'✅ Số lượng câu hỏi với chat không giới hạn'}
          description2={'✅ Hỗ trợ 24/7'}
          handleGetContent={handleGetContent}
        />
      </CustomGrid>
    </Grid>
  );
};

export default PlanView;
