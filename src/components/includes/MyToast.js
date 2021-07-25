import {Toast} from "react-bootstrap";

const MyToast = (props) => {
    const toastCss = {
        position: 'fixed',
        zIndex: 999999,
        transition: 'ease 500ms',
        width: '250px',
        top: '70px',
        right: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }

    return (
        <div id={props.id} style={toastCss}>
            <Toast className={`border border-${props.color} bg-${props.color} text-white`}>
                <Toast.Header className={`bg-${props.color} text`} closeButton={false}>
                    <strong style={{fontSize: '17px'}} className='text-white'>{props.heading}</strong>
                </Toast.Header>
                <Toast.Body>
                    {props.text}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default MyToast;