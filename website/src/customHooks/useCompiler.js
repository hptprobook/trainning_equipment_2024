import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { nextStepAfterRun, runCode } from '~/redux/slices/compilerSlice';
import { defaultCode } from '~/utils/formatters';

const useCompiler = () => {
  const [compileOutput, setCompileOutput] = useState('');
  const [gptResponseError, setGptResponseError] = useState(null);
  const [gptResponseRefactor, setGptResponseRefactor] = useState(null);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [sourceCode, setSourceCode] = useState(defaultCode.javascript);

  const handleRunCode = async () => {
    setCompileOutput('');
    setGptResponseError(null);
    setGptResponseRefactor(null);

    try {
      const resultAction = await dispatch(
        runCode({
          language: selectedLanguage,
          code: sourceCode,
        })
      ).unwrap();

      if (resultAction.status === 'success') {
        setCompileOutput(
          resultAction.stderr
            ? 'Có lỗi trong đoạn mã này. Đang tìm phương hướng giải quyết. Vui lòng chờ ...'
            : resultAction.stdout
        );
      } else {
        setCompileOutput(
          resultAction.exception || 'Đã xảy ra lỗi, vui lòng thử lại'
        );
      }

      if (resultAction.stderr) {
        setGptResponseError(null);
        const gptRes = await dispatch(
          nextStepAfterRun({
            condition: 'error',
            code: sourceCode,
          })
        ).unwrap();
        setGptResponseError(JSON.parse(gptRes.content));
      }
    } catch (err) {
      toast.error('Biên dịch mã bị lỗi, vui lòng thử lại!', {
        autoClose: 1000,
      });
    }
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(sourceCode)
        .then(() => {
          toast.success('Đã sao chép!', {
            autoClose: 500,
          });
        })
        .catch(() => {
          toast.error('Lỗi khi sao chép mã, vui lòng thử lại!');
        });
    } else {
      toast.warning('Bộ nhớ tạm chưa sẵn sàng, vui lòng thử lại.');
    }
  };

  const handleShowRefactor = async () => {
    setGptResponseRefactor(null);
    try {
      const gptRes = await dispatch(
        nextStepAfterRun({
          condition: 'refactor',
          code: sourceCode,
        })
      ).unwrap();

      const parsedResponse = JSON.parse(gptRes.content);

      setGptResponseRefactor(parsedResponse);
    } catch (error) {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return {
    // State
    compileOutput,
    setCompileOutput,
    gptResponseError,
    setGptResponseError,
    gptResponseRefactor,
    setGptResponseRefactor,
    selectedLanguage,
    setSelectedLanguage,
    sourceCode,
    setSourceCode,
    // Function
    handleRunCode,
    handleCopyCode,
    handleShowRefactor,
  };
};

export default useCompiler;
