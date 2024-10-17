import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Space, Table, Modal, Form, Pagination, Popconfirm, Select, message, DatePicker, InputNumber, } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
// import { Contest } from "../../../models";
// import { getCategories, createContest, deleteContest } from "../../../services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { ColumnType } from "antd/es/table";
// import { API_CREATE_Contest, API_DELETE_Contest, API_UPDATE_Contest } from "../../../consts";
import { useDebounce } from "../../../hooks";
import { CustomBreadcrumb, DescriptionFormItem, LoadingOverlay, NameFormItem } from "../../../components";
import { formartedDate } from "../../../utils/timeHelpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { createConstest, getCategories, getContests, getCriterias } from "../../../services";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";

const ManageContest: React.FC = () => {
	const [dataContest, setDataContest] = useState<Contest[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [validateOnOpen, setValidateOnOpen] = useState(false);
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [criteria, setCriteria] = useState([]);
	const [criterias, setCriterias] = useState([{ id: '', percentage: '' }]);
	const [categories, setCategories] = useState([]);
	const [rules, setRules] = useState(['']); // Initial state for rules
	const [categorieContest, setCategorieContest] = useState([{ id: '' }])
	const maxRows = 100; // Maximum number of criteria rows
	const maxRules = 100; // Maximum number of rules (optional)

	const fetchCategories = async () => {
		try {
			const responseCategories = await getCategories();
			setCategories(responseCategories.data.pageData);
		} catch (error) {
			console.error(error);
			message.error("Failed to fetch categories");
		}
	}

	useEffect(() => {
		fetchCategories();
	}, [])

	const handleAddCategory = () => {
		setCategorieContest([...categorieContest, { id: '' }]);
	};

	const handleRemoveCategory = (index: number) => {
		const newCategories = categorieContest.filter((_, i) => i !== index);
		setCategorieContest(newCategories);
	};

	const handleAddCriteria = () => {
		if (criterias.length < maxRows) {
			setCriterias([...criterias, { id: '', percentage: '' }]);
		}
	};

	const handleRemoveCriteria = (index) => {
		const newCriterias = criterias.filter((_, i) => i !== index);
		setCriterias(newCriterias);
	};

	const handleAddRule = () => {
		if (rules.length < maxRules) {
			setRules([...rules, '']);
		}
	};


	const handleRuleChange = (index, value) => {
		const newRules = [...rules];
		newRules[index] = value;
		setRules(newRules);
	};

	const handleRemoveRule = (index) => {
		const newRules = rules.filter((_, i) => i !== index);
		setRules(newRules);
	};

	const debouncedSearchTerm = useDebounce(searchText, 500);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const fetchCriterias = async () => {
		try {
			const responseCriteria = await getCriterias();
			setCriteria(responseCriteria.data);
			console.log(criteria);

		} catch (error) {
			console.error("Error fetching criteria:", error);
		}
	}

	useEffect(() => {
		fetchCriterias();
	}, [isModalVisible])

	const fetchContest = useCallback(async () => {
		try {
			const responseContest = await getContests(status, debouncedSearchTerm, pagination.pageSize);
			console.log(responseContest);

			setDataContest(responseContest.data.pageData || responseContest.data);
			setPagination((prev) => ({
				...prev,
				total: responseContest.data.pageInfo?.totalItems || responseContest.data.length,
				current: responseContest.data.pageInfo?.pageNum || 1,
				pageSize: responseContest.data.pageInfo?.pageSize || prev.pageSize,
			}));
		} finally {
			setLoading(false);
		}
	}, [pagination.current, debouncedSearchTerm, pagination.pageSize, searchText]);

	useEffect(() => {
		fetchContest();
	}, [fetchContest, searchText]);

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

	const addNewContest = useCallback(
		async (values) => {
			setLoading(true);
			console.log(rules);

			try {
				console.log(values);
				values.rules = rules;
				console.log(values);
				values.startDate = dayjs(values.startDate, "MM/DD/YYYY")
				values.endDate = dayjs(values.endDate, "MM/DD/YYYY")
				console.log(values.startDate);
				console.log(values.endDate);

				const response = await createConstest(values);
				console.log(response);


				// const newContest = response.data;
				form.resetFields();
				fetchCriterias();
				fetchContest();
				message.success(`Contest ${values.name} created successfully.`);
				setIsModalVisible(false);

			}
			finally {
				setLoading(false);
			}
		},
		[dataContest, form, fetchContest]
	);

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

	const columns: ColumnType<Contest>[] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Created Date",
			dataIndex: "createdDate",
			key: "createdDate",
			render: (createdDate: Date) => formartedDate(createdDate),
		},
		{
			title: "Updated Date",
			dataIndex: "updatedDate",
			key: "updatedDate",
			render: (updatedDate: Date) => formartedDate(updatedDate),
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Action",
			key: "action",
			width: "10%",
			render: (_: unknown, record: Contest) => (
				<div>
					<EditOutlined
						className="text-blue-500"
						style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
					// onClick={() => handleEditContest(record)}
					/>
					<Popconfirm
						title="Are you sure to delete this Contest?"
						onConfirm={() => handleDelete(record.id, record.name)}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlined
							className="text-red-500"
							style={{ fontSize: "16px", marginLeft: "8px", cursor: "pointer" }}
						/>
					</Popconfirm>
				</div>
			),
		},
	];
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
					columns={columns}
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
						onFinish={addNewContest}
						labelCol={{ span: 24 }}
						validateTrigger={validateOnOpen ? "onSubmit" : "onChange"}
					>
						<NameFormItem />
						<Form.Item label="Start Date" name="startDate">
							<DatePicker />
						</Form.Item>
						<Form.Item label="End Date" name="endDate">
							<DatePicker />
						</Form.Item>
						<Form.Item label="Location" name="location">
							<Input />
						</Form.Item>
						<Form.Item label="Rules">
							{rules.map((rule, index) => (
								<Space key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
									<Input
										placeholder="Enter Rule"
										value={rule}
										onChange={(e) => handleRuleChange(index, e.target.value)}
									/>
									<Button type="link" onClick={() => handleRemoveRule(index)}>
										Remove
									</Button>
								</Space>
							))}
							<Button type="dashed" onClick={handleAddRule}>
								+ Add Rule
							</Button>
						</Form.Item>
						<h3>Criterias</h3>
						{criterias.map((item, index) => (
							<Form.Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Form.Item
									name={['criterias', index, 'id']}
									style={{ flex: 1, marginRight: '8px' }}
								>
									<Select
										placeholder="Select Criteria"
										onChange={(value) => {
											const newCriteria = [...criterias];
											newCriteria[index].id = value;
											setCriterias(newCriteria);
										}}
									>
										{/* Replace this with your actual criteria options */}
										{criteria.map((criteria, index) => (
											<Option value={criteria.id}>{criteria.name}</Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name={['criterias', index, 'percentage']}
									style={{ flex: 1, marginLeft: '8px' }}
								>
									<InputNumber placeholder="Enter Percentage" />
								</Form.Item>
								<Button type="link" onClick={() => handleRemoveCriteria(index)}>
									Remove
								</Button>
							</Form.Item>
						))}

						{criterias.length < maxRows && (
							<Form.Item>
								<Button type="dashed" onClick={handleAddCriteria}>
									+ Add Criteria
								</Button>
							</Form.Item>
						)}

						<h3>Category</h3>
						{categorieContest.map((item, index) => (
							<Form.Item key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Form.Item
									name={['categories', index, 'id']} // Use 'categories' instead of 'criterias'
									style={{ flex: 1, marginRight: '8px' }}
									rules={[{ required: true, message: 'Please select a category' }]} // Optional: Add validation rules
								>
									<Select
										placeholder="Select Category"
										onChange={(value) => {
											const newCategories = [...categories];
											newCategories[index].id = value;
											setCategories(newCategories);
										}}
									>
										{categories.map((category, index) => (
											<Option key={category.id} value={category.id}>
												{category.name}
											</Option>
										))}
									</Select>
								</Form.Item>

								<Button type="link" onClick={() => handleRemoveCategory(index)}>
									Remove
								</Button>
								<Form.Item>
									<Button type="dashed" onClick={handleAddCategory}>
										+ Add Category
									</Button>
								</Form.Item>
							</Form.Item>
						))}
						<DescriptionFormItem />
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

