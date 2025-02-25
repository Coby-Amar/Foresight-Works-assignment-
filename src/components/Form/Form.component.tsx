import { useState } from 'react';

import styles from "./Form.module.css";

import Input from '../Input/Input.component';
import Select from '../Select/Select.component';

interface FormData {
    name: string;
    email: string;
    selectedOptions: number[];
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        selectedOptions: []
    });

    const [errors, setErrors] = useState<Partial<FormData>>({
        name: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOptions: number[]) => {
        setFormData({
            ...formData,
            selectedOptions
        });
    };

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
        }
    };

    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
    ];

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                error={errors.name}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                error={errors.email}
            />

            <Select
                options={options}
                // isMulti
                placeholder="Select options"
                onChange={handleSelectChange}
            />

            <button className={styles.button} type="submit">Submit</button>
        </form>
    );
};

export default Form;
