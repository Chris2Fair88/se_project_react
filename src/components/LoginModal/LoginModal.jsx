import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin= (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal${isOpen ? " modal_opened" : ""}`}>
      <ModalWithForm
        title="Log In"
        buttonText="Log In"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleLogin}
        contentClassName="modal__content modal__content--login"
        actions={
          <button
            type="button"
            className="modal__switch-button"
            onClick={onSwitchToRegister}
          >
            or Register
          </button>
        }
      >
        <label htmlFor="login-email" className="modal__label">
          Email
          <input
            className="modal__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="login-email"
            placeholder="Email"
            required
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password
          <input
            className="modal__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="login-password"
            placeholder="Password"
            required
          />
        </label>
      </ModalWithForm>
    </div>
  );
}
