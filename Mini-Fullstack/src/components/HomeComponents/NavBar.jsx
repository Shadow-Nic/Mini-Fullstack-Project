import { Navbar, Nav } from 'rsuite';
import PropTypes from 'prop-types';
import ExitIcon from '@rsuite/icons/Exit';

const NavBar = ({ setSelectedTab }) => {

    const handleChange = (number) => {
        setSelectedTab(number)
    }


    return (
        <div>
            <Navbar >
                <Navbar.Brand href="#">MyApp</Navbar.Brand>
                <Nav>
                    <Nav.Item onClick={() => handleChange(1)}>Home</Nav.Item>
                    <Nav.Item onClick={() => handleChange(2)}>ToDo`s</Nav.Item>
                    <Nav.Item onClick={() => handleChange(3)}>Appointments</Nav.Item>
                </Nav>
                <Nav pullRight>
                    <Nav.Item icon={<ExitIcon />}>Logout</Nav.Item>
                </Nav>
            </Navbar>
        </div>
    )
};

NavBar.propTypes = {
    setSelectedTab: PropTypes.func.isRequired,
};

export default NavBar