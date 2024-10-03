import React, { useEffect, useState } from 'react';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps, Space, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';;

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Dashboard: React.FC = () => {
    const [itemsNav, setItems] = useState<MenuItem[]>([]);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        loadItems();
    }, []);

    const getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label: <Link to={String(key)}>{label}</Link>,
        } as MenuItem;
    };

    const loadItems = async () => {
        if (location.pathname.includes('manager')) {
            setItems([
                getItem('Dashboard', '/manager/dashboard', <DesktopOutlined />),
                getItem('Manage Users', '/manager/manage-users', <UserOutlined />),
                getItem('Manage Categories', '/manager/manage-categories', <UserOutlined />),
            ]);
        }
        if (location.pathname.includes('staff')) {
            setItems([
                getItem('Competition', '/staff/competition', <DesktopOutlined />),
                getItem('Contest Registration', '/staff/contest-registration', <UserOutlined />),
                getItem('Contest Report', '/staff/report', <UserOutlined />),
            ])
        }
        if (location.pathname.includes('referee')) {
            setItems([
                getItem('Competition', '/referee/competition', <DesktopOutlined />),
                getItem('Score Koifish', '/referee/score', <UserOutlined />),
            ])
        }
    };

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={200}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    className="py-4 bg-white-50 h-full"
                    onClick={handleClick}
                    theme='light'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={itemsNav}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Sider>
            <Layout className="bg-stone-100">
                <Header className='flex justify-between items-center drop-shadow-xl bg-white'>
                    <div>
                        <p>Welcome back</p>
                    </div>
                    <Space>
                        <Avatar
                            className="hover:cursor-pointer border border-black"
                            size={40}
                            icon={<UserOutlined />}
                        />
                    </Space>
                </Header>
                <Content style={{ margin: '30px 10px', flexGrow: 1 }}>
                    <div
                        style={{
                            padding: "5px 20px",
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©{new Date().getFullYear()} Created by Koichamp
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
