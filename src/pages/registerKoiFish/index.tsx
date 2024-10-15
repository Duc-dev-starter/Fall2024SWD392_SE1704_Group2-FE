import { Button, Col, Form, Image, Input, Radio, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { UploadFile, UploadProps } from "antd";
import { getBase64, uploadFile } from "../../utils";
import { UploadButton } from '../../components';
import { registerKoiFish } from '../../services/koiFish';

type FileType = Parameters<Required<UploadProps>["beforeUpload"]>[0];

function RegisterKoiPage() {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			const userId = JSON.parse(user).id;
			form.setFieldsValue({ ownerId: userId });
		}
	}, [form]);

	const onFinish = async (values) => {
		console.log('Form values:', values);

		if (fileList.length > 0) {
			const file = fileList[0];
			if (file.originFileObj) {
				const imageKoi = await uploadFile(file.originFileObj as File);
				console.log(imageKoi);
				values.koiImage = imageKoi;
			}
		}

		const response = await registerKoiFish(values);

		console.log('====================================');
		console.log("[P]::::registered KoiFish: ", response);
		console.log('====================================');

	};

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

	return (
		<>
			<div className='text-red-900 font-bold text-5xl text-center w-full py-10'>
				REGISTER YOUR KOI HERE
				<p className='font-medium text-xl'>Add your koi entries here and pay $5/entry fee.</p>
			</div>
			<h1 className='text-4xl font-bold text-center'>6th Koi Show: Add Koi Entry - Single Koi Entry</h1>
			<div className='flex justify-center gap-10'>
				<Col span={8}>
					<Form
						form={form}
						name="koiFishForm"
						layout="vertical"
						onFinish={onFinish}
						initialValues={{
							name: '',
							description: '',
							variety: '',
							size: 0,
						}}
					>
						<Form.Item
							label={t('koi_name_label')}
							name="name"
							rules={[{ required: true, message: t('koi_name_error') }]}
						>
							<Input placeholder={t('koi_name_label')} />
						</Form.Item>
						<Form.Item
							label={t('variety_label')}
							name="variety"
							rules={[{ required: true, message: t('variety_error') }]}
						>
							<Radio.Group className='flex gap-10'>
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value="Kohaku">Kohaku</Radio>
									<Radio value="Taisho Sanke">Taisho Sanke</Radio>
									<Radio value="Showa">Showa</Radio>
									<Radio value="Utsurimono">Utsurimono</Radio>
									<Radio value="Asagi & Shusui">Asagi & Shusui</Radio>
									<Radio value="Koromo & Goshiki">Koromo & Goshiki</Radio>
								</div>
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value="Kawarimono (including Bekko)">Kawarimono (including Bekko)</Radio>
									<Radio value="Hikarimono (Hikarimoyo / HikariUtsuri / Hikari Muji)">Hikarimono (Hikarimoyo / HikariUtsuri / Hikari Muji)</Radio>
									<Radio value="Tancho">Tancho</Radio>
									<Radio value="Kin Ginrin">Kin Ginrin</Radio>
									<Radio value="Hirenaga">Hirenaga</Radio>
								</div>
							</Radio.Group>
						</Form.Item>

						<Form.Item
							label={t('size_label')}
							name="size"
							rules={[{ required: true, message: t('size_error') }]}
						>
							<Radio.Group className="flex gap-6">
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value="15 Bu">15 Bu - Under 15cm or 6”</Radio>
									<Radio value="25 Bu">25 Bu - 15-25cm or 6-10”</Radio>
									<Radio value="35 Bu">35 Bu - 25-35cm or 10-12”</Radio>
									<Radio value="45 Bu">45 Bu - 35-45cm or 12-18”</Radio>
								</div>
								<div className="flex flex-col gap-3 w-1/2">
									<Radio value="55 Bu">55 Bu - 45-55cm or 18-22”</Radio>
									<Radio value="65 Bu">65 Bu - 55-65cm or 22-26”</Radio>
									<Radio value="75 Bu">75 Bu - 65-75cm or 26-30”</Radio>
									<Radio value="75 Bu +">75 Bu + - 30” +</Radio>
								</div>
							</Radio.Group>
						</Form.Item>

						<Form.Item label="Avatar" name="koiImage" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
							<Upload
								action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
								listType="picture-card"
								fileList={fileList}
								onPreview={handlePreview}
								onChange={handleChange}
							>
								{fileList.length >= 1 ? null : <UploadButton />}
							</Upload>
						</Form.Item>

						<Form.Item
							label={t('description_label')}
							name="description"
							rules={[{ required: true, message: t('description_error') }]}
						>
							<Input.TextArea rows={4} placeholder={t('description_label')} />
						</Form.Item>

						<Form.Item name="ownerId" hidden>
							<Input type="hidden" />
						</Form.Item>

						<Form.Item>
							<Button className='w-full' type="primary" htmlType="submit">
								{t('submit_koi_button')}
							</Button>
						</Form.Item>
					</Form>
				</Col>
				{previewImage && (
					<Image
						wrapperStyle={{ display: "none" }}
						preview={{
							visible: previewOpen,
							onVisibleChange: (visible) => setPreviewOpen(visible),
							afterOpenChange: (visible) => !visible && setPreviewImage(""),
						}}
						src={previewImage}
					/>
				)}

			</div>
		</>

	);
}

export default RegisterKoiPage;
