import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './App.css';

type FormData = {
	email: string;
	password: string;
	repeatPassword: string;
};

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required('Email не должен быть пустым')
		.email('Некорректный email формат'),
	password: Yup.string()
		.required('Пароль не должен быть пустым')
		.min(6, 'Пароль должен содержать не менее 6 символов'),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Пароли не совпадают')
		.required('Повторите пароль'),
});

const sendFormData = (formData: FormData) => {
	console.log(formData);
};

export const App: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<FormData>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data: FormData) => {
		sendFormData(data);
	};

	return (
		<div className='app'>
			<h1>User Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						{...register('email')}
						type='email'
						placeholder='Email'
						onChange={(e) => {
							setValue('email', e.target.value);
							trigger('email');
						}}
					/>
					{errors.email && (
						<div className='errorLabel'>{errors.email.message}</div>
					)}
				</div>

				<div>
					<input
						{...register('password')}
						type='password'
						placeholder='Password'
						onChange={(e) => {
							setValue('password', e.target.value);
							trigger('password');
						}}
					/>
					{errors.password && (
						<div className='errorLabel'>{errors.password.message}</div>
					)}
				</div>

				<div>
					<input
						{...register('repeatPassword')}
						type='password'
						placeholder='Repeat Password'
						onChange={(e) => {
							setValue('repeatPassword', e.target.value);
							trigger('repeatPassword');
						}}
					/>
					{errors.repeatPassword && (
						<div className='errorLabel'>{errors.repeatPassword.message}</div>
					)}
				</div>

				<button type='submit'>Зарегистрироваться</button>
			</form>
		</div>
	);
};
