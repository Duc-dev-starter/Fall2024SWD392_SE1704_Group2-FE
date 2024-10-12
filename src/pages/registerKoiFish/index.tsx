import { Button, Col, Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { registerKoiFish } from '../../services/koiFish';


function RegisterKoiPage() {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			const userId = JSON.parse(user).id;
			form.setFieldsValue({ ownerId: userId });
		}
	}, [form]);

	const onFinish = async (values: any) => {
		console.log('Form values:', values);

		const response = await registerKoiFish(values);

		console.log('====================================');
		console.log("[P]::::registered KoiFish: ", response);
		console.log('====================================');

	};

	return (
		<div className='flex justify-center gap-10'>
			<Col span={5}>
				<img src='../../../src/assets/5bd02fd0893cd.jpg' alt='koi-fish-register-banner' />
			</Col>
			<Col span={8}>
				<span className='text-2xl text-red-900 font-bold'>REGISTER YOUR KOI HERE</span>

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
						label={t('description_label')}
						name="description"
						rules={[{ required: true, message: t('description_error') }]}
					>
						<Input placeholder={t('description_label')} />
					</Form.Item>

					<Form.Item
						label={t('variety_label')}
						name="variety"
						rules={[{ required: true, message: t('variety_error') }]}
					>
						<Input placeholder={t('variety_label')} />
					</Form.Item>

					<Form.Item
						label={t('size_label')}
						name="size"
						rules={[{ required: true, message: t('size_error') }]}
					>
						<InputNumber min={0} placeholder={t('size_label')} style={{ width: '100%' }} />
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
		</div>
	);
}

export default RegisterKoiPage;
