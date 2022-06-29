import ProgressBar from 'react-bootstrap/ProgressBar';

interface ProgressProps {
    now: number
}

const Progress: React.FC<ProgressProps> = ({ now }) => {

    return <ProgressBar now={now} label={`${now}%`} style={{width:200,height:40}} />;
}

export default Progress;