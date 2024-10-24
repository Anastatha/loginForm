import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import './App.css';

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const sendFormData = (formData: FormData) => {
  console.log(formData);
};

export const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const validateFields = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email не должен быть пустым';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email формат';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }

    if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const onFieldChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      sendFormData(formData);
    }
    validateFields();
  };

  const onFieldBlur = () => {
    if (validateFields()) {
      submitButtonRef.current?.focus();
    }
  };

  return (
    <div className='app'>
      <h1>User Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name='email'
            type='email'
            value={formData.email}
            placeholder='Email'
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />
          {errors.email && <div className='errorLabel'>{errors.email}</div>}
        </div>

        <div>
          <input
            name='password'
            type='password'
            value={formData.password}
            placeholder='Password'
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />
          {errors.password && <div className='errorLabel'>{errors.password}</div>}
        </div>

        <div>
          <input
            name='repeatPassword'
            type='password'
            value={formData.repeatPassword}
            placeholder='Repeat Password'
            onChange={onFieldChange}
            onBlur={onFieldBlur}
          />
          {errors.repeatPassword && <div className='errorLabel'>{errors.repeatPassword}</div>}
        </div>

        <button
          ref={submitButtonRef}
          type='submit'
          disabled={!!errors.email || !!errors.password || !!errors.repeatPassword}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
