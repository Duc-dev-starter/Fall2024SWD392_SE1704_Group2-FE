import { Form, Input } from "antd"
import { commentRules } from "../../consts"
import React from "react";

const CommentFormItem: React.FC = () => {
    return (
        <Form.Item
            name="comment"
            label="Comment"
            rules={commentRules}
        >
            <Input.TextArea placeholder="Enter Comment" rows={4} />
        </Form.Item>
    )
}

export default CommentFormItem