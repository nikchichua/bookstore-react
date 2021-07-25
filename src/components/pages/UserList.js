import {Button, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastBackward} from "@fortawesome/free-solid-svg-icons/faFastBackward";
import {faBackward} from "@fortawesome/free-solid-svg-icons/faBackward";
import {faForward} from "@fortawesome/free-solid-svg-icons/faForward";
import {faFastForward} from "@fortawesome/free-solid-svg-icons/faFastForward";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";

import {useSelector, useDispatch} from "react-redux";
import {fetchUsers} from "../../services";

const UserList = () => {
    const userData = useSelector(state => state.user.users);
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState([]);
    
    // Pagination
    const [userPageNumber, setUserPageNumber] = useState(1)
    const [totalUserPages, setTotalUserPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersEachPage, setUsersEachPage] = useState(6);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if(userData !== null) {
            setTotalUsers(userData.length);
            setTotalUserPages(Math.ceil(userData.length / usersEachPage));
        }
    }, [userData]);

    useEffect(() => {
        if(userData !== null) {
            setFilteredData(() => {
                const filtered = userData;
                return userData.slice((userPageNumber - 1) * usersEachPage, userPageNumber * usersEachPage);
            })
        }
    }, [userPageNumber, userData]);

    const goForward = () => {
        setUserPageNumber(prev => prev <= totalUserPages ? prev + 1 : isNaN(prev) ? 1 : prev);
    }

    const goToLast = () => {
        setUserPageNumber(totalUserPages);
    }

    const goBack = () => {
        setUserPageNumber(prev => prev > 1 ? prev - 1 : isNaN(prev) ? 1 : prev);
    }

    const goToFirst = () => {
        setUserPageNumber(1);
    }

    const changeManually = (event) => {
        setUserPageNumber(() => parseInt(event.target.value) > totalUserPages ? totalUserPages :
            parseInt(event.target.value) <= 0 ? 1 :
                parseInt(event.target.value));
        setTimeout(() => event.target.blur(), 500);
    }

    // -------------------------

    return (
        <>
            <Card className='border border-dark bg-dark text-white'>

                <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <FontAwesomeIcon icon={faUsers}/>User List<FontAwesomeIcon
                        icon={faArrowRight}/> {totalUsers} Users
                    </div>
                </Card.Header>
                <Card.Body style={{padding: 30}}>
                    <Table bordered hover striped variant='dark'>
                        <thead>
                        <tr>
                            <th className='sort' width='100px'>
                                First Name
                            </th>
                            <th className='sort' width='100px'>
                                Last Name
                            </th>
                            <th className='sort' width='200px'>
                                Email
                            </th>
                            <th className='sort'
                                width='100px'>
                                Address
                            </th>
                            <th className='sort' width='100px'>
                                Registration Date
                            </th>
                            <th className='sort' width='100px'>
                                Balance
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredData.length > 0 ?
                                filteredData.map(user => (
                                    <tr id={`user-${user.first}`} style={{transition: 'ease 300ms'}} key={user.first}>
                                        <td>{user.first}</td>
                                        <td>{user.last}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.created}</td>
                                        <td>{user.balance}</td>
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
                    totalUserPages !== 1
                    &&
                    <Card.Footer style={{
                        padding: '16px 25px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            Showing Page {userPageNumber} of {totalUserPages}
                        </div>
                        <div>
                            <InputGroup size='sm'>
                                <InputGroup.Prepend>
                                    <Button disabled={userPageNumber === 1}
                                            onClick={goToFirst}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faFastBackward}/>
                                    </Button>
                                    <Button disabled={userPageNumber === 1}
                                            onClick={goBack}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faBackward}/>
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl onFocus={event => event.target.select()}
                                             onChange={changeManually} value={userPageNumber} min='1' type="number" step="1"
                                             style={{
                                                 width: 75,
                                                 textAlign: 'center',
                                                 border: '1px solid #17A2B8',
                                                 color: '#17A2B8',
                                                 fontWeight: 'bold',
                                                 backgroundColor: 'transparent'
                                             }}/>
                                <InputGroup.Append>
                                    <Button disabled={userPageNumber === totalUserPages}
                                            onClick={goForward}
                                            type='button'
                                            variant='outline-info'
                                            style={{borderRadius: 0}}>
                                        <FontAwesomeIcon icon={faForward}/>
                                    </Button>
                                    <Button disabled={userPageNumber === totalUserPages}
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

export default UserList;