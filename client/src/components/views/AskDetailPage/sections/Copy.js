import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy = () => {
  const currentUrl = window.location.href;
  const onCopyHandler = () => {
    alert('링크가 복사되었습니다.');
  };

  return (
    <CopyToClipboard text={currentUrl}>
      <button className="link" onClick={onCopyHandler}>
        URL 링크복사
      </button>
    </CopyToClipboard>
  );
};

export default Copy;
