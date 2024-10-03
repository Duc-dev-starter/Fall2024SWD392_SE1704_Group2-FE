import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "antd";
import Login from "@/assets/Login4.jpg";
import {
    ButtonFormItem,
    EmailFormItem,
    LoadingOverlay,
    PasswordFormItem,
} from "@/components";
import { FormProps } from "antd/lib";
import { handleNavigateRole, login } from "@/services";
import { LoginFieldType } from "@/models";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ROLES } from "../../consts";
const ServerLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);

    const getRoleFromPath = (): string => {
        const path = location.pathname;
        if (path.includes(ROLES.REFEREE)) {
            return "Referee";
        } else if (path.includes(ROLES.MANAGER)) {
            return "Manager";
        } else if (path.includes(ROLES.STAFF)) {
            return "Staff";
        }
        return "User";
    };

    const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
        const { email, password } = values;

        try {
            const authResult = await login(email, password);
            if (authResult && "token" in authResult) {
                handleNavigateRole(authResult.token, navigate);
                console.log(authResult);

            }
        } catch (error) {
            console.log(error);
        }
    };

    const role = getRoleFromPath()

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#ccffaa] to-[#bfffc7]">
                <div className="flex w-10/12 max-w-5xl rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full md:w-4/10 flex flex-col justify-center bg-white p-8 md:p-16">
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Welcome back, {role}!
                            </h1>
                        </div>
                        <span className="flex justify-center mb-4">
                            Log in to KOICHAMP
                        </span>
                        <Form
                            name="basic"
                            className="space-y-4 w-full"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <EmailFormItem />
                            <PasswordFormItem />
                            <ButtonFormItem buttonText="Login" htmlType="submit" />
                        </Form>
                    </div>
                    <div
                        className="hidden md:flex w-6/10 items-center justify-center bg-gradient-to-r from-[#a7e05f] to-[#12ab97]"
                        style={{ width: "100%", height: "560px" }}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={Login}
                            alt="Login Visual"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServerLogin;
