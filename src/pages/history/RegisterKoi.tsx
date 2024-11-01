import React, { useState, useEffect, useCallback } from "react";
import { Input, Space, Table, Pagination, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { KoiEntry } from "@/models";
import { getKois } from "@/services";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { useDebounce } from "@/hooks";
import { CustomBreadcrumb } from "@/components";
import { formartedDate } from "../../utils";

const RegisterKoiy: React.FC = () => {
    const [dataKois, setDataKois] = useState<KoiEntry[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const debouncedSearchTerm = useDebounce(searchText, 500);

    useEffect(() => {
        fetchKois();
    }, [debouncedSearchTerm, pagination.current, pagination.pageSize]);

    const fetchKois = useCallback(async () => {
        try {
            const response = await getKois(searchText, pagination.current, pagination.pageSize);
            const sortedKois = response.pageData.sort((a: KoiEntry, b: KoiEntry) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
            setDataKois(sortedKois);
            setPagination({
                ...pagination,
                total: response.pageInfo.totalItems,
                current: response.pageInfo.pageNum,
                pageSize: response.pageInfo.pageSize,
            });
        } catch (error) {
            console.log(error);
        }
    }, [searchText, pagination.current, pagination.pageSize]);

    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handlePaginationChange = (page: number, pageSize?: number) => {
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize: pageSize || 10,
        }));
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Variety",
            dataIndex: "varietyName",
            key: "varietyName",
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            render: (size: number) => `${size} cm`,
        },
        {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth: Date) => formartedDate(dateOfBirth),
        },
        {
            title: "Created Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: Date) => formartedDate(createdAt),
        },
        {
            title: "Updated Date",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: Date) => formartedDate(updatedAt),
        },
        {
            title: "Image",
            key: "koiImages",
            dataIndex: "koiImages",
            render: (images: string[]) => (
                <Image
                    src={images[0]}
                    alt="Koi fish"
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                />
            ),
        },
    ];

    return (
        <div className="px-24">
            <div className="flex justify-between items-center ">
                <CustomBreadcrumb />
            </div>
            <Space>
                <Input.Search
                    placeholder="Search By Name"
                    value={searchText}
                    onChange={handleSearchText}
                    style={{ width: 200 }}
                    enterButton={<SearchOutlined className="text-white" />}
                />
            </Space>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record: KoiEntry) => (
                        <div>
                            {record.koiImages.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`Koi Fish ${index + 1}`}
                                    style={{ margin: "5px", maxWidth: "100px" }}
                                />
                            ))}
                        </div>
                    ),
                }}
                dataSource={dataKois}
                rowKey="id"
            />
            <div className="flex justify-end py-8">
                <Pagination
                    total={pagination.total}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger
                />
            </div>
        </div>
    );
};

export default RegisterKoiy;
