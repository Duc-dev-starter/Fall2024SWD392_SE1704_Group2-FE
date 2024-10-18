import React from 'react'
import { useState, useEffect, useCallback } from "react";
import {
	Button,
	Input,
	Space,
	Table,
	Modal,
	Form,
	Pagination,
	Select,
} from "antd";
import { EditOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { TableColumnsType, TablePaginationConfig } from "antd";

import { useDebounce } from "../../../hooks";
import {
	CustomDeletePopconfirm,
	LoadingOverlay,
	NameFormItem,
	CustomBreadcrumb,
	DescriptionFormItem
} from "../../../components";
import { formartedDate } from "../../../utils";
import { createCriteria, deleteCriteria, getCriterias, updateCriteria } from '../../../services';
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Criteria } from '../../../models';


const ManageCriteria: React.FC = () => {
	const [dataCriterias, setDataCriterias] = useState<Criteria[]>([]);
	const [searchText, setSearchText] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });

	const [formData, setFormData] = useState<Partial<Criteria>>({});

	const [modalMode, setModalMode] = useState<"Add" | "Edit">("Add");
	const [selectedStatus, setSelectedStatus] = useState<string>("true");
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const debouncedSearch = useDebounce(searchText, 500);
	const [form] = Form.useForm();
	useEffect(() => {
		fetchCriterias();
	}, [selectedStatus, debouncedSearch]);

	const fetchCriterias = useCallback(async () => {
		try {
			const responseCriteria = await getCriterias();
			console.log(responseCriteria);
			const sortedCriterias = responseCriteria.data.sort((a: Criteria, b: Criteria) => {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				return dateB - dateA;
			});
			console.log(sortedCriterias);

			setDataCriterias(sortedCriterias);
		} catch (error) {
			console.log(error);
		}
	}, [selectedStatus, searchText, debouncedSearch]);

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setPagination((prev) => ({
			...prev,
			current: page,
			pageSize: pageSize || 10,
		}));
	};

	const handleTableChange = (pagination: TablePaginationConfig) => {
		setPagination(pagination);
	};

	const handleAddNewCriteria = useCallback(
		async (values: Criteria) => {
			try {

				const criteriaData = { ...values };
				const response = await createCriteria(criteriaData);
				const newCriteria = response.data.data;
				setDataCriterias((prevData) => [newCriteria, ...prevData]);
				setIsModalVisible(false);
				form.resetFields();
				fetchCriterias();
			} catch (error) {
				console.log(error);
			}
		},
		[fetchCriterias, form]
	);

	const handleAddClick = () => {
		setModalMode("Add");
		setIsModalVisible(true);
		form.resetFields();
		setFormData({});
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
		setFormData({});
		form.resetFields();
	};

	const handleStatus = (value: string) => {
		setSelectedStatus(value);
	};

	const handleEditCriteria = async (values: Criteria) => {

		const updatedCriteria = {
			...values,
		};

		await updateCriteria(formData.id, updatedCriteria);

		setDataCriterias((prevData) =>
			prevData.map((criteria) =>
				criteria.id === formData.id
					? {
						...criteria,
						...updatedCriteria,
					}
					: criteria
			)
		);

		setIsModalVisible(false);
		form.resetFields();
		setFormData({});
		fetchCriterias();
	};

	const onFinish = (values: Criteria) => {
		if (modalMode === "Edit") {
			if (formData.id) {
				handleEditCriteria({
					...formData,
					...values,
				});
			}
		} else {
			handleAddNewCriteria(values);
		}
		setIsModalVisible(false);
	};


	const columns: TableColumnsType<Criteria> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: "20%",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: "10%",
		},
		{
			title: "Created Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt: Date) => formartedDate(createdAt),
			width: "10%",
		},
		{
			title: "Updated Date",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: Date) => formartedDate(updatedAt),
			width: "12%",
		},
		{
			title: "Action",
			key: "action",
			width: "20%",
			render: (_: unknown, record: Criteria) => (
				<div>
					<EditOutlined
						className="hover:cursor-pointer text-blue-400 hover:opacity-60"
						style={{ fontSize: "20px" }}
						onClick={() => {
							setModalMode("Edit");
							setIsModalVisible(true);
							form.setFieldsValue(record);
							setFormData(record);

						}}
					/>
					<CustomDeletePopconfirm
						title="Delete the Criteria"
						description="Are you sure to delete this Criteria?"
						onConfirm={() =>
							deleteCriteria(record.id, record.name, fetchCriterias)
						}
					/>
				</div>
			),
		},
	];

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};


	return (
		<div>
			{isLoading && <LoadingOverlay />}
			<div className="flex flex-row md:flex-row justify-between items-center mb-4">
				<div className="flex flex-row justify-between w-full mt-3 md:mt-0">
					<CustomBreadcrumb />
					<Button type="primary" className="py-2 top-14" onClick={handleAddClick}>
						<UserAddOutlined /> Add New Criteria
					</Button>
				</div>
			</div>

			<Space className="pb-3 flex flex-wrap">
				<Input.Search
					placeholder="Search By Name and Email"
					value={searchText}
					onChange={handleSearchText}
					className="w-full md:w-64"
					enterButton={<SearchOutlined className="text-white" />}
				/>


				<Select value={selectedStatus} onChange={handleStatus} className="w-full mt-2 mb-2 md:w-32 md:mt-0 md:ml-2">
					<Select.Option value="true">Active</Select.Option>
					<Select.Option value="false">Inactive</Select.Option>
				</Select>

			</Space>

			<Table
				columns={columns}
				dataSource={dataCriterias}
				pagination={false}
				onChange={handleTableChange}
				rowKey={(record: Criteria) => record?.id || "unknown"}
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
				title={modalMode === "Edit" ? "Edit Criteria" : "Add New Criteria"}
				open={isModalVisible}
				onCancel={() => handleModalCancel()}
				footer={null}
				destroyOnClose={true}
			>
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
				>
					<NameFormItem />
					{modalMode === "Add" && <DescriptionFormItem />}

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{modalMode === "Edit" ? "Update Criteria" : "Add Criteria"}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ManageCriteria;
