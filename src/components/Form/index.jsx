import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import s from './index.module.css'

export default function Form() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [profileData, setProfileData] = useState({});
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("profileData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setProfileData(parsedData);

            // Устанавливаем значения в форму
            Object.keys(parsedData).forEach((key) => {
                setValue(key, parsedData[key]);
            });
        }

        // Загружаем аватар, если он был сохранён
        const savedAvatar = localStorage.getItem("avatar");
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
    }, [setValue]);


    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const avatarURL = URL.createObjectURL(file);
            setAvatar(avatarURL);
            localStorage.setItem("avatar", avatarURL);
        }
    };


    const onSubmit = (data) => {
        setProfileData(data);
        localStorage.setItem("profileData", JSON.stringify(data));
        console.log("Profile data saved:", data);
    };

    const resetToDefault = () => {
        // Удаляем данные из localStorage
        localStorage.removeItem("profileData");
        localStorage.removeItem("avatar");

        // Сбрасываем состояние
        setProfileData({});
        setAvatar(null);

        // Сбрасываем форму
        reset();

        console.log("Form reset to default state");
    };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        {/* photo profile */}
        <div className={s.photoContainer}>
            <label htmlFor="avatarUpload" className={s.photoButton}>
                {avatar ? (
                    <img src={avatar} alt="Avatar" className={s.avatar} />
                ) : (
                    <span>+</span>
                )}
            </label>
            <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className={s.fileInput}
                onChange={handleAvatarUpload}
            />
        </div>

        {/* inputs profile */}
        <input
            className={s.input}
            placeholder="Name"
            {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 50, message: "Name must not exceed 50 characters" },
                pattern: { value: /^[a-zA-Z\s]+$/, message: "Only letters and spaces are allowed" }
            })}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}

        <input
            className={s.input}
            placeholder="Lastname"
            {...register("lastname", {
                required: "Lastname is required",
                minLength: { value: 2, message: "Lastname must be at least 2 characters" },
                maxLength: { value: 50, message: "Lastname must not exceed 50 characters" },
                pattern: { value: /^[a-zA-Z\s]+$/, message: "Only letters and spaces are allowed" }
            })}
        />
        {errors.lastname && <p className={s.error}>{errors.lastname.message}</p>}

        <input
            className={s.input}
            placeholder="Job Title"
            {...register("jobTitle", {
                maxLength: { value: 100, message: "Job Title must not exceed 100 characters" },
                pattern: { value: /^[a-zA-Z0-9\s]+$/, message: "Only letters, numbers, and spaces are allowed" }
            })}
        />
        {errors.jobTitle && <p className={s.error}>{errors.jobTitle.message}</p>}

        <input
            className={s.input}
            placeholder="Phone"
            {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^\+\d{10,15}$/, message: "Invalid phone number. Format: +1234567890" },
            })}
        />
        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

        <input
            className={s.input}
            placeholder="Email"
            {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                },
            })}
        />
        {errors.email && <p className={s.error}>{errors.email.message}</p>}

        <input
            className={s.input}
            placeholder="Address"
            {...register("address", {
                maxLength: { value: 200, message: "Address must not exceed 200 characters" },
                pattern: {
                    value: /^[a-zA-Z0-9,.\-\s]+$/,
                    message: "Invalid address format",
                },
            })}
        />
        {errors.address && <p className={s.error}>{errors.address.message}</p>}

        <textarea
            className={s.textarea}
            placeholder="Pitch"
            {...register("pitch", {
                maxLength: { value: 200, message: "Pitch must not exceed 200 characters" }
            })}
        ></textarea>
        {errors.pitch && <p className={s.error}>{errors.pitch.message}</p>}

        {/* radio-buttons */}
        <div className={s.radioContainer}>
            <label>
                <input
                    type="radio"
                    value="private"
                    {...register("visibility", { required: true })}
                    defaultChecked={profileData.visibility === "private" || !profileData.visibility}
                />
                Private
            </label>
            <label>
                <input
                    type="radio"
                    value="public"
                    {...register("visibility", { required: true })}
                    defaultChecked={profileData.visibility === "public"}
                />
                Public
            </label>
        </div>
        {errors.visibility && <p className={s.error}>Please select visibility</p>}

        {/* submit button */}
        <button type="submit" className={s.submitButton}>
            Save
        </button>
        <button type="button" onClick={resetToDefault} className={s.resetButton}>
            Reset
        </button>
    </form>
  )
}
