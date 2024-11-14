import React, { useState } from 'react';
import styles from './Popup.module.scss'; // Імпортуємо CSS модуль

interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface OrderData {
  items: CartItem[];
  totalPrice: number;
}

interface PopupContactProps {
  order: OrderData;
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

export const PopupContact: React.FC<PopupContactProps> = ({ order, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    surname: '',
  });

  // Обробник зміни даних форми
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обробник відправки форми
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Надсилаємо дані на сервер
  };

  return (
    <div className={styles.popup}>
  

      <form onSubmit={handleSubmit}>
      <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2>Введіть ваші дані:</h2>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Ім'я"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="text"
          name="surname"
          placeholder="Прізвище"
          value={formData.surname}
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">Надіслати замовлення</button>
      </form>
    </div>
  );
};
