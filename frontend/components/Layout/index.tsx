import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Container, Content, PageContainer } from './styles';


type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [isOpened, setOpened] = useState(false);

    const toggleSidebar= () => {
        setOpened((prev) => !prev);
    }

    return (
        <Container>
            <Header isOpened={isOpened} toggleSidebar={toggleSidebar} />
            <Content>
                <Sidebar isOpened={isOpened} />
                <PageContainer>{children}</PageContainer>
            </Content>
        </Container>
    )
}

export default Layout;
