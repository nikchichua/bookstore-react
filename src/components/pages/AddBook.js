import {Button, Card, Form} from "react-bootstrap";
import MyToast from "../includes/MyToast";
import {useState} from "react";
import fadeOutAndDelete from "../../functions/functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {saveBook} from "../../services";
import {useDispatch, useSelector} from "react-redux";

const AddBook = (props) => {
    const savedBook = useSelector(state => state.book);
    const dispatch = useDispatch();

    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            title: event.target.title.value,
            author: event.target.author.value,
            imageUrl: event.target.imageUrl.value,
            isbnNumber: event.target.isbnNumber.value.toString(),
            price: parseFloat(event.target.price.value),
            language: event.target.language.value
        }
        event.target.title.value = '';
        event.target.author.value = '';
        event.target.imageUrl.value = '';
        event.target.isbnNumber.value = '';
        event.target.price.value = '';
        event.target.language.value = '';
        dispatch(saveBook(data, () => {
            fadeOutAndDelete('success', setSuccess);
        }, error => {
            alert('There was a post error');
            console.log(error);
        }));
    }

    return (
        <>
            {success && <MyToast id='success' color='success' heading='Success' text='Book Successfully Added'/>}
            <Card className='border border-dark bg-dark text-white'>
                {
                    !props.hideHeader &&
                    <Card.Header style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <FontAwesomeIcon icon={faPlus}/> {props.title}
                    </Card.Header>
                }
                <Form onSubmit={event => handleSubmit(event)} id='bookFormId'>
                    <Card.Body style={styleSheet.cardBody}>
                        <Form.Row>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control required
                                              name='title'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book Title'/>
                            </Form.Group>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>Author</Form.Label>
                                <Form.Control required
                                              name='author'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book Author'/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={styleSheet.sideBySide}>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>Cover Photo URL</Form.Label>
                                <Form.Control required
                                              name='imageUrl'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book Cover Photo URL'/>
                            </Form.Group>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control required
                                              name='isbnNumber'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book ISBN Number'/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={styleSheet.sideBySide}>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>Price</Form.Label>
                                <Form.Control required
                                              name='price'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book Price'/>
                            </Form.Group>
                            <Form.Group style={{marginBottom: 30}}>
                                <Form.Label>Language</Form.Label>
                                <Form.Control required
                                              name='language'
                                              className='bg-dark text-white'
                                              type='text'
                                              placeholder='Enter Book Language'/>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    {
                        !props.hideFooter &&
                        <Card.Footer style={{textAlign: 'center', padding: '30px 0px'}}>
                            <Button style={{
                                minWidth: '140px',
                                fontWeight: 'bold',
                                width: '15%',
                                fontSize: '18px',
                                textTransform: 'uppercase'
                            }} size='lg' type='submit'>Submit</Button>
                        </Card.Footer>
                    }
                </Form>
            </Card>
        </>
    )
}

const styleSheet = {
    cardBody: {
        padding: '30px'
    },
    sideBySide: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2%'
    }
}

export default AddBook;