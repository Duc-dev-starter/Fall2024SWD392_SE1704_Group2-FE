import { Tag } from "antd";
import { getRoleColor, getRoleLabel } from "../../consts";

const RoleTags = ({ roles }: { roles: string[] }) => {
    return (
        <div>
            {roles.map((role: string) => (
                <Tag color={getRoleColor(role)} key={role}>
                    {getRoleLabel(role)}
                </Tag>
            ))}
        </div>
    );
};

export default RoleTags;