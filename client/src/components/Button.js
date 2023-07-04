import Button from 'react-bootstrap/Button';
import "./button.css";
function Btn({text,cls, link, vari}) {
  return (
        <Button href={link} className={cls} variant={vari} size="lg">{text}</Button>
  );
}

export default Btn;