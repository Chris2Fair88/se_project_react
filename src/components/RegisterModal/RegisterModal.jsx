import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState } from "react";
import "./RegisterModal.css";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, email, password, avatar });
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
        <label htmlFor="register-email" className="modal__label">
        Email
        <input
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="register-email"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="register-password"
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="register-name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          required
        />
      </label>
       <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          type="url"
          id="register-avatar"
          placeholder="Avatar URL"
        />
      </label>
    
      {/* Input fields for name, email, password, avatar */}
    </ModalWithForm>
  );
}