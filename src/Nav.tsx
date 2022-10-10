import Nav from 'react-bootstrap/Nav';

function ListExample() {
    return (
        <div className='underNav'>
            <Nav className="underNavNav" defaultActiveKey="/" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="#yuki" className='navLink'>Yuki</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#vlog" className='navLink'>Vlog</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="#live" className='navLink'>Live(Premium)</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default ListExample;
