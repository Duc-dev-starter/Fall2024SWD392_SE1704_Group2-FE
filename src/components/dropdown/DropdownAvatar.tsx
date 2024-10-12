import { Avatar, Col, Dropdown, MenuProps, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { avatarReplace, PATHS } from '../../consts';
import { logout } from '../../services';
import { HistoryOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { getUserFromLocalStorage } from '../../utils';
import { BiHelpCircle } from 'react-icons/bi';
import { RiFeedbackLine, RiLockPasswordLine } from 'react-icons/ri';

const DropdownAvatar: React.FC = () => {
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState<{
        fullName: string | null;
        email: string | null;
        avatarUrl: string | null;
        googleId?: string
    }>({
        fullName: null,
        email: null,
        avatarUrl: null,
    });

    const token = localStorage.getItem("token");
    const user = getUserFromLocalStorage();

    useEffect(() => {
        if (user) {
            setDataUser({
                fullName: user.name,
                email: user.email,
                avatarUrl: user.avatar,
                googleId: user.googleId,
            });
        }
    }, [token]);

    const items: MenuProps["items"] = [
        {
            label: (
                <Link to={PATHS.USER_PROFILE}>
                    <div className="text-[0.7rem] leading-[0.5rem]">
                        <Row>
                            <Col span={6} className="pt-2 pb-2">
                                <Avatar
                                    src={dataUser.avatarUrl ? dataUser.avatarUrl : avatarReplace}
                                    className="hover:cursor-pointer mt-1 border border-black"
                                    size={40}
                                    icon={<UserOutlined />}
                                />
                            </Col>
                            <Col span={16} className="pt-3 pr-3">
                                <Row>
                                    <p className="text-[1.2rem] font-bold">{dataUser.fullName}</p>
                                </Row>
                                <div>
                                    <p className="text-[0.875rem]">{dataUser.email}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Link>
            ),
            key: "1",
        },
        {
            type: 'divider'
        },
        {
            label: (
                <Link className="text-lg" to={PATHS.USER_HISTORY}>
                    <HistoryOutlined className='text-[1.3rem] mr-3' />
                    View History
                </Link>
            ),
            key: "2",
        },
        {
            label: (
                <Link to={PATHS.REGISTER_KOI} className='text-lg flex items-center'>
                    <RiFeedbackLine className='text-center mr-4 text-[1.3rem]' />
                    Register Koi
                </Link>
            ),
            key: "3",
        },
        ...(dataUser.googleId
            ? []
            : [
                {
                    label: (
                        <Link className="text-lg mb-0" to={PATHS.CHANGE_PASSWORD}>
                            <div className='flex items-center'>
                                <RiLockPasswordLine className='text-center text-[1.5rem] mr-3 ml-[-3px]' />
                                Change Password
                            </div>
                        </Link>
                    ),
                    key: "4",
                },
            ]),
        {
            label: (
                <div>
                    <p
                        onClick={() => logout(navigate)}
                        className="text-lg hover:cursor-pointer mb-0"
                    >
                        <LogoutOutlined className='mr-4' />
                        Sign out
                    </p>
                </div>
            ),
            key: "5",
        },
        {
            type: 'divider'
        },
        {
            label: (
                <Link to='/settings' className='text-lg mb-0'>
                    <SettingOutlined className='text-center mr-4 text-[1.3rem]' />
                    Settings
                </Link>
            ),
            key: '6'
        },
        {
            type: 'divider'
        },
        {
            label: (
                <Link to='/help' className='text-lg mb-0'>
                    <div className='flex items-center'>
                        <BiHelpCircle className='text-center text-[1.5rem] mr-4' />
                        Help
                    </div>
                </Link>
            ),
            key: '7'
        },
        {
            label: (
                <Link to='/feedback' className='text-lg mb-0'>
                    <div className='flex items-center'>
                        <RiFeedbackLine className='text-center text-[1.5rem] mr-4' />
                        Feedback
                    </div>
                </Link>
            ),
            key: '8'
        }
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
            overlayClassName="w-72"
        >
            <div onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar
                        src={dataUser.avatarUrl ? dataUser.avatarUrl : avatarReplace}
                        className="hover:cursor-pointer hidden md:block border border-black"
                        size={40}
                        icon={<UserOutlined />}
                    />
                </Space>
            </div>
        </Dropdown>
    )
}

export default DropdownAvatar