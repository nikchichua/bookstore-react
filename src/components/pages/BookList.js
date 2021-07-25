import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import MyToast from "../includes/MyToast";
import fadeOutAndDelete from "../../functions/functions";
import ViewModal from "../includes/ViewModal";
import AddBook from "./AddBook";
import {Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";
import {faFastBackward} from "@fortawesome/free-solid-svg-icons/faFastBackward";
import {faBackward} from "@fortawesome/free-solid-svg-icons/faBackward";
import {faForward} from "@fortawesome/free-solid-svg-icons/faForward";
import {faFastForward} from "@fortawesome/free-solid-svg-icons/faFastForward";
import {faSortUp} from "@fortawesome/free-solid-svg-icons/faSortUp";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";
import {faSort} from "@fortawesome/free-solid-svg-icons/faSort";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
//Redux:
import {useDispatch} from "react-redux";
import {deleteBook, updateBook} from "../../services";



const BookList = () => {
    const [bookData, setBookData] = useState([]);

    // Redux:
    const dispatch = useDispatch();

    const [deleted, setDeleted] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [finalDeletedClicked, setFinalDeleteClicked] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [updated, setUpdated] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [targetId, setTargetId] = useState('');

    // Pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [booksEachPage, setBooksEachPage] = useState(6);

    const goForward = () => {
        setPageNumber(prev => prev <= totalPages ? prev + 1 : isNaN(prev) ? 1 : prev);
    }

    const goToLast = () => {
        setPageNumber(totalPages);
    }

    const goBack = () => {
        setPageNumber(prev => prev > 1 ? prev - 1 : isNaN(prev) ? 1 : prev);
    }

    const goToFirst = () => {
        setPageNumber(1);
    }

    const changeManually = (event) => {
        setPageNumber(() => parseInt(event.target.value) > totalPages ? totalPages :
            parseInt(event.target.value) <= 0 ? 1 :
                parseInt(event.target.value));
        setTimeout(() => event.target.blur(), 500);
    }

    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('default');
    const [toggleSort, setToggleSort] = useState({});
    const [prevSortBy, setPrevSortBy] = useState('id');

    const handleSort = (event, name) => {
        if (prevSortBy !== name && prevSortBy !== 'id') {
            setSortDirection(prev => {
                setPrevSortBy(name);
                setSortBy(name);
                setToggleSort(prev => ({[name]: 'ascending'}));
                return 'ascending';
            });
        } else {
            setSortDirection(prev => {
                switch (prev) {
                    case 'default':
                        setSortBy(prev => {
                            setPrevSortBy(name);
                            setToggleSort(prev => ({[name]: 'ascending'}));
                            return name;
                        });
                        return 'ascending';
                    case 'ascending':
                        setSortBy(prev => {
                            setPrevSortBy(name);
                            setToggleSort(prev => ({[name]: 'default'}));
                            return name;
                        });
                        return 'descending';
                    default:
                        setSortBy(prev => {
                            setPrevSortBy(prev);
                            setToggleSort(prev => ({[name]: 'descending'}));
                            return 'id';
                        });
                        return 'default';
                }
            });
        }
    }

    const [searchValue, setSearchValue] = useState('%5c');

    const handleSearch = (event) => {
        setSearchValue(prev => {
            if(prev !== '%5c') {
                setPageNumber(1)
            }
            return '%5c' + encodeURIComponent(event.target.value)
        });
    }

    useEffect(() => {
        let getRequest;
        if (searchValue === '%5c') {
            getRequest = `http://localhost:9999/books/?&` +
                `page=${pageNumber - 1}&size=${booksEachPage}&` +
                `sortBy=${sortBy}&sortDirection=${sortDirection}`;
        } else {
            getRequest = `http://localhost:8080/books/?search=${searchValue}&` +
                `page=${pageNumber - 1}&size=${booksEachPage}&` +
                `sortBy=${sortBy}&sortDirection=${sortDirection}`;
        }
        axios.get(getRequest)
            .then(response => {
                setTotalBooks(response.data.totalElements)
                setTotalPages(response.data.totalPages)
                setBookData(response.data.content)
            })
            .catch(error => {
                alert("There was an error!");
                console.log(error);
            });
    }, [pageNumber, finalDeletedClicked, sortBy, sortDirection, searchValue, updated]);

    // -------------------------

    const handleEdit = async (id) => {
        setShowEditModal(true);
        setTargetId(id);
    }

    const handleUpdate = () => {
        setEmptyFields(false);
        if (!updated) {
            const element = document.getElementById('bookFormId');
            const book = {
                id: targetId,
                title: element.title.value,
                author: element.author.value,
                imageUrl: element.imageUrl.value,
                isbnNumber: element.isbnNumber.value.toString(),
                price: parseFloat(element.price.value),
                language: element.language.value
            }
            if (book.title.length <= 0 || book.author.length <= 0 || book.imageUrl.length <= 0 ||
                book.isbnNumber.length <= 0 || isNaN(book.price) || book.language.length <= 0) {
                setEmptyFields(true);
                setTimeout(() => setEmptyFields(false), 1000);
            } else {
                dispatch(updateBook(book, () => {
                    fadeOutAndDelete('edit', setUpdated);
                    setShowEditModal(false);
                    setBookData(prev => prev.map(each => each.id === targetId ? book : each));
                }, (error) => {
                    alert("There was an update error!");
                    console.log(error);
                }));
            }
        }
    }

    useEffect(() => {
        if (showEditModal) {
            const element = document.getElementById('bookFormId');
            const book = bookData.find(book => book.id === targetId);
            element.title.value = book.title;
            element.author.value = book.author;
            element.imageUrl.value = book.imageUrl;
            element.isbnNumber.value = book.isbnNumber;
            element.price.value = book.price;
            element.language.value = book.language;
        }
    }, [handleEdit])

    const handleDelete = (id) => {
        setShowConfirmModal(true);
        setTargetId(id);
    }

    useEffect(() => {
        if (deleted === false) {
            if (confirmDelete) {
                dispatch(deleteBook(targetId,
                    () => {
                    fadeOutAndDelete('delete', setDeleted);
                            let element = document.getElementById('book-' + targetId);
                            element.classList.add('fade-out');
                            setTimeout(() => {
                                element.classList.add('disappear');
                                setFinalDeleteClicked(true);
                            }, 300);
                }, error => {
                        alert('There was an error');
                        console.log(error);
                }));
                setConfirmDelete(false);
                setFinalDeleteClicked(false);
                setShowConfirmModal(false);
            }
        }
    }, [handleDelete])

    return (
        <>
            {deleted && <MyToast id='delete' color='danger' heading='Deleted' text='Book Successfully Deleted'/>}
            {updated && <MyToast id='edit' color='primary' heading='Updated' text='Book Successfully Updated'/>}
            <ViewModal show={showConfirmModal}
                       setShow={setShowConfirmModal}
                       confirmAction={() => setConfirmDelete(true)}
                       title='Delete AddBook'
                       closeButton='Close'
                       actionButton='Delete'
                       actionColor='danger'>
                Are you sure you want to delete this book?
            </ViewModal>
            <ViewModal show={showEditModal}
                       setShow={setShowEditModal}
                       title='Edit AddBook'
                       closeButton='Close'
                       actionButton='Save Changes'
                       actionColor='primary'
                       customStyle='max-width-1000'
                       confirmAction={handleUpdate}
            >
                {
                    emptyFields &&
                    <Alert style={{textAlign: 'center'}} variant="danger">
                        You can't have empty fields!
                    </Alert>
                }
                <AddBook hideFooter={true} hideHeader={true}/>
            </ViewModal>
            <Card className='border border-dark bg-dark text-white'>

                <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <FontAwesomeIcon icon={faBookOpen}/>AddBook List<FontAwesomeIcon
                        icon={faArrowRight}/> {totalBooks} Books
                    </div>
                    <div>
                        <InputGroup style={{width: '15vw', minWidth: 200}} size='sm'>
                            <FormControl id='searchInput' style={{letterSpacing: 1, fontWeight: 'bold'}}
                                         onChange={handleSearch}
                                         placeholder='Search books'/>
                            <InputGroup.Append>
                                <Button disabled={searchValue === '%5c'} onClick={(event) => {
                                    document.getElementById('searchInput').value = '';
                                    setSearchValue('%5c');
                                }} variant='warning' style={{
                                    borderRadius: '0px 2px 2px 0px',
                                    width: 35,
                                    backgroundColor: '#7e56e0',
                                    borderColor: '#7e56e0',
                                    color: 'white'
                                }} size='sm'>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Header>
                <Card.Body style={{padding: 30}}>
                    <Table bordered hover striped variant='dark'>
                        <thead>
                        <tr>
                            <th className='sort' onClick={(event, name) => handleSort(event, 'price')}
                                width='50px'
                                style={{textAlign: 'center'}}>
                                Price {
                                toggleSort.price === 'default' ? <FontAwesomeIcon icon={faSort}/> :
                                    toggleSort.price === 'ascending' ? <FontAwesomeIcon icon={faSortDown}/> :
                                        <FontAwesomeIcon icon={faSortUp}/>
                            }
                            </th>
                            <th className='sort' onClick={(event, name) => handleSort(event, 'title')}
                                width='300px'>
                                Title {
                                toggleSort.title === 'default' ? <FontAwesomeIcon icon={faSort}/> :
                                    toggleSort.title === 'ascending' ? <FontAwesomeIcon icon={faSortDown}/> :
                                        <FontAwesomeIcon icon={faSortUp}/>
                            }
                            </th>
                            <th className='sort' onClick={(event, name) => handleSort(event, 'author')}
                                width='200px'>
                                Author {
                                toggleSort.author === 'default' ? <FontAwesomeIcon icon={faSort}/> :
                                    toggleSort.author === 'ascending' ? <FontAwesomeIcon icon={faSortDown}/> :
                                        <FontAwesomeIcon icon={faSortUp}/>
                            }
                            </th>
                            <th className='sort' onClick={(event, name) => handleSort(event, 'isbnNumber')}
                                width='100px'
                                style={{textAlign: 'center'}}>
                                ISBN Number {
                                toggleSort.isbnNumber === 'default' ? <FontAwesomeIcon icon={faSort}/> :
                                    toggleSort.isbnNumber === 'ascending' ? <FontAwesomeIcon icon={faSortDown}/> :
                                        <FontAwesomeIcon icon={faSortUp}/>
                            }
                            </th>
                            <th className='sort' onClick={(event, name) => handleSort(event, 'language')}
                                width='100px'
                                style={{textAlign: 'center'}}>
                                Language {
                                toggleSort.language === 'default' ? <FontAwesomeIcon icon={faSort}/> :
                                    toggleSort.language === 'ascending' ? <FontAwesomeIcon icon={faSortDown}/> :
                                        <FontAwesomeIcon icon={faSortUp}/>
                            }
                            </th>
                            <th width='100px'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            bookData.length > 0 ?
                                bookData.map(book => (
                                    <tr id={`book-${book.id}`} style={{transition: 'ease 300ms'}} key={book.id}>
                                        <td style={{textAlign: 'center'}}>
                                            ${book.price
                                            .toFixed(2)
                                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                        </td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td style={{textAlign: 'center'}}>{book.isbnNumber}</td>

                                        <td style={{textAlign: 'center'}}>{book.language}</td>
                                        <td>
                                            <ButtonGroup style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 10
                                            }}>
                                                <Button onClick={() => handleDelete(book.id)}
                                                        variant='danger'
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 5
                                                        }}>
                                                    <Trash/>
                                                </Button>
                                                <Button onClick={() => handleEdit(book.id)}
                                                        variant='info'
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 5
                                                        }}>
                                                    <PencilSquare/>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )) :
                                <tr align='center'>
                                    <td colSpan='6'>No Books Available.</td>
                                </tr>
                        }
                        </tbody>
                    </Table>
                </Card.Body>
                {
                    totalPages !== 1
                    &&
                    <Card.Footer style={{
                        padding: '16px 25px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            Showing Page {pageNumber} of {totalPages}
                        </div>
                        <div>
                            <InputGroup size='sm'>
                                <InputGroup.Prepend>
                                    <Button disabled={pageNumber === 1}
                                            onClick={goToFirst}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faFastBackward}/>
                                    </Button>
                                    <Button disabled={pageNumber === 1}
                                            onClick={goBack}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faBackward}/>
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl onFocus={event => event.target.select()}
                                             onChange={changeManually} value={pageNumber} min='1' type="number" step="1"
                                             style={{
                                                 width: 75,
                                                 textAlign: 'center',
                                                 border: '1px solid #17A2B8',
                                                 color: '#17A2B8',
                                                 fontWeight: 'bold',
                                                 backgroundColor: 'transparent'
                                             }}/>
                                <InputGroup.Append>
                                    <Button disabled={pageNumber === totalPages}
                                            onClick={goForward}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faForward}/>
                                    </Button>
                                    <Button disabled={pageNumber === totalPages}
                                            onClick={goToLast}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faFastForward}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                }
            </Card>
        </>
    )
}

export default BookList;