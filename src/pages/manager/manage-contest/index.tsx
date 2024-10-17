import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Popconfirm, Select, message, } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { Contest } from "../../../models";
// import { getCategories, createContest, deleteContest } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
// import { API_CREATE_Contest, API_DELETE_Contest, API_UPDATE_Contest } from "../../../consts";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, LoadingOverlay, NameFormItem } from "../../../components";
import { formartedDate } from "../../../utils/timeHelpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ManageContest: React.FC = () => {
	const [dataContest, setDataContest] = useState<Contest[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [validateOnOpen, setValidateOnOpen] = useState(false);
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const debouncedSearchTerm = useDebounce(searchText, 500);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	// const fetchCategories = useCallback(async () => {
	// 	try {
	// 		const responseContest = await getCategories(pagination.current, debouncedSearchTerm, pagination.pageSize);
	// 		setDataContest(responseContest.data.pageData || responseContest.data);
	// 		setPagination((prev) => ({
	// 			...prev,
	// 			total: responseContest.data.pageInfo?.totalItems || responseContest.data.length,
	// 			current: responseContest.data.pageInfo?.pageNum || 1,
	// 			pageSize: responseContest.data.pageInfo?.pageSize || prev.pageSize,
	// 		}));
	// 	} finally {
	// 		// setLoading(false);
	// 	}
	// }, [pagination.current, debouncedSearchTerm, pagination.pageSize, searchText]);

	// useEffect(() => {
	// 	fetchCategories();
	// }, [fetchCategories, searchText]);

	const handleOpenModal = useCallback(() => {
		form.resetFields();
		setIsModalVisible(true);
		setValidateOnOpen(true);
	}, [form]);

	// const handleDelete = async (id: string, name: string) => {
	// 	await deleteContest(id);
	// 	message.success(`Contest ${name} deleted successfully.`);
	// 	await fetchCategories();
	// };

	// const updateContest = useCallback(
	// 	async (values: Partial<Contest> & { _id: string | null }, originalCreatedAt: string) => {
	// 		let parentContestId = null;

	// 		if (values.parent_Contest_id && values.parent_Contest_id !== "none") {
	// 			parentContestId = values.parent_Contest_id;
	// 		}
	// 		setLoading(true);
	// 		const updatedContest: Contest = {
	// 			_id: values._id!,
	// 			name: values.name ?? "",
	// 			description: values.description ?? "",
	// 			parent_Contest_id: parentContestId,
	// 			user_id: values.user_id ?? "",
	// 			is_deleted: values.is_deleted ?? false,
	// 			created_at: originalCreatedAt,
	// 			updated_at: new Date().toISOString(),
	// 		};

	// 		try {
	// 			const response = await axiosInstance.put(`${API_UPDATE_Contest}/${values._id}`, updatedContest);

	// 			if (response.data) {
	// 				setDataContest((prevData) =>
	// 					prevData.map((Contest) =>
	// 						Contest._id === values._id
	// 							? { ...Contest, ...response.data }
	// 							: Contest
	// 					)
	// 				);
	// 				setIsModalVisible(false);
	// 				form.resetFields();
	// 				message.success(`Contest ${values.name} updated successfully.`);
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	},
	// 	[dataContest, form]
	// );

	// const handleEditContest = useCallback(
	// 	async (Contest: Contest) => {
	// 		form.resetFields();
	// 		await fetchCategories();

	// 		Modal.confirm({
	// 			title: `Edit Contest - ${Contest.name}`,
	// 			content: (
	// 				<Form
	// 					form={form}
	// 					onFinish={(values) => {
	// 						updateContest(values, Contest.created_at);
	// 					}}
	// 					initialValues={{
	// 						_id: Contest._id,
	// 						name: Contest.name,
	// 						parent_Contest_id: Contest.parent_Contest_id,
	// 						description: Contest.description,
	// 					}}
	// 					labelCol={{ span: 24 }}
	// 				>
	// 					<Form.Item name="_id" style={{ display: "none" }}>
	// 						<Input />
	// 					</Form.Item>

	// 					<NameFormItem />
	// 					<Form.Item label="Parent Contest" name="parent_Contest_id" rules={[{ required: false }]}>
	// 						<Select placeholder="Select parent Contest">
	// 							<Select.Option key="none" value="none">
	// 								None
	// 							</Select.Option>
	// 							{parentCategories
	// 								.filter((parentContest) => parentContest._id !== form.getFieldValue("_id"))
	// 								.map((parentContest) => (
	// 									<Select.Option key={parentContest._id} value={parentContest._id}>
	// 										{parentContest.name}
	// 									</Select.Option>
	// 								))}
	// 						</Select>
	// 					</Form.Item>

	// 					<Form.Item label="Description" name="description" rules={[{ required: false }]}>
	// 						<Input.TextArea rows={4} />
	// 					</Form.Item>
	// 				</Form>
	// 			),
	// 			okText: "Save",
	// 			onOk: () => {
	// 				form.submit();
	// 			},
	// 			onCancel: () => {
	// 				form.resetFields();
	// 			},
	// 		});
	// 	},
	// 	[form, updateContest, fetchCategories, dataContest]
	// );

	// const addNewContest = useCallback(
	// 	async (values) => {
	// 		setLoading(true);

	// 		try {
	// 			console.log(values);

	// 			const response = await createContest(values);
	// 			const success = response.success;
	// 			if (success) {
	// 				// const newContest = response.data;
	// 				form.resetFields();
	// 				fetchCategories();
	// 				message.success(`Contest ${values.name} created successfully.`);
	// 				setIsModalVisible(false);
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	},
	// 	[dataContest, form, fetchCategories]
	// );

	const handleTableChange = (pagination: TablePaginationConfig) => {
		setPagination(pagination);
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
		// fetchCategories();
	};
	// const handleSearch = useCallback(() => {
	// 	setPagination((prev) => ({
	// 		...prev,
	// 		current: 1,
	// 	}));
	// }, [fetchCategories]);

	// const columns: ColumnType<Contest>[] = [
	// 	{
	// 		title: "Name",
	// 		dataIndex: "name",
	// 		key: "name",
	// 	},
	// 	{
	// 		title: "Created Date",
	// 		dataIndex: "createdDate",
	// 		key: "createdDate",
	// 		render: (createdDate: Date) => formartedDate(createdDate),
	// 	},
	// 	{
	// 		title: "Updated Date",
	// 		dataIndex: "updatedDate",
	// 		key: "updatedDate",
	// 		render: (updatedDate: Date) => formartedDate(updatedDate),
	// 	},
	// 	{
	// 		title: "Description",
	// 		dataIndex: "description",
	// 		key: "description",
	// 	},
	// 	{
	// 		title: "Action",
	// 		key: "action",
	// 		width: "10%",
	// 		render: (_: unknown, record: Contest) => (
	// 			<div>
	// 				<EditOutlined
	// 					className="text-blue-500"
	// 					style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
	// 				// onClick={() => handleEditContest(record)}
	// 				/>
	// 				<Popconfirm
	// 					title="Are you sure to delete this Contest?"
	// 					onConfirm={() => handleDelete(record.id, record.name)}
	// 					okText="Yes"
	// 					cancelText="No"
	// 				>
	// 					<DeleteOutlined
	// 						className="text-red-500"
	// 						style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
	// 					/>
	// 				</Popconfirm>
	// 			</div>
	// 		),
	// 	},
	// ];
	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};
	return (
		<>
			{isLoading ?? <LoadingOverlay />}
			<div>
				<div className="flex justify-between items-center ">
					<CustomBreadcrumb />

					<Button type="primary" onClick={handleOpenModal}>
						Add New Contest
					</Button>
				</div>
				<Space>
					<Input.Search
						placeholder="Search By Name"
						value={searchText}
						onChange={handleSearchText}
						// onSearch={handleSearch}
						style={{ width: 200 }}
						enterButton={<SearchOutlined className="text-white" />}
					/>
				</Space>
				<Table
					// columns={columns}
					dataSource={dataContest}
					rowKey="_id"
					pagination={false}
					onChange={handleTableChange}
					className="overflow-auto"
				/>

				<div className="flex justify-end py-8">
					<Pagination
						total={pagination.total}
						showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
						current={pagination.current}
						pageSize={pagination.pageSize}
						onChange={handlePaginationChange}
						showSizeChanger
					/>
				</div>
				<Modal
					title="Add New Contest"
					open={isModalVisible}
					onCancel={() => {
						form.resetFields();
						setIsModalVisible(false);
						setValidateOnOpen(false);
					}}
					footer={null}
				>
					<Form
						form={form}
						// onFinish={addNewContest}
						labelCol={{ span: 24 }}
						validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
					>
						<NameFormItem />
						<Form.Item>
							<Button loading={loading} type="primary" htmlType="submit">
								Add
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		</>
	);
};

export default ManageContest;

