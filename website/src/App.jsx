import MainRoute from './routes/route';
import Joyride from 'react-joyride';
import { Component } from 'react';
import './root.css';

class App extends Component {
  state = {
    run: false,
    steps: [
      {
        target: '.jr-first-step',
        content: 'Chọn ngôn ngữ lập trình!',
        placement: 'top',
      },
      {
        target: '.jr-second-step',
        content: 'Chuyển đổi giao diện!',
        placement: 'top',
      },
      {
        target: '.jr-third-step',
        content: 'Lưu đoạn mã!',
        placement: 'bottom',
      },
      {
        target: '.jr-fourth-step',
        content: 'Sao chép đoạn mã!',
        placement: 'bottom',
      },
      {
        target: '.jr-fifth-step',
        content: 'Chạy đoạn mã!',
        placement: 'bottom',
      },
      {
        target: '.jr-sixth-step',
        content: 'Làm sạch đầu ra!',
        placement: 'bottom',
      },
      {
        target: '.jr-seventh-step',
        content: 'Tra cứu đoạn mã bằng AI của chúng tôi!',
        placement: 'bottom',
      },
      {
        target: '.jr-eighth-step',
        content: 'Danh sách đoạn mã đã lưu!',
        placement: 'bottom',
      },
    ],
  };

  componentDidMount() {
    this.initializeTour();
  }

  initializeTour = () => {
    const isFirstVisit = localStorage.getItem('isFirstVisit') === null;
    if (isFirstVisit) {
      localStorage.setItem('isFirstVisit', 'visited');
      this.setState({ run: true });
    }
  };

  render() {
    const { run, steps } = this.state;

    return (
      <>
        <Joyride
          run={run}
          steps={steps}
          continuous={true}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          locale={{
            last: 'Kết thúc',
            skip: 'Bỏ qua',
            next: 'Tiếp tục',
            back: 'Quay lại',
          }}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
        <MainRoute />
      </>
    );
  }
}

export default App;
