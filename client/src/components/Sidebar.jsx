import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react"
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div color="primary" onClick={toggleSidebar} className="ham-icon mb-2">
                <FontAwesomeIcon icon={faBars} />
            </div>
            <Offcanvas className="sidebar" isOpen={isOpen} toggle={toggleSidebar} direction="start">
                <OffcanvasHeader className="head" toggle={toggleSidebar}>LOGO</OffcanvasHeader>
                <OffcanvasBody>
                    <Nav vertical>
                        <NavItem className="nav-heading">
                            <NavLink>CREATE</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink href="/create/quizzes">Quizzes</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink href="/create/questions">Question</NavLink>
                        </NavItem>
                        <NavItem className="nav-heading">
                            <NavLink>UPDATE</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink href="/update/quizzes">Quizzes</NavLink>
                        </NavItem>
                        <NavItem className="nav-item">
                            <NavLink href="/update/questions">Question</NavLink>
                        </NavItem>
                    </Nav>
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
};

export default Sidebar;