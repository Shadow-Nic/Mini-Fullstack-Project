import NavBar from "../HomeComponents/NavBar";
import { Header, Container, Content } from 'rsuite';
import ToDo from "../TODO/toDo";
import Appointments from "../Appointments/Appointments";
import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";


const Home = () => {
    const [selectedTab, setSelectedTab] = useState(1);



    const ChangeTab = () => {
        switch (selectedTab) {
            case 1:
                return <Dashboard />
            case 2:
                return <ToDo />

            case 3:
                return <Appointments />


            default:
                return <div></div>

        }
    }




    return (
        <div className="show-fake-browser navbar-page">
            <Container>
                <Header>
                    <NavBar
                        setSelectedTab={setSelectedTab}
                    />
                </Header>
                <Content>
                    <ChangeTab />
                </Content>
            </Container>
        </div>
    )
};

export default Home;

